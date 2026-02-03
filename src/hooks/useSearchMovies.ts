import { DiscoverSchemaType } from "@/lib/validation/discoverSchema";
import {
  ExternalAPIError,
  NotFoundError,
  SearchValidationError,
  ValidationError,
} from "@/lib/validation/extendExpectedError";
import { useInfiniteQuery } from "@tanstack/react-query";

async function fetchSearch(params: URLSearchParams) {
  const res = await fetch(`/api/search?${params}`);

  if (!res.ok) {
    const errorData = await res.json();

    switch (errorData.name) {
      case "SearchValidationError":
        throw new SearchValidationError(errorData.message);
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

export function useSearchMovies(getTerm: string) {
  return useInfiniteQuery<DiscoverSchemaType>({
    queryKey: ["search", getTerm],
    queryFn: async ({ pageParam }) => {
      const params = new URLSearchParams({
        query: getTerm,
        page: String(pageParam),
      });
      return fetchSearch(params);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const next = lastPage.page + 1;
      return next <= lastPage.total_pages && next <= 500 ? next : undefined;
    },
    throwOnError: false,
    refetchOnWindowFocus: false,
    enabled: !!getTerm,
  });
}
