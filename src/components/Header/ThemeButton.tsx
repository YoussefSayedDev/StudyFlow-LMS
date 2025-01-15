"use client";
import { useTheme } from "next-themes";
import { BiMoon, BiSun } from "react-icons/bi";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";

export default function ThemeButton() {
  const { theme, setTheme } = useTheme();
  return (
    <ToggleGroup type="single" defaultValue={theme} onValueChange={setTheme}>
      <ToggleGroupItem value="light" aria-label="Light Mode">
        <LightButton />
      </ToggleGroupItem>
      <ToggleGroupItem value="dark" aria-label="Dark Mode">
        <DarkButton />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

function DarkButton() {
  return (
    <div className="hidden cursor-pointer transition-colors duration-300 hover:text-primary lg:block">
      <BiMoon size={24} />
    </div>
  );
}

function LightButton() {
  return (
    <div className="hidden cursor-pointer transition-colors duration-300 hover:text-primary lg:block">
      <BiSun size={24} />
    </div>
  );
}
