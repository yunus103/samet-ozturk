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
    // Sanity webhooks can send _type at root or inside document property
    const _type = body._type || body.document?._type;

    if (!_type) {
      return NextResponse.json({ error: "No document type found" }, { status: 400 });
    }

    const tagMap: Record<string, string[]> = {
      siteSettings: ["layout"],
      navigation: ["layout"],
      homePage: ["home"],
      blogPost: ["blog"],
    };

    const tags = tagMap[_type] || [_type, "all"];

    // Correctly call revalidateTag (it takes only one argument)
    tags.forEach((tag) => {
      revalidateTag(tag);
      console.log(`Revalidated tag: ${tag}`);
    });

    // Nuclear option for critical site-wide changes
    if (_type === "siteSettings" || _type === "navigation") {
      revalidatePath("/", "layout");
      console.log("Revalidated path: / (layout)");
    }

    return NextResponse.json({ 
      revalidated: true, 
      type: _type, 
      tags, 
      now: Date.now() 
    });
  } catch (err: any) {
    console.error("Revalidation error:", err.message);
    return NextResponse.json({ error: "Invalid body or revalidation failed" }, { status: 400 });
  }
}

