"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  User,
  Camera,
  Globe,
  Send,
  ArrowLeft,
  Save,
  CheckCircle2,
} from "lucide-react";
import { typeClass } from "@/lib/type-scale";
import { cn } from "@/lib/utils";
import { generateCredentialId } from "@/lib/evidence-service";

function InstagramIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}

function GithubIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
      <path d="M9 18c-4.51 2-5-2-7-2"/>
    </svg>
  );
}

interface UserProfileData {
  displayName: string;
  email: string;
  username: string;
  avatarUrl: string;
  bio: string;
  targetRole: string;
  availability: "open_to_collaborate" | "open_to_opportunity" | "busy";
  xHandle: string;
  instagramHandle: string;
  githubHandle: string;
  websiteUrl: string;
  telegramHandle: string;
}

const PRESET_AVATARS = [
  { id: "deploy", label: "Protocol Deployer", src: "/assets/brand/builder-deploy.png" },
  { id: "coding", label: "Smart Contract Coder", src: "/assets/brand/builder-coding.png" },
  { id: "verified", label: "Audited & Verified", src: "/assets/brand/builder-verified.png" },
  { id: "debugging", label: "Security Auditor", src: "/assets/brand/builder-debugging.png" },
  { id: "learning", label: "EVM Learner", src: "/assets/brand/builder-learning.png" },
];

export default function ProfilePage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profile, setProfile] = useState<UserProfileData>({
    displayName: "Muhdan",
    email: "muhdan@gmail.com",
    username: "muhdan.onvora.eth",
    avatarUrl: "/assets/brand/builder-verified.png",
    bio: "Fullstack EVM & Smart Contract Developer berfokus pada protokol DeFi, audit Foundry, dan arsitektur token modern.",
    targetRole: "Junior Smart Contract Engineer",
    availability: "open_to_opportunity",
    xHandle: "muhdan_eth",
    instagramHandle: "muhdan.dev",
    githubHandle: "muhdan",
    websiteUrl: "https://muhdan.onvora.eth",
    telegramHandle: "muhdan_builder",
  });

  const [savedNotification, setSavedNotification] = useState(false);
  const [credentialId, setCredentialId] = useState("ONV-ETH-Y4ZTH");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== "undefined") {
        const storedEmail = localStorage.getItem("onvora_user_email") || "muhdan@gmail.com";
        const storedProfile = localStorage.getItem("onvora_user_profile");
        const storedName = localStorage.getItem("onvora_user_name");
        const storedAvatar = localStorage.getItem("onvora_user_avatar");

        setCredentialId(generateCredentialId(storedEmail));

        if (storedProfile) {
          try {
            const parsed = JSON.parse(storedProfile);
            setProfile(parsed);
            return;
          } catch {
            // ignore
          }
        }

        // Default profile for muhdan@gmail.com or other users
        const defaultName = storedName || (storedEmail === "muhdan@gmail.com" ? "Muhdan" : storedEmail.split("@")[0]);
        setProfile((prev) => ({
          ...prev,
          email: storedEmail,
          displayName: defaultName,
          username: `${storedEmail.split("@")[0]}.onvora.eth`,
          avatarUrl: storedAvatar || (storedEmail === "muhdan@gmail.com" ? "/assets/brand/builder-verified.png" : prev.avatarUrl),
        }));
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size < 2MB
    if (file.size > 2 * 1024 * 1024) {
      alert("Ukuran gambar maksimal 2MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      setProfile((prev) => ({ ...prev, avatarUrl: base64 }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (typeof window !== "undefined") {
      localStorage.setItem("onvora_user_profile", JSON.stringify(profile));
      localStorage.setItem("onvora_user_name", profile.displayName);
      localStorage.setItem("onvora_user_avatar", profile.avatarUrl);

      // Trigger storage event so masthead navbar updates avatar and name immediately
      window.dispatchEvent(new Event("storage"));
    }

    setSavedNotification(true);
    setTimeout(() => setSavedNotification(false), 3000);
  };

  return (
    <div className="w-full bg-[#08090a] py-24 sm:py-28 text-[#f7f8f8] min-h-screen">
      <div className="mx-auto w-full max-w-[1180px] px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Header */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <Link
            href="/passport"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Kembali ke Builder Passport</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-0.5 text-xs font-mono text-emerald-400 font-bold">
              ID: {credentialId}
            </span>
          </div>
        </div>

        {/* Page Title */}
        <div className="mb-10">
          <h1 className={cn("font-bold text-white tracking-tight leading-tight", typeClass("display"))}>
            Pengaturan Profil Builder
          </h1>
          <p className={cn("mt-2 text-neutral-400 max-w-2xl", typeClass("body"))}>
            Personalisasi profil Anda dengan foto, bio spesialisasi, tautan media sosial (X, Instagram, GitHub), dan status ketersediaan proyek.
          </p>
        </div>

        {/* Saved Alert Toast */}
        {savedNotification && (
          <div className="mb-8 rounded-2xl border border-emerald-500/40 bg-emerald-500/15 p-4 text-emerald-300 font-mono text-xs flex items-center justify-between animate-in fade-in duration-200">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-400" />
              <span>Profil Anda berhasil disimpan dan disinkronkan ke seluruh platform!</span>
            </div>
            <Link href="/passport" className="underline font-bold text-white hover:text-emerald-200">
              Lihat di Passport &rarr;
            </Link>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form Edit */}
          <form onSubmit={handleSave} className="lg:col-span-8 space-y-8">
            {/* Section 1: Photo & Basic Identity */}
            <div className="rounded-3xl border border-white/10 bg-[#0c0d12] p-6 sm:p-8 shadow-xl">
              <h2 className="text-base font-bold text-white mb-6 flex items-center gap-2 border-b border-white/5 pb-3">
                <User className="h-4 w-4 text-[#8c97ff]" />
                <span>Foto Profil &amp; Identitas Dasar</span>
              </h2>

              {/* Avatar Selector Area */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
                <div className="relative group">
                  <div className="relative h-24 w-24 sm:h-28 sm:w-28 rounded-2xl overflow-hidden border-2 border-[#5e6ad2]/50 bg-black/50 p-1 shadow-2xl flex items-center justify-center">
                    {profile.avatarUrl ? (
                      <Image
                        src={profile.avatarUrl}
                        alt="Profile Avatar"
                        width={100}
                        height={100}
                        className="h-full w-full object-cover rounded-xl"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center rounded-xl bg-gradient-to-tr from-[#5e6ad2] to-emerald-400 text-3xl font-bold font-mono text-white">
                        {profile.displayName.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#5e6ad2] text-white shadow-lg hover:bg-[#6c78e0] transition-colors cursor-pointer"
                    title="Upload foto dari komputer"
                  >
                    <Camera className="h-4 w-4" />
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>

                <div className="flex-1 space-y-2">
                  <div className="text-xs font-mono text-neutral-300 font-bold">Pilih Avatar atau Upload Foto:</div>
                  <div className="flex flex-wrap items-center gap-2">
                    {PRESET_AVATARS.map((preset) => (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => setProfile((prev) => ({ ...prev, avatarUrl: preset.src }))}
                        className={cn(
                          "flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-mono transition-all cursor-pointer",
                          profile.avatarUrl === preset.src
                            ? "border-emerald-500 bg-emerald-500/20 text-emerald-300 font-bold"
                            : "border-white/10 bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10"
                        )}
                      >
                        <span>{preset.label}</span>
                      </button>
                    ))}
                  </div>
                  <p className="text-[11px] text-neutral-500 font-mono">
                    Format: PNG, JPG, GIF atau WebP (Maksimal 2MB).
                  </p>
                </div>
              </div>

              {/* Name & Handle Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-neutral-300 mb-1.5">
                    Nama Lengkap / Tampilan:
                  </label>
                  <input
                    type="text"
                    value={profile.displayName}
                    onChange={(e) => setProfile((prev) => ({ ...prev, displayName: e.target.value }))}
                    placeholder="Nama Anda"
                    required
                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:border-[#5e6ad2] focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-300 mb-1.5">
                    Username On-Chain:
                  </label>
                  <input
                    type="text"
                    value={profile.username}
                    onChange={(e) => setProfile((prev) => ({ ...prev, username: e.target.value }))}
                    placeholder="username.onvora.eth"
                    required
                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:border-[#5e6ad2] focus:outline-none font-mono"
                  />
                </div>
              </div>

              {/* Email (Readonly Google Auth) */}
              <div className="mt-4">
                <label className="block text-xs font-mono text-neutral-400 mb-1.5">
                  Email Akun Terdaftar (Google):
                </label>
                <input
                  type="email"
                  value={profile.email}
                  disabled
                  className="w-full rounded-xl border border-white/5 bg-white/[0.015] px-4 py-2.5 text-sm text-neutral-400 font-mono cursor-not-allowed"
                />
              </div>

              {/* Bio Field */}
              <div className="mt-4">
                <label className="block text-xs font-mono text-neutral-300 mb-1.5">
                  Bio Profil (Deskripsi Diri &amp; Keahlian):
                </label>
                <textarea
                  rows={3}
                  value={profile.bio}
                  onChange={(e) => setProfile((prev) => ({ ...prev, bio: e.target.value }))}
                  placeholder="Tuliskan bio singkat mengenai spesialisasi teknis atau fokus Web3 Anda..."
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] p-3 text-sm text-white placeholder-neutral-500 focus:border-[#5e6ad2] focus:outline-none leading-relaxed"
                />
              </div>

              {/* Target Role & Availability */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-xs font-mono text-neutral-300 mb-1.5">
                    Peran Impian (Target Role):
                  </label>
                  <input
                    type="text"
                    value={profile.targetRole}
                    onChange={(e) => setProfile((prev) => ({ ...prev, targetRole: e.target.value }))}
                    placeholder="misal: Junior Smart Contract Engineer"
                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:border-[#5e6ad2] focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-300 mb-1.5">
                    Status Ketersediaan:
                  </label>
                  <select
                    value={profile.availability}
                    onChange={(e) => setProfile((prev) => ({ ...prev, availability: e.target.value as UserProfileData["availability"] }))}
                    className="w-full rounded-xl border border-white/10 bg-[#0c0d12] px-4 py-2.5 text-sm text-white focus:border-[#5e6ad2] focus:outline-none font-mono"
                  >
                    <option value="open_to_opportunity">Open to Opportunity (Siap Kerja)</option>
                    <option value="open_to_collaborate">Open to Collaborate (Mencari Tim)</option>
                    <option value="busy">Busy Building (Fokus Belajar)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 2: Social Media & Networking Links */}
            <div className="rounded-3xl border border-white/10 bg-[#0c0d12] p-6 sm:p-8 shadow-xl">
              <h2 className="text-base font-bold text-white mb-6 flex items-center gap-2 border-b border-white/5 pb-3">
                <Globe className="h-4 w-4 text-[#ffd978]" />
                <span>Media Sosial &amp; Jejaring Pengembang</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* X / Twitter */}
                <div>
                  <label className="block text-xs font-mono text-neutral-300 mb-1.5 flex items-center gap-1.5">
                    <span className="font-bold">𝕏</span>
                    <span>X / Twitter Handle:</span>
                  </label>
                  <div className="flex items-center rounded-xl border border-white/10 bg-white/[0.03] px-3">
                    <span className="text-neutral-500 font-mono text-xs">@</span>
                    <input
                      type="text"
                      value={profile.xHandle}
                      onChange={(e) => setProfile((prev) => ({ ...prev, xHandle: e.target.value.replace(/^@/, "") }))}
                      placeholder="username"
                      className="w-full bg-transparent px-2 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none font-mono"
                    />
                  </div>
                </div>

                {/* Instagram */}
                <div>
                  <label className="block text-xs font-mono text-neutral-300 mb-1.5 flex items-center gap-1.5">
                    <InstagramIcon className="h-3.5 w-3.5 text-pink-400" />
                    <span>Instagram Handle:</span>
                  </label>
                  <div className="flex items-center rounded-xl border border-white/10 bg-white/[0.03] px-3">
                    <span className="text-neutral-500 font-mono text-xs">@</span>
                    <input
                      type="text"
                      value={profile.instagramHandle}
                      onChange={(e) => setProfile((prev) => ({ ...prev, instagramHandle: e.target.value.replace(/^@/, "") }))}
                      placeholder="username"
                      className="w-full bg-transparent px-2 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none font-mono"
                    />
                  </div>
                </div>

                {/* GitHub */}
                <div>
                  <label className="block text-xs font-mono text-neutral-300 mb-1.5 flex items-center gap-1.5">
                    <GithubIcon className="h-3.5 w-3.5 text-neutral-300" />
                    <span>GitHub Username:</span>
                  </label>
                  <div className="flex items-center rounded-xl border border-white/10 bg-white/[0.03] px-3">
                    <span className="text-neutral-500 font-mono text-xs">github.com/</span>
                    <input
                      type="text"
                      value={profile.githubHandle}
                      onChange={(e) => setProfile((prev) => ({ ...prev, githubHandle: e.target.value }))}
                      placeholder="username"
                      className="w-full bg-transparent px-2 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none font-mono"
                    />
                  </div>
                </div>

                {/* Telegram / Discord */}
                <div>
                  <label className="block text-xs font-mono text-neutral-300 mb-1.5 flex items-center gap-1.5">
                    <Send className="h-3.5 w-3.5 text-blue-400" />
                    <span>Telegram / Contact:</span>
                  </label>
                  <div className="flex items-center rounded-xl border border-white/10 bg-white/[0.03] px-3">
                    <span className="text-neutral-500 font-mono text-xs">@</span>
                    <input
                      type="text"
                      value={profile.telegramHandle}
                      onChange={(e) => setProfile((prev) => ({ ...prev, telegramHandle: e.target.value.replace(/^@/, "") }))}
                      placeholder="username"
                      className="w-full bg-transparent px-2 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Website Portfolio */}
              <div className="mt-4">
                <label className="block text-xs font-mono text-neutral-300 mb-1.5 flex items-center gap-1.5">
                  <Globe className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Website / Portfolio URL:</span>
                </label>
                <input
                  type="url"
                  value={profile.websiteUrl}
                  onChange={(e) => setProfile((prev) => ({ ...prev, websiteUrl: e.target.value }))}
                  placeholder="https://mywebsite.com"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:border-[#5e6ad2] focus:outline-none font-mono"
                />
              </div>
            </div>

            {/* Submit Action Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full rounded-full bg-white py-3.5 text-xs font-bold text-black hover:bg-neutral-200 transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <Save className="h-4 w-4" />
                <span>Simpan Perubahan Profil</span>
              </button>
            </div>
          </form>

          {/* Right Column: Live Card Preview */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
            <div className="rounded-3xl border border-[#5e6ad2]/30 bg-[#0c0e17] p-6 shadow-2xl relative overflow-hidden">
              <div className="border-b border-white/10 pb-3 mb-4 flex items-center justify-between">
                <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
                  Pratinjau Kartu Publik
                </span>
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>

              {/* Mini Passport Visual */}
              <div className="flex flex-col items-center text-center">
                <div className="relative h-20 w-20 rounded-2xl overflow-hidden border-2 border-[#5e6ad2]/60 bg-black/60 p-0.5 shadow-xl mb-3">
                  {profile.avatarUrl ? (
                    <Image
                      src={profile.avatarUrl}
                      alt="Avatar"
                      width={80}
                      height={80}
                      className="h-full w-full object-cover rounded-xl"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center rounded-xl bg-gradient-to-tr from-[#5e6ad2] to-emerald-400 text-2xl font-bold font-mono text-white">
                      {profile.displayName.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>

                <h3 className="font-bold text-white text-lg tracking-tight">{profile.displayName}</h3>
                <span className="text-xs font-mono text-blue-400">@{profile.username}</span>

                <div className="mt-2.5 inline-flex items-center gap-1 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-0.5 text-[11px] font-mono font-bold text-emerald-400">
                  ● Certified Ethereum Builder
                </div>

                <p className="mt-3 text-xs text-neutral-300 leading-relaxed font-sans line-clamp-3">
                  &ldquo;{profile.bio}&rdquo;
                </p>

                <div className="mt-3 w-full border-t border-white/5 pt-3 text-[11px] font-mono text-left space-y-1.5">
                  <div className="text-neutral-500">TARGET ROLE:</div>
                  <div className="text-white font-medium">{profile.targetRole}</div>

                  <div className="text-neutral-500 pt-1">STATUS:</div>
                  <div className="text-emerald-400">
                    {profile.availability === "open_to_opportunity"
                      ? "● Open to Opportunity"
                      : profile.availability === "open_to_collaborate"
                      ? "● Open to Collaborate"
                      : "● Busy Building"}
                  </div>
                </div>

                {/* Social Badges Preview */}
                <div className="mt-4 pt-3 border-t border-white/5 w-full flex flex-wrap items-center justify-center gap-2">
                  {profile.xHandle && (
                    <a
                      href={`https://x.com/${profile.xHandle}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-mono text-neutral-300 hover:text-white flex items-center gap-1"
                    >
                      <span>𝕏</span>
                      <span>@{profile.xHandle}</span>
                    </a>
                  )}
                  {profile.instagramHandle && (
                    <a
                      href={`https://instagram.com/${profile.instagramHandle}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg border border-pink-500/20 bg-pink-500/10 px-2.5 py-1 text-[11px] font-mono text-pink-300 hover:text-white flex items-center gap-1"
                    >
                      <InstagramIcon className="h-3 w-3" />
                      <span>@{profile.instagramHandle}</span>
                    </a>
                  )}
                  {profile.githubHandle && (
                    <a
                      href={`https://github.com/${profile.githubHandle}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-mono text-neutral-300 hover:text-white flex items-center gap-1"
                    >
                      <GithubIcon className="h-3 w-3" />
                      <span>{profile.githubHandle}</span>
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Direct Links Box */}
            <div className="rounded-2xl border border-white/10 bg-[#0d0f12] p-4 text-xs font-mono space-y-2">
              <Link
                href="/passport"
                className="flex items-center justify-between text-neutral-400 hover:text-white p-2 rounded-xl hover:bg-white/5 transition-colors"
              >
                <span>Lihat Builder Passport</span>
                <span>&rarr;</span>
              </Link>
              <Link
                href={`/certificate/${credentialId}`}
                className="flex items-center justify-between text-[#ffd978] hover:text-white p-2 rounded-xl hover:bg-white/5 transition-colors"
              >
                <span>Lihat Sertifikat Resmi (A4)</span>
                <span>&rarr;</span>
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
