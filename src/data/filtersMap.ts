import { listGenres, listMovieProvider } from "@/data/movieMetadata";

type BaseFilter = {
  keys: string[] | string;
  allowedValues?:
    | string[]
    | object
    | string
    | { min: number; max: number; step?: number };
};

export const filtersMap = {
  sortBy: {
    keys: "sort_by",
    allowedValues: [
      "original_title.asc",
      "original_title.desc",
      "popularity.asc",
      "popularity.desc",
      "revenue.asc",
      "revenue.desc",
      "primary_release_date.asc",
      "primary_release_date.desc",
      "title.asc",
      "title.desc",
      "vote_average.asc",
      "vote_average.desc",
      "vote_count.asc",
      "vote_count.desc",
    ],
  },

  voteAverage: {
    keys: ["vote_average.gte", "vote_average.lte"],
    allowedValues: { min: 0, max: 10, step: 0.1 },
  },

  voteCount: {
    keys: "vote_count.gte",
    allowedValues: "500",
  },

  withGenres: {
    keys: "with_genres",
    allowedValues: listGenres,
  },

  withWatchProviders: {
    keys: "with_watch_providers",
    allowedValues: listMovieProvider,
  },

  includeAdult: {
    keys: "include_adult",
  },

  includeVideo: {
    keys: "include_video",
  },

  page: {
    keys: "page",
  },

  region: {
    keys: "region",
    allowedValues: "BR",
  },

  watchRegion: {
    keys: "watch_region",
    allowedValues: "BR",
  },

  certificationCountry: {
    keys: "certification_country",
    allowedValues: "BR",
  },

  certificationLte: {
    keys: "certification.lte",
    allowedValues: "16",
  },

  primaryReleaseDate: {
    keys: "primary_release_date.lte",
    allowedValues: () => {
      const now: Date = new Date();
      const offsetInMs = 3 * 60 * 60 * 1000;
      const localTime = new Date(now.getTime() - offsetInMs);
      return `${localTime.toISOString().split("T")[0]}`;
    },
  },

  language: {
    keys: "language",
    allowedValues: "pt-BR",
  },

  monetizationTypes: {
    keys: "with_watch_monetization_types",
    allowedValues: ["flatrate", "free", "ads", "rent", "buy"],
  },
} as const satisfies Record<string, BaseFilter>;
