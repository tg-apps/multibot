import { describe, it, expect } from "bun:test";

import {
  findMatchingLocales,
  findMatchingTimeZones,
  getTimeForTimeZone,
  getTimeZonesForLocale,
} from "#lib/time";

describe("findMatchingTimeZones", () => {
  it("should find matching timezones for simple names", () => {
    expect(findMatchingTimeZones("Moscow")).toEqual(["Europe/Moscow"]);
    expect(findMatchingTimeZones("London")).toEqual(["Europe/London"]);
    expect(findMatchingTimeZones("Paris")).toEqual(["Europe/Paris"]);
    expect(findMatchingTimeZones("New York")).toEqual(["America/New_York"]);
  });

  it("should find matching timezones when timezones match", () => {
    expect(findMatchingTimeZones("Europe/Moscow")).toEqual(["Europe/Moscow"]);
    expect(findMatchingTimeZones("Europe/London")).toEqual(["Europe/London"]);
    expect(findMatchingTimeZones("Europe/Paris")).toEqual(["Europe/Paris"]);
    expect(findMatchingTimeZones("America/New_York")).toEqual([
      "America/New_York",
    ]);
  });

  it("should not match irrelevant timezones", () => {
    expect(findMatchingTimeZones("UK")).not.toContain("Pacific/Truk");
  });
});

describe("getTimeForTimeZone", () => {
  const now = new Date("2026-07-11T12:37:52");
  const nowNumerical = now.getTime();

  it("should return current time for a given timezone", () => {
    expect(getTimeForTimeZone("Europe/Moscow", now)).toBe("15:37");
    expect(getTimeForTimeZone("Europe/London", now)).toBe("13:37");
    expect(getTimeForTimeZone("Europe/Paris", now)).toBe("14:37");
    expect(getTimeForTimeZone("America/New_York", now)).toBe("08:37");

    expect(getTimeForTimeZone("Europe/Moscow", nowNumerical)).toBe("15:37");
    expect(getTimeForTimeZone("Europe/London", nowNumerical)).toBe("13:37");
    expect(getTimeForTimeZone("Europe/Paris", nowNumerical)).toBe("14:37");
    expect(getTimeForTimeZone("America/New_York", nowNumerical)).toBe("08:37");
  });
});

describe("findMatchingLocales", () => {
  it("should find a locale for a country", () => {
    expect(findMatchingLocales("Russia")).toEqual(["ru-RU"]);
    expect(findMatchingLocales("England")).toEqual(["en-GB"]);
    expect(findMatchingLocales("France")).toEqual(["fr-FR"]);
  });

  it("should not match irrelevant locales", () => {
    expect(findMatchingLocales("UK")).not.toContain("uk-UA");
  });
});

describe("getTimeZonesForLocale", () => {
  it("should find a locale for a country", () => {
    expect(getTimeZonesForLocale("ru-RU")).toEqual([
      "Asia/Anadyr",
      "Asia/Barnaul",
      "Asia/Chita",
      "Asia/Irkutsk",
      "Asia/Kamchatka",
      "Asia/Khandyga",
      "Asia/Krasnoyarsk",
      "Asia/Magadan",
      "Asia/Novokuznetsk",
      "Asia/Novosibirsk",
      "Asia/Omsk",
      "Asia/Sakhalin",
      "Asia/Srednekolymsk",
      "Asia/Tomsk",
      "Asia/Ust-Nera",
      "Asia/Vladivostok",
      "Asia/Yakutsk",
      "Asia/Yekaterinburg",
      "Europe/Astrakhan",
      "Europe/Kaliningrad",
      "Europe/Kirov",
      "Europe/Moscow",
      "Europe/Samara",
      "Europe/Saratov",
      "Europe/Ulyanovsk",
      "Europe/Volgograd",
    ]);
    expect(getTimeZonesForLocale("en-GB")).toEqual(["Europe/London"]);
    expect(getTimeZonesForLocale("fr-FR")).toEqual(["Europe/Paris"]);
  });
});
