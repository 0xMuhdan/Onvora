import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ ok: true, message: "Berhasil keluar dari akun." });
  response.cookies.set("onvora_session", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });
  return response;
}
