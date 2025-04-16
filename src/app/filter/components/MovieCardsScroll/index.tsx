"use client";

import { useEffect, useRef, useState } from "react";

import fetchMovies from "@/app/filter/actions";
import MapCardMovie from "@/app/filter/components/MovieCardsScroll/MapCardMovie";
import MovieCards from "@/components/skeleton/MovieCards";
import { ArrayMoviesType, CardMovieType } from "@/types/globalTypes";

type MovieCardsScrollProps = {
  parameters: { [key: string]: string | string[] | undefined };
  totalPages: number;
  initialData: CardMovieType;
};

export default function MovieCardsScroll({
  initialData,
  parameters,
  totalPages,
}: MovieCardsScrollProps) {
  const [movies, setMovies] = useState<ArrayMoviesType>({
    current_page: initialData.page,
    results: initialData.results,
  });
  const npRef = useRef<number>(initialData.page || 1);

  useEffect(() => {
    const observerCard = document.getElementById("loadC0");

    if (observerCard !== null) {
      const observer = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          npRef.current = npRef.current + 1;
          getData(npRef.current);
        }
      });
      observer.observe(observerCard);
    }

    async function getData(nPage: number) {
      parameters.page = nPage.toString();

      const moviesData: CardMovieType = await fetchMovies(parameters);

      setMovies((prev) => {
        return {
          current_page: moviesData.page,
          results: [...prev.results, ...moviesData.results],
        };
      });
    }
  }, []);

  return (
    <>
      <MapCardMovie data={movies.results} />
      {movies.current_page < 400 && movies.current_page < totalPages && (
        <MovieCards
          id={"loadC"}
          size={5}
          style="xl:col-span-3 2xl:col-span-4"
          xs={4}
          xl={4}
        />
      )}
    </>
  );
}
