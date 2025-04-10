type MovieCardsProps = {
  id: string;
  size?: number;
  base?: number;
  xs?: number;
  md?: number;
  lg?: number;
  xl?: number;
  style?: string;
};

export default function MovieCards({
  id,
  size = 6,
  base = 2,
  xs = 3,
  md = 4,
  lg = 5,
  xl = 6,
  style,
}: MovieCardsProps) {
  const skeleton = [];

  for (let i = 0; i < size; i++) {
    skeleton.push(
      <li
        key={i}
        id={id + i}
        className={`gridColSpanMovie ${style} ${size <= 6 && i >= base && "max-xs:hidden"} ${size <= 6 && i >= xs && "xs:max-md:hidden"} ${size <= 6 && i >= md && "md:max-lg:hidden"} ${size <= 6 && i >= lg && "lg:max-xl:hidden"} ${size <= 6 && i >= xl && "xl:max-2xl:hidden"}`}
      >
        <div className="unavailable mid-shadow aspect-[2/3] w-full animate-pulse rounded-lg" />
      </li>,
    );
  }

  return skeleton;
}
