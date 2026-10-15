import { NextResponse } from "next/server";
import { validateOnvoraEmail } from "@/modules/identity/email-policy";
import { validateStrongPassword, hashPassword } from "@/modules/identity/password-auth";
import { ANALYTICS_EVENTS } from "@/modules/analytics/event-catalog";
import { isDbConfigured, db, schema } from "@/db/client";
import { eq } from "drizzle-orm";

/**
 * Identity & Authentication — DEC-030 / ONV-02
 * Strict @gmail.com email + Strong Password registration endpoint.
 * Zero external SMTP cost. Directly saves to Supabase PostgreSQL.
 */
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      email?: string;
      password?: string;
      username?: string;
    };

    // 1. Validate email
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

    // 2. Validate strong password (DEC-030)
    const passwordValidation = validateStrongPassword(body?.password);
    if (!passwordValidation.ok) {
      return NextResponse.json(
        {
          ok: false,
          reason: passwordValidation.reason,
          message: passwordValidation.message,
          checks: passwordValidation.checks,
        },
        { status: 400 },
      );
    }

    // 3. Hash password securely with native scrypt
    const hashedPassword = await hashPassword(body.password!);
    const cleanEmail = emailValidation.email;
    const baseUsername =
      body?.username?.trim() || cleanEmail.split("@")[0].replace(/[^a-zA-Z0-9_]/g, "");

    let userId = "local-user-id";

    // 4. Save to Supabase if database is configured
    if (isDbConfigured) {
      // Check if user already exists
      const existingUser = await db
        .select()
        .from(schema.users)
        .where(eq(schema.users.email, cleanEmail))
        .limit(1);

      if (existingUser.length > 0) {
        return NextResponse.json(
          {
            ok: false,
            reason: "USER_ALREADY_EXISTS",
            message: "Alamat email ini sudah terdaftar. Silakan login langsung.",
          },
          { status: 409 },
        );
      }

      // Generate unique username if needed
      const existingUsername = await db
        .select()
        .from(schema.users)
        .where(eq(schema.users.username, baseUsername))
        .limit(1);

      const finalUsername =
        existingUsername.length > 0
          ? `${baseUsername}_${Math.floor(Math.random() * 9000 + 1000)}`
          : baseUsername;

      const [newUser] = await db
        .insert(schema.users)
        .values({
          email: cleanEmail,
          username: finalUsername,
          passwordHash: hashedPassword,
          role: cleanEmail === "muhdan@gmail.com" ? "admin" : "learner",
          status: "active",
        })
        .returning();

      userId = newUser.id;

      // Create default profile
      await db.insert(schema.profiles).values({
        userId: newUser.id,
        displayName: cleanEmail === "muhdan@gmail.com" ? "Muhdan (Admin)" : finalUsername,
        goal: cleanEmail === "muhdan@gmail.com" ? "Onvora Platform Governance" : "Junior Ethereum Developer",
        targetRole: cleanEmail === "muhdan@gmail.com" ? "admin" : undefined,
      });
    }

    // Canonical analytics event payload
    const eventPayload = {
      name: ANALYTICS_EVENTS.auth[0], // "user.created"
      properties: {
        emailDomain: "gmail.com",
        registrationChannel: "landing_masthead",
        authMethod: "password_scrypt",
      },
      occurredAt: new Date().toISOString(),
    };

    const response = NextResponse.json(
      {
        ok: true,
        email: cleanEmail,
        username: baseUsername,
        userId,
        role: cleanEmail === "muhdan@gmail.com" ? "admin" : "learner",
        message: "Akun berhasil dibuat! Selamat datang di Onvora.",
        nextStep: "/tracks/ethereum",
        event: eventPayload,
      },
      { status: 201 },
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
        message: "Terjadi kesalahan internal server saat memproses pendaftaran.",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
