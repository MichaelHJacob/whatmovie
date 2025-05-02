import { filtersMap } from "@/data/filtersMap";

export default function getDefaultFilters(params: URLSearchParams): {
  [k: string]: string;
} {
  const genres = params.get(filtersMap.withGenres.keys)?.split(",") || [];
  return {
    ...(!["27", "36", "9648", "10749", "53", "10752"].some((value) =>
      genres.includes(value),
    ) && {
      [filtersMap.certificationLte.keys]:
        filtersMap.certificationLte.allowedValues,
      [filtersMap.certificationCountry.keys]:
        filtersMap.certificationCountry.allowedValues,
      [filtersMap.includeAdult.keys]: "false",
    }),
    [filtersMap.includeVideo.keys]: "false",
    [filtersMap.language.keys]: filtersMap.language.allowedValues,
    [filtersMap.primaryReleaseDate.keys]:
      filtersMap.primaryReleaseDate.allowedValues(),
    [filtersMap.region.keys]: filtersMap.region.allowedValues,
    ...(!params.get(filtersMap.sortBy.keys) && {
      [filtersMap.sortBy.keys]: filtersMap.sortBy.allowedValues[3],
    }),
    [filtersMap.watchRegion.keys]: filtersMap.watchRegion.allowedValues,
    [filtersMap.monetizationTypes.keys]:
      filtersMap.monetizationTypes.allowedValues.join("|"),
  };
}
