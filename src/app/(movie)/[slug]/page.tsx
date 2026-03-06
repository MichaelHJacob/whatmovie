import { Suspense } from "react";

import { Metadata } from "next";
import { notFound } from "next/navigation";

import Details from "@/app/(movie)/[slug]/components/layout/Details";
import PageHero from "@/app/(movie)/[slug]/components/layout/PageHero";
import Videos from "@/app/(movie)/[slug]/components/layout/Videos";
import Recommendations from "@/app/(movie)/[slug]/components/layout/WmRecommendations";
import People from "@/app/(movie)/[slug]/components/ui/People";
import SkeletonListMovie from "@/components/skeleton/SkeletonListMovie";
import { POSTER } from "@/config/imageConfig";
import { getMovieDetails } from "@/lib/api/tmdb/use-cases/getMovieDetails";
import { getPopular } from "@/lib/api/tmdb/use-cases/getPopular";
import { NotFoundError } from "@/lib/validation/extendExpectedError";

type MovieProps = { params: { slug: string } };

export async function generateStaticParams() {
  const [movies] = await getPopular();

  return movies?.results.map((data) => ({ slug: data.id })) || [];
}

export async function generateMetadata({
  params,
}: Readonly<MovieProps>): Promise<Metadata> {
  const dataID = params.slug.split("-").at(0);
  const [data] = dataID ? await getMovieDetails({ id: dataID }) : [null];

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

export default async function Movie({ params }: Readonly<MovieProps>) {
  const dataID = params.slug.split("-").at(0) || "";
  const [data, error] = await getMovieDetails({ id: dataID });

  if (error || !data) {
    if (error instanceof NotFoundError) {
      notFound();
    } else {
      throw error;
    }
  }

  return (
    <main>
      <article>
        <PageHero data={data} />
        {data.videos?.results && <Videos videosArray={data.videos.results} />}
        <Details data={data} movieId={dataID} />
        {data.credits && (
          <People cast={data.credits.cast} crew={data.credits.crew} />
        )}
      </article>
      <Suspense fallback={<SkeletonListMovie />}>
        <Recommendations movieID={dataID} genres={data.genres} />
      </Suspense>
    </main>
  );
}
