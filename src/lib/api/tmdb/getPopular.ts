import { API_ENDPOINTS } from "@/config/apiEndpoints";
import { fetchTmdb } from "@/lib/api/fetchData";
import getLocalParams, { keys } from "@/lib/i18n/getLocaleParams";
import { discoverSchema } from "@/lib/validation/discoverSchema";

type PopularTypes = {
  locale?: keys;
  page?: number;
};

export async function getPopular({
  locale = "pt-BR",
  page = 1,
}: PopularTypes = {}) {
  const local = getLocalParams(locale);

  const params = new URLSearchParams({ page: page.toString(), ...local });

  const url = `${API_ENDPOINTS.moviesList.popular}?${params.toString()}`;

  return fetchTmdb<typeof discoverSchema._output>({
    url,
    schema: discoverSchema,
  });
}
