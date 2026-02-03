import { z } from "zod";

export const videoSchema = z.object({
  iso_639_1: z.string().length(2),
  iso_3166_1: z.string().length(2),
  name: z.string(),
  key: z.string(),
  site: z.literal("YouTube"),
  size: z.number().int().positive().catch(0),
  type: z
    .enum(["Clip", "Featurette", "Teaser", "Trailer", "Behind the Scenes"])
    .or(z.string())
    .nullable()
    .catch(null),
  official: z.boolean().catch(false),
  published_at: z.string().datetime().nullable().catch(null),
  id: z.string(),
});

export const videosSchema = z.object({
  id: z.coerce.string(z.number()),
  results: z
    .array(videoSchema.nullable().catch(null))
    .transform((array) => array.filter((obj) => obj !== null))
    .refine((array) => array.length >= 1)
    .nullable()
    .catch(null),
});

export type VideosType = z.infer<typeof videosSchema>;
export type ObjVideoType = z.infer<typeof videoSchema>;
