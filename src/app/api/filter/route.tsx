import { type NextRequest } from "next/server";

import { API_ENDPOINTS } from "@/config/apiEndpoints";
import { apiFetch } from "@/lib/api/apiFetch";
import { getLocalParams } from "@/lib/i18n/getLocaleParams";
import { discoverSchema } from "@/lib/validation/discoverSchema";
import { filterSchema } from "@/lib/validation/filterSchema";
import { flatten, unflatten } from "flat";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const objParams = unflatten(Object.fromEntries(searchParams.entries())) as {
    [k: string]: string;
  };
  const locale = getLocalParams("pt-BR");

  const filter = filterSchema.safeParse({ ...objParams, ...locale });

  if (!filter.success) {
    console.error(
      "Erro de validação nos parâmetros do filtro",
      filter.error.flatten(),
    );
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

  return apiFetch({
    url,
    schema: discoverSchema,
    stringRequest: params.toString(),
  });
}
