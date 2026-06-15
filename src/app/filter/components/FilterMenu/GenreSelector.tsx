import { filterMenuBase } from "@/app/filter/components/FilterMenu/filterMenu.styles";
import ClearSelected from "@/app/filter/components/ui/ClearSelected";
import GenreButton from "@/app/filter/components/ui/GenreButton";
import { TypeBtnGenres } from "@/types/globalTypes";
import clsx from "clsx";

type GenreSelectorProps = {
  genres: TypeBtnGenres[];
  add: (picked: TypeBtnGenres) => void;
  remove: (picked: TypeBtnGenres) => void;
  clear: () => void;
};

export default function GenreSelector({
  genres,
  add,
  remove,
  clear,
}: Readonly<GenreSelectorProps>) {
  const { field, title, topButton, innerField } = filterMenuBase();

  return (
    <fieldset className={field()}>
      <legend className={title()}>Gênero:</legend>
      <div className={topButton()}>
        <ClearSelected onClear={clear} />
      </div>

      <ul className={clsx(innerField(), "flex flex-wrap justify-start")}>
        {genres.map((value) => (
          <li key={value.id}>
            <GenreButton genre={value} add={add} remove={remove} />
          </li>
        ))}
      </ul>
    </fieldset>
  );
}
