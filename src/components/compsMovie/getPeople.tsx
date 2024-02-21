import { BlockContainer, Break, ListPeople, SubTitle } from "@/components/comps";
import { CreditsType } from "@/components/utils/types";

async function getCredits(movieID: string) {
    const options = {
      headers: {
        accept: "application/json",
        Authorization: `${process.env.DB_TOKEN_AUTH}`,
      },
    };
    const res = await fetch(
      process.env.DB_API_URL + movieID + "/credits?language=pt-BR",
      options
    );
  
    if (!res.ok) {
      throw new Error("Falha ao buscar dados");
    }
    return res.json();
  }

export default async function GetPeople({movieID} : {movieID: string}) {
    const Credits: CreditsType = await getCredits(movieID);
    let cast = false;
    let crew = true;

    if (Credits.cast.length >= 1 || Credits.crew.length >= 1) {
        return (
            <>
            <Break />
            <BlockContainer>
              <SubTitle>Elenco e equipe</SubTitle>
              <ListPeople data={Credits} />
            </BlockContainer>
          </>
        );
      } else {
        return <span className="hidden">Recomendações não disponível</span>;
      }
}