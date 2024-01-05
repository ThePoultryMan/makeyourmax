// Relative URLs become invalid using this method.
export default class WebManifest {
  name: string = "Make Your Max";
  short_name: string = "Make Your Max";
  description: string = "An app to keep track of your PRs.";
  lang: string = "en";
  dir: string = "ltr";
  display: string = "standalone";
  display_override: string[] = [ "windows-control-overlay" ];
  orientation: string = "portrait";
  id: string = "/";
  icons: Icon[] = [
    {
      src: "maxer-192.png",
      sizes: "192x192",
      type: "image/png",
    }
  ];
  start_url: string;
  
  constructor(start_url: string) {
    this.start_url = start_url
  }
}

interface Icon {
  src: string,
  sizes: string,
  type: string,
}
