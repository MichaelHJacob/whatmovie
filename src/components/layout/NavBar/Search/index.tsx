"use client";

import { useCallback, useMemo, useRef, useState } from "react";

import { useRouter } from "next/navigation";

import SearchIcon from "@/assets/icons/searchIcon.svg";
import SearchResult from "@/components/layout/NavBar/Search/SearchResult";
import Fieldset from "@/components/layout/NavBar/Search/components/Fieldset";
import Form from "@/components/layout/NavBar/Search/components/Form";
import OptionsContainer from "@/components/layout/NavBar/Search/components/OptionsContainer";
import { navbarBase } from "@/components/layout/NavBar/navbar.styles";
import { useDebounce } from "@/hooks/useDebounce";
import { useKeyboardNavigation } from "@/hooks/useKeyboardNavigation";
import { useSearchMovies } from "@/hooks/useSearchMovies";
import { selectOption } from "@/types/globalTypes";
import clsx from "clsx";
import { tv } from "tailwind-variants";

const searchStyles = tv({
  extend: navbarBase,
  slots: {
    labelSearch:
      "group/label w-full cursor-pointer items-center gap-2 rounded-xl bg-input p-1 text-placeholder outline-2 outline-offset-1 outline-transparent transition-all duration-200 has-[:focus]:outline-input-focus",
    inputSearch:
      "w-full appearance-none overflow-hidden text-ellipsis whitespace-nowrap bg-transparent text-base placeholder:text-placeholder max-sm:placeholder:text-opacity-0",
    btnClose: "group/close flex px-0 transition-all duration-300",
    animation: "animate-presets",
  },
  variants: {
    animating: {
      opening: {
        animation: "animate-fade-left",
      },
      closing: {
        animation: "animate-fade-left animate-reverse",
      },
      end: {
        animation: "",
      },
    },
  },
});

export default function Search() {
  const [term, setTerm] = useState("");
  const [prevTerm, setPrevTerm] = useState(term);
  const [autoSelect, setAutoSelect] = useState<boolean>(true);
  const input = useRef<HTMLInputElement | null>(null);
  const observerRef = useRef<HTMLDivElement>(null);
  const debouncedTerm = useDebounce(term, 500);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAnimating, setIsAnimating] = useState<"opening" | "closing" | "end">(
    "end",
  );
  const [selected, setSelected] = useState<selectOption>(null);

  const {
    btnClose,
    inputSearch,
    labelSearch,
    btnHeader,
    btnText,
    icon,
    animation,
  } = searchStyles({
    animating: isAnimating,
  });

  const router = useRouter();

  const { data, hasNextPage } = useSearchMovies(debouncedTerm);

  const movieIDs: string[] | null = useMemo(() => {
    if (!data) return null;
    return data.pages
      .map((page) => page.results.map((value) => value.id))
      .flat();
  }, [data]);

  function toggleExpand() {
    if (isExpanded) {
      if (input.current) input.current.blur();
      setIsAnimating("closing");
      setTimeout(() => {
        setIsAnimating("end");
        setTerm("");
        setSelected(null);
        setPrevTerm("");
        setAutoSelect(true);
        setIsExpanded(false);
      }, 600);
    } else {
      if (input.current) input.current.focus();
      setIsExpanded(true);
      setIsAnimating("opening");
      setTimeout(() => {
        setIsAnimating("end");
      }, 600);
    }
  }

  const toggleSelect = useCallback(
    (option: selectOption) => {
      setSelected(option);
      if (!autoSelect) setAutoSelect(false);
    },
    [autoSelect],
  );

  if (movieIDs && autoSelect) {
    const i = selected ? selected.index + 1 : 0;
    if (movieIDs.length > i) {
      const id = movieIDs?.at(i);
      if (id) {
        setSelected({ index: i, id: id });
        setAutoSelect(false);
      }
    }
  }

  if (debouncedTerm !== prevTerm) {
    setPrevTerm(debouncedTerm);
    setSelected(null);
    setAutoSelect(true);
  }

  function toRoute(id: string) {
    router.push(`/movie/${id}`);
  }

  const { handleKeyDown } = useKeyboardNavigation({
    onEnter: toRoute,
    onToggleExpand: toggleExpand,
    onToggleSelect: toggleSelect,
    isExpanded,
    observer: observerRef,
    optionIDs: movieIDs,
    selected,
  });

  return (
    <Form
      isExpanded={isExpanded}
      onToggleExpand={toggleExpand}
      className={animation()}
      data-bgscrim={isExpanded}
    >
      <OptionsContainer isExpanded={isExpanded}>
        <Fieldset isExpanded={isExpanded} className={animation()}>
          <label
            htmlFor="search"
            className={clsx(
              btnHeader(),
              labelSearch(),
              !isExpanded && "animate-fade",
            )}
          >
            <SearchIcon
              className={icon({
                class: "fill-current",
              })}
            />
            <span className="sr-only">Buscar</span>
            <input
              className={clsx(
                btnText(),
                inputSearch(),
                !isExpanded && "max-sm:max-w-16",
              )}
              ref={input}
              onKeyDown={(event) => {
                handleKeyDown(event);
                if (
                  selected &&
                  movieIDs &&
                  selected.index + 1 === movieIDs.length
                ) {
                  if (hasNextPage) setAutoSelect(true);
                }
              }}
              onClick={() => {
                if (!isExpanded) {
                  toggleExpand();
                }
              }}
              type="search"
              role="combobox"
              autoComplete="off"
              aria-autocomplete="list"
              aria-expanded={isExpanded}
              aria-controls="suggestions"
              aria-activedescendant={
                selected ? selected.id.toString() : undefined
              }
              id="search"
              placeholder="Buscar por filme"
              onChange={(e) => {
                setTerm(e.target.value);
              }}
              value={term}
            />
          </label>
          <button
            tabIndex={-1}
            type="button"
            onClick={() => {
              if (isExpanded) {
                toggleExpand();
              }
            }}
            onKeyDown={(event) => {
              if (event.key === "Escape") toggleExpand();
            }}
            className={clsx(btnHeader(), btnClose(), !isExpanded && "hidden")}
          >
            <span
              className={btnText({
                class: "group-hover/close:text-primary-minimal",
              })}
            >
              Fechar
            </span>
          </button>
        </Fieldset>
        {isExpanded && debouncedTerm && (
          <SearchResult
            key={debouncedTerm}
            term={debouncedTerm}
            onToggleSelect={toggleSelect}
            selected={selected}
            observer={observerRef}
            className={animation()}
            onTouchMove={() => {
              if (input.current) {
                input.current.blur();
              }
            }}
          />
        )}
      </OptionsContainer>
    </Form>
  );
}
