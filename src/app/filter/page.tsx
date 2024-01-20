import AllMovieProviders from "@/components/Provider";
import { BlockContainer, CardMovie } from "@/components/comps";
import { BtnPages } from "@/components/filters";
import {
  DiscoverType,
  ListGenres,
  MovieProviders,
} from "@/components/utils/types";
import { Suspense } from "react";

async function getAllMovieProviders() {
  const res = await fetch(
    "https://api.themoviedb.org/3/watch/providers/movie?language=pt-BR&watch_region=BR",
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `${process.env.DB_TOKEN_AUTH}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Falha ao buscar dados");
  }
  return res.json();
}

async function getFilter(
  searchParams: { [key: string]: string },
  selectedMp: string
) {
  const page: string =
    Number(searchParams?.page) > 1 && Number(searchParams?.page) <= 500
      ? searchParams?.page
      : "1";

  const dataMP: MovieProviders = await getAllMovieProviders();
  let mp: string = "";
  dataMP.results.forEach((value) => {
    mp = String(value.provider_id) + "|" + mp;
  });

  let sort: string;
  let providers = `&watch_region=BR&with_watch_providers=${mp}`;
  // let providers  = `&watch_region=BR&with_watch_providers=${String(337)++String(350)}`;
  // console.log(providers);

  let count_v = "";
  switch (searchParams?.sort) {
    case "popularity":
    case "revenue":
      sort = `${searchParams?.sort}.desc`;
      break;
    case "release_date":
      sort = `primary_${searchParams?.sort}.desc`;
      break;
    case "vote_average":
      sort = `${searchParams?.sort}.desc`;
      count_v = "&vote_count.gte=500";
      break;
    default:
      sort = "popularity.desc";
      break;
  }

  const g = "&vote_average.gte=";
  const l = "&vote_average.lte=";

  let url = `${process.env.DB_API_URL_F}discover/movie${
    process.env.DB_API_BR
  }&include_adult=false&include_video=false&page=${page}&primary_release_date.lte=2023-12-29${count_v}${providers}&sort_by=${sort}${
    searchParams?.vote_gte !== undefined ? g + searchParams?.vote_gte : ""
  }${searchParams?.vote_lte !== undefined ? l + searchParams?.vote_lte : ""}`;
  // let url ="https://api.themoviedb.org/3/discover/movie?language=pt-BR&include_adult=false&include_video=false&page=1&primary_release_date.lte=2023-12-29&watch_region=BR&with_watch_providers=1973|1715|1920|1790|1861|1875|1860|1853|1796|445|309|1771|701|692|588|582|683|677|300|315|575|574|573|569|567|566|444|562|559|554|551|546|544|194|484|477|478|512|499|475|473|521|465|447|190|19|68|3|10|11|283|307|350|2|384|531|47|167|619|8|119|337&sort_by=popularity.desc"
  // console.log(url)
  const res = await fetch(url, {
    cache: "no-store",
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `${process.env.DB_TOKEN_AUTH}`,
    },
  });
  // console.log(url);

  if (!res.ok) {
    throw new Error("Falha ao buscar dados");
  }
  return res.json();
}
async function getAllGenres() {
  const res = await fetch(
    `${process.env.DB_API_URL_F}genre/movie/list${process.env.DB_API_BR}&watch_region=BR`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `${process.env.DB_TOKEN_AUTH}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Falha ao buscar dados");
  }
  return res.json();
}

export default async function CardsFilter({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  let provider = "350";
  //  console.log(searchParams?.g)
  const data: DiscoverType = await getFilter(searchParams, provider);
  const dataMP: MovieProviders = await getAllMovieProviders();
  const genres: ListGenres = await getAllGenres();

  // async function call(e: { target: { value: string; }; }){

  //   const data: DiscoverType = await getFilter( searchParams,  e.target.value);
  // }

  return (
    <>
      <BlockContainer>
        <div className=" w-full  gridTemplateSpace ">
          {data?.results.map((value) => (
            <div
              className="col-span-5 xs:col-span-5 md:col-span-3 lg:col-span-4"
              key={value.id}
            >
              <CardMovie data={value} />
            </div>
          ))}
        </div>
      </BlockContainer>
      <BlockContainer>
        <BtnPages totalPages={data.total_pages} />
      </BlockContainer>
    </>
  );
}
