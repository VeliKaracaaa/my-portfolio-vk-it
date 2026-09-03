import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyAdminSessionToken, ADMIN_COOKIE_NAME } from "@/lib/auth";

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => {
        const cookieStore = await cookies();
        const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
        if (!verifyAdminSessionToken(token)) {
          throw new Error("Unauthorized: Session administrateur requise");
        }

        return {
          allowedContentTypes: ["video/*", "application/pdf"],
          maximumSizeInBytes: 500 * 1024 * 1024, // 500 Mo max
        };
      },
      onUploadCompleted: async ({ blob }) => {
        console.log("Upload terminé:", blob.url);
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 },
    );
  }
}
