import { queryOptions } from "@tanstack/react-query";

import type { MusicHistoryData } from "@/lib/yt-music-history-types";

export const DEFAULT_MUSIC_HISTORY_ENDPOINT = "/api/youtube/music-history";
export const LOCALHOST_MUSIC_HISTORY_ENDPOINT =
  "http://localhost:3000/api/youtube/music-history";

export const musicHistoryQueryKey = ["youtube-music-history"] as const;

async function fetchMusicHistory(
  endpoint = DEFAULT_MUSIC_HISTORY_ENDPOINT,
): Promise<MusicHistoryData> {
  const response = await fetch(endpoint, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to load YouTube Music history");
  }

  return (await response.json()) as MusicHistoryData;
}

export function getMusicHistoryQueryOptions(endpoint?: string) {
  return queryOptions({
    queryKey: musicHistoryQueryKey,
    queryFn: () => fetchMusicHistory(endpoint),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
  });
}
