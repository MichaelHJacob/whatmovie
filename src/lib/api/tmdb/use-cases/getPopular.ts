import { API_ENDPOINTS } from "@/config/apiEndpoints";
import { serverFetch } from "@/lib/api/tmdb/serverFetch";
import { getLocalParams } from "@/lib/i18n/getLocaleParams";
import { discoverSchema } from "@/lib/validation/discoverSchema";
import { GetUseCasesParams } from "@/types/globalTypes";

export async function getPopular({
  locale = "pt-BR",
  page = 1,
}: GetUseCasesParams = {}) {
  const local = getLocalParams(locale);

  const params = new URLSearchParams({ page: page.toString(), ...local });

  const url = `${API_ENDPOINTS.moviesList.popular}?${params.toString()}`;

  return serverFetch<typeof discoverSchema._output>({
    url,
    schema: discoverSchema,
  });
}
