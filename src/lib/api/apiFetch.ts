import { tmdbFetch } from "@/lib/api/tmdb/tmdbFefch";
import { fetchOptionsExtended } from "@/types/globalTypes";

export async function apiFetch({
  url,
  options,
  schema,
  revalidate = 43200,
  stringRequest = "",
}: fetchOptionsExtended & { stringRequest?: string | null }) {
  const params = {
    ...options,
    next: { revalidate: revalidate },
  };
  try {
    const res = await tmdbFetch(url, params);
    const data = await res.json();

    if (!res.ok || ("success" in data && !data.success)) {
      console.error(
        `\n\n   [API ERROR] \n\n Status: ${res.status}, \n URL: ${url}\n status_code: ${data.status_code} \n message: ${data.status_message} \n\n`,
      );

      if (data.status_code === 34) {
        console.error(
          "Erro: O recurso solicitado não foi encontrado",
          stringRequest,
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

    const parsed = schema.safeParse(data);

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

    return Response.json(parsed.data, {
      headers: {
        "Cache-Control": "public, max-age=600, stale-while-revalidate=1200",
        "CDN-Cache-Control": "s-maxage=43200, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Erro interno ao buscar dados:", error);
    return Response.json(
      { error: "Erro interno do servidor." },
      { status: 500 },
    );
  }
}
