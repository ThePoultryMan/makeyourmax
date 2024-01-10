export async function getBrandTheme(theme: string) {
  const response = await fetch("/api/brandtheme/" + theme, {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  });
  return (await response.json()).value;
}
