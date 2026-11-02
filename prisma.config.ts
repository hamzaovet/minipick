import "dotenv/config";
import { defineConfig } from "prisma/config";

const rawUrl =
  (process.env.DIRECT_URL || process.env.DATABASE_URL || "")
    .replace("&channel_binding=require", "")
    .replace("-pooler.", ".");

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: rawUrl,
  },
});
