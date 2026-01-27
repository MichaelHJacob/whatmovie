import { API_ENDPOINTS } from "@/config/apiEndpoints";
import { serverFetch } from "@/lib/api/tmdb/serverFetch";
import { movieTranslationsSchema } from "@/lib/validation/movieTranslationsSchema";
import { GetUseCasesWithIdParams } from "@/types/globalTypes";

export async function getMovieTranslations({ id }: GetUseCasesWithIdParams) {
  const url = `${API_ENDPOINTS.finding.byId(id)}/translations`;

  return serverFetch<typeof movieTranslationsSchema._output>({
    url,
    schema: movieTranslationsSchema,
  });
}
