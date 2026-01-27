import RangeVoteSelector from "@/app/filter/components/FilterMenu/Menu/RangeVoteSelector";
import SortBySelector from "@/app/filter/components/FilterMenu/Menu/SortBySelector";
import BreakHr from "@/components/ui/BreakHr";
import { filtersMap } from "@/data/filtersMap";

type MenuProps = { children: React.ReactNode };

export default function Menu({ children }: Readonly<MenuProps>) {
  return (
    <menu className="paddingHeader blockContainer-pb flex list-none flex-col gap-[--gap] xs:gap-[--gapXS] md:gap-[--gapMD] lg:gap-[--gapLG]">
      <SortBySelector {...filtersMap.sortBy} />
      <BreakHr />
      <RangeVoteSelector {...filtersMap.voteAverage} />
      <BreakHr />
      {children}
    </menu>
  );
}
