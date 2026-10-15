"use client";

import { use } from "react";
import { getCredentialByCode } from "@/lib/evidence-service";
import { VisualCertificate } from "@/components/certificate/visual-certificate";

export default function CertificatePage({
  params,
}: {
  params: Promise<{ credentialId: string }>;
}) {
  const resolvedParams = use(params);
  const credential = getCredentialByCode(resolvedParams.credentialId);

  return (
    <div className="w-full bg-[#08090a] py-16 sm:py-24 text-[#f7f8f8] min-h-screen flex flex-col items-center justify-center px-4 sm:px-6">
      <VisualCertificate credential={credential} />
    </div>
  );
}
