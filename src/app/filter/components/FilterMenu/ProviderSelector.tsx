import ClearSelected from "@/app/filter/components/ui/ClearSelected";
import ProviderButton from "@/app/filter/components/ui/ProviderButton";
import { TypeBtnProvider } from "@/types/globalTypes";

type ProviderSelectorProps = {
  providers: TypeBtnProvider[];
  add: (picked: TypeBtnProvider) => void;
  remove: (picked: TypeBtnProvider) => void;
  clear: (filter?: string) => void;
};

export default function ProviderSelector({
  providers,
  add,
  remove,
  clear,
}: ProviderSelectorProps) {
  return (
    <li>
      <fieldset>
        <legend className="blockContainer-x flex w-full items-center justify-between pb-[--gap] xs:pb-[--gapXS] md:pb-[--gapMD] lg:pb-[--gapLG]">
          <span className="filter-label">Onde assistir:</span>
          <ClearSelected onClear={() => clear("p")} />
        </legend>

        <ul className="justify-left blockContainer-x flex h-auto w-full select-none flex-wrap gap-2 rounded-lg">
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
