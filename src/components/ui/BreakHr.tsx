type BreakHrProps = { color?: string };

export default function BreakHr({
  color = "border-nightDew-600/10",
}: BreakHrProps) {
  return (
    <hr
      className={`border-[1px] border-solid ${color} mx-[--p] rounded-lg xs:mx-[--pXS] lg:mx-[--pLG]`}
    />
  );
}
