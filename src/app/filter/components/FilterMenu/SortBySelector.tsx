import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SortBySelector() {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams);

  function handleSelect(selected: string) {
    params.set("sort", selected);
    params.set("page", "1");
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
          defaultValue={searchParams.get("sort")?.toString()}
        >
          <option value="popularity">Popularidade</option>
          <option value="revenue">Custo</option>
          <option value="release_date">Lançamento</option>
          <option value="vote_average">Votos</option>
        </select>
      </label>
    </li>
  );
}
