import { ChangeEvent } from "react";

import { TypeBtnGenres } from "@/types/globalTypes";

type GenreButtonProps = {
  genre: TypeBtnGenres;
  add: (picked: TypeBtnGenres) => void;
  remove: (picked: TypeBtnGenres) => void;
};

export default function GenreButton({
  genre,
  add,
  remove,
}: Readonly<GenreButtonProps>) {
  function handleCheckbox(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.checked) {
      add(genre);
    } else {
      remove(genre);
    }
  }

  return (
    <label className="backBtn has-[:checked]:bg-neutral-accent">
      <input
        type="checkbox"
        value={genre.name}
        checked={genre.state}
        onChange={handleCheckbox}
        name={`option${genre.id}`}
        className="peer absolute appearance-none bg-transparent opacity-0"
      />
      <span className="textBtn text-neutral-strong hover:text-neutral-strong-hover peer-checked:text-inverted-accent">
        {genre.name}
      </span>
    </label>
  );
}
