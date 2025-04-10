"use client";

import { ReactNode, useCallback, useEffect, useRef, useState } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import GenreSelector from "@/app/filter/components/Filter/FilterMenu/GenreSelector";
import ProviderSelector from "@/app/filter/components/Filter/FilterMenu/ProviderSelector";
import RangeVoteSelector from "@/app/filter/components/Filter/FilterMenu/RangeVoteSelector";
import SortBySelector from "@/app/filter/components/Filter/FilterMenu/SortBySelector";
import GenreButton from "@/app/filter/components/ui/GenreButton";
import ProviderButton from "@/app/filter/components/ui/ProviderButton";
import Container from "@/components/layout/Container";
import BreakHr from "@/components/ui/BreakHr";
import {
  ListGenres,
  MovieProviders,
  TypeBtnGenres,
  TypeBtnProvider,
} from "@/components/utils/types";

type FilterMenuProps = {
  children: ReactNode;
  filters: { listGenres: ListGenres; listProviders: MovieProviders };
};

export default function FilterMenu({ children, filters }: FilterMenuProps) {
  const { replace } = useRouter();
  const inicialParams = useRef(useSearchParams());
  const pathname = usePathname();
  const params = new URLSearchParams(inicialParams.current);
  const timeId = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const divFilters = useRef<HTMLDivElement>(null);

  const [dataGenres, setGenres] = useState<TypeBtnGenres[] | null>(null);
  const [usualG, setUsualG] = useState<TypeBtnGenres[]>([]);
  const [resetGenres, setRGenres] = useState<TypeBtnGenres[] | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [dataProviders, setProviders] = useState<TypeBtnProvider[] | null>(
    null,
  );
  const [usualP, setUsualP] = useState<TypeBtnProvider[]>([]);
  const [resetProviders, setRProviders] = useState<TypeBtnProvider[] | null>(
    null,
  );

  const inicialValues = useCallback(() => {
    const activeGenres = inicialParams.current.get("g")?.split(",") || [];
    const activeProviders = inicialParams.current.get("p")?.split(",") || [];
    setUsualG(
      filters.listGenres.genres
        .filter((value) => activeGenres.includes(`${value.id}`))
        .map((value) => {
          return {
            id: value.id,
            name: value.name,
            state: true,
          };
        }),
    );

    setGenres(
      filters.listGenres.genres.map((value) => {
        return {
          id: value.id,
          name: value.name,
          state: activeGenres.includes(`${value.id}`),
        };
      }),
    );

    setRGenres(
      filters.listGenres.genres.map((value) => {
        return {
          id: value.id,
          name: value.name,
          state: false,
        };
      }),
    );

    setUsualP(
      filters.listProviders.results
        .filter((value) => activeProviders.includes(`${value.provider_id}`))
        .map((value) => {
          return {
            logo_path: value.logo_path,
            provider_name: value.provider_name,
            provider_id: value.provider_id,
            state: true,
          };
        }),
    );

    setProviders(
      filters.listProviders.results.map((value) => {
        return {
          logo_path: value.logo_path,
          provider_name: value.provider_name,
          provider_id: value.provider_id,
          state: activeGenres.includes(`${value.provider_id}`),
        };
      }),
    );

    setRProviders(
      filters.listProviders.results.map((value) => {
        return {
          logo_path: value.logo_path,
          provider_name: value.provider_name,
          provider_id: value.provider_id,
          state: false,
        };
      }),
    );
  }, [filters]);

  useEffect(() => {
    inicialValues();
  }, [inicialValues]);

  function FilterMenuButton() {
    function open() {
      const element = document.getElementById(
        isFilterOpen == true ? "Movies" : "filtersID",
      );
      setIsFilterOpen(!isFilterOpen);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }

    return (
      <button onClick={open} className="main-backBtn backBtn xl:hidden">
        <span
          className={`h-[12px] w-[12px] ${
            isFilterOpen
              ? "rotate-[190deg] animate-rotateToL"
              : "order-1 rotate-[0deg] animate-rotateToR"
          } bg-[url('/icons/toRight.svg')] bg-[length:12px_12px] bg-[center_center] bg-no-repeat transition-all duration-300`}
        ></span>
        <span className="textBtn">
          {isFilterOpen ? "Fechar" : "Expandir filtro"}
        </span>
      </button>
    );
  }

  function handleFilterMenu() {
    if (timeId.current) {
      clearTimeout(timeId.current);
    }
    timeId.current = setTimeout(() => {
      if (divFilters.current) {
        if (divFilters.current.getBoundingClientRect().left == 0) {
          setIsFilterOpen(true);
        } else setIsFilterOpen(false);
      }
    }, 1);
  }

  function reset(filter?: string) {
    switch (filter) {
      case "p":
        setProviders(JSON.parse(JSON.stringify(resetProviders)));
        setUsualP([]);
        break;
      case "g":
        setGenres(JSON.parse(JSON.stringify(resetGenres)));
        setUsualG([]);
        break;
      default:
        setProviders(JSON.parse(JSON.stringify(resetProviders)));
        setGenres(JSON.parse(JSON.stringify(resetGenres)));
        setUsualP([]);
        setUsualG([]);
        replace(`${pathname}`);
        return;
    }
    params.delete(filter);
    replace(`${pathname}?${params.toString()}`);
  }

  function ResetButton() {
    if (dataProviders && dataGenres && resetProviders) {
      return (
        <button
          className="backBtn main-backBtn"
          onClick={() => {
            reset();
          }}
        >
          <span className="textBtn">Reset</span>
        </button>
      );
    }
  }

  function addGenre(picked: TypeBtnGenres) {
    if (dataGenres == null) return;

    setGenres(
      dataGenres.map((value) => {
        if (value.id == picked.id) {
          return {
            id: value.id,
            name: value.name,
            state: true,
          };
        } else {
          return {
            id: value.id,
            name: value.name,
            state: value.state,
          };
        }
      }),
    );

    if (usualG.length > 0) {
      if (usualG.filter((value) => value.id == picked.id).length == 1) {
        setUsualG(
          usualG.map((value) => {
            if (value.id == picked.id) {
              return {
                id: value.id,
                name: value.name,
                state: true,
              };
            } else {
              return value;
            }
          }),
        );
      } else {
        setUsualG([
          ...JSON.parse(JSON.stringify(usualG)),
          {
            id: picked.id,
            name: picked.name,
            state: true,
          },
        ]);
      }
    } else {
      setUsualG([
        {
          id: picked.id,
          name: picked.name,
          state: true,
        },
      ]);
    }

    const getTrue = usualG
      .filter((value) => value.state == true)
      .map((value) => value.id);
    getTrue.push(picked.id);

    params.set("g", getTrue.join(","));
    params.set("page", "1");
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function removeGenre(picked: TypeBtnGenres) {
    if (dataGenres == null) return;

    setGenres(
      dataGenres.map((value) => {
        if (value.id == picked.id) {
          return {
            id: value.id,
            name: value.name,
            state: false,
          };
        } else {
          return value;
        }
      }),
    );

    setUsualG(
      usualG.map((value) => {
        if (value.id == picked.id) {
          return {
            id: value.id,
            name: value.name,
            state: false,
          };
        } else {
          return value;
        }
      }),
    );

    const getTrue = usualG
      .filter((value) => value.state == true)
      .map((value) => value.id)
      .filter((value) => value !== picked.id);

    if (getTrue.length == 0) {
      params.delete("g");
    } else {
      params.set("g", getTrue.join(","));
    }

    params.set("page", "1");
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function addProvider(picked: TypeBtnProvider) {
    if (dataProviders == null) return;

    setProviders(
      dataProviders.map((value) => {
        if (value.provider_id == picked.provider_id) {
          return {
            logo_path: value.logo_path,
            provider_name: value.provider_name,
            provider_id: value.provider_id,
            state: true,
          };
        } else {
          return value;
        }
      }),
    );

    if (usualP.length > 0) {
      if (
        usualP.filter((value) => value.provider_id == picked.provider_id)
          .length == 1
      ) {
        setUsualP(
          usualP.map((value) => {
            if (value.provider_id == picked.provider_id) {
              return {
                logo_path: value.logo_path,
                provider_name: value.provider_name,
                provider_id: value.provider_id,
                state: true,
              };
            } else {
              return value;
            }
          }),
        );
      } else {
        setUsualP([
          ...JSON.parse(JSON.stringify(usualP)),
          {
            logo_path: picked.logo_path,
            provider_name: picked.provider_name,
            provider_id: picked.provider_id,
            state: true,
          },
        ]);
      }
    } else {
      setUsualP([
        {
          logo_path: picked.logo_path,
          provider_name: picked.provider_name,
          provider_id: picked.provider_id,
          state: true,
        },
      ]);
    }

    const getTrue = usualP
      .filter((value) => value.state == true)
      .map((value) => value.provider_id);

    getTrue.push(picked.provider_id);

    params.set("p", getTrue.join("|"));
    params.set("page", "1");
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function removeProvider(picked: TypeBtnProvider) {
    if (dataProviders == null) return;

    setProviders(
      dataProviders.map((value) => {
        if (value.provider_id == picked.provider_id) {
          return {
            logo_path: value.logo_path,
            provider_name: value.provider_name,
            provider_id: value.provider_id,
            state: false,
          };
        } else {
          return value;
        }
      }),
    );

    setUsualP(
      usualP.map((value) => {
        if (value.provider_id == picked.provider_id) {
          return {
            logo_path: value.logo_path,
            provider_name: value.provider_name,
            provider_id: value.provider_id,
            state: false,
          };
        } else {
          return value;
        }
      }),
    );

    const getTrue = usualP
      .filter((value) => value.state == true)
      .map((value) => value.provider_id)
      .filter((value) => value !== picked.provider_id);

    if (getTrue.length == 0) {
      params.delete("p");
    } else {
      params.set("p", getTrue.join("|"));
    }

    params.set("page", "1");
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div
      onScroll={handleFilterMenu}
      className="no-scrollbar scrollStyle z-10 h-dvh w-auto snap-x snap-mandatory overflow-x-auto overscroll-x-contain whitespace-nowrap xl:mx-auto xl:w-auto"
    >
      <div
        ref={divFilters}
        id="filtersID"
        className="inline-block h-full w-[80vw] min-w-80 max-w-sm snap-end snap-always overflow-y-scroll overscroll-y-contain overscroll-x-contain bg-nightDew-100 lg:max-w-lg xl:max-w-md"
      >
        <menu className="paddingHeader blockContainer-b flex list-none flex-col gap-[--gap] xs:gap-[--gapXS] md:gap-[--gapMD] lg:gap-[--gapLG]">
          <SortBySelector />
          <BreakHr color={"border-nightDew-300"} />
          <RangeVoteSelector />
          <BreakHr color={"border-nightDew-300"} />

          {dataGenres && (
            <GenreSelector
              genres={dataGenres}
              add={addGenre}
              remove={removeGenre}
              clear={reset}
            />
          )}
          <BreakHr color={"border-nightDew-300"} />
          {dataProviders && (
            <ProviderSelector
              providers={dataProviders}
              add={addProvider}
              remove={removeProvider}
              clear={reset}
            />
          )}
        </menu>
      </div>

      <div
        id="Movies"
        className="inline-block h-full w-screen snap-start snap-always overflow-auto overscroll-y-contain xl:w-[calc(100%-448px)]"
      >
        <Container paddingTop>
          <div className="no-scrollbar blockContainer-x blockContainer-mb sticky top-11 z-50 flex h-11 w-full items-center gap-2 overflow-x-scroll bg-nightDew-200/30 backdrop-blur-md">
            <FilterMenuButton />
            <ResetButton />
            {usualP.length > 0 && (
              <ul className="flex h-fit w-auto select-none justify-start gap-2">
                {usualP.map((value) => (
                  <li key={value.provider_id} className="*:main-backBtn">
                    <ProviderButton
                      provider={value}
                      add={addProvider}
                      remove={removeProvider}
                    />
                  </li>
                ))}
              </ul>
            )}
            {usualG.length > 0 && (
              <ul className="flex h-fit w-auto select-none gap-2">
                {usualG.map((value) => (
                  <li key={value.id} className="*:main-backBtn">
                    <GenreButton
                      genre={value}
                      add={addGenre}
                      remove={removeGenre}
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
          {children}
        </Container>
      </div>
    </div>
  );
}
