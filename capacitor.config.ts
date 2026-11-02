import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.rovystore.app",
  appName: "ميني بيك",
  webDir: "public",
  server: {
    url: "https://minipick.vercel.app",
    cleartext: true,
  },
  android: {
    allowMixedContent: true,
    backgroundColor: "#07060a",
  },
};

export default config;
