export type TranslationsType = {
  id: number;
  translations: {
    iso_3166_1: string;
    iso_639_1: string;
    name: string;
    english_name: string;
    data: {
      homepage: string;
      overview: string;
      runtime: number;
      tagline: string;
      title: string;
    };
  }[];
};

export type WMProviderType = {
  id: number;
  results: {
    BR?: Provider;
    string?: Provider;
  };
};

export type Provider = {
  link: string;
  flatrate: {
    logo_path: string;
    provider_id: number;
    provider_name: string;
    display_priority: number;
  }[];
  rent?: {
    logo_path: string;
    provider_id: number;
    provider_name: string;
    display_priority: number;
  }[];
  buy?: {
    logo_path: string;
    provider_id: number;
    provider_name: string;
    display_priority: number;
  }[];
};

export type MovieProviders = {
  results: {
    display_priorities: object;
    display_priority: number;
    logo_path: string;
    provider_name: string;
    provider_id: number;
  }[];
};

export type TypeBtnProvider = {
  logo_path: string;
  provider_name: string;
  provider_id: number;
  state: boolean;
  fastAccess: boolean;
};

export type TypeBtnGenres = {
  id: number;
  name: string;
  state: boolean;
  fastAccess: boolean;
};

export type VideosResultsType = {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
};

export type VideosType = {
  id: number;
  results: VideosResultsType[];
};

export type NowPlaying = {
  dates: { maximum: string; minimum: string };
  page: number;
  results: MovieType[];
  total_pages: number;
  total_results: number;
};

export type ArrayMoviesType = {
  current_page: number;
  results: MovieClient[];
};

export type CardMovieType = {
  page: number;
  total_pages: number;
  results: MovieClient[];
};

export type DiscoverType = {
  page: number;
  results: MovieType[];
  total_pages: number;
  total_results: number;
};

export type RecommendationsType = {
  page: number;
  results: RecommendationsMovie[];
  total_pages: number;
  total_results: number;
};

export type RecommendationsMovie = {
  backdrop_path: string;
  id: number;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  adult: boolean;
  title: string;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: false;
  vote_average: number;
  vote_count: number;
};
export type RecommendationsMovieRate = {
  recommended: number;
  backdrop_path: string;
  id: number;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  adult: boolean;
  title: string;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: false;
  vote_average: number;
  vote_count: number;
};

export type MovieClient = {
  adult?: boolean;
  id: number;
  title?: string;
  poster_path: string;
};

export type MovieType = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type DetailsMovieType = {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null | {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  };
  budget: number;
  genres: { id: number; name: string }[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  videos: {
    results: VideosResultsType[];
  };
  credits: {
    cast: CastType[];
    crew: CrewType[];
  };
  "watch/providers": {
    results: {
      BR?: Provider;
      string?: Provider;
    };
  };
};
export type PropsPeople = { cast?: CastType[]; crew?: CrewType[] };

export type CreditsType = {
  id: number;
  cast: CastType[];
  crew: CrewType[];
};

export type CastType = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
};

export type CrewType = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  credit_id: string;
  department: string;
  job: string;
};

export type ListGenres = {
  genres: {
    id: number;
    name: string;
  }[];
};

export type SearchResult = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};
