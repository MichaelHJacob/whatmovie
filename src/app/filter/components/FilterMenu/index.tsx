"use client";

import { ReactNode, useRef, useState } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import FastAccess from "@/app/filter/components/FilterMenu/FastAccess";
import GenreSelector from "@/app/filter/components/FilterMenu/GenreSelector";
import Menu from "@/app/filter/components/FilterMenu/Menu";
import ProviderSelector from "@/app/filter/components/FilterMenu/ProviderSelector";
import GenreButton from "@/app/filter/components/ui/GenreButton";
import ProviderButton from "@/app/filter/components/ui/ProviderButton";
import Container from "@/components/layout/Container";
import BreakHr from "@/components/ui/BreakHr";
import { listGenres, listMovieProvider } from "@/data/movieMetadata";
import { TypeBtnGenres, TypeBtnProvider } from "@/types/globalTypes";

type FilterMenuProps = {
  children: ReactNode;
};

export default function FilterMenu({ children }: FilterMenuProps) {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams);
  const timeId = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const divFilters = useRef<HTMLDivElement>(null);

  const [dataGenres, setGenres] = useState<TypeBtnGenres[]>(() =>
    handleGenres(searchParams.get("g")?.split(",")),
  );

  const [dataProviders, setProviders] = useState<TypeBtnProvider[]>(() =>
    handleProviders(searchParams.get("p")?.split("|")),
  );

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  function handleGenres(inicial?: string[]): TypeBtnGenres[] {
    return listGenres.genres.map((value) => {
      return {
        id: value.id,
        name: value.name,
        state: inicial ? inicial.includes(`${value.id}`) : false,
        fastAccess: inicial ? inicial.includes(`${value.id}`) : false,
      };
    });
  }

  function handleProviders(inicial?: string[]): TypeBtnProvider[] {
    return listMovieProvider.results.map((value) => {
      return {
        logo_path: value.logo_path,
        provider_name: value.provider_name,
        provider_id: value.provider_id,
        state: inicial ? inicial.includes(`${value.provider_id}`) : false,
        fastAccess: inicial ? inicial.includes(`${value.provider_id}`) : false,
      };
    });
  }

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
        setProviders(handleProviders());
        break;
      case "g":
        setGenres(handleGenres());
        break;
      default:
        setProviders(handleProviders());
        setGenres(handleGenres());
        replace(`${pathname}`);
        return;
    }
    params.delete(filter);
    replace(`${pathname}?${params.toString()}`);
  }

  function ResetButton() {
    if (dataProviders && dataGenres) {
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
    setGenres(
      dataGenres.map((value) => {
        if (value.id == picked.id) {
          return {
            id: value.id,
            name: value.name,
            state: true,
            fastAccess: true,
          };
        } else {
          return value;
        }
      }),
    );

    const getTrue = dataGenres
      .filter((value) => value.state == true)
      .map((value) => value.id);

    getTrue.push(picked.id);
    params.set("g", getTrue.join(","));
    params.set("page", "1");
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function removeGenre(picked: TypeBtnGenres) {
    setGenres(
      dataGenres.map((value) => {
        if (value.id == picked.id) {
          return {
            id: value.id,
            name: value.name,
            state: false,
            fastAccess: value.fastAccess,
          };
        } else {
          return value;
        }
      }),
    );

    const getTrue = dataGenres
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
    setProviders(
      dataProviders.map((value) => {
        if (value.provider_id == picked.provider_id) {
          return {
            logo_path: value.logo_path,
            provider_name: value.provider_name,
            provider_id: value.provider_id,
            state: true,
            fastAccess: true,
          };
        } else {
          return value;
        }
      }),
    );

    const getTrue = dataProviders
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
            fastAccess: value.fastAccess,
          };
        } else {
          return value;
        }
      }),
    );

    const getTrue = dataProviders
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
        <Menu>
          <GenreSelector
            genres={dataGenres}
            add={addGenre}
            remove={removeGenre}
            clear={reset}
          />
          <BreakHr color={"border-nightDew-300"} />
          <ProviderSelector
            providers={dataProviders}
            add={addProvider}
            remove={removeProvider}
            clear={reset}
          />
        </Menu>
      </div>

      <div
        id="Movies"
        className="inline-block h-full w-screen snap-start snap-always overflow-auto overscroll-y-contain xl:w-[calc(100%-448px)]"
      >
        <Container paddingTop>
          <FastAccess>
            <FilterMenuButton />
            <ResetButton />
            {dataProviders.filter((value) => value.fastAccess).length > 0 && (
              <ul className="flex h-fit w-auto select-none justify-start gap-2">
                {dataProviders
                  .filter((value) => value.fastAccess)
                  .map((value) => (
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
            {dataGenres.filter((value) => value.fastAccess).length > 0 && (
              <ul className="flex h-fit w-auto select-none gap-2">
                {dataGenres
                  .filter((value) => value.fastAccess)
                  .map((value) => (
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
          </FastAccess>
          {children}
        </Container>
      </div>
    </div>
  );
}
