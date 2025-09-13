import { NextResponse } from "next/server";
import { queryDeepSeek } from "@/lib/deepseek";

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const response = await queryDeepSeek(prompt);
    return NextResponse.json({ response });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
