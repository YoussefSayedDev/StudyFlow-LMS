"use client";
import { cn } from "@/lib/utils";

import { useTheme } from "next-themes";
import { useState } from "react";
import { BiMoon, BiSun } from "react-icons/bi";
import { IoLanguage } from "react-icons/io5";
import { Button } from "../ui/button";
import {
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "../ui/dropdown-menu";

export default function LanguegesButton() {
  const [language, setLanguage] = useState<"english" | "arabic">("english");

  const handleItemClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };
  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <IoLanguage size={20} />
        <span>Language: </span>
        <span className="capitalize">{language}</span>
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent className="flex flex-col gap-0.5">
          <DropdownMenuItem
            className={cn(language === "english" && "bg-border")}
            onClick={(e) => {
              handleItemClick(e);
              setLanguage("english");
            }}
          >
            <span>English</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className={cn(language === "arabic" && "bg-border")}
            onClick={(e) => {
              handleItemClick(e);
              setLanguage("arabic");
            }}
          >
            <span>Arabic</span>
          </DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
}
