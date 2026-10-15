# Onvora — The Developer System for Web3

<p align="center">
  <img src="public/assets/brand/onvora-logo.png" alt="Onvora Logo" width="240" />
</p>

<p align="center">
  <strong>Platform Pembelajaran Rekayasa Web3 Berbasis Bukti Nyata & Ekosistem Builder.</strong><br />
  <em>Stop watching tutorials. Start building real protocols.</em>
</p>

<p align="center">
  <a href="#-tentang-onvora">Tentang</a> •
  <a href="#-fitur-utama--rute-aplikasi">Fitur Utama</a> •
  <a href="#-arsitektur-teknologi">Teknologi</a> •
  <a href="#-sistem-desain-fluid-functionalism">Sistem Desain</a> •
  <a href="#-struktur-direktori">Struktur Direktori</a> •
  <a href="#-komunitas-bfc-build-from-cafe">Komunitas BFC</a> •
  <a href="#-cara-menjalankan-proyek">Cara Menjalankan</a>
</p>

---

## 🌟 Tentang Onvora

**Onvora** adalah sistem pembelajaran rekayasa Web3 (*Web3 Developer Ecosystem*) yang dirancang untuk mengakhiri siklus pasif *tutorial hell*. Alih-alih menjual video pasif atau sertifikat PDF kosong yang tidak diakui industri, Onvora memvalidasi kompetensi pengembang melalui:

1. **Latihan Praktikum Langsung di Browser** (*Zero Gas, No Setup Friction*).
2. **Evaluasi Otomatis Assertion Test Suite** (*Foundry-grade validation*).
3. **8-Poin Reality Check** sebelum smart contract dideploy ke testnet publik.
4. **Evidence Ledger & Builder Passport**: Rekam jejak portofolio on-chain terverifikasi (Level 1 – Level 5) yang dapat diaudit langsung oleh hiring partner dan yayasan protokol global.

---

## 🚀 Fitur Utama & Rute Aplikasi

Aplikasi Onvora dibangun dengan Next.js App Router yang mencakup rute-rute utama berikut:

| Rute | Modul | Deskripsi & Fungsionalitas |
| :--- | :--- | :--- |
| **`/`** | **Landing Page** | Antarmuka interaktif dengan estetika Linear Obsidian Dark, animasi judul ketik berganti ganda (`WEB3` ↔ `AI` dan `PROGRAMMING` → `BUILDING` → `LEARNING`), interactive terminal, dan showcase orbit komunitas. |
| **`/tracks`** | **Developer Tracks Workstation** | Katalog 25+ ekosistem pengembang (Ethereum, Monad, Solana, Arbitrum, Sui, 0G, dll.) dilengkapi **Fluid Functionalism Sidebar**, filter arsitektur, dan pencarian cepat. |
| **`/tracks/ethereum`** | **Ethereum Developer Syllabus** | Silabus kanonik 12 Phase (dari mental model nol, sintaks Solidity, testing Foundry, hingga audit keamanan). |
| **`/learn/ethereum`** | **Lesson Player UI (ONV-06)** | Pemutar materi pelajaran interaktif 2-panel dengan 4 simulator visual (EIP-1559, EVM Stack, Storage Packing, Reentrancy) dan checkpoint kuis wajib lulus. |
| **`/practice`** | **In-Browser Sandbox** | Lingkungan eksekusi kode Solidity langsung di browser tanpa biaya gas dengan 5 modul tantangan (Access Control, Reentrancy CEI, ERC-20 Safe, Storage Packing, Custom Errors). |
| **`/builds`** | **Production Protocols** | Katalog proyek capstone mandiri (Escrow, AMM Liquidity, ERC-2981 Royalty, ZK Verifier) yang menerapkan kartu **CardGroup 2-D Fluid Hover**. |
| **`/builds/[id]`** | **Capstone Spec & Workbench** | Panduan arsitektur protokol multi-kontrak, diagram state machine, skrip deploy Sepolia, dan form evaluasi **The 8-Point Reality Check**. |
| **`/passport`** | **Builder Passport (ONV-13)** | Kartu kredensial digital kanonik (`ONV-ETH-XXXXX`), status pencapaian *Certified Ethereum Learner/Builder*, dan matriks 5-Level Capability Gates. |
| **`/profile`** | **Builder Profile Settings** | Pengaturan profil personal: unggah foto / pilih avatar builder, bio keahlian, status ketersediaan, dan tautan sosial media (𝕏, Instagram, GitHub, Telegram, Website). |
| **`/certificate/[id]`** | **Visual Certificate (A4 Print-Ready)** | Lembar sertifikat resmi berbingkai emas Obsidian dengan stempel segel protokol, tombol cetak/simpan PDF otomatis, dan tombol *Add to LinkedIn*. |
| **`/verify/[credentialId]`** | **Open Public Verification** | Halaman verifikasi publik terbuka tanpa login untuk rekruter/auditor guna memeriksa keabsahan bukti kompetensi on-chain. |
| **`/evidence`** | **Evidence Ledger** | Rekam jejak bukti kompetensi berjenjang (Level A: Merged PR, Level B: Independent Testnet Deploy, Level C: Guided Modules). |
| **`/community`** | **BFC (Build From Cafe)** | Komunitas santai offline/online, panduan 6 cara menghasilkan uang di Web3, Chapter kota (**Tasikmalaya Founder Chapter #1**), dan integrasi **Waiting List**. |
| **`/diagnostic`** | **Builder Diagnostic (Phase 00)** | Kuesioner interaktif multi-step bertenaga `AskUserQuestions` dengan navigasi angka 1–9 untuk menentukan titik awal kurikulum personal. |
| **`/jobs` & `/hackathons`** | **Ecosystem Gateways** | Gerbang pelamaran kerja dan hackathon ekosistem yang terbuka otomatis (*Dynamic Unlocked Gate*) saat bukti kompetensi Level B terverifikasi. |
| **`/font-preview`** | **Design Lab Inspector** | Inspektor visual langsung untuk sistem tangga tipografi 6-role dan Two-Step Size Ladder (Default 36px vs Compact 28px). |
| **`/start` & `/login`** | **Identity & Onboarding** | Kebijakan autentikasi mandiri email Google + kata sandi kuat berbasis native scrypt hash (DEC-030) tanpa biaya dependensi SMTP eksternal. |

---

## 🛠️ Arsitektur Teknologi

* **Framework**: [Next.js](https://nextjs.org/) v16.3.8 (App Router, Turbopack)
* **Runtime & Bahasa**: React 19, TypeScript 5 (Strict Mode)
* **Styling & CSS**: Tailwind CSS v4, PostCSS
* **Animation & Motion**:
  * [Framer Motion](https://motion.dev/) (Spring physics, counter-rotation orbits, layout transitions)
  * [GSAP](https://greensock.com/) (Hero dynamic typing & revolving word loop)
* **Database & ORM**:
  * PostgreSQL (Postgres.js)
  * [Drizzle ORM](https://orm.drizzle.team/) & Drizzle Kit
* **Komponen & UI**:
  * [@base-ui/react](https://base-ui.com/) Primitives
  * [Fluid Functionalism](https://www.fluidfunctionalism.com/) Registry Components

---

## 🎨 Sistem Desain (Fluid Functionalism)

Onvora menggunakan sistem desain **Fluid Functionalism** dengan estetika **Deep Obsidian** (`#08090a`), aksen **Linear Indigo** (`#5e6ad2`), kaca buram (*glassmorphism*), dan border presisi:

### 1. Typography System (`@/lib/type-scale`)
Ditenagai oleh font variabel **Inter Variable** dengan dukungan sumbu ukuran optik (`opsz 14–25`) untuk transisi bobot tanpa pergeseran layout:
* **`display`**: 28px / leading 34px (Compact: 24/30px) — Judul utama & hero
* **`title`**: 16px / leading 22px (Compact: 15/20px) — Heading seksi & kartu
* **`subtitle`**: 14px / leading 20px (Compact: 13/18px) — Sub-judul & penekanan
* **`body`**: 13px / leading 20px (Compact: 12/18px) — Paragraf & kontrol form
* **`caption`**: 12px / leading 16px (Compact: 11/14px) — Label sekunder & tombol
* **`micro`**: 11px / leading 14px (Compact: 10/12px) — Badge teknikal & tag kode

### 2. Sizes System (`@/lib/size-context`)
Tangga kepadatan dua tingkat (*Two-Step Size Ladder*):
* **`default` (36px)**: Tinggi kontrol tombol, input, dan tab standar. Otomatis diterapkan pada perangkat **Mobile** demi ergonomi target sentuh yang nyaman serta dilengkapi `fieldTouchClass` (16px) untuk mencegah auto-zoom di iOS Safari.
* **`compact` (28px)**: Kepadatan tinggi untuk toolbar rapat, console terminal, dan spreadsheet data di layar **Desktop**.

### 3. Komponen Spesial yang Terpasang
* **`CommandMenu` (⌘K / Ctrl+K)**: Floating capsule search pada navbar dengan pencarian instan rute, aksi, dan kurikulum.
* **`AskUserQuestions`**: Flow kuesioner interaktif di `/diagnostic` dengan pintasan angka keyboard 1–9 dan auto-advance.
* **`Card` & `CardGroup`**: Kartu dengan sorotan kursor magnetik 2-D (*2-D fluid hover highlight*).
* **`Circles`**: Visualisasi orbit konsentrik dinamis dengan foto portrait asli dan efek kedalaman optik (*depth-of-field*).
* **`Sidebar`**: Panel workstation interaktif di `/tracks` dengan *drag-resize rail* dan pintasan keyboard `[`.

---

## ☕ Komunitas BFC (Build From Cafe)

Onvora mengusung konsep komunitas santai namun bernilai tinggi: **BFC (Build From Cafe)**.
* **Format**: Kumpul santai akhir pekan di coffee shop lokal, buka laptop, sharing airdrop testnet, bedah strategi liquidity pool (DLMM), trading on-chain, dan koding bareng tanpa sekat.
* **Waiting List Batch 01**: Akses grup privat (WhatsApp / Telegram) menggunakan sistem waiting list terkurasi untuk menjaga kualitas diskusi tanpa bot atau spammer.
* **Chapter Kota**:
  1. 📍 **Tasikmalaya** (*Founder Chapter #1* — Dadaha & Unsil Coffee Spots)
  2. 📍 **Jakarta & Sekitarnya** (Senopati & Blok M)
  3. 📍 **Bandung** (Dago & Riau)
  4. 📍 **Surabaya** (Barat & Pusat)
  5. 📍 **Yogyakarta** (Jakal & Prawirotaman)
  6. 📍 **Bali** (Canggu & Ubud Nomad Hubs)
  7. 🌐 **Online / Kota Lainnya**

---

## 📁 Struktur Direktori

```text
Onvora/
├── public/
│   └── assets/
│       ├── avatars/          # Foto portrait anggota komunitas (avatar-1 s/d avatar-20)
│       ├── brand/            # Logo & aset visual resmi Onvora
│       └── tracks/           # Logo transparan ekosistem (ethereum, monad, solana, arbitrum, sui)
├── src/
│   ├── app/
│   │   ├── (public)/         # Halaman publik (/, /tracks, /practice, /passport, /profile, dll.)
│   │   ├── api/              # API endpoints (/auth, /v1/lessons, /diagnostic, /community/waitlist)
│   │   ├── globals.css       # Tailwind v4 entry & CSS variables Fluid Functionalism
│   │   └── layout.tsx        # Root layout, Inter Variable Font & Providers
│   ├── components/
│   │   ├── animations/       # Motion wrapper & transition helpers
│   │   ├── hero/             # Dynamic typing & revolving text header
│   │   ├── layout/           # Masthead navbar, Colophon footer, Command palette (⌘K)
│   │   ├── storytelling/     # Builder Loop scroll-pinned storytelling
│   │   ├── ui/               # Registry components (button, card, sidebar, dialog, circles, text-type, dll.)
│   │   └── providers.tsx     # MotionConfig reducedMotion="user" & SizeProvider
│   ├── db/
│   │   ├── client.ts         # Koneksi database PostgreSQL
│   │   └── schema.ts         # Skema Drizzle ORM
│   ├── hooks/                # Custom hooks (use-fluid-hover, use-touch-primary, use-merge-split)
│   ├── lib/                  # Library inti (curriculum-data, evidence-service, capstone-data, type-scale)
│   └── modules/              # Domain logic (analytics event catalog, identity)
├── docs/
│   └── curriculum/           # Silabus kanonik & unit kurikulum teknis terbuka
├── components.json           # Konfigurasi shadcn registry
└── package.json              # Dependensi & skrip npm
```

---

## 💻 Cara Menjalankan Proyek

### 1. Prasyarat
* [Node.js](https://nodejs.org/) v18+ atau v20+
* NPM / PNPM

### 2. Instalasi Dependensi
```bash
npm install
```

### 3. Menjalankan Server Pengembangan
```bash
npm run dev
```
Buka browser dan akses [http://localhost:3000](http://localhost:3000).

### 4. Pemeriksaan Tipe & Linting
```bash
# Validasi TypeScript
npm run typecheck

# Validasi ESLint
npm run lint
```

### 5. Kompilasi Produksi (Production Build)
```bash
npm run build
npm run start
```

---

## 📄 Lisensi
Proyek ini dikembangkan secara modular berdasarkan spesifikasi kurikulum terbuka di folder `docs/curriculum/`. Seluruh materi pembelajaran mandiri dirancang untuk melahirkan pengembang Web3 standar industri produksi.
