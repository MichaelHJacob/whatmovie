import { RequestInit } from "next/dist/server/web/spec-extension/request";

import { keys } from "@/lib/i18n/getLocaleParams";
import { ZodSchema } from "zod";

export type TypeBtnProvider = {
  logo_path: string;
  provider_name: string;
  provider_id: number;
  state: boolean;
  fastAccess: boolean;
};

export type TypeBtnGenres = {
  id: number;
  name: string;
  state: boolean;
  fastAccess: boolean;
};

export type selectOption = null | {
  id: string;
  index: number;
};

export type fetchOptionsExtended = {
  schema: ZodSchema;
  revalidate?: number;
  errorMessage?: string;
  url: string | URL | Request;
  options?: Omit<RequestInit, "headers">;
};

export type GetUseCasesParams = {
  locale?: keys;
  page?: number;
};

export type GetUseCasesWithIdParams = GetUseCasesParams & {
  id: number | string;
};

export type DataOrError<TData> = [TData, null] | [null, Error];
