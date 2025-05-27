import { discoverMovieSchema } from "@/lib/validation/discoverMovieSchema";
import { z } from "zod";

export const discoverSchema = z.object({
  page: z.number(),
  results: z
    .array(discoverMovieSchema.nullable().catch(null))
    .transform((array) => array.filter((obj) => obj !== null))
    .refine((array) => array.length >= 1)
    .nullable()
    .catch(null),
  total_pages: z.number(),
  total_results: z.number(),
});
