-- ONVORA — Seed Admin Account (DEC-030 & ONV-02)
-- Email: muhdan@gmail.com
-- Password: Indonesia123# (Scrypt hashed)
-- Role: admin

INSERT INTO users (id, email, username, password_hash, role, status, created_at, updated_at)
VALUES (
  gen_random_uuid(),
  'muhdan@gmail.com',
  'muhdan',
  'fa976b863a5874a80373e0d268aab79b:acbf7a2a814f07442f7aa07e831284c925889cd50dac9e86235b8bc15a64a86f8e1b4b52dbff10bd32eda15f6772e889f7664e33bb4e53c94351c690c3a4f4a3',
  'admin',
  'active',
  NOW(),
  NOW()
)
ON CONFLICT (email) DO UPDATE SET
  password_hash = EXCLUDED.password_hash,
  role = 'admin',
  status = 'active',
  updated_at = NOW();

-- Create admin profile if not exists
INSERT INTO profiles (id, user_id, display_name, target_role, goal, created_at)
SELECT
  gen_random_uuid(),
  id,
  'Muhdan (Admin)',
  'Platform Administrator',
  'Onvora Platform Governance',
  NOW()
FROM users
WHERE email = 'muhdan@gmail.com'
  AND NOT EXISTS (
    SELECT 1 FROM profiles WHERE user_id = users.id
  );
