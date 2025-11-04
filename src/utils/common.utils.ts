import { DateTime } from "luxon";

export const capitalizeFirstLetter = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

export const dateFromNow = (dateString?: string) => {
  if (!dateString) return "";

  const dt = DateTime.fromISO(dateString);
  if (!dt.isValid) return "";

  return dt.setLocale("it").toRelative();
};
