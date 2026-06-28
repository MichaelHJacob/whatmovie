import PersonCard from "@/app/(movie)/[slug]/components/layout/People/PeopleList/PersonCard";
import ListController from "@/components/layout/ListController";
import { CreditsType } from "@/lib/validation/creditsSchema";
import { selectOption } from "@/types/globalTypes";

type PeopleListProps = Pick<CreditsType, "cast" | "crew">;

export default function PeopleList({ cast, crew }: Readonly<PeopleListProps>) {
  const castIds = cast.map((value) => String(value.cast_id));
  const crewIds = crew.map((value) => value.credit_id);
  const options: NonNullable<selectOption>[] = castIds
    .concat(crewIds)
    .map((value, index) => {
      return { id: value, index: index };
    });

  return (
    <ListController
      model="list"
      options={options}
      ids={castIds.concat(crewIds)}
    >
      <ul data-scroll-container className="listSpacing no-scrollbar list-none">
        {cast.length >= 1 &&
          cast.map((value) => (
            <PersonCard key={value.cast_id} kind="cast" {...value} />
          ))}

        {crew.length >= 1 &&
          crew.map((value) => (
            <PersonCard key={value.credit_id} kind="crew" {...value} />
          ))}
      </ul>
    </ListController>
  );
}
