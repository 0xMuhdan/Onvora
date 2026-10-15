import Link from "next/link";
import { DiagnosticFlow } from "@/components/diagnostic-flow";
import { typeClass } from "@/lib/type-scale";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Builder Diagnostic & Route - Onvora",
  description: "Tentukan titik awal kurikulum dan roadmap belajar Web3 berdasarkan pengalaman riil Anda.",
};

export default function DiagnosticPage() {
  return (
    <div className="w-full bg-[#08090a] py-24 sm:py-28 text-[#f7f8f8] min-h-[calc(100dvh-5rem)] flex flex-col justify-center">
      <div className="mx-auto w-full max-w-[860px] px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Header */}
        <div className={cn("flex items-center gap-2 text-neutral-400 mb-6", typeClass("caption"))}>
          <Link href="/tracks" className="hover:text-white transition-colors">
            Tracks
          </Link>
          <span>/</span>
          <span className="text-white font-medium">Builder Diagnostic (Phase 00)</span>
        </div>

        {/* Diagnostic Component Powered by Fluid Functionalism AskUserQuestions */}
        <DiagnosticFlow />
      </div>
    </div>
  );
}
