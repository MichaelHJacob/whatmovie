import { API_ENDPOINTS } from "@/config/apiEndpoints";
import { serverFetch } from "@/lib/api/tmdb/serverFetch";
import { getLocalParams } from "@/lib/i18n/getLocaleParams";
import { movieDetailsSchema } from "@/lib/validation/movieDetailsSchema";
import { GetUseCasesWithIdParams } from "@/types/globalTypes";

export async function getMovieDetails({
  id,
  locale = "pt-BR",
}: GetUseCasesWithIdParams) {
  const { language } = getLocalParams(locale);

  const url = `${API_ENDPOINTS.finding.byId(id)}?append_to_response=videos%2Cwatch%2Fproviders%2Ccredits&language=${language}`;

  return serverFetch<typeof movieDetailsSchema._output>({
    url,
    schema: movieDetailsSchema,
    errorMessage: "Ocorreu um erro ao tentar obter os dados da página.",
  });
}
