import { discoverMovieSchema } from "@/lib/validation/discoverMovieSchema";
import { z } from "zod";

export const discoverSchema = z.object({
  page: z.number(),
  results: z
    .array(discoverMovieSchema.nullable().catch(null))
    .nonempty({
      message: "Can't be empty!",
    })
    .transform((array) => array.filter((obj) => obj !== null))
    .refine((array) => array.length >= 1, {
      message:
        "One or more errors in object array validation prevented at least one result from being obtained.",
    })
    .catch([]),
  total_pages: z.number().positive(),
  total_results: z.number(),
});

export type DiscoverSchemaType = z.infer<typeof discoverSchema>;
