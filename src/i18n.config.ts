import { Languages } from "./types/enums";

export type LanguageType = Languages.Arabic | Languages.English;

type i18nType = {
  defaultLocale: LanguageType;
  locales: LanguageType[];
};

export const i18n: i18nType = {
  defaultLocale: Languages.English,
  locales: [Languages.English, Languages.Arabic],
};

export type Locale = (typeof i18n)["locales"][number];
