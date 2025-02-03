import { ThemeProvider } from "@/components/theme-provider";
import ReduxProvider from "@/providers/ReduxProvider";
import { Directions, Languages } from "@/types";
import { getCurrentLocale } from "@/utils/getCurrentLocale";
import getTrans from "@/utils/translation";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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

  // const t = await getTrans(locale);
  return (
    <html
      lang={locale}
      dir={locale === Languages.Arabic ? Directions.RTL : Directions.LTR}
      className="dark"
    >
      <body className={`${inter.className} overflow-hidden`}>
        <ReduxProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
