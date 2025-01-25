import { ThemeProvider } from "@/components/theme-provider";
import { Directions, Languages } from "@/types/enums";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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
    <html
      lang={locale}
      dir={locale === Languages.Arabic ? Directions.RTL : Directions.LTR}
      className="dark"
    >
      <body className={`${inter.className} overflow-hidden`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
