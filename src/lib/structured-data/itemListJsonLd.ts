import { movieJsonLd } from "@/lib/structured-data/movieJsonLd";
import { formatToIdSlug } from "@/lib/utils/formatToIdSlug";
import { getGenresByIds } from "@/lib/utils/getGenresByIds";
import { DiscoverSchemaType } from "@/lib/validation/discoverSchema";
import { Graph, ItemList } from "schema-dts";

export function itemListJsonLd(
  data: DiscoverSchemaType,
  id: string,
  listName: string,
): Graph {
  const listItemMap: ItemList["itemListElement"] = data.results.map(
    (value, index) => {
      return {
        "@type": "ListItem",
        position: index + 1,
        item: {
          ...movieJsonLd(value),
          genre: getGenresByIds(value.genre_ids),
          url: `https://whatmovie.com.br/${formatToIdSlug(value.id, value.title)}`,
        },
      };
    },
  );

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ItemList",
        name: listName,
        numberOfItems: data.results.length,
        "@id": `https://whatmovie.com.br/#${id}`,
        itemListElement: listItemMap,
      },
    ],
  };
}
