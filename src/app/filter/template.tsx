"use client";

import { Suspense, useState } from "react";

import FilterMenu from "@/app/filter/components/FilterMenu";
import Container from "@/components/layout/Container";
import NavBar from "@/components/layout/NavBar";
import MovieCards from "@/components/skeleton/MovieCards";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type TemplateProps = { children: React.ReactNode };

export default function Template({ children }: TemplateProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <NavBar fixed />
      <Suspense
        fallback={
          <Container>
            <div className="gridTemplateSpace itens-center blockContainer w-full">
              <MovieCards id="filter" size={20} />
            </div>
          </Container>
        }
      >
        <FilterMenu>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </FilterMenu>
      </Suspense>
    </>
  );
}
