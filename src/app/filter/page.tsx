"use client";

import { Fragment, useRef } from "react";

import { useSearchParams } from "next/navigation";

import MapCardMovie from "@/app/filter/components/ui/MapCardMovie";
import MovieCards from "@/components/skeleton/MovieCards";
import LabelH4 from "@/components/ui/LabelH4";
import { useFilterMovies } from "@/hooks/useFilterMovies";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { FilterValidationError } from "@/lib/validation/FilterValidationError";

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
        : [error.message];
    return (
      <div>
        <ul className="blockContainer relative w-full items-end xl:gap-[var(--gapMD)] 2xl:gap-[var(--gapLG)]">
          {errorMessage.map((erro, i) => {
            return (
              <li
                className="label tracking-winder light-shadow mb-4 max-w-full text-wrap rounded-lg border-0 border-red-900 bg-nightDew-100 p-4 text-red-900"
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
        <ul className="gridTemplateSpace blockContainer relative w-full items-end xl:gap-[var(--gapMD)] 2xl:grid-cols-[repeat(20,_minmax(0,_1fr))] 2xl:gap-[var(--gapLG)]">
          {<MovieCards style="xl:col-span-3 2xl:col-span-4" size={20} />}
        </ul>
      </div>
    );
  }

  return (
    <div>
      <ul className="gridTemplateSpace blockContainer relative w-full animate-show items-end xl:gap-[var(--gapMD)] 2xl:grid-cols-[repeat(20,_minmax(0,_1fr))] 2xl:gap-[var(--gapLG)]">
        {data?.pages.map((data, i) => {
          return (
            <Fragment key={i}>
              <MapCardMovie data={data.results} />
            </Fragment>
          );
        })}
        {hasNextPage && (
          <MovieCards
            size={5}
            style="xl:col-span-3 2xl:col-span-4"
            xs={4}
            xl={4}
            ref={observerRef}
          />
        )}
      </ul>
      {!isLoading && totalResults < 20 && (
        <div className="blockContainer flex justify-start">
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
