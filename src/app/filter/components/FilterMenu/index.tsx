"use client";

import { ReactNode, useRef, useState } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import FastAccess from "@/app/filter/components/FilterMenu/FastAccess";
import GenreSelector from "@/app/filter/components/FilterMenu/GenreSelector";
import Menu from "@/app/filter/components/FilterMenu/Menu";
import ProviderSelector from "@/app/filter/components/FilterMenu/ProviderSelector";
import GenreButton from "@/app/filter/components/ui/GenreButton";
import ProviderButton from "@/app/filter/components/ui/ProviderButton";
import ToRight from "@/assets/icons/toRight.svg";
import Container from "@/components/layout/Container";
import BreakHr from "@/components/ui/BreakHr";
import Button from "@/components/ui/Button";
import FoggyEdge from "@/components/ui/FoggyEdge";
import { filtersMap } from "@/data/filtersMap";
import { MovieProviderType } from "@/lib/validation/movieProviderShema";
import { TypeBtnGenres, TypeBtnProvider } from "@/types/globalTypes";

type FilterMenuProps = {
  children: ReactNode;
  listProviders: MovieProviderType | null;
};

export default function FilterMenu({
  children,
  listProviders,
}: Readonly<FilterMenuProps>) {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams);
  const timeId = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const divFilters = useRef<HTMLDivElement>(null);
  const [dataGenres, setGenres] = useState<TypeBtnGenres[]>(() =>
    handleGenres(searchParams.get(filtersMap.withGenres.keys[0])?.split(",")),
  );
  const [providers, setProviders] = useState<TypeBtnProvider[] | null>(() =>
    handleProviders(
      searchParams.get(filtersMap.withWatchProviders.keys[0])?.split("|"),
    ),
  );
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  function handleGenres(inicial?: string[]): TypeBtnGenres[] {
    return filtersMap.withGenres.allowedValues.genres.map((value) => {
      return {
        id: value.id,
        name: value.name,
        state: inicial ? inicial.includes(`${value.id}`) : false,
        fastAccess: inicial ? inicial.includes(`${value.id}`) : false,
      };
    });
  }

  function handleProviders(inicial?: string[]): TypeBtnProvider[] | null {
    if (!listProviders) return null;
    return listProviders.results.map((value) => {
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
        isFilterOpen ? "Movies" : "filtersID",
      );
      setIsFilterOpen(!isFilterOpen);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }

    return (
      <Button
        onClick={open}
        blur
        textBtn
        className="bg-base-accent text-inverted-accent hover:bg-base-accent-hover xl:hidden"
      >
        <ToRight className={isFilterOpen ? "rotate-180" : "order-1 rotate-0"} />
        {isFilterOpen ? "Fechar" : "Expandir filtro"}
      </Button>
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
      case filtersMap.withWatchProviders.keys[0]:
        setProviders(handleProviders());
        break;
      case filtersMap.withGenres.keys[0]:
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
    if (providers && dataGenres) {
      return (
        <Button
          blur
          textBtn
          theme="base"
          className="hover:bg-negative-minimal hover:text-negative-accent"
          onClick={() => {
            reset();
          }}
        >
          Reset
        </Button>
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
      .filter((value) => value.state)
      .map((value) => value.id);

    getTrue.push(picked.id);
    params.set(filtersMap.withGenres.keys[0], getTrue.join(","));
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
      .filter((value) => value.state)
      .map((value) => value.id)
      .filter((value) => value !== picked.id);

    if (getTrue.length == 0) {
      params.delete(filtersMap.withGenres.keys[0]);
    } else {
      params.set(filtersMap.withGenres.keys[0], getTrue.join(","));
    }

    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function addProvider(picked: TypeBtnProvider) {
    if (!providers) return;
    setProviders(
      providers.map((value) => {
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

    const getTrue = providers
      .filter((value) => value.state)
      .map((value) => value.provider_id);

    getTrue.push(picked.provider_id);

    params.set(filtersMap.withWatchProviders.keys[0], getTrue.join("|"));
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function removeProvider(picked: TypeBtnProvider) {
    if (!providers) return;

    setProviders(
      providers.map((value) => {
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

    const getTrue = providers
      .filter((value) => value.state)
      .map((value) => value.provider_id)
      .filter((value) => value !== picked.provider_id);

    if (getTrue.length == 0) {
      params.delete(filtersMap.withWatchProviders.keys[0]);
    } else {
      params.set(filtersMap.withWatchProviders.keys[0], getTrue.join("|"));
    }

    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <FoggyEdge
      fadeOutGradient={false}
      side="top"
      topHead
      surfaceColor="bodyDense"
      onScroll={handleFilterMenu}
      className="no-scrollbar z-10 h-dvh w-auto snap-x snap-mandatory overflow-x-auto overscroll-auto whitespace-nowrap before:right-0 before:min-h-[5.5rem] xl:mx-auto xl:w-auto"
    >
      <div
        ref={divFilters}
        id="filtersID"
        className="relative z-30 inline-block h-full w-[80vw] min-w-80 max-w-sm snap-end snap-always overflow-y-scroll overscroll-auto overscroll-y-auto bg-raised lg:max-w-md"
      >
        <Menu>
          <GenreSelector
            genres={dataGenres}
            add={addGenre}
            remove={removeGenre}
            clear={() => reset(filtersMap.withGenres.keys[0])}
          />
          <BreakHr />
          {providers && (
            <ProviderSelector
              providers={providers}
              add={addProvider}
              remove={removeProvider}
              clear={() => reset(filtersMap.withWatchProviders.keys[0])}
            />
          )}
        </Menu>
      </div>

      <div
        id="Movies"
        className="inline-block h-full w-screen snap-start snap-always overflow-auto overscroll-y-auto xl:w-[calc(100%-448px)]"
      >
        <Container
          paddingTop
          innerStyles="xl:max-w-screen-lg 2xl:max-w-screen-xl min-[1728px]:max-w-screen-2xl"
        >
          <FastAccess>
            <FilterMenuButton />
            <ResetButton />
            {providers && providers.some((value) => value.fastAccess) && (
              <ul className="flex h-fit w-auto select-none justify-start gap-2">
                {providers
                  .filter((value) => value.fastAccess)
                  .map((value) => (
                    <li key={value.provider_id} className="h-9">
                      <ProviderButton
                        provider={value}
                        add={addProvider}
                        remove={removeProvider}
                      />
                    </li>
                  ))}
              </ul>
            )}
            {dataGenres.some((value) => value.fastAccess) && (
              <ul className="flex h-fit w-auto select-none gap-2">
                {dataGenres
                  .filter((value) => value.fastAccess)
                  .map((value) => (
                    <li key={value.id}>
                      <GenreButton
                        genre={value}
                        add={addGenre}
                        remove={removeGenre}
                        backBlur
                      />
                    </li>
                  ))}
              </ul>
            )}
          </FastAccess>
          {children}
        </Container>
      </div>
    </FoggyEdge>
  );
}
