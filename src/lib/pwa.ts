import { pwaInfo } from "virtual:pwa-info";

// Relative URLs become invalid using this method.
export default class WebManifest {
  private name: string = "Make Your Max";
  private short_name: string = "Make Your Max";
  private description: string = "An app to keep track of your PRs.";
  private lang: string = "en";
  private dir: string = "ltr";
  private display: string = "standalone";
  private display_override: string[] = ["windows-control-overlay"];
  private orientation: string = "portrait";
  private id: string = "/";
  private icons: Icon[] = [
    {
      src: "https://makeyourmax.vercel.app/maxer-192.png",
      sizes: "192x192",
      type: "image/png",
    },
  ];
  private start_url: string;
  private theme_color: string = "rgb(255, 255, 255)";

  constructor(brand: string | null) {
    let base_url = import.meta.env.PROD ? "https://makeyourmax.vercel.app" : "http://localhost:5173";
    if (brand) {
      base_url += "?b=" + brand + "&";
    } else {
      base_url += "?";
    }
    this.start_url = base_url + "mode=pwa";
  }

  public setThemeColor(color: string) {
    this.theme_color = color;
  }
}

interface Icon {
  src: string;
  sizes: string;
  type: string;
}

export async function registerServiceWorker() {
  if (pwaInfo) {
    const { useRegisterSW } = await import("virtual:pwa-register/svelte");
    useRegisterSW({
      onOfflineReady() {
        console.log("Ready for offline");
      },
      immediate: true,
    });
  }
}
