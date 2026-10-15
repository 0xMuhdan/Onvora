"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { typeClass, fieldTouchClass } from "@/lib/type-scale";
import { cn } from "@/lib/utils";
import { Coffee, MessageCircle, Send, CheckCircle2, Sparkles, MapPin } from "lucide-react";

export interface CommunityWaitlistModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultChannel?: "whatsapp" | "telegram";
  defaultInterest?: string;
}

const CITIES = [
  "Tasikmalaya",
  "Jakarta & Sekitarnya",
  "Bandung",
  "Surabaya",
  "Yogyakarta",
  "Bali",
  "Semarang",
  "Malang",
  "Kota Lainnya",
];

const INTEREST_OPTIONS = [
  { id: "airdrop", label: "Airdrop & Testnet Alpha" },
  { id: "liquidity", label: "DeFi & Liquidity (DLMM/AMM)" },
  { id: "trading", label: "Trading (Spot, Futures & Arbitrage)" },
  { id: "coding", label: "Coding Smart Contract & Dev" },
  { id: "depin_gamefi", label: "DePIN & GameFi" },
];

export function CommunityWaitlistModal({
  open,
  onOpenChange,
  defaultChannel = "whatsapp",
  defaultInterest,
}: CommunityWaitlistModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [city, setCity] = useState("Tasikmalaya");
  const [channel, setChannel] = useState<"whatsapp" | "telegram">(defaultChannel);
  const [selectedInterests, setSelectedInterests] = useState<string[]>(
    defaultInterest ? [defaultInterest] : ["airdrop", "liquidity"]
  );

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [responseMsg, setResponseMsg] = useState("");

  function toggleInterest(id: string) {
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setResponseMsg("");

    try {
      const res = await fetch("/api/community/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          contact,
          city,
          channelPreference: channel,
          interests: selectedInterests,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.ok) {
        setStatus("error");
        setResponseMsg(data.message || "Gagal mendaftar ke waiting list.");
      } else {
        setStatus("success");
        setResponseMsg(data.message);
      }
    } catch {
      setStatus("error");
      setResponseMsg("Koneksi gagal. Pastikan jaringan internet Anda aktif.");
    }
  }

  function handleClose() {
    onOpenChange(false);
    // Reset state after closing animation
    setTimeout(() => {
      setStatus("idle");
      setResponseMsg("");
    }, 250);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg border border-white/10 bg-[#0c0d10] p-6 sm:p-8 text-[#f7f8f8] shadow-2xl backdrop-blur-2xl">
        {status === "success" ? (
          <div className="py-6 text-center animate-in fade-in duration-300">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
              <CheckCircle2 className="h-8 w-8" />
            </div>

            <h3 className={cn("mt-4 font-bold text-white tracking-tight", typeClass("title"))}>
              Kamu Resmi Masuk Waiting List!
            </h3>

            <p className={cn("mt-2 text-neutral-300 leading-relaxed max-w-sm mx-auto", typeClass("body"))}>
              {responseMsg}
            </p>

            <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.02] p-4 text-left">
              <div className="flex items-center gap-2 text-neutral-400 font-mono text-xs">
                <Coffee className="h-4 w-4 text-[#5e6ad2]" />
                <span>Format Meetup: <strong>BFC (Build From Cafe)</strong></span>
              </div>
              <p className="mt-1 text-xs text-neutral-500">
                Lokasi cafe terpilih di kota <strong>{city}</strong> akan dikabarkan via {channel === "whatsapp" ? "WhatsApp" : "Telegram"} begitu grup Batch 01 dibuka.
              </p>
            </div>

            <div className="mt-6">
              <button
                type="button"
                onClick={handleClose}
                className={cn(
                  "rounded-full bg-white px-7 py-2.5 font-semibold text-black hover:bg-neutral-200 transition-colors",
                  typeClass("caption")
                )}
              >
                Tutup &amp; Kembali
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <DialogHeader>
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className={cn("font-mono text-[#5e6ad2] font-semibold uppercase tracking-wider", typeClass("micro"))}>
                  Batch 01 Waiting List // BFC Community
                </span>
              </div>
              <DialogTitle className={cn("mt-1.5 font-bold text-white tracking-tight", typeClass("title"))}>
                Gabung Komunitas Onvora &amp; Ngopi Bareng
              </DialogTitle>
              <DialogDescription className={cn("mt-1 text-neutral-400", typeClass("caption"))}>
                Masukkan kontak Anda. Begitu kuota grup dibuka, Anda akan langsung menerima tautan undangan privat WhatsApp/Telegram &amp; info lokasi cafe pertama.
              </DialogDescription>
            </DialogHeader>

            {/* Platform Preference Selector */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                type="button"
                onClick={() => setChannel("whatsapp")}
                className={cn(
                  "flex items-center justify-center gap-2 rounded-xl border py-2.5 font-medium transition-all text-xs",
                  channel === "whatsapp"
                    ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-400 font-semibold"
                    : "border-white/10 bg-white/[0.02] text-neutral-400 hover:text-white hover:bg-white/5"
                )}
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp Group
              </button>
              <button
                type="button"
                onClick={() => setChannel("telegram")}
                className={cn(
                  "flex items-center justify-center gap-2 rounded-xl border py-2.5 font-medium transition-all text-xs",
                  channel === "telegram"
                    ? "border-sky-500/50 bg-sky-500/10 text-sky-400 font-semibold"
                    : "border-white/10 bg-white/[0.02] text-neutral-400 hover:text-white hover:bg-white/5"
                )}
              >
                <Send className="h-4 w-4" />
                Telegram Channel
              </button>
            </div>

            {/* Email (Required) */}
            <div>
              <label htmlFor="wl-email" className={cn("block text-neutral-300 font-medium mb-1", typeClass("caption"))}>
                Email <span className="text-red-400">*</span>
              </label>
              <input
                id="wl-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@gmail.com"
                className={cn(
                  "w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-white placeholder:text-neutral-500 focus:outline-hidden focus:border-[#5e6ad2]",
                  typeClass("body"),
                  fieldTouchClass
                )}
              />
            </div>

            {/* Name & Contact Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="wl-name" className={cn("block text-neutral-300 font-medium mb-1", typeClass("caption"))}>
                  Nama / Nickname
                </label>
                <input
                  id="wl-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Misal: Alex"
                  className={cn(
                    "w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-white placeholder:text-neutral-500 focus:outline-hidden focus:border-[#5e6ad2]",
                    typeClass("body"),
                    fieldTouchClass
                  )}
                />
              </div>

              <div>
                <label htmlFor="wl-contact" className={cn("block text-neutral-300 font-medium mb-1", typeClass("caption"))}>
                  {channel === "whatsapp" ? "Nomor WhatsApp" : "Username Telegram"}
                </label>
                <input
                  id="wl-contact"
                  type="text"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder={channel === "whatsapp" ? "0812xxxxxx" : "@username"}
                  className={cn(
                    "w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-white placeholder:text-neutral-500 focus:outline-hidden focus:border-[#5e6ad2]",
                    typeClass("body"),
                    fieldTouchClass
                  )}
                />
              </div>
            </div>

            {/* City Selection */}
            <div>
              <label htmlFor="wl-city" className={cn("block text-neutral-300 font-medium mb-1", typeClass("caption"))}>
                Kota Domisili (Untuk Ngopi / BFC Offline):
              </label>
              <select
                id="wl-city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className={cn(
                  "w-full rounded-xl border border-white/10 bg-[#08090a] px-3.5 py-2.5 text-white focus:outline-hidden focus:border-[#5e6ad2]",
                  typeClass("caption"),
                  fieldTouchClass
                )}
              >
                {CITIES.map((c) => (
                  <option key={c} value={c} className="bg-[#08090a] text-white">
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Interests Checkbox */}
            <div>
              <label className={cn("block text-neutral-300 font-medium mb-1.5", typeClass("caption"))}>
                Topik yang Paling Ingin Kamu Ikuti:
              </label>
              <div className="flex flex-wrap gap-1.5">
                {INTEREST_OPTIONS.map((item) => {
                  const isChecked = selectedInterests.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggleInterest(item.id)}
                      className={cn(
                        "rounded-full px-3 py-1 font-mono transition-all text-[11px]",
                        isChecked
                          ? "border border-[#5e6ad2] bg-[#5e6ad2]/20 text-white font-semibold"
                          : "border border-white/10 bg-white/[0.02] text-neutral-400 hover:text-white hover:border-white/20"
                      )}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {status === "error" && (
              <p className={cn("rounded-xl border border-red-500/30 bg-red-500/10 px-3.5 py-2 text-red-400", typeClass("caption"))}>
                {responseMsg}
              </p>
            )}

            <DialogFooter className="pt-2">
              <button
                type="submit"
                disabled={status === "loading"}
                className={cn(
                  "w-full rounded-full bg-white py-3 font-semibold text-black hover:bg-neutral-200 transition-all shadow-md disabled:opacity-50 inline-flex items-center justify-center gap-2",
                  typeClass("caption")
                )}
              >
                <Sparkles className="h-4 w-4" />
                {status === "loading" ? "Mendaftarkan..." : "Daftar Waiting List Sekarang"}
              </button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
