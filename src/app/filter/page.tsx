import AllMovieProviders from "@/components/Provider";
import { BlockContainer, CardMovie } from "@/components/comps";
import { BtnPages } from "@/components/filters";
import { DiscoverType, MovieProviders } from "@/components/utils/types";

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

  const vote = () => {
    return `${
      searchParams?.vote_gte !== undefined
        ? "&vote_average.gte=" + searchParams?.vote_gte
        : ""
    }${
      searchParams?.vote_lte !== undefined
        ? "&vote_average.lte=" + searchParams?.vote_lte
        : ""
    }`;
  };

  const genres = () => {
    if (Array.isArray(searchParams?.g)) {
      let listGenres: string = "&with_genres=";
      searchParams?.g.forEach((value, index, array) => {
        listGenres = listGenres + value;
        if (index + 1 < array.length) {
          listGenres = listGenres + "%2C";
        }
      });
  
      return listGenres;
    } else if (typeof searchParams?.g == "string") {
      return `&with_genres=${searchParams?.g}`;
    } else {
      return "";
    }
  };

  const releaseData = () => {
    let date: Date = new Date();
    return `&primary_release_date.lte=${date.getFullYear()}-${
      date.getMonth() < 9
        ? "0" + String(date.getMonth() + 1)
        : date.getMonth() + 1
    }-${date.getDate()}`;
  };

  const dataMP: MovieProviders = await getAllMovieProviders();
  let mp: string = "";
  dataMP.results.forEach((value) => {
    mp = String(value.provider_id) + "|" + mp;
  });
  let providers = `&watch_region=BR&with_watch_providers=${mp}`;

  const sortBy = () => {
    switch (searchParams?.sort) {
      case "popularity":
      case "revenue":
        return `${searchParams?.sort}.desc`;

      case "release_date":
        return `primary_${searchParams?.sort}.desc`;

      case "vote_average":
        return `${searchParams?.sort}.desc&vote_count.gte=500`;

      default:
        return "popularity.desc";
    }
  };

  let url = `${process.env.DB_API_URL_F}discover/movie${
    process.env.DB_API_BR
  }&include_adult=false&include_video=false&page=${page}${releaseData()}${providers}&sort_by=${sortBy()}${vote()}${genres()}`;

  const res = await fetch(url, {
    cache: "no-store",
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `${process.env.DB_TOKEN_AUTH}`,
    },
  });

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
  const data: DiscoverType = await getFilter(searchParams, provider);

  return (
    <>
      <BlockContainer>
        <div className=" w-full  gridTemplateSpace ">
          {data?.results.map((value) => (
            <div
              className="col-span-5 xs:col-span-5 md:col-span-3 lg:col-span-4 xl:col-span-3 2xl:col-span-4"
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
