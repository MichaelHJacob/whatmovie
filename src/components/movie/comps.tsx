import { Break } from "@/components/frame";
import { ListPeople, SubTitle } from "@/components/comps";
import {
  CreditsType,
  CrewType,
  Provider,
  WMProviderType,
  TranslationsType,
  PropsPeople,
} from "@/components/utils/types";
import { ListControl } from "@/components/client/comps";
import config from "@/components/utils/config";

async function getCredits(movieID: string) {
  const options = {
    headers: {
      accept: "application/json",
      Authorization: `${process.env.DB_TOKEN_AUTH}`,
    },
  };
  const res = await fetch(
    config.apiUrlM + movieID + "/credits?language=pt-BR",
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
    config.apiUrlM + movieID + "/watch/providers",
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
    config.apiUrlM + movieID + "/translations",
    options
  );

  if (!res.ok) {
    throw new Error("Falha ao buscar dados");
  }
  return res.json();
}


export function People({ cast = [], crew = [] } : PropsPeople ) {

  if ((cast.length >= 1) || (crew.length >= 1)) {
    return (
      <>
        <Break />
        <div>
          <SubTitle>Elenco e equipe</SubTitle>
          <ListControl id="ElencoEquipe" length={cast.length + crew.length}>
            <ListPeople cast={cast} crew={crew} id="ElencoEquipe" />
          </ListControl>
        </div>
      </>
    );
  }
}

export async function GetPeople({ movieID }: { movieID: string }) {
  const Credits: CreditsType = await getCredits(movieID);

  if (Credits.cast.length >= 1 || Credits.crew.length >= 1) {
    return <People cast={Credits.cast} crew={Credits.crew} />;
  }
}

export function Director({ credits }: { credits?: CrewType[] }) {
  if (credits && credits.length >= 1 ) {
  return (
    <>
      <dt className="label text-nightDew-200  font-bold">Diretor:</dt>
      <dd className="data mb-2 text-nightDew-200  font-semibold">
        {credits
          .filter((value) => value.job == "Director")
          .map((value) => value.name)
          .join(", ")}
      </dd>
    </>
  )};
}

export async function GetDirector({ movieID }: { movieID: string }) {
  const Credits: CreditsType = await getCredits(movieID);

  if (Credits.crew.length >= 1) {
    return <Director credits={Credits.crew} />;
  }
}

export function Stream({ WMBR }: { WMBR?: Provider }) {
  if(WMBR !== undefined && WMBR.flatrate !== undefined && WMBR.flatrate.length >= 1 ){
  return (
    <>
      <dt className="label mb-2 text-nightDew-200 font-bold">Disponível em:</dt>

      <dd className="flex flex-row flex-wrap w-full gap-[--gap] xs:gap-[--gapXS] md:gap-[--gapMD] lg:gap-[--gapLG]  ">
        {WMBR.flatrate.map((value, i: number, arr) => (
          <div
            key={i}
            className="mb-1 inline-flex h-11 w-fit  items-center gap-[calc(var(--gap)/2)] xs:gap-[calc(var(--gapXS)/2)] md:gap-[calc(var(--gapMD)/2)] lg:gap-[calc(var(--gapLG)/2)] 
        "
          >
            <img
              className="rounded-xl h-10 w-10 select-none contrast-[1.1]"
              srcSet={`${config.imgUrlS01}${value.logo_path}, ${config.imgUrlS03}${value.logo_path} 2x`}
              src={`${config.imgUrlS01}${value.logo_path}`}
              alt={`logo ${value.provider_name}`}
            />
            <div
              className={`data font-semibold text-nightDew-200 ${
                arr.length > 2 && "max-sm:hidden"
              }`}
            >
              {value.provider_name}{" "}
              <span
                className={`data text-nightDew-200 select-none ${
                  i + 1 == arr.length && "hidden"
                }`}
              >
                |
              </span>
            </div>
          </div>
        ))}
      </dd>
    </>
  )};
}

export async function GetStream({ movieID }: { movieID: string }) {
  const providers: WMProviderType = await getProvider(movieID);

  if (
    providers.results.BR?.flatrate.length !== undefined &&
    providers.results.BR?.flatrate.length >= 1
  ) {
    <Stream WMBR={providers.results.BR} />;
  }
}

export async function GetTranslations({ movieID }: { movieID: string }) {
  const result: TranslationsType = await getTranslations(movieID);

  if (typeof result.translations == "object") {
    return (
      <>
        <dt className="label mb-1">Traduções:</dt>
        <dd className="data mb-2">
          <>
            {result.translations
              .map((value) => value.name + "-" + value.iso_3166_1)
              .join(", ")}
          </>
        </dd>
      </>
    );
  }
}
