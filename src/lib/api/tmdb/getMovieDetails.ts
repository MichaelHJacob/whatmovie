import { API_ENDPOINTS } from "@/config/apiEndpoints";
import fetchData from "@/lib/api/fetchData";
import getLocalParams, { keys } from "@/lib/i18n/getLocaleParams";
import { movieDetailsSchema } from "@/lib/validation/movieDetailsSchema";

type movieDetailsTypes = {
  id: string;
  locale?: keys;
};

export async function getMovieDetails({
  id,
  locale = "pt-BR",
}: movieDetailsTypes) {
  const { language } = getLocalParams(locale);

  const url = `${API_ENDPOINTS.finding.byId(id)}?append_to_response=videos%2Cwatch%2Fproviders%2Ccredits&language=${language}`;

  return fetchData<typeof movieDetailsSchema._output>({
    url,
    schema: movieDetailsSchema,
    errorMessage: "Ocorreu um erro durante a renderização da página",
  });
}
