"use client";

import { ChangeEvent } from "react";

import { useTmdbConfigContext } from "@/components/providers/TmdbConfigProvider";
import CheckButton from "@/components/ui/CheckButton";
import { TypeBtnProvider } from "@/types/globalTypes";
import clsx from "clsx";
import { tv } from "tailwind-variants";

type ProviderButtonProps = {
  provider: TypeBtnProvider;
  add: (picked: TypeBtnProvider) => void;
  remove: (picked: TypeBtnProvider) => void;
  style?: string;
  buttonSize?: boolean;
};

const providerButtonStyles = tv({
  slots: {
    base: "aspect-square bg-cover bg-center bg-no-repeat",
    blend: "mix-blend-luminosity has-[:checked]:mix-blend-normal",
    opacity: "opacity-30 has-[:checked]:opacity-100",
  },
});

export default function ProviderButton({
  provider,
  add,
  remove,
  style,
  buttonSize = false,
}: Readonly<ProviderButtonProps>) {
  const baseUrl = useTmdbConfigContext();

  const { base, blend, opacity } = providerButtonStyles();
  function toggleCheckbox(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.checked) {
      add(provider);
    } else {
      remove(provider);
    }
  }
  return (
    <CheckButton
      style={{
        backgroundImage: `url(${baseUrl.logo.i50 + provider.logo_path})`,
      }}
      name={`option${provider.provider_id}`}
      checked={provider.state}
      onToggleCheckbox={toggleCheckbox}
      labelText={provider.provider_name}
      className={clsx(base(), blend(), style, opacity())}
      title={provider.provider_name}
      size={buttonSize ? "default" : "mid"}
    />
  );
}
