"use client";

import { Fragment, useRef } from "react";

import { useSearchParams } from "next/navigation";

import MapCardMovie from "@/app/filter/components/MovieCardsScroll/MapCardMovie";
import MovieCards from "@/components/skeleton/MovieCards";
import LabelH4 from "@/components/ui/LabelH4";
import { useFilterMovies } from "@/hooks/useFilterMovies";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { toObject } from "@/lib/utils/params";

export default function MovieCardsScroll() {
  const observerRef = useRef<HTMLLIElement | null>(null);
  const searchParams = useSearchParams();
  const paramsObject = toObject(searchParams);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useFilterMovies(paramsObject);

  useIntersectionObserver({
    enabled: hasNextPage && !isFetchingNextPage,
    targetRef: observerRef,
    onIntersect: () => {
      if (hasNextPage) {
        fetchNextPage();
      }
    },
  });

  return (
    <>
      <div>
        <ul className="gridTemplateSpace blockContainer relative w-full items-end xl:gap-[var(--gapMD)] 2xl:grid-cols-[repeat(20,_minmax(0,_1fr))] 2xl:gap-[var(--gapLG)]">
          {data?.pages.map((page, i) => {
            return (
              <Fragment key={i}>
                <MapCardMovie data={page.results} />
              </Fragment>
            );
          })}
          {hasNextPage ? (
            <MovieCards
              size={5}
              style="xl:col-span-3 2xl:col-span-4"
              xs={4}
              xl={4}
              ref={observerRef}
            />
          ) : (
            data?.pages[0].page.results < 20 && (
              <div className="blockContainer flex justify-end">
                <LabelH4>
                  {data?.pages[0].page.results.length == 0
                    ? "Considere um filtro mais amplo para exibir resultados"
                    : "Considere um filtro mais amplo para exibir mais resultados"}
                </LabelH4>
              </div>
            )
          )}
        </ul>
      </div>
    </>
  );
}
