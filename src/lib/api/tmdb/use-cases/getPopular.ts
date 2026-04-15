import { API_ENDPOINTS } from "@/config/apiEndpoints";
import { serverFetch } from "@/lib/api/tmdb/serverFetch";
import { getLocalParams } from "@/lib/i18n/getLocaleParams";
import { discoverSchema } from "@/lib/validation/discoverSchema";
import { FilterSchemaType } from "@/lib/validation/filterSchema";
import { GetUseCasesParams } from "@/types/globalTypes";
import { flatten } from "flat";

export async function getPopular({
  locale = "pt-BR",
  page = 1,
}: GetUseCasesParams = {}) {
  const local = getLocalParams(locale);

  const popularParams: FilterSchemaType = {
    page: page.toString(),
    ...local,
    sort_by: "popularity.desc",
    include_adult: "false",
    include_video: "false",
    certification: { lte: "16" },
  };

  const params = new URLSearchParams(flatten(popularParams));

  const url = `${API_ENDPOINTS.finding.filter}?${params.toString()}`;

  return serverFetch<typeof discoverSchema._output>({
    url,
    schema: discoverSchema,
  });
}
