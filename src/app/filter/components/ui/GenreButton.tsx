import { ChangeEvent } from "react";

import { TypeBtnGenres } from "@/components/utils/types";

type GenreButtonProps = {
  genre: TypeBtnGenres;
  add: (picked: TypeBtnGenres) => void;
  remove: (picked: TypeBtnGenres) => void;
};

export default function GenreButton({ genre, add, remove }: GenreButtonProps) {
  function handleCheckbox(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.checked) {
      add(genre);
    } else {
      remove(genre);
    }
  }

  return (
    <label
      className={`backBtn w-auto backdrop-blur-xl has-[:checked]:bg-selector-100`}
    >
      <input
        type="checkbox"
        value={genre.name}
        checked={genre.state}
        onChange={handleCheckbox}
        name={`option${genre.id}`}
        className="peer absolute appearance-none bg-transparent opacity-0"
      />

      <span className="textBtn text-nightDew-500 peer-checked:text-nightDew-100">
        {genre.name}
      </span>
    </label>
  );
}
