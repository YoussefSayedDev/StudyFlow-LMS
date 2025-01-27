"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import { ChartNoAxesGantt } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const Navbar = ({ className }: { className?: string }) => {
  const [currentPage, setCurrentPage] = useState("overview");

  const handleToggle = (value: string | null) => {
    if (value) setCurrentPage(value); // Update current page
  };

  return (
    <div
      className={cn(
        "flex items-center justify-between bg-sidebar-background p-4",
        className,
      )}
    >
      <ToggleGroup
        type="single"
        value={currentPage}
        onValueChange={handleToggle}
        className="flex gap-2"
      >
        <ToggleGroupItem
          value="overview"
          aria-label="Toggle Overview"
          className="flex h-8 items-center gap-1 rounded-md px-2"
        >
          <Link href="/dashboard/overview" className="flex items-center gap-1">
            <ChartNoAxesGantt className="h-4 w-4" />
            Overview
          </Link>
        </ToggleGroupItem>
        <ToggleGroupItem
          value="exam"
          aria-label="Toggle Exam"
          className="h-8 rounded-md px-2"
        >
          Exam
        </ToggleGroupItem>
        <ToggleGroupItem
          value="chart"
          aria-label="Toggle Chart"
          className="h-8 rounded-md px-2"
        >
          Chart
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};

export default Navbar;
