import StructuredData from "@/components/StructuredData";
import Container from "@/components/layout/Container";
import MovieList from "@/components/layout/MovieList";
import HTitle from "@/components/ui/HTitle";
import { getNowPlaying } from "@/lib/api/tmdb/use-cases/getNowPlaying";
import { itemListJsonLd } from "@/lib/structured-data/itemListJsonLd";

export default async function NowPlaying() {
  const [inTheatres] = await getNowPlaying();

  if (!inTheatres) return;

  return (
    <Container as="section" surface="listBase">
      <HTitle>Principais títulos nos Cinemas</HTitle>
      <StructuredData
        data={itemListJsonLd(
          inTheatres.results,
          "theatres",
          "Principais títulos nos Cinemas",
        )}
      />
      <MovieList
        data={inTheatres.results}
        model="list"
        surfaceColor="listBase"
      />
    </Container>
  );
}
