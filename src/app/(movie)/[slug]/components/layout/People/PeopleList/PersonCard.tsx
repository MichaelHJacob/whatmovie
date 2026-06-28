import ImageProfile from "@/app/(movie)/[slug]/components/layout/People/PeopleList/ImageProfile";
import ImageProfileUnavailable from "@/components/skeleton/ImageProfileUnavailable";
import { CreditsType } from "@/lib/validation/creditsSchema";
import { VariantProps, tv } from "tailwind-variants";

const personCardStyles = tv({
  slots: {
    li: "",
    textContainer: "h-fit",
    label: "label line-clamp-2",
    data: "data line-clamp-2",
  },
  variants: {
    mode: {
      list: {
        li: "flex h-24 items-center gap-2 rounded-2xl px-4 py-2 even:bg-base-ghost",
        textContainer: "max-w-fit text-left",
      },
      icon: {
        li: "gridColSpanPeople",
        textContainer: "mt-2 w-full text-center",
      },
    },
  },
  defaultVariants: {
    mode: "icon",
  },
});

type cast = { kind: "cast" } & CreditsType["cast"][number];
type crew = { kind: "crew" } & CreditsType["crew"][number];

type PersonCardProps = VariantProps<typeof personCardStyles> & (cast | crew);

export default function PersonCard(props: PersonCardProps) {
  const { li, textContainer, label, data } = personCardStyles({
    mode: props.mode,
  });

  return (
    <li
      data-item-id={props.kind === "cast" ? props.cast_id : props.credit_id}
      className={li()}
    >
      {typeof props.profile_path == "string" ? (
        <ImageProfile
          mode={props.mode}
          path={props.profile_path}
          alt={props.name}
        />
      ) : (
        <ImageProfileUnavailable mode={props.mode} alt={props.name} />
      )}

      <div className={textContainer()}>
        <p className={label()}>{props.name}</p>
        <p className={data()}>
          {props.kind === "cast" ? props.character : props.job}
        </p>
      </div>
    </li>
  );
}
