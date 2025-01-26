"use client";
import {
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { LaptopMinimal, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeButton() {
  const { theme, setTheme } = useTheme();

  const handleItemClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };
  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        {theme === "dark" ? (
          <Moon />
        ) : theme === "light" ? (
          <Sun />
        ) : (
          <LaptopMinimal />
        )}
        <span>Theme: </span>
        <span className="capitalize">{theme}</span>
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent className="flex flex-col gap-0.5">
          <DropdownMenuItem
            className={cn(theme === "system" && "bg-border")}
            onClick={(e) => {
              handleItemClick(e);
              setTheme("system");
            }}
          >
            <LaptopMinimal />
            <span>System</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className={cn(theme === "dark" && "bg-border")}
            onClick={(e) => {
              handleItemClick(e);
              setTheme("dark");
            }}
          >
            <Moon />
            <span>Dark</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className={cn(theme === "light" && "bg-border")}
            onClick={(e) => {
              handleItemClick(e);
              setTheme("light");
            }}
          >
            <Sun />
            <span>Light</span>
          </DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
}
