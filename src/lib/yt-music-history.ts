import "server-only";

import { ClientType, Innertube, YT } from "youtubei.js";

import { env } from "@/env";
import { redis } from "@/lib/upstash-redis";
import type {
  MusicHistoryData,
  MusicHistoryItem,
} from "@/lib/yt-music-history-types";

type OverlayBadge = {
  text?: string;
};

type OverlayWithBadges = {
  badges: OverlayBadge[];
};

type MetadataPart = {
  text: unknown;
};

type MetadataRow = {
  metadata_parts?: MetadataPart[];
};

const MUSIC_HISTORY_LIMIT = 4;
const MUSIC_HISTORY_CACHE_KEY = `youtube:music-history:limit:${MUSIC_HISTORY_LIMIT}`;
const MUSIC_HISTORY_CACHE_TTL_SECONDS = 60 * 60;
const MUSIC_HISTORY_BROWSE_ID = "FEhistory";
const MUSIC_HISTORY_PARAMS = "oggECgIIAQ";
const NETSCAPE_COOKIE_PREFIX = "# Netscape HTTP Cookie File";
const DEFAULT_YTJS_LANG = "id";
const DEFAULT_YTJS_LOCATION = "ID";
const DEFAULT_YTJS_TIMEZONE = "Asia/Jakarta";
const RELEVANT_COOKIE_NAMES = new Set([
  "__Secure-YNID",
  "__Secure-ROLLOUT_TOKEN",
  "VISITOR_PRIVACY_METADATA",
  "PREF",
  "__Secure-1PSIDTS",
  "__Secure-3PSIDTS",
  "HSID",
  "SSID",
  "APISID",
  "SAPISID",
  "__Secure-1PAPISID",
  "__Secure-3PAPISID",
  "SID",
  "__Secure-1PSID",
  "__Secure-3PSID",
  "SIDCC",
  "__Secure-1PSIDCC",
  "__Secure-3PSIDCC",
  "LOGIN_INFO",
  "__Secure-BUCKET",
  "YSC",
  "VISITOR_INFO1_LIVE",
  "CONSISTENCY",
  "ST-cv3kr6",
  "ST-yve142",
]);

function parseNetscapeCookieFile(cookieFile: string) {
  return cookieFile
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"))
    .map((line) => line.split("\t"))
    .filter((fields) => fields.length >= 7)
    .map((fields) => {
      const name = fields.at(-2);
      const value = fields.at(-1);

      if (!name || !value || !RELEVANT_COOKIE_NAMES.has(name)) {
        return null;
      }

      const normalizedValue = value.replaceAll('\\"', '"');

      return `${name}=${normalizedValue}`;
    })
    .filter((cookie): cookie is string => Boolean(cookie))
    .join("; ");
}

function normalizeCookieInput(cookieValue: string) {
  const trimmed = cookieValue.trim();

  if (!trimmed.startsWith(NETSCAPE_COOKIE_PREFIX)) {
    return trimmed;
  }

  const parsed = parseNetscapeCookieFile(trimmed);

  if (!parsed) {
    throw new Error("YTJS_COOKIE Netscape cookie file is empty or invalid");
  }

  return parsed;
}

async function requireYtjsCookie() {
  if (env.YTJS_COOKIE_URL) {
    const response = await fetch(env.YTJS_COOKIE_URL, {
      cache: "no-store",
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch YTJS cookie URL: ${response.status} ${response.statusText}`,
      );
    }

    return normalizeCookieInput(await response.text());
  }

  if (!env.YTJS_COOKIE) {
    throw new Error("YTJS_COOKIE or YTJS_COOKIE_URL must be configured");
  }

  return normalizeCookieInput(env.YTJS_COOKIE);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function hasOverlayBadges(value: unknown): value is OverlayWithBadges {
  return (
    isRecord(value) &&
    Array.isArray(value.badges) &&
    value.badges.every(
      (badge) =>
        isRecord(badge) &&
        (!("text" in badge) || typeof badge.text === "string"),
    )
  );
}

function isMetadataRow(value: unknown): value is MetadataRow {
  return (
    isRecord(value) &&
    (!("metadata_parts" in value) || Array.isArray(value.metadata_parts))
  );
}

function getTextValue(value: unknown) {
  if (typeof value === "string") {
    return value;
  }

  if (isRecord(value) && "text" in value && typeof value.text === "string") {
    return value.text;
  }

  if (
    isRecord(value) &&
    "content" in value &&
    typeof value.content === "string"
  ) {
    return value.content;
  }

  return null;
}

function getThumbnailUrls(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((thumbnail) => {
      if (!isRecord(thumbnail) || typeof thumbnail.url !== "string") {
        return null;
      }

      return thumbnail.url;
    })
    .filter((url): url is string => Boolean(url));
}

function getLockupThumbnails(value: unknown) {
  if (!isRecord(value)) {
    return [];
  }

  if (
    "primary_thumbnail" in value &&
    isRecord(value.primary_thumbnail) &&
    Array.isArray(value.primary_thumbnail.image)
  ) {
    return getThumbnailUrls(value.primary_thumbnail.image);
  }

  if ("image" in value && Array.isArray(value.image)) {
    return getThumbnailUrls(value.image);
  }

  return [];
}

function getDurationFromOverlays(value: unknown) {
  const overlays = isRecord(value)
    ? "primary_thumbnail" in value && isRecord(value.primary_thumbnail)
      ? value.primary_thumbnail.overlays
      : value.overlays
    : null;

  if (!Array.isArray(overlays)) {
    return null;
  }

  for (const overlay of overlays) {
    if (!hasOverlayBadges(overlay)) {
      continue;
    }

    const badge = overlay.badges.find(
      (item): item is OverlayBadge & { text: string } =>
        typeof item.text === "string",
    );

    if (badge) {
      return badge.text;
    }
  }

  return null;
}

function getMetadataParts(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((part) => {
      if (!isRecord(part) || !("text" in part)) {
        return null;
      }

      return getTextValue(part.text);
    })
    .filter((part): part is string => Boolean(part));
}

function toMusicHistoryItem(
  item: unknown,
  day: string | null,
): MusicHistoryItem | null {
  if (!isRecord(item) || item.type !== "LockupView") {
    return null;
  }

  if (typeof item.content_id !== "string") {
    return null;
  }

  const metadata = isRecord(item.metadata) ? item.metadata : null;
  const metadataRows =
    metadata && isRecord(metadata.metadata)
      ? metadata.metadata.metadata_rows
      : null;
  const firstRow =
    Array.isArray(metadataRows) && isMetadataRow(metadataRows[0])
      ? metadataRows[0]
      : null;
  const parts = firstRow ? getMetadataParts(firstRow.metadata_parts) : [];

  return {
    id: item.content_id,
    title: metadata ? getTextValue(metadata.title) : null,
    itemType: typeof item.content_type === "string" ? item.content_type : null,
    artists: parts[0] ? [parts[0]] : [],
    album: null,
    duration: getDurationFromOverlays(item.content_image),
    thumbnails: getLockupThumbnails(item.content_image),
    day,
  };
}

function requireMusicHistoryItem(
  item: MusicHistoryItem | null,
): item is MusicHistoryItem {
  return Boolean(item?.id);
}

async function createHistoryClient() {
  return Innertube.create({
    cookie: await requireYtjsCookie(),
    account_index: env.YTJS_ACCOUNT_INDEX,
    visitor_data: env.YTJS_VISITOR_DATA,
    user_agent: env.YTJS_USER_AGENT,
    lang: env.YTJS_LANG ?? DEFAULT_YTJS_LANG,
    location: env.YTJS_LOCATION ?? DEFAULT_YTJS_LOCATION,
    timezone: env.YTJS_TIMEZONE ?? DEFAULT_YTJS_TIMEZONE,
    client_type: ClientType.WEB,
    retrieve_player: false,
    retrieve_innertube_config: false,
    generate_session_locally: true,
  });
}

async function getMusicHistoryFeed(yt: Innertube) {
  const response = await yt.actions.execute("/browse", {
    browseId: MUSIC_HISTORY_BROWSE_ID,
    params: MUSIC_HISTORY_PARAMS,
  });

  return new YT.History(yt.actions, response);
}

async function getMusicHistoryDataUncached(): Promise<MusicHistoryData> {
  const yt = await createHistoryClient();
  let history = await getMusicHistoryFeed(yt);
  const items: MusicHistoryItem[] = [];
  const seenIds = new Set<string>();

  const collectItems = () => {
    for (const section of history.sections) {
      const day =
        section.header && "title" in section.header
          ? getTextValue(section.header.title)
          : null;

      for (const item of section.contents ?? []) {
        if (items.length >= MUSIC_HISTORY_LIMIT) {
          return;
        }

        const normalizedItem = toMusicHistoryItem(item, day);

        if (
          !requireMusicHistoryItem(normalizedItem) ||
          seenIds.has(normalizedItem.id)
        ) {
          continue;
        }

        seenIds.add(normalizedItem.id);
        items.push(normalizedItem);
      }
    }
  };

  collectItems();

  while (history.has_continuation && items.length < MUSIC_HISTORY_LIMIT) {
    history = await history.getContinuation();
    collectItems();
  }

  if (items.length === 0) {
    const firstSection = history.sections[0];
    const firstItemType = firstSection?.contents?.[0]?.type ?? null;

    if (firstItemType === "Message") {
      throw new Error(
        "YouTube returned an empty history message state. Refresh the HAR-derived YTJS cookies/visitor data because the current history-tab context has expired.",
      );
    }
  }

  return {
    items,
    total: items.length,
  };
}

export async function getMusicHistoryData(): Promise<MusicHistoryData> {
  if (!redis) {
    return getMusicHistoryDataUncached();
  }

  try {
    const cached = await redis.get<MusicHistoryData>(MUSIC_HISTORY_CACHE_KEY);

    if (cached) {
      return cached;
    }
  } catch (error) {
    console.error("[youtube/music-history] cache read failed", error);
  }

  const fresh = await getMusicHistoryDataUncached();

  try {
    await redis.set(MUSIC_HISTORY_CACHE_KEY, fresh, {
      ex: MUSIC_HISTORY_CACHE_TTL_SECONDS,
    });
  } catch (error) {
    console.error("[youtube/music-history] cache write failed", error);
  }

  return fresh;
}
