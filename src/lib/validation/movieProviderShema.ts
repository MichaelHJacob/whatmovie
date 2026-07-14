import { providerSchema } from "@/lib/validation/watchProvidersSchema";
import z from "zod";

export const movieProviderSchema = z.object({
  results: z
    .array(
      providerSchema
        .and(z.object({ display_priorities: z.record(z.string(), z.number()) }))
        .nullable()
        .catch(null),
    )
    .nonempty({
      message: "Can't be empty!",
    })
    .transform((array) => array.filter((obj) => obj !== null))
    .refine((array) => array.length >= 1, {
      message:
        "One or more errors in object array validation prevented at least one result from being obtained.",
    }),
});

export type MovieProviderType = z.infer<typeof movieProviderSchema>;
