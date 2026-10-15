import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      name?: string;
      email?: string;
      contact?: string;
      city?: string;
      interests?: string[];
      channelPreference?: "whatsapp" | "telegram";
    };

    const email = body?.email?.trim();
    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { ok: false, message: "Masukkan alamat email yang valid." },
        { status: 400 }
      );
    }

    // In production this persists to database (e.g. Drizzle ORM pgTable)
    const entry = {
      id: "wl_" + Math.random().toString(36).substring(2, 9),
      name: body.name?.trim() || "Anonymous Builder",
      email: email.toLowerCase(),
      contact: body.contact?.trim() || "-",
      city: body.city || "Jakarta",
      interests: body.interests || ["Airdrop & Alpha", "Liquidity & DeFi"],
      channelPreference: body.channelPreference || "whatsapp",
      registeredAt: new Date().toISOString(),
    };

    return NextResponse.json({
      ok: true,
      message:
        "Selamat! Anda berhasil masuk ke Waiting List Batch 01 Komunitas Onvora. Tautan undangan grup privat dan jadwal ngopi perdana akan dikirimkan ke email/kontak Anda.",
      entry,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message: "Terjadi kesalahan saat memproses pendaftaran.",
        error: error instanceof Error ? error.message : "Unknown",
      },
      { status: 500 }
    );
  }
}
