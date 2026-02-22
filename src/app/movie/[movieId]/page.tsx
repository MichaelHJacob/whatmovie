import { Suspense } from "react";

import { Metadata } from "next";
import { notFound } from "next/navigation";

import Videos from "@/app/movie/[movieId]/components/layout/Videos";
import Recommendations from "@/app/movie/[movieId]/components/layout/WmRecommendations";
import CardInformation from "@/app/movie/[movieId]/components/ui/CardInformation";
import People from "@/app/movie/[movieId]/components/ui/People";
import Stream from "@/app/movie/[movieId]/components/ui/Stream";
import Translations from "@/app/movie/[movieId]/components/ui/Translations";
import Container from "@/components/layout/Container";
import SkeletonListMovie from "@/components/skeleton/SkeletonListMovie";
import HTitle from "@/components/ui/HTitle";
import { POSTER } from "@/config/imageConfig";
import { getMovieDetails } from "@/lib/api/tmdb/use-cases/getMovieDetails";
import { getPopular } from "@/lib/api/tmdb/use-cases/getPopular";
import { generateImageBlur } from "@/lib/utils/generateImageBlur";
import getFormattedDate from "@/lib/utils/getFormattedDate";
import { NotFoundError } from "@/lib/validation/extendExpectedError";
import clsx from "clsx";
import { tv } from "tailwind-variants";

type MovieProps = { params: { movieId: string } };

export async function generateStaticParams() {
  const [movies] = await getPopular();

  return movies?.results.map((data) => ({ movieId: data.id })) || [];
}

export async function generateMetadata({
  params,
}: Readonly<MovieProps>): Promise<Metadata> {
  const [data] = await getMovieDetails({ id: params.movieId });

  if (!data)
    return {
      title: "Página não encontrada",
      description: "Não foi possível carregar as informações solicitadas",
      robots: {
        index: false,
        follow: false,
      },
    };

  const metadata: Record<string, unknown> = {
    title: data.title.toString(),
    description: data.overview.substring(0, 160),
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
  };

  if (data.poster_path) {
    metadata["openGraph"] = {
      images: `${POSTER.w780}${data.poster_path}`,
    };
  }

  return metadata;
}

const movieStyles = tv({
  slots: {
    container: "paddingHeader relative h-min w-full",
    innerContainer:
      "md:gridTemplateSpace blockContainer-p items-center gap-0 max-md:flex max-md:w-fit max-md:flex-col max-md:items-start xl:grid-cols-[repeat(20,_minmax(0,_1fr))]",
    img: "rounded-xl max-md:max-h-[75vh] max-md:min-h-80",
    raised:
      "bg-cover bg-center bg-no-repeat before:absolute before:inset-0 before:block before:h-full before:w-full before:bg-raised before:backdrop-blur-md",
  },
});

export default async function Movie({ params }: Readonly<MovieProps>) {
  const [data, error] = await getMovieDetails({ id: params.movieId });
  const { container, innerContainer, raised, img } = movieStyles();

  if (error || data === null) {
    if (error instanceof NotFoundError) {
      notFound();
    } else {
      throw error;
    }
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

  const USDollarToBrazilians = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "USD",
    currencyDisplay: "name",
  });

  let backgroundStyle = {
    backgroundImage:
      "linear-gradient(to top, var(--color-gray-1) 0% , var(--color-gray-2) 100%)",
  };

  if (typeof data.poster_path === "string") {
    const BlurDataUrl = await generateImageBlur(POSTER.w92 + data?.poster_path);
    backgroundStyle = { backgroundImage: `url("${BlurDataUrl}")` };
  }

  return (
    <main>
      <Container
        as="header"
        style={backgroundStyle}
        className={clsx(container(), raised())}
        innerStyles={innerContainer()}
      >
        <div className="md:col-span-4 lg:col-span-5">
          <div className="relative block h-auto w-auto after:absolute after:inset-0 after:block after:rounded-xl after:shadow-card after:max-xs:shadow-card-subtle">
            {data.poster_path ? (
              <img
                srcSet={`${POSTER.w342}${data.poster_path} 342w, ${POSTER.w500}${data.poster_path} 500w, ${POSTER.original}${data.poster_path} 780w`}
                sizes="(max-width: 768px) 100vw, (min-width: 768px) 500px, 780px"
                src={POSTER.original + data.poster_path}
                alt={data.original_title}
                className={clsx(img(), "aspect-[2/3_auto]")}
              />
            ) : (
              <div
                className={clsx(
                  img(),
                  "unavailable flex aspect-[2/3] h-full w-full flex-col items-center justify-center gap-5 overflow-hidden break-words pb-10 pt-10",
                )}
              >
                <p className="textBtn w-full text-wrap text-center text-base-dimmed">
                  imagem indisponível
                </p>
                <p className="textBtn w-full text-wrap px-3 text-center text-lg text-base-minimal">
                  {data.title}
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="relative h-auto md:col-span-8 md:px-4 md:pb-4 lg:col-[span_15_/_span_15]">
          <HTitle
            as="h1"
            container={false}
            className="px-1 py-5 text-4xl font-bold text-base-heading md:col-span-4 lg:col-span-5"
          >
            {data.title}
          </HTitle>
          <p className="data mb-2 mt-[-1.25rem] font-semibold text-base-medium">
            {data.release_date && getFormattedDate(data.release_date, "short")}
            {" - "}
            {data.genres && data.genres.map((value) => value.name).join(", ")}
          </p>

          {data.overview && (
            <p className="data mb-2 font-semibold text-base-medium">
              <strong className="hidden">Sinopse:</strong>
              {data.overview}
            </p>
          )}

          {data["watch/providers"]?.results?.BR && (
            <Stream provider={data["watch/providers"].results.BR} />
          )}
        </div>
      </Container>

      {data.videos?.results && <Videos videosArray={data.videos.results} />}

      <Container as="section">
        <HTitle>Mais detalhes</HTitle>
        <dl>
          <div className="listSpacing no-scrollbar">
            <CardInformation>
              {data.original_title && (
                <>
                  <dt className="label">Titulo original:</dt>
                  <dd className="data mb-2"> {data.original_title}</dd>
                </>
              )}

              {data.release_date && (
                <>
                  <dt className="label">Data de lançamento:</dt>
                  <dd className="data mb-2">
                    <span className="lowercase">
                      {getFormattedDate(data.release_date, "long")}
                    </span>
                  </dd>
                </>
              )}
              {data.credits && (
                <>
                  <dt className="label">Diretor:</dt>
                  <dd className="data mb-2">
                    {data.credits.crew
                      .filter((value) => value.job == "Director")
                      .map((value) => value.name)
                      .join(", ")}
                  </dd>
                </>
              )}
              {data.homepage && (
                <dt className="label -ml-2 mb-2">
                  <a
                    href={data.homepage}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="backBtn-hover rounded-lg p-2 underline"
                  >
                    Site Oficial
                  </a>
                </dt>
              )}
            </CardInformation>
            <CardInformation>
              {data.genres && (
                <>
                  <dt className="label">Gêneros:</dt>
                  <dd className="data mb-2">
                    {data.genres.map((value) => value.name).join(", ")}
                  </dd>
                </>
              )}
              {data.belongs_to_collection?.name && (
                <>
                  <dt className="label">Coleção:</dt>
                  <dd className="data mb-2">
                    {data.belongs_to_collection?.name}
                  </dd>
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
              {data.production_companies && (
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
              {data.original_language && (
                <>
                  <dt className="label">Idioma original:</dt>
                  <dd className="data mb-2"> {data.original_language}</dd>
                </>
              )}
            </CardInformation>
            <CardInformation>
              {data.budget && (
                <>
                  <dt className="label">Orçamento:</dt>
                  <dd className="data mb-2">
                    {USDollarToBrazilians.format(data.budget)}
                  </dd>
                </>
              )}
              {data.revenue && (
                <>
                  <dt className="label">Receita:</dt>
                  <dd className="data mb-2">
                    {USDollarToBrazilians.format(data.revenue)}
                  </dd>
                </>
              )}
            </CardInformation>
          </div>
          <Suspense>
            <Translations movieId={params.movieId} />
          </Suspense>
        </dl>
      </Container>
      {data.credits && (
        <People cast={data.credits.cast} crew={data.credits.crew} />
      )}
      <Suspense fallback={<SkeletonListMovie />}>
        <Recommendations movieID={params.movieId} genres={data.genres} />
      </Suspense>
    </main>
  );
}
