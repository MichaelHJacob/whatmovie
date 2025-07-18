import { MetadataRoute } from "next";

import { getNowPlaying } from "@/lib/api/tmdb/getNowPlaying";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [data] = await getNowPlaying();

  const movies = data?.results?.map((movie) => movie.id) || [];

  const moviesUrls = movies.map((movie) => ({
    url: `https://whatmovie.com.br/movie/${movie}`,
    lastModified: new Date(),
    priority: 0.8,
  }));

  return [
    {
      url: "https://whatmovie.com.br",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://whatmovie.com.br/filter",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.5,
    },
    ...moviesUrls,
  ];
}
