import {
  DetailsMovieType,
  CreditsType,
  VideosType,
} from "@/components/utils/types";
import {
  BlockContainer,
  Break,
  CardInformation,
  Container,
  ListPeople,
  SubTitle,
} from "@/components/comps";
// import Image from "next/image";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getPlaiceholder } from "plaiceholder";
import GetVideo from "./getVideos";
import GetRecommendations, { LoadingCardsList } from "./getRecommendations";
import GetPeople from "./getPeople";

async function getDetails(id: string) {
  const options = {
    headers: {
      accept: "application/json",
      Authorization: `${process.env.DB_TOKEN_AUTH}`,
    },
  };
  const res = await fetch(
    process.env.DB_API_URL + id + "?language=pt-BR&watch_region=BR",
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


// async function getSimilar(movieID: string) {
//   const options = {
//     headers: {
//       accept: "application/json",
//       Authorization: `${process.env.DB_TOKEN_AUTH}`,
//     },
//   };
//   const res = await fetch(
//     process.env.DB_API_URL + movieID + "/similar?language=pt-BR&page=1",
//     options
//   );

//   if (!res.ok) {
//     throw new Error("Falha ao buscar dados");
//   }
//   return res.json();
// }





export default async function Movie({
  params,
}: {
  params: { movieId: string };
}) {
  const data: DetailsMovieType = await getDetails(params.movieId);
  // const DtRecommendations = await getRecommendations(params.movieId);

  // const DtSimilar = await getSimilar(params.movieId);
  // const base64 = await getBase64(process.env.DB_IMG_URL_S + data.poster_path);
  if (typeof data.poster_path == "string") {
    var css = await getCssBlurIMG(process.env.DB_IMG_URL_S + data.poster_path);
  } else {
    var css = {
      backgroundImage: "linear-gradient(to top right, #075985, #3e131ca8)",
      backgroundPosition: "center",
      backgroundSize: "100%, 100%",
      backgroundRepeat: "no-repeat",
    };
  }



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



  return (
    <Container>
      <div className="h-min w-full relative paddingHeader z-30">
        <div className="w-screen left-[50%] translate-x-[-50%]  h-full absolute top-0  z-[-1] overflow-hidden">
          <div
            className="  w-full h-full  bg-no-repeat saturate-150  blur-3xl transform scale-125 animate-mainMovie  "
            style={css}
          />
          <div
            className="  w-full h-full absolute top-0 left-0  bg-white/50 "
            
          />


        </div>
        <BlockContainer>
          <div className="md:gridTemplateSpace  ">

            <div className="relative  md:col-span-4 lg:col-span-5 overflow-visible">
              {typeof data.poster_path == "string" ? (
                <img
                  src={process.env.DB_IMG_URL_L + data.poster_path}
                  // blurDataURL={base64}
                  alt={data.original_title}
                  width={780}
                  height={1170}
                  // placeholder="blur"
                  sizes="80vh"
                  className="rounded-lg  shadow-2xl shadow-black/40"
                />
              ) : (
                <div className="rounded-lg flex flex-col justify-between items-center pb-10 pt-5  w-full h-full overflow-hidden bg-gradient-to-b from-solid-pink-950/5 to-neutral-500/15  break-words  shadow-xl shadow-black/30 aspect-[18/27] ">
                  <p className="filter-TextBtn text-solid-pink-950/30  text-wrap  w-min text-center ">
                    imagem indisponível
                  </p>
                  <p className="filter-TextBtn  font-extrabold text-2xl  text-wrap text-center ">
                    {data.title}
                  </p>
                </div>
              )}
            </div>
            {/* before:absolute before:animate-deform before:h-full before:w-full before:bg-black/50 before:blur-3xl before:z-[-2] */}
            <dl className="relative z-40 md:col-span-8 lg:col-[span_15_/_span_15] max-md:bg-gray-950/50 max-md:backdrop-blur-3xl rounded-lg px-4 pb-4 
             text-black">
              <h2
                className="uppercase font-semibold tracking-widest text-4xl px-1 py-5 max-md:text-Background text-black  
              md:col-span-4 lg:col-span-5
                 mt-[calc(var(--p)*-1)]  "
              >
                {data.title}
              </h2>
              <dd className="data mb-2  max-md:text-Background text-black font-semibold mt-[-1.25rem] ">
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
                  <dt className="label max-md:text-Background text-black font-bold">
                    Sinopse:
                  </dt>
                  <dd className="data mb-2 max-md:text-Background text-black font-semibold    ">
                    {" "}
                    {data.overview}
                  </dd>
                </>
              )}

              {/* {getDirector() !== undefined && (
                <>
                  <dt className="label max-md:text-Background text-black">
                    Diretor:
                  </dt>
                  <dd className="data mb-2 max-md:text-Background text-black">
                    {" "}
                    {getDirector()}
                  </dd>
                </>
              )} */}
            </dl>
          </div>
        </BlockContainer>
      </div>
      <div className="    bg-Background/70 fixed top-0  left-0 h-11  w-full    z-20 " />

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

      <Suspense fallback={<div className="bg-Surface w-full aspect-video animate-pulse "/>}>
      <GetVideo movieID={params.movieId} />
      </Suspense>


      <Suspense>
      <GetPeople movieID={params.movieId} />
      </Suspense>



      <Suspense fallback={<LoadingCardsList />}>
      <GetRecommendations movieID={params.movieId} />
      </Suspense>

    </Container>
  );
}
