import { API_ENDPOINTS } from "@/config/apiEndpoints";
import { serverFetch } from "@/lib/api/tmdb/serverFetch";
import { getLocalParams } from "@/lib/i18n/getLocaleParams";
import { movieProviderSchema } from "@/lib/validation/movieProviderShema";
import { GetUseCasesParams } from "@/types/globalTypes";

export async function getMovieProviders({
  locale = "pt-BR",
}: GetUseCasesParams) {
  const { language, watch_region } = getLocalParams(locale);

  const url = `${API_ENDPOINTS.metadata.movieProviders}?language=${language}&watch_region=${watch_region}`;

  return serverFetch<typeof movieProviderSchema._output>({
    url,
    schema: movieProviderSchema,
    errorMessage: "Ocorreu um erro ao tentar obter os dados",
    revalidate: 604800,
  });
}
