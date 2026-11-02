import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const downloadUrl =
    process.env.APK_DOWNLOAD_URL ||
    "/downloads/minipick.apk";

  return NextResponse.redirect(downloadUrl, {
    status: 302,
    headers: {
      "Cache-Control": "no-store, max-age=0",
      "Content-Disposition": 'attachment; filename="minipick.apk"',
    },
  });
}
