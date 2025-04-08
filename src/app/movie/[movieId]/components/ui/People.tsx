import BreakHr from "@/components/ui/BreakHr";
import ListPeople from "@/components/ui/ListPeople";
import ListScrollController from "@/components/ui/ListScrollController";
import SubTitle from "@/components/ui/SubTitle";
import { PropsPeople } from "@/components/utils/types";

export default function People({ cast = [], crew = [] } : PropsPeople ) {

  if ((cast.length >= 1) || (crew.length >= 1)) {
    return (
      <>
        <BreakHr />
        <div>
          <SubTitle>Elenco e equipe</SubTitle>
          <ListScrollController id="ElencoEquipe" length={cast.length + crew.length}>
            <ListPeople cast={cast} crew={crew} id="ElencoEquipe" />
          </ListScrollController>
        </div>
      </>
    );
  }
}