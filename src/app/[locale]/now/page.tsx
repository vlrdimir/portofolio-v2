import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { GitHubActivitySection } from "@/components/now/GitHubActivitySection";
import { getGitHubActivityQueryOptions } from "@/components/now/github-activity-query";
import { MusicHistorySection } from "@/components/now/MusicHistorySection";
import {
  getMusicHistoryQueryOptions,
  LOCALHOST_MUSIC_HISTORY_ENDPOINT,
} from "@/components/now/music-history-query";
import { getGitHubActivityData } from "@/lib/github-activity";
import { makeQueryClient } from "@/lib/tanstack-query";

import NowPageClient from "./now-client";

export default async function NowPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const queryClient = makeQueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      ...getGitHubActivityQueryOptions(),
      queryFn: getGitHubActivityData,
    }),
    queryClient.prefetchQuery(
      getMusicHistoryQueryOptions(LOCALHOST_MUSIC_HISTORY_ENDPOINT),
    ),
  ]);

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <NowPageClient
        musicHistorySection={<MusicHistorySection />}
        githubSection={<GitHubActivitySection locale={locale} />}
      />
    </HydrationBoundary>
  );
}
