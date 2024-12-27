"use client";
import avatarImage from "@/assets/images/avatar.png";
import { cn } from "@/utils/cn";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useState } from "react";
import { BiMoon, BiSun } from "react-icons/bi";
import { FaRegBell, FaSearch } from "react-icons/fa";
import { IoChatboxEllipsesOutline, IoLanguage } from "react-icons/io5";
import { MdKeyboardArrowDown } from "react-icons/md";

const Navbar = ({ className }: { className?: string }) => {
  const [lang, setLang] = useState("english");
  const [isLangOpen, setIsLangOpen] = useState(false);

  const { theme, setTheme } = useTheme();

  const handleLangChange = (lang: string) => {
    setLang(lang);
  };

  return (
    <header className={cn("flex items-center justify-between p-4", className)}>
      {/* Search Bar */}
      <div className="hidden h-[50px] items-center rounded-md border border-border bg-sidebar-background px-4 py-2 md:flex">
        <FaSearch
          size={24}
          className="text-foreground transition-colors duration-300 hover:text-primary"
        />
        <input
          type="text"
          placeholder="Search..."
          className="ml-4 w-full border-none bg-transparent focus:outline-none"
        />
      </div>

      <div className="flex items-center gap-5">
        {/* Langueges DropDown */}
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

        {/* Theme Toggle */}
        <div className="relative cursor-pointer transition-colors duration-300 hover:text-primary">
          {theme === "dark" ? (
            <BiSun size={24} onClick={() => setTheme("light")} />
          ) : (
            <BiMoon size={24} onClick={() => setTheme("dark")} />
          )}
        </div>
      </div>

      {/* Icons & User Dropdown */}
      <div className="flex items-center gap-6 rounded-md border border-border bg-sidebar-background px-4 py-2">
        <div className="flex items-center gap-4">
          <div className="relative flex size-8 cursor-pointer items-center justify-center rounded-full transition-colors duration-300 hover:bg-border">
            <IoChatboxEllipsesOutline
              size={22}
              className="text-muted-foreground"
            />
            <span className="absolute right-0 top-0 flex size-3.5 items-center justify-center rounded-full bg-primary text-[10px] text-white ring">
              2
            </span>
          </div>
          <div className="relative flex size-8 cursor-pointer items-center justify-center rounded-full transition-colors duration-300 hover:bg-border">
            <FaRegBell size={20} className="text-muted-foreground" />
            <span className="absolute right-0 top-0 flex size-3.5 items-center justify-center rounded-full bg-primary text-[10px] text-white ring">
              4
            </span>
          </div>
        </div>
        <div className="group flex cursor-pointer items-center gap-2 rounded-md p-1 transition-all duration-300 hover:bg-border">
          <Image
            className="size-8 rounded-full"
            src={avatarImage}
            alt="avatar"
            width={40}
            height={40}
          />
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold leading-3 text-foreground">
              Youssef
            </span>
            <span className="text-[9px] text-muted-foreground">Admin</span>
          </div>
          <MdKeyboardArrowDown className="text-muted-foreground" size={24} />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
