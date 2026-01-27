export const ENV = {
  TMDB_TOKEN: process.env.TMDB_API_TOKEN,
};

if (!ENV.TMDB_TOKEN) {
  throw new Error("FATAL: TMDB_API_TOKEN not defined in the environment");
}
