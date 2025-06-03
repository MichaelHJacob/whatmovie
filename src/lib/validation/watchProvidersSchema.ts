import { z } from "zod";

const providerSchema = z.object({
  logo_path: z.string(),
  provider_id: z.number(),
  provider_name: z.string(),
  display_priority: z.number(),
});

const resultsProvidersSchema = z.object({
  link: z.string().url().nullable().catch(null),
  flatrate: z.array(providerSchema).nullable().catch(null),
  buy: z.array(providerSchema).nullable().catch(null),
  rent: z.array(providerSchema).nullable().catch(null),
  free: z.array(providerSchema).nullable().catch(null),
  ads: z.array(providerSchema).nullable().catch(null),
});

export const watchProvidersSchema = z.object({
  id: z.number(),
  results: z
    .object({
      BR: resultsProvidersSchema,
    })
    .and(z.record(z.string().length(2), resultsProvidersSchema))
    .nullable()
    .catch(null),
});

export type WatchProvidersType = z.infer<typeof watchProvidersSchema>;
export type ResultsProvidersType = z.infer<typeof resultsProvidersSchema>;
