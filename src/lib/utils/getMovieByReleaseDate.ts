import { DiscoverSchemaType } from "@/lib/validation/discoverSchema";

function getTimeSteps(date: string) {
  const time = new Date(date);
  return time.getTime();
}

export function getMovieByReleaseDate(movies: DiscoverSchemaType["results"]) {
  const result = movies.sort((valueA, valueB) => {
    if (!valueA.release_date) return -1;
    if (!valueB.release_date) return +1;
    return (
      getTimeSteps(valueB.release_date) - getTimeSteps(valueA.release_date)
    );
  });
  return result;
}
