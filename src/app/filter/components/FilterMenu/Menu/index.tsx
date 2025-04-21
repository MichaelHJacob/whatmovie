import RangeVoteSelector from "@/app/filter/components/FilterMenu/Menu/RangeVoteSelector";
import SortBySelector from "@/app/filter/components/FilterMenu/Menu/SortBySelector";
import BreakHr from "@/components/ui/BreakHr";

type MenuProps = { children: React.ReactNode };

export default function Menu({ children }: MenuProps) {
  return (
    <menu className="paddingHeader blockContainer-b flex list-none flex-col gap-[--gap] xs:gap-[--gapXS] md:gap-[--gapMD] lg:gap-[--gapLG]">
      <SortBySelector />
      <BreakHr color={"border-nightDew-300"} />
      <RangeVoteSelector />
      <BreakHr color={"border-nightDew-300"} />

      {children}
    </menu>
  );
}
