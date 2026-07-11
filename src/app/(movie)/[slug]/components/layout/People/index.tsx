import { Suspense } from "react";

import PeopleFullList from "@/app/(movie)/[slug]/components/layout/People/PeopleFullList";
import PeopleList from "@/app/(movie)/[slug]/components/layout/People/PeopleList";
import Container from "@/components/layout/Container";
import TmdbConfigProvider from "@/components/providers/TmdbConfigProvider";
import BreakHr from "@/components/ui/BreakHr";
import HTitle from "@/components/ui/HTitle";
import { imgBaseUrl } from "@/lib/utils/getImageBaseUrl";
import { CreditsType } from "@/lib/validation/creditsSchema";

export default function People({
  cast,
  crew,
}: Readonly<Pick<CreditsType, "cast" | "crew">>) {
  const shortCast = cast.slice(0, 8);
  const shortCrew = crew.slice(0, 8);

  if (cast.length >= 1 || crew.length >= 1) {
    return (
      <>
        <BreakHr />
        <Container as="section" innerStyles="relative">
          <HTitle>Elenco e equipe</HTitle>
          <TmdbConfigProvider config={imgBaseUrl}>
            <PeopleList cast={shortCast} crew={shortCrew} />
            <Suspense>
              <PeopleFullList cast={cast} crew={crew} />
            </Suspense>
          </TmdbConfigProvider>
        </Container>
      </>
    );
  }
}
