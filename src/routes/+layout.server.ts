import { EDGE_CONFIG } from "$env/static/private";

export function load() {
  return {
    edgeConfig: EDGE_CONFIG,
  };
}
