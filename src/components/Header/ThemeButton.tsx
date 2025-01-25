"use client";
import { useTheme } from "next-themes";
import { BiMoon, BiSun } from "react-icons/bi";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";

export default function ThemeButton() {
  const { theme, setTheme } = useTheme();
  console.log("Theme");
  console.log("Theme:=> ", theme);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>Theme</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>System</DropdownMenuLabel>
        <DropdownMenuLabel>Light</DropdownMenuLabel>
        <DropdownMenuLabel>Dark</DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function DarkButton() {
  return (
    <div className="hidden cursor-pointer transition-colors duration-300 hover:text-primary lg:block">
      <BiMoon size={24} />
    </div>
  );
}

{
  /* <ToggleGroup
      type="single"
      defaultValue={theme == "system" ? "dark" : theme}
      onValueChange={setTheme}
    >
      <ToggleGroupItem value="light" aria-label="Light Mode">
        <LightButton />
      </ToggleGroupItem>
      <ToggleGroupItem value="dark" aria-label="Dark Mode">
        <DarkButton />
      </ToggleGroupItem>
    </ToggleGroup> */
}

function LightButton() {
  return (
    <div className="hidden cursor-pointer transition-colors duration-300 hover:text-primary lg:block">
      <BiSun size={24} />
    </div>
  );
}
