import { POSTER } from "@/config/imageConfig";
import { DiscoverMovieType } from "@/lib/validation/discoverMovieSchema";
import { MovieDetailsType } from "@/lib/validation/movieDetailsSchema";
import { Movie } from "schema-dts";

export function movieJsonLd(data: MovieDetailsType | DiscoverMovieType): Movie {
  return {
    "@type": "Movie",
    name: data.original_title,
    alternateName: data.title,
    image: data.poster_path
      ? [
          `${POSTER.w342}${data.poster_path}`,
          `${POSTER.w500}${data.poster_path}`,
          `${POSTER.w780}${data.poster_path}`,
          `${POSTER.original}${data.poster_path}`,
        ]
      : undefined,
    dateCreated: data.release_date ?? undefined,
    aggregateRating:
      data.vote_count && data.vote_average
        ? {
            "@type": "AggregateRating",
            ratingValue: data.vote_average,
            bestRating: 10,
            reviewCount: data.vote_count,
          }
        : undefined,
  };
}
