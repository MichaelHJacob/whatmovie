import { filterMenuBase } from "@/app/filter/components/FilterMenu/filterMenu.styles";
import ClearSelected from "@/app/filter/components/ui/ClearSelected";
import ProviderButton from "@/app/filter/components/ui/ProviderButton";
import { TypeBtnProvider } from "@/types/globalTypes";
import clsx from "clsx";
import { tv } from "tailwind-variants";

type ProviderSelectorProps = {
  providers: TypeBtnProvider[];
  add: (picked: TypeBtnProvider) => void;
  remove: (picked: TypeBtnProvider) => void;
  clear: () => void;
};

const providerSelectorStyles = tv({
  extend: filterMenuBase,
  slots: {
    innerField:
      "group -m-2 box-content grid auto-rows-[2.75rem] grid-cols-[repeat(auto-fit,_2.75rem)] justify-between rounded-2xl bg-neutral-subtle p-2 md:-m-3 md:p-3",
    blend:
      "group-hover:mix-blend-normal group-data-[active=default]:mix-blend-normal",
    opacity:
      "group-hover:opacity-70 group-data-[active=default]:opacity-100 group-data-[active=checked]:hover:opacity-100 group-data-[active=checked]:has-[:checked]:opacity-100",
    ring: "ring-1 ring-zinc-100 ring-offset-0 has-[:checked]:ring-zinc-800 group-hover:has-[:checked]:ring-8 dark:ring-zinc-800 dark:group-hover:has-[:checked]:ring-zinc-100",
  },
});

export default function ProviderSelector({
  providers,
  add,
  remove,
  clear,
}: Readonly<ProviderSelectorProps>) {
  const { field, title, topButton, innerField, outline, blend, opacity, ring } =
    providerSelectorStyles();

  console.log(providers.some((value) => value.state === true));
  return (
    <fieldset className={field()}>
      <legend className={title()}>Onde assistir:</legend>
      <div className={topButton()}>
        <ClearSelected onClear={clear} />
      </div>
      <ul
        data-active={
          providers.some((value) => value.state === true)
            ? "checked"
            : "default"
        }
        className={innerField()}
      >
        {providers.map((value) => (
          <li key={value.provider_id}>
            <ProviderButton
              style={clsx(outline(), blend(), opacity(), ring())}
              size="mid"
              provider={value}
              add={add}
              remove={remove}
            />
          </li>
        ))}
      </ul>
    </fieldset>
  );
}
