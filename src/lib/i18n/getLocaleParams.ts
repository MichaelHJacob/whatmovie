const localeMap = {
  "pt-BR": {
    language: "pt-BR",
    region: "BR",
    certification_country: "BR",
    watch_region: "BR",
  },
  "en-US": {
    language: "en-US",
    region: "US",
    certification_country: "US",
    watch_region: "US",
  },
} as const;

type localMapType = typeof localeMap;
export type keys = keyof localMapType;

export default function getLocalParams(locale: keys) {
  return localeMap[locale];
}
