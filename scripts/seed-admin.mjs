import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";
import postgres from "postgres";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });

const scryptAsync = promisify(scrypt);

async function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const derivedKey = await scryptAsync(password, salt, 64);
  return `${salt}:${derivedKey.toString("hex")}`;
}

async function main() {
  const email = "muhdan@gmail.com";
  const password = "Indonesia123#";
  const username = "muhdan";
  const role = "admin";

  console.log(`[ONVORA ADMIN SEED] Menyiapkan kredensial akun admin...`);
  console.log(`Email: ${email}`);
  console.log(`Username: ${username}`);
  console.log(`Role: ${role}`);

  const passwordHash = await hashPassword(password);
  console.log(`Password Hash (scrypt): ${passwordHash}`);

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.warn(`\n[PERINGATAN] DATABASE_URL belum dikonfigurasi di .env.local atau .env.`);
    console.log(`Jika menggunakan PostgreSQL / Supabase, atur DATABASE_URL di .env.local lalu jalankan kembali.`);
    console.log(`Fallback autentikasi admin lokal telah terintegrasi di route /api/auth/login.`);
    process.exit(0);
  }

  console.log(`\nMenghubungkan ke PostgreSQL: ${connectionString.replace(/:[^:@]+@/, ":****@")}...`);
  const sql = postgres(connectionString, { max: 1 });

  try {
    // 1. Upsert admin user
    const [user] = await sql`
      INSERT INTO users (id, email, username, password_hash, role, status, created_at, updated_at)
      VALUES (
        gen_random_uuid(),
        ${email},
        ${username},
        ${passwordHash},
        ${role},
        'active',
        NOW(),
        NOW()
      )
      ON CONFLICT (email) DO UPDATE SET
        password_hash = EXCLUDED.password_hash,
        role = EXCLUDED.role,
        status = 'active',
        updated_at = NOW()
      RETURNING id, email, username, role, status;
    `;

    console.log(`\n[BERHASIL] Akun admin tersimpan di database:`);
    console.log(`- ID: ${user.id}`);
    console.log(`- Email: ${user.email}`);
    console.log(`- Username: ${user.username}`);
    console.log(`- Role: ${user.role}`);

    // 2. Upsert profile
    await sql`
      INSERT INTO profiles (id, user_id, display_name, target_role, goal, created_at)
      SELECT
        gen_random_uuid(),
        ${user.id},
        'Muhdan (Admin)',
        'Platform Administrator',
        'Onvora Platform Governance',
        NOW()
      WHERE NOT EXISTS (
        SELECT 1 FROM profiles WHERE user_id = ${user.id}
      );
    `;
    console.log(`[BERHASIL] Profil admin dibuat.`);
  } catch (error) {
    console.error(`[ERROR] Gagal memasukkan data ke database:`, error);
    process.exit(1);
  } finally {
    await sql.end();
  }
}

main();
