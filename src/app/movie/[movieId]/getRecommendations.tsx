
import { BlockContainer, ListMovie, SubTitle } from "@/components/comps";
import { Fragment } from "react";

async function getRecommendations(movieID: string) {
    const options = {
      headers: {
        accept: "application/json",
        Authorization: `${process.env.DB_TOKEN_AUTH}`,
      },
    };
    const res = await fetch(
      process.env.DB_API_URL + movieID + "/recommendations?language=pt-BR&page=1",
      options
    );
  
    if (!res.ok) {
      throw new Error("Falha ao buscar dados");
    }
    return res.json();
  }

export function LoadingCardsList() {
    const skeleton = [];
  
    for (let i = 0; i <= 5; i++) {
      skeleton.push(
        <li
        className="col-span-5 xs:col-span-5 md:col-span-3 lg:col-span-4 snap-start landscape:short:lg:col-span-3 aspect-[18/27] bg-onSurface2/10 animate-pulse rounded-lg shadow-xl shadow-black/30 "
          key={i}
        >
        </li>
      );
    }
  
    return (
        <ul className="ListSpacing list-none ">
        {skeleton.map((value, index) => ( <Fragment key={index}>{value}</Fragment> ))}
      </ul>
    );
  }

export default async function GetRecommendations({
  movieID,
}: {
  movieID: string;
}) {
    const DtRecommendations = await getRecommendations(movieID);

  if (DtRecommendations.results.length >= 1) {
    return (
        <section className="bg-Surface relative  before:bg-Surface  before:w-screen before:h-full before:absolute before:bottom-0 before:left-[50%] before:translate-x-[-50%] before:z-[-1]">
          <BlockContainer>
            <SubTitle>Recomendações</SubTitle>
            <ListMovie data={DtRecommendations.results} />
          </BlockContainer>
        </section>
    );
  } else {
    return <span className="hidden">Recomendações não disponível</span>;
  }
}
