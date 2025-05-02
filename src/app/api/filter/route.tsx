import { type NextRequest } from "next/server";

import { API_ENDPOINTS } from "@/config/config";
import getDefaultFilters from "@/lib/utils/filter";
import { toObject } from "@/lib/utils/params";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const userFilters = toObject(searchParams);
  const params = new URLSearchParams({
    ...userFilters,
    ...getDefaultFilters(searchParams),
  });

  const url = `${API_ENDPOINTS.finding.filter}?${params.toString()}`;

  const res = await fetch(url, {
    headers: {
      accept: "application/json",
      Authorization: `${process.env.DB_TOKEN_AUTH}`,
    },
  });

  if (!res.ok) {
    throw new Error("Falha ao buscar dados");
  }

  const data = await res.json();

  return Response.json(data);
}
