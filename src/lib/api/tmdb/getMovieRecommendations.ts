import { API_ENDPOINTS } from "@/config/apiEndpoints";
import fetchData from "@/lib/api/fetchData";
import getLocalParams, { keys } from "@/lib/i18n/getLocaleParams";
import { discoverSchema } from "@/lib/validation/discoverSchema";

type RecommendationsTypes = {
  id: string;
  locale?: keys;
  page?: number;
};

export async function getMovieRecommendations({
  id,
  locale = "pt-BR",
  page = 1,
}: RecommendationsTypes) {
  const { language } = getLocalParams(locale);

  const url = `${API_ENDPOINTS.finding.byId(id)}/recommendations?language=${language}&page=${page.toString()}`;

  return fetchData<typeof discoverSchema._output>({
    url,
    schema: discoverSchema,
  });
}
