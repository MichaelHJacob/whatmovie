import { getGenresByIds } from "@/lib/utils/getGenresByIds";

export function formatGenres(genres: number[]) {
  return getGenresByIds(genres).join(", ");
}
