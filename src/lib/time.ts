import { countryLocalesMap } from "../data/countries";

function getTimeForTimeZone(
  timeZone: string,
  now: number | Date,
): string | null {
  try {
    return new Intl.DateTimeFormat("en-US", {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(now);
  } catch {
    return null;
  }
}

function findMatchingTimeZones(searchQuery: string): string[] {
  const query = searchQuery.toLowerCase().replace(/\s+/g, "_");

  return Intl.supportedValuesOf("timeZone").filter(
    (tz) =>
      tz.toLowerCase().split("/").includes(query) || tz.toLowerCase() === query,
  );
}

function findMatchingLocales(searchQuery: string): string[] {
  const query = searchQuery.toLowerCase();

  const locale = countryLocalesMap.get(query);
  if (locale) return [locale];

  return [];
}

function getTimeZonesForLocale(locale: string): string[] {
  return new Intl.Locale(locale).getTimeZones() ?? [];
}

export {
  getTimeForTimeZone,
  findMatchingTimeZones,
  findMatchingLocales,
  getTimeZonesForLocale,
};
