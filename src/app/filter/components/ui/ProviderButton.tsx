import { TypeBtnProvider } from "@/components/utils/types";
import config from "@/components/utils/config";

type ProviderButtonProps = { provider: TypeBtnProvider;
  add: (picked: TypeBtnProvider) => void;
  remove: (picked: TypeBtnProvider) => void;
 };

export default function ProviderButton({ provider,
  add,
  remove, } : ProviderButtonProps ){
  return (
    <label className="box-content relative backBtn bg-opacity-30  px-0 overflow-hidden block aspect-square">
      <input
        className="  bg-transparent  appearance-none absolute opacity-0 peer"
        type="checkbox"
        value={provider.provider_id}
        checked={provider.state}
        onChange={() => (provider.state ? remove(provider) : add(provider))}
      />
      <img
        className="   w-full object-contain aspect-square opacity-50 grayscale-[90%] hover:grayscale-0 peer-checked:grayscale-0 peer-checked:opacity-100 transition-all duration-500"
        src={`${config.imgUrlS}/${provider.logo_path}`}
        width={44}
        height={44}
        alt={provider.provider_name}
      />
    </label>
  );
}