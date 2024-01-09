import { CONFIG_CLIENT } from "$lib/server/vercel-config";

import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ params }) => {
  const value = await CONFIG_CLIENT.has("brandThemes_" + params["theme"]);
  return Response.json({
    value: value,
  })
}

