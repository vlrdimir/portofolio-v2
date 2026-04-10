"use client";

import Image from "next/image";
import { Headphones, Clock3, Disc3, ExternalLink } from "lucide-react";
import { useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";

import { getMusicHistoryQueryOptions } from "./music-history-query";

function joinArtists(artists: string[], fallback: string) {
  return artists.length > 0 ? artists.join(" • ") : fallback;
}

function youtubeMusicWatchUrl(videoId: string) {
  return `https://music.youtube.com/watch?v=${encodeURIComponent(videoId)}`;
}

export function MusicHistorySection() {
  const t = useTranslations("NowPage");
  const { data, isPending, isError } = useQuery(getMusicHistoryQueryOptions());

  if (isPending) {
    return (
      <div className="border-border/50 animate-pulse rounded-lg border bg-orange-100/15 p-6 dark:bg-orange-950/20">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="bg-muted/60 h-7 w-44 rounded-md" />
            <div className="bg-muted/40 h-4 w-64 rounded-md" />
          </div>
          <div className="bg-muted/50 h-12 w-20 rounded-md" />
        </div>
        <div className="space-y-3">
          {[0, 1, 2].map((item) => (
            <div
              key={item}
              className="border-border/40 bg-background/40 flex items-center gap-4 rounded-md border p-3"
            >
              <div className="bg-muted/60 h-14 w-14 rounded-md" />
              <div className="min-w-0 flex-1 space-y-2">
                <div className="bg-muted/50 h-4 w-3/5 rounded-md" />
                <div className="bg-muted/40 h-3 w-2/5 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="border-border/50 rounded-lg border border-dashed bg-orange-100/15 p-6 dark:bg-orange-950/20">
        <h2 className="mb-2 font-mono text-2xl font-bold tracking-tight md:text-[1.75rem]">
          {t("musicHistoryTitle")}
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400">
          {t("musicHistoryLoadError")}
        </p>
      </div>
    );
  }

  return (
    <section className="border-border/50 hover:border-primary/40 group space-y-6 rounded-lg border bg-orange-100/15 p-6 transition-all hover:shadow-sm dark:bg-orange-950/20">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.2em] text-neutral-500 uppercase dark:text-neutral-400">
          <Headphones className="h-3.5 w-3.5" />
          {t("musicHistoryEyebrow")}
        </div>
        <div>
          <h2 className="mb-1.5 font-mono text-2xl font-bold tracking-tight md:text-[1.75rem]">
            {t("musicHistoryTitle")}
          </h2>
          <p className="max-w-2xl text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
            {t("musicHistoryDescription")}
          </p>
        </div>
      </div>

      {data.items.length > 0 ? (
        <ol className="space-y-3">
          {data.items.map((item, index) => {
            const artwork = item.thumbnails[0];
            const artists = joinArtists(
              item.artists,
              t("musicHistoryArtistsUnknown"),
            );

            return (
              <li
                key={item.id}
                className="border-border/40 bg-background/40 hover:bg-background/60 flex items-center gap-4 rounded-md border p-3 transition-colors"
              >
                <div className="font-mono text-sm text-neutral-500 tabular-nums dark:text-neutral-400">
                  {(index + 1).toString().padStart(2, "0")}
                </div>

                <div className="border-border/40 bg-secondary/60 relative h-14 w-14 shrink-0 overflow-hidden rounded-md border">
                  {artwork ? (
                    <Image
                      src={artwork}
                      alt={item.title ?? t("musicHistoryTitle")}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-neutral-500 dark:text-neutral-400">
                      <Disc3 className="h-5 w-5" />
                    </div>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <a
                        href={youtubeMusicWatchUrl(item.id)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/yt inline-flex min-w-0 max-w-full items-center gap-1.5 rounded-sm text-neutral-900 hover:text-primary focus-visible:ring-primary focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none dark:text-neutral-100 dark:hover:text-primary"
                        aria-label={t("musicHistoryYoutubeLinkAria", {
                          title:
                            item.title ?? t("musicHistoryUntitled"),
                        })}
                      >
                        <span className="truncate font-serif text-base font-semibold">
                          {item.title ?? t("musicHistoryUntitled")}
                        </span>
                        <ExternalLink
                          className="text-primary h-3.5 w-3.5 shrink-0 opacity-70 transition-opacity group-hover/yt:opacity-100"
                          aria-hidden
                        />
                      </a>
                      <p className="truncate text-sm text-neutral-600 dark:text-neutral-400">
                        {artists}
                      </p>
                    </div>

                    {item.day ? (
                      <span className="border-border/40 bg-card/70 shrink-0 rounded-full border px-2.5 py-1 font-mono text-[11px] text-neutral-600 dark:text-neutral-300">
                        {item.day}
                      </span>
                    ) : null}
                  </div>

                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-neutral-500 dark:text-neutral-400">
                    {item.itemType ? (
                      <span className="inline-flex items-center gap-1">
                        <Disc3 className="h-3.5 w-3.5" />
                        {item.itemType}
                      </span>
                    ) : null}

                    {item.duration ? (
                      <span className="inline-flex items-center gap-1">
                        <Clock3 className="h-3.5 w-3.5" />
                        {item.duration}
                      </span>
                    ) : null}

                    {item.album ? <span>{item.album}</span> : null}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      ) : (
        <div className="border-border/40 bg-background/30 rounded-md border border-dashed p-4">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {t("musicHistoryEmpty")}
          </p>
        </div>
      )}
    </section>
  );
}
