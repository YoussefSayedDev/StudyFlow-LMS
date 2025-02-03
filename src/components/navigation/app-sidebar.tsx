"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { menuItems } from "@/config/menu-items";
import { useAppSelector } from "@/hooks/redux";
import { useNavigation } from "@/hooks/useNavigation";
import { LanguageType } from "@/i18n.config";
import { role } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Languages } from "@/types";
import Link from "next/link";
import CustomScrollbar from "../CustomScrollbar";
import Logo from "../Logo";

interface SideBarProps {
  t: {
    lang: string;
    menu: {
      title: string;
      items: {
        label: string;
      }[];
    }[];
  };
}

export default function AppSidebar({ t }: SideBarProps) {
  const { user } = useAppSelector((state) => state.auth);
  const { buildUrl, isActive } = useNavigation();

  console.log("user", user);

  // Now you can use user.role to determine which navigation items to show
  // const allowedPages = navigationConfig[user?.role] || {};

  return (
    <Sidebar side={t.lang === Languages.English ? "left" : "right"}>
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
                              href={buildUrl(item.href)}
                              className={cn(
                                "flex items-center gap-2 rounded-md p-2 text-muted-foreground hover:bg-sidebar-accent",
                                isActive(item.href) && "bg-sidebar-accent",
                              )}
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
      </SidebarContent>
      <SidebarFooter className="!bg-background !text-foreground"></SidebarFooter>
    </Sidebar>
  );
}
