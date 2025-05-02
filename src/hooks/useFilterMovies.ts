import { useInfiniteQuery } from "@tanstack/react-query";

async function fetchFilter(filters: URLSearchParams) {
  const res = await fetch(`/api/filter?${filters}`);
  if (!res.ok) throw new Error("Erro ao buscar dados");
  return res.json();
}

export function useFilterMovies(filters: { [k: string]: string }) {
  return useInfiniteQuery({
    queryKey: ["filters", filters],
    queryFn: ({ pageParam }) => {
      const params = new URLSearchParams({
        ...filters,
        page: pageParam.toString(),
      });

      return fetchFilter(params);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const next = lastPage.page + 1;
      return next <= lastPage.total_pages ? next : undefined;
    },
  });
}
