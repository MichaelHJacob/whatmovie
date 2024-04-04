import { BlockContainer, Break } from "@/components/frame";
import { ListPeople, SubTitle } from "@/components/comps";
import { CreditsType } from "@/components/utils/types";
import { ListControl } from "../client/comps";

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

export  async function GetPeople({ movieID }: { movieID: string }) {
  const Credits: CreditsType = await getCredits(movieID);

  if (Credits.cast.length >= 1 || Credits.crew.length >= 1) {

    return (
      <>
        <Break />
        <BlockContainer>
          <SubTitle>Elenco e equipe</SubTitle>
          <ListControl
            id="ElencoEquipe"
            length={Credits.cast.length + Credits.crew.length}
          >
            <ListPeople data={Credits} id="ElencoEquipe" />
          </ListControl> 
        </BlockContainer>
      </>  
    );
  } else {
    return <span className="hidden">Recomendações não disponível</span>;
  }
}
export  async function GetDirector({ movieID }: { movieID: string }) {
  const Credits: CreditsType = await getCredits(movieID);
  
  function getDirector(){
   
    return <>{Credits.crew.filter((value) => value.job == 'Director').map((value) => value.name).join(', ')}</>
  }

  if (Credits.crew.length >= 1) {

    return (
      <>
      <dt className="label max-md:text-Background text-black font-bold">
        Diretor:
      </dt>
      <dd className="data mb-2 max-md:text-Background text-black font-semibold">
        {getDirector()}
      </dd>
    </>
    );
  }
}
