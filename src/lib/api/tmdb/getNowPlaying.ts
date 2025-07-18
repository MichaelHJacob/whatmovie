import { API_ENDPOINTS } from "@/config/apiEndpoints";
import { filtersMap } from "@/data/filtersMap";
import { fetchTmdb } from "@/lib/api/fetchData";
import getLocalParams, { keys } from "@/lib/i18n/getLocaleParams";
import { discoverSchema } from "@/lib/validation/discoverSchema";
import { FilterSchemaType } from "@/lib/validation/filterSchema";
import { flatten } from "flat";

type DataOrError<TData> = [TData, null] | [null, Error];

type nowPlayingTypes = {
  locale?: keys;
  page?: number;
};

export async function getNowPlaying({
  locale = "pt-BR",
  page = 1,
}: nowPlayingTypes = {}) {
  const local = getLocalParams(locale);

  const nowPlayingParams: FilterSchemaType = {
    page: page.toString(),
    ...local,
    release_date: {
      gte: filtersMap.releaseDate.allowedValues(-31),
      lte: filtersMap.releaseDate.allowedValues(),
    },
    sort_by: "popularity.desc",
    include_adult: "false",
    include_video: "false",
    with_release_type: "3",
    certification: { lte: "16" },
    vote_count: { gte: "20" },
    vote_average: { gte: "5", lte: "10" },
  };

  const params = new URLSearchParams(flatten(nowPlayingParams));

  const url = `${API_ENDPOINTS.finding.filter}?${params.toString()}`;

  const [data, error] = await fetchTmdb<typeof discoverSchema._output>({
    url,
    schema: discoverSchema,
  });

  function getTimeSteps(date: string) {
    const time = new Date(date);
    return time.getTime();
  }

  if (data) {
    data.results = data.results.sort((valueA, valueB) => {
      if (!valueA.release_date) return -1;
      if (!valueB.release_date) return +1;
      return (
        getTimeSteps(valueB.release_date) - getTimeSteps(valueA.release_date)
      );
    });
  }

  return [data, error] as DataOrError<typeof discoverSchema._output>;
}
