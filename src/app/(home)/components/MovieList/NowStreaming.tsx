import StructuredData from "@/components/StructuredData";
import Container from "@/components/layout/Container";
import MovieList from "@/components/layout/MovieList";
import HTitle from "@/components/ui/HTitle";
import { getNowStreaming } from "@/lib/api/tmdb/use-cases/getNowStreaming";
import { itemListJsonLd } from "@/lib/structured-data/itemListJsonLd";
import { orderByReleaseDate } from "@/lib/utils/orderByReleaseDate";
import { DiscoverMovieType } from "@/lib/validation/discoverMovieSchema";

export default async function NowStreaming() {
  const movieSet: Set<DiscoverMovieType> = new Set();

  const data = await Promise.allSettled(
    Array.from({ length: 3 }, (_, i) => {
      return getNowStreaming({ page: i + 1 });
    }),
  );

  data.forEach((result) => {
    if (result.status !== "fulfilled") return;
    const [data] = result.value;

    data?.results.forEach((movie) => {
      if (movie.popularity < 50) return;

      movieSet.add(movie);
    });
  });

  const movies = orderByReleaseDate(Array.from(movieSet));

  const jsonLd = itemListJsonLd(movies, "streaming", "Destaques Recentes");

  return (
    <Container as="section">
      <HTitle>Destaques Recentes</HTitle>
      <StructuredData data={jsonLd} />
      <MovieList model="list" data={movies} />
    </Container>
  );
}
