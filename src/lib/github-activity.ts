import "server-only";

import { env } from "@/env";

import {
  GITHUB_ACTIVITY_USERNAME,
  type ContributionsApiResponse,
  type GitHubActivityData,
  type GitHubUser,
} from "./github-activity-types";

const CONTRIBUTIONS_API = `https://github-contributions-api.jogruber.de/v4/${GITHUB_ACTIVITY_USERNAME}`;

function githubRestHeaders(): HeadersInit {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  if (env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${env.GITHUB_TOKEN}`;
  }

  return headers;
}

async function getGitHubUser(): Promise<GitHubUser> {
  const response = await fetch(
    `https://api.github.com/users/${GITHUB_ACTIVITY_USERNAME}`,
    {
      headers: githubRestHeaders(),
      next: { revalidate: 3600 },
    },
  );

  if (!response.ok) {
    throw new Error("GitHub API error");
  }

  return (await response.json()) as GitHubUser;
}

async function getGitHubContributions() {
  try {
    const response = await fetch(CONTRIBUTIONS_API, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return null;
    }

    const body = (await response.json()) as ContributionsApiResponse;
    return body.contributions && body.contributions.length > 0
      ? body.contributions
      : null;
  } catch {
    return null;
  }
}

export async function getGitHubActivityData(): Promise<GitHubActivityData> {
  const [user, contributionDays] = await Promise.all([
    getGitHubUser(),
    getGitHubContributions(),
  ]);

  return {
    user,
    contributionDays,
  };
}
