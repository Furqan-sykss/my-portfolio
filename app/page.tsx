"use client";

import { useRef, useState, useEffect, useCallback, type CSSProperties } from "react";
import NextImage from "next/image";
import TypedText from "@/components/TypedText";
import { useLanguage } from "@/components/LanguageProvider";
import { translate } from "@/components/siteTranslations";
import Counter from "@/components/Counter";
import FadeUp from "@/components/FadeUp";
import CertificationsClient from "@/components/CertificationsClient";
import AdditionalProjectsClient from "@/components/AdditionalProjectsClient";

// ────── Data ────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────

type Localized = { id: string; en: string };
type LocalizedText = Localized | string;

const skills: { category: Localized; items: string[]; icon: string }[] = [
  {
    category: {
      id: "Bahasa Pemrograman",
      en: "Programming Languages",
    },
    items: ["JavaScript", "Python", "PHP", "Dart"],
    icon: "{ }",
  },
  {
    category: {
      id: "Framework",
      en: "Frameworks",
    },
    items: ["Laravel", "Next.js", "Flask", "Flutter"],
    icon: "</>",
  },
  {
    category: {
      id: "Frontend",
      en: "Frontend",
    },
    items: ["HTML5", "CSS3", "Tailwind CSS", "Bootstrap"],
    icon: "[]",
  },
  {
    category: {
      id: "Tools & Database",
      en: "Tools & Databases",
    },
    items: ["MySQL", "PostgreSQL", "Git", "GitHub", "Vercel", "Selenium", "Figma", "Canva", "Laragon", "XAMPP", "Microsoft Office"],
    icon: "DB",
  },
  {
    category: {
      id: "Digital Presence",
      en: "Digital Presence",
    },
    items: ["Digital Branding", "Content Planning", "Instagram", "Google Business Profile", "Link-in-Bio", "Copywriting"],
    icon: "DM",
  },
];

type Project = {
  title: Localized;
  period: Localized;
  tag: Localized;
  desc: Localized;
  stack: string[];
  detail: { highlights: Localized[]; links: { label: LocalizedText; href: string; icon?: string }[] };
};

const projects: Project[] = [
  {
    title: { id: "Sitestaq.id", en: "Sitestaq.id" },
    period: { id: "Agu 2026 - Okt 2026", en: "Aug 2026 - Oct 2026" },
    tag: { id: "Brand Digital Mandiri", en: "Self-Directed Digital Brand" },
    desc: {
      id: "Membuat dan mengembangkan Sitestaq.id sebagai proyek brand digital mandiri yang menggabungkan website, positioning layanan, konten Instagram, Linktree, dan kehadiran Google untuk menunjukkan bagaimana sebuah jasa website dapat dibangun sebagai identitas digital yang utuh.",
      en: "Created and developed Sitestaq.id as a self-directed digital brand project combining a website, service positioning, Instagram content, Linktree, and Google presence to demonstrate how a website service can be shaped into a cohesive digital identity.",
    },
    stack: ["Digital Branding", "Website", "Instagram", "Google Business Profile", "Linktree", "Copywriting", "Canva"],
    detail: {
      highlights: [
        {
          id: "Membangun identitas Sitestaq.id sebagai layanan pembuatan website dengan positioning visual yang konsisten di website, Instagram, dan Linktree.",
          en: "Built Sitestaq.id's identity as a website creation service with consistent visual positioning across the website, Instagram, and Linktree.",
        },
        {
          id: "Menyusun konten dan pesan pemasaran untuk menjelaskan layanan website secara sederhana, profesional, dan mudah dipahami audiens.",
          en: "Prepared content and marketing messages that explain website services in a simple, professional, and audience-friendly way.",
        },
        {
          id: "Membuat jalur digital presence melalui Instagram, Linktree, Google Search, dan Google Business Profile berdasarkan bukti screenshot yang tersedia.",
          en: "Created a digital presence path through Instagram, Linktree, Google Search, and Google Business Profile based on the available screenshot evidence.",
        },
        {
          id: "Menggunakan proyek ini sebagai praktik digital marketing untuk menghubungkan brand, website, media sosial, dan visibilitas pencarian.",
          en: "Used this project as digital marketing practice to connect brand, website, social media, and search visibility.",
        },
      ],
      links: [
        { label: { id: "Website", en: "Website" }, href: "http://sitestaq.id", icon: "external" },
        { label: "Instagram", href: "https://www.instagram.com/sitestaq.id", icon: "external" },
        { label: { id: "Linktree", en: "Linktree" }, href: "linktr.ee/sitestaq.id", icon: "external" },
        { label: { id: "Blog", en: "Blog" }, href: "https://sitestaq.blogspot.com/", icon: "external" },
      ],
    },
  },

  {
    title: {
      id: "SIRUNTU' Creative Agency Website",
      en: "SIRUNTU' Creative Agency Website",
    },
    period: {
      id: "Jun 2026 - Juli 2026",
      en: "Jun 2026 - July 2026",
    },
    tag: {
      id: "Proyek Klien Komersial",
      en: "Commercial Client Project",
    },
    desc: {
      id: "Merancang dan mengembangkan website single-page premium untuk SIRUNTU' Creative Exploration, sebuah agency kreatif yang bergerak di bidang wedding documentation, brand content, social media strategy, dan visual storytelling. Website ini dibangun dengan pendekatan cinematic dan editorial untuk memperkuat identitas digital agency melalui animasi interaktif, showcase project yang imersif, galeri visual responsif, serta pengalaman pengguna modern yang berfokus pada branding dan konversi calon klien.",
      en: "Designed and developed a premium single-page website for SIRUNTU' Creative Exploration, a creative agency specializing in wedding documentation, brand content, social media strategy, and visual storytelling. The website was crafted with a cinematic and editorial approach to strengthen the agency's digital identity through immersive animations, interactive project showcases, responsive visual galleries, and a modern user experience focused on branding and client conversion.",
    },
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Lenis", "Swiper", "Lucide React", "Vercel", "Git", "GitHub"],
    detail: {
      highlights: [
        {
          id: "Mengembangkan website agency kreatif premium dengan pendekatan visual cinematic dan editorial.",
          en: "Developed a premium creative agency website with a cinematic and editorial visual approach.",
        },
        {
          id: "Merancang showcase project interaktif menggunakan sticky stacking cards dan modal animasi.",
          en: "Designed interactive project showcases using sticky stacking cards and animated modal experiences.",
        },
        {
          id: "Membangun galeri dokumentasi responsif dengan efek parallax pada desktop dan card carousel pada mobile.",
          en: "Built responsive documentation galleries with parallax effects on desktop and card-based carousel interactions on mobile.",
        },
        {
          id: "Mengimplementasikan animasi lanjutan menggunakan Framer Motion, termasuk preloader sequence, text reveal, dan scroll-triggered transitions.",
          en: "Implemented advanced animations with Framer Motion, including preloader sequences, text reveals, and scroll-triggered transitions.",
        },
        {
          id: "Menerapkan smooth scrolling, responsive layout, dan dukungan reduced motion untuk meningkatkan pengalaman pengguna.",
          en: "Integrated smooth scrolling, responsive layouts, and reduced-motion support to enhance user experience.",
        },
        {
          id: "Mengembangkan struktur komponen modular berbasis Next.js App Router dan TypeScript.",
          en: "Developed a modular component architecture using Next.js App Router and TypeScript.",
        },
        {
          id: "Mengoptimalkan tampilan untuk desktop, tablet, dan mobile dengan pendekatan mobile-first responsive design.",
          en: "Optimized the interface for desktop, tablet, and mobile devices through a mobile-first responsive design approach.",
        },
        {
          id: "Berhasil menyelesaikan pengerjaan project website komersial untuk memperkuat branding digital dan jalur konversi klien agency.",
          en: "Completed  the commercial website project to strengthen the agency's digital branding and client conversion strategy.",
        },
      ],
      links: [
        {
          label: {
            id: "Demo Langsung",
            en: "Live Demo",
          },
          href: "https://siruntu.vercel.app",
          icon: "external",
        },
        {
          label: "GitHub",
          href: "https://github.com/Furqan-sykss/siruntu-official",
          icon: "github",
        },
      ],
    },
  },
  {
    title: {
      id: "Template Website Portofolio",
      en: "Reusable Portfolio Website Templates",
    },
    period: {
      id: "Maret 2026 - Sekarang",
      en: "March 2026 - Present",
    },
    tag: {
      id: "Produk Digital",
      en: "Digital Product",
    },
    desc: {
      id: "Merancang dan mengembangkan template website portofolio yang dapat digunakan kembali menggunakan Next.js, TypeScript, Tailwind CSS, Framer Motion, dan Embla Carousel. Setiap template mengeksplorasi pendekatan desain yang berbeda, mulai dari tata letak berfokus pada pengembang hingga gaya editorial modern. Seluruh template dipublikasikan melalui GitHub, dideploy di Vercel sebagai demonstrasi langsung, dan beberapa variasinya telah digunakan oleh klien individu.",
      en: "Designed and developed reusable portfolio website templates using Next.js, TypeScript, Tailwind CSS, Framer Motion, and Embla Carousel. Each template explores a distinct design direction, ranging from developer-focused layouts to editorial-inspired portfolios. The templates are published on GitHub, deployed on Vercel for live demonstrations, and selected variations have been delivered to individual clients.",
    },
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Embla Carousel", "JavaScript", "CSS", "Git", "GitHub", "Vercel", "Figma"],
    detail: {
      highlights: [
        {
          id: "Mengembangkan beberapa template website portofolio dengan gaya visual, pola interaksi, dan pendekatan penyajian yang berbeda.",
          en: "Developed multiple portfolio website templates featuring distinct visual styles, interaction patterns, and presentation approaches.",
        },
        {
          id: "Mengimplementasikan manajemen konten berbasis konfigurasi melalui satu file config.ts untuk mempermudah penyesuaian data dan konten.",
          en: "Implemented configuration-driven content management through a single config.ts file to simplify content and data customization.",
        },
        {
          id: "Merancang dan mengembangkan komponen yang dapat digunakan kembali, termasuk hero banner, showcase proyek, timeline pengalaman, sertifikasi, dan modul kontak.",
          en: "Designed and developed reusable UI sections, including hero banners, project showcases, experience timelines, certification displays, and contact modules.",
        },
        {
          id: "Mengintegrasikan animasi menggunakan Framer Motion, transisi berbasis viewport, interaksi modal, serta showcase berbasis carousel.",
          en: "Integrated Framer Motion animations, viewport-triggered transitions, modal interactions, and carousel-based showcases.",
        },
        {
          id: "Menerapkan sistem tema menggunakan variabel CSS, dukungan mode terang dan gelap, serta hook animasi yang dapat digunakan kembali.",
          en: "Implemented theme customization using CSS variables, light and dark mode support, and reusable animation hooks.",
        },
        {
          id: "Merancang tata letak responsif yang dioptimalkan untuk pengalaman pengguna di desktop, tablet, dan perangkat seluler.",
          en: "Designed responsive layouts optimized for desktop, tablet, and mobile user experiences.",
        },
        {
          id: "Mempublikasikan kode sumber melalui GitHub dan melakukan deployment ke Vercel sebagai demonstrasi langsung untuk menampilkan desain dan fungsionalitas.",
          en: "Published the source code on GitHub and deployed the templates on Vercel for live demonstrations of their functionality and design.",
        },
        {
          id: "Menyesuaikan beberapa template sesuai kebutuhan klien individu dan mendistribusikannya sebagai template website portofolio siap digunakan.",
          en: "Customized selected templates to meet individual client requirements and delivered them as ready-to-use portfolio website templates.",
        },
      ],
      links: [
        {
          label: {
            id: "Demo Langsung #1",
            en: "Live Demo #1",
          },
          href: "https://portfolio-template-1-furqan.vercel.app",
          icon: "external",
        },
        {
          label: {
            id: "GitHub Template 1",
            en: "GitHub Template 1",
          },
          href: "https://github.com/Furqan-sykss/template-1",
          icon: "github",
        },
        {
          label: {
            id: "Demo Langsung #2",
            en: "Live Demo #2",
          },
          href: "https://portfolio-template-2-furqan.vercel.app",
          icon: "external",
        },
        {
          label: {
            id: "GitHub Template 2",
            en: "GitHub Template 2",
          },
          href: "https://github.com/Furqan-sykss/portfolio",
          icon: "github",
        },
      ],
    },
  },
  {
    title: {
      id: "Analisis Sentimen Opini Publik terhadap Kejaksaan Agung",
      en: "Sentiment Analysis of Public Opinion on the Attorney General's Office",
    },
    period: { id: "Okt 2024 - Jul 2025", en: "Oct 2024 - Jul 2025" },
    tag: { id: "Proyek Akhir", en: "Final Project" },
    desc: {
      id: "Melakukan analisis sentimen terhadap opini publik di TikTok mengenai Kejaksaan Agung dengan memanfaatkan Python dan Selenium untuk pengumpulan data otomatis serta model machine learning untuk klasifikasi sentimen. Hasil analisis disajikan melalui dashboard terintegrasi berbasis Laravel dan Flask.",
      en: "Conducted sentiment analysis on TikTok public opinion regarding the Attorney General's Office by leveraging Python and Selenium for automated data collection and machine learning models for sentiment classification. Presented the results through an integrated Laravel–Flask dashboard.",
    },
    stack: ["Python", "Selenium", "Scraping", "Laravel", "Flask-API", "MySQL", "Machine Learning", "JavaScript", "CSS", "Tailwind", "XAMPP", "Git", "GitHub"],
    detail: {
      highlights: [
        {
          id: "Mengumpulkan ribuan komentar TikTok melalui proses web scraping otomatis menggunakan Python dan Selenium.",
          en: "Collected thousands of TikTok comments through automated web scraping using Python and Selenium.",
        },
        {
          id: "Melatih dan mengevaluasi beberapa model machine learning untuk klasifikasi sentimen berbahasa Indonesia.",
          en: "Trained and evaluated multiple machine learning models for Indonesian-language sentiment classification.",
        },
        {
          id: "Membangun integrasi REST API antara Flask sebagai engine machine learning dan Laravel sebagai dashboard web.",
          en: "Built a REST API integration between Flask as the machine learning engine and Laravel as the web dashboard.",
        },
        {
          id: "Mengembangkan dashboard interaktif yang menampilkan tren sentimen, hasil klasifikasi, dan insight analitis secara real time.",
          en: "Developed an interactive dashboard featuring real-time sentiment trends, classification results, and analytical insights.",
        },
        {
          id: "Menerapkan tahapan pra-pemrosesan data, termasuk tokenisasi, penghapusan stopword, dan vektorisasi TF-IDF.",
          en: "Applied data preprocessing techniques including tokenization, stopword removal, and TF-IDF vectorization.",
        },
      ],
      links: [
        { label: "GitHub", href: "https://github.com/Furqan-sykss/Laravel-sentiment-kejagung", icon: "github" },
        { label: "Google Drive", href: "https://drive.google.com/drive/folders/1GJphNTDR8rLGia2Ze8s1n6zV6V1Nc6VA?usp=sharing", icon: "drive" },
      ],
    },
  },
  {
    title: {
      id: "Sistem Pengelolaan Data Keanggotaan Badan Ad Hoc",
      en: "Election Workforce Data Management System",
    },
    period: { id: "Feb 2024 - Agu 2024", en: "Feb 2024 - Aug 2024" },
    tag: { id: "KPU RI", en: "KPU RI" },
    desc: {
      id: "Mengembangkan prototipe sistem informasi berbasis web untuk mengelola data keanggotaan badan ad hoc (PPK dan PPS) selama program magang di Sekretariat Jenderal KPU RI. Sistem dirancang berdasarkan alur kerja resmi SIAKBA dan dibangun menggunakan Laravel serta MySQL.",
      en: "Developed a prototype web-based information system for managing PPK and PPS membership data during an internship at the Secretariat General of KPU RI. The system was designed based on the official SIAKBA workflow and implemented using Laravel and MySQL.",
    },
    stack: ["Microsoft Office", "Laravel", "MySQL", "XAMPP", "JavaScript", "CSS", "Git", "GitHub"],
    detail: {
      highlights: [
        {
          id: "Merancang dan membangun prototipe sistem pengelolaan data keanggotaan badan ad hoc PPK dan PPS untuk KIP Aceh.",
          en: "Designed and developed a prototype system for managing PPK and PPS electoral workforce membership data for KIP Aceh.",
        },
        {
          id: "Menganalisis alur kerja resmi SIAKBA sebagai acuan utama dalam perancangan arsitektur sistem.",
          en: "Analyzed the official SIAKBA workflow as the primary reference for designing the system architecture.",
        },
        {
          id: "Mengimplementasikan sistem akses berbasis peran untuk Admin Nasional, Admin Provinsi, dan Operator Kecamatan.",
          en: "Implemented role-based access control for National Administrators, Provincial Administrators, and District Operators.",
        },
        {
          id: "Mengembangkan mekanisme validasi data untuk meminimalkan kesalahan entri antarwilayah.",
          en: "Developed data validation mechanisms to minimize cross-region data entry errors.",
        },
        {
          id: "Menghasilkan laporan rekapitulasi lengkap dengan visualisasi grafik untuk mempermudah pemantauan data.",
          en: "Generated comprehensive reports with graphical summaries to simplify administrative monitoring.",
        },
      ],
      links: [
        { label: "GitHub", href: "https://github.com/Furqan-sykss/siakba", icon: "github" },
        { label: { id: "Wireframe (Figma)", en: "Wireframe (Figma)" }, href: "https://www.figma.com/design/tA7R82I0PJWt3K05d93f0E/Wireframe--Based-on-SIAKBA-Project--?node-id=0-1&t=ERBAlDshXXiCShwP-1", icon: "figma" },
        { label: "Google Drive", href: "https://drive.google.com/drive/folders/1kkZ7vN0Gf6zV3KUKFzoIBgeujkCfRp6Y?usp=sharing", icon: "drive" },
      ],
    },
  },
  {
    title: {
      id: "Praktikum Keamanan Jaringan",
      en: "Practical Network Security Lab",
    },
    period: {
      id: "Agu 2023 - Des 2023",
      en: "Aug 2023 - Dec 2023",
    },
    tag: {
      id: "Praktikum Akademik",
      en: "Academic Laboratory",
    },
    desc: {
      id: "Melaksanakan praktikum keamanan jaringan yang terdiri dari 12 modul mencakup konfigurasi firewall, sistem deteksi intrusi (IDS), server proxy, kriptografi, SSL/TLS, pengujian kerentanan, serta pemantauan keamanan pada lingkungan Linux.",
      en: "Completed a hands-on network security laboratory consisting of twelve practical modules covering firewall configuration, intrusion detection systems (IDS), proxy servers, cryptography, SSL/TLS, vulnerability assessment, and security monitoring in Linux environments.",
    },
    stack: ["Linux", "IPTables", "Snort", "SQLMap", "Squid Proxy", "SSL/TLS", "Cryptography", "GPG", "Tripwire"],
    detail: {
      highlights: [
        {
          id: "Mengonfigurasi firewall IPTables untuk mengendalikan akses SSH dan Telnet.",
          en: "Configured IPTables firewall to control SSH and Telnet access.",
        },
        {
          id: "Mengimplementasikan Snort IDS untuk pemantauan lalu lintas jaringan secara real-time.",
          en: "Implemented Snort IDS for real-time network traffic monitoring.",
        },
        {
          id: "Menerapkan HTTPS menggunakan sertifikat SSL/TLS bertanda tangan sendiri pada Apache2.",
          en: "Deployed HTTPS using self-signed SSL/TLS certificates on Apache2.",
        },
        {
          id: "Melakukan pengujian kerentanan SQL Injection menggunakan SQLMap.",
          en: "Performed SQL injection vulnerability testing using SQLMap.",
        },
        {
          id: "Mengimplementasikan enkripsi GPG menggunakan kunci RSA 3072-bit.",
          en: "Implemented GPG encryption using 3072-bit RSA keys.",
        },
        {
          id: "Mengonfigurasi Squid Proxy untuk penyaringan dan pengendalian akses situs web.",
          en: "Configured Squid Proxy for website filtering and access control.",
        },
      ],
      links: [
        {
          label: {
            id: "Dokumentasi Proyek",
            en: "Project Documentation",
          },
          href: "https://drive.google.com/drive/folders/1syrjC2Fq90Ms5qCKa3_d_3JFBlPGdExA?usp=sharing",
          icon: "drive",
        },
      ],
    },
  },
];

const additionalProjects: Project[] = [
  {
    title: { id: "Template Website Agensi Kreatif", en: "Creative Agency Website Templates" },
    period: { id: "Agustus 2026 - Oktober 2026", en: "August 2026 - October 2026" },
    tag: { id: "Eksplorasi Desain Mandiri", en: "Self-Directed Design Exploration" },
    desc: {
      id: "Merancang dua template landing page agensi kreatif, Atelier Noir dan HAVN, dengan konten demo fiktif serta pendekatan editorial dan sinematik. Keduanya dibangun menggunakan Next.js, TypeScript, Tailwind CSS, Framer Motion, dan Lenis, dengan komposisi layout, ritme section, dan bahasa gerak yang berbeda agar dapat digunakan sebagai dasar template agensi yang mudah disesuaikan.",
      en: "Designed two creative agency landing page templates, Atelier Noir and HAVN, with fictional demo content and an editorial, cinematic direction. Both were built with Next.js, TypeScript, Tailwind CSS, Framer Motion, and Lenis, using distinct layout compositions, section rhythms, and motion languages so they can work as adaptable agency template foundations.",
    },
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Lenis", "Design System", "Git", "GitHub", "Vercel"],
    detail: {
      highlights: [
        {
          id: "Membangun preloader, text reveal, scroll-triggered transitions, dan smooth scrolling Lenis pada kedua template.",
          en: "Built preloaders, text reveals, scroll-triggered transitions, and Lenis smooth scrolling across both templates.",
        },
        {
          id: "Memusatkan konten, navigasi, layanan, proyek, dan data visual dalam file data agar template mudah diganti untuk kebutuhan brand lain.",
          en: "Centralized content, navigation, services, projects, and visual data in data files so each template can be adapted for other brands more easily.",
        },
        {
          id: "Menerapkan dukungan reduced motion serta detail aksesibilitas pada HAVN seperti skip link, focus ring, disclosure ARIA, dan menu mobile yang dapat ditutup dengan Escape.",
          en: "Implemented reduced-motion support plus accessibility details in HAVN such as a skip link, focus rings, ARIA disclosure, and an Escape-close mobile menu.",
        },
        {
          id: "Merancang sistem visual berbasis CSS variables, termasuk permukaan tema dark/wine pada HAVN dan arahan editorial gelap pada Atelier Noir.",
          en: "Designed CSS-variable-based visual systems, including dark/wine themed surfaces in HAVN and a dark editorial direction in Atelier Noir.",
        },
      ],
      links: [
        { label: { id: "Demo Langsung: HAVN", en: "Live Demo: HAVN" }, href: "https://furqan-havn.vercel.app", icon: "external" },
        { label: "GitHub: HAVN", href: "https://github.com/Furqan-sykss/havn-next", icon: "github" },
        { label: { id: "Demo Langsung: Atelier Noir", en: "Live Demo: Atelier Noir" }, href: "https://furqan-noir-agency.vercel.app", icon: "external" },
        { label: "GitHub: Atelier Noir", href: "https://github.com/Furqan-sykss/atelier-noir-agency-review-04", icon: "github" },
      ],
    },
  },
  {
    title: { id: "Lofi Coffee Digital Presence", en: "Lofi Coffee Digital Presence" },
    period: { id: "Agustus 2026 - Oktober 2026", en: "August 2026 - October 2026" },
    tag: { id: "Pendampingan UMKM", en: "UMKM Assistance" },
    desc: {
      id: "Membantu Lofi Coffee, sebuah UMKM/kedai kopi yang sudah ada, dalam penguatan kehadiran digital melalui aset online seperti Instagram, Linktree, Google Search, dan Google Maps. Proyek ini diposisikan sebagai pendampingan digital marketing, bukan brand milik pribadi.",
      en: "Assisted Lofi Coffee, an existing coffee shop/UMKM, in strengthening its digital presence through online assets such as Instagram, Linktree, Google Search, and Google Maps. This project is positioned as digital marketing assistance, not as a personally owned brand.",
    },
    stack: ["Digital Marketing", "Instagram", "Google Maps", "Google Business Profile", "Linktree", "Local SEO", "Content Review"],
    detail: {
      highlights: [
        {
          id: "Membantu mengamati dan merapikan informasi digital Lofi Coffee agar lebih mudah ditemukan melalui kanal pencarian dan media sosial.",
          en: "Helped review and organize Lofi Coffee's digital information so it could be easier to find through search and social channels.",
        },
        {
          id: "Menggunakan Instagram, Linktree, Google Search, dan Google Maps sebagai bukti kanal digital yang relevan untuk UMKM lokal.",
          en: "Used Instagram, Linktree, Google Search, and Google Maps as evidence of relevant digital channels for a local UMKM.",
        },
        {
          id: "Menjaga batas klaim secara jelas: Lofi Coffee adalah bisnis yang dibantu, bukan perusahaan atau brand milik pribadi.",
          en: "Kept the claim boundary clear: Lofi Coffee is an assisted business, not a personal company or owned brand.",
        },
      ],
      links: [
        { label: "Instagram", href: "https://www.instagram.com/loficoffe.co", icon: "external" },
        { label: { id: "Linktree", en: "Linktree" }, href: "https://linktr.ee/lofi.co", icon: "external" },
      ],
    },
  },
  {
    title: { id: "Situs Portofolio Pribadi", en: "Personal Portfolio Website" },
    period: { id: "Nov 2025 - Sekarang", en: "Nov 2025 - Present" },
    tag: { id: "Proyek Mandiri", en: "Self-Project" },
    desc: {
      id: "Mengembangkan dan terus menyempurnakan situs portofolio pribadi berbasis Next.js untuk menampilkan proyek, pengalaman, pendidikan, sertifikasi, keterampilan, dan informasi kontak dalam tampilan yang modern, responsif, dan terstruktur.",
      en: "Developed and continuously enhanced a personal portfolio website built with Next.js to showcase projects, professional experience, education, certifications, technical skills, and contact information through a modern, responsive interface.",
    },
    stack: ["Next.js", "TypeScript", "Tailwind", "CSS", "JavaScript", "Git", "GitHub"],
    detail: {
      highlights: [
        {
          id: "Merancang antarmuka portofolio responsif yang mencakup bagian proyek, keterampilan teknis, pengalaman, pendidikan, sertifikasi, dan informasi kontak.",
          en: "Designed a responsive portfolio interface featuring dedicated sections for projects, technical skills, professional experience, education, certifications, and contact information.",
        },
        {
          id: "Mengimplementasikan modal interaktif untuk detail proyek dan pengalaman dengan tata letak yang responsif pada desktop maupun perangkat seluler.",
          en: "Implemented responsive modal dialogs for project and experience details across desktop and mobile devices.",
        },
        {
          id: "Menerapkan dukungan tema terang dan gelap dengan sistem desain yang konsisten di seluruh aplikasi.",
          en: "Implemented light and dark themes with a consistent design system across the entire application.",
        },
        {
          id: "Mengoptimalkan pengalaman pengguna pada perangkat seluler melalui penyempurnaan tata letak kartu proyek, jarak antarelemen, dan hierarki konten.",
          en: "Optimized the mobile experience by refining project card layouts, spacing, and content hierarchy for improved readability.",
        },
        {
          id: "Memelihara dan terus mengembangkan portofolio sebagai proyek pribadi dengan memperbarui konten, fitur, serta penyempurnaan antarmuka secara berkala.",
          en: "Continuously maintained and enhanced the portfolio by updating its content, features, and user interface to reflect ongoing growth and professional work.",
        },
      ],
      links: [{ label: "GitHub", href: "https://github.com/Furqan-sykss/my-portfolio", icon: "github" }],
    },
  },
  {
    title: { id: "Desain Sistem Informasi Rental Mobil", en: "Car Rental Platform UI/UX Design" },
    period: { id: "Agu 2023 - Nov 2023", en: "Aug 2023 - Nov 2023" },
    tag: { id: "Akademik", en: "Academic" },
    desc: {
      id: "Merancang sistem informasi rental mobil yang mencakup struktur antarmuka, alur pengguna, serta prototipe interaktif untuk proses pemesanan dan pengelolaan kendaraan.",
      en: "Designed a comprehensive car rental information system in Figma, including information architecture, end-to-end user flows, and an interactive prototype for vehicle booking and management.",
    },
    stack: ["Figma"],
    detail: {
      highlights: [
        {
          id: "Merancang prototipe UI/UX lengkap yang mencakup katalog kendaraan, proses pemesanan, dan alur pembayaran.",
          en: "Designed a complete UI/UX prototype covering vehicle catalog browsing, booking, and payment workflows.",
        },
        {
          id: "Membuat wireframe, mockup high-fidelity, dan prototipe interaktif menggunakan Figma.",
          en: "Created wireframes, high-fidelity mockups, and an interactive prototype in Figma.",
        },
        {
          id: "Menyusun persona pengguna serta memetakan perjalanan pengguna untuk pelanggan dan administrator.",
          en: "Defined user personas and mapped end-to-end user journeys for both customers and administrators.",
        },
      ],
      links: [{ label: { id: "Desain Figma", en: "Figma Design" }, href: "https://www.figma.com/design/h08W9Bf5GYRqWp2c586C0c/Rental-Car-Design?node-id=0-1&t=KWynD5QTHq7jhNhg-1", icon: "figma" }],
    },
  },
  {
    title: {
      id: "Sistem Informasi Sejarah dan Filsafat",
      en: "History and Philosophy Information System",
    },
    period: { id: "Feb 2023 - Mei 2023", en: "Feb 2023 - May 2023" },
    tag: { id: "Akademik", en: "Academic" },
    desc: {
      id: "Mengembangkan sistem informasi berbasis web menggunakan Laravel, MySQL, dan Tailwind CSS untuk menyajikan konten sejarah dan filsafat secara terstruktur dengan antarmuka yang responsif.",
      en: "Developed a web-based information system using Laravel, MySQL, and Tailwind CSS to deliver structured historical and philosophical content through a clean, responsive interface.",
    },
    stack: ["Laravel", "Tailwind", "MySQL", "XAMPP", "CSS", "Git", "GitHub"],
    detail: {
      highlights: [
        {
          id: "Mengembangkan sistem informasi full-stack untuk mengelola dan menyajikan konten sejarah serta filsafat.",
          en: "Developed a full-stack web information system for managing and presenting historical and philosophical content.",
        },
        {
          id: "Menerapkan antarmuka responsif menggunakan Tailwind CSS yang dioptimalkan untuk desktop dan perangkat seluler.",
          en: "Implemented a responsive user interface with Tailwind CSS optimized for both desktop and mobile devices.",
        },
        {
          id: "Mengembangkan modul manajemen konten menggunakan arsitektur MVC Laravel dan basis data MySQL.",
          en: "Developed a structured content management module using Laravel's MVC architecture and MySQL.",
        },
      ],
      links: [
        { label: "GitHub", href: "https://github.com/Furqan-sykss/laravel-amerta", icon: "github" },
        { label: { id: "Desain Figma", en: "Figma Design" }, href: "https://www.figma.com/design/fxOiuvB9lH1azJ80ukRjkz/home-desktop-web-amerta-season-2-?node-id=0-1&t=bDoqw3kSCwiuAts9-1", icon: "figma" },
      ],
    },
  },
  {
    title: {
      id: "Sistem Reservasi Kafe",
      en: "Coffee Shop Reservation System",
    },
    period: { id: "Feb 2023 - Mar 2023", en: "Feb 2023 - Mar 2023" },
    tag: { id: "Akademik", en: "Academic" },
    desc: {
      id: "Mengembangkan sistem reservasi berbasis web untuk kafe yang memungkinkan pelanggan melihat menu serta melakukan reservasi secara online menggunakan Native PHP  dan Bootstrap.",
      en: "Developed a web-based reservation system for a coffee shop, allowing customers to browse the menu and make reservations through a PHP-based application powered by Bootstrap.",
    },
    stack: ["Native PHP", "Laragon", "MySQL", "Bootstrap", "CSS", "Git", "GitHub"],
    detail: {
      highlights: [
        {
          id: "Mengembangkan sistem reservasi dan pemesanan online menggunakan Native PHP tanpa framework.",
          en: "Developed an online reservation and ordering system using native PHP without a framework.",
        },
        {
          id: "Mengimplementasikan katalog menu, formulir reservasi, dan fitur pemesanan yang terintegrasi dengan basis data MySQL.",
          en: "Implemented menu browsing, reservation forms, and ordering features integrated with a MySQL database.",
        },
        {
          id: "Membangun antarmuka yang responsif dan ramah perangkat seluler menggunakan Bootstrap.",
          en: "Built a clean, responsive, and mobile-friendly interface using Bootstrap.",
        },
      ],
      links: [{ label: "GitHub", href: "https://github.com/Furqan-sykss/2A_praktikum_2021573010051/tree/main/DeCafe", icon: "github" }],
    },
  },
];

type Experience = {
  role: Localized;
  tag: Localized;
  company: Localized;
  period: Localized;
  desc: Localized;
  highlights: Localized[];
};

const experience: Experience[] = [
  {
    role: {
      id: "Crew Acara - Runner",
      en: "Event Crew - Runner",
    },
    tag: {
      id: "Kontrak",
      en: "Contract",
    },
    company: {
      id: "PT Fasen Creative Quality × Tokopedia",
      en: "PT Fasen Creative Quality × Tokopedia",
    },
    period: {
      id: "Maret 2024",
      en: "March 2024",
    },
    desc: {
      id: "Mendukung operasional di lokasi selama acara Tokopedia Ramadan Extra 2024 Flash Sale yang berlangsung selama lima hari. Bertanggung jawab membantu koordinasi logistik, pengelolaan alur pengunjung, serta memastikan seluruh aktivitas acara berjalan dengan tertib dan lancar.",
      en: "Supported on-site operations throughout the five-day Tokopedia Ramadan Extra 2024 Flash Sale event. Assisted with logistics coordination, crowd flow management, and ensuring the smooth execution of event activities.",
    },
    highlights: [
      {
        id: "Melaksanakan seluruh tugas operasional yang diberikan oleh Hall Coordinator dengan disiplin dan tanggung jawab.",
        en: "Executed all assigned operational tasks under the direction of the Hall Coordinator with discipline and accountability.",
      },
      {
        id: "Mendukung koordinasi logistik, pengelolaan keramaian, dan operasional di lokasi selama seluruh rangkaian acara.",
        en: "Supported logistics coordination, crowd management, and on-site operations throughout the event.",
      },
      {
        id: "Menjaga profesionalisme serta memberikan pelayanan yang baik kepada peserta dan pengunjung acara.",
        en: "Maintained professionalism and delivered excellent service to event participants and visitors.",
      },
      {
        id: "Memantau area penugasan dan memastikan operasional tetap berjalan tertib di zona venue yang menjadi tanggung jawab.",
        en: "Monitored assigned areas and ensured orderly operations within the designated venue zones.",
      },
      {
        id: "Berkolaborasi secara efektif dengan sesama kru dan supervisor untuk mencapai target operasional acara.",
        en: "Collaborated effectively with fellow crew members and supervisors to achieve event operational objectives.",
      },
      {
        id: "Mematuhi standar operasional acara, termasuk kebijakan seragam, prosedur kerja, dan protokol komunikasi.",
        en: "Adhered to event operational standards, including uniform policies, work procedures, and communication protocols.",
      },
    ],
  },
  {
    role: {
      id: "IT Support - Biro Pusat Data & Teknologi Informasi (Pusdatin)",
      en: "IT Support - Data & Information Technology Center (Pusdatin)",
    },
    tag: {
      id: "Magang",
      en: "Intern",
    },
    company: {
      id: "Sekretariat Jenderal Komisi Pemilihan Umum Republik Indonesia (KPU RI)",
      en: "Secretariat General of the General Elections Commission of the Republic of Indonesia (KPU RI)",
    },
    period: {
      id: "Feb 2024 - Sep 2024",
      en: "Feb 2024 - Sep 2024",
    },
    desc: {
      id: "Menyelesaikan program magang industri selama tujuh bulan di Pusat Data & Teknologi Informasi (Pusdatin), Sekretariat Jenderal Komisi Pemilihan Umum Republik Indonesia (KPU RI), Jakarta. Berkontribusi di tiga divisi, yaitu Data & Informasi, Aplikasi & Tata Kelola Informasi, serta Infrastruktur TI, dengan terlibat dalam pengelolaan data pemilih, pemutakhiran data TPS, koordinasi administrasi, pemantauan rekapitulasi pemilu, serta pengembangan prototipe sistem berbasis web untuk pengelolaan data keanggotaan badan ad hoc pemilu.",
      en: "Completed a seven-month industry internship at the Center for Data & Information Technology (Pusdatin), Secretariat General of the General Elections Commission of the Republic of Indonesia (KPU RI), Jakarta. Contributed across three divisions—Data & Information, Application & Information Governance, and IT Infrastructure—by supporting voter data management, polling station (TPS) data updates, administrative coordination, election recapitulation monitoring, and the development of a web-based prototype for managing ad-hoc election committee membership data.",
    },
    highlights: [
      {
        id: "Berpartisipasi dalam kegiatan rekapitulasi dan pemantauan data pemilih tingkat nasional yang dikoordinasikan oleh Pusat Data dan Informasi (Pusdatin).",
        en: "Participated in national voter data recapitulation and monitoring activities coordinated by the Data and Information Center (Pusdatin).",
      },
      {
        id: "Melakukan seleksi, validasi, dan input status pemilih untuk Daftar Pemilih Tetap (DPT), Daftar Pemilih Tambahan (DPTb), dan Daftar Pemilih Khusus (DPK).",
        en: "Performed voter status selection, validation, and data entry for the Permanent Voter List (DPT), Additional Voter List (DPTb), and Special Voter List (DPK).",
      },
      {
        id: "Membantu penyusunan Daftar Pemilih Tambahan (DPTb), termasuk verifikasi pemilih yang memenuhi syarat namun belum terdaftar dalam Daftar Pemilih Tetap (DPT).",
        en: "Assisted in compiling the Additional Voter List (DPTb), including verifying eligible voters who had not yet been registered in the Permanent Voter List (DPT).",
      },
      {
        id: "Melakukan input serta verifikasi data Tempat Pemungutan Suara (TPS) berdasarkan provinsi, kabupaten/kota, kecamatan, dan desa/kelurahan untuk memastikan akurasi data.",
        en: "Entered and verified Polling Station (TPS) data across provinces, regencies/cities, districts, and villages to ensure data accuracy.",
      },
      {
        id: "Mendukung proses sinkronisasi dan penyampaian Data Penduduk Potensial Pemilih Pemilu (DP4) dari Kementerian Dalam Negeri kepada KPU RI sebagai dasar penyusunan daftar pemilih Pilkada Serentak 2024.",
        en: "Supported the synchronization and submission of Potential Voter Population Data (DP4) from the Ministry of Home Affairs to KPU RI as the basis for preparing voter lists for the 2024 Simultaneous Regional Elections.",
      },
      {
        id: "Berpartisipasi dalam rapat evaluasi pemutakhiran data pemilih Pemilu 2024 serta persiapan pembaruan data pemilih menjelang Pilkada Serentak 2024.",
        en: "Participated in evaluation meetings for the 2024 Election voter data update and preparations for voter data updates ahead of the 2024 Simultaneous Regional Elections.",
      },
      {
        id: "Mendukung rapat kerja penyusunan pedoman teknis pemutakhiran data pemilih serta sinkronisasi Data Penduduk Potensial Pemilih Pemilu (DP4).",
        en: "Supported working meetings on technical guidelines for voter data updates and the synchronization of Potential Voter Population Data (DP4).",
      },
      {
        id: "Membantu koordinasi logistik pada pertemuan antara Pusdatin dan Bareskrim Polri terkait keamanan serta integritas data pemilu.",
        en: "Assisted with logistics coordination for meetings between Pusdatin and the Criminal Investigation Agency (Bareskrim Polri) regarding election data security and integrity.",
      },
      {
        id: "Berpartisipasi dalam rapat kerja simulasi pemutakhiran data pemilih (Pantarlih) untuk persiapan Pilkada Serentak 2024.",
        en: "Participated in working meetings on voter data update simulations (Pantarlih) for the 2024 Simultaneous Regional Elections.",
      },
      {
        id: "Merancang dan mengembangkan prototipe sistem rekapitulasi berbasis Laravel dan MySQL untuk pengelolaan data keanggotaan PPK dan PPS berdasarkan alur kerja SIAKBA (Proyek Akademik).",
        en: "Designed and developed a Laravel and MySQL-based prototype recapitulation system for managing PPK and PPS membership data based on the SIAKBA workflow (Academic Project).",
      },
      {
        id: "Mengimplementasikan kontrol akses berbasis peran untuk Admin Nasional, Admin Provinsi, dan Operator Kabupaten/Kota pada sistem prototipe (Proyek Akademik).",
        en: "Implemented role-based access control for National Administrators, Provincial Administrators, and Regency/City Operators within the prototype system (Academic Project).",
      },
      {
        id: "Menghasilkan laporan rekapitulasi beserta visualisasi grafik pada tingkat kabupaten/kota dan kecamatan untuk mendukung pemantauan data (Proyek Akademik).",
        en: "Generated recapitulation reports with graphical visualizations at the regency/city and district levels to support data monitoring (Academic Project).",
      },
    ],
  },
  {
    role: {
      id: "Pelatihan Digital Marketing",
      en: "Digital Marketing Training",
    },
    tag: {
      id: "Pelatihan Profesional Terstruktur",
      en: "Structured Professional Training",
    },
    company: {
      id: "BLKI Aceh Utara (BPVP Banda Aceh / Kemnaker)",
      en: "BLKI Aceh Utara (BPVP Banda Aceh / Ministry of Manpower)",
    },
    period: {
      id: "Agu - Sep 2026",
      en: "Aug - Sep 2026",
    },
    desc: {
      id: "Menyelesaikan program pelatihan Digital Marketing terstruktur selama 260 JP di BLKI Aceh Utara di bawah naungan BPVP Banda Aceh (Kemnaker/Skillhub). Kurikulum mencakup K3 perangkat komputer, identifikasi elemen pemasaran & model bisnis (7P), digital branding, content planning berbasis pilar & AIDA, social media management, SEO via Google Search Console, e-commerce, pelayanan pelanggan ritel, serta produktivitas & soft skills. Seluruh kompetensi ini diterapkan langsung dalam dua proyek berbasis bukti: membangun brand digital mandiri (Sitestaq.id) dan melakukan pendampingan digital presence untuk UMKM (Lofi Coffee).",
      en: "Completed 260 hours of structured Digital Marketing training at BLKI Aceh Utara under BPVP Banda Aceh (Ministry of Manpower / Skillhub). The curriculum covered computer safety (K3), marketing mix & business models (7P), digital branding, content planning using pillars & AIDA, social media management, SEO via Google Search Console, e-commerce, retail customer service, productivity, and soft skills. These competencies were practically applied through two evidence-based projects: developing an independent digital brand (Sitestaq.id) and providing digital presence consulting for an SME (Lofi Coffee).",
    },
    highlights: [
      {
        id: "Menyelesaikan 260 JP pelatihan dan dinyatakan lulus pada 9 unit kompetensi resmi Kemnaker, meliputi penggunaan perangkat komputer, elemen pemasaran, pemasaran digital ritel, pelayanan pelanggan, media sosial, aplikasi e-commerce, model e-business, serta soft skill dan produktivitas.",
        en: "Completed 260 training hours and passed 9 official competency units certified by the Ministry of Manpower, including computer operation, marketing mix, retail digital marketing, customer service, social media, e-commerce applications, e-business models, soft skills, and productivity.",
      },
      {
        id: "Mengembangkan Sitestaq.id sebagai proyek brand digital mandiri dengan ekosistem terintegrasi (Website, Instagram @sitestaq.id, Linktree, Blogspot, Google Business Profile, dan optimasi SEO URL via Google Search Console).",
        en: "Developed Sitestaq.id as an independent digital brand project featuring an integrated ecosystem (Website, Instagram @sitestaq.id, Linktree, Blogspot, Google Business Profile, and URL SEO optimization via Google Search Console).",
      },
      {
        id: "Mendampingi UMKM Lofi Coffee (loficoffe.co) dalam mengoptimalkan visibilitas lokal dan kanal pemasaran digital melalui penataan Instagram, Linktree, Google Search, serta penandaan lokasi Google Maps.",
        en: "Assisted SME Lofi Coffee (loficoffe.co) in optimizing local visibility and digital marketing channels through Instagram management, Linktree, Google Search, and Google Maps pin placement.",
      },
      {
        id: "Menerapkan kerangka kerja strategis secara praktis, meliputi analisis Marketing Mix 7P, penentuan buyer persona (B2C & B2B), formulasi strategi konversi AIDA, dan penyusunan content pillar (Brand Story, Portfolio, Pain Point, Education).",
        en: "Practically applied strategic frameworks including 7P Marketing Mix analysis, buyer persona formulation (B2C & B2B), AIDA conversion strategies, and content pillar structure (Brand Story, Portfolio, Pain Point, Education).",
      },
    ],
  },
];

const certifications = [
  {
    name: { id: "Pelatihan Digital Marketing", en: "Digital Marketing Training" },
    issuer: { id: "BLKI Aceh Utara - Kemnaker / Skillhub", en: "BLKI Aceh Utara - Kemnaker / Skillhub" },
    year: "2026",
    category: { id: "Digital Marketing", en: "Digital Marketing" },
    badge: { id: "Sertifikat BLKI", en: "BLKI Certificate" },
    link: "/SERTIFIKAT%20KELULUSAN%20PELATIHAN%20-%201810111103-DE4ED1E6.pdf",
  },
  {
    name: { id: "Sertifikasi Kompetensi Digital Marketing", en: "Digital Marketing Competency Certification" },
    issuer: { id: "BNSP", en: "BNSP" },
    year: "2026",
    category: { id: "Digital Marketing", en: "Digital Marketing" },
    badge: { id: "Dalam Proses", en: "In Progress" },
  },
  {
    name: { id: "Pengembang Web di Badan Nasional Sertifikasi Profesi", en: "National Professional Certification in Web Development" },
    issuer: { id: "BNSP", en: "BNSP" },
    year: "2025",
    category: { id: "Profesional", en: "Professional" },
    link: "https://drive.google.com/file/d/1hVjiQ0Ps4sCtMQZMBPA5kYLhE7BrnrEU/view?usp=sharing",
    badge: { id: "✓ Terverifikasi", en: "✓ Verified" },
  },
  {
    name: { id: "Program Uji TOEFL Institusional (ITP)", en: "TOEFL Institutional Testing Program (ITP)" },
    issuer: { id: "ETS", en: "ETS" },
    year: "2025",
    category: { id: "Bahasa", en: "Language" },
    score: { id: "Skor: 450", en: "Score: 450" },
    link: "https://drive.google.com/file/d/1d5n4anePz795cNpg7w9XFBygqo8n3yqf/view?usp=sharing",
    badge: { id: "✓ Terverifikasi", en: "✓ Verified" },
  },
  {
    name: { id: "DSF 46 Fakultas Data: Data Engineer", en: "DSF 46 Faculty of Data: Data Engineer" },
    issuer: { id: "Dibimbing.id", en: "Dibimbing.id" },
    year: "2025",
    category: { id: "Data", en: "Data" },
    link: "https://drive.google.com/file/d/1rkkrpb6TKYstaHnZjpH3aC3xnDAEN9jq/view?usp=drive_link",
  },
  {
    name: { id: "Digital Skill Fair 10.0 — Pengembangan Web BackEnd", en: "Digital Skill Fair 10.0 — Web Development BackEnd" },
    issuer: { id: "Dibimbing.id", en: "Dibimbing.id" },
    year: "2022",
    category: { id: "Web Dev", en: "Web Dev" },
    link: "https://drive.google.com/file/d/1-tTniLS-94LRkplidre2eyjIUBGtpmb4/view?usp=sharing",
  },
  {
    name: {
      id: "SQL Tingkat Menengah",
      en: "Intermediate SQL",
    },
    issuer: { id: "DataCamp", en: "DataCamp" },
    year: "2026",
    category: { id: "Data Analytics", en: "Data Analytics" },
    link: "https://drive.google.com/file/d/1fO-om4-pLd0fnGkl3xK4w2FF-bwuDC1B/view?usp=drive_link",
  },
  {
    name: {
      id: "Fungsi Lanjutan Excel",
      en: "Advanced Excel Functions",
    },
    issuer: { id: "DataCamp", en: "DataCamp" },
    year: "2026",
    category: { id: "Data Entry", en: "Data Entry" },
    link: "https://drive.google.com/file/d/1_0JOajukLF8tsQky1RwoQ-Rvm01Mlamu/view?usp=drive_link",
  },
  {
    name: {
      id: "Mulai Menggunakan Analisis Data",
      en: "Get Started With Data Analytics",
    },
    issuer: { id: "Microsoft Learn", en: "Microsoft Learn" },
    year: "2026",
    category: { id: "Data Analytics", en: "Data Analytics" },
    link: "https://drive.google.com/file/d/1q8UXnDgHY6ETt9AlvaS9a1ELShCrN28D/view?usp=drive_link",
  },
  {
    name: {
      id: "Mulai Menggunakan Konsep Data",
      en: "Get Started With Data Concepts",
    },
    issuer: { id: "Microsoft Learn", en: "Microsoft Learn" },
    year: "2026",
    category: { id: "Data Analytics", en: "Data Analytics" },
    link: "https://drive.google.com/file/d/1obN8GwkYO5au2inltSv2dRst1nG9HHLV/view?usp=drive_link",
  },
  {
    name: {
      id: "Mulai Menggunakan Analisis Data Microsoft",
      en: "Get Started With Microsoft Data Analytics",
    },
    issuer: { id: "Microsoft Learn", en: "Microsoft Learn" },
    year: "2026",
    category: { id: "Data Analytics", en: "Data Analytics" },
    link: "https://drive.google.com/file/d/1DcwFKG67d-YyKMnPVN9NKealQ9x6F9I4/view?usp=drive_link",
  },
  {
    name: {
      id: "Pengantar Git",
      en: "Introduction to Git",
    },
    issuer: { id: "DataCamp", en: "DataCamp" },
    year: "2026",
    category: { id: "Web Dev", en: "Web Dev" },
    link: "https://drive.google.com/file/d/13y-hatoPvFdU5gBUkLHaGh_Qw4gndBhe/view?usp=drive_link",
  },
  {
    name: { id: "Pelatihan Softskill & Character Building", en: "Softskill Training & Character Building" },
    issuer: { id: "Tandaseru Indonesia", en: "Tandaseru Indonesia" },
    year: "2025",
    category: { id: "Softskill", en: "Softskill" },
    link: "https://drive.google.com/file/d/1v-B2GnD7bOGt0B-OzH4ltwI1e_t3tLSw/view?usp=drive_link",
  },
  {
    name: { id: "The Complete Android 12 & Kotlin Masterclass", en: "The Complete Android 12 & Kotlin Masterclass" },
    issuer: { id: "Udemy", en: "Udemy" },
    year: "2023",
    category: { id: "Mobile", en: "Mobile" },
    link: "https://drive.google.com/file/d/1TMJ2ztceLbsDEGAKWdR1uy6qVKHcFQrv/view?usp=drive_link",
  },
  {
    name: { id: "Kursus Pengembangan Web (HTML, PHP, JavaScript)", en: "Web Development Courses (HTML, PHP, JavaScript)" },
    issuer: { id: "Sololearn", en: "Sololearn" },
    year: "2022",
    category: { id: "Web Dev", en: "Web Dev" },
    link: "https://drive.google.com/drive/folders/1REyQNrXFrFkP3GQyg0Qlefe9mjGW4Wzc?usp=sharing",
  },
  {
    name: { id: "Tutorial HTML untuk Pemula", en: "HTML Tutorial for Beginners" },
    issuer: { id: "Udemy", en: "Udemy" },
    year: "2022",
    category: { id: "Web Dev", en: "Web Dev" },
    link: "https://drive.google.com/file/d/1mFuyc4T9vTyPBCBO3yyevZIEJdnNmTje/view?usp=drive_link",
  },
];

// ────── UI Primitives ──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────

function SectionHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div style={{ marginBottom: "2.5rem", opacity: 0, animation: "fadeSlideDown 0.5s cubic-bezier(0.22,1,0.36,1) 0.1s forwards" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
        <div style={{ width: 18, height: 1, backgroundColor: "var(--accent)", opacity: 0.4 }} />
        <p style={{ fontSize: "0.59rem", fontWeight: 700, letterSpacing: "0.27em", textTransform: "uppercase", color: "var(--accent)", opacity: 0.65 }}>{eyebrow}</p>
      </div>
      <h2 style={{ fontFamily: "var(--font-dm-serif)", fontSize: "clamp(1.7rem, 4vw, 2.1rem)", color: "var(--text-primary)", fontWeight: 400, lineHeight: 1.15 }}>{title}</h2>
    </div>
  );
}

function TagBadge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={className}
      style={{
        display: "inline-block",
        padding: "2px 9px",
        fontSize: "0.58rem",
        fontWeight: 700,
        letterSpacing: "0.13em",
        textTransform: "uppercase",
        borderRadius: 999,
        backgroundColor: "var(--accent-glow)",
        color: "var(--accent)",
        border: "1px solid var(--line-color-mid)",
      }}
    >
      {children}
    </span>
  );
}

function StackChip({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "3px 9px",
        fontSize: "0.68rem",
        borderRadius: 6,
        backgroundColor: "var(--bg-subtle)",
        color: "var(--text-muted)",
        border: "1px solid var(--border)",
      }}
    >
      {children}
    </span>
  );
}

function ProjectCardCta() {
  return (
    <div className="proj-card-cta" style={{ flexShrink: 0, width: 34, height: 34, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "var(--bg-subtle)", border: "1px solid var(--border)" }}>
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M2 10L10 2M10 2H4.5M10 2V7.5" stroke="var(--accent)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function Divider() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <div style={{ flex: 1, height: 1, backgroundColor: "var(--border)" }} />
      <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
        <div style={{ width: 3, height: 3, borderRadius: "50%", backgroundColor: "var(--border-mid)" }} />
        <div style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: "var(--accent)", opacity: 0.4 }} />
        <div style={{ width: 3, height: 3, borderRadius: "50%", backgroundColor: "var(--border-mid)" }} />
      </div>
      <div style={{ flex: 1, height: 1, backgroundColor: "var(--border)" }} />
    </div>
  );
}

// ────── CornerBrackets ────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────

interface BRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

function CornerBrackets({ rect, pad = 14, drawn, delay = 0, cl = 22 }: { rect: BRect; pad?: number; drawn: boolean; delay?: number; cl?: number }) {
  const x = rect.left - pad,
    y = rect.top - pad;
  const w = rect.width + pad * 2,
    h = rect.height + pad * 2;
  const c = Math.min(cl, w * 0.28, h * 0.28);
  const len = c * 2;
  const corners = [
    { d: `M${x + c},${y} L${x},${y} L${x},${y + c}`, t: 0 },
    { d: `M${x + w - c},${y} L${x + w},${y} L${x + w},${y + c}`, t: 0.07 },
    { d: `M${x + w},${y + h - c} L${x + w},${y + h} L${x + w - c},${y + h}`, t: 0.14 },
    { d: `M${x + c},${y + h} L${x},${y + h} L${x},${y + h - c}`, t: 0.21 },
  ];
  return (
    <>
      {corners.map((corner, i) => (
        <path
          key={i}
          d={corner.d}
          fill="none"
          stroke="var(--line-color)"
          strokeWidth={1}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            strokeDasharray: len,
            strokeDashoffset: drawn ? 0 : len,
            opacity: drawn ? 1 : 0,
            transition: drawn ? `stroke-dashoffset 0.38s cubic-bezier(0.4,0,0.2,1) ${delay + corner.t}s, opacity 0.12s ease ${delay + corner.t}s` : "none",
          }}
        />
      ))}
    </>
  );
}

// ────── Page ────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────

// ────── InstagramChip ──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────

function InstagramChip({ base }: { base: React.CSSProperties }) {
  const [show, setShow] = useState(false);

  return (
    <div style={{ position: "relative" }}>
      {/* ──── Popup ──── */}
      <div
        style={{
          position: "absolute",
          bottom: "calc(100% + 8px)",
          left: "50%",
          transform: show ? "translateX(-50%) translateY(0) scale(1)" : "translateX(-50%) translateY(5px) scale(0.92)",
          opacity: show ? 1 : 0,
          pointerEvents: "none",
          transition: "opacity 0.18s ease, transform 0.2s cubic-bezier(0.34,1.4,0.64,1)",
          zIndex: 50,
        }}
      >
        {/* Photo circle with Instagram gradient ring */}
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: "50%",
            padding: 2,
            background: "linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.22)",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              overflow: "hidden",
              border: "2px solid var(--bg-card)",
            }}
          >
            <NextImage src="/instagram-image/img_2245.jpg" alt="@frqann" width={52} height={52} style={{ objectFit: "cover", objectPosition: "center 5%", transform: "scale(1.12)" }} />
          </div>
        </div>

        {/* Username label */}
        <p
          style={{
            textAlign: "center",
            fontSize: "0.6rem",
            fontWeight: 600,
            color: "var(--text-secondary)",
            marginTop: 5,
            letterSpacing: "0.02em",
            whiteSpace: "nowrap",
          }}
        >
          @frqann
        </p>

        {/* Arrow */}
        <div
          style={{
            position: "absolute",
            bottom: -14,
            left: "50%",
            transform: "translateX(-50%)",
            width: 0,
            height: 0,
            borderLeft: "5px solid transparent",
            borderRight: "5px solid transparent",
            borderTop: "5px solid var(--border-mid)",
          }}
        />
      </div>

      {/* ──── Chip ──── */}
      <a
        href="https://www.instagram.com/frqann?igsh=MTA1ejJ3amhhZTV5cA=="
        target="_blank"
        rel="noopener"
        style={{
          ...base,
          borderColor: show ? "var(--border-strong)" : "var(--border)",
          color: show ? "var(--accent)" : "var(--text-muted)",
        }}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        <span style={{ opacity: 0.38, fontSize: "0.75rem" }}>↗</span>
        Instagram
      </a>
    </div>
  );
}

// ────── ProjectModal ────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────

function LinkIcon({ icon }: { icon: string }) {
  if (icon === "github")
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    );
  if (icon === "figma")
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M8 24c2.208 0 4-1.792 4-4v-4H8c-2.208 0-4 1.792-4 4s1.792 4 4 4zm0-20H4c-2.208 0-4 1.792-4 4s1.792 4 4 4h4V4zM12 0H8C5.792 0 4 1.792 4 4s1.792 4 4 4h4V0zm4 8c2.208 0 4-1.792 4-4s-1.792-4-4-4h-4v8h4zm-4 2H8c-2.208 0-4 1.792-4 4s1.792 4 4 4h4c2.208 0 4-1.792 4-4s-1.792-4-4-4z" />
      </svg>
    );
  if (icon === "external")
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <path d="M14 4h6v6M20 4l-9 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  // drive
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6.28 0L0 10.91l3.14 5.45L9.42 5.45zm11.44 0H6.28l6.28 10.91h11.44zm-8.3 12L3.14 16.36 6.28 22h11.44l-3.14-5.45zm2.02.91L8.3 22h11.44L24 16.36z" />
    </svg>
  );
}

// ────── useSwipeToDismiss — drag handle swipe-down to close ────────────────────────────────────────────

// ────── useSwipeToDismiss — drag handle swipe-down to close ────────────────────────────────────────────

function useSwipeToDismiss(onDismiss: () => void) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const dragHandleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const startY = useRef(0);
  const startElement = useRef<EventTarget | null>(null);
  const maxDragY = useRef(0);
  const isHeaderDrag = useRef(false);
  const isScrollDrag = useRef(false);
  const lastScrollTop = useRef(0);
  const scrollStartTop = useRef(0);

  // Auto-find content ref on mount
  useEffect(() => {
    if (!contentRef.current && sheetRef.current) {
      contentRef.current = sheetRef.current.querySelector(".modal-scroll-area") as HTMLDivElement;
    }
  }, []);

  useEffect(() => {
    const sheet = sheetRef.current;
    if (!sheet) return;

    // Clear any inline animation/transform from previous interactions
    sheet.style.animation = "";
    sheet.style.transform = "";
    sheet.style.transition = "";

    const DISMISS_THRESHOLD = 0.3; // 30% of modal height

    const isHeaderElement = (element: EventTarget | null): boolean => {
      if (!element || !(element instanceof Element)) return false;
      const el = element as Element;
      return el.closest(".modal-drag-handle") !== null || el.closest(".modal-header") !== null;
    };

    const handleTouchStart = (e: TouchEvent) => {
      startY.current = e.touches[0].clientY;
      startElement.current = e.target;
      maxDragY.current = 0;
      isHeaderDrag.current = isHeaderElement(e.target);
      isScrollDrag.current = false;

      // Check if at scroll top for scroll-over-dismiss
      if (contentRef.current && isHeaderDrag.current === false) {
        lastScrollTop.current = contentRef.current.scrollTop;
        scrollStartTop.current = contentRef.current.scrollTop;
        // If very close to top, enable scroll-over-dismiss mode
        if (scrollStartTop.current < 5) {
          isScrollDrag.current = true;
        }
      }

      sheet.style.transition = "none";
    };

    const handleTouchMove = (e: TouchEvent) => {
      const dy = e.touches[0].clientY - startY.current;

      // Header drag - always enabled when on header
      if (isHeaderDrag.current) {
        if (dy > 0) {
          maxDragY.current = Math.max(maxDragY.current, dy);
          sheet.classList.add("is-dragging");
          e.preventDefault();
          sheet.style.transform = `translateY(${dy}px)`;
        } else if (dy < 0) {
          isHeaderDrag.current = false;
          sheet.classList.remove("is-dragging");
          sheet.style.transform = "translateY(0)";
        }
        return;
      }

      // Scroll-over-dismiss: when scroll is at top and user scrolling up
      if (isScrollDrag.current && contentRef.current) {
        const currentScrollTop = contentRef.current.scrollTop;
        lastScrollTop.current = currentScrollTop;

        // Only handle upward drag when at/near top
        if (currentScrollTop < 5) {
          // User dragging downward on content (scrolling up) = dy > 0 = pull modal down
          if (dy > 0) {
            maxDragY.current = Math.max(maxDragY.current, dy);
            sheet.classList.add("is-dragging");
            e.preventDefault();
            sheet.style.transform = `translateY(${dy}px)`;
          } else if (dy < 0) {
            // User dragging upward on content - stop scroll drag
            isScrollDrag.current = false;
            sheet.classList.remove("is-dragging");
            sheet.style.transform = "translateY(0)";
          }
        } else {
          // User scrolled away from top - disable scroll drag mode
          isScrollDrag.current = false;
          sheet.classList.remove("is-dragging");
          sheet.style.transform = "translateY(0)";
        }
      }
    };

    const handleTouchEnd = () => {
      // Permanently disable CSS animation to prevent retrigger
      sheet.style.animation = "none";
      sheet.classList.remove("is-dragging");

      const isDragging = isHeaderDrag.current || isScrollDrag.current;
      if (!isDragging || maxDragY.current === 0) {
        sheet.style.transition = "none";
        sheet.style.transform = "translateY(0)";
        isHeaderDrag.current = false;
        isScrollDrag.current = false;
        return;
      }

      isHeaderDrag.current = false;
      isScrollDrag.current = false;

      const sheetHeight = sheet.offsetHeight;
      const dismissThreshold = sheetHeight * DISMISS_THRESHOLD;

      if (maxDragY.current > dismissThreshold) {
        // DISMISS - smooth exit
        sheet.style.transition = "transform 0.28s cubic-bezier(0.4, 0, 0.2, 1)";
        sheet.style.transform = `translateY(${sheetHeight}px)`;
        setTimeout(() => onDismiss(), 280);
      } else {
        // SNAP BACK - directly from current position to 0
        sheet.style.transition = "transform 0.25s cubic-bezier(0.34, 1.2, 0.64, 1)";
        sheet.style.transform = "translateY(0)";
      }
    };

    sheet.addEventListener("touchstart", handleTouchStart, { passive: true });
    sheet.addEventListener("touchmove", handleTouchMove, { passive: false });
    sheet.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      sheet.removeEventListener("touchstart", handleTouchStart);
      sheet.removeEventListener("touchmove", handleTouchMove);
      sheet.removeEventListener("touchend", handleTouchEnd);
    };
  }, [onDismiss]);

  return { sheetRef, dragHandleRef, contentRef, onTouchStart: () => {}, onTouchMove: () => {}, onTouchEnd: () => {} };
}

// ────── Shared close button ──────────────────────────────────────────────────────────────────────────────────────────────────────────────

function CloseBtn({ onClose }: { onClose: () => void }) {
  return (
    <button
      onClick={onClose}
      style={{
        flexShrink: 0,
        width: 32,
        height: 32,
        borderRadius: 8,
        border: "1px solid var(--border)",
        backgroundColor: "var(--bg-subtle)",
        color: "var(--text-muted)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.15s ease",
        fontSize: "1rem",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "var(--border-strong)";
        el.style.color = "var(--accent)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "var(--border)";
        el.style.color = "var(--text-muted)";
      }}
    >
      ✕
    </button>
  );
}

// ────── Shared modal wrapper — bottom-sheet on mobile, centered on desktop ────────────────

function ModalBackdrop({ onClose, children, maxWidth = 560 }: { onClose: () => void; children: (controls: ReturnType<typeof useSwipeToDismiss> & { requestClose: () => void; isClosing: boolean }) => React.ReactNode; maxWidth?: number }) {
  const [isClosing, setIsClosing] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isClosingRef = useRef(false);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);

  const requestClose = useCallback(() => {
    if (isClosingRef.current) return;
    isClosingRef.current = true;
    setIsClosing(true);
    closeTimerRef.current = setTimeout(() => onClose(), 280);
  }, [onClose]);

  const drag = useSwipeToDismiss(requestClose);

  const handleBackdrop = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) requestClose();
  };

  useEffect(() => {
    // Store the element that had focus before modal opened
    previousActiveElementRef.current = document.activeElement as HTMLElement;

    document.body.style.overflow = "hidden";
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") requestClose();
    };
    document.addEventListener("keydown", handleEscape);

    // Focus management: focus first focusable element in modal
    const modalContent = document.querySelector('[role="dialog"]') || document.querySelector(".modal-sheet-inner");
    if (modalContent) {
      const focusableElements = modalContent.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      const firstFocusable = focusableElements[0] as HTMLElement;
      if (firstFocusable && firstFocusable.focus) {
        // Delay focus to ensure modal is rendered
        setTimeout(() => firstFocusable.focus(), 0);
      }
    }

    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";

      // Restore focus to previous element
      if (previousActiveElementRef.current && previousActiveElementRef.current.focus) {
        previousActiveElementRef.current.focus();
      }
    };
  }, [requestClose]);

  return (
    <div
      onClick={handleBackdrop}
      className={`modal-root${isClosing ? " is-closing" : ""}`}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(20, 18, 15, 0.58)",
        backdropFilter: "blur(14px) saturate(0.9)",
        WebkitBackdropFilter: "blur(14px) saturate(0.9)",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        padding: 0,
        pointerEvents: isClosing ? "none" : "auto",
      }}
    >
      <style suppressHydrationWarning>{`
        @keyframes mbFadeIn { from{opacity:0} to{opacity:1} }
        @keyframes mbFadeOut { from{opacity:1} to{opacity:0} }
        @keyframes mbSheetUp { from{transform:translate3d(0,100px,0)} to{transform:translate3d(0,0,0)} }
        @keyframes mbSheetDown { from{transform:translate3d(0,0,0)} to{transform:translate3d(0,100px,0)} }
        @keyframes spin { to{transform:rotate(360deg)} }
        .modal-root { animation:mbFadeIn 0.28s ease forwards; }
        .modal-root.is-closing { animation:mbFadeOut 0.24s ease forwards; }
        .modal-sheet-inner {
          animation:mbSheetUp 0.28s cubic-bezier(0.34, 1.2, 0.64, 1) forwards;
          background-image: var(--modal-surface-overlay);
          touch-action: none;
        }
        .modal-sheet-inner.is-dragging {
          animation: none !important;
        }
        .modal-sheet-inner.is-closing { animation:mbSheetDown 0.28s cubic-bezier(0.4,0,0.2,1) forwards; }
        @media(min-width:768px){
          .modal-root {
            align-items:center;
            padding:clamp(24px, 4vw, 42px);
          }
          .modal-sheet-inner {
            width:min(860px, 100%) !important;
            max-width:100% !important;
            max-height:min(84dvh, 860px) !important;
            border-radius:1.7rem !important;
            border-color:var(--border) !important;
            box-shadow: 0 34px 90px rgba(0, 0, 0, 0.24), 0 12px 28px rgba(0, 0, 0, 0.12) !important;
          }
          .modal-drag-handle { display:none !important; }
        }
      `}</style>

      <div
        ref={drag.sheetRef}
        role="dialog"
        aria-modal="true"
        className={`modal-sheet-inner${isClosing ? " is-closing" : ""}`}
        style={{
          width: "100%",
          maxWidth: "100%",
          maxHeight: "92dvh",
          background: "var(--modal-surface-bg)",
          border: "1px solid var(--border-mid)",
          borderRadius: "1.25rem 1.25rem 0 0",
          boxShadow: "0 -4px 40px rgba(0,0,0,0.4)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          willChange: "transform",
          touchAction: "none",
        }}
      >
        {/* Drag handle */}
        <div
          ref={drag.dragHandleRef}
          className="modal-drag-handle"
          style={{
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "10px 0 4px",
            cursor: "grab",
          }}
        >
          <div style={{ width: 36, height: 4, borderRadius: 99, backgroundColor: "var(--border-mid)", opacity: 0.9 }} />
        </div>

        {children({ ...drag, requestClose, isClosing })}
      </div>
    </div>
  );
}

// ────── ProjectModal ────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const { lang } = useLanguage();
  const t = (key: string, ...params: any[]) => translate(lang, key, ...params);
  const L = (loc: Localized): string => (lang === "id" ? loc.id : loc.en);
  const LT = (value: LocalizedText): string => (typeof value === "string" ? value : L(value));
  return (
    <ModalBackdrop onClose={onClose} maxWidth={560}>
      {({ requestClose }) => (
        <>
          {/* Header */}
          <div
            className="modal-header"
            style={{ flexShrink: 0, padding: "0.9rem 1.1rem 0.8rem", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10, background: "var(--modal-header-bg)" }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5, flexWrap: "wrap" }}>
                <TagBadge>{L(project.tag)}</TagBadge>
                <span style={{ fontSize: "0.62rem", color: "var(--text-muted)" }}>{L(project.period)}</span>
              </div>
              <h2 style={{ fontFamily: "var(--font-dm-serif)", fontSize: "1.1rem", fontWeight: 400, color: "var(--text-primary)", lineHeight: 1.25 }}>{L(project.title)}</h2>
            </div>
            <CloseBtn onClose={requestClose} />
          </div>

          {/* Body */}
          <div className="modal-scroll-area" style={{ flex: 1, overflowY: "auto", padding: "1rem 1.1rem 2rem", display: "flex", flexDirection: "column", gap: "1.1rem" }}>
            <p style={{ fontSize: "0.84rem", lineHeight: 1.8, color: "var(--text-secondary)" }}>{L(project.desc)}</p>

            {project.detail?.links && project.detail.links.length > 0 && (
              <div>
                <p style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", opacity: 0.6, marginBottom: 10 }}>{t("links")}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {project.detail.links.map((l) => (
                    <a
                      key={LT(l.label)}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 7,
                        padding: "8px 14px",
                        borderRadius: 9,
                        fontSize: "0.74rem",
                        fontWeight: 500,
                        backgroundColor: "var(--bg-subtle)",
                        border: "1px solid var(--border)",
                        color: "var(--text-secondary)",
                        textDecoration: "none",
                        transition: "all 0.18s ease",
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderColor = "var(--border-strong)";
                        el.style.color = "var(--accent)";
                        el.style.backgroundColor = "var(--accent-glow)";
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderColor = "var(--border)";
                        el.style.color = "var(--text-secondary)";
                        el.style.backgroundColor = "var(--bg-subtle)";
                      }}
                    >
                      <LinkIcon icon={l.icon || "drive"} />
                      {LT(l.label)}
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ opacity: 0.4 }}>
                        <path d="M1.5 8.5L8.5 1.5M8.5 1.5H3.5M8.5 1.5V6.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {project.detail?.highlights && (
              <div>
                <p style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", opacity: 0.6, marginBottom: 10 }}>{t("highlights")}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                  {project.detail.highlights.map((h, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <div style={{ flexShrink: 0, marginTop: 5, width: 4, height: 4, borderRadius: "50%", backgroundColor: "var(--accent)", opacity: 0.5 }} />
                      <span style={{ fontSize: "0.82rem", lineHeight: 1.65, color: "var(--text-secondary)" }}>{L(h)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <p style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", opacity: 0.6, marginBottom: 10 }}>{t("techStack")}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                {project.stack.map((s) => (
                  <StackChip key={s}>{s}</StackChip>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </ModalBackdrop>
  );
}

// ────── DigitalMarketingModal — BLKI Aceh Utara structured training ──────────────────────────────────────────────

function DigitalMarketingModal({ onClose }: { onClose: () => void }) {
  const { lang } = useLanguage();
  const t = (key: string, ...params: any[]) => translate(lang, key, ...params);
  const L = (loc: Localized): string => (lang === "id" ? loc.id : loc.en);
  const training = experience[2];
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [fade, setFade] = useState(true);
  const [carouselReady, setCarouselReady] = useState(false);
  const [preloadLimit, setPreloadLimit] = useState(0);
  const [loadedImageIndexes, setLoadedImageIndexes] = useState<Set<number>>(() => new Set());
  const touchStartX = useRef<number>(0);
  const imgCount = images.length;
  const initialPreloadCount = Math.min(1, imgCount);
  const backgroundPreloadBatchSize = 2;

  useEffect(() => {
    fetch("/api/dm-images")
      .then((r) => r.json())
      .then((data: { images: string[] }) => {
        setImages([...data.images].sort(() => Math.random() - 0.5));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (imgCount === 0) return;

    setCarouselReady(false);
    setLoadedImageIndexes(new Set());
    setPreloadLimit(initialPreloadCount);
    setCarouselIdx(0);
  }, [images, imgCount, initialPreloadCount]);

  useEffect(() => {
    if (imgCount === 0 || carouselReady || initialPreloadCount === 0) return;

    const initialBatchLoaded = Array.from({ length: initialPreloadCount }).every((_, index) => loadedImageIndexes.has(index));
    if (initialBatchLoaded) setCarouselReady(true);
  }, [carouselReady, imgCount, initialPreloadCount, loadedImageIndexes]);

  useEffect(() => {
    if (!carouselReady || preloadLimit >= imgCount) return;

    const currentBatchLoaded = Array.from({ length: preloadLimit }).every((_, index) => loadedImageIndexes.has(index));
    if (!currentBatchLoaded) return;

    const timer = window.setTimeout(() => {
      setPreloadLimit((current) => Math.min(current + backgroundPreloadBatchSize, imgCount));
    }, 350);

    return () => window.clearTimeout(timer);
  }, [carouselReady, imgCount, loadedImageIndexes, preloadLimit]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goTo((prev: number) => Math.min(prev + 1, imgCount - 1));
      if (e.key === "ArrowLeft") goTo((prev: number) => Math.max(prev - 1, 0));
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [imgCount]);

  const goTo = (updater: number | ((prev: number) => number)) => {
    setFade(false);
    setTimeout(() => {
      setCarouselIdx(typeof updater === "function" ? updater : () => updater);
      setFade(true);
    }, 140);
  };

  const prev = () => {
    if (carouselIdx > 0) goTo(carouselIdx - 1);
  };

  const next = () => {
    if (carouselIdx < imgCount - 1) goTo(carouselIdx + 1);
  };

  const visibleCarouselImages = [carouselIdx - 1, carouselIdx, carouselIdx + 1].filter((index) => index >= 0 && index < imgCount);
  const preloadedCarouselImages = Array.from({ length: preloadLimit }, (_, index) => index);
  const markCarouselImageLoaded = (index: number) => {
    setLoadedImageIndexes((current) => {
      if (current.has(index)) return current;
      const nextLoaded = new Set(current);
      nextLoaded.add(index);
      return nextLoaded;
    });
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) next();
      else prev();
    }
  };

  const renderDots = () => {
    if (imgCount <= 7) {
      return Array.from({ length: imgCount }).map((_, i) => (
        <button
          key={i}
          onClick={() => goTo(i)}
          style={{
            width: i === carouselIdx ? 20 : 6,
            height: 6,
            borderRadius: 999,
            border: "none",
            padding: 0,
            cursor: "pointer",
            backgroundColor: i === carouselIdx ? "var(--accent)" : "var(--border-mid)",
            transition: "all 0.25s ease",
            flexShrink: 0,
          }}
        />
      ));
    }

    const visible = new Set([0, imgCount - 1, carouselIdx, carouselIdx - 1, carouselIdx + 1].filter((i) => i >= 0 && i < imgCount));
    return Array.from({ length: imgCount })
      .map((_, i) => {
        if (!visible.has(i)) {
          const prevVisible = [...visible].filter((v) => v < i).length > 0 && [...visible].every((v) => v !== i - 1);
          if (prevVisible)
            return (
              <span key={i} style={{ fontSize: "0.5rem", color: "var(--text-muted)", lineHeight: 1 }}>
                •
              </span>
            );
          return null;
        }

        return (
          <button
            key={i}
            onClick={() => goTo(i)}
            style={{
              width: i === carouselIdx ? 20 : 6,
              height: 6,
              borderRadius: 999,
              border: "none",
              padding: 0,
              cursor: "pointer",
              backgroundColor: i === carouselIdx ? "var(--accent)" : "var(--border-mid)",
              transition: "all 0.25s ease",
              flexShrink: 0,
            }}
          />
        );
      })
      .filter(Boolean);
  };

  const learningAreas = [
    { id: "K3 perangkat komputer", en: "Computer safety (K3)" },
    { id: "Elemen pemasaran organisasi", en: "Organizational marketing elements" },
    { id: "Aktivitas pemasaran digital ritel", en: "Retail digital marketing activities" },
    { id: "Pelayanan dan pengalaman pelanggan", en: "Customer service and experience" },
    { id: "Media sosial untuk menarik pelanggan", en: "Social media for customer acquisition" },
    { id: "Aplikasi perdagangan daring (e-commerce)", en: "E-commerce applications" },
    { id: "Model bisnis daring (e-business)", en: "Online business models (e-business)" },
    { id: "Keterampilan komputer, soft skill, dan produktivitas", en: "Computer skills, soft skills, and productivity" },
    { id: "Digital branding", en: "Digital branding" },
    { id: "Content planning berbasis pilar dan AIDA", en: "Pillar- and AIDA-based content planning" },
    { id: "Social media management", en: "Social media management" },
    { id: "SEO melalui Google Search Console", en: "SEO using Google Search Console" },
    { id: "Integrasi omnichannel", en: "Omnichannel integration" },
  ];

  const practicalProjects = [
    {
      title: "Sitestaq.id",
      label: { id: "Brand digital mandiri", en: "Self-directed digital brand" },
      body: {
        id: "Proyek praktikal utama selama pelatihan. Sitestaq.id diposisikan sebagai layanan pembuatan website dengan ekosistem digital yang mencakup website, Instagram, Linktree, Blogspot, dan Google presence.",
        en: "Main practical project during the training. Sitestaq.id was positioned as a website creation service with a digital ecosystem covering a website, Instagram, Linktree, Blogspot, and Google presence.",
      },
      stack: ["Brand Positioning", "Website", "Instagram", "Linktree", "Google Presence"],
      links: [
        { label: "Website", href: "http://sitestaq.id" },
        { label: "Instagram", href: "https://www.instagram.com/sitestaq.id" },
        { label: "Linktree", href: "https://tinyurl.com/sitestaq" },
      ],
    },
    {
      title: "Lofi Coffee",
      label: { id: "Pendampingan UMKM", en: "UMKM assistance" },
      body: {
        id: "Kegiatan pendampingan digital presence untuk UMKM/kedai kopi yang sudah ada. Fokusnya adalah membaca dan merapikan kanal digital seperti Instagram, Linktree, Google Search, dan Google Maps tanpa mengklaim kepemilikan bisnis.",
        en: "Digital presence assistance for an existing coffee shop/UMKM. The focus was reviewing and organizing digital channels such as Instagram, Linktree, Google Search, and Google Maps without claiming ownership of the business.",
      },
      stack: ["Instagram", "Google Maps", "Google Business Profile", "Linktree", "Local SEO"],
      links: [
        { label: "Instagram", href: "https://www.instagram.com/loficoffe.co" },
        { label: "Linktree", href: "https://linktr.ee/lofi.co" },
      ],
    },
  ];

  return (
    <ModalBackdrop onClose={onClose} maxWidth={760}>
      {({ requestClose }) => (
        <>
          <div
            className="modal-header"
            style={{
              flexShrink: 0,
              padding: "0.9rem 1.1rem 0.8rem",
              borderBottom: "1px solid var(--border)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: 10,
              background: "var(--modal-header-bg)",
            }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
                <TagBadge>{L(training.tag)}</TagBadge>
                <span style={{ fontSize: "0.62rem", color: "var(--text-muted)" }}>{L(training.period)}</span>
              </div>
              <h2 style={{ fontFamily: "var(--font-dm-serif)", fontSize: "1.08rem", fontWeight: 400, color: "var(--text-primary)", lineHeight: 1.25 }}>{L(training.role)}</h2>
              <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 2 }}>{L(training.company)}</p>
            </div>
            <CloseBtn onClose={requestClose} />
          </div>

          <div className="modal-scroll-area" style={{ flex: 1, overflowY: "auto", overflowX: "hidden" }}>
            <div style={{ padding: "1rem 1.1rem 1.4rem", display: "flex", flexDirection: "column", gap: "1.15rem" }}>
              <section>
                <p style={{ fontSize: "0.84rem", lineHeight: 1.82, color: "var(--text-secondary)" }}>{L(training.desc)}</p>
                <a
                  href="/SERTIFIKAT%20KELULUSAN%20PELATIHAN%20-%201810111103-DE4ED1E6.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 7,
                    marginTop: 12,
                    padding: "8px 11px",
                    borderRadius: 8,
                    border: "1px solid var(--border-mid)",
                    backgroundColor: "var(--bg-subtle)",
                    color: "var(--text-primary)",
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    textDecoration: "none",
                  }}
                >
                  <LinkIcon icon="external" />
                  {lang === "id" ? "Lihat Sertifikat Pelatihan" : "View Training Certificate"}
                </a>
              </section>

              <section
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                  gap: 8,
                }}
              >
                {[
                  { value: "BLKI", label: { id: "Penyelenggara", en: "Organizer" } },
                  { value: "260", label: { id: "Jam Pelatihan", en: "Training Hours" } },
                  { value: "9", label: { id: "Unit Kompetensi", en: "Competency Units" } },
                  { value: "2", label: { id: "Proyek Praktikal", en: "Practical Projects" } },
                ].map((item) => (
                  <div key={item.value} style={{ padding: "0.9rem", borderRadius: 12, backgroundColor: "var(--bg-subtle)", border: "1px solid var(--border)" }}>
                    <p style={{ fontFamily: "var(--font-dm-serif)", fontSize: "1.25rem", lineHeight: 1, color: "var(--accent)" }}>{item.value}</p>
                    <p style={{ fontSize: "0.62rem", color: "var(--text-muted)", marginTop: 6, lineHeight: 1.4 }}>{L(item.label)}</p>
                  </div>
                ))}
              </section>

              <section>
                <p style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", opacity: 0.6, marginBottom: 10 }}>{lang === "id" ? "Area Pelatihan" : "Training Areas"}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {learningAreas.map((area) => (
                    <StackChip key={area.en}>{L(area)}</StackChip>
                  ))}
                </div>
              </section>

              <section>
                <p style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", opacity: 0.6, marginBottom: 10 }}>{lang === "id" ? "Proyek Praktikal" : "Practical Projects"}</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 10 }}>
                  {practicalProjects.map((project) => (
                    <article key={project.title} style={{ padding: "1rem", borderRadius: 14, backgroundColor: "var(--bg-card)", border: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: 10 }}>
                      <div>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, marginBottom: 5 }}>
                          <h3 style={{ fontSize: "0.92rem", fontWeight: 600, color: "var(--text-primary)" }}>{project.title}</h3>
                          <span style={{ fontSize: "0.58rem", color: "var(--accent)", backgroundColor: "var(--accent-glow)", border: "1px solid var(--line-color-mid)", borderRadius: 999, padding: "2px 8px", whiteSpace: "nowrap" }}>
                            {L(project.label)}
                          </span>
                        </div>
                        <p style={{ fontSize: "0.78rem", lineHeight: 1.7, color: "var(--text-secondary)" }}>{L(project.body)}</p>
                      </div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                        {project.stack.map((item) => (
                          <span key={item} style={{ fontSize: "0.62rem", padding: "2px 7px", borderRadius: 6, backgroundColor: "var(--bg-subtle)", border: "1px solid var(--border)", color: "var(--text-muted)" }}>
                            {item}
                          </span>
                        ))}
                      </div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginTop: "auto" }}>
                        {project.links.map((link) => (
                          <a
                            key={`${project.title}-${link.label}`}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 6,
                              padding: "7px 11px",
                              borderRadius: 8,
                              fontSize: "0.69rem",
                              fontWeight: 600,
                              textDecoration: "none",
                              color: "var(--text-secondary)",
                              backgroundColor: "var(--bg-subtle)",
                              border: "1px solid var(--border)",
                            }}
                          >
                            <LinkIcon icon="external" />
                            {link.label}
                          </a>
                        ))}
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <section>
                <p style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", opacity: 0.6, marginBottom: 10 }}>{t("highlights")}</p>
                <div style={{ display: "grid", gap: 7 }}>
                  {training.highlights.map((h, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <div style={{ flexShrink: 0, marginTop: 6, width: 4, height: 4, borderRadius: "50%", backgroundColor: "var(--accent)", opacity: 0.5 }} />
                      <span style={{ fontSize: "0.81rem", lineHeight: 1.65, color: "var(--text-secondary)" }}>{L(h)}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 12 }}>
                  <p style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", opacity: 0.6 }}>
                    {t("documentation")}
                    {imgCount > 0 ? ` | ${imgCount} ${lang === "id" ? "Foto" : "Photos"}` : ""}
                  </p>
                  {imgCount > 0 && !loading && (
                    <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontVariantNumeric: "tabular-nums" }}>
                      {carouselIdx + 1} / {imgCount}
                    </span>
                  )}
                </div>

                {loading && (
                  <div style={{ height: 260, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)", fontSize: "0.82rem", flexDirection: "column", gap: 10 }}>
                    <div style={{ width: 24, height: 24, border: "2px solid var(--border)", borderTopColor: "var(--accent)", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
                    {t("loadingPhotos")}
                  </div>
                )}

                {!loading && imgCount === 0 && <div style={{ height: 160, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)", fontSize: "0.82rem" }}>{t("noPhotosFound")}</div>}

                {!loading && imgCount > 0 && (
                  <div aria-hidden="true" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", opacity: 0, pointerEvents: "none" }}>
                    {preloadedCarouselImages.map((imageIndex) => (
                      <span key={`dm-preload-${images[imageIndex]}`} style={{ position: "relative", display: "block", width: 1, height: 1 }}>
                        <NextImage
                          src={images[imageIndex]}
                          alt=""
                          fill
                          sizes="(max-width: 768px) calc(100vw - 2.2rem), 660px"
                          priority={imageIndex < initialPreloadCount}
                          onLoad={() => markCarouselImageLoaded(imageIndex)}
                          onError={() => markCarouselImageLoaded(imageIndex)}
                          style={{ objectFit: "contain" }}
                        />
                      </span>
                    ))}
                  </div>
                )}

                {!loading && imgCount > 0 && !carouselReady && (
                  <div style={{ height: "clamp(200px, 44vw, 380px)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)", fontSize: "0.82rem", flexDirection: "column", gap: 10 }}>
                    <div style={{ width: 24, height: 24, border: "2px solid var(--border)", borderTopColor: "var(--accent)", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
                    {lang === "id" ? "Menyiapkan galeri..." : "Preparing gallery..."}
                  </div>
                )}

                {!loading && imgCount > 0 && carouselReady && (
                  <div style={{ position: "relative" }}>
                    <div
                      onTouchStart={onTouchStart}
                      onTouchEnd={onTouchEnd}
                      style={{
                        position: "relative",
                        width: "100%",
                        height: "clamp(200px, 44vw, 380px)",
                        borderRadius: "0.85rem",
                        overflow: "hidden",
                        backgroundColor: "var(--bg-subtle)",
                        border: "1px solid var(--border)",
                        userSelect: "none",
                      }}
                    >
                      {visibleCarouselImages.map((imageIndex) => (
                        <NextImage
                          key={images[imageIndex]}
                          src={images[imageIndex]}
                          alt={`Digital marketing documentation ${imageIndex + 1}`}
                          fill
                          sizes="(max-width: 768px) calc(100vw - 2.2rem), 660px"
                          priority={imageIndex === carouselIdx}
                          onLoad={() => markCarouselImageLoaded(imageIndex)}
                          onError={() => markCarouselImageLoaded(imageIndex)}
                          style={{
                            objectFit: "contain",
                            opacity: imageIndex === carouselIdx && fade ? 1 : 0,
                            transition: "opacity 0.14s ease",
                            pointerEvents: imageIndex === carouselIdx ? "auto" : "none",
                          }}
                        />
                      ))}
                      {carouselIdx > 0 && (
                        <button
                          onClick={prev}
                          style={{
                            position: "absolute",
                            left: 8,
                            top: "50%",
                            transform: "translateY(-50%)",
                            width: 48,
                            height: 48,
                            borderRadius: "50%",
                            backgroundColor: "rgba(0,0,0,0.45)",
                            border: "1px solid rgba(255,255,255,0.15)",
                            color: "#fff",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backdropFilter: "blur(4px)",
                          }}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                            <path d="M15 18l-6-6 6-6" />
                          </svg>
                        </button>
                      )}
                      {carouselIdx < imgCount - 1 && (
                        <button
                          onClick={next}
                          style={{
                            position: "absolute",
                            right: 8,
                            top: "50%",
                            transform: "translateY(-50%)",
                            width: 48,
                            height: 48,
                            borderRadius: "50%",
                            backgroundColor: "rgba(0,0,0,0.45)",
                            border: "1px solid rgba(255,255,255,0.15)",
                            color: "#fff",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backdropFilter: "blur(4px)",
                          }}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                            <path d="M9 18l6-6-6-6" />
                          </svg>
                        </button>
                      )}
                    </div>

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 5, marginTop: 12, flexWrap: "wrap", minHeight: 16 }}>{renderDots()}</div>
                    <p style={{ textAlign: "center", fontSize: "0.65rem", color: "var(--text-faint)", marginTop: 8 }}>← → {t("keyboardSwipeHint")}</p>
                  </div>
                )}
              </section>
            </div>
          </div>
        </>
      )}
    </ModalBackdrop>
  );
}

// ────── InternModal — KPU Internship with Carousel ──────────────────────────────────────────────────────────────

function InternModal({ onClose }: { onClose: () => void }) {
  const { lang } = useLanguage();
  const t = (key: string, ...params: any[]) => translate(lang, key, ...params);
  const L = (loc: Localized): string => (lang === "id" ? loc.id : loc.en);
  const LT = (value: LocalizedText): string => (typeof value === "string" ? value : L(value));
  const description = L(experience[1].desc);
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [fade, setFade] = useState(true);
  const [carouselReady, setCarouselReady] = useState(false);
  const [preloadLimit, setPreloadLimit] = useState(0);
  const [loadedImageIndexes, setLoadedImageIndexes] = useState<Set<number>>(() => new Set());
  // Touch swipe
  const touchStartX = useRef<number>(0);
  const imgCount = images.length;
  const highlights = experience[1].highlights;
  const initialPreloadCount = Math.min(6, imgCount);
  const backgroundPreloadBatchSize = 3;

  // Fetch & shuffle
  useEffect(() => {
    fetch("/api/intern-images")
      .then((r) => r.json())
      .then((data: { images: string[] }) => {
        const certificateImage = "/intern-image/Sertifikat_Magang_Furqan.png";
        const otherImages = data.images.filter((image) => image !== certificateImage);
        setImages([certificateImage, ...otherImages.sort(() => Math.random() - 0.5)]);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (imgCount === 0) return;

    setCarouselReady(false);
    setLoadedImageIndexes(new Set());
    setPreloadLimit(initialPreloadCount);
    setCarouselIdx(0);
  }, [images, imgCount, initialPreloadCount]);

  useEffect(() => {
    if (imgCount === 0 || carouselReady || initialPreloadCount === 0) return;

    const initialBatchLoaded = Array.from({ length: initialPreloadCount }).every((_, index) => loadedImageIndexes.has(index));
    if (initialBatchLoaded) setCarouselReady(true);
  }, [carouselReady, imgCount, initialPreloadCount, loadedImageIndexes]);

  useEffect(() => {
    if (!carouselReady || preloadLimit >= imgCount) return;

    const currentBatchLoaded = Array.from({ length: preloadLimit }).every((_, index) => loadedImageIndexes.has(index));
    if (!currentBatchLoaded) return;

    const timer = window.setTimeout(() => {
      setPreloadLimit((current) => Math.min(current + backgroundPreloadBatchSize, imgCount));
    }, 350);

    return () => window.clearTimeout(timer);
  }, [carouselReady, imgCount, loadedImageIndexes, preloadLimit]);

  // Keyboard: Escape = close, ← → = navigate
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goTo((prev: number) => Math.min(prev + 1, imgCount - 1));
      if (e.key === "ArrowLeft") goTo((prev: number) => Math.max(prev - 1, 0));
    };
    document.addEventListener("keydown", handler);
    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, [imgCount]);

  // Smooth fade transition on photo change
  const goTo = (updater: number | ((prev: number) => number)) => {
    setFade(false);
    setTimeout(() => {
      setCarouselIdx(typeof updater === "function" ? updater : () => updater);
      setFade(true);
    }, 140);
  };

  const prev = () => {
    if (carouselIdx > 0) goTo(carouselIdx - 1);
  };
  const next = () => {
    if (carouselIdx < imgCount - 1) goTo(carouselIdx + 1);
  };

  const visibleCarouselImages = [carouselIdx - 1, carouselIdx, carouselIdx + 1].filter((index) => index >= 0 && index < imgCount);
  const preloadedCarouselImages = Array.from({ length: preloadLimit }, (_, index) => index);
  const markCarouselImageLoaded = (index: number) => {
    setLoadedImageIndexes((current) => {
      if (current.has(index)) return current;
      const nextLoaded = new Set(current);
      nextLoaded.add(index);
      return nextLoaded;
    });
  };

  // Touch swipe handlers
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) next();
      else prev();
    }
  };

  // Dots: max 7 visible, with ellipsis-style scaling
  const renderDots = () => {
    if (imgCount <= 7) {
      return Array.from({ length: imgCount }).map((_, i) => (
        <button
          key={i}
          onClick={() => goTo(i)}
          style={{
            width: i === carouselIdx ? 20 : 6,
            height: 6,
            borderRadius: 999,
            border: "none",
            padding: 0,
            cursor: "pointer",
            backgroundColor: i === carouselIdx ? "var(--accent)" : "var(--border-mid)",
            transition: "all 0.25s ease",
            flexShrink: 0,
          }}
        />
      ));
    }
    // For many images, show 7 slots: first, last, activeÂ±1, and ellipsis
    const visible = new Set([0, imgCount - 1, carouselIdx, carouselIdx - 1, carouselIdx + 1].filter((i) => i >= 0 && i < imgCount));
    return Array.from({ length: imgCount })
      .map((_, i) => {
        if (!visible.has(i)) {
          // Only show one ellipsis between gaps
          const prevVisible = [...visible].filter((v) => v < i).length > 0 && [...visible].every((v) => v !== i - 1);
          if (prevVisible)
            return (
              <span key={i} style={{ fontSize: "0.5rem", color: "var(--text-muted)", lineHeight: 1 }}>
                •
              </span>
            );
          return null;
        }
        return (
          <button
            key={i}
            onClick={() => goTo(i)}
            style={{
              width: i === carouselIdx ? 20 : 6,
              height: 6,
              borderRadius: 999,
              border: "none",
              padding: 0,
              cursor: "pointer",
              backgroundColor: i === carouselIdx ? "var(--accent)" : "var(--border-mid)",
              transition: "all 0.25s ease",
              flexShrink: 0,
            }}
          />
        );
      })
      .filter(Boolean);
  };

  return (
    <ModalBackdrop onClose={onClose} maxWidth={700}>
      {({ onTouchStart: swipeTouchStart, onTouchMove: swipeTouchMove, onTouchEnd: swipeTouchEnd, requestClose }) => (
        <>
          {/* Header */}
          <div
            className="modal-header"
            style={{ flexShrink: 0, padding: "0.9rem 1.1rem 0.8rem", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10, background: "var(--modal-header-bg)" }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
                <TagBadge>{lang === "id" ? "Magang" : "Internship"}</TagBadge>
                <span style={{ fontSize: "0.62rem", color: "var(--text-muted)" }}>Feb 2024 – Sep 2024</span>
              </div>
              <h2 style={{ fontFamily: "var(--font-dm-serif)", fontSize: "1.05rem", fontWeight: 400, color: "var(--text-primary)", lineHeight: 1.25 }}>
                {lang === "id" ? "Sekretariat Jenderal Komisi Pemilihan Umum Republik Indonesia (KPU RI)" : "Secretariat General of the General Elections Commission of the Republic of Indonesia (KPU RI)"}
              </h2>
              <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 2 }}>
                {lang === "id" ? "Biro Pusat Data & Teknologi Informasi (Pusdatin) · Menteng, Jakarta Pusat, Indonesia" : "Data & Information Technology Center (Pusdatin) · Menteng, Central Jakarta, Indonesia"}
              </p>
            </div>
            <CloseBtn onClose={requestClose} />
          </div>

          {/* Scrollable body */}
          <div className="modal-scroll-area" style={{ flex: 1, overflowY: "auto", overflowX: "hidden" }}>
            <div style={{ padding: "1rem 1.1rem 0" }}>
              <p style={{ fontSize: "0.83rem", lineHeight: 1.8, color: "var(--text-secondary)" }}>{description}</p>
              <div style={{ marginTop: "0.9rem" }}>
                <p style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", opacity: 0.6, marginBottom: 8 }}>{t("highlights")}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {highlights.map((h, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 9 }}>
                      <div style={{ flexShrink: 0, marginTop: 6, width: 4, height: 4, borderRadius: "50%", backgroundColor: "var(--accent)", opacity: 0.5 }} />
                      <span style={{ fontSize: "0.81rem", lineHeight: 1.65, color: "var(--text-secondary)" }}>{L(h)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: "0.9rem", paddingBottom: "1.1rem", borderBottom: "1px solid var(--border)" }}>
                <p style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", opacity: 0.6, marginBottom: 8 }}>{t("links")}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                  {[
                    { label: "GitHub (SIAKBA)", href: "https://github.com/Furqan-sykss/siakba", icon: "github" },
                    { label: "Google Drive", href: "https://drive.google.com/drive/folders/1kkZ7vN0Gf6zV3KUKFzoIBgeujkCfRp6Y?usp=sharing", icon: "drive" },
                    { label: lang === "id" ? "Wireframe Figma" : "Figma Wireframe", href: "https://www.figma.com/design/tA7R82I0PJWt3K05d93f0E/Wireframe--Based-on-SIAKBA-Project--?node-id=0-1&t=ERBAlDshXXiCShwP-1", icon: "figma" },
                  ].map((l) => (
                    <a
                      key={LT(l.label)}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 7,
                        padding: "7px 13px",
                        borderRadius: 9,
                        fontSize: "0.73rem",
                        fontWeight: 500,
                        backgroundColor: "var(--bg-subtle)",
                        border: "1px solid var(--border)",
                        color: "var(--text-secondary)",
                        textDecoration: "none",
                        transition: "all 0.18s ease",
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderColor = "var(--border-strong)";
                        el.style.color = "var(--accent)";
                        el.style.backgroundColor = "var(--accent-glow)";
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderColor = "var(--border)";
                        el.style.color = "var(--text-secondary)";
                        el.style.backgroundColor = "var(--bg-subtle)";
                      }}
                    >
                      <LinkIcon icon={l.icon || "drive"} />
                      {LT(l.label)}
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ opacity: 0.4 }}>
                        <path d="M1.5 8.5L8.5 1.5M8.5 1.5H3.5M8.5 1.5V6.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Carousel */}
            <div style={{ padding: "1.1rem 1.1rem 1.4rem" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                <p style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", opacity: 0.6 }}>
                  {t("documentation")}
                  {imgCount > 0 ? ` | ${imgCount} ${lang === "id" ? "Foto" : "Photos"}` : ""}
                </p>
                {imgCount > 0 && !loading && (
                  <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontVariantNumeric: "tabular-nums" }}>
                    {carouselIdx + 1} / {imgCount}
                  </span>
                )}
              </div>
              {loading && (
                <div style={{ height: 260, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)", fontSize: "0.82rem", flexDirection: "column", gap: 10 }}>
                  <div style={{ width: 24, height: 24, border: "2px solid var(--border)", borderTopColor: "var(--accent)", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
                  Memuat foto...
                </div>
              )}
              {!loading && imgCount === 0 && <div style={{ height: 160, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)", fontSize: "0.82rem" }}>Foto tidak ditemukan.</div>}
              {!loading && imgCount > 0 && (
                <div aria-hidden="true" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", opacity: 0, pointerEvents: "none" }}>
                  {preloadedCarouselImages.map((imageIndex) => (
                    <span key={`kpu-preload-${images[imageIndex]}`} style={{ position: "relative", display: "block", width: 1, height: 1 }}>
                      <NextImage
                        src={images[imageIndex]}
                        alt=""
                        fill
                        sizes="(max-width: 768px) calc(100vw - 2.2rem), 660px"
                        priority={imageIndex < initialPreloadCount}
                        onLoad={() => markCarouselImageLoaded(imageIndex)}
                        onError={() => markCarouselImageLoaded(imageIndex)}
                        style={{ objectFit: "contain" }}
                      />
                    </span>
                  ))}
                </div>
              )}
              {!loading && imgCount > 0 && !carouselReady && (
                <div style={{ height: "clamp(200px, 44vw, 380px)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)", fontSize: "0.82rem", flexDirection: "column", gap: 10 }}>
                  <div style={{ width: 24, height: 24, border: "2px solid var(--border)", borderTopColor: "var(--accent)", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
                  {lang === "id" ? "Menyiapkan galeri..." : "Preparing gallery..."}
                </div>
              )}
              {!loading && imgCount > 0 && carouselReady && (
                <div style={{ position: "relative" }}>
                  <div
                    onTouchStart={onTouchStart}
                    onTouchEnd={onTouchEnd}
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "clamp(200px, 44vw, 380px)",
                      borderRadius: "0.85rem",
                      overflow: "hidden",
                      backgroundColor: "var(--bg-subtle)",
                      border: "1px solid var(--border)",
                      userSelect: "none",
                    }}
                  >
                    {visibleCarouselImages.map((imageIndex) => (
                      <NextImage
                        key={images[imageIndex]}
                        src={images[imageIndex]}
                        alt={`KPU documentation ${imageIndex + 1}`}
                        fill
                        sizes="(max-width: 768px) calc(100vw - 2.2rem), 660px"
                        priority
                        onLoad={() => markCarouselImageLoaded(imageIndex)}
                        onError={() => markCarouselImageLoaded(imageIndex)}
                        style={{
                          objectFit: "contain",
                          opacity: imageIndex === carouselIdx && fade ? 1 : 0,
                          transition: "opacity 0.14s ease",
                          pointerEvents: imageIndex === carouselIdx ? "auto" : "none",
                        }}
                      />
                    ))}
                    {carouselIdx > 0 && (
                      <button
                        onClick={prev}
                        style={{
                          position: "absolute",
                          left: 8,
                          top: "50%",
                          transform: "translateY(-50%)",
                          width: 48,
                          height: 48,
                          borderRadius: "50%",
                          backgroundColor: "rgba(0,0,0,0.45)",
                          border: "1px solid rgba(255,255,255,0.15)",
                          color: "#fff",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backdropFilter: "blur(4px)",
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                          <path d="M15 18l-6-6 6-6" />
                        </svg>
                      </button>
                    )}
                    {carouselIdx < imgCount - 1 && (
                      <button
                        onClick={next}
                        style={{
                          position: "absolute",
                          right: 8,
                          top: "50%",
                          transform: "translateY(-50%)",
                          width: 48,
                          height: 48,
                          borderRadius: "50%",
                          backgroundColor: "rgba(0,0,0,0.45)",
                          border: "1px solid rgba(255,255,255,0.15)",
                          color: "#fff",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backdropFilter: "blur(4px)",
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                          <path d="M9 18l6-6-6-6" />
                        </svg>
                      </button>
                    )}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 5, marginTop: 12, flexWrap: "wrap", minHeight: 16 }}>{renderDots()}</div>
                  <p style={{ textAlign: "center", fontSize: "0.65rem", color: "var(--text-faint)", marginTop: 8 }}>← → {t("keyboardSwipeHint")}</p>

                  {/* ──── Confidentiality Notice ────────────────────────────────────────────────────────────── */}
                  <div
                    style={{
                      marginTop: 18,
                      padding: "11px 14px",
                      borderRadius: 10,
                      backgroundColor: "var(--bg-subtle)",
                      border: "1px solid var(--border)",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 10,
                    }}
                  >
                    {/* Lock icon */}
                    <div style={{ flexShrink: 0, marginTop: 1 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.65 }}>
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0110 0v4" />
                      </svg>
                    </div>
                    <div>
                      <p style={{ fontSize: "0.63rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: 3, letterSpacing: "0.01em" }}>{t("confidentialityNotice")}</p>
                      <p style={{ fontSize: "0.61rem", lineHeight: 1.65, color: "var(--text-muted)" }}>
                        {lang === "id"
                          ? "Untuk menjaga keamanan data dan kerahasiaan organisasi, dokumen tertentu dari pengalaman magang ini tidak dapat diungkapkan atau dibagikan ke publik."
                          : "To safeguard data security and organizational confidentiality, certain documentation from this internship experience cannot be disclosed or distributed to the public."}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </ModalBackdrop>
  );
}

// ────── EventModal — Tokopedia Event Crew ────────────────────────────────────────────────────────────────────────────────

function EventModal({ onClose }: { onClose: () => void }) {
  const { lang } = useLanguage();
  const t = (key: string, ...params: any[]) => translate(lang, key, ...params);
  const L = (loc: Localized): string => (lang === "id" ? loc.id : loc.en);
  const description = L(experience[0].desc);

  // ──── Carousel state (mirrors InternModal) ────
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [fade, setFade] = useState(true);
  const [carouselReady, setCarouselReady] = useState(false);
  const [preloadLimit, setPreloadLimit] = useState(0);
  const [loadedImageIndexes, setLoadedImageIndexes] = useState<Set<number>>(() => new Set());
  const touchStartX = useRef<number>(0);
  const imgCount = images.length;
  const initialPreloadCount = Math.min(6, imgCount);
  const backgroundPreloadBatchSize = 3;

  // Fetch & shuffle on mount
  useEffect(() => {
    fetch("/api/eventcrew-image")
      .then((r) => r.json())
      .then((data: { images: string[] }) => {
        setImages([...data.images].sort(() => Math.random() - 0.5));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (imgCount === 0) return;

    setCarouselReady(false);
    setLoadedImageIndexes(new Set());
    setPreloadLimit(initialPreloadCount);
    setCarouselIdx(0);
  }, [images, imgCount, initialPreloadCount]);

  useEffect(() => {
    if (imgCount === 0 || carouselReady || initialPreloadCount === 0) return;

    const initialBatchLoaded = Array.from({ length: initialPreloadCount }).every((_, index) => loadedImageIndexes.has(index));
    if (initialBatchLoaded) setCarouselReady(true);
  }, [carouselReady, imgCount, initialPreloadCount, loadedImageIndexes]);

  useEffect(() => {
    if (!carouselReady || preloadLimit >= imgCount) return;

    const currentBatchLoaded = Array.from({ length: preloadLimit }).every((_, index) => loadedImageIndexes.has(index));
    if (!currentBatchLoaded) return;

    const timer = window.setTimeout(() => {
      setPreloadLimit((current) => Math.min(current + backgroundPreloadBatchSize, imgCount));
    }, 350);

    return () => window.clearTimeout(timer);
  }, [carouselReady, imgCount, loadedImageIndexes, preloadLimit]);

  // Keyboard: ← → navigate
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goTo((prev: number) => Math.min(prev + 1, imgCount - 1));
      if (e.key === "ArrowLeft") goTo((prev: number) => Math.max(prev - 1, 0));
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [imgCount]);

  // Smooth fade on photo change
  const goTo = (updater: number | ((prev: number) => number)) => {
    setFade(false);
    setTimeout(() => {
      setCarouselIdx(typeof updater === "function" ? updater : () => updater);
      setFade(true);
    }, 140);
  };
  const prev = () => {
    if (carouselIdx > 0) goTo(carouselIdx - 1);
  };
  const next = () => {
    if (carouselIdx < imgCount - 1) goTo(carouselIdx + 1);
  };

  const visibleCarouselImages = [carouselIdx - 1, carouselIdx, carouselIdx + 1].filter((index) => index >= 0 && index < imgCount);
  const preloadedCarouselImages = Array.from({ length: preloadLimit }, (_, index) => index);
  const markCarouselImageLoaded = (index: number) => {
    setLoadedImageIndexes((current) => {
      if (current.has(index)) return current;
      const nextLoaded = new Set(current);
      nextLoaded.add(index);
      return nextLoaded;
    });
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) next();
      else prev();
    }
  };

  // Smart dots — same as InternModal
  const renderDots = () => {
    if (imgCount <= 7) {
      return Array.from({ length: imgCount }).map((_, i) => (
        <button
          key={i}
          onClick={() => goTo(i)}
          style={{
            width: i === carouselIdx ? 20 : 6,
            height: 6,
            borderRadius: 999,
            border: "none",
            padding: 0,
            cursor: "pointer",
            backgroundColor: i === carouselIdx ? "var(--accent)" : "var(--border-mid)",
            transition: "all 0.25s ease",
            flexShrink: 0,
          }}
        />
      ));
    }
    const visible = new Set([0, imgCount - 1, carouselIdx, carouselIdx - 1, carouselIdx + 1].filter((i) => i >= 0 && i < imgCount));
    return Array.from({ length: imgCount })
      .map((_, i) => {
        if (!visible.has(i)) {
          const prevVisible = [...visible].filter((v) => v < i).length > 0 && [...visible].every((v) => v !== i - 1);
          if (prevVisible)
            return (
              <span key={i} style={{ fontSize: "0.5rem", color: "var(--text-muted)", lineHeight: 1 }}>
                •
              </span>
            );
          return null;
        }
        return (
          <button
            key={i}
            onClick={() => goTo(i)}
            style={{
              width: i === carouselIdx ? 20 : 6,
              height: 6,
              borderRadius: 999,
              border: "none",
              padding: 0,
              cursor: "pointer",
              backgroundColor: i === carouselIdx ? "var(--accent)" : "var(--border-mid)",
              transition: "all 0.25s ease",
              flexShrink: 0,
            }}
          />
        );
      })
      .filter(Boolean);
  };

  const facts = [
    { label: lang === "id" ? "Perusahaan" : "Company", value: "PT Fasen Creative Quality" },
    { label: lang === "id" ? "Klien" : "Client", value: "Tokopedia (Dyandra Event Solutions)" },
    { label: lang === "id" ? "Peran" : "Role", value: lang === "id" ? "Crew Acara - Runner Flash Sale" : "Event Crew - Runner Flash Sale" },
    { label: lang === "id" ? "Durasi" : "Duration", value: lang === "id" ? "5 hari | 13 - 17 Mar 2024" : "5 days | Mar 13 - 17, 2024" },
    { label: lang === "id" ? "Kontrak" : "Contract", value: lang === "id" ? "Kontrak waktu tertentu | Ditandatangani 10 Maret 2024" : "Fixed-term | Signed 10 March 2024" },
  ];

  const highlights = experience[0].highlights;

  return (
    <ModalBackdrop onClose={onClose} maxWidth={660}>
      {({ requestClose }) => (
        <>
          {/* Header */}
          <div
            className="modal-header"
            style={{ flexShrink: 0, padding: "0.9rem 1.1rem 0.8rem", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10, background: "var(--modal-header-bg)" }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5, flexWrap: "wrap" }}>
                <span
                  style={{
                    fontSize: "0.58rem",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    padding: "3px 8px",
                    borderRadius: 5,
                    backgroundColor: "var(--accent-glow)",
                    color: "var(--accent)",
                    border: "1px solid var(--border-mid)",
                  }}
                >
                  {lang === "id" ? "Crew Acara" : "Event Crew"}
                </span>
                <span style={{ fontSize: "0.62rem", color: "var(--text-muted)" }}>{lang === "id" ? "13 - 17 Maret 2024 | Jakarta" : "13 - 17 March 2024 | Jakarta"}</span>
              </div>
              <h2 style={{ fontFamily: "var(--font-dm-serif)", fontSize: "1.1rem", fontWeight: 400, color: "var(--text-primary)", lineHeight: 1.25, marginBottom: 2 }}>Tokopedia Ramadan Extra 2024 Flash Sale</h2>
              <p style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>
                {lang === "id"
                  ? "PT Fasen Creative Quality (Dyandra Event Solutions) | Kebayoran Lama, Jakarta Selatan, Indonesia (Pondok Indah Mall 3)"
                  : "PT Fasen Creative Quality (Dyandra Event Solutions) | Kebayoran Lama, South Jakarta, Indonesia (Pondok Indah Mall 3)"}
              </p>
            </div>
            <CloseBtn onClose={requestClose} />
          </div>

          {/* Scrollable body */}
          <div className="modal-scroll-area" style={{ flex: 1, overflowY: "auto", overflowX: "hidden" }}>
            <div style={{ padding: "1rem 1.1rem 0", display: "flex", flexDirection: "column", gap: "1rem" }}>
              {/* Overview + facts */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 12 }} className="ev-grid">
                <style suppressHydrationWarning>{`
                  @media(min-width:640px){.ev-grid{grid-template-columns:1.08fr 0.92fr!important;align-items:start}}
                  @media(min-width:900px){.ev-grid{grid-template-columns:minmax(0,1.08fr) minmax(0,0.92fr)!important;align-items:start}}
                  @media(min-width:900px){.ev-desktop-copy{display:block!important}}
                  @media(max-width:899px){.ev-desktop-copy{display:none!important}}
                  @media(min-width:900px){.ev-mobile-copy{display:none!important}}
                  @media(max-width:899px){.ev-mobile-copy{display:block!important}}
                `}</style>
                <div
                  style={{
                    borderRadius: "1rem",
                    border: "1px solid var(--border)",
                    backgroundColor: "var(--bg-subtle)",
                    padding: "1rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: 14,
                    minHeight: 160,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
                    <div>
                      <p style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", opacity: 0.7, marginBottom: 6 }}>
                        {lang === "id" ? "Ringkasan Peran" : "Engagement Overview"}
                      </p>
                      <p style={{ fontSize: "0.96rem", fontWeight: 600, color: "var(--text-primary)", lineHeight: 1.4 }}>
                        {lang === "id" ? "Dukungan runner di lokasi untuk Tokopedia Ramadan Extra di Jakarta." : "On-site runner support for Tokopedia Ramadan Extra in Jakarta."}
                      </p>
                    </div>
                    <div style={{ padding: "6px 10px", borderRadius: 999, backgroundColor: "var(--bg-primary)", border: "1px solid var(--border)", fontSize: "0.62rem", fontWeight: 700, color: "var(--text-primary)", whiteSpace: "nowrap" }}>
                      {lang === "id" ? "5 Hari" : "5 Days"}
                    </div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 10 }}>
                    <div style={{ padding: "10px 12px", borderRadius: 12, backgroundColor: "var(--bg-primary)", border: "1px solid var(--border)" }}>
                      <p style={{ fontSize: "0.56rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 4 }}>{lang === "id" ? "Kontrak" : "Contract"}</p>
                      <p style={{ fontSize: "0.76rem", fontWeight: 600, color: "var(--text-primary)", lineHeight: 1.35 }}>{lang === "id" ? "Perjanjian kerja waktu tertentu" : "Fixed-term employment agreement"}</p>
                    </div>
                    <div style={{ padding: "10px 12px", borderRadius: 12, backgroundColor: "var(--bg-primary)", border: "1px solid var(--border)" }}>
                      <p style={{ fontSize: "0.56rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 4 }}>{lang === "id" ? "Lokasi" : "Venue"}</p>
                      <p style={{ fontSize: "0.76rem", fontWeight: 600, color: "var(--text-primary)", lineHeight: 1.35 }}>{lang === "id" ? "Pondok Indah Mall 3, Jakarta Selatan" : "Pondok Indah Mall 3, South Jakarta"}</p>
                    </div>
                  </div>
                  <div className="ev-desktop-copy" style={{ display: "none", paddingTop: 2 }}>
                    <p style={{ fontSize: "0.84rem", lineHeight: 1.85, color: "var(--text-secondary)", textWrap: "pretty" as "pretty" }}>{description}</p>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                  {facts.map(({ label, value }) => (
                    <div key={label} style={{ padding: "10px 12px", borderRadius: 12, backgroundColor: "var(--bg-subtle)", border: "1px solid var(--border)" }}>
                      <p style={{ fontSize: "0.57rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)", opacity: 0.55, marginBottom: 2 }}>{label}</p>
                      <p style={{ fontSize: "0.78rem", fontWeight: 500, color: "var(--text-primary)", lineHeight: 1.3 }}>{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <p className="ev-mobile-copy" style={{ display: "block", fontSize: "0.83rem", lineHeight: 1.8, color: "var(--text-secondary)" }}>
                {description}
              </p>

              {/* Responsibilities */}
              <div>
                <p style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", opacity: 0.6, marginBottom: 10 }}>{t("highlights")}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                  {highlights.map((h, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <div style={{ flexShrink: 0, marginTop: 7, width: 4, height: 4, borderRadius: "50%", backgroundColor: "var(--accent)", opacity: 0.5 }} />
                      <span style={{ fontSize: "0.81rem", lineHeight: 1.65, color: "var(--text-secondary)" }}>{L(h)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Employment contract badge */}
              <div
                style={{
                  padding: "12px 14px",
                  borderRadius: 12,
                  background: "linear-gradient(180deg, var(--bg-subtle) 0%, color-mix(in srgb, var(--accent-glow) 30%, var(--bg-subtle)) 100%)",
                  border: "1px solid var(--border)",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <div style={{ width: 30, height: 30, borderRadius: 8, flexShrink: 0, backgroundColor: "var(--accent-glow)", border: "1px solid var(--border-mid)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <polyline points="9 15 11 17 15 13" />
                  </svg>
                </div>
                <div>
                  <p style={{ fontSize: "0.73rem", fontWeight: 600, color: "var(--text-primary)" }}>{lang === "id" ? "Kontrak Kerja Terverifikasi" : "Employment Contract Verified"}</p>
                  <p style={{ fontSize: "0.64rem", color: "var(--text-muted)", marginTop: 1 }}>
                    {lang === "id" ? "Surat Perjanjian Kerja | PT Fasen Creative Quality | Ditandatangani 10 Maret 2024" : "Employment Agreement | PT Fasen Creative Quality | Signed 10 March 2024"}
                  </p>
                </div>
              </div>
            </div>

            {/* ──── Photo Documentation Carousel ────────────────────────────────────────────────────────────── */}
            <div style={{ padding: "1.2rem 1.1rem 1.6rem", borderTop: "1px solid var(--border)", marginTop: "1rem" }}>
              {/* Section label + counter */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <p style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", opacity: 0.6 }}>
                    {t("documentation")}
                    {imgCount > 0 ? ` | ${imgCount} ${lang === "id" ? "Foto" : "Photos"}` : ""}
                  </p>
                  {imgCount > 0 && !loading && (
                    <span style={{ fontSize: "0.67rem", color: "var(--text-faint)", fontVariantNumeric: "tabular-nums" }}>
                      {carouselIdx + 1} / {imgCount}
                    </span>
                  )}
                </div>
              </div>

              {/* Loading spinner */}
              {loading && (
                <div style={{ height: 260, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 10, color: "var(--text-muted)", fontSize: "0.82rem" }}>
                  <div style={{ width: 24, height: 24, border: "2px solid var(--border)", borderTopColor: "var(--accent)", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
                  {t("loadingPhotos")}
                </div>
              )}

              {/* No photos */}
              {!loading && imgCount === 0 && <div style={{ height: 160, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)", fontSize: "0.82rem" }}>{t("noPhotosFound")}</div>}

              {!loading && imgCount > 0 && (
                <div aria-hidden="true" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", opacity: 0, pointerEvents: "none" }}>
                  {preloadedCarouselImages.map((imageIndex) => (
                    <span key={`event-preload-${images[imageIndex]}`} style={{ position: "relative", display: "block", width: 1, height: 1 }}>
                      <NextImage
                        src={images[imageIndex]}
                        alt=""
                        fill
                        sizes="(max-width: 768px) calc(100vw - 2.2rem), 620px"
                        priority={imageIndex < initialPreloadCount}
                        onLoad={() => markCarouselImageLoaded(imageIndex)}
                        onError={() => markCarouselImageLoaded(imageIndex)}
                        style={{ objectFit: "contain" }}
                      />
                    </span>
                  ))}
                </div>
              )}

              {!loading && imgCount > 0 && !carouselReady && (
                <div style={{ height: "clamp(200px, 44vw, 380px)", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 10, color: "var(--text-muted)", fontSize: "0.82rem" }}>
                  <div style={{ width: 24, height: 24, border: "2px solid var(--border)", borderTopColor: "var(--accent)", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
                  {lang === "id" ? "Menyiapkan galeri..." : "Preparing gallery..."}
                </div>
              )}

              {/* Carousel */}
              {!loading && imgCount > 0 && carouselReady && (
                <div style={{ position: "relative" }}>
                  {/* Image frame */}
                  <div
                    onTouchStart={onTouchStart}
                    onTouchEnd={onTouchEnd}
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "clamp(200px, 44vw, 380px)",
                      borderRadius: "0.85rem",
                      overflow: "hidden",
                      backgroundColor: "var(--bg-subtle)",
                      border: "1px solid var(--border)",
                      userSelect: "none",
                    }}
                  >
                    {visibleCarouselImages.map((imageIndex) => (
                      <NextImage
                        key={images[imageIndex]}
                        src={images[imageIndex]}
                        alt={`Event crew documentation ${imageIndex + 1}`}
                        fill
                        sizes="(max-width: 768px) calc(100vw - 2.2rem), 620px"
                        priority
                        onLoad={() => markCarouselImageLoaded(imageIndex)}
                        onError={() => markCarouselImageLoaded(imageIndex)}
                        style={{
                          objectFit: "contain",
                          opacity: imageIndex === carouselIdx && fade ? 1 : 0,
                          transition: "opacity 0.14s ease",
                          pointerEvents: imageIndex === carouselIdx ? "auto" : "none",
                        }}
                      />
                    ))}
                    {/* Prev button */}
                    {carouselIdx > 0 && (
                      <button
                        onClick={prev}
                        style={{
                          position: "absolute",
                          left: 8,
                          top: "50%",
                          transform: "translateY(-50%)",
                          width: 48,
                          height: 48,
                          borderRadius: "50%",
                          backgroundColor: "rgba(0,0,0,0.45)",
                          border: "1px solid rgba(255,255,255,0.15)",
                          color: "#fff",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backdropFilter: "blur(4px)",
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                          <path d="M15 18l-6-6 6-6" />
                        </svg>
                      </button>
                    )}
                    {/* Next button */}
                    {carouselIdx < imgCount - 1 && (
                      <button
                        onClick={next}
                        style={{
                          position: "absolute",
                          right: 8,
                          top: "50%",
                          transform: "translateY(-50%)",
                          width: 48,
                          height: 48,
                          borderRadius: "50%",
                          backgroundColor: "rgba(0,0,0,0.45)",
                          border: "1px solid rgba(255,255,255,0.15)",
                          color: "#fff",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backdropFilter: "blur(4px)",
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                          <path d="M9 18l6-6-6-6" />
                        </svg>
                      </button>
                    )}
                  </div>

                  {/* Dots */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 5, marginTop: 12, flexWrap: "wrap", minHeight: 16 }}>{renderDots()}</div>

                  {/* Keyboard hint */}
                  <p style={{ textAlign: "center", fontSize: "0.65rem", color: "var(--text-faint)", marginTop: 8 }}>← → {t("keyboardSwipeHint")}</p>

                  {/* ──── Privacy Notice ────────────────────────────────────────────────────────────────────────────── */}
                  <div
                    style={{
                      marginTop: 18,
                      padding: "11px 14px",
                      borderRadius: 10,
                      backgroundColor: "var(--bg-subtle)",
                      border: "1px solid var(--border)",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 10,
                    }}
                  >
                    {/* Lock icon */}
                    <div style={{ flexShrink: 0, marginTop: 1 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.65 }}>
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0110 0v4" />
                      </svg>
                    </div>
                    <div>
                      <p style={{ fontSize: "0.63rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: 3, letterSpacing: "0.01em" }}>{t("confidentialityNotice")}</p>
                      <p style={{ fontSize: "0.61rem", lineHeight: 1.65, color: "var(--text-muted)" }}>{t("confidentialityText")}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </ModalBackdrop>
  );
}

// ────── EducationModal ────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────

function EducationModal({ onClose }: { onClose: () => void }) {
  const { lang } = useLanguage();
  const t = (key: string, ...params: any[]) => translate(lang, key, ...params);
  const coursework: { label: string; color: string; courses: string[] }[] = [
    {
      label: lang === "id" ? "Web Dev" : "Web Dev",
      color: "var(--accent)",
      courses: lang === "id" ? ["Pemrograman Web", "Sistem Informasi Berbasis Web", "Desain UI/UX"] : ["Web Programming", "Web-Based Information Systems", "UI/UX Design"],
    },
    { label: lang === "id" ? "Data" : "Data", color: "#7c9e87", courses: lang === "id" ? ["Sistem Basis Data", "Data Mining", "Struktur Data & Algoritma"] : ["Database Systems", "Data Mining", "Data Structures & Algorithms"] },
    {
      label: lang === "id" ? "Perangkat Lunak" : "Software",
      color: "#8a7fa8",
      courses: lang === "id" ? ["Pemrograman Berorientasi Objek", "Rekayasa Perangkat Lunak", "Analisis & Perancangan Sistem"] : ["Object-Oriented Programming", "Software Engineering", "System Analysis & Design"],
    },
    { label: lang === "id" ? "Jaringan" : "Network", color: "#9e8a7c", courses: lang === "id" ? ["Jaringan Komputer", "Keamanan Jaringan", "Sistem Operasi"] : ["Computer Networks", "Network Security", "Operating Systems"] },
    { label: lang === "id" ? "Mobile" : "Mobile", color: "#7a9eb0", courses: lang === "id" ? ["Pengembangan Aplikasi Mobile"] : ["Mobile Application Development"] },
  ];

  const documents = [
    { label: t("academicTranscript"), icon: "TR", desc: t("fullSemesterGradeRecords"), href: "https://drive.google.com/file/d/1JHXxbva9LFHsxFQX1_SElLxkFeO1q3fC/view?usp=drive_link" },
    { label: t("diploma"), icon: "IJ", desc: t("officialGraduationCertificate"), href: "https://drive.google.com/file/d/1dxUVki3i7CmERYdxpPjzX-XtW0OVT6y9/view?usp=drive_link" },
    { label: t("scientificJournal"), icon: "JR", desc: t("publishedUndergraduateResearch"), href: "https://drive.google.com/file/d/1oPKl6xDAVcO336NuP7VrsKrEbNMdt00Z/view?usp=sharing" },
  ];

  return (
    <ModalBackdrop onClose={onClose} maxWidth={660}>
      {({ requestClose }) => (
        <>
          {/* Header */}
          <div
            className="modal-header"
            style={{
              flexShrink: 0,
              padding: "0.9rem 1.1rem 0.8rem",
              borderBottom: "1px solid var(--border)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: 10,
              background: "var(--modal-header-bg)",
            }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5, flexWrap: "wrap" }}>
                <span
                  style={{
                    fontSize: "0.58rem",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    padding: "3px 8px",
                    borderRadius: 5,
                    backgroundColor: "var(--accent-glow)",
                    color: "var(--accent)",
                    border: "1px solid var(--border-mid)",
                  }}
                >
                  {lang === "id" ? "D-IV | Sarjana Terapan" : "D-IV | Applied Bachelor"}
                </span>
                <span style={{ fontSize: "0.62rem", color: "var(--text-muted)" }}>2021 - 2025</span>
              </div>
              <h2 style={{ fontFamily: "var(--font-dm-serif)", fontSize: "1.1rem", fontWeight: 400, color: "var(--text-primary)", lineHeight: 1.25, marginBottom: 2 }}>{lang === "id" ? "Teknik Informatika" : "Informatics Engineering"}</h2>
              <p style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>Politeknik Negeri Lhokseumawe | Lhokseumawe, Aceh</p>
            </div>
            <CloseBtn onClose={requestClose} />
          </div>

          {/* Scrollable body */}
          <div className="modal-scroll-area" style={{ flex: 1, overflowY: "auto", padding: "1rem 1.1rem 2rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
            {/* Quick facts — 2Ã—2 on mobile, 4-col on sm+ */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 8 }} className="edu-facts">
              <style suppressHydrationWarning>{`@media(min-width:460px){.edu-facts{grid-template-columns:repeat(4,1fr)!important}}`}</style>
              {[
                { label: lang === "id" ? "Jenjang" : "Degree", value: "D-IV" },
                { label: lang === "id" ? "Durasi" : "Duration", value: lang === "id" ? "4 Tahun | 8 Semester" : "4 Years | 8 Semesters" },
                { label: lang === "id" ? "IPK" : "GPA", value: "3.15 / 4.00" },
                { label: lang === "id" ? "Status" : "Status", value: lang === "id" ? "Lulus '25" : "Graduated '25" },
              ].map(({ label, value }) => (
                <div key={label} style={{ padding: "9px 11px", borderRadius: 9, backgroundColor: "var(--bg-subtle)", border: "1px solid var(--border)", textAlign: "center" }}>
                  <p style={{ fontSize: "0.56rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)", opacity: 0.55, marginBottom: 3 }}>{label}</p>
                  <p style={{ fontSize: "0.72rem", fontWeight: 600, color: "var(--text-primary)", lineHeight: 1.3 }}>{value}</p>
                </div>
              ))}
            </div>

            {/* GPA bar */}
            <div style={{ padding: "12px 14px", borderRadius: 10, backgroundColor: "var(--bg-subtle)", border: "1px solid var(--border)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <span style={{ fontSize: "0.7rem", fontWeight: 500, color: "var(--text-secondary)" }}>{lang === "id" ? "Indeks Prestasi Kumulatif" : "Grade Point Average"}</span>
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--accent)" }}>
                  3.15 <span style={{ fontWeight: 400, color: "var(--text-muted)", fontSize: "0.65rem" }}>/ 4.00</span>
                </span>
              </div>
              <div style={{ height: 5, width: "100%", backgroundColor: "var(--border)", borderRadius: 99, overflow: "hidden" }}>
                <div style={{ height: "100%", width: "78.75%", borderRadius: 99, background: "linear-gradient(90deg, var(--accent), var(--accent))", opacity: 0.7 }} />
              </div>
              <p style={{ fontSize: "0.62rem", color: "var(--text-faint)", marginTop: 5 }}>
                {lang === "id"
                  ? "D-IV adalah jenjang sarjana terapan di Indonesia yang setara dengan S1 (B.Sc.) pada jalur rekayasa praktis."
                  : "D-IV is Indonesia's applied bachelor-level degree, equivalent to S1 (B.Sc.) in the practical engineering track."}
              </p>
            </div>

            {/* About + Coursework — stacked mobile, 2-col sm+ */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 14 }} className="edu-split">
              <style suppressHydrationWarning>{`@media(min-width:500px){.edu-split{grid-template-columns:1fr 1.3fr!important}}`}</style>
              <div>
                <p style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", opacity: 0.6, marginBottom: 8 }}>{t("about")}</p>
                <p style={{ fontSize: "0.81rem", lineHeight: 1.8, color: "var(--text-secondary)" }}>
                  {lang === "id"
                    ? "Menempuh program sarjana terapan selama 4 tahun di Teknik Informatika dengan fokus pada pengembangan sistem web, pemrosesan data, dan rekayasa perangkat lunak. Menggabungkan fondasi teori yang kuat dengan proyek-proyek berorientasi industri dan magang wajib."
                    : "Completed a 4-year applied bachelor program in Informatics Engineering with a focus on web systems development, data processing, and software engineering. Combines strong theoretical foundations with industry-oriented practical projects and a mandatory industry internship."}
                </p>
                <div style={{ marginTop: 12, padding: "10px 12px", borderRadius: 9, backgroundColor: "var(--bg-subtle)", border: "1px solid var(--border-mid)" }}>
                  <p style={{ fontSize: "0.57rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)", opacity: 0.55, marginBottom: 4 }}>{t("finalProject")}</p>
                  <p style={{ fontSize: "0.76rem", fontWeight: 500, color: "var(--text-primary)", lineHeight: 1.35, marginBottom: 3 }}>
                    {lang === "id" ? "Analisis Sentimen terhadap Kinerja Kejaksaan Agung" : "Sentiment Analysis of the Attorney General's Office Performance"}
                  </p>
                  <p style={{ fontSize: "0.67rem", color: "var(--text-muted)", lineHeight: 1.5 }}>
                    {lang === "id" ? "Scraping komentar TikTok · Klasifikasi ML · Dashboard Laravel-Flask" : "TikTok comment scraping · ML classification · Laravel-Flask dashboard"}
                  </p>
                </div>
              </div>
              <div>
                <p style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", opacity: 0.6, marginBottom: 8 }}>{t("relevantCoursework")}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {coursework.map((cat) => (
                    <div key={cat.label}>
                      <p style={{ fontSize: "0.57rem", fontWeight: 700, letterSpacing: "0.09em", textTransform: "uppercase", color: cat.color, opacity: 0.7, marginBottom: 5 }}>{cat.label}</p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                        {cat.courses.map((course) => (
                          <span key={course} style={{ fontSize: "0.67rem", padding: "2px 9px", borderRadius: 5, backgroundColor: "var(--bg-subtle)", border: "1px solid var(--border)", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Academic Documents — 1-col mobile, 3-col sm+ */}
            <div>
              <p style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", opacity: 0.6, marginBottom: 10 }}>{t("academicDocuments")}</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 8 }} className="edu-docs">
                <style suppressHydrationWarning>{`@media(min-width:380px){.edu-docs{grid-template-columns:repeat(3,1fr)!important}}`}</style>
                {documents.map((doc) => (
                  <a
                    key={doc.label}
                    href={doc.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                      gap: 7,
                      padding: "14px 10px",
                      borderRadius: 11,
                      backgroundColor: "var(--bg-subtle)",
                      border: "1px solid var(--border)",
                      textDecoration: "none",
                      transition: "all 0.18s ease",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLAnchorElement;
                      el.style.borderColor = "var(--border-strong)";
                      el.style.backgroundColor = "var(--bg-card)";
                      el.style.boxShadow = "var(--shadow-md)";
                      el.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLAnchorElement;
                      el.style.borderColor = "var(--border)";
                      el.style.backgroundColor = "var(--bg-subtle)";
                      el.style.boxShadow = "none";
                      el.style.transform = "translateY(0)";
                    }}
                  >
                    <span style={{ fontSize: "1.4rem" }}>{doc.icon}</span>
                    <div>
                      <p style={{ fontSize: "0.73rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: 2 }}>{doc.label}</p>
                      <p style={{ fontSize: "0.62rem", color: "var(--text-muted)", lineHeight: 1.4 }}>{doc.desc}</p>
                    </div>
                    <span style={{ fontSize: "0.6rem", color: "var(--accent)", opacity: 0.7 }}>{t("open")}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </ModalBackdrop>
  );
}

export default function HomePage() {
  const { lang } = useLanguage();
  const t = (key: string, ...params: any[]) => translate(lang, key, ...params);
  const L = (loc: Localized): string => (lang === "id" ? loc.id : loc.en);
  const heroRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const additionalWheelRef = useRef({ delta: 0, locked: false });

  interface Rects {
    heading: BRect | null;
    body: BRect | null;
    photo: BRect | null;
  }
  const [rects, setRects] = useState<Rects>({ heading: null, body: null, photo: null });
  const [fromRect, setFromRect] = useState<BRect | null>(null);
  const [phase, setPhase] = useState<"idle" | "zoom-in" | "hold" | "zoom-out" | "done">("idle");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeAdditionalProject, setActiveAdditionalProject] = useState(0);
  const [showInternModal, setShowInternModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showDigitalMarketingModal, setShowDigitalMarketingModal] = useState(false);
  const [showEducationModal, setShowEducationModal] = useState(false);

  const ZOOM_W = 258;
  const ZOOM_H = 338;

  const moveAdditionalProject = (direction: -1 | 1) => {
    setActiveAdditionalProject((current) => (current + direction + additionalProjects.length) % additionalProjects.length);
  };

  const handleAdditionalProjectWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (additionalProjects.length <= 1) return;

    const horizontalDelta = event.deltaX;
    const verticalDelta = event.deltaY;
    const isHorizontalGesture = Math.abs(horizontalDelta) > Math.abs(verticalDelta) * 1.25;

    if (!isHorizontalGesture || Math.abs(horizontalDelta) < 4) {
      additionalWheelRef.current.delta = 0;
      return;
    }

    event.preventDefault();

    if (additionalWheelRef.current.locked) return;

    additionalWheelRef.current.delta += horizontalDelta;
    if (Math.abs(additionalWheelRef.current.delta) < 42) return;

    moveAdditionalProject(additionalWheelRef.current.delta > 0 ? 1 : -1);
    additionalWheelRef.current.delta = 0;
    additionalWheelRef.current.locked = true;

    window.setTimeout(() => {
      additionalWheelRef.current.locked = false;
    }, 360);
  };

  const getAdditionalProjectSlot = (index: number) => {
    const offset = (index - activeAdditionalProject + additionalProjects.length) % additionalProjects.length;
    if (offset === 0) return "center";
    if (offset === 1) return "right";
    return "left";
  };

  const additionalProjectCardStyle = (slot: string, index: number): CSSProperties => {
    const base: CSSProperties = {
      backgroundColor: "var(--bg-card)",
      border: "1px solid var(--border)",
      borderRadius: "1rem",
      padding: "1.4rem 1.5rem",
      cursor: "pointer",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      minHeight: 260,
      transition: "transform .45s cubic-bezier(.22,1,.36,1), opacity .35s ease, border-color .25s ease, box-shadow .25s ease",
      animationDelay: `${index * 100}ms`,
    };

    if (slot === "center") {
      return {
        ...base,
        left: "50%",
        zIndex: 3,
        opacity: 1,
        transform: "translateX(-50%) translateY(0) scale(1)",
        borderColor: "var(--border-mid)",
        boxShadow: "var(--shadow-lg)",
      };
    }

    if (slot === "right") {
      return {
        ...base,
        left: "69%",
        zIndex: 2,
        opacity: 0.86,
        transform: "translate3d(-50%, 20px, -120px) rotateY(-18deg) scale(.88)",
      };
    }

    return {
      ...base,
      left: "31%",
      zIndex: 1,
      opacity: 0.86,
      transform: "translate3d(-50%, 20px, -120px) rotateY(18deg) scale(.88)",
    };
  };

  const renderAdditionalProjectCard = (project: Project, index: number, className = "proj-card bento-reveal", style?: CSSProperties) => (
    <div
      key={`additional-${index}-${project.title.en}`}
      onClick={() => setSelectedProject(project)}
      className={className}
      style={{
        backgroundColor: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: "1rem",
        padding: "1.4rem 1.5rem",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: 260,
        transition: "transform .25s ease, border-color .25s ease",
        animationDelay: `${index * 100}ms`,
        ...style,
      }}
    >
      <div className="proj-card-main">
        <div
          className="proj-card-meta"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 12,
            flexWrap: "wrap",
            gap: 6,
          }}
        >
          <div className="proj-card-badges" style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <TagBadge>{L(project.tag) as string}</TagBadge>
            <span
              style={{
                fontSize: ".57rem",
                fontWeight: 700,
                letterSpacing: ".12em",
                textTransform: "uppercase",
                color: "var(--accent)",
                opacity: 0.4,
              }}
            >
              {t("additional")}
            </span>
          </div>

          <span style={{ fontSize: ".65rem", color: "var(--text-muted)" }}>{L(project.period) as string}</span>
        </div>

        <h3
          className="proj-card-title"
          style={{
            fontFamily: "var(--font-dm-serif)",
            fontSize: "clamp(1rem,3vw,1.25rem)",
            fontWeight: 400,
            color: "var(--text-primary)",
            lineHeight: 1.25,
            marginBottom: 10,
          }}
        >
          {L(project.title) as string}
        </h3>

        <p
          className="proj-card-desc"
          style={{
            fontSize: ".82rem",
            lineHeight: 1.78,
            color: "var(--text-secondary)",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {L(project.desc) as string}
        </p>
      </div>

      <div className="proj-card-footer" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 18, gap: 10 }}>
        <div className="proj-card-stack" style={{ display: "flex", flexWrap: "wrap", gap: 5, flex: 1, minWidth: 0 }}>
          {project.stack.slice(0, 5).map((tech) => (
            <StackChip key={tech}>{tech}</StackChip>
          ))}

          {project.stack.length > 5 && (
            <span
              style={{
                fontSize: "0.68rem",
                fontWeight: 600,
                padding: "3px 10px",
                borderRadius: 6,
                backgroundColor: "var(--accent-glow)",
                border: "1px solid var(--border-mid)",
                color: "var(--accent)",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              +{project.stack.length - 5}
            </span>
          )}
        </div>

        <ProjectCardCta />
      </div>
    </div>
  );

  const calcRects = useCallback(() => {
    if (!heroRef.current) return;
    const base = heroRef.current.getBoundingClientRect();
    const rel = (el: HTMLElement | null): BRect | null => {
      if (!el) return null;
      const b = el.getBoundingClientRect();
      return { top: b.top - base.top, left: b.left - base.left, width: b.width, height: b.height };
    };
    setRects({ heading: rel(headingRef.current), body: rel(bodyRef.current), photo: rel(photoRef.current) });
  }, []);

  useEffect(() => {
    const init = setTimeout(() => {
      calcRects();
      if (!photoRef.current) return;
      const r = photoRef.current.getBoundingClientRect();
      setFromRect({ top: r.top, left: r.left, width: r.width, height: r.height });
      photoRef.current.style.opacity = "0";
      photoRef.current.style.transition = "opacity 0.5s ease";

      const t1 = setTimeout(() => setPhase("zoom-in"), 80);
      const t2 = setTimeout(() => setPhase("hold"), 950);
      const t3 = setTimeout(() => setPhase("zoom-out"), 2200);
      const t4 = setTimeout(() => {
        setPhase("done");
        if (photoRef.current) photoRef.current.style.opacity = "1";
      }, 3100);
      return () => [t1, t2, t3, t4].forEach(clearTimeout);
    }, 200);

    window.addEventListener("resize", calcRects);
    return () => {
      clearTimeout(init);
      window.removeEventListener("resize", calcRects);
    };
  }, [calcRects]);

  const isCenter = phase === "zoom-in" || phase === "hold";
  const linesDrawn = phase === "hold" || phase === "zoom-out" || phase === "done";
  const isDone = phase === "done";
  const showClone = !isDone && phase !== "idle" && !!fromRect;
  const toRect = typeof window !== "undefined" ? { top: window.innerHeight / 2 - ZOOM_H / 2, left: window.innerWidth / 2 - ZOOM_W / 2, width: ZOOM_W, height: ZOOM_H } : fromRect;
  const cloneRect = isCenter ? toRect : fromRect;

  return (
    <>
      {/* ──── INTERN MODAL ────────────────────────────────────────────────────────────────────────────────────────────────────── */}
      {showInternModal && <InternModal onClose={() => setShowInternModal(false)} />}
      {showEventModal && <EventModal onClose={() => setShowEventModal(false)} />}
      {showDigitalMarketingModal && <DigitalMarketingModal onClose={() => setShowDigitalMarketingModal(false)} />}
      {showEducationModal && <EducationModal onClose={() => setShowEducationModal(false)} />}

      {/* ──── PROJECT MODAL ──────────────────────────────────────────────────────────────────────────────────────────────────── */}
      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}

      {/* ──── BACKDROP ────────────────────────────────────────────────────────────────────────────────────────────────────────────── */}
      {showClone && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9990,
            pointerEvents: "none",
            backgroundColor: "rgba(0,0,0,0.78)",
            backdropFilter: isCenter ? "blur(10px) saturate(0.6)" : "none",
            WebkitBackdropFilter: isCenter ? "blur(10px) saturate(0.6)" : "none",
            opacity: isCenter ? 1 : 0,
            transition: "opacity 0.65s ease",
          }}
        />
      )}

      {/* ──── PHOTO CLONE ──────────────────────────────────────────────────────────────────────────────────────────────────────── */}
      {showClone && cloneRect && (
        <div
          style={{
            position: "fixed",
            zIndex: 9999,
            pointerEvents: "none",
            top: cloneRect.top,
            left: cloneRect.left,
            width: cloneRect.width,
            height: cloneRect.height,
            borderRadius: isCenter ? "1.5rem" : "1.25rem",
            overflow: "hidden",
            border: `1px solid ${isCenter ? "rgba(255,255,255,0.12)" : "var(--border)"}`,
            boxShadow: isCenter ? "0 64px 160px rgba(0,0,0,0.65), 0 20px 50px rgba(0,0,0,0.35)" : "0 4px 16px rgba(0,0,0,0.1)",
            transition: [
              "top           0.92s cubic-bezier(0.34,1.06,0.64,1)",
              "left          0.92s cubic-bezier(0.34,1.06,0.64,1)",
              "width         0.92s cubic-bezier(0.34,1.06,0.64,1)",
              "height        0.92s cubic-bezier(0.34,1.06,0.64,1)",
              "border-radius 0.6s ease",
              "box-shadow    0.6s ease",
            ].join(", "),
          }}
        >
          <NextImage src="/furqan-image/Furqan.jpg" alt="Furqan" fill priority style={{ objectFit: "cover", objectPosition: "center 8%", transform: "scale(1.05)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 45%, rgba(0,0,0,0.5) 100%)" }} />
          {/* Name tag */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              padding: "1.5rem 1.25rem 1.25rem",
              opacity: phase === "hold" ? 1 : 0,
              transform: phase === "hold" ? "translateY(0)" : "translateY(8px)",
              transition: "opacity 0.5s ease 0.2s, transform 0.5s ease 0.2s",
            }}
          >
            <p style={{ fontSize: "0.55rem", fontWeight: 700, letterSpacing: "0.26em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginBottom: 4 }}>{t("webDeveloper")}</p>
            <p style={{ fontFamily: "var(--font-dm-serif)", fontSize: "1.3rem", color: "rgba(255,255,255,0.92)", fontWeight: 400 }}>Furqan</p>
          </div>
        </div>
      )}

      {/* ──── PAGE SHELL ────────────────────────────────────────────────────────────────────────────────────────────────────────── */}
      <div className="page-container page-enter max-w-5xl mx-auto px-5 sm:px-8 pb-32" style={{ display: "flex", flexDirection: "column", gap: "6.5rem" }}>
        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            HERO
        â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <section ref={heroRef} className="hero-section" style={{ minHeight: "90vh", display: "flex", flexDirection: "column", justifyContent: "center", position: "relative" }}>
          {/* SVG corner bracket overlay */}
          {(rects.heading || rects.body || rects.photo) && (
            <svg aria-hidden style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible", pointerEvents: "none", zIndex: 1 }}>
              {rects.heading && <CornerBrackets rect={rects.heading} pad={16} cl={22} drawn={linesDrawn} delay={0} />}
              {rects.body && <CornerBrackets rect={rects.body} pad={16} cl={20} drawn={linesDrawn} delay={0.3} />}
              {rects.photo && <CornerBrackets rect={rects.photo} pad={24} cl={28} drawn={linesDrawn} delay={0.6} />}
            </svg>
          )}

          <div className="flex flex-col-reverse sm:flex-row items-center sm:items-start gap-10 sm:gap-16" style={{ position: "relative", zIndex: 2 }}>
            {/* LEFT — text */}
            <div
              style={{
                flex: 1,
                minWidth: 0,
              }}
            >
              {/* Status */}
              {/* <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 7,
                  padding: "5px 13px",
                  borderRadius: 999,
                  marginBottom: "2rem",
                  fontSize: "0.71rem",
                  fontWeight: 500,
                  backgroundColor: "var(--status-bg)",
                  color: "var(--status-color)",
                  border: "1px solid var(--status-color)",
                  opacity: 0.85,
                }}
              >
                <span style={{ position: "relative", display: "inline-flex", width: 7, height: 7 }}>
                  <span style={{ position: "absolute", inset: 0, borderRadius: "50%", backgroundColor: "var(--status-color)", opacity: 0.5, animation: "ping 1.5s cubic-bezier(0,0,0.2,1) infinite" }} />
                  <span style={{ position: "relative", width: 7, height: 7, borderRadius: "50%", backgroundColor: "var(--status-color)" }} />
                </span>
                {t("availableForWork")}
              </div> */}

              {/* BRACKET 1 — heading */}
              <br />
              <div ref={headingRef}>
                <h1
                  style={{
                    fontFamily: "var(--font-dm-serif)",
                    fontSize: "clamp(2.9rem, 9vw, 5.6rem)",
                    lineHeight: 0.97,
                    fontWeight: 400,
                    color: "var(--text-primary)",
                    marginBottom: "0.7rem",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {t("hiIm")}
                  <br />
                  <em style={{ color: "var(--accent)", fontStyle: "italic" }}>Furqan.</em>
                </h1>
                <div style={{ fontSize: "1rem", fontWeight: 300, height: 28, color: "var(--text-secondary)" }}>
                  <TypedText />
                </div>
              </div>

              <div style={{ height: "2.25rem" }} />

              {/* BRACKET 2 — body */}
              <div ref={bodyRef}>
                <p style={{ maxWidth: 410, lineHeight: 1.82, fontSize: "0.88rem", color: "var(--text-secondary)", marginBottom: "1.4rem" }}>{t("heroDescription")}</p>

                <div className="hero-contact-chips" style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: "1.4rem" }}>
                  {[
                    { icon: "✉", label: "furqansykss@gmail.com", href: "mailto:furqansykss@gmail.com" },
                    { icon: "↗", label: "LinkedIn", href: "https://linkedin.com/in/fur-qan-6b1b87242" },
                    { icon: "↗", label: "Instagram", href: "https://www.instagram.com/frqann?igsh=MTA1ejJ3amhhZTV5cA==" },
                    { icon: "↗", label: "GitHub", href: "https://github.com/Furqan-sykss" },
                    { icon: "◎", label: "Lhokseumawe, Aceh", href: null },
                  ].map((c) => {
                    const base: React.CSSProperties = {
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "5px 11px",
                      borderRadius: 8,
                      fontSize: "0.71rem",
                      fontWeight: 500,
                      backgroundColor: "var(--bg-card)",
                      border: "1px solid var(--border)",
                      color: "var(--text-muted)",
                      textDecoration: "none",
                      transition: "all 0.2s ease",
                    };

                    if (c.label === "Instagram") {
                      return <InstagramChip key="instagram" base={base} />;
                    }

                    return c.href ? (
                      <a
                        key={c.label}
                        href={c.href}
                        target={c.href.startsWith("http") ? "_blank" : undefined}
                        rel="noopener"
                        style={base}
                        className="lnk"
                        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--border-strong)")}
                        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--border)")}
                      >
                        <span style={{ opacity: 0.38, fontSize: "0.75rem" }}>{c.icon}</span>
                        {c.label}
                      </a>
                    ) : (
                      <span key={c.label} style={base}>
                        <span style={{ opacity: 0.38, fontSize: "0.75rem" }}>{c.icon}</span>
                        {c.label}
                      </span>
                    );
                  })}
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                  <a
                    href="#"
                    className="btn-p"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    style={{
                      display: "inline-block",
                      padding: "10px 22px",
                      borderRadius: 10,
                      fontSize: "0.84rem",
                      fontWeight: 600,
                      backgroundColor: "var(--accent)",
                      color: "var(--bg)",
                      textDecoration: "none",
                    }}
                  >
                    {t("viewProjects")}
                  </a>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="btn-o"
                    style={{
                      display: "inline-block",
                      padding: "10px 22px",
                      borderRadius: 10,
                      fontSize: "0.84rem",
                      fontWeight: 600,
                      border: "1px solid var(--border-mid)",
                      color: "var(--text-secondary)",
                      textDecoration: "none",
                      backgroundColor: "transparent",
                    }}
                  >
                    {t("getInTouch")}
                  </a>
                </div>
              </div>
            </div>

            {/* RIGHT — photo */}
            <div style={{ flexShrink: 0 }}>
              <div style={{ position: "relative", width: 204, height: 264 }} className="hero-portrait-group sm:w-[218px] sm:h-[284px]">
                {/* glow */}
                <div style={{ position: "absolute", inset: -18, borderRadius: "2rem", background: "radial-gradient(circle, var(--accent-glow), transparent 65%)", filter: "blur(26px)", opacity: 0.85 }} />
                {/* photo wrapper — bracket 3 ref */}
                <div
                  ref={photoRef}
                  className="hero-photo"
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    borderRadius: "1.25rem",
                    overflow: "hidden",
                    border: "1px solid var(--border-mid)",
                    boxShadow: "var(--shadow-lg)",
                    transition: "opacity 0.5s ease",
                  }}
                >
                  <NextImage src="/furqan-image/Furqan.jpg" alt="Furqan" fill priority style={{ objectFit: "cover", objectPosition: "center 8%", transform: "scale(1.06)" }} />
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "38%", background: "linear-gradient(to top, rgba(0,0,0,0.18), transparent)", pointerEvents: "none" }} />
                </div>
                {/* Badge — 3+ */}
                <div
                  style={{
                    position: "absolute",
                    bottom: -14,
                    right: -14,
                    padding: "9px 13px",
                    borderRadius: 14,
                    textAlign: "center",
                    backgroundColor: "var(--bg-card)",
                    border: "1px solid var(--border)",
                    boxShadow: "var(--shadow-md)",
                  }}
                >
                  <div style={{ fontFamily: "var(--font-dm-serif)", fontSize: "1.35rem", lineHeight: 1, color: "var(--accent)" }}>4+</div>
                  <div style={{ fontSize: "0.52rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", marginTop: 2 }}>yrs exp</div>
                </div>
                {/* Badge — open */}
                <div
                  style={{
                    position: "absolute",
                    top: -14,
                    left: -14,
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "7px 11px",
                    borderRadius: 12,
                    backgroundColor: "var(--bg-card)",
                    border: "1px solid var(--border)",
                    boxShadow: "var(--shadow-md)",
                  }}
                >
                  <span style={{ position: "relative", display: "inline-flex", width: 6, height: 6 }}>
                    <span style={{ position: "absolute", inset: 0, borderRadius: "50%", backgroundColor: "var(--status-color)", opacity: 0.5, animation: "ping 1.5s cubic-bezier(0,0,0.2,1) infinite" }} />
                    <span style={{ position: "relative", width: 6, height: 6, borderRadius: "50%", backgroundColor: "var(--status-color)" }} />
                  </span>
                  <span style={{ fontSize: "0.6rem", fontWeight: 600, color: "var(--text-secondary)" }}>Open to work</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Divider />

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            STATS — seamless connected grid, no individual cards
        â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <FadeUp>
          <div
            className="stats-bento"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gridTemplateRows: "auto auto",
              gap: 10,
            }}
          >
            {/* [1] Projects Built */}
            <div
              className="bento-reveal"
              style={{
                gridColumn: "1 / 2",
                gridRow: "1 / 2",
                backgroundColor: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: "1rem",
                padding: "1.75rem 1.5rem",
                textAlign: "center",
                animationDelay: "0ms",
              }}
            >
              <Counter target={projects.length + additionalProjects.length} label={t("projectsBuilt")} />
              <p style={{ fontSize: "0.58rem", color: "var(--text-faint)", marginTop: 5, letterSpacing: "0.05em" }}>{t("acrossIndustries")}</p>
            </div>

            {/* [2] Years Learning */}
            <div
              className="bento-reveal"
              style={{
                gridColumn: "2 / 3",
                gridRow: "1 / 2",
                backgroundColor: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: "1rem",
                padding: "1.75rem 1.5rem",
                textAlign: "center",
                animationDelay: "80ms",
              }}
            >
              <Counter target={3} label={t("yearsLearning")} />
              <p style={{ fontSize: "0.58rem", color: "var(--text-faint)", marginTop: 5, letterSpacing: "0.05em" }}>{t("continuousGrowth")}</p>
            </div>

            {/* [3] Certifications — spans 2 rows (tall card on the right) */}
            <div
              className="bento-reveal"
              style={{
                gridColumn: "3 / 4",
                gridRow: "1 / 3",
                backgroundColor: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: "1rem",
                padding: "2rem 1.5rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                animationDelay: "160ms",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Decorative glow */}
              <div
                style={{
                  position: "absolute",
                  top: -30,
                  right: -30,
                  width: 100,
                  height: 100,
                  borderRadius: "50%",
                  background: "radial-gradient(circle, var(--accent-glow), transparent 70%)",
                  opacity: 0.8,
                  pointerEvents: "none",
                }}
              />
              <div style={{ position: "relative" }}>
                <Counter target={certifications.length} label={t("certifications")} />
                <p style={{ fontSize: "0.58rem", color: "var(--text-faint)", marginTop: 5, letterSpacing: "0.05em" }}>{t("verifiedSkills")}</p>
              </div>
            </div>

            {/* [4] Internships + [5] Jobs — side by side on bottom-left 2 cols */}
            <div
              className="bento-reveal"
              style={{
                gridColumn: "1 / 2",
                gridRow: "2 / 3",
                backgroundColor: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: "1rem",
                padding: "1.5rem",
                textAlign: "center",
                animationDelay: "240ms",
              }}
            >
              <Counter target={1} label={t("Internship")} />
              <p style={{ fontSize: "0.58rem", color: "var(--text-faint)", marginTop: 5, letterSpacing: "0.05em" }}>{t("IndustryExposure")}</p>
            </div>

            <div
              className="bento-reveal"
              style={{
                gridColumn: "2 / 3",
                gridRow: "2 / 3",
                backgroundColor: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: "1rem",
                padding: "1.5rem",
                textAlign: "center",
                animationDelay: "320ms",
              }}
            >
              <Counter target={1} label={t("Jobs")} />
              <p style={{ fontSize: "0.58rem", color: "var(--text-faint)", marginTop: 5, letterSpacing: "0.05em" }}>{t("IndustryExposure")}</p>
            </div>
          </div>
        </FadeUp>

        <Divider />

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            SKILLS — asymmetric 2-row layout
            Row 1: Languages (5fr) | Frameworks (7fr)
            Row 2: Frontend (4fr)  | Tools (8fr)
        â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <FadeUp>
          <section id="skills">
            <SectionHeader eyebrow={t("capabilities")} title={t("techStack")} />
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ display: "grid", gap: 10 }} className="sm:grid-cols-[5fr_7fr] grid-cols-1">
                {skills.slice(0, 2).map((g, i) => (
                  <FadeUp key={`skill-${i}-${g.category.en}`} delay={i * 65}>
                    <SkillCard group={g} />
                  </FadeUp>
                ))}
              </div>
              <div style={{ display: "grid", gap: 10 }} className="skills-bottom-grid sm:grid-cols-[4fr_8fr] grid-cols-1">
                {skills.slice(2).map((g, i) => (
                  <FadeUp key={`skill-${i + 2}-${g.category.en}`} delay={(i + 2) * 65}>
                    <SkillCard group={g} />
                  </FadeUp>
                ))}
              </div>
            </div>
          </section>
        </FadeUp>
        <Divider />

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            EXPERIENCE — timeline with ring nodes
        â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <FadeUp>
          <section id="experience">
            <SectionHeader eyebrow={t("career")} title={t("experience")} />
            <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 0 }}>
              {/* Vertical connector line */}
              <div style={{ position: "absolute", top: 20, bottom: 20, left: 10, width: 1, backgroundColor: "var(--border)" }} />
              {[2, 0, 1].map((sourceIndex, i) => {
                const e = experience[sourceIndex];
                const openDetails = sourceIndex === 0 ? () => setShowEventModal(true) : sourceIndex === 1 ? () => setShowInternModal(true) : sourceIndex === 2 ? () => setShowDigitalMarketingModal(true) : undefined;

                return (
                  <FadeUp key={sourceIndex} delay={i * 100}>
                    <div style={{ display: "flex", gap: 22, paddingBottom: i < experience.length - 1 ? "0.85rem" : 0 }}>
                      {/* Ring node */}
                      <div style={{ flexShrink: 0, paddingTop: 4, zIndex: 1 }}>
                        <div
                          style={{
                            width: 20,
                            height: 20,
                            borderRadius: "50%",
                            backgroundColor: "var(--bg-card)",
                            border: `2px solid var(--accent)`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: "0 0 0 4px var(--bg)",
                          }}
                        >
                          <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "var(--accent)" }} />
                        </div>
                      </div>
                      {/* Card — detailed experience entries are clickable */}
                      <div
                        className="exp-card"
                        onClick={openDetails}
                        style={{
                          flex: 1,
                          padding: "1.1rem 1.25rem",
                          borderRadius: "1rem",
                          backgroundColor: "var(--bg-card)",
                          border: "1px solid var(--border)",
                          marginBottom: i < experience.length - 1 ? "0.5rem" : 0,
                          cursor: openDetails ? "pointer" : "default",
                          transition: "border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                          if (!openDetails) return;
                          const el = e.currentTarget as HTMLElement;
                          el.style.borderColor = "var(--border-strong)";
                          el.style.boxShadow = "var(--shadow-md)";
                          el.style.transform = "translateY(-2px)";
                        }}
                        onMouseLeave={(e) => {
                          if (!openDetails) return;
                          const el = e.currentTarget as HTMLElement;
                          el.style.borderColor = "var(--border)";
                          el.style.boxShadow = "none";
                          el.style.transform = "translateY(0)";
                        }}
                      >
                        {/* Top row: role title + View Details */}
                        <div className="exp-card-heading" style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8, marginBottom: 8 }}>
                          <div className="exp-card-heading-main" style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 8, minWidth: 0 }}>
                            <div className="exp-card-kicker">
                              <TagBadge className={sourceIndex === 2 ? "exp-card-training-tag" : undefined}>{L(e.tag)}</TagBadge>
                              <span className="exp-card-period-inline">{L(e.period)}</span>
                            </div>
                            <h3 style={{ fontSize: "0.87rem", fontWeight: 600, color: "var(--text-primary)", lineHeight: 1.35 }}>{L(e.role)}</h3>
                          </div>
                          {openDetails && (
                            <span
                              style={{
                                flexShrink: 0,
                                fontSize: "0.62rem",
                                fontWeight: 600,
                                letterSpacing: "0.08em",
                                color: "var(--accent)",
                                opacity: 0.75,
                                display: "flex",
                                alignItems: "center",
                                gap: 4,
                                paddingTop: 2,
                              }}
                            >
                              {t("viewDetails")}
                              <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                                <path d="M1.5 8.5L8.5 1.5M8.5 1.5H3.5M8.5 1.5V6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </span>
                          )}
                        </div>
                        <p className="exp-card-company" style={{ fontSize: "0.72rem", fontWeight: 500, color: "var(--accent)", opacity: 0.75, marginBottom: 8 }}>
                          {L(e.company)}
                        </p>
                        <p
                          style={{
                            fontSize: "0.82rem",
                            lineHeight: 1.74,
                            color: "var(--text-secondary)",
                            display: "-webkit-box",
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {L(e.desc)}
                        </p>
                      </div>
                    </div>
                  </FadeUp>
                );
              })}
            </div>
          </section>
        </FadeUp>

        <Divider />

        <FadeUp>
          <section id="projects">
            <SectionHeader eyebrow={t("portfolio")} title={t("projects")} />

            {/* The grid parent — cards go directly here, no FadeUp wrappers */}
            <div
              className="bento-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 10,
              }}
            >
              {/* ──── [0] FEATURED — col 1+2 ──────────────────────────────────────────────────────────────────── */}
              <div
                className="proj-card proj-card-featured bento-reveal"
                onClick={() => setSelectedProject(projects[0])}
                style={{
                  gridColumn: "1 / 3",
                  backgroundColor: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderRadius: "1rem",
                  padding: "1.4rem 1.5rem",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  minHeight: 220,
                  animationDelay: "0ms",
                }}
              >
                <div className="proj-card-main">
                  <div className="proj-card-meta" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, flexWrap: "wrap", gap: 6 }}>
                    <div className="proj-card-badges" style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <TagBadge>{L(projects[0].tag)}</TagBadge>
                      <span className="proj-card-label" style={{ fontSize: "0.57rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", opacity: 0.4 }}>
                        {t("latest")}
                      </span>
                    </div>
                    <span className="proj-card-period" style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>
                      {L(projects[0].period)}
                    </span>
                  </div>
                  <h3
                    className="proj-card-title"
                    style={{
                      fontFamily: "var(--font-dm-serif)",
                      fontSize: "clamp(1rem, 3.5vw, 1.25rem)",
                      fontWeight: 400,
                      color: "var(--text-primary)",
                      marginBottom: 10,
                      lineHeight: 1.25,
                    }}
                  >
                    {L(projects[0].title)}
                  </h3>
                  <p
                    className="proj-card-desc"
                    style={{
                      fontSize: "0.82rem",
                      lineHeight: 1.78,
                      color: "var(--text-secondary)",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {L(projects[0].desc)}
                  </p>
                </div>
                {/* Stack chips — max 5, then "+N more" chip */}
                <div className="proj-card-footer" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 16, gap: 10 }}>
                  <div className="proj-card-stack" style={{ display: "flex", flexWrap: "wrap", gap: 5, flex: 1, minWidth: 0 }}>
                    {projects[0].stack.slice(0, 5).map((s) => (
                      <StackChip key={s}>{s}</StackChip>
                    ))}
                    {projects[0].stack.length > 5 && (
                      <span
                        style={{
                          fontSize: "0.68rem",
                          fontWeight: 600,
                          padding: "3px 10px",
                          borderRadius: 6,
                          backgroundColor: "var(--accent-glow)",
                          border: "1px solid var(--border-mid)",
                          color: "var(--accent)",
                          cursor: "pointer",
                          whiteSpace: "nowrap",
                        }}
                      >
                        +{projects[0].stack.length - 5}
                      </span>
                    )}
                  </div>
                  <ProjectCardCta />
                </div>
              </div>

              {/* ──── [1] col 3, row 1 ──────────────────────────────────────────────────────────────────────────────── */}
              <div
                onClick={() => setSelectedProject(projects[1])}
                className="proj-card bento-reveal"
                style={{
                  gridColumn: "3 / 4",
                  backgroundColor: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderRadius: "1rem",
                  padding: "1.4rem",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  animationDelay: "65ms",
                }}
              >
                <div className="proj-card-main">
                  <div className="proj-card-meta" style={{ marginBottom: 10 }}>
                    <TagBadge>{L(projects[1].tag)}</TagBadge>
                    <p className="proj-card-period" style={{ fontSize: "0.6rem", color: "var(--text-muted)", marginTop: 6 }}>
                      {L(projects[1].period)}
                    </p>
                  </div>
                  <h3 className="proj-card-title" style={{ fontFamily: "var(--font-dm-serif)", fontSize: "0.88rem", fontWeight: 400, color: "var(--text-primary)", marginBottom: 8, lineHeight: 1.35 }}>
                    {L(projects[1].title)}
                  </h3>
                  <p
                    className="proj-card-desc"
                    style={{
                      fontSize: "0.79rem",
                      lineHeight: 1.72,
                      color: "var(--text-secondary)",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {L(projects[1].desc)}
                  </p>
                </div>
                <div className="proj-card-footer" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 16, gap: 10 }}>
                  <div className="proj-card-stack" style={{ display: "flex", flexWrap: "wrap", gap: 5, flex: 1, minWidth: 0 }}>
                    {projects[1].stack.slice(0, 5).map((s) => (
                      <StackChip key={s}>{s}</StackChip>
                    ))}
                    {projects[1].stack.length > 5 && (
                      <span
                        style={{
                          fontSize: "0.68rem",
                          fontWeight: 600,
                          padding: "3px 10px",
                          borderRadius: 6,
                          backgroundColor: "var(--accent-glow)",
                          border: "1px solid var(--border-mid)",
                          color: "var(--accent)",
                          whiteSpace: "nowrap",
                        }}
                      >
                        +{projects[1].stack.length - 5}
                      </span>
                    )}
                  </div>
                  <ProjectCardCta />
                </div>
              </div>

              {/* ──── [2] col 1, row 2 ──────────────────────────────────────────────────────────────────────────────── */}
              <div
                onClick={() => setSelectedProject(projects[2])}
                className="proj-card bento-reveal"
                style={{
                  backgroundColor: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderRadius: "1rem",
                  padding: "1.3rem",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  animationDelay: "120ms",
                }}
              >
                <div className="proj-card-main">
                  <div className="proj-card-meta" style={{ marginBottom: 9 }}>
                    <div className="proj-card-badges" style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <TagBadge>{L(projects[2].tag)}</TagBadge>
                      <span className="proj-card-label" style={{ fontSize: "0.57rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", opacity: 0.4 }}>
                        {t("featured")}
                      </span>
                    </div>
                    <span className="proj-card-period" style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>
                      {L(projects[2].period)}
                    </span>
                  </div>
                  <h3 className="proj-card-title" style={{ fontFamily: "var(--font-dm-serif)", fontSize: "0.85rem", fontWeight: 400, color: "var(--text-primary)", marginBottom: 7, lineHeight: 1.35 }}>
                    {L(projects[2].title)}
                  </h3>
                  <p
                    className="proj-card-desc"
                    style={{
                      fontSize: "0.78rem",
                      lineHeight: 1.7,
                      color: "var(--text-secondary)",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {L(projects[2].desc)}
                  </p>
                </div>
                <div className="proj-card-footer" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 16, gap: 10 }}>
                  <div className="proj-card-stack" style={{ display: "flex", flexWrap: "wrap", gap: 5, flex: 1, minWidth: 0 }}>
                    {projects[2].stack.slice(0, 5).map((s) => (
                      <StackChip key={s}>{s}</StackChip>
                    ))}
                    {projects[2].stack.length > 5 && (
                      <span
                        style={{
                          fontSize: "0.68rem",
                          fontWeight: 600,
                          padding: "3px 10px",
                          borderRadius: 6,
                          backgroundColor: "var(--accent-glow)",
                          border: "1px solid var(--border-mid)",
                          color: "var(--accent)",
                          whiteSpace: "nowrap",
                        }}
                      >
                        +{projects[2].stack.length - 5}
                      </span>
                    )}
                  </div>
                  <ProjectCardCta />
                </div>
              </div>

              {/* ──── [3] col 2, row 2 ──────────────────────────────────────────────────────────────────────────────── */}
              <div
                onClick={() => setSelectedProject(projects[3])}
                className="proj-card bento-reveal"
                style={{
                  backgroundColor: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderRadius: "1rem",
                  padding: "1.3rem",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  animationDelay: "175ms",
                }}
              >
                <div className="proj-card-main">
                  <div className="proj-card-meta" style={{ marginBottom: 9 }}>
                    <TagBadge>{L(projects[3].tag)}</TagBadge>
                    <p className="proj-card-period" style={{ fontSize: "0.6rem", color: "var(--text-muted)", marginTop: 6 }}>
                      {L(projects[3].period)}
                    </p>
                  </div>
                  <h3 className="proj-card-title" style={{ fontFamily: "var(--font-dm-serif)", fontSize: "0.85rem", fontWeight: 400, color: "var(--text-primary)", marginBottom: 7, lineHeight: 1.35 }}>
                    {L(projects[3].title)}
                  </h3>
                  <p
                    className="proj-card-desc"
                    style={{
                      fontSize: "0.78rem",
                      lineHeight: 1.7,
                      color: "var(--text-secondary)",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {L(projects[3].desc)}
                  </p>
                </div>
                <div className="proj-card-footer" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 16, gap: 10 }}>
                  <div className="proj-card-stack" style={{ display: "flex", flexWrap: "wrap", gap: 5, flex: 1, minWidth: 0 }}>
                    {projects[3].stack.slice(0, 5).map((s) => (
                      <StackChip key={s}>{s}</StackChip>
                    ))}
                    {projects[3].stack.length > 5 && (
                      <span
                        style={{
                          fontSize: "0.68rem",
                          fontWeight: 600,
                          padding: "3px 10px",
                          borderRadius: 6,
                          backgroundColor: "var(--accent-glow)",
                          border: "1px solid var(--border-mid)",
                          color: "var(--accent)",
                          whiteSpace: "nowrap",
                        }}
                      >
                        +{projects[3].stack.length - 5}
                      </span>
                    )}
                  </div>
                  <ProjectCardCta />
                </div>
              </div>

              {/* ──── [4] col 3, row 2 ──────────────────────────────────────────────────────────────────────────────── */}
              <div
                onClick={() => setSelectedProject(projects[4])}
                className="proj-card bento-reveal"
                style={{
                  gridColumn: "3 / 4",
                  backgroundColor: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderRadius: "1rem",
                  padding: "1.3rem",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  animationDelay: "230ms",
                }}
              >
                <div className="proj-card-main">
                  <div className="proj-card-meta" style={{ marginBottom: 9 }}>
                    <TagBadge>{L(projects[4].tag)}</TagBadge>
                    <p className="proj-card-period" style={{ fontSize: "0.6rem", color: "var(--text-muted)", marginTop: 6 }}>
                      {L(projects[4].period)}
                    </p>
                  </div>
                  <h3 className="proj-card-title" style={{ fontFamily: "var(--font-dm-serif)", fontSize: "0.85rem", fontWeight: 400, color: "var(--text-primary)", marginBottom: 7, lineHeight: 1.35 }}>
                    {L(projects[4].title)}
                  </h3>
                  <p
                    className="proj-card-desc"
                    style={{
                      fontSize: "0.78rem",
                      lineHeight: 1.7,
                      color: "var(--text-secondary)",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {L(projects[4].desc)}
                  </p>
                </div>
                <div className="proj-card-footer" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 16, gap: 10 }}>
                  <div className="proj-card-stack" style={{ display: "flex", flexWrap: "wrap", gap: 5, flex: 1, minWidth: 0 }}>
                    {projects[4].stack.slice(0, 5).map((s) => (
                      <StackChip key={s}>{s}</StackChip>
                    ))}
                    {projects[4].stack.length > 5 && (
                      <span
                        style={{
                          fontSize: "0.68rem",
                          fontWeight: 600,
                          padding: "3px 10px",
                          borderRadius: 6,
                          backgroundColor: "var(--accent-glow)",
                          border: "1px solid var(--border-mid)",
                          color: "var(--accent)",
                          whiteSpace: "nowrap",
                        }}
                      >
                        +{projects[4].stack.length - 5}
                      </span>
                    )}
                  </div>
                  <ProjectCardCta />
                </div>
              </div>

              {/* ──── [5] LAST — full width, horizontal layout ──────────────────────────────── */}
              <div
                onClick={() => setSelectedProject(projects[5])}
                className="proj-card bento-reveal bento-last"
                style={{
                  gridColumn: "1 / 4",
                  backgroundColor: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderRadius: "1rem",
                  padding: "1.15rem 1.5rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 0,
                  animationDelay: "285ms",
                }}
              >
                {/* Meta block */}
                <div className="proj-card-meta" style={{ flexShrink: 0, paddingRight: "1.5rem" }}>
                  <TagBadge>{L(projects[5].tag)}</TagBadge>
                  <p className="proj-card-period" style={{ fontSize: "0.6rem", color: "var(--text-muted)", marginTop: 5 }}>
                    {L(projects[5].period)}
                  </p>
                </div>
                {/* Vertical separator */}
                <div className="bento-sep" style={{ width: 1, alignSelf: "stretch", backgroundColor: "var(--border)", flexShrink: 0, marginRight: "1.5rem" }} />
                {/* Title + desc */}
                <div className="proj-card-main" style={{ flex: 1, minWidth: 0, paddingRight: "1.5rem" }}>
                  <h3 className="proj-card-title" style={{ fontFamily: "var(--font-dm-serif)", fontSize: "0.87rem", fontWeight: 400, color: "var(--text-primary)", marginBottom: 3, lineHeight: 1.3 }}>
                    {L(projects[5].title)}
                  </h3>
                  <p
                    className="proj-card-desc"
                    style={{
                      fontSize: "0.77rem",
                      lineHeight: 1.6,
                      color: "var(--text-secondary)",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {L(projects[5].desc)}
                  </p>
                </div>
                {/* Stack */}
                <div className="proj-card-footer" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, flexShrink: 0 }}>
                  <div className="proj-card-stack" style={{ display: "flex", flexWrap: "wrap", gap: 5, flex: 1, minWidth: 0, justifyContent: "flex-end" }}>
                    {projects[5].stack.slice(0, 5).map((s) => (
                      <StackChip key={s}>{s}</StackChip>
                    ))}
                    {projects[5].stack.length > 5 && (
                      <span
                        style={{
                          fontSize: "0.68rem",
                          fontWeight: 600,
                          padding: "3px 10px",
                          borderRadius: 6,
                          backgroundColor: "var(--accent-glow)",
                          border: "1px solid var(--border-mid)",
                          color: "var(--accent)",
                          whiteSpace: "nowrap",
                        }}
                      >
                        +{projects[5].stack.length - 5}
                      </span>
                    )}
                  </div>
                  <ProjectCardCta />
                </div>
              </div>
            </div>
          </section>
        </FadeUp>
        <Divider />

        <FadeUp>
          <section id="additional-projects">
            <SectionHeader eyebrow={t("portfolio")} title={t("additionalProjects")} />

            <div className="additional-projects-desktop" onWheel={handleAdditionalProjectWheel} style={{ position: "relative", minHeight: 390, perspective: "1200px", transformStyle: "preserve-3d" }}>
              <button
                type="button"
                className="additional-carousel-control additional-carousel-control-prev"
                onClick={() => moveAdditionalProject(-1)}
                aria-label={lang === "id" ? "Project tambahan sebelumnya" : "Previous additional project"}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <div className="additional-carousel-stage">
                {additionalProjects.map((project, index) => {
                  const slot = getAdditionalProjectSlot(index);
                  return renderAdditionalProjectCard(project, index, `proj-card additional-carousel-card additional-carousel-card-${slot}`, additionalProjectCardStyle(slot, index));
                })}
              </div>

              <button type="button" className="additional-carousel-control additional-carousel-control-next" onClick={() => moveAdditionalProject(1)} aria-label={lang === "id" ? "Project tambahan berikutnya" : "Next additional project"}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <div className="additional-carousel-pagination" aria-label={lang === "id" ? "Navigasi project tambahan" : "Additional project navigation"}>
                {additionalProjects.map((project, index) => (
                  <button
                    key={`additional-dot-${project.title.en}`}
                    type="button"
                    aria-label={lang === "id" ? `Tampilkan ${project.title.id}` : `Show ${project.title.en}`}
                    aria-current={activeAdditionalProject === index ? "true" : undefined}
                    onClick={() => setActiveAdditionalProject(index)}
                  />
                ))}
              </div>
            </div>

            <AdditionalProjectsClient projects={additionalProjects} renderProjectCard={renderAdditionalProjectCard} />
          </section>
        </FadeUp>

        <Divider />

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            EDUCATION + LANGUAGES — 3fr | 2fr side by side
        â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <FadeUp>
          <div style={{ display: "grid", gap: "2.5rem", alignItems: "start" }} className="grid-cols-1 sm:grid-cols-[3fr_2fr]">
            {/* Education */}
            <FadeUp delay={0}>
              <section id="education">
                <SectionHeader eyebrow={t("background")} title={t("education")} />
                <div
                  onClick={() => setShowEducationModal(true)}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.borderColor = "var(--border-strong)";
                    el.style.boxShadow = "var(--shadow-md)";
                    el.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.borderColor = "var(--border)";
                    el.style.boxShadow = "none";
                    el.style.transform = "translateY(0)";
                  }}
                  style={{
                    padding: "1.4rem",
                    borderRadius: "1rem",
                    backgroundColor: "var(--bg-card)",
                    border: "1px solid var(--border)",
                    display: "flex",
                    gap: 16,
                    alignItems: "flex-start",
                    cursor: "pointer",
                    transition: "border-color 0.2s ease, box-shadow 0.2s ease, transform 0.18s ease",
                  }}
                >
                  <div style={{ width: 38, height: 38, borderRadius: 10, flexShrink: 0, backgroundColor: "var(--bg-subtle)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M12 3L2 9l10 6 10-6-10-6zM2 17l10 6 10-6M2 13l10 6 10-6" stroke="var(--accent)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" opacity="0.65" />
                    </svg>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8, marginBottom: 3 }}>
                      <h3 style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--text-primary)", lineHeight: 1.35, minWidth: 0 }}>{lang === "id" ? "Teknik Informatika - D-IV" : "Informatics Engineering - D-IV"}</h3>
                      <span style={{ flexShrink: 0, fontSize: "0.62rem", fontWeight: 600, letterSpacing: "0.08em", color: "var(--accent)", opacity: 0.75, display: "flex", alignItems: "center", gap: 4, paddingTop: 2 }}>
                        {t("viewDetails")}
                        <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                          <path d="M1.5 8.5L8.5 1.5M8.5 1.5H3.5M8.5 1.5V6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </div>
                    <p style={{ fontSize: "0.74rem", fontWeight: 500, color: "var(--accent)", opacity: 0.75, marginBottom: 9 }}>Politeknik Negeri Lhokseumawe</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                      {[lang === "id" ? "2021 - 2025" : "2021 - 2025", lang === "id" ? "IPK 3.15 / 4.00" : "GPA 3.15 / 4.00", lang === "id" ? "Lulus" : "Graduated"].map((t) => (
                        <span key={t} style={{ fontSize: "0.7rem", padding: "2px 9px", borderRadius: 6, backgroundColor: "var(--bg-subtle)", border: "1px solid var(--border)", color: "var(--text-muted)" }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            </FadeUp>

            {/* Languages */}
            <FadeUp delay={100}>
              <section>
                <SectionHeader eyebrow={t("communication")} title={t("languages")} />
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {[
                    { lang: lang === "id" ? "Bahasa Indonesia" : "Indonesian", level: t("native"), pct: 100 },
                    { lang: "English", level: t("intermediateToefl450"), pct: 65 },
                  ].map((l, i) => (
                    <FadeUp key={l.lang} delay={i * 90}>
                      <div style={{ padding: "1.1rem 1.25rem", borderRadius: "1rem", backgroundColor: "var(--bg-card)", border: "1px solid var(--border)" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8, marginBottom: 10 }}>
                          <span style={{ fontSize: "0.87rem", fontWeight: 500, color: "var(--text-primary)" }}>{l.lang}</span>
                          <span style={{ fontSize: "0.64rem", color: "var(--text-muted)", textAlign: "right", lineHeight: 1.4 }}>{l.level}</span>
                        </div>
                        <div style={{ height: 3, width: "100%", backgroundColor: "var(--bg-subtle)", borderRadius: 99, overflow: "hidden" }}>
                          <div style={{ height: "100%", width: `${l.pct}%`, borderRadius: 99, backgroundColor: "var(--accent)", opacity: 0.5 }} />
                        </div>
                      </div>
                    </FadeUp>
                  ))}
                </div>
              </section>
            </FadeUp>
          </div>
        </FadeUp>

        <Divider />

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            CERTIFICATIONS — 2-col, numbered boxes, slide-right on hover
        â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <FadeUp>
          <section id="certifications">
            <SectionHeader eyebrow={t("credentials")} title={t("certifications")} />

            {/* Grid & show-more handled by client component */}
            <CertificationsClient certifications={certifications} />
          </section>
        </FadeUp>

        <Divider />

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            CONTACT
        â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <FadeUp>
          <section id="contact">
            <div
              className="contact-panel"
              style={{ position: "relative", overflow: "hidden", borderRadius: 24, padding: "clamp(2.5rem,8vw,5rem) clamp(1.25rem,5vw,2rem)", textAlign: "center", backgroundColor: "var(--bg-card)", border: "1px solid var(--border)" }}
            >
              <div style={{ position: "absolute", top: -80, right: -60, width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle, var(--accent-glow), transparent 65%)", opacity: 0.7, pointerEvents: "none" }} />
              <div style={{ position: "absolute", bottom: -60, left: -40, width: 220, height: 220, borderRadius: "50%", background: "radial-gradient(circle, var(--accent-glow), transparent 65%)", opacity: 0.4, pointerEvents: "none" }} />
              {/* Corner marks */}
              <svg aria-hidden style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible", pointerEvents: "none" }}>
                <path d="M20,16 L12,16 L12,24" fill="none" stroke="var(--line-color)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12,calc(100% - 24px) L12,calc(100% - 16px) L20,calc(100% - 16px)" fill="none" stroke="var(--line-color)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div style={{ position: "relative" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 14 }}>
                  <div style={{ height: 1, width: 22, backgroundColor: "var(--accent)", opacity: 0.35 }} />
                  <p style={{ fontSize: "0.57rem", fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--accent)", opacity: 0.6 }}>{t("getInTouch")}</p>
                  <div style={{ height: 1, width: 22, backgroundColor: "var(--accent)", opacity: 0.35 }} />
                </div>
                <h2 style={{ fontFamily: "var(--font-dm-serif)", fontSize: "clamp(2rem,5vw,2.8rem)", fontWeight: 400, color: "var(--text-primary)", marginBottom: "0.85rem", lineHeight: 1.1 }}>{t("workTogether")}</h2>
                <p style={{ maxWidth: 360, margin: "0 auto 2.5rem", fontSize: "0.87rem", lineHeight: 1.8, color: "var(--text-secondary)" }}>{t("contactDescription")}</p>
                <a
                  href="mailto:furqansykss@gmail.com"
                  className="btn-p"
                  style={{
                    display: "inline-block",
                    padding: "12px 32px",
                    borderRadius: 12,
                    fontSize: "0.87rem",
                    fontWeight: 600,
                    backgroundColor: "var(--accent)",
                    color: "var(--bg)",
                    textDecoration: "none",
                  }}
                >
                  furqansykss@gmail.com
                </a>
                <div className="contact-socials" style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 20, marginTop: 28, fontSize: "0.73rem", color: "var(--text-muted)", flexWrap: "wrap" }}>
                  <a href="https://linkedin.com/in/fur-qan-6b1b87242" target="_blank" rel="noopener" className="lnk" style={{ textDecoration: "none", color: "var(--text-muted)" }}>
                    LinkedIn ↗
                  </a>
                  <span style={{ color: "var(--border-mid)" }}>·</span>
                  <a href="https://github.com/Furqan-sykss" target="_blank" rel="noopener" className="lnk" style={{ textDecoration: "none", color: "var(--text-muted)" }}>
                    GitHub ↗
                  </a>
                  <span style={{ color: "var(--border-mid)" }}>·</span>
                  <a href="https://wa.me/6282238584400?text=Hi%20Furqan" target="_blank" rel="noopener" className="lnk" style={{ textDecoration: "none", color: "var(--text-muted)" }}>
                    +62 822-385-84400 ↗
                  </a>
                </div>
              </div>
            </div>
          </section>
        </FadeUp>
      </div>
    </>
  );
}

// ────── SkillCard ──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────

function SkillCard({ group }: { group: { category: Localized; icon: string; items: string[] } }) {
  const { lang } = useLanguage();
  const L = (loc: Localized): string => (lang === "id" ? loc.id : loc.en);
  const isDigitalPresence = group.category.en === "Digital Presence";
  return (
    <div
      className={isDigitalPresence ? "skill-card-wide" : undefined}
      style={{
        backgroundColor: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: "1rem",
        padding: "1.2rem",
        height: "100%",
        transition: "border-color 0.2s ease",
      }}
      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--border-mid)")}
      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--border)")}
    >
      <div className="skill-card-heading" style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "0.85rem" }}>
        <span style={{ fontSize: "0.72rem", color: "var(--accent)", opacity: 0.45, fontFamily: "var(--font-body)", letterSpacing: "0.05em" }}>{group.icon}</span>
        <p style={{ fontSize: "0.57rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--accent)", opacity: 0.62 }}>{L(group.category)}</p>
      </div>
      <div className="skill-chip-list" style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {group.items.map((item) => (
          <span
            key={item}
            className="skill-chip"
            style={{
              padding: "3px 10px",
              borderRadius: 7,
              fontSize: "0.78rem",
              backgroundColor: "var(--bg-subtle)",
              color: "var(--text-secondary)",
              border: "1px solid var(--border)",
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
