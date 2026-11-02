import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.minipick.app",
  appName: "ميني بيك",
  webDir: "public",
  server: {
    url: "https://minipick.vercel.app",
    cleartext: true,
  },
  android: {
    allowMixedContent: true,
    backgroundColor: "#0d0914",
  },
};

export default config;
