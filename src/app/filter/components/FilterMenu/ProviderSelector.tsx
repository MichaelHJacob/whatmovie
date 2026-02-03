import ClearSelected from "@/app/filter/components/ui/ClearSelected";
import ProviderButton from "@/app/filter/components/ui/ProviderButton";
import { TypeBtnProvider } from "@/types/globalTypes";

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
  return (
    <li>
      <fieldset>
        <legend className="blockContainer-px flex w-full items-center justify-between pb-[--gap] xs:pb-[--gapXS] md:pb-[--gapMD] lg:pb-[--gapLG]">
          <span className="filter-label">Onde assistir:</span>
          <ClearSelected onClear={clear} />
        </legend>

        <ul className="blockContainer-px grid h-auto w-full select-none grid-cols-[repeat(auto-fit,_2rem)] justify-between gap-2 max-sm:grid-cols-[repeat(auto-fit,_2.25rem)]">
          {providers.map((value) => (
            <li key={value.provider_id}>
              <ProviderButton provider={value} add={add} remove={remove} />
            </li>
          ))}
        </ul>
      </fieldset>
    </li>
  );
}
