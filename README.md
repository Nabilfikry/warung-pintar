# Warung Pintar

Platform terpadu untuk menghubungkan UMKM dengan Investor. Aplikasi web modern yang dibangun dengan React dan Vite untuk manajemen bisnis UMKM dan investasi.

## 🚀 Fitur Utama

- **Dashboard UMKM**: Manajemen produk, transaksi, dan laporan penjualan
- **Dashboard Investor**: Portfolio investasi, pencarian UMKM, dan laporan
- **Chatbot AI**: Asisten pintar berbasis Gemini AI untuk membantu pengguna
- **Sistem Autentikasi**: Login dan registrasi dengan role-based access (UMKM/Investor)
- **Mode Demo**: Login demo tanpa backend untuk testing

## 🛠️ Teknologi

- **Frontend**: React 19.2.0 + Vite 7.2.4
- **Routing**: React Router DOM 7.9.6
- **Styling**: Tailwind CSS 3.4.1
- **Animasi**: Framer Motion 12.23.24
- **HTTP Client**: Axios 1.13.2
- **AI**: Google Gemini API

## 📋 Prasyarat

Sebelum memulai, pastikan Anda telah menginstall:

- **Node.js** (versi 18.0.0 atau lebih baru)
- **npm** (biasanya sudah termasuk dengan Node.js) atau **yarn**
- **Git** (opsional, untuk clone repository)

### Cek Versi

```bash
node --version  # Harus >= 18.0.0
npm --version   # Harus >= 8.0.0
```

## 🔧 Instalasi Lokal

### 1. Clone Repository

```bash
git clone <repository-url>
cd warung-pintar
```

Atau jika Anda sudah memiliki file project, langsung masuk ke folder project:

```bash
cd warung-pintar
```

### 2. Install Dependencies

```bash
npm install
```

Proses ini akan menginstall semua package yang diperlukan. Tunggu hingga selesai.

### 3. Setup Environment Variables (Opsional)

Buat file `.env` di root project untuk konfigurasi:

```bash
# Copy template (jika ada)
cp .env.example .env
```

Edit file `.env` dan tambahkan konfigurasi:

```env
# API Backend URL (opsional, default: http://localhost:8000/api)
VITE_API_URL=http://localhost:8000/api
```

**Catatan**: Jika tidak membuat file `.env`, aplikasi akan menggunakan default `http://localhost:8000/api` untuk development.

### 4. Jalankan Development Server

```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:5173` (atau port lain jika 5173 sudah digunakan).

Buka browser dan akses URL yang ditampilkan di terminal.

### 5. Build untuk Production (Opsional)

Untuk membuat build production:

```bash
npm run build
```

Build akan tersimpan di folder `dist/`. Untuk preview build:

```bash
npm run preview
```

## 🎮 Mode Demo

Aplikasi menyediakan mode demo yang tidak memerlukan backend:

### Demo UMKM
- **Email**: `test@warung.com`
- **Password**: `password123`
- Klik tombol **"Demo UMKM Login"** di halaman login

### Demo Investor
- **Email**: `investor@test.com`
- **Password**: `password123`
- Klik tombol **"Demo Investor Login"** di halaman login

## 📁 Struktur Project

```
warung-pintar/
├── public/                 # Static files
├── src/
│   ├── components/         # React components
│   │   ├── dashboard/     # UMKM dashboard components
│   │   └── investor/      # Investor dashboard components
│   ├── context/           # React Context (Auth, Theme)
│   ├── services/          # API services
│   ├── App.jsx           # Main App component
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── .env                   # Environment variables (buat sendiri)
├── package.json          # Dependencies
├── vite.config.js        # Vite configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── vercel.json           # Vercel deployment config
```

## 🚀 Deployment di Vercel

Vercel adalah platform hosting yang sangat cocok untuk aplikasi React/Vite. Berikut langkah-langkah deployment:

### Metode 1: Deploy via Vercel CLI (Recommended)

#### 1. Install Vercel CLI

```bash
npm install -g vercel
```

#### 2. Login ke Vercel

```bash
vercel login
```

Ikuti instruksi di browser untuk login.

#### 3. Deploy

Dari root project, jalankan:

```bash
vercel
```

Ikuti prompt:
- **Set up and deploy?** → `Y`
- **Which scope?** → Pilih akun Anda
- **Link to existing project?** → `N` (untuk project baru)
- **Project name?** → `warung-pintar` (atau nama lain)
- **Directory?** → `./` (tekan Enter)
- **Override settings?** → `N`

#### 4. Set Environment Variables

Jika menggunakan backend API, set environment variable:

```bash
vercel env add VITE_API_URL
```

Masukkan URL backend API Anda (contoh: `https://api.example.com/api`)

#### 5. Deploy Production

```bash
vercel --prod
```

### Metode 2: Deploy via GitHub (Recommended untuk CI/CD)

#### 1. Push ke GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

#### 2. Import Project di Vercel

1. Buka [vercel.com](https://vercel.com)
2. Klik **"Add New Project"**
3. Pilih repository GitHub Anda
4. Klik **"Import"**

#### 3. Konfigurasi Build Settings

Vercel akan otomatis mendeteksi:
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

Jika tidak terdeteksi otomatis, set manual:
- **Framework Preset**: Vite
- **Root Directory**: `./`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

#### 4. Set Environment Variables

Di halaman project settings:
1. Masuk ke **Settings** → **Environment Variables**
2. Tambahkan:
   - **Name**: `VITE_API_URL`
   - **Value**: URL backend API Anda (contoh: `https://api.example.com/api`)
   - **Environment**: Production, Preview, Development (pilih semua)

#### 5. Deploy

Klik **"Deploy"**. Vercel akan otomatis:
- Install dependencies
- Build project
- Deploy ke production

Setelah selesai, Anda akan mendapat URL production (contoh: `https://warung-pintar.vercel.app`)

### Metode 3: Deploy via Vercel Dashboard (Tanpa CLI)

1. Buka [vercel.com](https://vercel.com) dan login
2. Klik **"Add New Project"**
3. **Import Git Repository** atau **Upload** folder project
4. Konfigurasi build settings (sama seperti Metode 2)
5. Set environment variables
6. Klik **"Deploy"**

## ⚙️ Konfigurasi Vercel

File `vercel.json` sudah dikonfigurasi untuk SPA routing:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

Konfigurasi ini memastikan semua route diarahkan ke `index.html` untuk React Router.

## 🔐 Environment Variables

### Development (Lokal)

Buat file `.env` di root project:

```env
VITE_API_URL=http://localhost:8000/api
```

### Production (Vercel)

Set di Vercel Dashboard:
- **Settings** → **Environment Variables**
- Tambahkan `VITE_API_URL` dengan URL backend production

**Penting**: Semua environment variable yang dimulai dengan `VITE_` akan di-inject ke aplikasi saat build.

## 🐛 Troubleshooting

### Port sudah digunakan

Jika port 5173 sudah digunakan, Vite akan otomatis menggunakan port lain. Cek terminal untuk melihat port yang digunakan.

### Dependencies error

```bash
# Hapus node_modules dan package-lock.json
rm -rf node_modules package-lock.json

# Install ulang
npm install
```

### Build error di Vercel

1. Pastikan Node.js version di Vercel sesuai (set di `package.json`):
```json
{
  "engines": {
    "node": ">=18.0.0"
  }
}
```

2. Cek build logs di Vercel Dashboard untuk detail error

### API connection error

- Pastikan backend API berjalan dan accessible
- Cek CORS settings di backend
- Pastikan `VITE_API_URL` sudah di-set dengan benar

### Routing tidak bekerja di Vercel

Pastikan `vercel.json` sudah ada dan berisi konfigurasi rewrite untuk SPA.

## 📝 Scripts Tersedia

```bash
npm run dev      # Development server
npm run build    # Build untuk production
npm run preview  # Preview build production
npm run lint     # Run ESLint
```

## 🔗 Link Penting

- [Vite Documentation](https://vite.dev)
- [React Documentation](https://react.dev)
- [Vercel Documentation](https://vercel.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 📄 License

[Tambahkan license sesuai kebutuhan]

## 👥 Kontributor

[Tambahkan informasi kontributor]

---

**Selamat menggunakan Warung Pintar! 🎉**
