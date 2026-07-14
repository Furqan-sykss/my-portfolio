# Rincian Project Website SIRUNTU'

## 1. Gambaran Umum Project

Project ini adalah website portfolio dan company profile untuk **SIRUNTU' Creative Exploration**, sebuah creative agency atau tim kreatif yang berfokus pada pembuatan visual storytelling. Website ini dibuat sebagai single-page website modern yang menampilkan identitas agency, layanan, hasil pekerjaan, dokumentasi visual, social proof, dan jalur kontak utama.

Secara konsep, website ini tidak hanya menampilkan informasi statis, tetapi juga membangun pengalaman visual yang terasa sinematik, elegan, dan hidup. Fokus utamanya adalah memperkenalkan SIRUNTU' sebagai partner kreatif untuk dokumentasi wedding, konten brand, social media strategy, dan creative direction.

Website ini cocok digunakan sebagai:

- Landing page resmi SIRUNTU' Creative Exploration.
- Portfolio digital untuk menampilkan karya wedding dan brand.
- Company profile singkat yang menjelaskan layanan agency.
- Media konversi calon client melalui WhatsApp, email, dan Instagram.
- Presentasi visual untuk menunjukkan gaya kreatif, karakter brand, dan kemampuan dokumentasi.

## 2. Website Apa yang Dibuat

Website yang dibuat adalah **website agency kreatif / creative studio portfolio**. Formatnya adalah halaman utama tunggal dengan beberapa section berurutan:

1. Preloader
2. Hero
3. About
4. Selected Work
5. Documentation Gallery
6. Services
7. Trusted By
8. Contact

Semua section berada dalam satu route utama `/`, sehingga pengguna cukup melakukan scroll untuk membaca seluruh isi website. Navigasi diarahkan melalui anchor link seperti `#work` dan `#contact`, bukan melalui banyak halaman terpisah.

Jenis website ini termasuk kategori:

- Creative agency website
- Wedding documentation portfolio
- Brand content portfolio
- Social media and visual direction studio profile
- One-page landing website

## 3. Profil Agency yang Diangkat

Agency yang diangkat adalah **SIRUNTU' Creative Exploration**.

Berdasarkan isi project, SIRUNTU' diposisikan sebagai tim kreatif yang membantu brand dan momen penting agar memiliki cerita visual yang kuat. Agency ini bergerak di bidang:

- Wedding documentation
- Photography
- Videography
- Brand content
- Social media content handling
- Instagram feed and reels planning
- TikTok content direction
- Product visual
- Creative direction
- Campaign and visual storytelling

Narasi utama dari agency ini adalah bahwa visual yang bermakna dapat membuat momen bertahan lebih lama dan membantu brand berbicara dengan lebih percaya diri. Karena itu, tone komunikasinya dibuat elegan, human, cinematic, dan strategis.

Dalam konten website, SIRUNTU' disebut berbasis di Aceh dan juga mengerjakan project di luar kota, termasuk Jakarta. Pada bagian hero dan metadata, agency juga dikaitkan dengan Jakarta, Indonesia sebagai lokasi komunikasi/contact.

## 4. Bidang dan Layanan Agency

Website ini menjelaskan tiga fokus layanan utama:

### 4.1 Wedding Documentation

Layanan dokumentasi foto dan video untuk wedding. Fokusnya adalah menangkap emosi, detail acara, suasana venue, momen ceremony, reception, keluarga, pasangan, dekorasi, dan hasil akhir yang terasa cinematic.

Contoh project yang ditampilkan:

- Wedding of Egia & Adam di Tuscan Dreams, Jakarta Selatan
- Wedding of Caca & Andy di Club House, Cibubur

Project wedding juga dikaitkan dengan kolaborasi bersama Palm Wedding Organizer.

### 4.2 Brand & Social Media

Layanan untuk brand yang membutuhkan pengelolaan visual dan strategi konten sosial media. Fokusnya meliputi:

- Social media strategy
- Feed planning
- Reels content
- TikTok content
- Product storytelling
- Brand consistency
- Visual identity direction

Contoh project yang ditampilkan adalah **KENIYORU Skincare Brand**, yaitu project brand handling untuk skincare brand yang mencakup arah visual, perencanaan feed, ide konten, dan komunikasi brand.

### 4.3 Creative Direction

Layanan pengembangan konsep visual, arah kreatif, product visuals, studio direction, dan campaign ideas. Layanan ini cocok untuk brand atau individu yang membutuhkan tampilan visual yang lebih jelas, konsisten, dan siap dipublikasikan.

Contoh project yang ditampilkan adalah **SIRUNTU Creative Exploration**, yaitu project internal untuk memperkenalkan SIRUNTU' sebagai partner kreatif dalam strategi social media dan visual development.

## 5. Struktur Konten Website

### 5.1 Preloader

Preloader adalah tampilan pembuka sebelum halaman utama muncul. Preloader menampilkan sequence kata:

- Explore
- Capture
- Shape
- Collaborate

Setelah sequence kata selesai, brand **SIRUNTU'** muncul bersama tagline **Experience the Power of Creative Exploration**.

Preloader memiliki beberapa fungsi:

- Membangun first impression yang cinematic.
- Memberi identitas visual sejak awal.
- Menghubungkan proses kerja agency dengan pengalaman loading.
- Menjadi transisi visual sebelum masuk ke Hero.

Preloader hanya ditampilkan sekali dalam satu session browser. Setelah user pernah melihatnya, status disimpan di `sessionStorage` dengan key `siruntu-intro-seen`, sehingga preloader tidak terus muncul ketika halaman dimuat ulang pada session yang sama.

### 5.2 Hero

Hero adalah section utama setelah preloader. Hero menampilkan headline:

**We Create Visual Stories That Stay**

Pesan utamanya adalah SIRUNTU' membantu brand dan celebration tumbuh melalui photography, video, social media content, dan visual exploration.

Elemen penting di Hero:

- Logo/mark SIRUNTU' kecil sebagai identitas.
- Headline besar dengan kombinasi display serif dan italic accent.
- Deskripsi singkat agency.
- CTA menuju portfolio: `View Our Work`.
- CTA menuju kontak: `Contact Us`.
- Collage visual berisi tiga kategori:
  - Wedding Film
  - Brand Content
  - Creative Direction

Collage menggunakan image dari folder `public/img`, sehingga hero tidak kosong dan langsung menunjukkan mood visual dokumentasi.

### 5.3 About

About menjelaskan filosofi SIRUNTU'. Narasinya menekankan bahwa meaningful visuals membantu momen bertahan lebih lama dan membantu brand berbicara dengan percaya diri.

Bagian ini juga menjelaskan bahwa SIRUNTU' adalah tim kreatif compact yang bekerja dengan trusted collaborators. Bidang yang disebut meliputi wedding documentation, brand content, social media strategy, dan visual direction.

Di section ini terdapat proses kerja 4 langkah:

1. Explore
2. Capture
3. Shape
4. Collaborate

Empat kata ini sengaja konsisten dengan preloader, sehingga website terasa memiliki benang merah dari awal sampai bagian penjelasan agency.

### 5.4 Works / Selected Work

Section Works menampilkan daftar project pilihan. Project ditampilkan dalam bentuk sticky stacking cards yang mengikuti scroll. Setiap card dapat diklik untuk membuka modal detail project.

Project yang tersedia:

1. Wedding of Egia & Adam
2. Wedding of Caca & Andy
3. KENIYORU Skincare Brand
4. SIRUNTU Creative Exploration

Setiap project memiliki detail:

- Title
- Category
- Venue atau konteks project
- Summary
- Intro
- Approach
- Highlights
- Project note

Modal project memiliki overlay gelap, blur backdrop, tombol close, area preview visual, informasi venue, tag project, highlight grid, dan catatan project. Modal juga mendukung close dengan tombol Escape.

### 5.5 Documentation

Documentation adalah section gallery visual yang menampilkan foto dokumentasi dari folder `public/img`.

Pada desktop/tablet besar, section ini menggunakan gallery empat kolom vertikal dengan efek parallax scroll. Kolom gambar bergerak dengan kecepatan berbeda sehingga memberi efek cinematic dan dinamis.

Pada mobile, layout berubah menjadi carousel dengan Swiper menggunakan `EffectCards`. Ini membuat pengalaman mobile lebih praktis karena pengguna dapat melihat foto satu per satu dalam format kartu.

Section Documentation menunjukkan bahwa SIRUNTU' tidak hanya bicara tentang layanan, tetapi juga memiliki material visual nyata yang bisa dinikmati langsung oleh pengunjung.

### 5.6 Services

Services menjelaskan tiga layanan utama:

1. Wedding Documentation
2. Brand & Social Media
3. Creative Direction

Layout section ini berupa daftar horizontal responsif dengan nomor, judul, deskripsi, dan tag layanan. Desainnya rapi dan editorial, bukan card marketing yang terlalu berat.

Bagian akhir section memiliki CTA:

**Have a project in mind?**

CTA ini diarahkan ke kontak.

### 5.7 Trusted

Trusted adalah section social proof berbentuk marquee. Karena client yang sudah diverifikasi hanya dua, website tidak menambahkan nama client palsu. Nama yang digunakan:

- KENIYORU
- Palm Wedding Organizer

Selain client, terdapat baris kedua yang menampilkan capability:

- Wedding Film
- Brand & Social Media
- Creative Direction

Marquee berjalan dua arah berbeda agar section terasa dinamis dan menjadi transisi yang kuat sebelum Contact.

### 5.8 Contact

Contact menjadi section penutup. Tujuannya adalah mengubah pengunjung menjadi calon client melalui CTA langsung.

Informasi kontak yang ditampilkan:

- WhatsApp: +62 882-1294-7116
- Email: hello@siruntu.id
- Instagram: @siruntuofficial
- Lokasi: Jakarta, Indonesia

CTA utama:

- Chat via WhatsApp
- Send Email

Catatan di kode menyebut bahwa detail kontak masih bersifat placeholder dan bisa diganti dengan mudah melalui constant di file `Contact.tsx`.

## 6. Tools, Framework, dan Library yang Digunakan

### 6.1 Next.js 16.2.10

Project menggunakan **Next.js 16.2.10** dengan struktur App Router di dalam folder `src/app`. File utama route berada di:

- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/app/globals.css`

`layout.tsx` berperan sebagai root layout yang membungkus seluruh halaman, mengatur metadata, global CSS, dan provider smooth scroll.

`page.tsx` adalah halaman utama `/` yang menyusun semua section dalam urutan:

Preloader, Hero, About, Works, Documentation, Services, Trusted, Contact.

### 6.2 React 19.2.4

React digunakan untuk membangun komponen UI. Banyak komponen memakai `useState`, `useEffect`, dan `useRef` karena halaman ini memiliki banyak interaksi client-side seperti preloader, modal, carousel, scroll animation, parallax, dan pointer interaction.

### 6.3 TypeScript

Project menggunakan TypeScript. File komponen memakai ekstensi `.tsx`, sehingga prop, type, dan struktur data bisa lebih aman dan jelas.

Contoh penggunaan type:

- `type Variants` dari Framer Motion
- `type MotionValue`
- Type props untuk komponen seperti `Hero`, `ProjectModal`, `DesktopColumn`, dan `Carousel002`

### 6.4 Tailwind CSS 4

Styling utama menggunakan Tailwind CSS versi 4. Tailwind di-import langsung melalui:

```css
@import "tailwindcss";
```

Project juga menggunakan `@theme inline` untuk membuat design token berbasis CSS variable, seperti:

- `--color-bg`
- `--color-text`
- `--color-gold`
- `--color-line`
- `--font-display`
- `--font-sans`

Pendekatan ini membuat warna dan font bisa konsisten di seluruh website.

### 6.5 Framer Motion

Framer Motion digunakan sebagai engine animasi utama. Digunakan untuk:

- Preloader animation
- Curtain exit
- Text reveal
- Fade up animation
- Scroll-triggered reveal
- Sticky card scale
- Modal enter/exit animation
- Backdrop blur
- Parallax transform
- Pointer-based tilt effect
- SVG logo draw animation

Framer Motion membuat website terasa lebih premium dan tidak sekadar statis.

### 6.6 Lenis

Lenis digunakan untuk smooth scrolling global melalui komponen `SmoothScrollProvider`.

Konfigurasi Lenis:

- `root`
- `lerp: 0.1`
- `duration: 1.2`
- `smoothWheel: true`
- `anchors: true`

Dengan `anchors: true`, link seperti `#work` dan `#contact` tetap bisa digunakan dengan smooth scroll.

Lenis otomatis dimatikan jika user mengaktifkan `prefers-reduced-motion`, sehingga website tetap memperhatikan aksesibilitas.

### 6.7 Swiper

Swiper digunakan pada section Documentation versi mobile. Modul yang dipakai:

- `Autoplay`
- `EffectCards`
- `Navigation`
- `Pagination`

Efek utama yang dipakai adalah `EffectCards`, sehingga gallery mobile tampil seperti stack kartu yang bisa digeser.

### 6.8 Lucide React

Lucide React digunakan untuk ikon di interface, terutama:

- `Images`
- `MapPin`
- `Play`
- `X`
- `ChevronLeftIcon`
- `ChevronRightIcon`

Ikon dipakai pada modal project dan carousel navigation.

### 6.9 ESLint

Project menyediakan script lint:

```bash
npm run lint
```

ESLint digunakan untuk menjaga konsistensi kode dan menghindari error umum.

### 6.10 Font Lokal

Font tidak bergantung pada package eksternal. Font disimpan di `public/fonts` dan dimuat manual melalui `@font-face`.

Font yang digunakan:

- Fraunces Variable untuk display/heading
- Schibsted Grotesk Variable untuk body/sans text

Pendekatan self-hosted font membuat website lebih stabil dan tidak bergantung pada koneksi ke font provider eksternal.

## 7. Struktur Folder Penting

Struktur utama project:

```text
siruntu-official/
+-- public/
|   +-- fonts/
|   +-- img/
+-- src/
|   +-- app/
|   |   +-- globals.css
|   |   +-- layout.tsx
|   |   +-- page.tsx
|   +-- components/
|       +-- SmoothScrollProvider.tsx
|       +-- marks/
|       |   +-- SiruntuMark.tsx
|       +-- sections/
|           +-- About.tsx
|           +-- Contact.tsx
|           +-- Documentation.tsx
|           +-- Hero.tsx
|           +-- Preloader.tsx
|           +-- Services.tsx
|           +-- Trusted.tsx
|           +-- Works.tsx
+-- package.json
+-- next.config.ts
+-- tsconfig.json
+-- eslint.config.mjs
```

Penjelasan singkat:

- `public/fonts`: menyimpan file font lokal.
- `public/img`: menyimpan asset gambar dokumentasi.
- `src/app`: menyimpan route, layout, dan global style Next.js.
- `src/components/sections`: menyimpan section utama landing page.
- `src/components/marks`: menyimpan logo/mark SVG SIRUNTU'.
- `SmoothScrollProvider.tsx`: wrapper smooth scroll untuk seluruh website.

## 8. Desain Visual dan Identitas

Website memakai gaya visual yang editorial, cinematic, dan premium. Warna utama menggunakan kombinasi:

- Navy gelap untuk kesan dalam, sinematik, dan elegan.
- Soft pastel pink untuk kesan hangat, human, dan romantic.
- White section untuk area yang lebih clean dan fungsional.
- Accent pink/gold-soft untuk tombol, highlight, dan elemen penting.

Design token utama diatur melalui CSS variable:

- `--bg`
- `--bg-section`
- `--surface`
- `--surface-2`
- `--text`
- `--text-muted`
- `--gold`
- `--gold-soft`
- `--burgundy`
- `--line`

Terdapat tiga mood section:

1. Default/navy: digunakan untuk Preloader, Hero, Works, dan Trusted.
2. Pink: digunakan untuk About, Services, dan Contact.
3. White: digunakan untuk Documentation.

Logo SIRUNTU' dibuat sebagai SVG animatable dengan `currentColor`, sehingga warnanya otomatis mengikuti konteks section. Di dark section logo tampil terang, sedangkan di light section logo mengikuti warna navy/dark text.

## 9. Animasi yang Digunakan

### 9.1 Preloader Word Sequence

Preloader menampilkan kata secara bergantian:

Explore, Capture, Shape, Collaborate.

Setiap kata masuk dengan gerakan dari bawah ke posisi normal, lalu keluar ke atas. Ini memberi kesan proses kreatif yang bergerak dari eksplorasi sampai kolaborasi.

### 9.2 Progress Counter

Preloader memiliki angka progress dari 0 sampai 100 persen. Angka ini menggunakan motion value dari Framer Motion, lalu dibulatkan dan ditampilkan sebagai status loading.

### 9.3 Curtain Rise Exit

Setelah preloader selesai, panel preloader bergerak ke atas seperti curtain atau tirai panggung. Efek shadow ditambahkan agar panel terasa memiliki kedalaman dan bobot.

### 9.4 Animated SiruntuMark

Logo/mark SIRUNTU' dibuat dari SVG primitives:

- Path zigzag
- Beberapa titik
- Dua garis diagonal

Ketika `animate` aktif, path digambar menggunakan animasi `pathLength`, titik muncul dengan scale/opacity, dan garis diagonal ikut muncul setelahnya.

### 9.5 Hero Line Reveal

Headline hero memakai line reveal. Setiap baris teks berada dalam wrapper `overflow-hidden`, lalu teks bergerak dari bawah ke atas. Efeknya terlihat seperti teks muncul dari balik mask.

### 9.6 Fade Up

Banyak section memakai animasi fade up:

- Opacity dari 0 ke 1
- Posisi Y dari 20/24px ke 0

Animasi ini dipakai pada About, Services, Contact, dan beberapa elemen Hero.

### 9.7 Stagger Children

Framer Motion menggunakan stagger children agar elemen tidak muncul bersamaan. Ini membuat reveal terasa lebih natural, rapi, dan tidak terlalu mendadak.

### 9.8 Pointer Tilt di Hero

Pada perangkat dengan pointer halus seperti mouse desktop/laptop, collage hero dan watermark mark bereaksi terhadap posisi cursor. Nilai cursor dinormalisasi menjadi rentang -1 sampai 1, lalu diubah menjadi:

- `rotateX`
- `rotateY`
- `x`
- `y`

Efek ini membuat hero terasa interaktif tanpa menggunakan WebGL.

### 9.9 Idle Float di Touch Device

Pada perangkat touch seperti mobile/tablet, tidak ada cursor hover. Karena itu collage hero memakai animasi idle rotation pelan agar tetap terasa hidup.

### 9.10 Scroll Cue

Hero memiliki scroll cue berupa teks kecil dan garis vertikal yang bergerak naik turun. Fungsinya memberi sinyal bahwa halaman bisa discroll.

### 9.11 Sticky Stacking Cards

Pada section Works, project card menggunakan posisi sticky. Saat user scroll, kartu tampak menumpuk dan mengalami scale transform. Efek ini membuat portfolio terasa interaktif dan memberi fokus satu per satu pada project.

### 9.12 Modal Animation

Ketika project card diklik, modal muncul dengan:

- Overlay gelap
- Backdrop blur
- Panel bergerak naik
- Scale dari 0.96 ke 1
- Filter blur yang hilang saat masuk

Ketika ditutup, animasi keluar berjalan melalui `AnimatePresence`.

### 9.13 Documentation Parallax

Pada desktop, gallery Documentation menggunakan empat kolom gambar. Masing-masing kolom memiliki nilai transform Y yang berbeda berdasarkan scroll progress. Ini menciptakan efek parallax multi-column.

### 9.14 Mobile Card Carousel

Pada mobile, gallery Documentation menggunakan Swiper dengan `EffectCards`. Gambar tampil seperti tumpukan kartu yang bisa digeser.

### 9.15 Trusted Marquee

Trusted section menggunakan animasi CSS keyframes:

- `marquee-left`
- `marquee-right`

Dua baris bergerak berlawanan arah agar section terasa hidup dan menjadi jeda dinamis sebelum CTA.

### 9.16 Reduced Motion Support

Website memiliki perhatian terhadap aksesibilitas motion. Pada CSS global terdapat media query:

```css
@media (prefers-reduced-motion: reduce)
```

Jika user memilih reduced motion, durasi animasi dan transition dipangkas menjadi sangat singkat. Lenis juga dimatikan melalui `SmoothScrollProvider` jika reduced motion aktif.

## 10. Responsivitas Website

Website dibangun dengan Tailwind responsive utilities seperti:

- `sm:`
- `md:`
- `lg:`
- `xl:`

Selain itu digunakan ukuran modern seperti:

- `svh`
- `dvh`
- `clamp`
- responsive grid
- responsive spacing
- responsive typography
- responsive aspect ratio

### 10.1 Desktop / Laptop

Pada desktop dan laptop, layout dibuat lebih luas dan editorial.

Karakter desktop:

- Hero menggunakan layout dua kolom: teks di kiri dan collage visual di kanan.
- Headline hero tampil besar dengan ukuran clamp dan display typography.
- Collage hero memiliki efek pointer tilt mengikuti cursor.
- Works memakai layout dua kolom pada ukuran `xl`: teks intro sticky di kiri dan sticky cards di kanan.
- Documentation memakai gallery empat kolom dengan parallax scroll.
- Services tampil dalam grid/list horizontal dengan nomor, title, deskripsi, dan tag yang rapi.
- Contact memiliki layout tengah dengan ukuran heading besar.
- Padding section lebih luas menggunakan `lg:px-16` dan `lg:py-32`.

Desktop adalah pengalaman paling lengkap karena semua efek scroll, sticky, parallax, dan pointer interaction aktif.

### 10.2 Tablet

Pada tablet, layout tetap mempertahankan visual premium tetapi lebih compact.

Karakter tablet:

- Hero masih dapat tampil dua kolom pada breakpoint `md`, tetapi gap dan ukuran elemen lebih kecil.
- Collage tetap tampil sebagai grid visual, namun aspect ratio dan ukuran mengikuti ruang layar.
- About dan Services menggunakan grid dua kolom pada beberapa bagian.
- Works tetap nyaman dibaca karena card memiliki max width dan sticky spacing yang disesuaikan.
- Documentation akan mengikuti kondisi viewport. Jika lebar lebih dari 767px, mode desktop/parallax digunakan. Jika lebar masuk mobile threshold, mode carousel digunakan.
- CTA tetap berbentuk tombol rounded dan mudah disentuh.

Tablet menjadi bridge antara desktop dan mobile: masih visual, tetapi tidak terlalu padat.

### 10.3 Mobile

Pada mobile, website berubah menjadi layout satu kolom yang lebih linear dan mudah discroll.

Karakter mobile:

- Hero menjadi stacked layout: teks di atas, collage di bawah.
- Headline menggunakan ukuran berbasis viewport seperti `text-[13vw]` dan `text-[15vw]`, sehingga tetap besar tetapi menyesuaikan layar.
- Collage hero tidak memakai pointer tilt, tetapi memakai idle float karena device touch tidak memiliki cursor.
- Works card tetap aspect-video dan bisa diklik untuk membuka modal.
- Modal project memakai layout vertikal dan scrollable agar konten panjang tetap bisa dibaca.
- Documentation berubah total menjadi Swiper card carousel, bukan empat kolom parallax.
- Services berubah menjadi daftar vertikal.
- Contact links menjadi grid satu kolom sebelum naik ke tiga kolom pada `sm`.
- Padding mobile menggunakan `px-6` dan `py-24`, cukup lega tetapi tetap hemat ruang.

Mobile dibuat untuk pengalaman yang lebih sederhana, touch-friendly, dan tidak memaksa layout desktop masuk ke layar kecil.

## 11. Aksesibilitas dan User Experience

Beberapa perhatian UX dan aksesibilitas yang sudah diterapkan:

- Preloader memiliki `role="status"` dan `aria-live="polite"`.
- Modal project memiliki `role="dialog"` dan `aria-modal="true"`.
- Tombol close modal memiliki `aria-label`.
- Project card dapat dibuka menggunakan keyboard dengan Enter atau Space.
- Modal dapat ditutup dengan tombol Escape.
- Body scroll dikunci saat modal terbuka agar user tidak scroll halaman belakang.
- Scroll dalam modal diberi `data-lenis-prevent` agar tidak bentrok dengan smooth scroll global.
- Website menghormati `prefers-reduced-motion`.
- Gambar carousel mobile memiliki alt text.
- Logo dekoratif diberi `aria-hidden`.
- Link kontak menggunakan format yang langsung dapat digunakan: WhatsApp, mailto, dan Instagram.

## 12. Asset yang Digunakan

Asset utama berada di folder:

```text
public/img
```

Folder ini berisi banyak file gambar dokumentasi dengan nama seperti:

- `IMG-20240313-WA0000.jpg`
- `IMG-20240313-WA0051.jpg`
- `IMG-20240314-WA0048.jpeg`
- `IMG-20240315-WA0038.jpeg`
- dan lain-lain

Gambar digunakan untuk:

- Hero collage
- Documentation desktop parallax gallery
- Documentation mobile carousel

Selain gambar, terdapat font di:

```text
public/fonts
```

Font digunakan secara self-hosted melalui `@font-face`.

## 13. SEO dan Metadata

Metadata project berada di `src/app/layout.tsx`.

Title:

```text
SIRUNTU' - Creative Exploration
```

Description:

```text
SIRUNTU' Creative Exploration is a creative team for wedding documentation, brand content, social media strategy, and visual storytelling.
```

Metadata ini membantu browser dan search engine memahami bahwa website ini adalah website creative team untuk wedding documentation, brand content, social media strategy, dan visual storytelling.

## 14. Alur Pengalaman Pengunjung

Alur pengalaman user dirancang seperti ini:

1. User membuka website dan melihat preloader cinematic.
2. User masuk ke Hero dan langsung memahami brand promise: visual stories that stay.
3. User membaca About untuk memahami filosofi dan cara kerja SIRUNTU'.
4. User melihat Selected Work untuk melihat contoh project.
5. User membuka detail project jika tertarik.
6. User melihat Documentation Gallery sebagai bukti visual.
7. User membaca Services untuk memahami paket/fokus layanan.
8. User melihat Trusted section sebagai social proof.
9. User diarahkan ke Contact untuk menghubungi melalui WhatsApp, email, atau Instagram.

Alur ini cocok untuk agency karena dimulai dari branding, lalu trust, lalu bukti karya, lalu layanan, lalu konversi.

## 15. Catatan Teknis Penting

Beberapa catatan teknis dari project:

- Hampir semua section menggunakan `"use client"` karena banyak interaksi, animasi, browser API, atau state.
- `SmoothScrollProvider` membungkus seluruh app di `layout.tsx`.
- `Preloader` mengontrol kapan Hero mulai menjalankan animasi melalui state `introDone` di `page.tsx`.
- `Works` menyimpan data project langsung dalam array lokal.
- `Documentation` memiliki dua mode render: mobile dan non-mobile.
- `Contact` menyimpan data WhatsApp, email, dan Instagram dalam constant agar mudah diganti.
- `globals.css` menjadi pusat design token, font, scrollbar modal, marquee animation, dan reduced motion rule.
- Website menggunakan pendekatan component-based sehingga tiap section mudah diedit secara terpisah.

## 16. Potensi Pengembangan Lanjutan

Project ini sudah memiliki pondasi visual dan teknis yang kuat. Beberapa pengembangan yang bisa dilakukan berikutnya:

- Mengganti semua placeholder detail kontak dengan kontak final resmi.
- Menambahkan foto/video real ke project card Works, bukan hanya placeholder visual.
- Menambahkan halaman detail project terpisah jika portfolio semakin banyak.
- Menambahkan CMS agar client dapat mengubah project, layanan, dan gallery tanpa edit kode.
- Menambahkan SEO Open Graph image untuk preview ketika link dibagikan.
- Menambahkan analytics untuk memantau CTA WhatsApp, email, dan Instagram.
- Menambahkan form inquiry langsung di website.
- Mengoptimalkan penggunaan `next/image` untuk image optimization jika diperlukan.
- Menambahkan sitemap dan robots untuk kesiapan production SEO.
- Menambahkan test visual/responsive untuk memastikan layout tetap stabil saat konten berubah.

## 17. Kesimpulan

Project ini adalah website portfolio agency kreatif untuk **SIRUNTU' Creative Exploration**. Website dibuat dengan gaya visual premium, cinematic, dan responsif. Fokus isinya adalah memperkenalkan SIRUNTU' sebagai tim kreatif yang bergerak di wedding documentation, brand content, social media strategy, dan creative direction.

Dari sisi teknis, project menggunakan Next.js 16, React 19, TypeScript, Tailwind CSS 4, Framer Motion, Lenis, Swiper, dan Lucide React. Website memiliki animasi yang cukup lengkap, mulai dari preloader, text reveal, scroll animation, parallax gallery, modal transition, marquee, hingga mobile carousel.

Dari sisi responsif, website sudah menyesuaikan pengalaman untuk desktop/laptop, tablet, dan mobile. Desktop mendapat pengalaman paling imersif dengan parallax dan pointer tilt, tablet mendapat layout yang tetap visual namun lebih compact, sedangkan mobile mendapat layout satu kolom dan carousel yang lebih nyaman disentuh.

Secara keseluruhan, website ini berfungsi sebagai identitas digital, portfolio, dan media konversi untuk SIRUNTU' Creative Exploration.
