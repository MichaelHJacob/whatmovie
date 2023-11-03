import CardMovie from "@/components/cardMovie";
import { DiscoverType } from "@/components/utils/types";
// import { Suspense } from "react";
import "@/components/comp.css";
// import FilterBtn from "@/components/filterServer/btnFilter";
// import {BtnPages} from "@/components/filters/btn";
import FilterContainer, {BtnPages}from "@/components/filters";
// import Image from "next/image"

async function getFilter({searchParams}: {searchParams: { [key: string]: string | string[] | undefined } }) {
  const page = Number(searchParams?.page) || 1;
  const sort = String((searchParams?.sort) || 'popularity')

  const options = {
    headers: {
      accept: "application/json",
      Authorization: `${process.env.DB_TOKEN_AUTH}`,
    },
  };
  const res = await fetch(
    // `${process.env.DB_API_URL_DISCOVER}movie${process.env.DB_API_BR}&include_adult=false&include_video=false&page=2${slug}`,
    // "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=pt-BR&page=3&sort_by=primary_release_date.desc&year=2023",
    `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=pt-BR&page=${page}&sort_by=${sort}.desc&year=2023`,
    options
  );

  if (!res.ok) {
    throw new Error("Falha ao buscar dados");
  }
  return res.json();
}

export default async function CardsFilter({searchParams}: {searchParams: { [key: string]: string | string[] | undefined } }){
  
  // const page = Number(searchParams?.page) || 1;
 
  const data: DiscoverType = await getFilter({searchParams});

//   {
//   params,
// }: {
//   params: { sort: string, release: string, voteg: string, votei:string, genres: string, providers: string };
// }) {
 
  


  return (
<div>
    
      <FilterContainer  >
      {/* <BtnSortBy searchParams={searchParams}/> */}
      <BtnPages totalPages={data.total_pages}  />

      </FilterContainer>
      <div className="min-h-screen w-full  grade">
       
        {data?.results.map((value) => (
          <div key={value.id} >
            <CardMovie data={value} />
          </div>
        ))}
      </div>
      </div>
  );
}
