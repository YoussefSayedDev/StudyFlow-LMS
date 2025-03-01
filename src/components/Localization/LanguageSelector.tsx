"use client";

import egyptFlag from "@/assets/flags/egypt.png";
import usaFlag from "@/assets/flags/usa.png";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { usePathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { Directions, Languages } from "@/types";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Lang {
  code: Languages;
  name: string;
  flag: string | StaticImageData;
}

const languages: Lang[] = [
  { code: Languages.Arabic, name: "العربية", flag: egyptFlag },
  { code: Languages.English, name: "English", flag: usaFlag },
];

// Helper function to get language from localStorage or default to current locale
const getStoredLanguage = (currentLocale: string): Lang => {
  if (typeof window === "undefined") {
    return (
      languages.find((lang) => lang.code === currentLocale) || languages[1]
    ); // Default to English
  }

  const storedLang = localStorage.getItem("preferredLanguage");
  if (storedLang) {
    const lang = languages.find((l) => l.code === storedLang);
    if (lang) return lang;
  }

  return languages.find((lang) => lang.code === currentLocale) || languages[1];
};

export default function LanguageSelector() {
  // Localization
  const t = useTranslations("common");
  const locale = useLocale();
  const dir = locale === Languages.Arabic ? Directions.RTL : Directions.LTR;

  // State Variables
  const [open, setOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<Lang>(
    languages.find((lang) => lang.code === locale) || languages[1],
  );

  // Hooks
  const router = useRouter();
  const pathname = usePathname();

  // Update selected language when locale changes
  useEffect(() => {
    const lang = getStoredLanguage(locale);
    setSelectedLanguage(lang);
  }, [locale]);

  // Add a loading state
  const [isChangingLanguage, setIsChangingLanguage] = useState(false);

  const handleLanguageChange = (language: Lang) => {
    if (language.code === locale) {
      setOpen(false);
      return;
    }

    // Set loading state
    setIsChangingLanguage(true);

    // Store the language preference
    if (typeof window !== "undefined") {
      localStorage.setItem("preferredLanguage", language.code);
    }

    setSelectedLanguage(language);
    setOpen(false);

    // Navigate with a slight delay to show loading state
    setTimeout(() => {
      router.push(`/${language.code}/${pathname.split(`/${locale}/`)}`);
    }, 100);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="Select language"
          className="w-[200px] justify-between"
          disabled={isChangingLanguage}
        >
          <span className="flex items-center gap-2">
            <Image
              src={selectedLanguage.flag}
              alt={selectedLanguage.name}
              height={20}
              width={20}
              className={isChangingLanguage ? "opacity-50" : ""}
            />
            {isChangingLanguage ? t("changing") : selectedLanguage.name}
          </span>
          {isChangingLanguage ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            dir={dir}
            className="placeholder:text-xs"
            placeholder={t("searchLang")}
            aria-label="Search language"
          />
          <CommandList>
            <CommandEmpty>{t("noLang")}</CommandEmpty>
            <CommandGroup>
              {languages.map((language) => (
                <CommandItem
                  key={language.code}
                  onSelect={() => handleLanguageChange(language)}
                  className="cursor-pointer transition-colors hover:bg-accent"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4 transition-opacity",
                      selectedLanguage.code === language.code
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                  <span className="flex items-center gap-2">
                    <span className="text-xl">
                      <Image
                        src={language.flag}
                        alt={language.name}
                        width={20}
                        height={20}
                      />
                    </span>
                    {language.name}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
