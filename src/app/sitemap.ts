import { MetadataRoute } from "next";

import { getPopular } from "@/lib/api/tmdb/use-cases/getPopular";
import { formatToIdSlug } from "@/lib/utils/formatToIdSlug";
import { getISODateString } from "@/lib/utils/getISODateString";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const urlMap = new Map();

  const results = await Promise.allSettled(
    Array.from({ length: 25 }, (_, i) => {
      return getPopular({ revalidate: 604800, page: i + 1 });
    }),
  );

  results.forEach((result) => {
    if (result.status === "fulfilled") {
      const [data] = result.value;

      data?.results.forEach((value) => {
        if (!urlMap.has(value.id)) {
          urlMap.set(value.id, {
            url: `https://whatmovie.com.br/${formatToIdSlug(value.id, value.title)}`,
            priority: 0.7,
            changeFrequency: "monthly",
          });
        }
      });
    }
  });

  return [
    {
      url: "https://whatmovie.com.br",
      lastModified: getISODateString(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: "https://whatmovie.com.br/filter",
      priority: 0.8,
    },
    ...Array.from(urlMap.values()),
  ];
}
