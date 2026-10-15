"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  ChevronDown,
  ShieldCheck,
  Award,
  Code2,
  LogOut,
  User,
} from "lucide-react";
import { typeClass } from "@/lib/type-scale";
import { useSize } from "@/lib/size-context";
import { cn } from "@/lib/utils";
import { CommandPalette, CommandTrigger } from "@/components/layout/command-palette";
import { generateCredentialId } from "@/lib/evidence-service";

const NAV = [
  { label: "Tracks", href: "/tracks" },
  { label: "Practice", href: "/practice" },
  { label: "Builds", href: "/builds" },
  { label: "Evidence", href: "/evidence" },
  { label: "Community", href: "/community" },
  { label: "Hackathons", href: "/hackathons", isLocked: true },
  { label: "Jobs", href: "/jobs", isLocked: true },
];

interface UserState {
  email: string;
  name: string;
  role: string;
  credentialId: string;
  avatarUrl?: string;
}

/**
 * Modern Floating Capsule Navbar — Linear.app Style with Fluid Functionalism CommandMenu
 * Includes reactive User Profile Capsule & Dropdown Menu
 */
export function Masthead() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [user, setUser] = useState<UserState | null>(null);
  const [isCourseCompleted, setIsCourseCompleted] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { isMobile } = useSize();

  const loadUserState = () => {
    if (typeof window !== "undefined") {
      const email = localStorage.getItem("onvora_user_email");
      const hasCapstoneEscrow = !!localStorage.getItem("onvora_capstone_completed_escrow");
      const hasCapstoneAMM = !!localStorage.getItem("onvora_capstone_completed_amm");
      const hasCompletedLesson = !!localStorage.getItem("onvora_lesson_lesson-eth-fund-01-01");
      const isCompleted =
        hasCapstoneEscrow ||
        hasCapstoneAMM ||
        hasCompletedLesson ||
        email === "muhdan@gmail.com";

      setIsCourseCompleted(isCompleted);

      if (email) {
        const storedName = localStorage.getItem("onvora_user_name");
        const storedAvatar = localStorage.getItem("onvora_user_avatar");
        const role = localStorage.getItem("onvora_user_role") || "learner";
        const name = storedName || (email === "muhdan@gmail.com" ? "Muhdan" : email.split("@")[0]);
        const credentialId = generateCredentialId(email);

        setUser({
          email,
          name,
          role,
          credentialId,
          avatarUrl: storedAvatar || (email === "muhdan@gmail.com" ? "/assets/brand/builder-verified.png" : undefined),
        });
      } else {
        setUser(null);
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadUserState();
    }, 0);

    // Listen to storage changes and window focus to sync across tabs/logins
    window.addEventListener("storage", loadUserState);
    window.addEventListener("focus", loadUserState);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("storage", loadUserState);
      window.removeEventListener("focus", loadUserState);
    };
  }, []);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProfileDropdownOpen(false);
      }
    };
    if (profileDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileDropdownOpen]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {
      // ignore
    }

    if (typeof window !== "undefined") {
      localStorage.removeItem("onvora_user_email");
      localStorage.removeItem("onvora_user_id");
      localStorage.removeItem("onvora_user_name");
      localStorage.removeItem("onvora_user_role");
    }

    setUser(null);
    setProfileDropdownOpen(false);
    setMobileMenuOpen(false);
    router.push("/");
  };

  return (
    <>
      <header className="fixed top-4 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
        <div className="pointer-events-auto flex h-12 sm:h-13 w-full max-w-6xl items-center justify-between rounded-full border border-white/10 bg-[#08090a]/85 px-4 sm:px-6 shadow-2xl backdrop-blur-xl transition-all gap-2 md:gap-3">
          {/* Brand Logo */}
          <Link
            href="/"
            onClick={() => {
              setMobileMenuOpen(false);
              setProfileDropdownOpen(false);
            }}
            className="flex items-center gap-2 shrink-0 transition-opacity hover:opacity-90 mr-1"
            aria-label="Onvora home"
          >
            <Image
              src="/assets/brand/onvora-logo.png"
              alt="Onvora"
              width={100}
              height={24}
              priority
              className="h-5 sm:h-6 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav aria-label="Main Navigation" className="hidden lg:flex items-center">
            <ul className={cn("flex items-center gap-x-3.5 xl:gap-x-5 font-medium text-neutral-400", typeClass("body"))}>
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-1.5 transition-colors hover:text-white whitespace-nowrap"
                  >
                    <span>{item.label}</span>
                    {item.isLocked && !isCourseCompleted && (
                      <span className={cn("text-amber-400/90 font-mono", typeClass("micro"))} title="Requires 1 Course Completed">
                        🔒
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Search Command Trigger (Linear.app style) */}
          <div className="hidden sm:flex items-center shrink-0">
            <CommandTrigger onClick={() => setCommandOpen(true)} />
          </div>

          {/* Desktop Actions (Authenticated Profile or Login/Get Started) */}
          <div className="hidden lg:flex items-center gap-2.5 shrink-0">
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] hover:bg-white/10 hover:border-white/25 px-2.5 py-1.5 transition-all text-xs text-white font-medium cursor-pointer"
                >
                  {user.avatarUrl ? (
                    <div className="relative h-6 w-6 rounded-full overflow-hidden border border-white/20">
                      <Image src={user.avatarUrl} alt={user.name} width={24} height={24} className="h-full w-full object-cover" />
                    </div>
                  ) : (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-tr from-[#5e6ad2] to-emerald-400 text-[11px] font-bold text-white font-mono shadow-sm">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="font-mono text-xs text-neutral-200 max-w-[120px] truncate">
                    {user.name}
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <ChevronDown className={cn("h-3.5 w-3.5 text-neutral-400 transition-transform", profileDropdownOpen && "rotate-180")} />
                </button>

                {/* Profile Dropdown Menu */}
                {profileDropdownOpen && (
                  <div className="pointer-events-auto absolute right-0 top-11 w-64 rounded-2xl border border-white/10 bg-[#0c0d12]/95 p-3 shadow-2xl backdrop-blur-2xl animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                    {/* Header Info */}
                    <div className="border-b border-white/5 pb-2.5 mb-2 px-2 pt-1">
                      <div className="font-bold text-white text-sm truncate">{user.name}</div>
                      <div className="text-[11px] font-mono text-neutral-400 truncate">{user.email}</div>
                      <div className="mt-1.5 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-mono font-bold text-emerald-400">
                        ● Certified Builder
                      </div>
                    </div>

                    {/* Menu links */}
                    <div className="space-y-0.5 text-xs font-mono">
                      <Link
                        href="/profile"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2 rounded-xl px-2.5 py-2 text-white bg-white/5 hover:bg-white/10 transition-colors font-semibold"
                      >
                        <User className="h-4 w-4 text-[#5e6ad2]" />
                        <span>Profil &amp; Pengaturan</span>
                      </Link>
                      <Link
                        href="/passport"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2 rounded-xl px-2.5 py-2 text-neutral-300 hover:bg-white/5 hover:text-white transition-colors"
                      >
                        <ShieldCheck className="h-4 w-4 text-[#8c97ff]" />
                        <span>Builder Passport</span>
                      </Link>
                      <Link
                        href={`/certificate/${user.credentialId}`}
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2 rounded-xl px-2.5 py-2 text-neutral-300 hover:bg-white/5 hover:text-white transition-colors"
                      >
                        <Award className="h-4 w-4 text-[#ffd978]" />
                        <span>Sertifikat Resmi (A4)</span>
                      </Link>
                      <Link
                        href="/practice"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2 rounded-xl px-2.5 py-2 text-neutral-300 hover:bg-white/5 hover:text-white transition-colors"
                      >
                        <Code2 className="h-4 w-4 text-emerald-400" />
                        <span>Sandbox Koding</span>
                      </Link>
                    </div>

                    {/* Logout button */}
                    <div className="border-t border-white/5 pt-2 mt-2">
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 rounded-xl px-2.5 py-2 text-xs font-mono text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-colors text-left cursor-pointer"
                      >
                        <LogOut className="h-3.5 w-3.5" />
                        <span>Keluar (Log out)</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className={cn("px-2.5 py-1.5 text-neutral-400 transition-colors hover:text-white font-medium whitespace-nowrap", typeClass("caption"))}
                >
                  Log in
                </Link>
                <Link
                  href="/start"
                  className={cn("inline-flex items-center justify-center rounded-full bg-white px-4 py-1.5 font-semibold text-black transition-all hover:bg-neutral-200 hover:shadow-[0_0_20px_-3px_rgba(255,255,255,0.4)] whitespace-nowrap", typeClass("caption"))}
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Search & Menu Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setCommandOpen(true)}
              aria-label="Open Command Search"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-neutral-300 hover:text-white transition-colors"
            >
              <Search className="h-3.5 w-3.5" />
            </button>

            {user ? (
              <Link
                href="/profile"
                className="relative flex h-8 w-8 items-center justify-center rounded-full overflow-hidden border border-white/20 bg-gradient-to-tr from-[#5e6ad2] to-emerald-400 text-xs font-bold text-white font-mono shadow-sm"
              >
                {user.avatarUrl ? (
                  <Image src={user.avatarUrl} alt={user.name} width={32} height={32} className="h-full w-full object-cover" />
                ) : (
                  user.name.charAt(0).toUpperCase()
                )}
              </Link>
            ) : (
              <Link
                href="/start"
                onClick={() => setMobileMenuOpen(false)}
                className={cn("rounded-full bg-white px-3 py-1 font-semibold text-black hover:bg-neutral-200", typeClass("caption"))}
              >
                Get Started
              </Link>
            )}

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              className={cn("flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white", typeClass("caption"))}
            >
              {mobileMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="pointer-events-auto absolute top-16 inset-x-4 max-w-md mx-auto rounded-2xl border border-white/10 bg-[#0c0d10]/95 p-5 shadow-2xl backdrop-blur-2xl lg:hidden animate-in fade-in slide-in-from-top-2 duration-150">
            {/* User Profile Card inside Mobile Drawer */}
            {user && (
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3 mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-[#5e6ad2] to-emerald-400 text-xs font-bold text-white font-mono">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-bold text-white text-xs truncate max-w-[140px]">{user.name}</div>
                    <div className="text-[10px] font-mono text-emerald-400">● Certified Builder</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="text-neutral-400 hover:text-rose-400 p-1.5 transition-colors"
                  title="Log out"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            )}

            {/* Command Search inside drawer */}
            <div className="mb-4">
              <CommandTrigger
                onClick={() => {
                  setMobileMenuOpen(false);
                  setCommandOpen(true);
                }}
                className="w-full justify-between"
              />
            </div>

            <nav aria-label="Mobile Navigation">
              <ul className="divide-y divide-white/5">
                {NAV.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn("flex items-center justify-between py-2.5 font-medium text-neutral-300 hover:text-white transition-colors", typeClass("body"))}
                    >
                      <span className="flex items-center gap-1.5">
                        <span>{item.label}</span>
                        {item.isLocked && !isCourseCompleted && (
                          <span className={cn("text-amber-400 font-mono", typeClass("micro"))}>🔒</span>
                        )}
                      </span>
                      <span className="text-neutral-500">&rarr;</span>
                    </Link>
                  </li>
                ))}
                {user && (
                  <>
                    <li>
                      <Link
                        href="/profile"
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn("flex items-center justify-between py-2.5 font-medium text-white hover:text-white transition-colors", typeClass("body"))}
                      >
                        <span className="flex items-center gap-1.5">
                          <User className="h-3.5 w-3.5 text-[#5e6ad2]" />
                          <span>Profil &amp; Pengaturan</span>
                        </span>
                        <span className="text-neutral-500">&rarr;</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/passport"
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn("flex items-center justify-between py-2.5 font-medium text-[#8c97ff] hover:text-white transition-colors", typeClass("body"))}
                      >
                        <span className="flex items-center gap-1.5">
                          <ShieldCheck className="h-3.5 w-3.5" />
                          <span>Builder Passport</span>
                        </span>
                        <span className="text-neutral-500">&rarr;</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={`/certificate/${user.credentialId}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn("flex items-center justify-between py-2.5 font-medium text-[#ffd978] hover:text-white transition-colors", typeClass("body"))}
                      >
                        <span className="flex items-center gap-1.5">
                          <Award className="h-3.5 w-3.5" />
                          <span>Sertifikat Resmi</span>
                        </span>
                        <span className="text-neutral-500">&rarr;</span>
                      </Link>
                    </li>
                  </>
                )}
              </ul>

              {!user && (
                <div className="mt-4 grid grid-cols-2 gap-2 pt-2 border-t border-white/5">
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn("flex items-center justify-center rounded-xl border border-white/10 bg-white/5 py-2.5 font-medium text-white text-center hover:bg-white/10", typeClass("caption"))}
                  >
                    Log in
                  </Link>
                  <Link
                    href="/start"
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn("flex items-center justify-center rounded-xl bg-white py-2.5 font-semibold text-black text-center hover:bg-neutral-200", typeClass("caption"))}
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </header>

      {/* Global ⌘K Command Menu Modal */}
      <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />
    </>
  );
}
