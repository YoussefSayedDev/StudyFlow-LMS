import { ThemeProvider } from "@/components/theme-provider";
import { ReactQueryProvider } from "@/lib/providers/ReactQueryProvider";
import { Directions, Languages } from "@/types";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
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
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const locale = params.locale;

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  const dir =
    (locale as Languages) === Languages.Arabic
      ? Directions.RTL
      : Directions.LTR;

  return (
    <html lang={locale} dir={dir} className="dark">
      <body
        className={`${dir === "rtl" ? "font-arabic" : "font-english"} overflow-hidden`}
      >
        <ReactQueryProvider>
          <NextIntlClientProvider messages={messages}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </NextIntlClientProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
