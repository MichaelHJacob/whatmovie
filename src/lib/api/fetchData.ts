import { ZodSchema } from "zod";

export const headerTmdb = {
  accept: "application/json",
  Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
};

type FetchDataParams = {
  url: string;
  schema: ZodSchema;
  othersOptions?: RequestInit;
  headers?: Record<string, string>;
  revalidate?: number;
  errorMessage?: string;
};

export default async function fetchData<T>({
  url,
  schema,
  headers = headerTmdb,
  revalidate = 3600,
  othersOptions,
  errorMessage = "Erro ao buscar dados",
}: FetchDataParams): Promise<T> {
  const options = {
    headers: headers,
    next: { revalidate: revalidate },
    ...othersOptions,
  };

  const res = await fetch(url, options);

  if (!res.ok) {
    console.error(`[API ERROR] Status: ${res.status}, URL: ${url}`);
    throw new Error(errorMessage);
  }

  const json = await res.json();
  const { success, data, error } = schema.safeParse(json);

  if (!success) {
    console.error("[VALIDATION ERROR]", error);
    throw new Error("Erro de validação na resposta da API");
  }

  return data;
}
