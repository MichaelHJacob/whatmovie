import { listGenres } from "@/data/movieMetadata";

export default function getFormattedGenres(genres: number[]) {
  const result = genres.map((value) =>
    listGenres.genres.find((element) => element.id == value),
  );
  return result.map((term) => term?.name).join(", ");
}
