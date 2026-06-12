import { NextResponse } from "next/server";

import { getDb } from "@/db/cloudflare";
import { subscribeToNewsletter } from "@/lib/newsletter";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const email = String(formData.get("email") ?? "");
    const source = String(formData.get("source") ?? "homepage");
    const db = await getDb();
    const result = await subscribeToNewsletter(db, email, source);

    if (result.status === "invalid") {
      return NextResponse.json(
        { message: "Enter a valid email address." },
        { status: 400 },
      );
    }

    if (result.status === "existing") {
      return NextResponse.json({
        message: "You are already on the DevEntro list.",
        status: result.status,
      });
    }

    return NextResponse.json({
      message: "You are on the DevEntro list.",
      status: result.status,
    });
  } catch {
    return NextResponse.json(
      { message: "Newsletter signup is temporarily unavailable." },
      { status: 500 },
    );
  }
}
