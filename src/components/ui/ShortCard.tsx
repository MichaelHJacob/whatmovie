import { memo } from "react";

import Link from "next/link";

import { useTmdbConfigContext } from "@/components/providers/TmdbConfigProvider";
import { buttonStyles } from "@/components/ui/Button";
import { useAutoScrollRef } from "@/hooks/useAutoScrollRef";
import { formatGenres } from "@/lib/utils/formatGenres";
import { formatToIdSlug } from "@/lib/utils/formatToIdSlug";
import { formatToLocaleDate } from "@/lib/utils/formatToLocaleDate";
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
    text: [
      buttonStyles({ textBtn: true, theme: "neutral-subtle" }).text(),
      "line-clamp-1 text-ellipsis whitespace-normal",
    ],
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
  const baseUrl = useTmdbConfigContext();

  return (
    <li
      ref={setItemRef}
      role="option"
      id={data.id}
      aria-selected={selected}
      className={li()}
    >
      <Link
        href={`/${formatToIdSlug(data.id, data.title)}`}
        className={clsx(link(), contentBox())}
        prefetch={cache}
        onClick={() => {
          onToggleSelect({ id: data.id, index });
        }}
      >
        {data.poster_path ? (
          <img
            srcSet={`${baseUrl.poster.p100 + data.poster_path} 1x, ${baseUrl.poster.p200 + data.poster_path} 2x`}
            src={baseUrl.poster.p100 + data.poster_path}
            alt={`Poster de ${data.title}`}
            loading="lazy"
            fetchPriority="low"
            className={img()}
          />
        ) : (
          <div className={img({ class: "bg-gradient-default" })} />
        )}
        <div className={textBox()}>
          <strong className={text({ class: "font-bold" })}>{data.title}</strong>
          {data.release_date && (
            <small className={text()}>
              {formatToLocaleDate(data.release_date, "short")}
            </small>
          )}
          <small className={text()}>{formatGenres(data.genre_ids)}</small>
        </div>
      </Link>
    </li>
  );
});

export default ShortCard;
