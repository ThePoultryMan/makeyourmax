export function toTitleCase(text: string) {
  return text.replace(/([A-Z])/g, " $1").replace(/^./g, (str) => str.toUpperCase());
}

export function stripUrl(url: string) {
  return url.replace(/([^.]*\/\/)/, "").replace("localhost:5173", "");
}

// Code from https://css-tricks.com/converting-color-spaces-in-javascript/#aa-hex-to-rgb
export function hexToRGB(hex: string) {
  let base = hex.replace("#", "");
  let r, g, b;

  r = "0x" + base[0] + base[1];
  g = "0x" + base[2] + base[3];
  b = "0x" + base[4] + base[5];

  return `rgb(${+r}, ${+g}, ${+b})`;
}
