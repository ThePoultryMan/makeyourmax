export function toTitleCase(text: string) {
  return text.replace(/([A-Z])/g, " $1").replace(/^./g, (str) => str.toUpperCase());
}
