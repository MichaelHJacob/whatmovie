import { Resource } from "sst";

export const ENV = {
  TMDB_TOKEN: Resource.TmdbApiToken.value,
};

if (!ENV.TMDB_TOKEN) {
  throw new Error("FATAL: TMDB_API_TOKEN not defined in the environment");
}
