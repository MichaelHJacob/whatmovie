import ListController from "@/components/layout/ListController";
import ContentSlider from "@/components/layout/MovieList/Components/ContentSlider";
import ListContainer, {
  ListContainerVariants,
} from "@/components/layout/MovieList/Components/ListContainer";
import ListItem, {
  ListItemVariants,
} from "@/components/layout/MovieList/Components/ListItem";
import { FoggyEdgeVariants } from "@/components/ui/FoggyEdge";
import MovieCard from "@/components/ui/MovieCard";
import { DiscoverMovieType } from "@/lib/validation/discoverMovieSchema";

type MovieListProps = {
  data: ({ recommended?: number } & DiscoverMovieType)[];
  surfaceColor?: FoggyEdgeVariants["surfaceColor"];
} & ListContainerVariants &
  ListItemVariants;

export default function MovieList({
  data,
  model = "cards",
  paddingTop,
  surfaceColor = "body",
}: Readonly<MovieListProps>) {
  const validData =
    model === "cards" || model === "banner"
      ? data.filter((d) => d.backdrop_path)
      : data;

  return (
    <ListController
      data={validData}
      model={model}
      options={validData.map((value, i) => {
        return { id: value.id, index: i };
      })}
      ids={validData.map((value) => value.id)}
      surfaceColor={surfaceColor}
    >
      <ListContainer model={model}>
        {validData.map((data) => {
          return (
            <ListItem
              key={data.id}
              id={data.id}
              model={model}
              paddingTop={paddingTop}
            >
              {model === "list" && <MovieCard data={data} />}
              {(model === "cards" || model === "banner") && (
                <ContentSlider key={data.id} data={data} model={model} />
              )}
            </ListItem>
          );
        })}
      </ListContainer>
    </ListController>
  );
}
