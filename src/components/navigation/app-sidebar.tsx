"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { menuItems } from "@/config/menu-items";
// import { useNavigation } from "@/hooks/__tests__/useNavigation";
import { useAppSelector } from "@/hooks/redux";
import { useNavigation } from "@/hooks/useNavigation";
import { role } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Languages } from "@/types";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import CustomScrollbar from "../CustomScrollbar";
import Logo from "../Logo";

interface SideBarProps {
  // t: ReturnType<typeof useTranslations>;
  t: string;
}

export default function AppSidebar({ t }: SideBarProps) {
  // const { user } = useAppSelector((state) => state.auth);
  const { buildUrl, isActive } = useNavigation();

  const locale = useLocale();

  const tt = useTranslations("navigation.menu");

  // console.log("tt", tt);

  console.log("tt", tt);

  const theT = tt("sections.main");

  console.log("theT", theT);
  return (
    <Sidebar side={locale === Languages.English ? "left" : "right"}>
      <SidebarHeader className="!bg-background !text-foreground">
        <Logo />
      </SidebarHeader>

      <SidebarContent className="overflow-hidden !bg-background !text-foreground">
        <div className="p-2">
          <CustomScrollbar
            variant="rounded"
            thumbColor="bg-sidebar-accent"
            trackWidth="w-1"
            trackHoverWidth="hover:w-2"
            trackWidthOnScroll="w-2"
            padding="pr-2"
            className="h-[calc(100vh-90px)] overflow-hidden pb-5"
          >
            <div className="relative h-full text-white lg:px-2">
              {menuItems.map((section) => (
                <div key={section.key}>
                  <h2 className="hidden py-2 text-lg font-bold text-gray-600 lg:block">
                    {tt(`sections.${section.key}`)}
                  </h2>

                  <ul className="flex flex-col gap-2">
                    {section.items.map(
                      (item) =>
                        item.visible.includes(role) && (
                          <li key={item.key}>
                            <Link
                              href={buildUrl(item.href)}
                              className={cn(
                                "flex items-center gap-2 rounded-md p-2 text-muted-foreground hover:bg-sidebar-accent",
                                isActive(item.href) && "bg-sidebar-accent",
                              )}
                            >
                              <item.icon size={20} />
                              <span className="hidden overflow-hidden text-ellipsis lg:block">
                                {tt(`items.${item.key}`)}
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
      </SidebarContent>

      <SidebarFooter className="!bg-background !text-foreground" />
    </Sidebar>
  );
}
