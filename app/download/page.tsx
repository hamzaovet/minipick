"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "../../context/LanguageContext";
import {
  Download,
  Smartphone,
  ShieldCheck,
  Zap,
  Sparkles,
  CheckCircle2,
  Bell,
  ArrowRight,
  ArrowLeft,
  QrCode,
  Heart,
} from "lucide-react";

export default function DownloadAppPage() {
  const { lang, dir, t } = useLanguage();
  const isAr = lang === "ar";
  const [downloading, setDownloading] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    const link = document.createElement("a");
    link.href = "/downloads/minipick.apk";
    link.setAttribute("download", "minipick.apk");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => setDownloading(false), 3000);
  };

  const appUrl = "https://minipick.vercel.app/download";

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Information */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-xs font-bold">
            <Smartphone size={14} className="text-pink-400" />
            <span>
              {isAr ? "التطبيق الرسمي لأجهزة الأندرويد v1.0.0" : "Official Android App v1.0.0"}
            </span>
          </div>

          <h1 className="font-sans font-black text-3xl sm:text-5xl text-pink-gradient leading-tight">
            {isAr
              ? "تطبيق ميني بيك — عالم الهدايا والترندات اللطيفة في جيبك"
              : "Mini Pick App — Aesthetic Gifts & Lifestyle in Your Pocket"}
          </h1>

          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-light">
            {isAr
              ? "استمتعي بتجربة تسوق وردية فائقة السلاسة، إشعارات حصرية عند وصول أحدث باقات ورد الليجو، أدوات البيدازلنج، ومنظمات المكياج، مع تتبع لحظي لطلبكِ حتى باب المنزل."
              : "Experience seamless aesthetic shopping, instant drop notifications for viral nano blocks, bedazzling tools, and vanity organizers with live order tracking."}
          </p>

          {/* Features List */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3 text-sm text-zinc-200">
              <div className="w-6 h-6 rounded-full bg-pink-500/15 border border-pink-500/30 flex items-center justify-center text-pink-400 shrink-0">
                <CheckCircle2 size={14} />
              </div>
              <span>{isAr ? "إشعارات فورية بوصول الترندات الجديدة والبليند بوكس" : "Instant push alerts for viral drops & blind boxes"}</span>
            </div>

            <div className="flex items-center gap-3 text-sm text-zinc-200">
              <div className="w-6 h-6 rounded-full bg-pink-500/15 border border-pink-500/30 flex items-center justify-center text-pink-400 shrink-0">
                <CheckCircle2 size={14} />
              </div>
              <span>{isAr ? "تصفح أسرع 3 أضعاف بدون استهلاك لباقة الإنترنت" : "3x faster browsing with ultra-low data consumption"}</span>
            </div>

            <div className="flex items-center gap-3 text-sm text-zinc-200">
              <div className="w-6 h-6 rounded-full bg-pink-500/15 border border-pink-500/30 flex items-center justify-center text-pink-400 shrink-0">
                <CheckCircle2 size={14} />
              </div>
              <span>{isAr ? "تتبع فوري ومباشر لحالة الشحن والتوصيل مع المندوب" : "Live courier & package tracking status"}</span>
            </div>
          </div>

          {/* Download Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="px-8 py-4 rounded-2xl btn-pink text-sm font-black flex items-center gap-3 shadow-2xl hover:scale-105 transition disabled:opacity-50"
            >
              <Download size={20} className={downloading ? "animate-bounce" : ""} />
              <span>
                {downloading
                  ? (isAr ? "جاري بدء التحميل..." : "Starting Download...")
                  : (isAr ? "تحميل التطبيق الآن (APK مباشر)" : "Download APK File Now")}
              </span>
            </button>

            <Link
              href="/card"
              className="px-6 py-4 rounded-2xl bg-zinc-900 border border-pink-500/30 text-pink-300 text-sm font-bold hover:bg-zinc-800 transition flex items-center gap-2"
            >
              <span>{isAr ? "عرض كارت المتجر ورمز الـ QR" : "View VIP Store Card"}</span>
            </Link>
          </div>

          {/* File details info */}
          <div className="flex items-center gap-6 text-xs text-zinc-400 pt-2 font-mono">
            <span>APK Version: 1.0.0</span>
            <span>•</span>
            <span>OS: Android 7.0+</span>
            <span>•</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <ShieldCheck size={14} />
              <span>آمن ومفحوص 100%</span>
            </span>
          </div>
        </div>

        {/* Right QR Showcase Card */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-full max-w-sm rounded-3xl p-8 border-2 border-pink-500/30 bg-gradient-to-br from-[#1b1022] to-[#0c0712] shadow-[0_0_50px_rgba(236,72,153,0.2)] text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-400 via-rose-500 to-pink-600 flex items-center justify-center text-white font-sans font-black text-2xl mx-auto shadow-lg shadow-pink-500/30">
              MP
            </div>

            <div>
              <h3 className="font-sans font-black text-xl text-pink-gradient">
                {isAr ? "امسح الرمز للتحميل الفوري" : "Scan to Download Instantly"}
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                {isAr
                  ? "وجّه كاميرا هاتفك نحو رمز الاستجابة السريعة للتحميل المباشر"
                  : "Point your phone camera to download APK directly"}
              </p>
            </div>

            {/* QR Code Container */}
            <div className="p-4 rounded-2xl bg-white shadow-2xl inline-block mx-auto border-4 border-pink-200">
              <img
                src="/minipick-apk-qr.png"
                alt="Mini Pick APK QR"
                className="w-48 h-48 block mx-auto"
              />
            </div>

            <div className="pt-2 text-xs text-pink-300 font-mono">
              minipick.apk (v1.0.0)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
