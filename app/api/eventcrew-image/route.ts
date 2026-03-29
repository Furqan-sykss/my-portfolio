import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const dir = path.join(process.cwd(), "public", "eventcrew-image");
    const files = fs.readdirSync(dir);

    const images = files
      .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
      .map((f) => `/eventcrew-image/${f}`);

    return NextResponse.json({ images });
  } catch {
    return NextResponse.json({ images: [] }, { status: 500 });
  }
}
