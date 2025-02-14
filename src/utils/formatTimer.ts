export default function formatTimer(
  seconds: number,
  showHours = false,
  locale = "ar",
) {
  if (locale === "ar") {
    locale = "ar-EG";
  } else if (locale === "en") {
    locale = "en-US";
  }
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  hours.toLocaleString();

  if (showHours) {
    return `${hours.toLocaleString(locale, { minimumIntegerDigits: 2 })}:${minutes.toLocaleString(locale, { minimumIntegerDigits: 2 })}:${remainingSeconds.toLocaleString(locale, { minimumIntegerDigits: 2 })}`;
  } else {
    if (minutes < 1) {
      return `${remainingSeconds.toLocaleString(locale, { minimumIntegerDigits: 2 })}`;
    }
    return `${minutes.toLocaleString(locale, { minimumIntegerDigits: 2 })}:${remainingSeconds.toLocaleString(locale, { minimumIntegerDigits: 2 })}`;
  }
}
