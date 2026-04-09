import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { GitHubActivitySection } from "@/components/now/GitHubActivitySection";
import { getGitHubActivityQueryOptions } from "@/components/now/github-activity-query";
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

  await queryClient.prefetchQuery({
    ...getGitHubActivityQueryOptions(),
    queryFn: getGitHubActivityData,
  });

  return (
    <NowPageClient
      githubSection={
        <HydrationBoundary state={dehydrate(queryClient)}>
          <GitHubActivitySection locale={locale} />
        </HydrationBoundary>
      }
    />
  );
}
