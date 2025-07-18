import { type NextRequest } from "next/server";

import { API_ENDPOINTS } from "@/config/apiEndpoints";
import getLocalParams from "@/lib/i18n/getLocaleParams";
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

  try {
    const url = `${API_ENDPOINTS.finding.search}?query=${encodeURIComponent(searchTerm)}&include_adult=false&language=${language.language}&page=${page}&region=${language.region}`;

    const options = {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
      },
      next: { revalidate: 3600 },
    };

    const res = await fetch(url, options);
    const data = await res.json();

    if (!res.ok || ("success" in data && data.success === false)) {
      console.error(
        `\n\n   [API ERROR] \n\n Status: ${res.status}, \n URL: ${url}\n status_code: ${data.status_code} \n message: ${data.status_message} \n\n`,
      );

      if (data.status_code === 34) {
        console.error("Erro: O recurso solicitado não foi encontrado", query);
        return Response.json(
          {
            name: "NotFoundError",
            message: "O recurso solicitado não foi encontrado.",
          },
          { status: 404 },
        );
      }

      return Response.json(
        {
          name: "ExternalAPIError",
          message: "Erro de API externa.",
        },
        { status: 502 },
      );
    }

    const parsed = discoverSchema.safeParse(data);

    if (!parsed.success) {
      console.error("[VALIDATION ERROR]", parsed.error);
      return Response.json(
        {
          name: "ValidationError",
          message: "Dados da API externa estão fora do formato esperado.",
        },
        { status: 500 },
      );
    }

    return Response.json(parsed.data);
  } catch (error) {
    console.error("Erro interno ao buscar dados:", error);
    return Response.json(
      { error: "Erro interno do servidor." },
      { status: 500 },
    );
  }
}
