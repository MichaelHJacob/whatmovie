import { z } from "zod";

export const tmdbConfigSchema = z
  .object({
    change_keys: z.array(z.string()).nullable().catch(null),
    images: z.object({
      base_url: z.string({ message: "Invalid url" }).nullable(),
      secure_base_url: z.string({ message: "Invalid url" }),
      backdrop_sizes: z.array(z.string()),
      logo_sizes: z.array(z.string()),
      poster_sizes: z.array(z.string()),
      profile_sizes: z.array(z.string()),
      still_sizes: z.array(z.string()),
    }),
  })
  .catch({
    change_keys: null,
    images: {
      base_url: null,
      secure_base_url: "https://image.tmdb.org/t/p/",
      backdrop_sizes: ["w300", "w780", "w1280", "original"],
      logo_sizes: ["w45", "w92", "w154", "w185", "w300", "w500", "original"],
      poster_sizes: ["w92", "w154", "w185", "w342", "w500", "w780", "original"],
      profile_sizes: ["w45", "w185", "h632", "original"],
      still_sizes: ["w92", "w185", "w300", "original"],
    },
  });
