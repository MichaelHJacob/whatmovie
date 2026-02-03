import { z } from "zod";

const dates = z
  .object({
    certification: z.string().min(1).nullable().catch(null),
    descriptors: z.array(z.string()).nullable().catch(null),
    iso_639_1: z.string().min(2).nullable().catch(null),
    note: z.string().length(2).nullable().catch(null),
    release_date: z.string().datetime(),
    type: z.number().min(1).max(6),
  })
  .nullable()
  .catch(null);

export const movieReleaseDates = z
  .object({
    id: z.coerce.string(z.number()),
    results: z
      .array(
        z
          .object({
            iso_3166_1: z.enum(["BR", "US"]).and(z.string().length(2)),
            release_dates: z
              .array(dates)
              .transform((date) => date.filter((obj) => obj !== null))
              .refine((date) => date.length >= 1),
          })
          .nullable()
          .catch(null),
      )
      .transform((date) => date.filter((obj) => obj !== null))
      .refine((date) => date.length >= 1),
  })
  .nullable()
  .catch(null);

export type ReleaseDatesType = z.infer<typeof movieReleaseDates>;
