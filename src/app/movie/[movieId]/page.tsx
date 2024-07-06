import { DetailsMovieType } from "@/components/utils/types";
import { SubTitle } from "@/components/comps";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getPlaiceholder } from "plaiceholder";
import Videos from "@/components/movie/compsClient";
import GetRecommendations from "@/components/movie/getRecommendations";
import {
  GetPeople,
  GetDirector,
  GetStream,
  GetTranslations,
} from "@/components/movie/comps";
import {
  CardInformation,
  Container,
  LoadingCards,
} from "@/components/frame";
import { Metadata } from "next";

async function getDetails(id: string) {
  const options = {
    headers: {
      accept: "application/json",
      Authorization: `${process.env.DB_TOKEN_AUTH}`,
    },
    next: { revalidate: 3600 },
  };
  const res = await fetch(
    process.env.DB_API_URL + id + "?append_to_response=videos&language=pt-BR&watch_region=BR",
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

export async function generateMetadata({
  params,
}: {
  params: { movieId: string };
}): Promise<Metadata> {
  const data: DetailsMovieType = await getDetails(params.movieId);
  return {
    title: data.title.toString(),
    description: data.overview.substring(0, 160),
    openGraph: {
      images: `https://image.tmdb.org/t/p/w780${data?.poster_path}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
  };
}

export default async function Movie({
  params,
}: {
  params: { movieId: string };
}) {
  const data: DetailsMovieType = await getDetails(params.movieId);
  if (typeof data.poster_path == "string") {
    var css = await getCssBlurIMG(
      "https://image.tmdb.org/t/p/w185" + data.poster_path
    );
  } else {
    var css = {
      backgroundImage: "linear-gradient(to top right, #075985, #3e131ca8)",
      backgroundPosition: "center",
      backgroundSize: "contain",
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
        <div className="w-screen left-[50%] translate-x-[-50%]  h-full absolute top-0  z-[-1] overflow-hidden bg-nightDew-400 ">
          <div
            style={css}
            className="w-full h-full  bg-no-repeat opacity-70   blur-3xl  animate-mainMovie"
          />
          <div className="  w-full h-full absolute top-0 left-0   backdrop-blur-3xl max-md:bg-gradient-to-t max-md:from-black/80 max-md:to-transparent " />
        </div>
          <div className="md:gridTemplateSpace xl:grid-cols-[repeat(20,_minmax(0,_1fr))] items-center blockContainer max-md:flex max-md:flex-col max-md:w-fit max-md:items-start gap-0">
            <div className="md:col-span-4 lg:col-span-5  
             flex justify-start items-center rounded-lg">
              {typeof data.poster_path == "string" ? (
                  <img
                  src={`https://image.tmdb.org/t/p/w500` + data.poster_path}
                  alt={data.original_title}
                  sizes="80vh"
                  className="rounded-lg max-w-full object-contain mid-shadow  max-md:max-w-full max-md:max-h-[75vh] max-md:min-h-80"
                />
           
              ) : (
                <div className="rounded-lg flex flex-col justify-between items-center pb-10 pt-5  w-full h-full overflow-hidden unavailable  break-words  shadow-2xl shadow-nightDew-600 aspect-[18/27] ">
                  <p className="textBtn text-opacity-30  text-wrap  w-min text-center ">
                    imagem indisponível
                  </p>
                  <p className="textBtn  font-extrabold text-2xl  text-wrap text-center ">
                    {data.title}
                  </p>
                </div>
              )}
            </div>
            <dl
              className="relative z-40 md:col-span-8 lg:col-[span_15_/_span_15]   md:px-4 md:pb-4 rounded-lg
              h-auto  "
            >
              <h2
                className="font-semibold tracking-wide text-4xl px-1 py-5 
              md:col-span-4 lg:col-span-5 
                  text-nightDew-100"
              >
                {data.title}
              </h2>
              <dd className="data mb-2  text-nightDew-100 font-semibold mt-[-1.25rem]">
                {data.release_date && (
                  <>{formatDateNumber(data.release_date)}</>
                )}
                {" - "}
                {data.genres && (
                  <>{data.genres.map((value) => value.name).join(", ")}</>
                )}
              </dd>

              {data.overview && (
                <>
                  <dt className="label text-nightDew-100  font-bold">Sinopse:</dt>
                  <dd className="data mb-2 text-nightDew-100  font-semibold">
                    {data.overview}
                  </dd>
                </>
              )}
              <Suspense>
                <GetDirector movieID={params.movieId} />
              </Suspense>
              <Suspense>
                <GetStream movieID={params.movieId} />
              </Suspense>
            </dl>
          </div>
      </div>
      <div className="bg-nightDew-200/70  fixed top-0  left-0 h-11  w-full z-20 " />
      {data.videos.results.length >= 1  && <Videos videosArray={data.videos.results} />}
      <div>
        <SubTitle>Mais detalhes</SubTitle>

        <div className="ListSpacing no-scrollbar ">
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
          </CardInformation>
          <CardInformation>
            {data.runtime && (
              <>
                <dt className="label">Duração:</dt>
                <dd className="data mb-2">
                  {data.runtime && formatTime(data.runtime)}
                </dd>
              </>
            )}
            {data.genres && (
              <>
                <dt className="label">Gêneros:</dt>
                <dd className="data mb-2">
                  {data.genres.map((value, i, a) => value.name).join(", ")}
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
          {(data.belongs_to_collection?.name != undefined || data.homepage) && (
            <CardInformation>
              {data.belongs_to_collection?.name != undefined && (
                <>
                  <dt className="label">Coleção:</dt>
                  <dd className="data mb-2">
                    {data.belongs_to_collection?.name}
                  </dd>
                </>
              )}
              {data.homepage && (
                <dt className="label mb-2">
                  <a
                    href={data.homepage}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="underline p-2 m-[-4px] rounded-lg backBtn-hover"
                  >
                    Site Oficial
                  </a>
                </dt>
              )}
            </CardInformation>
          )}
        </div>
        <div className="blockContainer">
        <CardInformation>
          <Suspense>
            <GetTranslations movieID={params.movieId} />
          </Suspense>
        </CardInformation>
        </div>
      </div>

      <Suspense>
        <GetPeople movieID={params.movieId} />
      </Suspense>

      <Suspense fallback={<LoadingCards size={5} />}>
        <GetRecommendations
          movieID={params.movieId}
          rootFilm={{
            adult: data.adult,
            popularity: data.popularity,
            release_date: data.release_date,
            vote_count: data.vote_count,
            vote_average: data.vote_average,
            genres_id: data.genres.map((value) => value.id),
          }}
        />
      </Suspense>
    </Container>
  );
}
