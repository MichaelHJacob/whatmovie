"use client";

import { Fragment, useRef } from "react";

import { useSearchParams } from "next/navigation";

import MovieCardMap from "@/app/filter/components/ui/MovieCardMap";
import MovieCardSkeleton from "@/components/skeleton/MovieCardSkeleton";
import LabelH4 from "@/components/ui/LabelH4";
import { useFilterMovies } from "@/hooks/useFilterMovies";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { FilterValidationError } from "@/lib/validation/extendExpectedError";

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

  const totalResults = data?.pages.at(0)?.total_results || 0;

  useIntersectionObserver({
    enabled: hasNextPage && !isFetchingNextPage,
    targetRef: observerRef,
    onIntersect: () => {
      if (hasNextPage) {
        fetchNextPage();
      }
    },
  });

  if (isError) {
    const errorMessage: string[] =
      error instanceof FilterValidationError
        ? Object.values(error.validation.fieldErrors).flat()
        : ["Ocorreu um erro inesperado, tente novamente mais tarde"];
    return (
      <div>
        <ul className="blockContainer-p relative w-full items-end xl:gap-[var(--gapMD)] 2xl:gap-[var(--gapLG)]">
          {errorMessage.map((erro, i) => {
            return (
              <li
                className="label tracking-winder mb-4 max-w-full text-wrap rounded-lg border-2 border-base-accent bg-notice-minimal p-4 text-notice-accent shadow-card-minimal"
                key={i}
              >
                {erro}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div>
        <ul className="gridTemplateSpace blockContainer-p animate-presets relative w-full animate-fade-up items-end xl:gap-[var(--gapMD)] 2xl:grid-cols-[repeat(20,_minmax(0,_1fr))] 2xl:gap-[var(--gapLG)]">
          {<MovieCardSkeleton style="xl:col-span-3 2xl:col-span-4" size={20} />}
        </ul>
      </div>
    );
  }

  return (
    <div>
      <ul className="gridTemplateSpace blockContainer-p animate-presets relative w-full animate-fade items-end xl:gap-[var(--gapMD)] 2xl:grid-cols-[repeat(20,_minmax(0,_1fr))] 2xl:gap-[var(--gapLG)]">
        {data?.pages.map((data, i) => {
          return (
            <Fragment key={i}>
              <MovieCardMap data={data.results} />
            </Fragment>
          );
        })}
        {hasNextPage && (
          <MovieCardSkeleton
            size={5}
            style="xl:col-span-3 2xl:col-span-4"
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
