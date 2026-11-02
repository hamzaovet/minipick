"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "../../context/LanguageContext";
import { useStoreSettings } from "../../context/StoreSettingsContext";
import {
  Download,
  ExternalLink,
  Printer,
  Sparkles,
  Phone,
  MessageCircle,
  MapPin,
  QrCode,
  ArrowRight,
  ArrowLeft,
  Navigation,
  ImageDown,
} from "lucide-react";
import InstagramIcon from "../../components/InstagramIcon";
import FacebookIcon from "../../components/FacebookIcon";

export default function VipCardPage() {
  const { lang, dir, t } = useLanguage();
  const { settings } = useStoreSettings();
  const isAr = lang === "ar";
  const cardRef = useRef<HTMLDivElement>(null);

  const webUrl = "https://minipick.vercel.app";
  const apkUrl = "https://minipick.vercel.app/downloads/minipick.apk";
  const mapsUrl = settings.googleMapsUrl || "https://maps.google.com/?q=Tanta,Gharbia,Egypt";
  const facebookUrl = "https://www.facebook.com/profile.php?id=61576070394476";

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 max-w-5xl mx-auto space-y-8">
      {/* Title */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-xs font-bold">
          <Sparkles size={14} className="text-pink-400" />
          <span>{isAr ? "كارت ميني بيك الرسمي الفاخر (VIP Privilege)" : "Official VIP Store Card"}</span>
        </div>
        <h1 className="font-sans font-black text-3xl sm:text-4xl text-pink-gradient">
          {isAr ? "كارت ميني بيك — بطاقة الهدايا والترندات الملكية" : "Mini Pick — Official VIP Card"}
        </h1>
        <p className="text-xs text-zinc-400">
          {isAr
            ? "بطاقة المتجر الرسمية الفاخرة المعتمدة — تحتوي على 2 كيو ار كود: كود مباشر لزيارة المتجر الإلكتروني، وكود فوري لتحميل تطبيق الأندرويد الرسمي مع بيانات التواصل واللوكيشن."
            : "Features Dual QR Codes: Instant Website Access & Direct Android APK Download."}
        </p>
      </div>

      {/* The Printable VIP Card */}
      <div
        ref={cardRef}
        id="vip-card"
        className="relative max-w-2xl mx-auto rounded-3xl p-8 sm:p-10 border-2 border-pink-500/40 bg-gradient-to-br from-[#1b1022] via-[#120a17] to-[#09050d] shadow-[0_0_60px_rgba(236,72,153,0.22)] overflow-hidden space-y-8"
      >
        {/* Glow ambient background effects */}
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-rose-600/15 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header: Brand Logo & Title */}
        <div className="relative z-10 flex items-center justify-between border-b border-pink-500/25 pb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-400 via-rose-500 to-pink-600 flex items-center justify-center text-white font-sans font-black text-xl shadow-lg shadow-pink-500/30 border border-white/30">
              MP
            </div>
            <div>
              <h2 className="font-sans font-black text-2xl sm:text-3xl text-pink-gradient tracking-tight">
                {isAr ? "ميني بيك" : "Mini Pick"}
              </h2>
              <p className="text-xs text-pink-300 tracking-wide font-sans font-medium">
                {isAr ? "بوتيك الهدايا ومكعبات النانو والترندات اللطيفة" : "Aesthetic Gifts, Nano Blocks & Cute Lifestyle"}
              </p>
            </div>
          </div>

          <div className="text-end hidden sm:block">
            <span className="px-3.5 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-pink-500/15 border border-pink-500/40 text-pink-300 shadow-[0_0_15px_rgba(236,72,153,0.2)]">
              VIP PRIVILEGE
            </span>
          </div>
        </div>

        {/* Middle: Dual QR Codes Section */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          {/* QR 1: Website */}
          <div className="p-5 rounded-2xl bg-black/60 border border-pink-500/25 text-center space-y-3 shadow-lg backdrop-blur-md">
            <div className="bg-white p-2.5 rounded-xl inline-block shadow-inner">
              <img
                src="/minipick-web-qr.png"
                alt="Website QR"
                className="w-36 h-36 mx-auto block"
              />
            </div>
            <div>
              <span className="text-xs font-bold text-pink-300 flex items-center justify-center gap-1.5">
                <ExternalLink size={13} />
                <span>{isAr ? "كود زيارة الموقع الإلكتروني" : "Scan to Visit Website"}</span>
              </span>
              <p className="text-[11px] text-zinc-400 mt-1 font-mono">
                minipick.vercel.app
              </p>
            </div>
          </div>

          {/* QR 2: Android APK */}
          <div className="p-5 rounded-2xl bg-black/60 border border-pink-500/25 text-center space-y-3 shadow-lg backdrop-blur-md">
            <div className="bg-white p-2.5 rounded-xl inline-block shadow-inner">
              <img
                src="/minipick-apk-qr.png"
                alt="Android APK QR"
                className="w-36 h-36 mx-auto block"
              />
            </div>
            <div>
              <span className="text-xs font-bold text-emerald-400 flex items-center justify-center gap-1.5">
                <Download size={13} />
                <span>{isAr ? "كود تحميل تطبيق الأندرويد" : "Scan to Download Android APK"}</span>
              </span>
              <p className="text-[11px] text-zinc-400 mt-1 font-mono">
                minipick.apk (v1.0.0)
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Contacts & Location - Fully Unclipped */}
        <div className="relative z-10 border-t border-pink-500/20 pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-zinc-300 text-center sm:text-start">
          <div className="flex flex-col items-center sm:items-start gap-1">
            <div className="flex items-center gap-2">
              <Phone size={16} className="text-pink-400 shrink-0" />
              <span className="font-mono font-bold text-zinc-100 text-sm">
                {settings.hotline || "01050757837"}
              </span>
            </div>
            {settings.secondaryPhone && (
              <span className="font-mono text-xs text-pink-300/90 pr-6">
                واتس وأوردرات: {settings.secondaryPhone}
              </span>
            )}
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-3">
            <div className="flex items-center gap-1.5">
              <FacebookIcon size={16} className="text-pink-400 shrink-0" />
              <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold hover:text-pink-400 transition text-zinc-100"
              >
                Mini Pick
              </a>
            </div>
            <span className="text-zinc-600">•</span>
            <div className="flex items-center gap-1.5">
              <InstagramIcon size={16} className="text-pink-400 shrink-0" />
              <a
                href={`https://www.instagram.com/${settings.instagramHandle || "minipick.eg"}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold hover:text-pink-400 transition text-zinc-100"
              >
                @{settings.instagramHandle || "minipick.eg"}
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center sm:items-start gap-1">
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-2 hover:text-pink-400 transition text-start"
            >
              <MapPin size={16} className="text-pink-400 shrink-0 mt-0.5" />
              <span className="text-xs font-semibold leading-relaxed text-zinc-100">
                {isAr ? (settings.addressAr || "طنطا — محافظة الغربية — جمهورية مصر العربية") : settings.addressEn}
              </span>
            </a>
            <span className="text-[11px] text-emerald-400 font-bold pr-6 flex items-center gap-1">
              <Navigation size={11} />
              <span>طنطا 📍 شحن سريع لكافة محافظات مصر</span>
            </span>
          </div>
        </div>
      </div>

      {/* Action Controls */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        {/* Download Ultra-HD Card Image */}
        <a
          href="/minipick-official-card.png"
          download="minipick-official-card.png"
          className="py-3 px-6 rounded-xl btn-pink text-xs font-black flex items-center gap-2 shadow-xl hover:scale-105 transition"
        >
          <ImageDown size={16} />
          <span>{isAr ? "تحميل صورة الكارت عالية الدقة (VIP Ultra-HD PNG) 👑" : "Download Ultra-HD Card PNG"}</span>
        </a>

        <button
          onClick={handlePrint}
          className="py-3 px-6 rounded-xl bg-pink-500/15 border border-pink-500/40 text-pink-300 text-xs font-bold flex items-center gap-2 shadow-xl hover:bg-pink-500/25 transition"
        >
          <Printer size={16} />
          <span>{isAr ? "طباعة الكارت" : "Print Card"}</span>
        </button>

        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="py-3 px-6 rounded-xl bg-zinc-900 border border-pink-500/30 text-pink-300 text-xs font-bold hover:bg-zinc-800 transition flex items-center gap-2"
        >
          <MapPin size={16} />
          <span>{isAr ? "موقعنا في طنطا على خرائط جوجل 📍" : "Open on Google Maps"}</span>
        </a>

        <a
          href="/downloads/minipick.apk"
          download="minipick.apk"
          className="py-3 px-6 rounded-xl bg-zinc-900 border border-emerald-500/40 text-emerald-400 text-xs font-bold hover:bg-zinc-800 transition flex items-center gap-2"
        >
          <Download size={16} />
          <span>{isAr ? "تحميل ملف APK مباشرة" : "Direct Download APK"}</span>
        </a>

        <Link
          href="/"
          className="py-3 px-6 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-300 text-xs font-semibold hover:text-white transition"
        >
          {isAr ? "العودة للمتجر" : "Back to Store"}
        </Link>
      </div>
    </div>
  );
}
