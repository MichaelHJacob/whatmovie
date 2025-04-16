import { Suspense } from "react";

import { Metadata } from "next";
import { redirect } from "next/navigation";

import Recommendations from "@/app/movie/[movieId]/components/layout/Recommendations";
import Videos from "@/app/movie/[movieId]/components/layout/Videos";
import CardInformation from "@/app/movie/[movieId]/components/ui/CardInformation";
import Director from "@/app/movie/[movieId]/components/ui/Director";
import People from "@/app/movie/[movieId]/components/ui/People";
import Stream from "@/app/movie/[movieId]/components/ui/Stream";
import Translations from "@/app/movie/[movieId]/components/ui/Translations";
import Container from "@/components/layout/Container";
import SkeletonListMovie from "@/components/skeleton/SkeletonListMovie";
import SubTitle from "@/components/ui/SubTitle";
import config from "@/config/apiConfig";
import { DetailsMovieType } from "@/types/globalTypes";
import { getPlaiceholder } from "plaiceholder";

async function getDetails(id: string) {
  const options = {
    headers: {
      accept: "application/json",
      Authorization: `${process.env.DB_TOKEN_AUTH}`,
    },
    next: { revalidate: 3600 },
  };
  const res = await fetch(
    config.apiUrlM +
      id +
      "?append_to_response=videos%2Cwatch%2Fproviders%2Ccredits&language=pt-BR",
    options,
  );

  if (!res.ok) {
    throw new Error("Falha ao buscar dados");
  }
  return res.json();
}

async function getCssBlurIMG(src: string) {
  const buffer = await fetch(src).then(async (res) =>
    Buffer.from(await res.arrayBuffer()),
  );

  const { css } = await getPlaiceholder(buffer);

  if (!css) {
    throw new Error("Falha ao buscar imagem 64");
  }

  return css;
}

type generateMetadataProps = { params: { movieId: string } };

export async function generateMetadata({
  params,
}: generateMetadataProps): Promise<Metadata> {
  const data: DetailsMovieType = await getDetails(params.movieId);
  return {
    title: data.title.toString(),
    description: data.overview.substring(0, 160),
    openGraph: {
      images: `${config.imgUrlL}${data?.poster_path}`,
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

type MovieProps = { params: { movieId: string } };

export default async function Movie({ params }: MovieProps) {
  const data: DetailsMovieType = await getDetails(params.movieId);

  let css = {
    backgroundImage: "linear-gradient(to top right, #075985, #3e131ca8)",
    backgroundPosition: "center",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
  };
  if (typeof data.poster_path == "string") {
    css = await getCssBlurIMG(config.imgUrlS01 + data.poster_path);
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
    const int = Math.trunc(n);
    const length = `${int}`.length;

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
      <div className="paddingHeader relative z-30 h-min w-full">
        <div className="absolute left-[50%] top-0 z-[-1] h-full w-screen translate-x-[-50%] overflow-hidden bg-nightDew-400">
          <div
            style={css}
            className="h-full w-full animate-mainMovie bg-no-repeat opacity-70 blur-3xl"
          />
          <div className="absolute left-0 top-0 h-full w-full bg-black/50 backdrop-blur-3xl" />
        </div>
        <div className="md:gridTemplateSpace blockContainer items-center gap-0 max-md:flex max-md:w-fit max-md:flex-col max-md:items-start xl:grid-cols-[repeat(20,_minmax(0,_1fr))]">
          <div className="max-md:w-full md:col-span-4 lg:col-span-5">
            <div className="relative flex aspect-[2/3] items-center justify-start before:absolute before:z-20 before:block before:aspect-[2/3] before:w-full before:scale-75 before:rounded-xl before:bg-nightDew-600 before:blur-md max-md:max-h-[75vh] max-md:min-h-80">
              {typeof data.poster_path == "string" ? (
                <img
                  srcSet={`${config.imgUrlS}${data.poster_path} 342w, ${config.imgUrlM}${data.poster_path} 500w, ${config.imgUrlL}${data.poster_path} 780w`}
                  sizes="(max-width: 342px) 342px, (max-width: 500px) 500px, (max-width: 767px) 780px, (min-width: 768px) 300px, 500px"
                  src={`${config.imgUrlM}${data.poster_path}`}
                  alt={data.original_title}
                  className="mid-shadow z-30 rounded-lg object-contain contrast-[1.1]"
                />
              ) : (
                <div className="unavailable mid-shadow z-30 flex aspect-[2/3] h-full w-full flex-col items-center justify-center gap-5 overflow-hidden break-words rounded-lg pb-10 pt-10 contrast-[1.1] backdrop-blur-xl">
                  <p className="textBtn w-full text-wrap text-center text-nightDew-300 text-opacity-30">
                    imagem indisponível
                  </p>
                  <p className="textBtn w-full text-wrap px-3 text-center text-lg text-nightDew-300 text-opacity-20">
                    {data.title}
                  </p>
                </div>
              )}
            </div>
          </div>
          <dl className="relative z-40 h-auto rounded-lg md:col-span-8 md:px-4 md:pb-4 lg:col-[span_15_/_span_15]">
            <h2 className="px-1 py-5 text-4xl font-semibold tracking-wide text-nightDew-100 md:col-span-4 lg:col-span-5">
              {data.title}
            </h2>
            <dd className="data mb-2 mt-[-1.25rem] font-semibold text-nightDew-100">
              {data.release_date && <>{formatDateNumber(data.release_date)}</>}
              {" - "}
              {data.genres && (
                <>{data.genres.map((value) => value.name).join(", ")}</>
              )}
            </dd>

            {data.overview && (
              <>
                <dt className="label font-bold text-nightDew-100">Sinopse:</dt>
                <dd className="data mb-2 font-semibold text-nightDew-100">
                  {data.overview}
                </dd>
              </>
            )}
            <Director credits={data.credits.crew} />
            <Stream provider={data["watch/providers"].results.BR} />
          </dl>
        </div>
      </div>

      {data.videos.results.length >= 1 && (
        <Videos videosArray={data.videos.results} />
      )}

      <div>
        <SubTitle>Mais detalhes</SubTitle>

        <div className="ListSpacing no-scrollbar">
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
                  {data.genres.map((value) => value.name).join(", ")}
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
                  <ul className="list-none">
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
                  <ul className="list-none">
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
                    className="backBtn-hover m-[-4px] rounded-lg p-2 underline"
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
              <Translations movieId={params.movieId} />
            </Suspense>
          </CardInformation>
        </div>
      </div>
      <People cast={data.credits.cast} crew={data.credits.crew} />

      <Suspense fallback={<SkeletonListMovie />}>
        <Recommendations
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
