import { type NextRequest } from "next/server";

import { API_ENDPOINTS } from "@/config/apiEndpoints";
import { discoverSchema } from "@/lib/validation/discoverSchema";
import { filterSchema } from "@/lib/validation/filterSchema";
import { flatten, unflatten } from "flat";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const objParams = unflatten(Object.fromEntries(searchParams.entries())) as {
    [k: string]: string;
  };

  const filter = filterSchema.safeParse(objParams);

  if (!filter.success) {
    console.error("Erro de validação Zod", filter.error.flatten());
    return Response.json(
      {
        name: "FilterValidationError",
        message: "Erro da validação",
        validation: filter.error.flatten(),
      },
      { status: 400 },
    );
  }

  const params = new URLSearchParams(flatten(filter.data));

  const url = `${API_ENDPOINTS.finding.filter}?${params.toString()}`;

  const res = await fetch(url, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
    },
  });

  if (!res.ok) {
    console.error("Falha ao buscar dados", res);
    return Response.json(
      { error: "Erro de API externa", status: res.status },
      { status: 502 },
    );
  }

  const json = await res.json();

  const { success, data, error } = discoverSchema.safeParse(json);

  if (!success) {
    console.error("Erro de validação na resposta da API externa", error);
  }

  return Response.json(data);
}
