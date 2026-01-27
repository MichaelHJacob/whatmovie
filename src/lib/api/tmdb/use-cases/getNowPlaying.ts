import { API_ENDPOINTS } from "@/config/apiEndpoints";
import { filtersMap } from "@/data/filtersMap";
import { serverFetch } from "@/lib/api/tmdb/serverFetch";
import { getLocalParams } from "@/lib/i18n/getLocaleParams";
import { getMovieByReleaseDate } from "@/lib/utils/getMovieByReleaseDate";
import { discoverSchema } from "@/lib/validation/discoverSchema";
import { FilterSchemaType } from "@/lib/validation/filterSchema";
import { GetUseCasesParams } from "@/types/globalTypes";
import { flatten } from "flat";

type DataOrError<TData> = [TData, null] | [null, Error];

export async function getNowPlaying({
  locale = "pt-BR",
  page = 1,
}: GetUseCasesParams = {}) {
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

  const [data, error] = await serverFetch<typeof discoverSchema._output>({
    url,
    schema: discoverSchema,
  });

  if (data) {
    data.results = getMovieByReleaseDate(data.results);
  }

  return [data, error] as DataOrError<typeof discoverSchema._output>;
}
