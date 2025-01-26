import { Bold, ChartNoAxesGantt, Italic, Underline } from "lucide-react";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";

const Navbar = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between bg-sidebar-background p-4",
        className,
      )}
    >
      <ToggleGroup type="single">
        <ToggleGroupItem
          value="overview"
          aria-label="Toggle Overview"
          className="flex h-8 items-center gap-1"
        >
          <ChartNoAxesGantt />
          Overview
        </ToggleGroupItem>
        <ToggleGroupItem value="exam" aria-label="Toggle Exam" className="h-8">
          Exam
        </ToggleGroupItem>
        <ToggleGroupItem
          value="chart"
          aria-label="Toggle Chart"
          className="h-8"
        >
          Chart
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};

export default Navbar;
