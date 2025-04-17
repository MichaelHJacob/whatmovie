import { tmdbConfig } from "@/data/tmdbConfig";

type BackdropSize = (typeof tmdbConfig.images.backdrop_sizes)[number];
type LogoSize = (typeof tmdbConfig.images.logo_sizes)[number];
type PosterSize = (typeof tmdbConfig.images.poster_sizes)[number];
type ProfileSizes = (typeof tmdbConfig.images.profile_sizes)[number];
type StillSizes = (typeof tmdbConfig.images.still_sizes)[number];

export const IMAGE_BASE_URL = tmdbConfig.images.secure_base_url;

function toObject(acc: Record<string, string>, current: string) {
  acc[current] = `${IMAGE_BASE_URL}${current}`;
  return acc;
}

export const BACKDROP: Record<BackdropSize, string> =
  tmdbConfig.images.backdrop_sizes.reduce(toObject, {});

export const LOGO: Record<LogoSize, string> =
  tmdbConfig.images.logo_sizes.reduce(toObject, {});

export const POSTER: Record<PosterSize, string> =
  tmdbConfig.images.poster_sizes.reduce(toObject, {});

export const PROFILE: Record<ProfileSizes, string> =
  tmdbConfig.images.profile_sizes.reduce(toObject, {});

export const STILL: Record<StillSizes, string> =
  tmdbConfig.images.still_sizes.reduce(toObject, {});
