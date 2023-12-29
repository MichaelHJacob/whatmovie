import AllMovieProviders from "@/components/Provider";
import { BlockContainer, CardMovie } from "@/components/comps";
import FilterContainer from "@/components/filters";
import { DiscoverType, ListGenres, MovieProviders } from "@/components/utils/types";

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
  searchParams:{ [key: string]: string }, selectedMp : string
 
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
  //  console.log(selectedMp)
  //  console.log(mp)
  // mp = selectedMp;

  let sort: string;
  let providers = `&watch_region=BR&with_watch_providers=${mp}`;
  // let providers  = `&watch_region=BR&with_watch_providers=${String(337)++String(350)}`;
  // console.log(providers);

  // let count_v = "&vote_count.gte=100"
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

  let url = `${process.env.DB_API_URL_F}discover/movie${process.env.DB_API_BR}&include_adult=false&include_video=false&page=${page}&primary_release_date.lte=2023-12-29${count_v}${providers}&sort_by=${sort}${
    searchParams?.vote_gte !== undefined ? g + searchParams?.vote_gte : ""
  }${searchParams?.vote_lte !== undefined ? l + searchParams?.vote_lte : ""}`;
console.log(url)
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
async function getAllGenres(){
  const res = await fetch(
    `${process.env.DB_API_URL_F}watch/providers/movie?language=pt-BR&watch_region=BR`,
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
  let provider = "350"

  const data: DiscoverType = await getFilter( searchParams, provider);
  const dataMP: MovieProviders = await getAllMovieProviders();
  const genres: ListGenres = await getAllGenres();
 
  async function call(e: { target: { value: string; }; }){
   
    const data: DiscoverType = await getFilter( searchParams,  e.target.value);
  }

  return (
    <>

      {/* <div className="bg-gradient-to-b from-[#BEC3C4] xl:from-[#D7DCDD] via-[#BEC3C4]/80 xl:via-[#D7DCDD]/70 dark:from-[#0A0A0A] xl:dark:from-[#0A0A0A]  dark:to-transparent xl:dark:to-transparent xl:dark:via-[#0a0a0a83] fixed top-0  left-0 h-16 w-full z-[45]  backdrop-blur-sm " /> */}
      <div className="bg-gradient-to-b from-Background  via-Background/80 to-transparent  fixed top-0  left-0 h-[3.25rem] xs:h-[4rem] lg:h-[4.25rem] w-full z-[45]  backdrop-blur-sm " />

      <FilterContainer totalPages={data.total_pages} allMP={dataMP}  />
 
  <BlockContainer>

  <div className=" w-full  gridTemplateSpace">
        {data?.results.map((value) => (
          <div className="col-span-5 xs:col-span-5 md:col-span-3 lg:col-span-4" key={value.id}>
            
            <CardMovie data={value} />

          </div>
        ))}
      </div>
  </BlockContainer>
    </>
  );
}


