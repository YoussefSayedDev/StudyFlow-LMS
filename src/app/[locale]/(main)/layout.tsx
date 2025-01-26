import type { Metadata } from "next";
import { Inter } from "next/font/google";

import CustomScrollbar from "@/components/CustomScrollbar";
import Header from "@/components/Header/Header";
import Navbar from "@/components/Navbar";
import SideBar from "@/components/SideBar";
import { getCurrentLocale } from "@/utils/getCurrentLocale";
import getTrans from "@/utils/translation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Youssef Dev School Management Dashboard",
  description: "Next.js School Management System",
};

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = getCurrentLocale();

  const t = await getTrans(locale);
  return (
    <div>
      <Header className="h-[65px]" />
      <div className="flex h-screen">
        <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%]">
          <SideBar t={t} />
        </div>
        <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%]">
          <Navbar className="h-[45px]" />
          <CustomScrollbar
            variant="rounded"
            thumbColor="bg-primary"
            trackWidth="w-2"
            trackHoverWidth="hover:w-3"
            trackWidthOnScroll="w-3"
            className="h-[calc(100vh-130px)] overflow-hidden"
          >
            <div className="relative flex h-full flex-col">{children}</div>
          </CustomScrollbar>
        </div>
      </div>
    </div>
  );
}
