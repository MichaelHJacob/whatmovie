import { tmdbMovieGenres } from "@/data/tmdbMovieGenres";

export function getGenresByIds(genres: number[]) {
  const list = tmdbMovieGenres.genres.filter((value) =>
    genres.includes(value.id),
  );

  return list.map((value) => value.name);
}
