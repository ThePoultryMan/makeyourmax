export function toTitleCase(text: string) {
  return text.replace(/([A-Z])/g, " $1").replace(/^./g, (str) => str.toUpperCase());
}

export function stripUrl(url: string) {
  return url.replace(/([^.]*\/\/)/, "").replace("localhost:5173", "");
}
