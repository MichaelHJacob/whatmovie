import { type NextRequest } from "next/server";

import { API_ENDPOINTS } from "@/config/apiEndpoints";
import getLocalParams from "@/lib/i18n/getLocaleParams";
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

  try {
    const params = new URLSearchParams(flatten(filter.data));

    const url = `${API_ENDPOINTS.finding.filter}?${params.toString()}`;

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
        console.error(
          "Erro: O recurso solicitado não foi encontrado",
          params.toString(),
        );
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
