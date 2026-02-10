import { MetadataRoute } from "next";

import { getPopular } from "@/lib/api/tmdb/use-cases/getPopular";
import getToday from "@/lib/utils/getToday";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [data] = await getPopular();

  const movies = data?.results?.map((movie) => movie.id) || [];

  const moviesUrls = movies.map((movie) => ({
    url: `https://whatmovie.com.br/movie/${movie}`,
  }));

  return [
    {
      url: "https://whatmovie.com.br",
      lastModified: getToday(),
    },
    {
      url: "https://whatmovie.com.br/filter",
    },
    ...moviesUrls,
  ];
}
