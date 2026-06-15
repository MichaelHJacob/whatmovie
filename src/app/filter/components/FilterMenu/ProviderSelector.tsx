import { filterMenuBase } from "@/app/filter/components/FilterMenu/filterMenu.styles";
import ClearSelected from "@/app/filter/components/ui/ClearSelected";
import ProviderButton from "@/app/filter/components/ui/ProviderButton";
import { TypeBtnProvider } from "@/types/globalTypes";
import clsx from "clsx";

type ProviderSelectorProps = {
  providers: TypeBtnProvider[];
  add: (picked: TypeBtnProvider) => void;
  remove: (picked: TypeBtnProvider) => void;
  clear: () => void;
};

export default function ProviderSelector({
  providers,
  add,
  remove,
  clear,
}: Readonly<ProviderSelectorProps>) {
  const { field, title, topButton, innerField } = filterMenuBase();
  return (
    <fieldset className={field()}>
      <legend className={title()}>Onde assistir:</legend>
      <div className={topButton()}>
        <ClearSelected onClear={clear} />
      </div>
      <ul
        className={clsx(
          innerField(),
          "grid grid-cols-[repeat(auto-fit,_2rem)] justify-between max-sm:grid-cols-[repeat(auto-fit,_2.25rem)]",
        )}
      >
        {providers.map((value) => (
          <li key={value.provider_id}>
            <ProviderButton provider={value} add={add} remove={remove} />
          </li>
        ))}
      </ul>
    </fieldset>
  );
}
