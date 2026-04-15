import StructuredData from "@/components/StructuredData";
import Container from "@/components/layout/Container";
import MovieList from "@/components/layout/MovieList";
import HTitle from "@/components/ui/HTitle";
import { getPopular } from "@/lib/api/tmdb/use-cases/getPopular";
import { itemListJsonLd } from "@/lib/structured-data/itemListJsonLd";

export default async function Popular() {
  const [popular] = await getPopular();

  if (!popular) return;

  return (
    <Container as="section" surface="listBase">
      <HTitle>Mais acessados</HTitle>
      <StructuredData
        data={itemListJsonLd(
          popular.results
            .filter((data) => data.vote_count >= 100)
            .sort((a, b) => b.popularity - a.popularity),
          "popular",
          "Mais acessados",
        )}
      />
      <MovieList
        data={popular.results
          .filter((data) => data.vote_count >= 100)
          .sort((a, b) => b.popularity - a.popularity)}
        model="list"
        surfaceColor="listBase"
      />
    </Container>
  );
}
