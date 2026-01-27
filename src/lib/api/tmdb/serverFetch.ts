import { tmdbFetch } from "@/lib/api/tmdb/tmdbFefch";
import {
  ExternalAPIError,
  NotFoundError,
  ValidationError,
} from "@/lib/validation/extendExpectedError";
import { fetchOptionsExtended } from "@/types/globalTypes";

type DataOrError<TData> = [TData, null] | [null, Error];

export async function serverFetch<TData>({
  url,
  schema,
  revalidate = 3600,
  options,
  errorMessage = "Erro ao buscar dados",
}: fetchOptionsExtended): Promise<DataOrError<TData>> {
  const requestInit = {
    ...options,
    next: { revalidate: revalidate },
  };

  const res = await tmdbFetch(url, requestInit);
  const json = await res.json();

  if (!res.ok || ("success" in json && !json.success)) {
    const message = json.status_message ?? errorMessage;

    console.error(
      `\n\n   [API ERROR] \n\n Status: ${res.status}, \n URL: ${url}\n status_code: ${json.status_code} \n message: ${message} \n\n`,
    );

    if (json.status_code === 34) {
      return [
        null,
        new NotFoundError("O recurso solicitado não foi encontrado."),
      ] as const;
    }

    return [null, new ExternalAPIError("Erro de API externa.")] as const;
  }

  const { success, data, error } = schema.safeParse(json);

  if (!success) {
    console.error(
      "[VALIDATION ERROR]",
      JSON.stringify(error.format(), null, 2),
    );
    return [
      null,
      new ValidationError(
        "Dados da API externa estão fora do formato esperado.",
      ),
    ] as const;
  }

  return [data, null];
}
