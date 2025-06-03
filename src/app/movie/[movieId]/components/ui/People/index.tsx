import ListPeople from "@/app/movie/[movieId]/components/ui/People/ListPeople";
import BreakHr from "@/components/ui/BreakHr";
import ListScrollController from "@/components/ui/ListScrollController";
import SubTitle from "@/components/ui/SubTitle";
import { CreditsType } from "@/lib/validation/creditsSchema";

export default function People({
  cast,
  crew,
}: Pick<CreditsType, "cast" | "crew">) {
  if (cast.length >= 1 || crew.length >= 1) {
    return (
      <>
        <BreakHr />
        <div>
          <SubTitle>Elenco e equipe</SubTitle>
          <ListScrollController
            id="ElencoEquipe"
            length={cast.length + crew.length}
          >
            <ListPeople cast={cast} crew={crew} id="ElencoEquipe" />
          </ListScrollController>
        </div>
      </>
    );
  }
}
