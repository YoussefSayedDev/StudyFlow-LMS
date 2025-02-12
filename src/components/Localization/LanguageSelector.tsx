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
import { cn } from "@/lib/utils";
import { Directions, Languages } from "@/types";
import { Check, ChevronsUpDown } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image, { StaticImageData } from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

interface Lang {
  code: Languages;
  name: string;
  flag: string | StaticImageData;
}

const languages: Lang[] = [
  { code: Languages.Arabic, name: "العربية", flag: egyptFlag },
  { code: Languages.English, name: "English", flag: usaFlag },
];

export default function LanguageSelector() {
  // Localization
  const t = useTranslations("common");
  const locale = useLocale() as Languages;
  const dir = locale === Languages.Arabic ? Directions.RTL : Directions.LTR;

  // State Variables
  const [open, setOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(
    languages.find((lang) => lang.code === locale) || languages[0],
  );

  // Hooks
  const router = useRouter();
  const pathname = usePathname();
  const routing = pathname.split(`${locale}/`)[1];
  console.log("routing", routing);

  const handleLanguageChange = (language: Lang) => {
    setSelectedLanguage(language);
    setOpen(false);
    router.push(`/${language.code}/${routing}`);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          <span className="flex items-center gap-2">
            <Image
              src={selectedLanguage.flag}
              alt={selectedLanguage.name}
              height={20}
              width={20}
            />
            {selectedLanguage.name}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            dir={dir}
            className="placeholder:text-xs"
            placeholder={t("searchLang")}
          />
          <CommandList>
            <CommandEmpty>{t("noLang")}</CommandEmpty>
            <CommandGroup>
              {languages.map((language) => (
                <CommandItem
                  key={language.code}
                  onSelect={() => handleLanguageChange(language)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
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
