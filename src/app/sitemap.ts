import { MetadataRoute } from "next";

import { getPopular } from "@/lib/api/tmdb/use-cases/getPopular";
import { getISODateString } from "@/lib/utils/getISODateString";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [data] = await getPopular();

  const movies = data?.results?.map((movie) => movie.id) || [];

  const moviesUrls = movies.map((movie) => ({
    url: `https://whatmovie.com.br/${movie}`,
    priority: 1,
  }));

  return [
    {
      url: "https://whatmovie.com.br",
      lastModified: getISODateString(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: "https://whatmovie.com.br/filter",
      priority: 0.8,
    },
    ...moviesUrls,
  ];
}
