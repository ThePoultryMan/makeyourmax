import type { WeightUnit } from "$lib/types";

export function toAbbreviation(unit: WeightUnit, plural: boolean = false): string {
  switch (unit) {
    case "Pounds":
      return `lb${plural ? "s" : ""}.`;
    case "Kilograms":
      return "kg";
  }
}
