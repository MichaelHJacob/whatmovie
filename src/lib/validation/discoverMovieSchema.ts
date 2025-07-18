import { z } from "zod";

export const discoverMovieSchema = z.object({
  adult: z.boolean().nullable().catch(null),
  backdrop_path: z.string().nullable().catch(null),
  genre_ids: z.array(z.number()).catch([]),
  id: z.number(),
  original_language: z.string().nullable().catch(null),
  original_title: z.string(),
  overview: z.string().catch("Sinopse não disponível."),
  popularity: z.number().catch(0),
  poster_path: z.string().nullable().catch(null),
  release_date: z.string().date().nullable().catch(null),
  title: z.string(),
  video: z.boolean().catch(false),
  vote_average: z.number().catch(0),
  vote_count: z.number().catch(0),
});

export type DiscoverMovieType = z.infer<typeof discoverMovieSchema>;
