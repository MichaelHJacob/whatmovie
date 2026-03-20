import { WebSite } from "schema-dts";

export function webSiteJsonLd(): WebSite {
  return {
    "@type": "WebSite",
    "@id": "https://whatmovie.com.br/#website",
    url: "https://whatmovie.com.br",
    name: "WhatMovie",
    inLanguage: "pt-BR",
  };
}
