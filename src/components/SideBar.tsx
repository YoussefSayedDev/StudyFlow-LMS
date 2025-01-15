"use client";
import { menuItems } from "@/constants/menu-items";
import { role } from "@/lib/data";
import Link from "next/link";
import React, { useRef, useState } from "react";
import CustomScrollbar from "./CustomScrollbar";

interface SideBarProps {
  t: {
    menu: {
      title: string;
      items: {
        label: string;
      }[];
    }[];
  };
}

const SideBar = ({ t }: SideBarProps) => {
  const sidebarRef = useRef<HTMLDivElement>(null);

  if (true) {
    console.log(t);
    // return <div></div>;
  }

  const clientHeight = sidebarRef.current?.clientHeight;

  if (t) {
    return (
      <div className="bg-sidebar-background p-2">
        <CustomScrollbar
          variant="rounded"
          thumbColor="bg-sidebar-accent"
          trackWidth="w-1"
          trackHoverWidth="hover:w-2"
          trackWidthOnScroll="w-2"
          padding="pr-2"
          className="h-[calc(100vh-64px)] overflow-hidden pb-5"
        >
          <div className="relative h-full text-white lg:px-2">
            {menuItems.map((item, i) => (
              <div key={item.title}>
                <h2 className="hidden py-2 text-lg font-bold text-gray-600 lg:block">
                  {t.menu[i]?.title}
                </h2>
                <ul className="flex flex-col gap-2">
                  {item.items.map(
                    (item, j) =>
                      item.visible.includes(role) && (
                        <li key={item.label}>
                          <Link
                            href={item.href}
                            className="flex items-center gap-2 rounded-md p-2 text-muted-foreground hover:bg-sidebar-accent"
                          >
                            <item.icon size={20} />
                            <span className="hidden overflow-hidden text-ellipsis lg:block">
                              {t.menu[i]?.items[j]?.label}
                            </span>
                          </Link>
                        </li>
                      ),
                  )}
                </ul>
              </div>
            ))}
          </div>
        </CustomScrollbar>
      </div>
    );
  } else {
    return <div>Loading</div>;
  }
};

export default SideBar;
