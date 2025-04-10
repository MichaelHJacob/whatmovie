import ClearSelected from "@/app/filter/components/ui/ClearSelected";
import GenreButton from "@/app/filter/components/ui/GenreButton";
import { TypeBtnGenres } from "@/components/utils/types";

type GenreSelectorProps = {
  genres: TypeBtnGenres[];
  add: (picked: TypeBtnGenres) => void;
  remove: (picked: TypeBtnGenres) => void;
  clear: (filter?: string) => void;
};

export default function GenreSelector({
  genres,
  add,
  remove,
  clear,
}: GenreSelectorProps) {
  return (
    <li>
      <fieldset>
        <legend className="blockContainer-x flex w-full items-center justify-between pb-[--gap] xs:pb-[--gapXS] md:pb-[--gapMD] lg:pb-[--gapLG]">
          <span className="filter-label">Gênero:</span>
          <ClearSelected onClear={() => clear("g")} />
        </legend>

        <ul className="blockContainer-x flex h-auto select-none flex-wrap justify-start gap-2 transition duration-150 ease-out hover:ease-in">
          {genres.map((value) => (
            <li key={value.id}>
              <GenreButton genre={value} add={add} remove={remove} />
            </li>
          ))}
        </ul>
      </fieldset>
    </li>
  );
}
