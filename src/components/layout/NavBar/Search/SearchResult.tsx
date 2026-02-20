"use client";

import { ComponentProps, MutableRefObject } from "react";

import LoadingDots from "@/components/skeleton/LoadingDots";
import SkeletonVerticalCards from "@/components/skeleton/SkeletonVerticalCards";
import DynamicGridListContainer from "@/components/ui/DynamicGridListContainer";
import ShortCard from "@/components/ui/ShortCard";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useSearchMovies } from "@/hooks/useSearchMovies";
import {
  NotFoundError,
  SearchValidationError,
} from "@/lib/validation/extendExpectedError";
import { selectOption } from "@/types/globalTypes";
import clsx from "clsx";
import { tv } from "tailwind-variants";

type SearchResultProps = ComponentProps<"ul"> & {
  term: string;
  observer: MutableRefObject<HTMLDivElement | null>;
  onToggleSelect: (option: selectOption) => void;
  selected: selectOption;
};

const searchResultStyles = tv({
  slots: {
    resultsContainer:
      "paddingHeader blockContainer-pb relative -top-11 z-0 box-border h-full w-full",
    scroll:
      "scroll-pHeader snap-y snap-mandatory overscroll-contain scroll-smooth",
  },
});

export default function SearchResult({
  term,
  onToggleSelect,
  selected,
  observer,
  ...props
}: SearchResultProps) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error,
    isLoading,
    isError,
  } = useSearchMovies(term);
  const { resultsContainer, scroll } = searchResultStyles();

  useIntersectionObserver({
    enabled: hasNextPage && !isFetchingNextPage,
    targetRef: observer,
    onIntersect: () => {
      if (hasNextPage) {
        fetchNextPage();
      }
    },
  });

  if (isError) {
    let errorMessage: string[] = [
      "Que tal, pesquisar grandes franquias como:",
      "007",
      "Mad Max",
      "X-Men",
      "Shrek",
    ];

    if (error instanceof SearchValidationError) {
      errorMessage.unshift("Qual o nome do filme que procura?");
    } else if (error instanceof NotFoundError) {
      errorMessage.unshift("Não foi possível encontrar nenhum resultado.");
    } else {
      errorMessage = [
        "Ocorreu um erro inesperado, tente novamente mais tarde.",
      ];
    }

    return (
      <ul className={clsx(props.className, resultsContainer())}>
        {errorMessage.map((message, i) => (
          <li
            className="row-span-1 min-h-11 w-full border-b-2 border-base-minimal p-2 last:border-transparent"
            key={i}
          >
            <p className="label tracking-winder text-left">{message}</p>
          </li>
        ))}
      </ul>
    );
  }

  if (isLoading) {
    return (
      <DynamicGridListContainer
        as="div"
        role="status"
        className={clsx(
          props.className,
          resultsContainer(),
          "animate-pulse overflow-y-hidden",
        )}
      >
        <span className="sr-only">Carregando...</span>
        <SkeletonVerticalCards size={8} className="row-span-1" />
      </DynamicGridListContainer>
    );
  }

  if (!data) return null;

  function isSelected(id: string, i: number): boolean {
    if (!selected) return false;

    if (selected.id === id && selected.index === i) {
      return true;
    }
    return false;
  }

  const dataMovies = data.pages.map((page) => page.results).flat();
  return (
    <DynamicGridListContainer
      {...props}
      className={clsx(props.className, resultsContainer(), scroll())}
      id="suggestions"
      role="listbox"
      key={term}
    >
      {dataMovies.map((value, index) => (
        <ShortCard
          key={`${index}_${value.id}`}
          data={value}
          cache={!selected}
          selected={isSelected(value.id, index)}
          onToggleSelect={onToggleSelect}
          index={index}
        />
      ))}
      {hasNextPage && (
        <li className="row-span-1 h-full">
          <LoadingDots ref={observer} className="h-full" />
        </li>
      )}
    </DynamicGridListContainer>
  );
}
