import { creditsSchema } from "@/lib/validation/creditsSchema";
import { videosSchema } from "@/lib/validation/videosSchema";
import { watchProvidersSchema } from "@/lib/validation/watchProvidersSchema";
import { z } from "zod";

export const movieDetailsSchema = z.object({
  adult: z.boolean().catch(true),
  backdrop_path: z.string().nullable().catch(null),
  belongs_to_collection: z
    .object({
      id: z.number(),
      name: z.string(),
      poster_path: z.string().nullable().catch(null),
      backdrop_path: z.string().nullable().catch(null),
    })
    .nullable()
    .catch(null),
  budget: z.number().nonnegative().gt(0).nullable().catch(null),
  genres: z
    .array(z.object({ id: z.number(), name: z.string() }))
    .transform((array) => array.filter((obj) => obj !== null))
    .refine((array) => array.length >= 1)
    .nullable()
    .catch(null),
  homepage: z.string().url().nullable().catch(null),
  id: z.number(),
  imdb_id: z.string().nullable().catch(null),
  origin_country: z.array(z.string().length(2)).nullable().catch(null),
  original_language: z.string().length(2).nullable().catch(null),
  original_title: z.string().catch("Título não disponível"),
  overview: z.string().catch("Sinopse não disponível"),
  popularity: z.number().catch(0),
  poster_path: z
    .string()
    .startsWith("/")
    .endsWith(".jpg")
    .nullable()
    .catch(null),
  production_companies: z
    .array(
      z
        .object({
          id: z.number(),
          logo_path: z
            .string()
            .startsWith("/")
            .regex(/^.+\.(png|svg)$/i)
            .nullable()
            .catch(null),
          name: z.string(),
          origin_country: z.string().length(2).nullable().catch(null),
        })
        .nullable()
        .catch(null),
    )
    .transform((array) => array.filter((obj) => obj !== null))
    .refine((array) => array.length >= 1)
    .nullable()
    .catch(null),
  production_countries: z
    .array(
      z
        .object({
          iso_3166_1: z.string().length(2),
          name: z.string(),
        })
        .nullable()
        .catch(null),
    )
    .transform((array) => array.filter((obj) => obj !== null))
    .refine((array) => array.length >= 1)
    .nullable()
    .catch(null),
  release_date: z.string().date().nullable().catch(null),
  revenue: z.number().positive().nullable().catch(null),
  runtime: z.number().positive().nullable().catch(null),
  spoken_languages: z
    .array(
      z
        .object({
          english_name: z.string(),
          iso_639_1: z.string().length(2),
          name: z.string(),
        })
        .nullable()
        .catch(null),
    )
    .transform((array) => array.filter((obj) => obj !== null))
    .refine((array) => array.length >= 1)
    .nullable()
    .catch(null),
  status: z.string().nullable().catch(null),
  tagline: z.string().nullable().catch(null),
  title: z.string(),
  video: z.boolean().catch(true),
  vote_average: z.number().catch(0),
  vote_count: z.number().int().catch(0),
  videos: videosSchema.omit({ id: true }).nullable().catch(null),
  "watch/providers": watchProvidersSchema
    .omit({ id: true })
    .nullable()
    .catch(null),
  credits: creditsSchema.omit({ id: true }).nullable().catch(null),
});

export type MovieDetailsType = z.infer<typeof movieDetailsSchema>;
