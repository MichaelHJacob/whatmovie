import { listGenres } from "@/data/movieMetadata";

export function getGenresByIds(genres: number[]) {
  const list = listGenres.genres.filter((value) => genres.includes(value.id));

  return list.map((value) => value.name);
}
