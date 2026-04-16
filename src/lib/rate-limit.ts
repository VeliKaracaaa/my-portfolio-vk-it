import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "./redis";

/**
 * Common rate limiters for different action types.
 * Using "sliding window" for smoother limiting.
 */
export const rateLimiters = {
  /**
   * For sensitive or expensive actions (e.g. LinkedIn sync, Contact form)
   * 5 requests per 10 seconds
   */
  strict: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, "10 s"),
    analytics: true,
    prefix: "ratelimit:strict",
  }),

  /**
   * For general metadata or status checks
   * 20 requests per 10 seconds
   */
  standard: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(20, "10 s"),
    analytics: true,
    prefix: "ratelimit:standard",
  }),
};

/**
 * Helper to check rate limit and throw a formatted error if exceeded.
 */
export async function checkRateLimit(
  limitKey: string,
  type: keyof typeof rateLimiters = "standard"
) {
  const limiter = rateLimiters[type];
  const { success, limit, reset, remaining } = await limiter.limit(limitKey);

  if (!success) {
    const error = new Error("Rate limit exceeded");
    (error as any).digest = "RATE_LIMIT_EXCEEDED";
    (error as any).reset = reset;
    throw error;
  }

  return { limit, remaining, reset };
}
