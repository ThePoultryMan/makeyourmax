import { EDGE_CONFIG } from "$env/static/private";
import { createClient } from "@vercel/edge-config";

export const CONFIG_CLIENT = createClient(EDGE_CONFIG);
