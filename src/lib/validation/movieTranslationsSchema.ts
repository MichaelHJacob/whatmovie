import { z } from "zod";

export const movieTranslationsSchema = z
  .object({
    id: z.coerce.string(z.number()),
    translations: z
      .array(
        z
          .object({
            iso_3166_1: z.string(),
            iso_639_1: z.string(),
            name: z.string(),
            english_name: z.string().min(2),
            data: z
              .object({
                homepage: z.string().nullable().catch(null),
                overview: z.string().nullable().catch(null),
                runtime: z.number().nullable().catch(null),
                tagline: z.string().nullable().catch(null),
                title: z.string().nullable().catch(null),
              })
              .nullable()
              .catch(null),
          })
          .nullable()
          .catch(null),
      )
      .transform((array) => array.filter((obj) => obj !== null))
      .refine((array) => array.length >= 1, {
        message:
          "One or more errors in object array validation prevented at least one result from being obtained.",
      }),
  })
  .nullable()
  .catch(null);
