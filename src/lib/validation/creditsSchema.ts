import { tmdbJobs } from "@/data/tmdbJobs";
import { z } from "zod";

const info = z.object({
  adult: z.boolean().nullable().catch(null),
  gender: z
    .union([z.literal(1), z.literal(2)])
    .nullable()
    .catch(null),
  id: z.coerce.string(z.number().catch(0)),
  known_for_department: z.enum(tmdbJobs.department).nullable().catch(null),
  name: z.string().catch(""),
  original_name: z.string().catch(""),
  popularity: z.number().catch(0),
  profile_path: z.string().nullable().catch(null),
  credit_id: z.string().catch(""),
});

export const creditsSchema = z.object({
  id: z.coerce.string(z.number()),
  cast: z
    .array(
      info
        .extend({
          order: z.number().int().catch(0),
          cast_id: z.number().catch(0),
          character: z.string().catch(""),
        })
        .nullable()
        .catch(null),
    )
    .transform((cast) => cast.filter((obj) => obj !== null))
    .refine((cast) => cast.length >= 1)
    .catch([]),
  crew: z
    .array(
      info
        .extend({
          department: z.enum(tmdbJobs.department),
          job: z.string().catch(""),
        })
        .nullable()
        .catch(null),
    )
    .transform((crew) => crew.filter((obj) => obj !== null))
    .refine((crew) => crew.length >= 1)
    .catch([]),
});

export type CreditsType = z.infer<typeof creditsSchema>;
