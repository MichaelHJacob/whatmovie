import PeopleList from "@/app/(movie)/[slug]/components/layout/People/PeopleList";
import Container from "@/components/layout/Container";
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
          <PeopleList cast={cast} crew={crew} />
        </Container>
      </>
    );
  }
}
