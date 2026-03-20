import { webAppJsonLd } from "@/lib/structured-data/webAppJsonLd";
import { webSiteJsonLd } from "@/lib/structured-data/webSiteJsonLd";
import { getISODateString } from "@/lib/utils/getISODateString";
import type { Graph } from "schema-dts";

export function homeJsonLd(): Graph {
  return {
    "@context": "https://schema.org",
    "@graph": [
      webAppJsonLd(),
      webSiteJsonLd(),
      {
        "@type": "WebPage",
        "@id": "https://whatmovie.com.br/#home",
        name: "WhatMovie",
        url: "https://whatmovie.com.br/",
        isPartOf: { "@id": "https://whatmovie.com.br/#website" },
        dateModified: getISODateString(),
        description:
          "Descubra onde assistir aos filmes mais populares e lançamentos do cinema. Explore listas atualizadas diariamente, trailers dublados e use filtros avançados para encontrar sua próxima escolha certa.",
        mainEntity: {
          "@type": "ItemList",
          name: "Filmes incríveis!",
          itemListElement: [
            { "@id": "https://whatmovie.com.br/#popular" },
            { "@id": "https://whatmovie.com.br/#streaming" },
            { "@id": "https://whatmovie.com.br/#theatres" },
          ],
        },
      },
    ],
  };
}
