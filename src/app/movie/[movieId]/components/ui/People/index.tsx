import ListPeople from "@/app/movie/[movieId]/components/ui/People/ListPeople";
import Container from "@/components/layout/Container";
import ListScrollController from "@/components/layout/ListScrollController";
import BreakHr from "@/components/ui/BreakHr";
import HTitle from "@/components/ui/HTitle";
import { CreditsType } from "@/lib/validation/creditsSchema";

export default function People({
  cast,
  crew,
}: Readonly<Pick<CreditsType, "cast" | "crew">>) {
  if (cast.length >= 1 || crew.length >= 1) {
    return (
      <>
        <BreakHr />
        <Container as="section">
          <HTitle>Elenco e equipe</HTitle>
          <ListScrollController
            id="ElencoEquipe"
            length={cast.length + crew.length}
          >
            <ListPeople cast={cast} crew={crew} id="ElencoEquipe" />
          </ListScrollController>
        </Container>
      </>
    );
  }
}
