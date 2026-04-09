import { queryOptions } from "@tanstack/react-query";

import {
  GITHUB_ACTIVITY_USERNAME,
  type GitHubActivityData,
} from "@/lib/github-activity-types";

export const githubActivityQueryKey = [
  "github-activity",
  GITHUB_ACTIVITY_USERNAME,
] as const;

async function fetchGitHubActivity(): Promise<GitHubActivityData> {
  const response = await fetch("/api/github/activity");

  if (!response.ok) {
    throw new Error("Failed to load GitHub activity");
  }

  return (await response.json()) as GitHubActivityData;
}

export function getGitHubActivityQueryOptions() {
  return queryOptions({
    queryKey: githubActivityQueryKey,
    queryFn: fetchGitHubActivity,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
  });
}
