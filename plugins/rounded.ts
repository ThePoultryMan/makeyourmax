export default defineNuxtPlugin((NuxtApp) => {
  return {
    provide: {
      roundToFive: (num: number) => Math.round(num / 5) * 5,
    },
  };
});
