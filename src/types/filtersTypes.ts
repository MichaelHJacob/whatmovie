import { filtersMap } from "@/data/filtersMap";

export const filtersKey = Object.keys(filtersMap);

export type filtersMapTypes = {
  [K in keyof typeof filtersMap]: (typeof filtersMap)[K];
};
