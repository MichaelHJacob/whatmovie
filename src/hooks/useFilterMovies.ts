import { DiscoverSchemaType } from "@/lib/validation/discoverSchema";
import {
  ExternalAPIError,
  FilterValidationError,
  NotFoundError,
  ValidationError,
} from "@/lib/validation/extendExpectedError";
import { useInfiniteQuery } from "@tanstack/react-query";

async function fetchFilter(filters: URLSearchParams) {
  const res = await fetch(`/api/filter?${filters}`);

  if (!res.ok) {
    const errorData = await res.json();

    switch (errorData.name) {
      case "FilterValidationError":
        throw new FilterValidationError(errorData.validation);
      case "NotFoundError":
        throw new NotFoundError(errorData.message);
      case "ValidationError":
        throw new ValidationError(errorData.message);
      case "ExternalAPIError":
        throw new ExternalAPIError(errorData.message);
      default:
        throw new Error("Erro desconhecido");
    }
  }
  return res.json();
}

export function useFilterMovies(filters: { [k: string]: string }) {
  return useInfiniteQuery<DiscoverSchemaType>({
    queryKey: ["filters", filters],
    queryFn: ({ pageParam }) => {
      const params = new URLSearchParams({
        ...filters,
        page: String(pageParam),
      });
      return fetchFilter(params);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const next = lastPage.page + 1;
      return next <= lastPage.total_pages && next <= 500 ? next : undefined;
    },
    throwOnError: false,
    refetchOnWindowFocus: false,
  });
}
