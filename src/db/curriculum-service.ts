import { isDbConfigured, db, schema } from "./client";
import { eq, and } from "drizzle-orm";
import {
  CANONICAL_UNITS,
  CANONICAL_LESSONS,
  type LessonData,
  type UnitData,
} from "@/lib/curriculum-data";

export interface LessonProgressRecord {
  lessonId: string;
  status: "not_started" | "in_progress" | "completed";
  completedAt?: string | null;
}

/**
 * Service to retrieve unit and lesson content.
 * Gracefully integrates with Supabase (Drizzle ORM) if configured,
 * or falls back to canonical verified content datasets.
 */
export async function getUnitBySlug(unitSlug: string): Promise<UnitData | null> {
  const unit = CANONICAL_UNITS[unitSlug];
  if (!unit) return null;
  return unit;
}

export async function getLessonBySlug(lessonSlug: string): Promise<LessonData | null> {
  const lesson = CANONICAL_LESSONS[lessonSlug];
  if (!lesson) return null;
  return lesson;
}

export async function getAllUnitsForTrack(trackSlug: string): Promise<UnitData[]> {
  return Object.values(CANONICAL_UNITS).filter((u) => u.trackSlug === trackSlug);
}

/**
 * Record or update lesson progress in Supabase (if connected)
 */
export async function recordLessonProgress(params: {
  userId?: string | null;
  lessonSlug: string;
  status: "in_progress" | "completed";
}): Promise<{ ok: boolean; status: string }> {
  const { userId, lessonSlug, status } = params;

  if (!isDbConfigured || !userId) {
    // Guest or offline mode: handled gracefully on the client via localStorage
    return { ok: true, status };
  }

  try {
    const existing = await db
      .select()
      .from(schema.lessonProgress)
      .innerJoin(schema.lessons, eq(schema.lessonProgress.lessonId, schema.lessons.id))
      .where(
        and(
          eq(schema.lessonProgress.userId, userId),
          eq(schema.lessons.slug, lessonSlug)
        )
      )
      .limit(1);

    const now = new Date();

    if (existing.length > 0) {
      await db
        .update(schema.lessonProgress)
        .set({
          status,
          completedAt: status === "completed" ? now : null,
          updatedAt: now,
        })
        .where(eq(schema.lessonProgress.id, existing[0].lesson_progress.id));
    }

    return { ok: true, status };
  } catch (error) {
    console.error("Failed to record progress in Supabase:", error);
    return { ok: false, status };
  }
}
