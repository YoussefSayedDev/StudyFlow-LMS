import type { Metadata } from "next";

import CustomScrollbar from "@/components/CustomScrollbar";
import Header from "@/components/Header/Header";
import AppSidebar from "@/components/navigation/app-sidebar";
import Navbar from "@/components/navigation/Navbar";
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
          <AppSidebar t={t} />
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
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
