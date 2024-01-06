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
  private theme_color: string = "#ffffff";

  constructor(start_url: string) {
    this.start_url = start_url;
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
