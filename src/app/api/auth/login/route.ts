import { NextResponse } from "next/server";
import { validateOnvoraEmail } from "@/modules/identity/email-policy";
import { verifyPassword } from "@/modules/identity/password-auth";
import { isDbConfigured, db, schema } from "@/db/client";
import { eq } from "drizzle-orm";

/**
 * Identity & Authentication — DEC-030 / ONV-02
 * Login with @gmail.com email + password verification.
 */
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      email?: string;
      password?: string;
    };

    // 1. Validate email format
    const emailValidation = validateOnvoraEmail(body?.email);
    if (!emailValidation.ok) {
      return NextResponse.json(
        {
          ok: false,
          reason: emailValidation.reason,
          message: emailValidation.message,
        },
        { status: 400 },
      );
    }

    if (!body?.password) {
      return NextResponse.json(
        {
          ok: false,
          reason: "PASSWORD_REQUIRED",
          message: "Kata sandi wajib diisi.",
        },
        { status: 400 },
      );
    }

    const cleanEmail = emailValidation.email;
    let userId = "guest-session";
    let username = cleanEmail.split("@")[0];
    let role = "learner";

    const ADMIN_HASH =
      "fa976b863a5874a80373e0d268aab79b:acbf7a2a814f07442f7aa07e831284c925889cd50dac9e86235b8bc15a64a86f8e1b4b52dbff10bd32eda15f6772e889f7664e33bb4e53c94351c690c3a4f4a3";

    // 2. Pre-configured Demo Admin Account
    if (cleanEmail === "muhdan@gmail.com") {
      const isValid = await verifyPassword(body.password, ADMIN_HASH);
      if (!isValid) {
        return NextResponse.json(
          {
            ok: false,
            reason: "INVALID_CREDENTIALS",
            message: "Kata sandi yang Anda masukkan salah.",
          },
          { status: 401 },
        );
      }
      userId = "admin-muhdan-local";
      username = "muhdan";
      role = "admin";
    } else if (isDbConfigured) {
      // 3. Verify with Supabase if configured
      const [user] = await db
        .select()
        .from(schema.users)
        .where(eq(schema.users.email, cleanEmail))
        .limit(1);

      if (!user) {
        return NextResponse.json(
          {
            ok: false,
            reason: "USER_NOT_FOUND",
            message: "Akun dengan email ini belum terdaftar. Silakan buat akun baru.",
          },
          { status: 404 },
        );
      }

      if (!user.passwordHash) {
        return NextResponse.json(
          {
            ok: false,
            reason: "PASSWORD_NOT_SET",
            message: "Akun ini belum memiliki kata sandi terdaftar.",
          },
          { status: 400 },
        );
      }

      const isValid = await verifyPassword(body.password, user.passwordHash);
      if (!isValid) {
        return NextResponse.json(
          {
            ok: false,
            reason: "INVALID_CREDENTIALS",
            message: "Kata sandi yang Anda masukkan salah.",
          },
          { status: 401 },
        );
      }

      userId = user.id;
      username = user.username;
      role = user.role;
    }

    const response = NextResponse.json(
      {
        ok: true,
        userId,
        email: cleanEmail,
        username,
        role,
        message: "Berhasil masuk ke Onvora.",
        nextStep: "/tracks/ethereum",
      },
      { status: 200 },
    );

    // Set auth cookie
    response.cookies.set("onvora_session", userId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message: "Terjadi kesalahan internal saat memproses autentikasi.",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
