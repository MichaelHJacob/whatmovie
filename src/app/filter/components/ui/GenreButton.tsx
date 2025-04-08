import { TypeBtnGenres } from "@/components/utils/types";
import { ChangeEvent } from "react";

type GenreButtonProps = { genre: TypeBtnGenres;
  add: (picked: TypeBtnGenres) => void;
  remove: (picked: TypeBtnGenres) => void;
 };

export default function GenreButton({ genre,
  add,
  remove, } : GenreButtonProps ){

  function handleCheckbox(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.checked) {
      add(genre)
    } else {
      remove(genre)
    }
  }

  return (
    <label
      htmlFor={`option${genre.id}`}
      className={`backBtn backdrop-blur-xl w-auto has-[:checked]:bg-selector-100 `}
    >
      <input
        id={`option${genre.id}`}
        type="checkbox"
        value={genre.name}
        checked={genre.state}
        onChange={handleCheckbox}
        name={`option${genre.id}`}
        className="peer bg-transparent absolute appearance-none opacity-0 "
      />

      <span className="textBtn peer-checked:text-nightDew-100 text-nightDew-500 ">
        {genre.name}
      </span>
    </label>
  );
}