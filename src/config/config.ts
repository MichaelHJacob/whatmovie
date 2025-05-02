export const API_BASE_URL = "https://api.themoviedb.org/3/";

export const API_ENDPOINTS = {
  moviesList: {
    popular: `${API_BASE_URL}movie/popular`,
    topRated: `${API_BASE_URL}movie/top_rated`,
    upcoming: `${API_BASE_URL}movie/upcoming`,
    nowPlaying: `${API_BASE_URL}movie/now_playing`,
  },
  finding: {
    byId: (id: number | string) => `${API_BASE_URL}movie/${id}`,
    search: `${API_BASE_URL}search/movie`,
    filter: `${API_BASE_URL}discover/movie`,
  },
  metadata: {
    movieProviders: `${API_BASE_URL}watch/providers/movie`,
    movieGenres: `${API_BASE_URL}genre/movie/list`,
  },
  configuration: `${API_BASE_URL}configuration`,
} as const;
