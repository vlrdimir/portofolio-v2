import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]),
    /** Optional: raises GitHub API rate limit (5000/hr) for builds / ISR */
    GITHUB_TOKEN: z.string().optional(),
    /** Optional Upstash Redis REST URL for server-side caching */
    UPSTASH_REDIS_REST_URL: z.string().url().optional(),
    /** Optional Upstash Redis REST token for server-side caching */
    UPSTASH_REDIS_REST_TOKEN: z.string().optional(),
    /** Server-only YouTube cookie header string for ytjs */
    YTJS_COOKIE: z.string().optional(),
    /** Server-only CDN URL to a Netscape cookie file for ytjs */
    YTJS_COOKIE_URL: z.string().url().optional(),
    /** Optional account index when the cookie contains multiple accounts */
    YTJS_ACCOUNT_INDEX: z.coerce.number().int().nonnegative().optional(),
    /** Optional browser visitor data from a working YouTube history request */
    YTJS_VISITOR_DATA: z.string().optional(),
    /** Optional browser user agent from a working YouTube history request */
    YTJS_USER_AGENT: z.string().optional(),
    /** Optional YouTube language override for history requests */
    YTJS_LANG: z.string().optional(),
    /** Optional YouTube location override for history requests */
    YTJS_LOCATION: z.string().optional(),
    /** Optional timezone override for history requests */
    YTJS_TIMEZONE: z.string().optional(),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string(),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    GITHUB_TOKEN: process.env.GITHUB_TOKEN,
    UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
    UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
    YTJS_COOKIE: process.env.YTJS_COOKIE,
    YTJS_COOKIE_URL: process.env.YTJS_COOKIE_URL,
    YTJS_ACCOUNT_INDEX: process.env.YTJS_ACCOUNT_INDEX,
    YTJS_VISITOR_DATA: process.env.YTJS_VISITOR_DATA,
    YTJS_USER_AGENT: process.env.YTJS_USER_AGENT,
    YTJS_LANG: process.env.YTJS_LANG,
    YTJS_LOCATION: process.env.YTJS_LOCATION,
    YTJS_TIMEZONE: process.env.YTJS_TIMEZONE,
    // NEXT_PUBLIC_CLIENTVAR: process.env.NEXT_PUBLIC_CLIENTVAR,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
});
