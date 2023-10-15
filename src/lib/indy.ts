import localforage from "localforage";

export const preferences = localforage.createInstance({
	name: "preferences",
});

export const prs = localforage.createInstance({
	name: "prs",
});
