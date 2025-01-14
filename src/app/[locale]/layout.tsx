import { ThemeProvider } from "@/components/theme-provider";
import { Locale } from "@/i18n.config";
import { Directions, Languages } from "@/types/enums";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Youssef Dev School Management Dashboard",
  description: "Next.js School Management System",
};

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: Locale };
}>) {
  const locale = params.locale;
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
