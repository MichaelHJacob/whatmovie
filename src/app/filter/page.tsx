import { BlockContainer, CardMovie, SubTitle } from "@/components/comps";
import { BtnPages } from "@/components/Compsfilters";
import { DiscoverType, MovieProviders } from "@/components/utils/types";

async function getAllMovieProviders() {
  const res = await fetch(
    `${process.env.DB_API_URL_F}watch/providers/movie?language=pt-BR&watch_region=BR`,{
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

async function getFilter(searchParams: { [key: string]: string }) {
  const dataMP: MovieProviders = await getAllMovieProviders();

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
    if (typeof searchParams?.g == "string") {
      return `&with_genres=${searchParams?.g}`;
    } else {
      return "";
    }
  };

  const releaseDate = () => {
    let date: Date = new Date();
    return (`&primary_release_date.lte=${date.getFullYear()}-${
      date.getMonth() < 9
        ? `0${date.getMonth() + 1}`
        : date.getMonth() + 1}-${date.getDate() <= 9 ?  `0${date.getDate()}` : date.getDate()}`)

}


  const providers = () => {
  if (typeof searchParams.p == "string") {
      return `&with_watch_providers=${searchParams.p}`;
    } else {
      return "";
    }
  };

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

  let url = `${process.env.DB_API_URL_F}discover/movie?language=pt-BR&watch_region=BR&include_adult=false&include_video=false&page=${page}${releaseDate()}${providers()}&sort_by=${sortBy()}${vote()}${genres()}`;


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

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const data: DiscoverType = await getFilter(searchParams);

  return (
    <>
      <BlockContainer>
        <div className=" w-full  gridTemplateSpace  xl:grid-cols-12 2xl:grid-cols-[repeat(20,_minmax(0,_1fr))] xl:gap-[var(--gapMD)] 2xl:gap-[var(--gapLG)]">
          {data?.results.length > 0 ? (
            data?.results.map((value) => (
              <div
                className="col-span-5 xs:col-span-5 md:col-span-3  lg:col-span-4 xl:col-span-3 2xl:col-span-4"
                key={value.id}
              >
                
                <CardMovie data={value} />
              </div>
            ))
          ) : (
            <div>
              <SubTitle>
                Considere um filtro mais amplo para exibir resultados
              </SubTitle>
            </div>
          )}
        </div>
      </BlockContainer>

      <BlockContainer>
        <BtnPages totalPages={data.total_pages} />
      </BlockContainer>
    </>
  );
}
