"use client";

import Image from "next/image";
import Link from "next/link";
import { Github, ExternalLink } from "lucide-react";
import { useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";

import { GitHubContributionHeatmap } from "./GitHubContributionHeatmap";
import { getGitHubActivityQueryOptions } from "./github-activity-query";

export function GitHubActivitySection({ locale }: { locale: string }) {
  const t = useTranslations("NowPage");
  const { data, isPending, isError } = useQuery(
    getGitHubActivityQueryOptions(),
  );

  if (isPending) {
    return (
      <div className="border-border/50 animate-pulse rounded-lg border bg-orange-100/15 p-6 dark:bg-orange-950/20">
        <div className="bg-muted/60 h-24 rounded-md" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="border-border/50 rounded-lg border border-dashed bg-orange-100/15 p-6 dark:bg-orange-950/20">
        <p className="text-neutral-600 dark:text-neutral-400">
          {t("githubLoadError")}
        </p>
      </div>
    );
  }

  const { user, contributionDays } = data;

  const statClass =
    "rounded-md border border-border/40 bg-background/40 px-3 py-3 text-center";

  return (
    <div className="border-border/50 hover:border-primary/40 group space-y-6 rounded-lg border bg-orange-100/15 p-6 transition-all hover:shadow-sm dark:bg-orange-950/20">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex gap-4">
          <Image
            src={user.avatar_url}
            alt=""
            width={56}
            height={56}
            className="border-border/50 h-14 w-14 shrink-0 rounded-full border"
          />
          <div>
            <h2 className="mb-1.5 font-mono text-2xl font-bold tracking-tight md:text-[1.75rem]">
              {t("githubTitle")}
            </h2>
            <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
              {user.name ?? user.login}
              {user.bio ? ` · ${user.bio}` : null}
            </p>
          </div>
        </div>
        <Link
          href={user.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary inline-flex shrink-0 items-center gap-1.5 text-sm font-medium hover:opacity-90"
        >
          <Github className="h-4 w-4" />
          {t("githubViewProfile")}
          <ExternalLink className="h-3.5 w-3.5 opacity-70" />
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        <div className={statClass}>
          <div className="font-mono text-2xl font-bold text-neutral-900 tabular-nums sm:text-3xl dark:text-neutral-100">
            {user.public_repos}
          </div>
          <div className="mt-1 text-xs font-medium text-neutral-500 dark:text-neutral-400">
            {t("githubPublicRepos")}
          </div>
        </div>
        <div className={statClass}>
          <div className="font-mono text-2xl font-bold text-neutral-900 tabular-nums sm:text-3xl dark:text-neutral-100">
            {user.followers}
          </div>
          <div className="mt-1 text-xs font-medium text-neutral-500 dark:text-neutral-400">
            {t("githubFollowers")}
          </div>
        </div>
        <div className={statClass}>
          <div className="font-mono text-2xl font-bold text-neutral-900 tabular-nums sm:text-3xl dark:text-neutral-100">
            {user.following}
          </div>
          <div className="mt-1 text-xs font-medium text-neutral-500 dark:text-neutral-400">
            {t("githubFollowing")}
          </div>
        </div>
      </div>

      {contributionDays ? (
        <GitHubContributionHeatmap
          contributions={contributionDays}
          locale={locale}
        />
      ) : (
        <div className="border-border/40 border-t pt-6">
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            {t("githubContributionsUnavailable")}
          </p>
        </div>
      )}
    </div>
  );
}
