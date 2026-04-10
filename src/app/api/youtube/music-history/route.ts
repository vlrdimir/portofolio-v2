import { NextResponse } from "next/server";

import { getMusicHistoryData } from "@/lib/yt-music-history";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await getMusicHistoryData();

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("[youtube/music-history] request failed", error);

    return NextResponse.json(
      {
        message: "Failed to load YouTube Music history",
        ...(process.env.NODE_ENV !== "production" && error instanceof Error
          ? { detail: error.message }
          : {}),
      },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  }
}
