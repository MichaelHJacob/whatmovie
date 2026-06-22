import { ChangeEvent } from "react";

import CheckButton from "@/components/ui/CheckButton";
import { TypeBtnGenres } from "@/types/globalTypes";

type GenreButtonProps = {
  genre: TypeBtnGenres;
  add: (picked: TypeBtnGenres) => void;
  remove: (picked: TypeBtnGenres) => void;
  backBlur?: boolean;
  style?: string;
};

export default function GenreButton({
  genre,
  add,
  remove,
  backBlur = false,
  style,
}: Readonly<GenreButtonProps>) {
  function toggleCheckbox(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.checked) {
      add(genre);
    } else {
      remove(genre);
    }
  }

  return (
    <CheckButton
      labelText={genre.name}
      checked={genre.state}
      onToggleCheckbox={toggleCheckbox}
      name={`option${genre.id}`}
      blur={backBlur}
      textBtn
      theme="neutral"
      className={style}
    />
  );
}
