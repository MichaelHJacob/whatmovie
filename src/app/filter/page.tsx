"use client";

import { useRef } from "react";

import { useSearchParams } from "next/navigation";

import { useTmdbConfigContext } from "@/components/providers/TmdbConfigProvider";
import MovieCardSkeleton from "@/components/skeleton/MovieCardSkeleton";
import LabelH4 from "@/components/ui/LabelH4";
import MovieCard from "@/components/ui/MovieCard";
import { useFilterMovies } from "@/hooks/useFilterMovies";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { DiscoverMovieType } from "@/lib/validation/discoverMovieSchema";
import { FilterValidationError } from "@/lib/validation/extendExpectedError";
import clsx from "clsx";
import { tv } from "tailwind-variants";

const filterPegeStyles = tv({
  slots: {
    ulGrid:
      "gridTemplateSpace blockContainer-p animate-presets relative w-full items-end xl:grid-cols-[repeat(30,_minmax(0,_1fr))] 2xl:grid-cols-[repeat(24,_minmax(0,_1fr))] min-[1728px]:grid-cols-[repeat(40,_minmax(0,_1fr))]",
    liError:
      "label tracking-winder mb-4 max-w-full text-wrap rounded-lg border-2 border-base-accent bg-notice-minimal p-4 text-notice-accent shadow-card-minimal",
    liFilter:
      "max-xs:col-span-5 xl:col-span-6 2xl:col-span-4 min-[1728px]:col-span-5",
  },
});

export default function Page() {
  const observerRef = useRef<HTMLLIElement | null>(null);
  const searchParams = useSearchParams();
  const paramsObject = Object.fromEntries(searchParams.entries());
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error,
    isLoading,
    isError,
  } = useFilterMovies(paramsObject);
  const { ulGrid, liFilter } = filterPegeStyles();

  const totalResults = data?.pages.at(0)?.total_results || 0;
  const imgBaseUrl = useTmdbConfigContext();

  useIntersectionObserver({
    enabled: hasNextPage && !isFetchingNextPage,
    targetRef: observerRef,
    onIntersect: () => {
      if (hasNextPage) {
        fetchNextPage();
      }
    },
  });

  const movies: DiscoverMovieType[] | null =
    data?.pages.flatMap((page) => page.results) || null;

  if (isError) {
    const errorMessage: string[] =
      error instanceof FilterValidationError
        ? Object.values(error.validation.fieldErrors).flat()
        : ["Ocorreu um erro inesperado, tente novamente mais tarde"];
    return (
      <div>
        <ul className="blockContainer-p relative w-full items-end xl:gap-[var(--gapMD)]">
          {errorMessage.map((erro) => {
            return (
              <li
                className="label tracking-winder mb-4 max-w-full text-wrap rounded-lg border-2 border-base-accent bg-notice-minimal p-4 text-notice-accent shadow-card-minimal"
                key={erro}
              >
                {erro}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  return (
    <div>
      <ul
        className={clsx(
          ulGrid(),
          isLoading ? "animate-fade-up" : "animate-fade",
        )}
      >
        {isLoading && <MovieCardSkeleton style={liFilter()} size={24} />}
        {movies?.map((movie) => {
          return (
            <li
              className={clsx(liFilter(), "gridColSpanMovie h-auto")}
              key={movie.id}
            >
              <MovieCard data={movie} baseUrl={imgBaseUrl} />
            </li>
          );
        })}
        {hasNextPage && (
          <MovieCardSkeleton
            size={8}
            style={liFilter()}
            xs={4}
            xl={4}
            ref={observerRef}
          />
        )}
      </ul>
      {!isLoading && totalResults < 20 && (
        <div className="blockContainer-p flex justify-start">
          <LabelH4>
            {totalResults == 0
              ? "Considere um filtro mais amplo para exibir resultados"
              : "Considere um filtro mais amplo para exibir mais resultados"}
          </LabelH4>
        </div>
      )}
    </div>
  );
}
