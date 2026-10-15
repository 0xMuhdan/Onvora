import { NextResponse } from "next/server";
import { getLessonBySlug } from "@/db/curriculum-service";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const lesson = await getLessonBySlug(slug);

    if (!lesson) {
      return NextResponse.json(
        { ok: false, message: `Pelajaran dengan slug '${slug}' tidak ditemukan.` },
        { status: 404 }
      );
    }

    return NextResponse.json({ ok: true, data: lesson }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message: "Terjadi kesalahan saat memuat materi pelajaran.",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
