import { memo } from "react";

import Link from "next/link";

import { navbarBase } from "@/components/layout/NavBar/navbar.styles";
import { POSTER } from "@/config/imageConfig";
import { useAutoScrollRef } from "@/hooks/useAutoScrollRef";
import getFormattedDate from "@/lib/utils/getFormattedDate";
import getFormattedGenres from "@/lib/utils/getFormattedGenres";
import { DiscoverSchemaType } from "@/lib/validation/discoverSchema";
import { selectionItemBase } from "@/styles/selection.styles";
import { selectOption } from "@/types/globalTypes";
import clsx from "clsx";
import { tv } from "tailwind-variants";

const shortCardStyles = tv({
  extend: selectionItemBase,
  slots: {
    li: "group/list row-span-1",
    link: "all-gap",
    img: "aspect-[2/3]",
    text: [navbarBase().btnText(), "line-clamp-1"],
  },
});

type ShortCardProps = {
  data: DiscoverSchemaType["results"][0];
  cache: boolean;
  selected: boolean;
  onToggleSelect: (option: selectOption) => void;
  index: number;
};

const ShortCard = memo(function ShortCard({
  data,
  cache,
  selected,
  onToggleSelect,
  index,
}: Readonly<ShortCardProps>) {
  const { li, link, contentBox, img, textBox, text } = shortCardStyles();
  const setItemRef = useAutoScrollRef(data.id, selected);
  if (selected) {
    console.log("data: ", data, "cache", cache, "selected", selected);
  }

  return (
    <li
      ref={setItemRef}
      role="option"
      id={data.id}
      aria-selected={selected}
      className={li()}
    >
      <Link
        href={`/movie/${data.id}`}
        className={clsx(link(), contentBox())}
        prefetch={cache}
        onClick={() => {
          onToggleSelect({ id: data.id, index });
        }}
      >
        {data.poster_path ? (
          <img
            srcSet={`${POSTER.w92 + data.poster_path} 1x, ${POSTER.w185 + data.poster_path} 2x`}
            src={POSTER.w92 + data.poster_path}
            alt={`Poster de ${data.title}`}
            className={img()}
          />
        ) : (
          <div className={img({ class: "unavailable" })} />
        )}
        <div className={textBox()}>
          <strong className={text({ class: "font-bold" })}>{data.title}</strong>
          {data.release_date && (
            <small className={text()}>
              {getFormattedDate(data.release_date, "short")}
            </small>
          )}
          <small className={text()}>{getFormattedGenres(data.genre_ids)}</small>
        </div>
      </Link>
    </li>
  );
});

export default ShortCard;
