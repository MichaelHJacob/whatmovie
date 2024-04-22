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

async function getProvider(movieID: string) {
  const options = {
    headers: {
      accept: "application/json",
      Authorization: `${process.env.DB_TOKEN_AUTH}`,
    },
  };
  const res = await fetch(
    process.env.DB_API_URL + movieID + "/watch/providers",
    options
  );

  if (!res.ok) {
    throw new Error("Falha ao buscar dados");
  }
  return res.json();
}
async function getTranslations(movieID: string) {
  const options = {
    headers: {
      accept: "application/json",
      Authorization: `${process.env.DB_TOKEN_AUTH}`,
    },
  };
  const res = await fetch(
    process.env.DB_API_URL + movieID + "/translations",
    options
  );

  if (!res.ok) {
    throw new Error("Falha ao buscar dados");
  }
  return res.json();
}

export async function GetPeople({ movieID }: { movieID: string }) {
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

export async function GetDirector({ movieID }: { movieID: string }) {
  const Credits: CreditsType = await getCredits(movieID);

  if (Credits.crew.length >= 1) {
    return (
      <>
        <dt className="label text-Background  font-bold">Diretor:</dt>
        <dd className="data mb-2 text-Background  font-semibold">
          {Credits.crew
            .filter((value) => value.job == "Director")
            .map((value) => value.name)
            .join(", ")}
        </dd>
      </>
    );
  }
}

export async function GetStream({ movieID }: { movieID: string }) {
  const providers = await getProvider(movieID);

  if (
    typeof providers.results == "object" &&
    typeof providers.results.BR == "object" &&
    typeof providers.results.BR.flatrate == "object"
  ) {
    return (
      <>
        <dt className="label mb-2 text-Background font-bold">Disponível em:</dt>
       
        <dd className="flex flex-row flex-wrap w-full gap-[--gap] xs:gap-[--gapXS] md:gap-[--gapMD] lg:gap-[--gapLG]  ">
          {providers.results.BR.flatrate
            .map((value, i, arr ) => <span className="mb-1 inline-flex h-11 w-fit  items-center gap-[calc(var(--gap)/2)] xs:gap-[calc(var(--gapXS)/2)] md:gap-[calc(var(--gapMD)/2)] lg:gap-[calc(var(--gapLG)/2)]
            ">
         
          <img
            className="rounded-xl h-10 aspect-square select-none "
            src={`https://image.tmdb.org/t/p/w342${value.logo_path}`}
            alt={`logo ${value.provider_name}`}
          />
          <span className="data font-semibold  text-Background  ">{value.provider_name}</span>
          <span className={`data text-Background select-none ${i+1 == arr.length && 'hidden'}`}>|</span> 
          </span>)}
          </dd>
      </>
    );
  }
}
export async function GetTranslations({ movieID }: { movieID: string }) {
  const resul = await getTranslations(movieID);

  if (
    typeof resul.translations == "object"
  ){
    return (
      <>
        <dt className="label mb-1">Traduções:</dt>    
        <dd className="data mb-2">
          <>{resul.translations.map((value) => value.name + "-" + value.iso_3166_1).join(", ")}</>
        </dd>
      </>
    );
  }
}
