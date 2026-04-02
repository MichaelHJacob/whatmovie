import { movieJsonLd } from "@/lib/structured-data/movieJsonLd";
import { formatToIdSlug } from "@/lib/utils/formatToIdSlug";
import { getGenresByIds } from "@/lib/utils/getGenresByIds";
import { DiscoverMovieType } from "@/lib/validation/discoverMovieSchema";
import { Graph, ItemList } from "schema-dts";

export function itemListJsonLd(
  data: DiscoverMovieType[],
  id: string,
  listName: string,
): Graph {
  const listItemMap: ItemList["itemListElement"] = data.map((value, index) => {
    return {
      "@type": "ListItem",
      position: index + 1,
      item: {
        ...movieJsonLd(value),
        genre: getGenresByIds(value.genre_ids),
        url: `https://whatmovie.com.br/${formatToIdSlug(value.id, value.title)}`,
      },
    };
  });

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ItemList",
        name: listName,
        numberOfItems: data.length,
        "@id": `https://whatmovie.com.br/#${id}`,
        itemListElement: listItemMap,
      },
    ],
  };
}
