import { NextResponse } from "next/server";

import { getGitHubActivityData } from "@/lib/github-activity";

export const revalidate = 3600;

export async function GET() {
  try {
    const data = await getGitHubActivityData();

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return NextResponse.json(
      { message: "Failed to load GitHub activity" },
      { status: 500 },
    );
  }
}
