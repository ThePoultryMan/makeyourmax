import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "io.github.thepoultryman",
  appName: "Make Your Max",
  webDir: "build",
  server: {
    androidScheme: "https",
  },
};

export default config;
