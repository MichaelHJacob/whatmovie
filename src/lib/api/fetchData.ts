import {
  ExternalAPIError,
  NotFoundError,
  ValidationError,
} from "@/lib/validation/extendExpectedError";
import { ZodSchema } from "zod";

type FetchDataParams = {
  url: string;
  schema: ZodSchema;
  othersOptions?: RequestInit;
  headers?: Record<string, string>;
  revalidate?: number;
  errorMessage?: string;
};

type DataOrError<TData> = [TData, null] | [null, Error];

export async function fetchData<TData>({
  url,
  schema,
  headers,
  revalidate = 3600,
  othersOptions,
  errorMessage = "Erro ao buscar dados",
}: FetchDataParams): Promise<DataOrError<TData>> {
  const options = {
    ...othersOptions,
    next: { revalidate: revalidate },
  };

  if (headers) {
    options.headers = headers;
  }

  const res = await fetch(url, options);
  const json = await res.json();

  if (!res.ok || ("success" in json && json.success === false)) {
    const message = json.status_message ?? errorMessage;

    console.error(
      `\n\n   [API ERROR] \n\n Status: ${res.status}, \n URL: ${url}\n status_code: ${json.status_code} \n message: ${message} \n\n`,
    );

    if (json.status_code === 34) {
      return [
        null,
        new NotFoundError("O recurso solicitado não foi encontrado"),
      ] as const;
    }

    return [null, new ExternalAPIError("Erro de API externa")] as const;
  }

  const { success, data, error } = schema.safeParse(json);

  if (!success) {
    console.error("[VALIDATION ERROR]", error);
    return [
      null,
      new ValidationError(
        "Dados da API externa estão fora do formato esperado.",
      ),
    ] as const;
  }

  return [data, null];
}

export async function fetchTmdb<TData>(
  params: Omit<FetchDataParams, "headers">,
): Promise<DataOrError<TData>> {
  const token = process.env.TMDB_API_TOKEN;
  if (!token) {
    return [
      null,
      new Error("TMDB_API_TOKEN não definido no ambiente."),
    ] as const;
  }

  return fetchData<TData>({
    ...params,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_API_TOKEN ?? ""}`,
    },
  });
}
