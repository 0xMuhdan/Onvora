/**
 * Identity & Authentication — ONV-02 / DEC-017 / DEC-030 / DEC-031.
 * Email policy: Only `@gmail.com` and educational institution domains (`.ac.id`, `.edu`).
 * Disposable/temporary domains are strictly blocked.
 */

export const GMAIL_DOMAIN = "gmail.com";

/**
 * Curated blocklist of disposable, temporary, and 10-minute mail providers.
 * Any domain or subdomain matching these will be rejected immediately.
 */
const DISPOSABLE_DOMAINS = new Set<string>([
  "mailinator.com",
  "guerrillamail.com",
  "10minutemail.com",
  "10minutemail.net",
  "10minemail.com",
  "tempmail.com",
  "temp-mail.org",
  "tempmailo.com",
  "temp-mail.io",
  "throwawaymail.com",
  "yopmail.com",
  "yopmail.fr",
  "yopmail.net",
  "sharklasers.com",
  "getnada.com",
  "dispostable.com",
  "trashmail.com",
  "trashmail.net",
  "maildrop.cc",
  "fakeinbox.com",
  "mailnesia.com",
  "spamgourmet.com",
  "mytemp.email",
  "mohmal.com",
  "emailondeck.com",
  "moakt.com",
  "tempr.email",
  "burnermail.io",
  "33mail.com",
  "inboxbear.com",
  "mailsac.com",
  "anonaddy.me",
  "crazymailing.com",
  "generator.email",
  "armyspy.com",
  "cuvox.de",
  "dayrep.com",
  "fleckens.hu",
  "gustr.com",
  "jourrapide.com",
  "rhyta.com",
  "superrito.com",
  "teleworm.us",
  "einrot.com",
  "dropmail.me",
  "getairmail.com",
  "inboxkitten.com",
  "mailpoof.com",
  "minutemail.com",
  "nada.ltd",
  "guerrillamailblock.com",
  "pokemail.net",
  "spam4.me",
  "mytempemail.com",
]);

const EMAIL_SHAPE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type EmailRejectionReason =
  | "empty"
  | "malformed"
  | "not_allowed_domain"
  | "disposable";

export type EmailValidationResult =
  | { ok: true; email: string; isAcademic: boolean; domain: string }
  | { ok: false; reason: EmailRejectionReason; message: string };

const MESSAGES: Record<EmailRejectionReason, string> = {
  empty: "Alamat email wajib diisi.",
  malformed: "Format alamat email tidak valid.",
  not_allowed_domain:
    "Gunakan alamat email resmi @gmail.com atau email kampus institusi (@*.ac.id / @*.edu).",
  disposable:
    "Domain email sementara/temporary dilarang keras. Gunakan email institusi kampus atau akun Gmail resmi Anda.",
};

/**
 * Checks if a domain is a disposable / temporary mail service.
 * Supports exact domain check and subdomain matching (e.g., sub.mailinator.com).
 */
export function isDisposableEmail(domain: string): boolean {
  const d = domain.toLowerCase().trim();
  if (DISPOSABLE_DOMAINS.has(d)) return true;

  // Check if it ends with any disposable domain as suffix (subdomains)
  for (const blocked of DISPOSABLE_DOMAINS) {
    if (d.endsWith(`.${blocked}`)) {
      return true;
    }
  }

  // Common keywords in disposable services
  if (
    d.includes("tempmail") ||
    d.includes("disposable") ||
    d.includes("10minute") ||
    d.includes("fakemail") ||
    d.includes("trashmail")
  ) {
    return true;
  }

  return false;
}

/**
 * Validates whether a domain belongs to a recognized educational institution (.ac.id or .edu).
 * Example:
 * - mahasiswa@unsil.ac.id -> true
 * - user@itb.ac.id -> true
 * - researcher@mit.edu -> true
 * - student@ui.ac.id -> true
 * - evil.com.ac.id.attacker.com -> false (checked via endsWith)
 */
export function isEducationalDomain(domain: string): boolean {
  const d = domain.toLowerCase().trim();
  return (
    d.endsWith(".ac.id") ||
    d === "ac.id" ||
    d.endsWith(".edu") ||
    d === "edu"
  );
}

/**
 * Normalizes and validates an email for Onvora authentication and registration.
 *
 * ALLOWED:
 * 1. Consumer Google accounts: exact match `@gmail.com`
 * 2. Academic institution accounts: `@*.ac.id` (Indonesian colleges/universities) or `@*.edu` (global)
 *
 * STRICTLY REJECTED:
 * 1. Temporary / disposable email providers (e.g. mailinator, tempmail, guerrillamail, 10minutemail, etc.)
 * 2. Random free email providers (yahoo, hotmail, mail.ru, etc. unless explicitly allowed)
 * 3. Malformed / empty formats
 */
export function validateOnvoraEmail(input: unknown): EmailValidationResult {
  if (typeof input !== "string" || input.trim() === "") {
    return { ok: false, reason: "empty", message: MESSAGES.empty };
  }

  const email = input.trim().toLowerCase();

  if (email.length > 254 || !EMAIL_SHAPE.test(email)) {
    return { ok: false, reason: "malformed", message: MESSAGES.malformed };
  }

  const atIndex = email.lastIndexOf("@");
  const domain = email.slice(atIndex + 1);

  // 1. Strict check: reject disposable/temporary email immediately
  if (isDisposableEmail(domain)) {
    return { ok: false, reason: "disposable", message: MESSAGES.disposable };
  }

  // 2. Strict check: allowed domain verification
  const isGmail = domain === GMAIL_DOMAIN;
  const isEdu = isEducationalDomain(domain);

  if (!isGmail && !isEdu) {
    return {
      ok: false,
      reason: "not_allowed_domain",
      message: MESSAGES.not_allowed_domain,
    };
  }

  return { ok: true, email, isAcademic: isEdu, domain };
}
