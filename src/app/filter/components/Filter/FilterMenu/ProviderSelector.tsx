import { TypeBtnProvider } from "@/components/utils/types";
import ClearSelected from "@/app/filter/components/ui/ClearSelected";
import ProviderButton from "@/app/filter/components/ui/ProviderButton";

type ProviderSelectorProps = { providers: TypeBtnProvider[];
  add: (picked: TypeBtnProvider) => void;
  remove: (picked: TypeBtnProvider) => void;
  clear: (filter?: string) => void;
 };

export default function ProviderSelector({ providers, add, remove, clear } : ProviderSelectorProps ){
  return (
    <li>
      <fieldset>
        <legend className="flex w-full justify-between items-center blockContainer-x pb-[--gap] xs:pb-[--gapXS] md:pb-[--gapMD] lg:pb-[--gapLG]">
          <span className="filter-label">Onde assistir:</span>
          <ClearSelected onClear={() => clear("p")} />
        </legend>

        <ul className="h-auto w-full rounded-lg flex flex-wrap justify-left gap-2 select-none blockContainer-x  ">
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