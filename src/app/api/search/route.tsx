import { type NextRequest } from "next/server";

import { API_ENDPOINTS } from "@/config/apiEndpoints";
import { apiFetch } from "@/lib/api/apiFetch";
import { getLocalParams } from "@/lib/i18n/getLocaleParams";
import { discoverSchema } from "@/lib/validation/discoverSchema";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query");
  const page = searchParams.get("page") || 1;
  const language = getLocalParams("pt-BR");

  const searchTerm = query?.trim();

  if (!searchTerm) {
    console.error("Erro:Parâmetro de pesquisa é vazio ou nulo.", query);
    return Response.json(
      {
        name: "SearchValidationError",
        message: "Parâmetro de pesquisa é vazio ou nulo.",
      },
      { status: 400 },
    );
  }
  const url = `${API_ENDPOINTS.finding.search}?query=${encodeURIComponent(searchTerm)}&include_adult=false&language=${language.language}&page=${page}&region=${language.region}`;

  return apiFetch({ url, schema: discoverSchema, stringRequest: query });
}
