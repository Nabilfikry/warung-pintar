# 🚀 Panduan Deployment Vercel - Quick Start

## Deploy dalam 5 Menit

### Via GitHub (Paling Mudah)

1. **Push ke GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Import di Vercel**
   - Buka [vercel.com](https://vercel.com)
   - Klik "Add New Project"
   - Pilih repository Anda
   - Klik "Import"

3. **Set Environment Variable** (jika perlu)
   - Settings → Environment Variables
   - Name: `VITE_API_URL`
   - Value: URL backend Anda

4. **Deploy!**
   - Klik "Deploy"
   - Tunggu build selesai
   - Dapatkan URL production

### Via Vercel CLI

```bash
# Install CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy production
vercel --prod
```

## ⚙️ Konfigurasi Build

Vercel akan otomatis mendeteksi:
- ✅ Framework: Vite
- ✅ Build Command: `npm run build`
- ✅ Output Directory: `dist`
- ✅ Install Command: `npm install`

## 🔐 Environment Variables

Set di Vercel Dashboard:
- **VITE_API_URL**: URL backend API Anda

**Penting**: Semua variable harus dimulai dengan `VITE_` untuk bisa diakses di aplikasi.

## 📝 Checklist Sebelum Deploy

- [ ] Pastikan `npm run build` berhasil di lokal
- [ ] Test aplikasi dengan `npm run preview`
- [ ] Set environment variables di Vercel
- [ ] Pastikan backend API accessible (jika digunakan)
- [ ] Cek `vercel.json` sudah ada

## 🐛 Troubleshooting

**Build gagal?**
- Cek build logs di Vercel Dashboard
- Pastikan Node.js version >= 18.0.0
- Pastikan semua dependencies terinstall

**Routing tidak bekerja?**
- Pastikan `vercel.json` ada dengan konfigurasi rewrite

**API error?**
- Cek CORS settings di backend
- Pastikan `VITE_API_URL` sudah di-set
- Test API endpoint secara langsung

---

Untuk dokumentasi lengkap, lihat [README.md](./README.md)

