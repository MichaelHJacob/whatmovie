import type { WebApplication } from "schema-dts";

export function webAppJsonLd(): WebApplication {
  return {
    "@type": "WebApplication",
    "@id": "https://whatmovie.com.br/#webapp",
    name: "WhatMovie",
    description:
      "Plataforma interativa para descoberta de filmes, com funcionalidades de busca e filtros similares ao JustWatch e tmdb.",
    url: "https://whatmovie.com.br",
    applicationCategory: ["EntertainmentApplication", "BrowserApplication"],
    browserRequirements: "Requires JavaScript and HTML5",
    author: {
      "@type": "Person",
      name: "Michael H. Jacob",
      sameAs: [
        "https://github.com/MichaelHJacob",
        "https://www.linkedin.com/in/michaelhjacob/",
      ],
      email: "michael_h.jacob@outlook.com",
    },
    featureList: [
      "Busca por filmes",
      "Integração com API do TMDB",
      "Filtros de streaming",
      "Interface responsiva",
    ],
    mainEntity: {
      "@id": "https://whatmovie.com.br/#website",
    },
    offers: {
      "@type": "Offer",
      price: 0,
    },
  };
}
