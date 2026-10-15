import React from "react";
import { EncryptedText } from "@/components/ui/encrypted-text";

export default function EncryptedTextDemoSecond() {
  return (
    <p className="mx-auto max-w-lg py-10 text-left">
      <EncryptedText
        text="Bangun kemampuanmu lewat praktik terarah dan buktikan hasilnya dengan kode nyata. Mulai dari dasar logika, susun smart contract mandiri, dan miliki portofolio yang diakui industri."
        encryptedClassName="text-neutral-500 font-mono"
        revealedClassName="text-ink-secondary"
        revealDelayMs={25}
      />
    </p>
  );
}
