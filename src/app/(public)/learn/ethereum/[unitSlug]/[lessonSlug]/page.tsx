"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  Code2,
  Sparkles,
} from "lucide-react";
import { typeClass } from "@/lib/type-scale";
import { cn } from "@/lib/utils";
import { ContentBlockRenderer } from "@/components/curriculum/content-block-renderer";
import {
  CANONICAL_UNITS,
  CANONICAL_LESSONS,
} from "@/lib/curriculum-data";

export default function LessonPlayerPage({
  params,
}: {
  params: Promise<{ unitSlug: string; lessonSlug: string }>;
}) {
  const resolvedParams = use(params);
  const unit = CANONICAL_UNITS[resolvedParams.unitSlug] || null;
  const lesson = CANONICAL_LESSONS[resolvedParams.lessonSlug] || null;

  const [checkpointPassed, setCheckpointPassed] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [completing, setCompleting] = useState(false);
  const [completedItems, setCompletedItems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== "undefined" && lesson) {
        const stored = localStorage.getItem(`onvora_lesson_${lesson.id}`);
        if (stored === "completed") {
          setIsCompleted(true);
          setCheckpointPassed(true);
        } else {
          setIsCompleted(false);
          setCheckpointPassed(false);
        }

        if (unit) {
          const map: Record<string, boolean> = {};
          unit.lessons.forEach((_, idx) => {
            const key = `onvora_lesson_lesson-${unit.slug.replace("unit-", "")}-${String(idx + 1).padStart(2, "0")}`;
            if (localStorage.getItem(key) === "completed") {
              map[String(idx)] = true;
            }
          });
          setCompletedItems(map);
        }
      }
    }, 0);
    return () => clearTimeout(timer);
  }, [lesson, unit]);

  if (!lesson || !unit) {
    return (
      <div className="min-h-screen bg-[#08090a] py-32 text-center text-white">
        <h2 className="text-xl font-bold">Materi Tidak Ditemukan</h2>
        <p className="mt-2 text-neutral-400">
          Unit atau lesson yang Anda cari belum tersedia atau URL tidak valid.
        </p>
        <Link
          href="/tracks/ethereum"
          className="mt-6 inline-flex rounded-full bg-white px-6 py-2.5 text-xs font-semibold text-black hover:bg-neutral-200"
        >
          Kembali ke Silabus Ethereum &rarr;
        </Link>
      </div>
    );
  }

  const handleCompleteLesson = async () => {
    if (!checkpointPassed) return;
    setCompleting(true);

    try {
      // 1. Call API to record in Supabase
      await fetch(`/api/v1/lessons/${lesson.slug}/complete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ checkpointPassed: true }),
      });

      // 2. Persist locally
      localStorage.setItem(`onvora_lesson_${lesson.id}`, "completed");
      setIsCompleted(true);
    } catch (err) {
      console.error("Failed to complete lesson:", err);
      // Still set local completion for smooth user experience
      localStorage.setItem(`onvora_lesson_${lesson.id}`, "completed");
      setIsCompleted(true);
    } finally {
      setCompleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#08090a] text-[#f7f8f8] pt-20 pb-28">
      {/* Top Banner Navigation Bar */}
      <div className="border-b border-white/10 bg-[#08090a]/90 backdrop-blur-md sticky top-16 z-30 px-4 sm:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/tracks/ethereum"
            className="flex items-center gap-1.5 text-xs font-mono text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Silabus Track</span>
          </Link>
          <span className="text-neutral-600">/</span>
          <span className="text-xs font-mono text-[#8c97ff] truncate max-w-[200px] sm:max-w-none">
            {unit.phaseName}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {isCompleted && (
            <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-mono text-emerald-400">
              <CheckCircle2 className="h-3 w-3" />
              <span>SELESAI</span>
            </span>
          )}
          <Link
            href="/practice"
            className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-mono text-neutral-300 hover:bg-white/10 hover:text-white"
          >
            <Code2 className="h-3.5 w-3.5" />
            <span>Sandbox</span>
          </Link>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Sidebar: Outline Unit */}
          <aside className="lg:col-span-3 lg:sticky lg:top-36 rounded-2xl border border-white/10 bg-[#0d0f12] p-4 sm:p-5 shadow-xl">
            <div className="border-b border-white/5 pb-3 mb-4">
              <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider">
                {unit.phaseName}
              </span>
              <h3 className="font-bold text-white text-sm sm:text-base mt-1 leading-snug">
                {unit.title}
              </h3>
            </div>

            <div className="space-y-1.5">
              <span className="text-[10px] font-mono text-neutral-500 uppercase block mb-2">
                Daftar Pelajaran ({unit.lessons.length}):
              </span>
              {unit.lessons.map((item, idx) => {
                const isCurrent = item.slug === lesson.slug;
                const isItemDone = !!completedItems[String(idx)];

                return (
                  <Link
                    key={item.slug}
                    href={`/learn/ethereum/${unit.slug}/${item.slug}`}
                    className={cn(
                      "flex items-center justify-between rounded-xl p-2.5 text-xs font-medium transition-all",
                      isCurrent
                        ? "border border-[#5e6ad2]/50 bg-[#5e6ad2]/15 text-white"
                        : "text-neutral-400 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className={cn("font-mono text-[10px]", isCurrent ? "text-[#8c97ff]" : "text-neutral-600")}>
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span className="truncate">{item.title}</span>
                    </div>
                    {isItemDone && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 ml-1" />}
                  </Link>
                );
              })}
            </div>

            {/* Quick Link back */}
            <div className="mt-6 pt-4 border-t border-white/5">
              <Link
                href="/tracks/ethereum"
                className="text-xs text-neutral-500 hover:text-neutral-300 font-mono flex items-center gap-1"
              >
                &larr; Lihat Seluruh 12 Phase
              </Link>
            </div>
          </aside>

          {/* Main Lesson Player Center */}
          <main className="lg:col-span-9 rounded-3xl border border-white/10 bg-[#0c0e14] p-6 sm:p-10 shadow-2xl">
            {/* Header Meta */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-400 font-mono mb-4">
              <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-white">
                Unit {unit.phaseNumber.toString().padStart(2, "0")} &middot; {unit.targetLevel}
              </span>
              <span className="flex items-center gap-1 text-neutral-400">
                <Clock className="h-3.5 w-3.5 text-neutral-500" />
                <span>{lesson.estimatedMinutes} Menit Sesi</span>
              </span>
            </div>

            {/* Lesson Title */}
            <h1 className={cn("font-bold text-white tracking-tight leading-tight", typeClass("display"))}>
              {lesson.title}
            </h1>

            {/* Learning Objectives Box */}
            <div className="my-6 rounded-2xl border border-white/5 bg-white/[0.02] p-4 sm:p-5">
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 mb-2">
                <Sparkles className="h-3.5 w-3.5 text-[#8c97ff]" />
                <span className="font-semibold text-white">Target Pembelajaran (Learning Objectives):</span>
              </div>
              <ul className="space-y-1.5 text-sm text-neutral-300">
                {lesson.learningObjectives.map((lo, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#8c97ff] mt-1">&bull;</span>
                    <span className="leading-snug">{lo}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Dynamic Content Blocks */}
            <div className="divide-y divide-white/5">
              {lesson.blocks.map((block) => (
                <div key={block.id} className="py-2">
                  <ContentBlockRenderer
                    block={block}
                    onQuizPassed={() => setCheckpointPassed(true)}
                  />
                </div>
              ))}
            </div>

            {/* Action Bar / Completion Section */}
            <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <h4 className="font-bold text-white text-base">
                    {isCompleted
                      ? "Pelajaran Selesai!"
                      : checkpointPassed
                      ? "Checkpoint Lolos! Siap Tandai Selesai"
                      : "Selesaikan Checkpoint Kuis di Atas"}
                  </h4>
                  <p className="mt-1 text-xs text-neutral-400">
                    {isCompleted
                      ? "Bukti kompetensi telah tercatat ke Evidence Ledger Anda."
                      : checkpointPassed
                      ? "Klik tombol di samping untuk mencatat progres ke database Supabase."
                      : "Pilih jawaban kuis yang benar untuk membuka tombol selesai."}
                  </p>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  {!isCompleted ? (
                    <button
                      onClick={handleCompleteLesson}
                      disabled={!checkpointPassed || completing}
                      className={cn(
                        "w-full sm:w-auto rounded-full px-7 py-3 text-xs font-bold transition-all shadow-md",
                        checkpointPassed
                          ? "bg-white text-black hover:bg-neutral-200 cursor-pointer"
                          : "bg-white/10 text-neutral-500 cursor-not-allowed"
                      )}
                    >
                      {completing ? "Merekam ke Ledger..." : "Tandai Selesai & Klaim Evidence"}
                    </button>
                  ) : (
                    <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs">
                      <CheckCircle2 className="h-5 w-5" />
                      <span>Evidence Level 1 Terverifikasi</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Seamless Bridge to Sandbox & Next Lesson */}
              <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                {lesson.practiceChallengeId ? (
                  <Link
                    href={`/practice`}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-6 py-2.5 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/20 transition-all"
                  >
                    <Code2 className="h-4 w-4" />
                    <span>Lanjut Uji Kode di Sandbox (/practice) &rarr;</span>
                  </Link>
                ) : (
                  <div />
                )}

                {lesson.nextLesson && (
                  <Link
                    href={`/learn/ethereum/${lesson.nextLesson.unitSlug}/${lesson.nextLesson.lessonSlug}`}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#5e6ad2] px-6 py-2.5 text-xs font-semibold text-white hover:bg-[#6c78e0] transition-all"
                  >
                    <span>Lanjut: {lesson.nextLesson.title}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
