import localforage from "localforage";

export const preferences = localforage.createInstance({
  name: "preferences",
});

export const prs = localforage.createInstance({
  name: "prs",
});

export async function getAll(forage: LocalForage) {
  let items: Record<string, any> = {};
  for (const key of await forage.keys()) {
    items[key] = await forage.getItem(key);
  }
  return items;
}
