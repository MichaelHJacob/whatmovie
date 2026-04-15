import StructuredData from "@/components/StructuredData";
import Container from "@/components/layout/Container";
import MovieList from "@/components/layout/MovieList";
import HTitle from "@/components/ui/HTitle";
import { getNowPlaying } from "@/lib/api/tmdb/use-cases/getNowPlaying";
import { itemListJsonLd } from "@/lib/structured-data/itemListJsonLd";

export default async function NowPlaying() {
  const [inTheatres] = await getNowPlaying();

  const movies = inTheatres?.results.filter((data) => data.popularity >= 5);

  if (!movies) return;

  const jsonLd = itemListJsonLd(movies, "streaming", "Apenas nos Cinemas");

  return (
    <Container as="section" surface="listBase">
      <HTitle>Apenas nos Cinemas</HTitle>
      <StructuredData data={jsonLd} />
      <MovieList model="list" data={movies} surfaceColor="listBase" />
    </Container>
  );
}
