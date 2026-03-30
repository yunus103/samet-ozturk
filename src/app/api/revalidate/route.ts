import { revalidateTag, revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const secret = request.headers.get("x-webhook-secret");

    if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
      console.error("Sanity Webhook: Unauthorized (Secret mismatch)");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    // Sanity webhooks can send _type at root OR inside document property
    const _type: string | undefined = body._type || body.document?._type;

    if (!_type) {
      return NextResponse.json({ error: "No document type found in payload" }, { status: 400 });
    }

    const tagMap: Record<string, string[]> = {
      siteSettings: ["layout", "home"],
      navigation:   ["layout"],
      homePage:     ["home"],
      blogPost:     ["blog"],
    };

    const tags = tagMap[_type] ?? [_type, "all"];

    // Next.js 16.x revalidateTag requires 2 arguments: (tag, type)
    tags.forEach((tag) => {
      revalidateTag(tag, "page");
      console.log(`[revalidate] tag="${tag}" type="page"`);
    });

    // For layout-level data (navbar, footer, site settings) also revalidate the entire layout
    if (_type === "siteSettings" || _type === "navigation") {
      revalidatePath("/", "layout");
      console.log("[revalidate] revalidatePath /  layout");
    }

    return NextResponse.json({
      revalidated: true,
      type: _type,
      tags,
      now: Date.now(),
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[revalidate] Error:", message);
    return NextResponse.json({ error: "Revalidation failed", detail: message }, { status: 400 });
  }
}
