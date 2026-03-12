import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const dir = path.join(process.cwd(), "public", "intern-image");
    const files = fs.readdirSync(dir);

    // Filter hanya file gambar (jpg, jpeg, png, webp)
    const images = files
      .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
      .map((f) => `/intern-image/${f}`);

    return NextResponse.json({ images });
  } catch {
    return NextResponse.json({ images: [] }, { status: 500 });
  }
}
