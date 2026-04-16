import { unstable_rethrow } from "next/navigation";
import { headers } from "next/headers";
import { checkRateLimit } from "./rate-limit";

export type ActionResponse<T> =
  | { success: true; data: T }
  | { success: false; error: string; code?: string; reset?: number };

/**
 * Standard error handler for Server Actions.
 * Handles rate limiting, Next.js internal rethrows, and secure error masking.
 */
export async function withSafeAction<T>(
  actionName: string,
  fn: () => Promise<T>,
  options: { rateLimit?: "strict" | "standard" } = {}
): Promise<ActionResponse<T>> {
  try {
    // 1. Rate Limiting (based on IP)
    if (options.rateLimit) {
      const headerList = await headers();
      const ip = headerList.get("x-forwarded-for") || "anonymous";
      await checkRateLimit(`${ip}:${actionName}`, options.rateLimit);
    }

    // 2. Execute the action
    const data = await fn();
    return { success: true, data };
  } catch (error: any) {
    // 3. Handle Next.js internal control-flow (redirects/not-found)
    unstable_rethrow(error);

    // 4. Handle known "Expected" validation/rate-limit errors
    if (error.digest === "RATE_LIMIT_EXCEEDED") {
      return {
        success: false,
        error: "Trop de requêtes. Veuillez patienter un instant.",
        code: "RATE_LIMIT",
        reset: error.reset,
      };
    }

    // Handle Zod validation errors
    if (error.name === "ZodError" || error instanceof Error && "issues" in error) {
      const zodError = error as any;
      return {
        success: false,
        error: zodError.issues?.[0]?.message || "Données invalides.",
        code: "VALIDATION_ERROR",
      };
    }

    // 5. Securely log and mask unexpected server errors
    console.error(`[Server Action Error] ${actionName}:`, {
      message: error.message,
      stack: error.stack,
      digest: error.digest,
    });

    return {
      success: false,
      error: "Une erreur inattendue est survenue. Veuillez réessayer plus tard.",
      code: "INTERNAL_ERROR",
    };
  }
}
