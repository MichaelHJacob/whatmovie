import { useEffect, useState } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { filterMenuBase } from "@/app/filter/components/FilterMenu/filterMenu.styles";
import { buttonStyles } from "@/components/ui/Button";
import { FiltersMap } from "@/types/filtersTypes";
import clsx from "clsx";

type SortBySelectorProps = FiltersMap["sortBy"];

export default function SortBySelector(props: Readonly<SortBySelectorProps>) {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams);
  const [orderBy, setOrderBy] = useState(
    searchParams.get(props.keys[0])?.toString() || props.allowedValues[3],
  );

  function handleSelect(selected: string) {
    params.set(props.keys[0], selected);
    replace(`${pathname}?${params.toString()}`);
    setOrderBy(selected);
  }

  useEffect(() => {
    if (!searchParams.has(props.keys[0])) {
      setOrderBy(props.allowedValues[3]);
    }
  }, [searchParams, props.keys, props.allowedValues]);

  const { field, title, outline } = filterMenuBase({ fieldset: false });
  const { button, text } = buttonStyles({
    textBtn: true,
    theme: "neutral-subtle",
  });

  return (
    <div className={field()}>
      <label className="flex cursor-pointer touch-manipulation items-center justify-between">
        <span className={title()}>Ordenar por:</span>
        <select
          className={clsx(button(), text(), outline())}
          name="sortBy"
          onChange={(e) => {
            handleSelect(e.target.value);
          }}
          value={orderBy}
        >
          <option value={props.allowedValues[3]}>Popularidade</option>
          <option value={props.allowedValues[5]}>Custo</option>
          <option value={props.allowedValues[7]}>Lançamento</option>
          <option value={props.allowedValues[13]}>Votos</option>
          <option value={props.allowedValues[11]}>Pontuação</option>
        </select>
      </label>
    </div>
  );
}
