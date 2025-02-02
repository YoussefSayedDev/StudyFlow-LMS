"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useNavigation } from "@/hooks/useNavigation";
import { cn } from "@/lib/utils";
import { ChartNoAxesGantt } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { buttonVariants } from "./ui/button";

const Navbar = ({ className }: { className?: string }) => {
  const { buildUrl, currentPage, currentSubPage, isActive, subPages } =
    useNavigation();
  console.log({
    buildUrl,
    currentPage,
    currentSubPage,
    isActive,
    subPages,
  });

  // const [currentPage, setCurrentPage] = useState("overview");

  // const handleToggle = (value: string | null) => {
  //   if (value) setCurrentPage(value); // Update current page
  // };

  return (
    <div
      className={cn(
        "flex items-center justify-between bg-sidebar-background p-4",
        className,
      )}
    >
      {currentPage && (
        <div className="flex items-center gap-2">
          {subPages.map((subPage) => (
            <Link
              key={subPage.label}
              href={buildUrl(currentPage.path, subPage.path)}
              className={cn(
                buttonVariants({
                  variant: "secondary",
                  className: cn(
                    "h-8 hover:bg-primary hover:text-primary-foreground",
                    isActive(currentPage.path, subPage.path)
                      ? "bg-primary text-primary-foreground"
                      : "",
                  ),
                }),
              )}
            >
              {subPage.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Navbar;

{
  /* <ToggleGroup
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
      </ToggleGroup> */
}
