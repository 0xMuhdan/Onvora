import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);

export interface PasswordValidationResult {
  ok: boolean;
  reason?: string;
  message?: string;
  checks: {
    minLength: boolean;
    hasUppercase: boolean;
    hasLowercase: boolean;
    hasNumber: boolean;
    hasSymbol: boolean;
  };
}

/**
 * Validates whether a password meets Onvora Strong Password requirements (DEC-030).
 * Requirements:
 * - Minimum 8 characters
 * - At least 1 uppercase letter
 * - At least 1 lowercase letter
 * - At least 1 digit
 * - At least 1 special symbol
 */
export function validateStrongPassword(password?: string): PasswordValidationResult {
  if (!password || typeof password !== "string") {
    return {
      ok: false,
      reason: "PASSWORD_EMPTY",
      message: "Kata sandi wajib diisi.",
      checks: {
        minLength: false,
        hasUppercase: false,
        hasLowercase: false,
        hasNumber: false,
        hasSymbol: false,
      },
    };
  }

  const checks = {
    minLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSymbol: /[^A-Za-z0-9]/.test(password),
  };

  if (!checks.minLength) {
    return {
      ok: false,
      reason: "PASSWORD_TOO_SHORT",
      message: "Kata sandi minimal harus terdiri dari 8 karakter.",
      checks,
    };
  }

  if (!checks.hasUppercase) {
    return {
      ok: false,
      reason: "PASSWORD_NO_UPPERCASE",
      message: "Kata sandi harus mengandung minimal 1 huruf besar (A-Z).",
      checks,
    };
  }

  if (!checks.hasLowercase) {
    return {
      ok: false,
      reason: "PASSWORD_NO_LOWERCASE",
      message: "Kata sandi harus mengandung minimal 1 huruf kecil (a-z).",
      checks,
    };
  }

  if (!checks.hasNumber) {
    return {
      ok: false,
      reason: "PASSWORD_NO_NUMBER",
      message: "Kata sandi harus mengandung minimal 1 angka (0-9).",
      checks,
    };
  }

  if (!checks.hasSymbol) {
    return {
      ok: false,
      reason: "PASSWORD_NO_SYMBOL",
      message: "Kata sandi harus mengandung minimal 1 simbol khusus (!@#$%^&* dll).",
      checks,
    };
  }

  return {
    ok: true,
    checks,
  };
}

/**
 * Hash password using Node.js native crypto scrypt with unique salt.
 * Zero external cost, highly secure key derivation.
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const derivedKey = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${salt}:${derivedKey.toString("hex")}`;
}

/**
 * Constant-time password verification to prevent timing attacks.
 */
export async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
  const parts = storedHash.split(":");
  if (parts.length !== 2) return false;

  const [salt, originalKey] = parts;
  const keyBuffer = Buffer.from(originalKey, "hex");
  const derivedKey = (await scryptAsync(password, salt, 64)) as Buffer;

  if (keyBuffer.length !== derivedKey.length) {
    return false;
  }

  return timingSafeEqual(keyBuffer, derivedKey);
}
