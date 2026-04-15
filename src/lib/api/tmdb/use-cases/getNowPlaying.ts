import { API_ENDPOINTS } from "@/config/apiEndpoints";
import { filtersMap } from "@/data/filtersMap";
import { serverFetch } from "@/lib/api/tmdb/serverFetch";
import { getLocalParams } from "@/lib/i18n/getLocaleParams";
import { discoverSchema } from "@/lib/validation/discoverSchema";
import { FilterSchemaType } from "@/lib/validation/filterSchema";
import { DataOrError, GetUseCasesParams } from "@/types/globalTypes";
import { flatten } from "flat";

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
      lte: filtersMap.releaseDate.allowedValues(+1),
    },
    sort_by: "popularity.desc",
    include_adult: "false",
    include_video: "false",
    with_release_type: "3",
    without_watch_providers: "8|119|350|337|531|1899|283",
    without_genres: "99|27",
    certification: { lte: "16" },
  };

  const params = new URLSearchParams(flatten(nowPlayingParams));

  const url = `${API_ENDPOINTS.finding.filter}?${params.toString()}`;

  const [data, error] = await serverFetch<typeof discoverSchema._output>({
    url,
    schema: discoverSchema,
  });

  return [data, error] as DataOrError<typeof discoverSchema._output>;
}
