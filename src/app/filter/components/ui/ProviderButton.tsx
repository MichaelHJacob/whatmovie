"use client";

import { useTmdbConfigContext } from "@/components/providers/TmdbConfigProvider";
import { TypeBtnProvider } from "@/types/globalTypes";

type ProviderButtonProps = {
  provider: TypeBtnProvider;
  add: (picked: TypeBtnProvider) => void;
  remove: (picked: TypeBtnProvider) => void;
};

export default function ProviderButton({
  provider,
  add,
  remove,
}: Readonly<ProviderButtonProps>) {
  const baseUrl = useTmdbConfigContext();

  return (
    <label className="backBtn relative col-span-1 row-span-1 box-content block aspect-square overflow-hidden px-0">
      <input
        className="peer absolute appearance-none bg-transparent opacity-0"
        type="checkbox"
        value={provider.provider_id}
        checked={provider.state}
        onChange={() => (provider.state ? remove(provider) : add(provider))}
      />
      <img
        className="aspect-square w-full object-contain opacity-50 grayscale-[90%] transition-all duration-500 hover:grayscale-0 peer-checked:opacity-100 peer-checked:grayscale-0"
        src={baseUrl.logo.i50 + provider.logo_path}
        width={44}
        height={44}
        alt={provider.provider_name}
      />
    </label>
  );
}
