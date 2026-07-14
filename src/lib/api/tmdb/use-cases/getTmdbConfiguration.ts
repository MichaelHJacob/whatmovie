import { API_ENDPOINTS } from "@/config/apiEndpoints";
import { serverFetch } from "@/lib/api/tmdb/serverFetch";
import { tmdbConfigSchema } from "@/lib/validation/tmdbConfigSchema";

export async function getTmdbConfiguration() {
  const url = `${API_ENDPOINTS.configuration}`;

  return serverFetch<typeof tmdbConfigSchema._output>({
    url,
    schema: tmdbConfigSchema,
    errorMessage: "Ocorreu um erro ao tentar obter os dados",
    revalidate: 2592000,
  });
}
