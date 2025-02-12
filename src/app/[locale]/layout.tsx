import { ThemeProvider } from "@/components/theme-provider";
import { routing } from "@/i18n/routing";
import ReduxProvider from "@/providers/ReduxProvider";
import { Directions, Languages } from "@/types";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "StudyFlow",
    template: "%s - StudyFlow",
  },
  description:
    "StudyFlow is a free and open source study tool for students, teachers, and parents.",
  twitter: {
    card: "summary_large_image",
  },
};

export default async function LocaleLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  console.log("locale", locale);
  // Ensure that the incoming `locale` is valid
  // if (!routing.locales.includes(locale as any)) {
  //   notFound();
  // }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  const dir = locale === Languages.Arabic ? Directions.RTL : Directions.LTR;

  return (
    <html lang={locale} dir={dir} className="dark">
      <body
        className={`${dir === "rtl" ? "font-arabic" : "font-english"} overflow-hidden`}
      >
        <NextIntlClientProvider messages={messages}>
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
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
