"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
// import { useNavigation } from "@/hooks/__tests__/useNavigation";
import { useNavigation } from "@/hooks/useNavigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";
import { buttonVariants } from "../ui/button";

const Navbar = ({ className }: { className?: string }) => {
  const [currentView, setCurrentView] = useState("board");

  const { buildUrl, currentPage, isActive, subPages } = useNavigation();

  const handleToggle = (value: string | null) => {
    if (value) setCurrentView(value);
  };

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
      <ToggleGroup
        type="single"
        value={currentView}
        onValueChange={handleToggle}
        className="flex gap-2"
      >
        <ToggleGroupItem
          value="board"
          aria-label="Board View"
          className="flex h-8 items-center gap-1 rounded-md px-2"
        >
          Board
        </ToggleGroupItem>
        <ToggleGroupItem
          value="table"
          aria-label="Table View"
          className="h-8 rounded-md px-2"
        >
          Table
        </ToggleGroupItem>
        <ToggleGroupItem
          value="list"
          aria-label="List View"
          className="h-8 rounded-md px-2"
        >
          List
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};

export default Navbar;
