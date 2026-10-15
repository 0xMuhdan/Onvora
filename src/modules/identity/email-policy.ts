/**
 * Identity & Authentication — ONV-02 / DEC-017.
 * Email policy: strictly `@gmail.com`, disposable/temporary domains blocked.
 *
 * NOTE: gmail.com has no subdomains for consumer mailboxes, so we reject
 * `user@gmail.com.evil.tld` style spoofing by requiring an exact domain match.
 */

export const GMAIL_DOMAIN = "gmail.com";

/** Minimal, extensible blocklist of disposable/temporary mail providers. */
const DISPOSABLE_DOMAINS = new Set<string>([
  "mailinator.com",
  "guerrillamail.com",
  "10minutemail.com",
  "tempmail.com",
  "temp-mail.org",
  "throwawaymail.com",
  "yopmail.com",
  "sharklasers.com",
  "getnada.com",
  "dispostable.com",
  "trashmail.com",
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
]);

const EMAIL_SHAPE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type EmailRejectionReason =
  | "empty"
  | "malformed"
  | "not_gmail"
  | "disposable";

export type EmailValidationResult =
  | { ok: true; email: string }
  | { ok: false; reason: EmailRejectionReason; message: string };

const MESSAGES: Record<EmailRejectionReason, string> = {
  empty: "Alamat email wajib diisi.",
  malformed: "Format alamat email tidak valid.",
  not_gmail: "Saat ini Onvora hanya menerima alamat email @gmail.com.",
  disposable:
    "Domain email sementara/disposable tidak diizinkan. Gunakan email @gmail.com Anda.",
};

/**
 * Normalizes and validates an email for Onvora onboarding.
 * Gmail is case-insensitive and ignores dots in the local part, but we only
 * normalize casing — dot-stripping is a Gmail-specific alias rule we do not
 * apply at the identity layer.
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

  if (DISPOSABLE_DOMAINS.has(domain)) {
    return { ok: false, reason: "disposable", message: MESSAGES.disposable };
  }

  if (domain !== GMAIL_DOMAIN) {
    return { ok: false, reason: "not_gmail", message: MESSAGES.not_gmail };
  }

  return { ok: true, email };
}
