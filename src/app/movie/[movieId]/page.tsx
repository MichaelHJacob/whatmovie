import {
  DetailsMovieType,
  CreditsType,
  VideosType,
  CrewType,
} from "@/components/utils/types";
import {
  BlockContainer,
  Break,
  CardInformation,
  Container,
  ListMovie,
  ListPeople,
  SubTitle,
} from "@/components/comps";
import Image from "next/image";
import { redirect } from "next/navigation";
import { getPlaiceholder } from "plaiceholder";
import Videos from "./Videos";

// async function getBase64(src: string) {
//   const buffer = await fetch(src).then(async (res) =>
//     Buffer.from(await res.arrayBuffer())
//   );

//   // const { base64 } = await getPlaiceholder(buffer);

//   // if (!base64) {
//   //   throw new Error("Falha ao buscar imagem 64");
//   // }

//   // return base64;
// }

async function getDetails(id: string) {
  const options = {
    headers: {
      accept: "application/json",
      Authorization: `${process.env.DB_TOKEN_AUTH}`,
    },
  };
  const res = await fetch(
    process.env.DB_API_URL + id + process.env.DB_API_BR,
    options
  );

  if (!res.ok) {
    throw new Error("Falha ao buscar dados");
  }
  return res.json();
}

async function getCssBlurIMG(src: string) {
  const buffer = await fetch(src).then(async (res) =>
    Buffer.from(await res.arrayBuffer())
  );

  const { css } = await getPlaiceholder(buffer);

  if (!css) {
    throw new Error("Falha ao buscar imagem 64");
  }

  return css;
}

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
async function getSimilar(movieID: string) {
  const options = {
    headers: {
      accept: "application/json",
      Authorization: `${process.env.DB_TOKEN_AUTH}`,
    },
  };
  const res = await fetch(
    process.env.DB_API_URL + movieID + "/similar?language=pt-BR&page=1",
    options
  );

  if (!res.ok) {
    throw new Error("Falha ao buscar dados");
  }
  return res.json();
}

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

async function getVideos(movieID: string) {
  const options = {
    headers: {
      accept: "application/json",
      Authorization: `${process.env.DB_TOKEN_AUTH}`,
    },
  };
  const res = await fetch(
    process.env.DB_API_URL + movieID + "/videos?language=pt-BR",
    options
  );

  if (!res.ok) {
    throw new Error("Falha ao buscar dados");
  }
  return res.json();
}

export default async function Movie({
  params,
}: {
  params: { movieId: string };
}) {
  const data: DetailsMovieType = await getDetails(params.movieId);
  const DtRecommendations = await getRecommendations(params.movieId);
  const Credits: CreditsType = await getCredits(params.movieId);
  const DtSimilar = await getSimilar(params.movieId);
  // const base64 = await getBase64(process.env.DB_IMG_URL_S + data.poster_path);
  const css = await getCssBlurIMG(process.env.DB_IMG_URL_S + data.poster_path);
  const videos: VideosType = await getVideos(params.movieId);

  if (!data || !params.movieId) {
    redirect("/");
  }

  function formatDate(date: string) {
    const d = new Date(date);
    return (
      <span className="lowercase">
        {d.toLocaleDateString("pt-BR", { dateStyle: "long" })}
      </span>
    );
  }
  function formatDateNumber(date: string) {
    const d = new Date(date);
    return <>{d.toLocaleDateString("pt-BR")}</>;
  }

  function formatTime(time: number) {
    if (time < 60) {
      return <> {time} min</>;
    } else {
      return (
        <>
          {Math.floor(time / 60)} h {time % 60} min
        </>
      );
    }
  }

  function formatNumber(n: number) {
    let int = Math.trunc(n);
    let length = `${int}`.length;

    if (length <= 6) {
      return (
        <>
          {Math.ceil(int / 1000).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            currencyDisplay: "symbol",
            useGrouping: true,
            minimumFractionDigits: 0,
          })}{" "}
          mil
        </>
      );
    } else if (length >= 7) {
      if (n === 1000000) {
        return (
          <>
            {Math.ceil(int / 1000000).toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
              currencyDisplay: "symbol",
              useGrouping: true,
              minimumFractionDigits: 0,
            })}{" "}
            milhão
          </>
        );
      } else {
        return (
          <>
            {Math.ceil(int / 1000000).toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
              currencyDisplay: "symbol",
              useGrouping: true,
              minimumFractionDigits: 0,
            })}{" "}
            milhões
          </>
        );
      }
    }
  }

  function getDirector() {
    for (let value of Credits.crew) {
      if (value.job === "Director") {
        return value.name;
      }
    }
  }

  return (
    <Container>
      
      <div className="h-min w-full relative paddingHeader z-30">
        <div className="w-screen left-[50%] translate-x-[-50%]  h-full absolute top-0  z-[-1] overflow-hidden">
          <div
            className="  w-full h-full bg-no-repeat  opacity-50   blur-3xl transform scale-125 "
            style={css}
          />
        </div>
        <BlockContainer>
          
          <div className="md:gridTemplateSpace  ">
            {/* mt-[calc(var(--p)*-1)] 
                 max-xs:mt-[calc(var(--pXS)*-1)] */}
            <div className="relative  md:col-span-4 lg:col-span-5 overflow-visible">
              <Image
                src={process.env.DB_IMG_URL_L + data.poster_path}
                // blurDataURL={base64}
                alt={data.original_title}
                width={780}
                height={1170}
                // placeholder="blur"
                sizes="80vh"
                className="rounded-lg  shadow-2xl shadow-gray-700/100 "
                priority={true}
              />
            </div>
            <dl className="relative z-40 md:col-span-8 lg:col-[span_15_/_span_15] max-md:bg-gray-950/50 max-md:backdrop-blur-3xl rounded-lg px-4 pb-4 ">
              <h2
                className="uppercase font-semibold tracking-widest text-4xl px-1 py-5 max-md:text-Background text-black  
              md:col-span-4 lg:col-span-5
                 mt-[calc(var(--p)*-1)]  "
              >
                {data.title}
              </h2>
              <dd className="data mb-2 max-md:text-Background text-black mt-[-1.25rem] ">
                {data.release_date && (
                  <>{formatDateNumber(data.release_date)}</>
                )}{" "}
                {data.genres && (
                  <>
                    {data.genres.map((value, i, a) => (
                      <>
                        {value.name}
                        {i + 1 < a.length && ", "}
                      </>
                    ))}
                  </>
                )}
              </dd>

              {data.overview && (
                <>
                  <dt className="label max-md:text-Background text-black">
                    Sinopse:
                  </dt>
                  <dd className="data mb-2 max-md:text-Background text-black    ">
                    {" "}
                    {data.overview}
                  </dd>
                </>
              )}

              {getDirector() !== undefined && (
                <>
                  <dt className="label max-md:text-Background text-black">
                    Diretor:
                  </dt>
                  <dd className="data mb-2 max-md:text-Background text-black">
                    {" "}
                    {getDirector()}
                  </dd>
                </>
              )}
            </dl>
          </div>
        </BlockContainer>
      </div>
      <div className="    bg-Background/70 fixed top-0  left-0 h-11  w-full    z-20 "   />
      {/* <div className="bg-gradient-to-b from-Background  via-Background/20 bg-transparent  sticky top-0  left-0 h-[5.5rem] backdrop-blur-[1px] w-full    z-10 " /> */}
     
      <BlockContainer>
     
        <SubTitle>Mais detalhes</SubTitle>

        <div className="ListSpacing">
          <CardInformation>
            {data.original_title && (
              <>
                <dt className="label">Titulo original:</dt>
                <dd className="data mb-2"> {data.original_title}</dd>
              </>
            )}
            {data.original_language && (
              <>
                <dt className="label">Idioma original:</dt>
                <dd className="data mb-2"> {data.original_language}</dd>
              </>
            )}
            {data.release_date && (
              <>
                <dt className="label">Data de lançamento:</dt>
                <dd className="data mb-2">{formatDate(data.release_date)}</dd>
              </>
            )}
            {data.runtime && (
              <>
                <dt className="label">Duração:</dt>
                <dd className="data mb-2">
                  {data.runtime && formatTime(data.runtime)}
                </dd>
              </>
            )}
          </CardInformation>
          <CardInformation>
            {data.belongs_to_collection?.name != undefined && (
              <>
                <dt className="label">Coleção:</dt>
                <dd className="data mb-2">
                  {data.belongs_to_collection?.name}
                </dd>
              </>
            )}
            {data.budget !== 0 && (
              <>
                <dt className="label">Orçamento:</dt>
                <dd className="data mb-2"> {formatNumber(data.budget)}</dd>
              </>
            )}
            {data.revenue !== 0 && (
              <>
                <dt className="label">Receita:</dt>
                <dd className="data mb-2"> {formatNumber(data.revenue)}</dd>
              </>
            )}
            {data.genres && (
              <>
                <dt className="label">Gêneros:</dt>
                <dd className="data mb-2">
                  {data.genres.map((value, i, a) => (
                    <>
                      {value.name}
                      {i + 1 < a.length && ", "}
                    </>
                  ))}
                </dd>
              </>
            )}
            {data.homepage && (
              <>
                <dt className="label">Data de lançamento:</dt>
                <dd className="data mb-2">
                  <a
                    href={data.homepage}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    Site Oficial
                  </a>
                </dd>
              </>
            )}
          </CardInformation>
          <CardInformation>
            {data.production_companies.length != 0 && (
              <>
                <dt className="label">Produzido por:</dt>
                <dd className="data mb-2">
                  <ul className="list-none ">
                    {data.production_companies.map((value, i, a) => (
                      <li key={i} className="mr-1">
                        {value.name}
                        {i + 1 < a.length && ", "}
                      </li>
                    ))}
                  </ul>
                </dd>
              </>
            )}
            {data.production_countries && (
              <>
                <dt className="label">Pais de produção:</dt>
                <dd className="data mb-2">
                  <ul className="list-none ">
                    {data.production_countries.map((value, i, a) => (
                      <li key={i} className="mr-1">
                        {value.name}
                        {i + 1 < a.length && ", "}
                      </li>
                    ))}
                  </ul>
                </dd>
              </>
            )}
          </CardInformation>
        </div>
      </BlockContainer>

      {videos.results.length > 0 && <Videos videosArray={videos.results} />}

      
        {((Credits.cast.length >= 1 || Credits.crew.length >= 1) || (Credits.cast.length >= 1 && Credits.crew.length >= 1)) && (
          <>
          <Break />
          <BlockContainer>
            <SubTitle>Elenco e equipe</SubTitle>
            <ListPeople data={Credits} />
          </BlockContainer>
          </>
        
         )} 

      {DtRecommendations.results.length >= 1 && (
        <section className="bg-Surface  ">
          <BlockContainer>
            <SubTitle>Recomendações</SubTitle>
            <ListMovie data={DtRecommendations.results} />
          </BlockContainer>
        </section>
      )}
    </Container>
  );
}
