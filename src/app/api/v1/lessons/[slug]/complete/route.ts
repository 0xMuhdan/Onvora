import { NextResponse } from "next/server";
import { recordLessonProgress } from "@/db/curriculum-service";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const body = (await request.json().catch(() => ({}))) as {
      userId?: string;
      checkpointPassed?: boolean;
    };

    if (body.checkpointPassed === false) {
      return NextResponse.json(
        {
          ok: false,
          message: "Checkpoint wajib diselesaikan terlebih dahulu sebelum menandai lesson selesai (FR-06-003).",
        },
        { status: 400 }
      );
    }

    const result = await recordLessonProgress({
      userId: body.userId,
      lessonSlug: slug,
      status: "completed",
    });

    return NextResponse.json(
      {
        ok: true,
        message: "Pelajaran berhasil diselesaikan! Evidence terekam ke ledger.",
        status: result.status,
        evidence: {
          type: "checkpoint-passed",
          level: 1,
          recordedAt: new Date().toISOString(),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message: "Gagal mencatat penyelesaian lesson.",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
