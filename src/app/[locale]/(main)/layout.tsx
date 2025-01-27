import type { Metadata } from "next";

import CustomScrollbar from "@/components/CustomScrollbar";
import Header from "@/components/header/Header";
import Navbar from "@/components/Navbar";
// import SideBar from "@/components/SideBar";
import AppSidebar from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { getCurrentLocale } from "@/utils/getCurrentLocale";
import getTrans from "@/utils/translation";

export const metadata: Metadata = {
  title: "Youssef Dev School Management Dashboard",
  description: "Next.js School Management System",
};

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = getCurrentLocale();

  const t = await getTrans(locale);
  return (
    <SidebarProvider>
      <div className="w-full">
        <div className="flex w-full items-center">
          {/* <div className="flex h-screen">
          <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%]">
            <SideBar t={t} />
          </div> */}
          <AppSidebar t={t} />
          {/* <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%]"> */}
          <div className="w-full">
            <div className="sticky top-0 z-50">
              <Header className="h-[65px]" />
              <div className="container mx-auto">
                <Navbar className="h-[45px]" />
                <SidebarTrigger />
              </div>
            </div>
            <CustomScrollbar
              variant="rounded"
              thumbColor="bg-primary"
              trackWidth="w-2"
              trackHoverWidth="hover:w-3"
              trackWidthOnScroll="w-3"
              className="h-[calc(100vh-150px)] overflow-hidden"
            >
              <div className="relative flex h-full w-full flex-col">
                {children}
              </div>
            </CustomScrollbar>
            {/* </CustomScrollbar> */}
          </div>
          {/* </div> */}
        </div>
      </div>
    </SidebarProvider>
  );
}
