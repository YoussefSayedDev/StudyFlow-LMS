"use client";
import { menuItems } from "@/constants/menu-items";
import React, { useRef, useState } from "react";
import CustomScrollbar from "./CustomScrollbar";
import Logo from "./Logo";

const SideBar = () => {
  // const [isHovered, setIsHovered] = useState(false);

  const sidebarRef = useRef<HTMLDivElement>(null);

  const clientHeight = sidebarRef.current?.clientHeight;

  console.log("clientHeight", sidebarRef.current?.clientHeight);
  console.log("fullHeight", sidebarRef.current?.scrollHeight);

  return (
    <div className="bg-sidebar-background p-2">
      <Logo />
      <CustomScrollbar
        variant="rounded"
        thumbColor="bg-sidebar-accent"
        trackWidth="w-1"
        trackHoverWidth="hover:w-2"
        trackWidthOnScroll="w-2"
        className="h-[calc(100vh-64px)] overflow-hidden pb-5"
      >
        <div className="relative h-full px-2 text-white">
          {menuItems.map((item) => (
            <div key={item.title}>
              <h2 className="hidden py-2 text-lg font-bold text-gray-600 lg:block">
                {item.title}
              </h2>
              <ul className="flex flex-col gap-2">
                {item.items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="flex items-center gap-2 rounded-md p-2 text-muted-foreground hover:bg-sidebar-accent"
                    >
                      <item.icon size={20} />
                      <span className="hidden overflow-hidden text-ellipsis lg:block">
                        {item.label}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </CustomScrollbar>
    </div>
  );
};

export default SideBar;
