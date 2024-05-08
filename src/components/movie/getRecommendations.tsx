import { BlockContainer } from "@/components/frame";
import { SubTitle, ListMovie } from "@/components/comps";
import { ListControl } from "../client/comps";

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
          <ListControl
            id={"Recomendacoes"}
            length={DtRecommendations.results.length}
          >
            <ListMovie data={DtRecommendations.results} id={"Recomendacoes"} />
          </ListControl>
        </BlockContainer>
      </section>
    );
  } else {
    return <span className="hidden">Recomendações não disponível</span>;
  }
}
