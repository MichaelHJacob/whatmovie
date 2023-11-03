"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import "@/components/comp.css";
import { SetStateAction } from "react";

export default function FilterContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function BtnSortBy() {
    function handleSelect(selected: string) {
      const params = new URLSearchParams(searchParams);
      params.set('sort', selected );
      params.set('page', '1' );
      console.log(selected);
      replace(`${pathname}?${params.toString()}`);
    }
    return (
      <label className="title ">
        Ordenar por :
        <select
          className="btnStyle bg-inherit  "
          name="sortBy"
          onChange={(e) => {
            handleSelect(e.target.value);
          }}
          defaultValue={searchParams.get("sort")?.toString()}
        >
          <option value="popularity">Popular</option>
          <option value="revenue">Custo</option>
          <option value="primary_release_date">Lançamento</option>
          <option value="vote_average">Votos</option>
        </select>
      </label>
    );
  }

  return (
    <div className="background-blur sticky z-40 top-[-6rem] h-[12rem] min-w-full flex justify-end items-end ">
      <BtnSortBy />
      {children}
    </div>
  );
}

export function BtnPages({ totalPages }: { totalPages: number }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  if (totalPages > 500) {
    totalPages = 500;
  }
  const atual =  Number(searchParams?.get("page")) || 1  ;
  console.log(atual);

  function back() {
    const params = new URLSearchParams(searchParams);

    if (atual == 1) {
      params.set("page", `${totalPages}`);
      replace(`${pathname}?${params.toString()}`);
    } else {
      params.set("page", `${atual - 1}`);
      replace(`${pathname}?${params.toString()}`);
    }
  }
  function next() {
    const params = new URLSearchParams(searchParams);

    if (atual == totalPages) {
      params.set("page", '1');
      replace(`${pathname}?${params.toString()}`);
    } else {
      params.set("page", `${atual + 1}`);
      replace(`${pathname}?${params.toString()}`);
    }
  }
  
  return (
    <div className="  h-12    flex justify-between items-center     px-5">
      <label className="title">
        Página {atual} {totalPages < 500 && ` de ${totalPages}`}
      </label>
      <button className=" btnStyle w-12 " onClick={back}>
        {"<"}
      </button>

      <button className="btnStyle w-12" onClick={next}>
        {">"}
      </button>
    </div>
  );
}
