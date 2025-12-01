import { NextResponse } from "next/server";
import { updateNewsDatabase } from "@/lib/news-service";

export async function GET() {
    try {
        const count = await updateNewsDatabase();
        return NextResponse.json({ success: true, message: `Updated ${count} news items.` });
    } catch (error) {
        console.error("Error updating news:", error);
        return NextResponse.json({ success: false, error: "Failed to update news." }, { status: 500 });
    }
}
