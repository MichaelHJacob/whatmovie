import { filtersMap } from "@/data/filtersMap";
import { z } from "zod";

export const filterSchema = z
  .object(
    Object.fromEntries(
      Object.values(filtersMap).map((value) => {
        return [value.keys[0], value.schema] as const;
      }),
    ) as {
      [K in keyof typeof filtersMap as (typeof filtersMap)[K]["keys"][0]]: (typeof filtersMap)[K]["schema"];
    },
  )
  .refine((params) => {
    if (params.sort_by.includes("vote")) {
      params.vote_count = { gte: "500" };
    }
    if (
      !params.with_genres
        ?.split(",")
        .some((genre) =>
          ["27", "36", "9648", "10749", "53", "10752"].includes(genre),
        )
    ) {
      params.certification = { lte: "16" };
      params.include_adult = "false";
    }
    params.primary_release_date = {
      lte: filtersMap.primaryReleaseDate.allowedValues(),
    };
    return params;
  });

export type FilterSchemaErrors = z.inferFlattenedErrors<typeof filterSchema>;

export type FilterSchemaType = z.infer<typeof filterSchema>;
