import { API_ENDPOINTS } from "@/config/apiEndpoints";
import { serverFetch } from "@/lib/api/tmdb/serverFetch";
import { getLocalParams } from "@/lib/i18n/getLocaleParams";
import { discoverSchema } from "@/lib/validation/discoverSchema";
import { GetUseCasesWithIdParams } from "@/types/globalTypes";

export async function getMovieRecommendations({
  id,
  locale = "pt-BR",
  page = 1,
}: GetUseCasesWithIdParams) {
  const { language } = getLocalParams(locale);

  const url = `${API_ENDPOINTS.finding.byId(id)}/recommendations?language=${language}&page=${page.toString()}`;

  return serverFetch<typeof discoverSchema._output>({
    url,
    schema: discoverSchema,
  });
}
