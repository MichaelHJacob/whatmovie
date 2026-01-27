import Container from "@/components/layout/Container";
import MovieSlider from "@/components/layout/MovieSlider";
import HTitle from "@/components/ui/HTitle";
import { getNowStreaming } from "@/lib/api/tmdb/use-cases/getNowStreaming";

export default async function NowStreaming() {
  const [data] = await getNowStreaming();

  if (!data) return null;

  return (
    <Container as="section">
      <HTitle>Lançamento dos Streamings</HTitle>
      <MovieSlider model="cards" data={data} paddingTop={false} />
    </Container>
  );
}
