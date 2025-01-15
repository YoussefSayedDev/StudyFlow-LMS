"use client";
import { cn } from "@/utils/cn";
import { useTheme } from "next-themes";
import { useState } from "react";
import { BiMoon, BiSun } from "react-icons/bi";
import { IoLanguage } from "react-icons/io5";
import { MdKeyboardArrowDown } from "react-icons/md";
import Profile from "./Profile";
import Search from "./Search";

const Navbar = ({ className }: { className?: string }) => {
  const [lang, setLang] = useState("english");
  const [isLangOpen, setIsLangOpen] = useState(false);

  const handleLangChange = (lang: string) => {
    setLang(lang);
  };

  return (
    <nav
      className={cn(
        "flex items-center justify-between bg-sidebar-background p-4",
        className,
      )}
    >
      {/* Search Bar */}
      <Search />

      {/* Langueges DropDown */}
      <div className="hidden items-center gap-5 lg:flex">
        <div
          onClick={() => setIsLangOpen(!isLangOpen)}
          className="relative flex items-center gap-2 transition-all duration-300"
        >
          <div
            className="flex cursor-pointer items-center gap-1 text-foreground transition-colors duration-300 hover:text-primary"
            onClick={() => setIsLangOpen(!isLangOpen)}
          >
            <IoLanguage size={20} />
            <div className="w-16">
              <h4 className="select-none uppercase">{lang}</h4>
            </div>
            <MdKeyboardArrowDown size={24} />
          </div>
          {isLangOpen && (
            <div className="absolute -bottom-[84px] right-0 z-50 flex w-[120px] flex-col gap-2 rounded-md border border-border bg-sidebar-background px-2 py-1">
              <div
                onClick={() => handleLangChange("english")}
                className={`cursor-pointer rounded-md px-3 py-1 transition-colors duration-300 hover:bg-primary hover:text-white ${lang === "english" && "bg-primary text-white"}`}
              >
                <h4 className="text-base">English</h4>
              </div>
              <div
                onClick={() => handleLangChange("arabic")}
                className={`cursor-pointer rounded-md px-3 py-1 transition-colors duration-300 hover:bg-primary hover:text-white ${lang === "arabic" && "bg-primary text-white"}`}
              >
                <h4 className="text-base">Arabic</h4>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
