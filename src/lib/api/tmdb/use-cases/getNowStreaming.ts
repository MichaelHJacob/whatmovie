import { API_ENDPOINTS } from "@/config/apiEndpoints";
import { serverFetch } from "@/lib/api/tmdb/serverFetch";
import { getLocalParams } from "@/lib/i18n/getLocaleParams";
import { discoverSchema } from "@/lib/validation/discoverSchema";
import { FilterSchemaType } from "@/lib/validation/filterSchema";
import { DataOrError, GetUseCasesParams } from "@/types/globalTypes";
import { flatten } from "flat";

export async function getNowStreaming({
  locale = "pt-BR",
  page = 1,
}: GetUseCasesParams = {}) {
  const local = getLocalParams(locale);

  const nowStreamingParams: FilterSchemaType = {
    page: page.toString(),
    ...local,
    sort_by: "primary_release_date.desc",
    include_adult: "false",
    include_video: "false",
    with_release_type: "4",
    with_watch_monetization_types: "flatrate|rent|buy",
    without_genres: "99",
    watch_region: "BR",
    certification: { lte: "16" },
    vote_count: { gte: "50" },
    vote_average: { gte: "6", lte: "10" },
  };

  const params = new URLSearchParams(flatten(nowStreamingParams));

  const url = `${API_ENDPOINTS.finding.filter}?${params.toString()}`;

  const [data, error] = await serverFetch<typeof discoverSchema._output>({
    url,
    schema: discoverSchema,
  });

  return [data, error] as DataOrError<typeof discoverSchema._output>;
}
