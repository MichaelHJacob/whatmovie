import ImageProfile from "@/app/(movie)/[slug]/components/layout/People/PeopleList/ImageProfile";
import ListController from "@/components/layout/ListController";
import ImageProfileUnavailable from "@/components/skeleton/ImageProfileUnavailable";
import { CreditsType } from "@/lib/validation/creditsSchema";
import { selectOption } from "@/types/globalTypes";
import { tv } from "tailwind-variants";

const PeopleListStyles = tv({
  slots: {
    ul: "listSpacing no-scrollbar list-none rounded-2xl lg:auto-cols-[calc((100%-20*var(--gapLG))/21)]",
    li: "gridColSpanPeople",
    textContainer: "mt-2 h-fit w-full text-center",
    label: "label line-clamp-2",
    data: "data line-clamp-2",
  },
});

type PeopleListProps = Pick<CreditsType, "cast" | "crew">;

export default function PeopleList({ cast, crew }: Readonly<PeopleListProps>) {
  const { ul, li, textContainer, label, data } = PeopleListStyles();

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
      <ul data-scroll-container className={ul()}>
        {cast.length >= 1 &&
          cast.map((value) => (
            <li
              data-item-id={value.cast_id}
              key={value.cast_id}
              className={li()}
            >
              {typeof value.profile_path == "string" ? (
                <ImageProfile path={value.profile_path} alt={value.name} />
              ) : (
                <ImageProfileUnavailable alt={value.name} />
              )}

              <div className={textContainer()}>
                <p className={label()}>{value.name}</p>
                <p className={data()}>{value.character}</p>
              </div>
            </li>
          ))}

        {crew.length >= 1 &&
          crew.map((value) => (
            <li
              data-item-id={value.credit_id}
              key={value.credit_id}
              className={li()}
            >
              {typeof value.profile_path == "string" ? (
                <ImageProfile path={value.profile_path} alt={value.name} />
              ) : (
                <ImageProfileUnavailable alt={value.name} />
              )}
              <div className={textContainer()}>
                <p className={label()}>{value.name}</p>
                <p className={data()}>{value.job}</p>
              </div>
            </li>
          ))}
      </ul>
    </ListController>
  );
}
