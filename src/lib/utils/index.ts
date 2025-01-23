// lib/utils.ts

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZoneName: "short",
  }).format(new Date(date));
}

export function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}
