import { NextResponse } from "next/server";
import { updatePostImages } from "@/lib/blog-service";

export async function GET() {
    try {
        const count = await updatePostImages();
        return NextResponse.json({ success: true, message: `Generated images for ${count} posts.` });
    } catch (error) {
        console.error("Error generating blog images:", error);
        return NextResponse.json({ success: false, error: "Failed to generate blog images." }, { status: 500 });
    }
}
