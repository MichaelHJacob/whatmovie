import StructuredData from "@/components/StructuredData";
import Container from "@/components/layout/Container";
import MovieSlider from "@/components/layout/MovieSlider";
import HTitle from "@/components/ui/HTitle";
import { getNowStreaming } from "@/lib/api/tmdb/use-cases/getNowStreaming";
import { itemListJsonLd } from "@/lib/structured-data/itemListJsonLd";

export default async function NowStreaming() {
  const [data] = await getNowStreaming();

  if (!data) return null;

  const jsonLd = itemListJsonLd(data, "streaming", "Lançamentos no Streaming");

  return (
    <Container as="section">
      <HTitle>Lançamentos no Streaming</HTitle>
      <StructuredData data={jsonLd} />
      <MovieSlider model="cards" data={data} paddingTop={false} />
    </Container>
  );
}
