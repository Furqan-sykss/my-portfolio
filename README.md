# Portfolio — Next.js (App Router + Tailwind CSS)

Konversi **frontend-only** dari Laravel 11/12 ke **Next.js 14** (App Router).  
Tidak ada backend, tidak ada auth — murni tampilan.

---

## 📁 Struktur Project

```
portfolio-nextjs/
│
├── package.json
├── next.config.js
├── tailwind.config.js               ← Pengganti tailwind.config.js Laravel (isi identik)
├── postcss.config.js
│
├── app/
│   ├── layout.tsx                   ← Pengganti resources/views/layouts/app.blade.php
│   ├── globals.css                  ← Pengganti resources/css/app.css
│   └── page.tsx                     ← Pengganti resources/views/home.blade.php
│
└── components/
    ├── Navbar.tsx                   ← Bagian <nav> dari app.blade.php
    ├── TypedText.tsx                ← Logika Typed.js dari app.js
    ├── Counter.tsx                  ← Fungsi animateCounter() dari app.js
    └── FadeUp.tsx                   ← IntersectionObserver + .fade-up dari app.js
```

---

## 🔄 Mapping Laravel → Next.js

| Laravel                                      | Next.js                          | Keterangan                                   |
|----------------------------------------------|----------------------------------|----------------------------------------------|
| `resources/views/layouts/app.blade.php`      | `app/layout.tsx`                 | RootLayout otomatis membungkus semua halaman |
| `resources/views/home.blade.php`             | `app/page.tsx`                   | Route "/" otomatis di App Router             |
| `resources/css/app.css`                      | `app/globals.css`                | `@tailwind` directives identik               |
| `resources/js/app.js`                        | `components/*.tsx`               | Dipecah per fitur sebagai Client Components  |
| `tailwind.config.js`                         | `tailwind.config.js`             | Isi identik (warna + font Figtree)           |
| `@vite([...])`                               | Import di `layout.tsx`           | Next.js handle bundling otomatis             |
| `@yield('content')` / `@section('content')` | `{children}` di layout.tsx       | Next.js App Router pattern                   |
| `@extends('layouts.app')`                   | *(otomatis via App Router)*      | Tidak perlu deklarasi eksplisit              |
| `<span id="typed-text">`                    | `<TypedText />`                  | Client Component dengan useRef + Typed.js    |
| `data-counter="X"` + `animateCounter()`     | `<Counter target={X} />`         | Client Component dengan requestAnimationFrame|
| `class="fade-up"` + IntersectionObserver    | `<FadeUp>`                       | Client Component wrapper                     |
| `@if (auth()->check())`                     | *(dihapus — frontend only)*      | —                                            |

---

## 🚀 Cara Menjalankan

```bash
# 1. Install dependencies
npm install

# 2. Development server
npm run dev
```

Buka browser: **http://localhost:3000**

```bash
# Build untuk production
npm run build
npm start
```

---

## 📦 Dependencies

| Package                | Fungsi                                                        |
|------------------------|---------------------------------------------------------------|
| `next`                 | Framework utama (routing, SSR, bundling)                      |
| `react` + `react-dom`  | UI library                                                    |
| `typed.js`             | Typing animation (sama seperti di app.js Laravel, tapi via npm)|
| `tailwindcss`          | Utility CSS (konfigurasi identik dengan Laravel)              |
| `autoprefixer`         | PostCSS plugin (dibutuhkan Tailwind)                          |

---

## 💡 Catatan Teknis

### Kenapa ada `'use client'`?
Next.js App Router default-nya Server Component.  
Fitur-fitur berikut **butuh browser API** → harus jadi Client Component:

| Component      | Alasan `'use client'`                                      |
|----------------|------------------------------------------------------------|
| `Navbar.tsx`   | `localStorage`, `useState`, `useEffect`                    |
| `TypedText.tsx`| `useRef` untuk DOM node, `useEffect` untuk Typed.js init   |
| `Counter.tsx`  | `requestAnimationFrame`, `IntersectionObserver`            |
| `FadeUp.tsx`   | `IntersectionObserver`, `classList.add`                    |
