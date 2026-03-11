import { movieJsonLd } from "@/lib/structured-data/movieJsonLd";
import { MovieDetailsType } from "@/lib/validation/movieDetailsSchema";
import { ItemPage, WithContext } from "schema-dts";

export function itemPageMovieJsonLd(
  data: MovieDetailsType,
): WithContext<ItemPage> {
  return {
    "@context": "https://schema.org",
    "@type": "ItemPage",
    name: data.title,
    description: data.release_date?.split("-").at(0)
      ? `Detalhes do filme ${data.title} (${data.release_date?.split("-").at(0)})`
      : `Detalhes do filme ${data.title}`,
    isPartOf: { "@id": "https://whatmovie.com.br/#website" },
    mainEntity: {
      ...movieJsonLd(data),
      abstract: data.tagline ?? undefined,
      director: data.credits
        ? {
            "@type": "Person",
            name: data.credits?.crew
              .filter((value) => value.job == "Director")
              .map((value) => value.name)
              .join(", "),
          }
        : undefined,
      duration: data.runtime ? `PT${data.runtime}M` : undefined,
      genre: data.genres ? data.genres.map((value) => value.name) : undefined,
    },
  };
}
