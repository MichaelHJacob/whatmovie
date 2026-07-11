import { getTmdbConfiguration } from "@/lib/api/tmdb/use-cases/getTmdbConfiguration";
import { tmdbConfigSchema } from "@/lib/validation/tmdbConfigSchema";

export async function getImageBaseUrl() {
  const [data] = await getTmdbConfiguration();
  const img = data ? data.images : tmdbConfigSchema.parse({}).images;

  const baseUrl = {
    backdrop: {
      p300: img.secure_base_url + img.backdrop_sizes.at(-4),
      b800: img.secure_base_url + img.backdrop_sizes.at(-3),
      b1200: img.secure_base_url + img.backdrop_sizes.at(-2),
    },
    logo: {
      i50: img.secure_base_url + img.backdrop_sizes.at(0),
      p100: img.secure_base_url + img.backdrop_sizes.at(1),
      p150: img.secure_base_url + img.backdrop_sizes.at(2),
      p200: img.secure_base_url + img.backdrop_sizes.at(-4),
      p300: img.secure_base_url + img.backdrop_sizes.at(-3),
      p500: img.secure_base_url + img.backdrop_sizes.at(-2),
    },
    poster: {
      p100: img.secure_base_url + img.backdrop_sizes.at(0),
      p150: img.secure_base_url + img.backdrop_sizes.at(1),
      p200: img.secure_base_url + img.backdrop_sizes.at(2),
      p300: img.secure_base_url + img.backdrop_sizes.at(-4),
      p500: img.secure_base_url + img.backdrop_sizes.at(-3),
      b800: img.secure_base_url + img.backdrop_sizes.at(-2),
    },
    profile: {
      i50: img.secure_base_url + img.backdrop_sizes.at(0),
      p200: img.secure_base_url + img.backdrop_sizes.at(1),
      f600: img.secure_base_url + img.backdrop_sizes.at(-2),
    },
    still: {
      p100: img.secure_base_url + img.backdrop_sizes.at(0),
      p200: img.secure_base_url + img.backdrop_sizes.at(1),
      p300: img.secure_base_url + img.backdrop_sizes.at(-2),
    },
  };

  return baseUrl;
}

export const imgBaseUrl = await getImageBaseUrl();
export type imgBaseUrlType = typeof imgBaseUrl;
