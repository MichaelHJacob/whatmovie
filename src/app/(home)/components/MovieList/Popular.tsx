import StructuredData from "@/components/StructuredData";
import Container from "@/components/layout/Container";
import MovieList from "@/components/layout/MovieList";
import HTitle from "@/components/ui/HTitle";
import { getPopular } from "@/lib/api/tmdb/use-cases/getPopular";
import { itemListJsonLd } from "@/lib/structured-data/itemListJsonLd";

export default async function Popular() {
  const [data] = await getPopular();

  if (!data) return;

  const movies = data.results.sort((a, b) => b.vote_average - a.vote_average);

  const jsonLd = itemListJsonLd(movies, "streaming", "Sucessos de Público");

  return (
    <Container as="section">
      <HTitle>Sucessos de Público</HTitle>
      <StructuredData data={jsonLd} />
      <MovieList model="list" data={movies} />
    </Container>
  );
}
