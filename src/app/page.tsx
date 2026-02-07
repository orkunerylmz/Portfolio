"use client";

import Image from "next/image";
import { useEffect, useState, FormEvent } from "react";
import InteractiveGrid from "@/components/InteractiveGrid";
import ProjectCarousel from "@/components/ProjectCarousel";

// SVG Icons
const icons = {
  github: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  email: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 010 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.981 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4.162 4.162 0 110-8.324A4.162 4.162 0 0112 16zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  ),
};

const skills = [
  { name: "Python", icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z" /></svg> },
  { name: "TensorFlow", icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M1.292 5.856L11.54 0v24l-4.095-2.378V7.603l-6.168 3.564.015-5.31zm21.416 0L12.46 0v24l4.095-2.378V14.87l3.092 1.788-.018-4.618-3.074-1.756V7.603l6.153 3.564.015-5.31z" /></svg> },
  { name: "Pandas", icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.922 0h2.623v18.104h-2.623zm-4.126 12.94h2.623v2.57h-2.623zm0-7.037h2.623v5.446h-2.623zm0 11.197h2.623v5.446h-2.623zM4.456 5.896h2.622V24H4.456zm4.213 2.559h2.623v2.57H8.669zm0 4.151h2.623v5.447H8.669zm0-11.187h2.623v5.446H8.669z" /></svg> },
  { name: "NumPy", icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M10.315 4.876L6.3 2.834l-4.248 2.31 3.926 2.015zm.052 1.1l-4.07 2.09v8.31l4.07-2.09zm1.1.047v8.167l3.964 2.075v-8.195zm4.116 10.39l-4.07 2.09v3.443l4.07-2.09zm4.864-10.39v-.001l-3.764-1.92-4.015 2.06 3.854 2.02zm-8.93-4.438l3.966 2.022 4.12-2.115L15.5.459z" /></svg> },
  { name: "SQL", icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3C7.58 3 4 4.79 4 7s3.58 4 8 4 8-1.79 8-4-3.58-4-8-4M4 9v3c0 2.21 3.58 4 8 4s8-1.79 8-4V9c0 2.21-3.58 4-8 4s-8-1.79-8-4m0 5v3c0 2.21 3.58 4 8 4s8-1.79 8-4v-3c0 2.21-3.58 4-8 4s-8-1.79-8-4z" /></svg> },
  { name: "Scikit-learn", icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg> },
  { name: "Streamlit", icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.525 2.138a.95.95 0 0 0-1.05 0L0 9.06l11.476 6.924a.95.95 0 0 0 1.05 0L24 9.06zM0 11.94v2.12L11.476 21a.95.95 0 0 0 1.05 0L24 14.06v-2.12l-11.476 6.924a.95.95 0 0 1-1.05 0z" /></svg> },
  { name: "PyQt", icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg> },
  { name: "Matplotlib", icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 3v18h18V3H3zm16 16H5V5h14v14zM7 17l3-4 2 2.5 3-4 4 5H7z" /></svg> },
  { name: "Git", icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187" /></svg> },
];

const projects = [
  {
    name: "Grafiker",
    desc: "Karmaşık verileri estetik, yayınlanabilir grafiklere ve detaylı analizlere dönüştüren profesyonel masaüstü uygulaması.",
    fullDesc: "Grafiker, veri bilimciler ve araştırmacılar için tasarlanmış güçlü bir masaüstü uygulamasıdır. CSV, Excel ve JSON formatlarındaki verileri okuyabilir, çeşitli istatistiksel analizler yapabilir ve sonuçları profesyonel kalitede grafikler olarak dışa aktarabilirsiniz. Korelasyon analizi, regresyon modelleri, dağılım grafikleri ve özelleştirilebilir tema seçenekleri sunar.",
    lang: "Python / PyQt6",
    url: "https://github.com/orkunerylmz/Grafiker",
    images: [
      "/images/grafiker/grafiker1.png",
      "/images/grafiker/grafiker2.png",
      "/images/grafiker/grafiker3.png",
      "/images/grafiker/grafiker4.png",
      "/images/grafiker/grafiker5.png",
      "/images/grafiker/grafiker6.png",
      "/images/grafiker/grafiker7.png",
      "/images/grafiker/grafiker8.png",
    ]
  },
  {
    name: "ISTRedMap",
    desc: "İstanbul trafik kazası verilerini Folium heatmap'ler ve kümeleme algoritmaları ile görselleştiren analiz sistemi.",
    fullDesc: "ISTRedMap, İstanbul'daki trafik kazalarını analiz eden kapsamlı bir veri bilimi projesidir. Açık kaynak veri setlerinden toplanan kaza verileri, coğrafi koordinatlarla eşleştirilerek interaktif haritalar üzerinde görselleştirilir. K-Means kümeleme algoritması ile tehlikeli bölgeler tespit edilir, Folium kütüphanesi ile ısı haritaları oluşturulur.",
    lang: "Python",
    url: "https://github.com/orkunerylmz/ISTRedMap",
    images: [
      "/images/istredmap/istredmap1.png",
      "/images/istredmap/istredmap2.png",
      "/images/istredmap/istredmap3.png",
    ]
  },
  {
    name: "IstanbulDash",
    desc: "İstanbul'un tüm ilçelerine ait verilerin elle toplanıp haritalandırılması, grafikleştirilmesi ve bu verilerle çalışan bir chatbot entegrasyonu.",
    fullDesc: "IstanbulDash, İstanbul'un 39 ilçesine ait demografik, ekonomik ve sosyal verileri bir araya getiren kapsamlı bir dashboard projesidir. Nüfus, gelir dağılımı, eğitim istatistikleri gibi veriler interaktif grafikler ve haritalarla sunulur. LangChain tabanlı yapay zeka chatbot entegrasyonu sayesinde kullanıcılar doğal dil ile sorgulama yapabilir.",
    lang: "Python / Data Analysis",
    url: "https://github.com/orkunerylmz/istanbuldash",
    images: [
      "/images/istanbuldash/istanbuldash1.png",
      "/images/istanbuldash/istanbuldash2.png",
    ]
  },
  {
    name: "Z Value Calculator",
    desc: "Z-skoru hesaplamaları için Streamlit tabanlı web uygulaması. İnteraktif görselleştirmeler sunar.",
    fullDesc: "Z Value Calculator, istatistik öğrencileri ve araştırmacılar için geliştirilmiş kullanıcı dostu bir web uygulamasıdır. Normal dağılım üzerinde z-skor hesaplamaları, olasılık dağılımları ve güven aralığı analizleri yapabilirsiniz. Streamlit ile geliştirilmiş interaktif arayüzü sayesinde parametreleri gerçek zamanlı değiştirip sonuçları anında görebilirsiniz.",
    lang: "Python",
    url: "https://github.com/orkunerylmz/Z-Value-Calculator",
    images: [
      "/images/calculator/calculator1.png",
      "/images/calculator/calculator2.png",
      "/images/calculator/calculator3.png",
      "/images/calculator/calculator4.png",
      "/images/calculator/calculator5.png",
      "/images/calculator/calculator6.png",
    ]
  },
  {
    name: "Orkun Eryılmaz (Portfolio)",
    desc: "Next.js ve modern web teknolojileri ile geliştirilmiş interaktif portfolyo sitesi.",
    fullDesc: "Bu web sitesi, projelerimi sergilemek ve profesyonel kimliğimi yansıtmak amacıyla geliştirildi. Next.js 15 (App Router), interaktif grafikler, karmaşık animasyonlar ve Nodemailer tabanlı bir iletişim formu gibi özellikleri barındırır. SEO dostu yapısı ve yüksek performans odaklı tasarımı ile kullanıcı dostu bir deneyim sunar.",
    lang: "Next.js / TypeScript",
    url: "https://github.com/orkunerylmz/Portfolio",
    images: [
      "/images/portfolio/portfolio1.png",
      "/images/portfolio/portfolio2.png",
    ]
  },
];

const pricing = [
  {
    name: "Başlangıç",
    desc: "Küçük projeler için ideal",
    price: "5.000",
    features: [
      "Veri analizi raporu",
      "Temel görselleştirmeler",
      "1 revizyon hakkı",
      "3 günde teslimat",
    ],
  },
  {
    name: "Profesyonel",
    desc: "Orta ölçekli projeler için",
    price: "15.000",
    featured: true,
    features: [
      "Kapsamlı veri analizi",
      "ML model geliştirme",
      "Interaktif dashboard",
      "3 revizyon hakkı",
      "7 günde teslimat",
      "Teknik dokümantasyon",
    ],
  },
  {
    name: "Kurumsal",
    desc: "Büyük ölçekli projeler",
    price: "35.000+",
    features: [
      "End-to-end ML pipeline",
      "Özel model eğitimi",
      "API entegrasyonu",
      "Sınırsız revizyon",
      "Öncelikli destek",
      "Kaynak kod teslimi",
    ],
  },
];

const contacts = [
  { label: "GitHub", value: "github.com/orkunerylmz", icon: "github", url: "https://github.com/orkunerylmz" },
  { label: "LinkedIn", value: "linkedin.com/in/orkunerylmz", icon: "linkedin", url: "https://linkedin.com/in/orkunerylmz" },
  { label: "Email", value: "orkunerylmz@gmail.com", icon: "email", url: "mailto:orkunerylmz@gmail.com" },
  { label: "Instagram", value: "instagram.com/orkunerylmz", icon: "instagram", url: "https://instagram.com/orkunerylmz" },
];

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [skillsReady, setSkillsReady] = useState(false);

  // Contact Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    privacy: false
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  useEffect(() => {
    setTimeout(() => setSkillsReady(true), 500);
  }, []);

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('sending');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormStatus('sent');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '', privacy: false });
        setTimeout(() => setFormStatus('idle'), 3000);
      } else {
        setFormStatus('error');
        setTimeout(() => setFormStatus('idle'), 3000);
      }
    } catch {
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 3000);
    }
  };

  return (
    <>
      {/* Animated Background */}
      <div className="animated-bg">
        <div className="aurora" />
        <div className="gradient-mesh" />
        <div className="pulse-wave" />
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="orb orb-4" />
        <div className="particles">
          <div className="particle" />
          <div className="particle" />
          <div className="particle" />
          <div className="particle" />
          <div className="particle" />
          <div className="particle" />
          <div className="particle" />
          <div className="particle" />
          <div className="particle" />
          <div className="particle" />
        </div>
      </div>
      <InteractiveGrid />

      {/* Navbar */}
      <nav className="navbar">
        <a href="#" className="nav-logo">Orkun <span>ERYILMAZ</span></a>
        <ul className="nav-links">
          <li><a href="#hakkimda">Hakkımda</a></li>
          <li><a href="#yetenekler">Yetenekler</a></li>
          <li><a href="#projeler">Projeler</a></li>
          <li><a href="#fiyatlandirma">Fiyatlandırma</a></li>
          <li><a href="#iletisim">İletişim</a></li>
        </ul>
        <a href="#iletisim" className="nav-cta">Bana Ulaşın</a>

        {/* Hamburger Button */}
        <button
          className="hamburger-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`} />
          <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`} />
          <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`} />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <ul className="mobile-nav-links">
          <li><a href="#hakkimda" onClick={() => setIsMenuOpen(false)}>Hakkımda</a></li>
          <li><a href="#yetenekler" onClick={() => setIsMenuOpen(false)}>Yetenekler</a></li>
          <li><a href="#projeler" onClick={() => setIsMenuOpen(false)}>Projeler</a></li>
          <li><a href="#fiyatlandirma" onClick={() => setIsMenuOpen(false)}>Fiyatlandırma</a></li>
          <li><a href="#iletisim" onClick={() => setIsMenuOpen(false)}>İletişim</a></li>
        </ul>
      </div>

      {/* Main */}
      <main>
        {/* Hero Section */}
        <section className="hero" id="hakkimda">
          <div className="hero-content">
            <div className="hero-text animate">
              <div className="availability-badge">
                <div className="availability-dot" />
                <span className="availability-text">Yeni Projeler & İş Birliği İçin Müsait</span>
              </div>
              <h1>Merhaba, ben <span>Orkun</span></h1>
              <p>
                Veri bilimi ve makine öğrenmesi alanında tutkulu bir geliştiriciyim.
                Karmaşık verileri anlamlı içgörülere dönüştürüyorum.
              </p>
              <div className="hero-buttons">
                <a href="#projeler" className="btn-primary">Projelerimi Gör</a>
                <a href="#iletisim" className="btn-secondary">İletişime Geç</a>
              </div>
            </div>
            <div className="hero-image-wrapper">
              <div className="hero-image-border" />
              <div className="hero-image">
                <div className="hero-image-shine" />

                {/* Hero Card Overlay Info Bar 2.0 */}
                <div className="hero-card-overlay">
                  <div className="overlay-items">
                    <div className="overlay-item">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
                      <span className="overlay-text">AI ENGINEER</span>
                    </div>
                    <div className="overlay-item">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>
                      <span className="overlay-text">DATA SCIENTIST</span>
                    </div>
                    <div className="overlay-item">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
                      <span className="overlay-text">ML OPS</span>
                    </div>
                  </div>
                </div>

                <Image
                  src="/images/me.jpeg"
                  alt="Orkun Eryılmaz"
                  width={400}
                  height={400}
                  priority
                />
              </div>
            </div>
          </div>

        </section>

        {/* Terminal Section - Hakkımda */}
        <div className="terminal-section animate delay-1" id="hakkimda-terminal">
          <div className="terminal-header">
            <div className="terminal-dot red" />
            <div className="terminal-dot yellow" />
            <div className="terminal-dot green" />
            <span className="terminal-title">~/orkun/hakkimda</span>
          </div>
          <div className="terminal-body" style={{ padding: '40px' }}>
            {/* İsim ve Başlık */}
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{
                fontSize: '28px',
                fontWeight: 700,
                color: 'white',
                marginBottom: '8px',
                fontFamily: 'inherit'
              }}>
                Orkun Eryılmaz
              </h3>
              <p style={{
                fontSize: '16px',
                color: 'var(--accent)',
                fontWeight: 500
              }}>
                Data Scientist & AI Developer
              </p>
            </div>

            {/* Açıklama */}
            <p style={{
              fontSize: '15px',
              color: 'var(--text-muted)',
              lineHeight: 1.7,
              marginBottom: '32px',
              maxWidth: '600px'
            }}>
              Verinin gücüne inanan, onu anlamlı çözümlere dönüştüren bir geliştiriciyim.
              Makine öğrenmesi ve yapay zeka projelerinde aktif olarak çalışıyor,
              açık kaynak topluluğuna katkıda bulunuyorum. Hedefim: teknolojiyle
              gerçek dünya problemlerini çözmek.
            </p>

            {/* Info Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '24px',
              marginBottom: '32px'
            }}>
              <div>
                <div style={{ color: 'var(--text-muted)', fontSize: '12px', textTransform: 'uppercase', marginBottom: '6px', letterSpacing: '1px' }}>Eğitim</div>
                <div style={{ color: 'white', fontSize: '14px' }}>Bursa Teknik Üniversitesi</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Veri Bilimi ve Analitiği — 2. Sınıf</div>
              </div>
              <div>
                <div style={{ color: 'var(--text-muted)', fontSize: '12px', textTransform: 'uppercase', marginBottom: '6px', letterSpacing: '1px' }}>Konum</div>
                <div style={{ color: 'white', fontSize: '14px' }}>Bursa, Türkiye</div>
              </div>
              <div>
                <div style={{ color: 'var(--text-muted)', fontSize: '12px', textTransform: 'uppercase', marginBottom: '6px', letterSpacing: '1px' }}>Odak Alanı</div>
                <div style={{ color: 'white', fontSize: '14px' }}>Data Science & AI</div>
              </div>
              <div>
                <div style={{ color: 'var(--text-muted)', fontSize: '12px', textTransform: 'uppercase', marginBottom: '6px', letterSpacing: '1px' }}>Durum</div>
                <div style={{ color: '#10b981', fontSize: '14px' }}>● Staja Açık</div>
              </div>
            </div>

            {/* Sosyal Linkler */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a href="https://github.com/orkunerylmz" target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  background: 'rgba(139, 92, 246, 0.1)',
                  border: '1px solid rgba(139, 92, 246, 0.3)',
                  borderRadius: '100px',
                  color: 'white',
                  fontSize: '14px',
                  textDecoration: 'none',
                  transition: 'all 0.3s'
                }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                GitHub
              </a>
              <a href="https://linkedin.com/in/orkunerylmz" target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  background: 'rgba(139, 92, 246, 0.1)',
                  border: '1px solid rgba(139, 92, 246, 0.3)',
                  borderRadius: '100px',
                  color: 'white',
                  fontSize: '14px',
                  textDecoration: 'none',
                  transition: 'all 0.3s'
                }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                LinkedIn
              </a>
              <a href="mailto:orkunerylmz@gmail.com"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  background: 'rgba(139, 92, 246, 0.1)',
                  border: '1px solid rgba(139, 92, 246, 0.3)',
                  borderRadius: '100px',
                  color: 'white',
                  fontSize: '14px',
                  textDecoration: 'none',
                  transition: 'all 0.3s'
                }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                Email
              </a>
              <a href="https://instagram.com/orkunerylmz" target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  background: 'rgba(139, 92, 246, 0.1)',
                  border: '1px solid rgba(139, 92, 246, 0.3)',
                  borderRadius: '100px',
                  color: 'white',
                  fontSize: '14px',
                  textDecoration: 'none',
                  transition: 'all 0.3s'
                }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                Instagram
              </a>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <section className="section animate delay-2" id="yetenekler">
          <div className="section-title">Yeteneklerim</div>
          <h2 className="section-heading">Teknik Beceriler</h2>
          <p className="section-desc">
            Veri bilimi ve makine öğrenmesi alanında edindiğim teknik yetkinlikler.
          </p>
          <div className="skills-marquee">
            <div className="skills-track">
              {[...skills, ...skills].map((skill, index) => (
                <div key={`${skill.name}-${index}`} className="skill-card">
                  <div className="skill-icon">{skill.icon}</div>
                  <div className="skill-name">{skill.name}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="section animate delay-3" id="projeler">
          <div className="section-title">Projelerim</div>
          <h2 className="section-heading">GitHub Projeleri</h2>
          <p className="section-desc">
            Açık kaynak olarak geliştirdiğim yazılım ve veri odaklı projelerim.
          </p>
          <div className="projects-grid">
            {projects.map((project) => (
              <div
                key={project.name}
                className="project-card group"
              >
                <div className="project-image-container">
                  <ProjectCarousel images={project.images} name={project.name} />
                  <div className="project-image-overlay" />
                </div>
                <div className="project-content">
                  <div className="project-header">
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-name hover:text-[var(--accent)] transition-colors"
                    >
                      {project.name}
                    </a>
                    <span className="project-lang">{project.lang}</span>
                  </div>
                  <p className="project-desc">{project.fullDesc}</p>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-details-btn"
                  >
                    <span>GitHub&apos;da Gör</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}

            {/* See More Card */}
            <a
              href="https://github.com/orkunerylmz"
              target="_blank"
              rel="noopener noreferrer"
              className="project-see-more"
            >
              <div className="see-more-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 5v14M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="see-more-text">Daha Fazlası</div>
              <p className="see-more-desc">Tüm projelerimi GitHub üzerinde inceleyin</p>
            </a>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="section" id="fiyatlandirma">
          <div className="section-title">Fiyatlandırma</div>
          <h2 className="section-heading">Hizmet Paketleri</h2>
          <p className="section-desc">
            Özel yazılım çözümleri ve veri projeleri için freelance hizmet paketleri.
          </p>
          <div className="pricing-grid">
            {pricing.map((plan) => (
              <div
                key={plan.name}
                className={`pricing-card ${plan.featured ? "featured" : ""}`}
              >
                <div className="pricing-name">{plan.name}</div>
                <div className="pricing-desc">{plan.desc}</div>
                <div className="pricing-price">
                  ₺{plan.price}<span>/proje</span>
                </div>
                <ul className="pricing-features">
                  {plan.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
                <a href="#iletisim" className="pricing-btn">
                  {plan.featured ? "Hemen Başlayalım" : "Teklif Al"}
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className="section" id="iletisim">
          <div className="section-title">İletişim</div>
          <h2 className="section-heading">Bana Ulaşın</h2>
          <p className="section-desc">
            Proje teklifleri veya işbirliği için benimle iletişime geçebilirsiniz.
          </p>
          <div className="contact-container">
            <div className="contact-info-card">
              <div className="info-header">
                <h3>İletişim Bilgileri</h3>
                <p>Aşağıdaki kanallar üzerinden bana doğrudan ulaşabilir veya formu doldurabilirsiniz.</p>
              </div>
              <div className="info-list">
                {contacts.map((contact) => (
                  <a
                    key={contact.label}
                    href={contact.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="info-item"
                  >
                    <div className="info-icon">
                      {icons[contact.icon as keyof typeof icons]}
                    </div>
                    <div className="info-content">
                      <span className="info-label">{contact.label}</span>
                      <span className="info-value">{contact.value}</span>
                    </div>
                  </a>
                ))}
              </div>
              <div className="info-footer">
                <p>Genellikle 24 saat içinde yanıt veririm.</p>
              </div>
            </div>

            <div className="contact-form-wrapper">
              <div className="hero-image-border" />
              <form className="contact-form" onSubmit={handleFormSubmit}>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Ad Soyad</label>
                    <input
                      type="text"
                      placeholder="Orkun Eryılmaz"
                      required
                      className="form-input"
                      value={formData.name || ''}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>E-posta</label>
                    <input
                      type="email"
                      placeholder="example@mail.com"
                      required
                      className="form-input"
                      value={formData.email || ''}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label>Telefon</label>
                    <input
                      type="tel"
                      placeholder="0 (5XX) XXX XX XX"
                      className="form-input"
                      value={formData.phone || ''}
                      pattern="0 \([0-9]{3}\) [0-9]{3} [0-9]{2} [0-9]{2}"
                      minLength={17}
                      title="Geçerli bir telefon numarası girin: 0 (5XX) XXX XX XX"
                      onChange={(e) => {
                        // Format phone number: 0 (5XX) XXX XX XX
                        const value = e.target.value.replace(/\D/g, '').slice(0, 11);
                        let formatted = '';
                        if (value.length > 0) formatted = '0';
                        if (value.length > 1) formatted += ' (' + value.slice(1, 4);
                        if (value.length >= 4) formatted += ')';
                        if (value.length > 4) formatted += ' ' + value.slice(4, 7);
                        if (value.length > 7) formatted += ' ' + value.slice(7, 9);
                        if (value.length > 9) formatted += ' ' + value.slice(9, 11);
                        setFormData({ ...formData, phone: formatted });
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label>Konu</label>
                    <input
                      type="text"
                      placeholder="Proje Hakkında"
                      required
                      className="form-input"
                      value={formData.subject || ''}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Mesajınız</label>
                  <textarea
                    placeholder="Projenizden kısaca bahsedin..."
                    required
                    className="form-textarea"
                    rows={4}
                    value={formData.message || ''}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <div className="form-checkbox">
                  <input
                    type="checkbox"
                    id="privacy"
                    required
                    checked={formData.privacy || false}
                    onChange={(e) => setFormData({ ...formData, privacy: e.target.checked })}
                  />
                  <label htmlFor="privacy">Kişisel verilerimin işlenmesini kabul ediyorum.</label>
                </div>

                <button type="submit" className={`form-submit ${formStatus === 'error' ? 'error' : ''}`} disabled={formStatus === 'sending'}>
                  <span>{formStatus === 'sending' ? 'Gönderiliyor...' : formStatus === 'sent' ? '✓ Gönderildi!' : formStatus === 'error' ? '✕ Hata Oluştu' : 'Mesaj Gönder'}</span>
                  <div className="btn-glow" />
                </button>
              </form>
            </div>
          </div>
        </section>
      </main >

      {/* Footer */}
      < footer className="footer" >
        <div className="footer-content">
          <div className="footer-logo">Orkun<span> ERYILMAZ</span></div>
          <div className="footer-socials">
            {contacts.map((contact) => (
              <a
                key={contact.icon}
                href={contact.url}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                title={contact.label}
              >
                {icons[contact.icon as keyof typeof icons]}
              </a>
            ))}
          </div>
          <div className="footer-links">
            <a href="#hakkimda">Hakkımda</a>
            <a href="#yetenekler">Yetenekler</a>
            <a href="#projeler">Projeler</a>
            <a href="#fiyatlandirma">Fiyatlandırma</a>
            <a href="#iletisim">İletişim</a>
          </div>
          <div className="footer-copy">© {new Date().getFullYear()} Orkun Eryılmaz. Tüm hakları saklıdır.</div>
        </div>
      </footer >
    </>
  );
}
