import { filtersMap } from "@/data/filtersMap";

export type FilterMapValues = (typeof filtersMap)[keyof typeof filtersMap];

export type FiltersMap = {
  [K in keyof typeof filtersMap]: (typeof filtersMap)[K];
};

export type filterKeyTypes = keyof FiltersMap;

export type ParamsKeys = FiltersMap[keyof FiltersMap]["keys"];
