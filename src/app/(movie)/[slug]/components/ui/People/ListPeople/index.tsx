import ImageProfile from "@/app/(movie)/[slug]/components/ui/People/ListPeople/ImageProfile";
import ImageProfileUnavailable from "@/components/skeleton/ImageProfileUnavailable";
import { CreditsType } from "@/lib/validation/creditsSchema";
import { tv } from "tailwind-variants";

const listPeopleStyles = tv({
  slots: {
    ul: "listSpacing no-scrollbar list-none rounded-2xl lg:auto-cols-[calc((100%-20*var(--gapLG))/21)]",
    li: "gridColSpanPeople",
    textContainer: "mt-2 h-fit w-full text-center",
    label: "label line-clamp-2",
    data: "data line-clamp-2",
  },
});

type ListPeopleProps = { id: string } & Pick<CreditsType, "cast" | "crew">;

export default function ListPeople({
  cast,
  crew,
  id,
}: Readonly<ListPeopleProps>) {
  const { ul, li, textContainer, label, data } = listPeopleStyles();

  return (
    <ul id={id} className={ul()}>
      {cast.length >= 1 &&
        cast.map((value, index) => (
          <li id={id + String(index)} key={value.cast_id} className={li()}>
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
        crew.map((value, index) => (
          <li
            id={id + String(index + cast.length)}
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
  );
}
