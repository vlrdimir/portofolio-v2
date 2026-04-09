export const GITHUB_ACTIVITY_USERNAME = "vlrdimir";

export type GitHubUser = {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
};

export type DayContribution = {
  date: string;
  count: number;
  level: number;
};

export type GitHubActivityData = {
  user: GitHubUser;
  contributionDays: DayContribution[] | null;
};

export type ContributionsApiResponse = {
  contributions?: DayContribution[];
};
