import { ENV } from "@/config/env";

export async function tmdbFetch(
  url: string | URL | Request,
  options?: Omit<RequestInit, "headers">,
): Promise<Response> {
  const res = await fetch(url, {
    ...options,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${ENV.TMDB_TOKEN}`,
    },
  });

  return res;
}
