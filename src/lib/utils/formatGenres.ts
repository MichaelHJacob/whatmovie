import { listGenres } from "@/data/movieMetadata";

export function formatGenres(genres: number[]) {
  const result = genres.map((value) =>
    listGenres.genres.find((element) => element.id == value),
  );
  return result.map((term) => term?.name).join(", ");
}
