"use client";
import { menuItems } from "@/config/menu-items";
// import { useNavigation } from "@/hooks/__tests__/useNavigation";
import { useNavigation } from "@/hooks/useNavigation";
import { role } from "@/lib/data";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CustomScrollbar from "../CustomScrollbar";

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
  const { currentPage, buildUrl, isActive } = useNavigation();

  console.log("siddddebar");
  console.log("sidebar", {
    currentPage: currentPage,
    buildUrl: buildUrl,
  });
  const pathname = usePathname();
  const parts = pathname.split("/");
  const currentPath = parts[parts.length - 1];
  return (
    // <div className="bg-sidebar-background p-2">
    //   <CustomScrollbar
    //     variant="rounded"
    //     thumbColor="bg-sidebar-accent"
    //     trackWidth="w-1"
    //     trackHoverWidth="hover:w-2"
    //     trackWidthOnScroll="w-2"
    //     padding="pr-2"
    //     className="h-[calc(100vh-90px)] overflow-hidden pb-5"
    //   >
    //     <div className="relative h-full text-white lg:px-2">
    //       {menuItems.map((item, i) => (
    //         <div key={item.title}>
    //           <h2 className="hidden py-2 text-lg font-bold text-gray-600 lg:block">
    //             {t.menu[i]?.title}
    //           </h2>
    //           <ul className="flex flex-col gap-2">
    //             {item.items.map(
    //               (item, j) =>
    //                 item.visible.includes(role) && (
    //                   <li key={item.label}>
    //                     <Link
    //                       href={buildUrl(item.href)}
    //                       className={cn(
    //                         "flex items-center gap-2 rounded-md p-2 text-muted-foreground hover:bg-sidebar-accent",
    //                         "/" + currentPath === item.href &&
    //                           "bg-sidebar-accent",
    //                       )}
    //                     >
    //                       <item.icon size={20} />
    //                       <span className="hidden overflow-hidden text-ellipsis lg:block">
    //                         {t.menu[i]?.items[j]?.label}
    //                       </span>
    //                     </Link>
    //                   </li>
    //                 ),
    //             )}
    //           </ul>
    //         </div>
    //       ))}
    //     </div>
    //   </CustomScrollbar>
    // </div>
    <div></div>
  );
};

export default SideBar;
