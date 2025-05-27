import { listGenres, listMovieProvider } from "@/data/movieMetadata";
import getToday from "@/lib/utils/getToday";
import { z } from "zod";

type BaseFilter =
  | {
      keys: string[];
      allowedValues: () => string;
      type: "date";
      schema: z.ZodTypeAny;
    }
  | {
      keys: string[];
      type: "number" | "boolean";
      schema: z.ZodTypeAny;
    }
  | {
      keys: string[];
      allowedValues: string[] | object | number[];
      type: "option" | "range" | "alternative";
      schema: z.ZodTypeAny;
    };

export const filtersMap = {
  page: {
    keys: ["page"],
    type: "number",
    schema: z.coerce
      .number()
      .int({
        message: "Parâmetro 'page' invalido",
      })
      .min(1)
      .transform((val) => String(val)),
  },

  certification: {
    keys: ["certification", "certification.lte"],
    allowedValues: [16],
    type: "alternative",
    schema: z
      .object({
        lte: z.enum(["16"], {
          message: "Parâmetro 'certification.lte' invalido",
        }),
      })
      .optional(),
  },

  certificationCountry: {
    keys: ["certification_country"],
    allowedValues: ["BR", "US"],
    type: "alternative",
    schema: z
      .enum(["BR", "US"], {
        message: "Parâmetro 'certification_country' invalido",
      })
      .optional(),
  },

  includeAdult: {
    keys: ["include_adult"],
    type: "boolean",
    schema: z
      .enum(["false", "true"], {
        message: "Parâmetro 'include_adult' deve ser 'true' ou 'false'",
      })
      .optional(),
  },

  includeVideo: {
    keys: ["include_video"],
    type: "boolean",
    schema: z
      .enum(["false", "true"], {
        message: "Parâmetro 'include_video' deve ser 'true' ou 'false' ",
      })
      .default("false"),
  },

  language: {
    keys: ["language"],
    allowedValues: ["pt-BR", "en-US"],
    type: "alternative",
    schema: z.enum(["pt-BR", "en-US"], {
      message: "Parâmetro 'language' invalido",
    }),
  },

  region: {
    keys: ["region"],
    allowedValues: ["BR", "US"],
    type: "alternative",
    schema: z.enum(["BR", "US"], {
      message: "Parâmetro 'region' invalido",
    }),
  },

  primaryReleaseDate: {
    keys: [
      "primary_release_date",
      "primary_release_date.lte",
      "primary_release_date.gte",
    ],
    allowedValues: getToday,
    type: "date",
    schema: z
      .object({
        lte: z
          .string({
            message: "Parâmetro 'primary_release_date.lte' invalido",
          })
          .date("Parâmetro 'data' deve ser do tipo YYYY-MM-DD")
          .optional(),
        gte: z
          .string({
            message: "Parâmetro 'primary_release_date.gte' invalido",
          })
          .date("Parâmetro 'data' deve ser do tipo YYYY-MM-DD")
          .optional(),
      })
      .optional(),
  },

  releaseDate: {
    keys: ["release_date", "release_date.lte", "release_date.gte"],
    allowedValues: getToday,
    type: "date",
    schema: z
      .object({
        lte: z
          .string({
            message: "Parâmetro 'release_date.lte' invalido",
          })
          .date("Parâmetro 'data' deve ser do tipo YYYY-MM-DD")
          .optional(),
        gte: z
          .string({
            message: "Parâmetro 'release_date.gte' invalido",
          })
          .date("Parâmetro 'data' deve ser do tipo YYYY-MM-DD")
          .optional(),
      })
      .optional(),
  },

  sortBy: {
    keys: ["sort_by"],
    allowedValues: [
      "original_title.asc",
      "original_title.desc",
      "popularity.asc",
      "popularity.desc",
      "revenue.asc",
      "revenue.desc",
      "primary_release_date.asc",
      "primary_release_date.desc",
      "title.asc",
      "title.desc",
      "vote_average.asc",
      "vote_average.desc",
      "vote_count.asc",
      "vote_count.desc",
    ],
    type: "alternative",
    schema: z
      .enum(
        [
          "original_title.asc",
          "original_title.desc",
          "popularity.asc",
          "popularity.desc",
          "revenue.asc",
          "revenue.desc",
          "primary_release_date.asc",
          "primary_release_date.desc",
          "title.asc",
          "title.desc",
          "vote_average.asc",
          "vote_average.desc",
          "vote_count.asc",
          "vote_count.desc",
        ],
        { message: "Parâmetro 'Ordenar por' invalido" },
      )
      .default("popularity.desc"),
  },

  watchRegion: {
    keys: ["watch_region"],
    allowedValues: ["BR", "US"],
    type: "alternative",
    schema: z
      .enum(["BR", "US"], {
        message: "Parâmetro 'watch_region' invalido",
      })
      .optional(),
  },

  voteAverage: {
    keys: ["vote_average", "vote_average.gte", "vote_average.lte"],
    allowedValues: { gte: 0, lte: 10 },
    type: "range",
    schema: z
      .object(
        {
          gte: z.coerce
            .number({
              message: "Ambos os valores min e max devem estar presentes",
            })
            .gte(0)
            .lte(10),
          lte: z.coerce
            .number({
              message: "Ambos os valores min e max devem estar presentes",
            })
            .gte(0)
            .lte(10),
        },
        { message: "Objeto min max está ausente" },
      )
      .refine((data) => data.gte <= data.lte, {
        message: "'min' deve ser menor ou igual a 'max'",
      })
      .transform((val) => {
        return {
          gte: String(val.gte),
          lte: String(val.lte),
        };
      })
      .optional(),
  },

  voteCount: {
    keys: ["vote_count", "vote_count.gte", "vote_count.lte"],
    type: "number",
    schema: z
      .object(
        {
          gte: z.coerce.number().positive().optional(),
          lte: z.coerce.number().positive().optional(),
        },
        {
          message: "Parâmetro 'vote_count' invalido",
        },
      )
      .transform((data) => {
        if (!data.gte && data.lte) return { lte: String(data.lte) };
        if (!data.lte && data.gte) return { gte: String(data.gte) };
        if (data.gte && data.lte)
          return { gte: String(data.gte), lte: String(data.lte) };
      })
      .optional(),
  },

  withGenres: {
    keys: ["with_genres"],
    allowedValues: listGenres,
    type: "option",
    schema: z
      .string()
      .transform((val) => val.split(","))
      .pipe(
        z.array(
          z.enum(listGenres.genres.map((g) => g.id.toString()) as [string], {
            message: "Parâmetro 'Gênero' invalido",
          }),
        ),
      )
      .transform((val) => val?.join(","))
      .optional(),
  },

  withWatchProviders: {
    keys: ["with_watch_providers"],
    allowedValues: listMovieProvider,
    type: "option",
    schema: z
      .string()
      .refine(
        (val) =>
          val
            .split(/[,|]/)
            .every((id) =>
              listMovieProvider.results
                .map((value) => value.provider_id.toString())
                .includes(id),
            ),
        { message: "Parâmetro 'Onde assistir' invalido" },
      )
      .optional(),
  },

  monetizationTypes: {
    keys: ["with_watch_monetization_types"],
    allowedValues: ["flatrate", "free", "ads", "rent", "buy"],
    type: "option",
    schema: z
      .enum(["flatrate", "free", "ads", "rent", "buy"], {
        message: "Parâmetro 'with_watch_monetization_types' invalido ",
      })
      .or(
        z
          .string({
            message: "Parâmetro 'with_watch_monetization_types' invalido ",
          })
          .regex(
            new RegExp(
              /^\b(flatrate|free|ads|rent|buy)\b(?:[|,]\b(flatrate|free|ads|rent|buy)\b)+$/,
            ),
            {
              message: "Para mais de um tipo use o separador '| , '",
            },
          )
          .regex(
            new RegExp(/^(?!.*(\b(flatrate|free|ads|rent|buy)\b).*\1).+$/),
            {
              message: "Nenhuma tipo pode se repetir",
            },
          ),
      )
      .optional(),
  },

  withReleaseType: {
    keys: ["with_release_type"],
    allowedValues: ["1", "2", "3", "4", "5", "6"],
    type: "option",
    schema: z
      .enum(["1", "2", "3", "4", "5", "6"])
      .or(
        z
          .string()
          .regex(new RegExp(/^[1-6](?:[|,][1-6])+$/), {
            message: "Para mais de um tipo use o separador '| , '",
          })
          .regex(new RegExp(/^(?!.*([1-6]).*\1).+$/), {
            message: "Nenhuma tipo pode se repetir",
          }),
      )
      .optional(),
  },
} as const satisfies Record<string, BaseFilter>;
