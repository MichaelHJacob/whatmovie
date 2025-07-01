import { API_ENDPOINTS } from "@/config/apiEndpoints";
import { fetchTmdb } from "@/lib/api/fetchData";
import { movieTranslationsSchema } from "@/lib/validation/movieTranslationsSchema";

export async function getMovieTranslations(id: string) {
  const url = `${API_ENDPOINTS.finding.byId(id)}/translations`;

  return fetchTmdb<typeof movieTranslationsSchema._output>({
    url,
    schema: movieTranslationsSchema,
  });
}
