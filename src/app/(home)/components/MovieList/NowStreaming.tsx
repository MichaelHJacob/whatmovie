import StructuredData from "@/components/StructuredData";
import Container from "@/components/layout/Container";
import MovieList from "@/components/layout/MovieList";
import HTitle from "@/components/ui/HTitle";
import { getNowStreaming } from "@/lib/api/tmdb/use-cases/getNowStreaming";
import { itemListJsonLd } from "@/lib/structured-data/itemListJsonLd";

export default async function NowStreaming() {
  const [data] = await getNowStreaming();

  if (!data) return null;

  const jsonLd = itemListJsonLd(
    data.results,
    "streaming",
    "Lançamentos no Streaming",
  );

  return (
    <Container as="section">
      <HTitle>Lançamentos no Streaming</HTitle>
      <StructuredData data={jsonLd} />
      <MovieList model="cards" data={data.results} paddingTop={false} />
    </Container>
  );
}
