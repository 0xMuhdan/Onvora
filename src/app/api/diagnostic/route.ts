import { NextResponse } from "next/server";
import { ANALYTICS_EVENTS } from "@/modules/analytics/event-catalog";

const DIAGNOSTIC_QUESTIONS = [
  {
    id: "q1",
    question: "Apa pengalaman pemrograman Anda sebelum ini?",
    options: [
      { id: "opt_none", label: "Belum pernah menulis kode sama sekali.", recommendedPhase: 0 },
      { id: "opt_web2", label: "Familiar dengan JavaScript/TypeScript atau Python (Web2).", recommendedPhase: 1 },
      { id: "opt_solidity", label: "Pernah mencoba Solidity dasar atau kontrak ERC-20.", recommendedPhase: 2 },
      { id: "opt_security", label: "Berpengalaman deploy dApp dan ingin mendalami Security & Audit.", recommendedPhase: 5 },
    ],
  },
  {
    id: "q2",
    question: "Bagaimana pemahaman Anda tentang konsep blockchain & State Machine?",
    options: [
      { id: "opt_b1", label: "Baru mendengar istilah desentralisasi dan gas fee.", weight: 0 },
      { id: "opt_b2", label: "Paham cara kerja transaksi, blok, dan hash kriptografi.", weight: 1 },
      { id: "opt_b3", label: "Memahami EVM execution, storage layout, dan bytecode opcode.", weight: 2 },
    ],
  },
];

export async function GET() {
  return NextResponse.json({
    version: 1,
    questions: DIAGNOSTIC_QUESTIONS,
  });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { answers?: Record<string, string> };
    const answers = body?.answers ?? {};

    let startPhase = 0;
    let reason = "Mulai dari fondasi dasar pola pikir Web3 dan mental model terdesentralisasi.";

    if (answers.q1 === "opt_solidity") {
      startPhase = 2;
      reason = "Anda memiliki dasar bahasa Solidity. Melompati fase pengenalan lingkungan dev dasar ke fase pengujian mendalam.";
    } else if (answers.q1 === "opt_security") {
      startPhase = 5;
      reason = "Jalur cepat: langsung menuju fase Smart Contract Security, Attack Vectors, dan Audit Simulation.";
    } else if (answers.q1 === "opt_web2") {
      startPhase = 1;
      reason = "Pengalaman Web2 memudahkan adaptasi sintaks. Fokus pada paradigma EVM dan asynchronous state.";
    }

    const eventPayload = {
      name: ANALYTICS_EVENTS.diagnostic[0], // "diagnostic.completed"
      properties: {
        startPhase,
        reason,
      },
      occurredAt: new Date().toISOString(),
    };

    return NextResponse.json({
      ok: true,
      startPhase,
      startUnitSlug: `phase-${String(startPhase).padStart(2, "0")}`,
      narrativeSummary: `Rekomendasi titik awal: Phase ${String(startPhase).padStart(2, "0")}`,
      reason,
      event: eventPayload,
    });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Diagnostic evaluation failed" },
      { status: 500 },
    );
  }
}
