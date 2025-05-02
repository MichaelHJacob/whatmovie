import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { filtersMapTypes } from "@/types/filtersTypes";

type SortBySelectorProps = { props: filtersMapTypes["sortBy"] };

export default function SortBySelector({ props }: SortBySelectorProps) {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams);

  function handleSelect(selected: string) {
    params.set(props.keys, selected);
    replace(`${pathname}?${params.toString()}`);
  }
  return (
    <li>
      <label className="blockContainer-x flex min-h-11 w-full items-center justify-between rounded-lg">
        <span className="filter-label">Ordenar por:</span>
        <select
          className="backBtn textBtn"
          name="sortBy"
          onChange={(e) => {
            handleSelect(e.target.value);
          }}
          defaultValue={searchParams.get(props.keys)?.toString()}
        >
          <option value={props.allowedValues[3]}>Popularidade</option>
          <option value={props.allowedValues[5]}>Custo</option>
          <option value={props.allowedValues[7]}>Lançamento</option>
          <option value={props.allowedValues[13]}>Votos</option>
          <option value={props.allowedValues[11]}>Pontuação</option>
        </select>
      </label>
    </li>
  );
}
