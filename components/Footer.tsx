"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "../context/LanguageContext";
import { useStoreSettings } from "../context/StoreSettingsContext";
import {
  Phone,
  MessageCircle,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Download,
  CreditCard,
  Lock,
  MapPin,
  Heart,
} from "lucide-react";
import InstagramIcon from "./InstagramIcon";
import FacebookIcon from "./FacebookIcon";

export default function Footer() {
  const pathname = usePathname();
  const { lang, t } = useLanguage();
  const { settings } = useStoreSettings();
  const isAr = lang === "ar";

  // Hide Footer on ERP routes
  const isErpRoute =
    pathname === "/dashboard" ||
    pathname === "/cashier" ||
    pathname === "/menu-admin" ||
    pathname === "/inventory" ||
    pathname === "/reports" ||
    pathname === "/customers" ||
    pathname === "/users" ||
    pathname === "/suppliers" ||
    pathname === "/offers-admin" ||
    pathname === "/sales-returns" ||
    pathname === "/settings" ||
    pathname === "/login";

  if (isErpRoute) {
    return null;
  }

  const phoneDisplay = settings.hotline || settings.whatsappPhone || "01050757837";
  const secondaryPhoneDisplay = settings.secondaryPhone || "01069819381";
  const cleanPhone = phoneDisplay.replace(/\D/g, "");
  const waNumber = cleanPhone.startsWith("0") ? `2${cleanPhone}` : cleanPhone;
  const instagram = settings.instagramHandle || "minipick.eg";
  const facebookUrl = "https://www.facebook.com/profile.php?id=61576070394476";
  const mapsUrl = settings.googleMapsUrl || "https://maps.google.com/?q=Tanta,Gharbia,Egypt";
  const addressText = isAr
    ? settings.addressAr || "طنطا — محافظة الغربية — جمهورية مصر العربية"
    : settings.addressEn || "Tanta, Gharbia Governorate, Egypt";
  const hoursText = isAr
    ? settings.workingHoursAr || "يومياً من 11 صباحاً وحتى 11 مساءً"
    : settings.workingHoursEn || "Daily 11:00 AM - 11:00 PM";

  return (
    <footer className="bg-[#0b0810] border-t border-pink-500/20 text-zinc-400 mt-20">
      {/* Guarantees Bar */}
      <div className="border-b border-zinc-850 py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="flex flex-col items-center p-5 rounded-2xl bg-[#140e1a] border border-pink-500/15">
            <div className="w-12 h-12 rounded-full bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-400 mb-3">
              <ShieldCheck size={24} />
            </div>
            <h4 className="font-sans font-bold text-base text-zinc-100 mb-1">
              {isAr ? "معاينة وفحص قبل الدفع" : "Inspect Order Before Paying"}
            </h4>
            <p className="text-xs text-zinc-400 max-w-xs">
              {isAr
                ? "حقك الكامل في فتح الشحنة وفحص القطع والستيكرات مع المندوب قبل دفع أي جنيه."
                : "Full privilege to inspect your cute items with the courier prior to payment."}
            </p>
          </div>

          <div className="flex flex-col items-center p-5 rounded-2xl bg-[#140e1a] border border-pink-500/15">
            <div className="w-12 h-12 rounded-full bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-400 mb-3">
              <Sparkles size={24} />
            </div>
            <h4 className="font-sans font-bold text-base text-zinc-100 mb-1">
              {isAr ? "جودة أصلية ومكعبات متينة" : "Premium Aesthetic Quality"}
            </h4>
            <p className="text-xs text-zinc-400 max-w-xs">
              {isAr
                ? "مكعبات نانو دقيقة من بلاستيك آمن غير سام، وكريستالات بيدازلنج ببريق ماسي عاكس للضوء."
                : "Safe non-toxic ABS blocks and brilliant AB crystal rhinestones with permanent sparkle."}
            </p>
          </div>

          <div className="flex flex-col items-center p-5 rounded-2xl bg-[#140e1a] border border-pink-500/15">
            <div className="w-12 h-12 rounded-full bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-400 mb-3">
              <Truck size={24} />
            </div>
            <h4 className="font-sans font-bold text-base text-zinc-100 mb-1">
              {isAr ? "شحن سريع وتغليف كيوت مبهج" : "Fast Shipping & Cute Gift Box"}
            </h4>
            <p className="text-xs text-zinc-400 max-w-xs">
              {isAr
                ? "توصيل خلال 24 - 48 ساعة لكافة محافظات مصر في بوكسات هدايا بينك أنيقة وستيكرات هدية مجانية."
                : "Fast delivery across Egypt in signature pink packaging with free cute gifts."}
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-pink-400 via-rose-500 to-pink-600 p-0.5 shadow-lg shadow-pink-500/30">
              <div className="w-full h-full bg-[#140e1a] rounded-[14px] flex items-center justify-center">
                <span className="text-pink-400 font-sans font-black text-sm">MP</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-sans font-black text-xl text-pink-gradient">
                {isAr ? "ميني بيك" : "Mini Pick"}
              </span>
              <span className="text-[10px] tracking-widest uppercase text-pink-400/90 font-medium">
                {isAr ? "متجر الهدايا والترندات اللطيفة" : "Aesthetic Gifts Boutique"}
              </span>
            </div>
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed">
            {isAr
              ? "وجهتكِ الأولى في مصر لأجمل مكعبات النانو وباقات الورد، أدوات البيدازلنج الكريستالية، منظمات المكياج والمكتب، والترندات الكيوت."
              : "Your favorite aesthetic destination in Egypt for Nano Lego blocks, crystal bedazzling tools, desk organizers, and trending gifts."}
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-3 pt-2">
            <a
              href={`tel:${phoneDisplay}`}
              className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center text-zinc-300 hover:text-pink-400 hover:border-pink-500/50 transition"
              title="Call us"
            >
              <Phone size={16} />
            </a>
            <a
              href={`https://wa.me/${waNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center text-zinc-300 hover:text-emerald-400 hover:border-emerald-500/50 transition"
              title="WhatsApp"
            >
              <MessageCircle size={16} />
            </a>
            <a
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center text-zinc-300 hover:text-blue-400 hover:border-blue-500/50 transition"
              title="Facebook"
            >
              <FacebookIcon size={16} />
            </a>
            <a
              href={`https://www.instagram.com/${instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center text-zinc-300 hover:text-pink-400 hover:border-pink-500/50 transition"
              title="Instagram"
            >
              <InstagramIcon size={16} />
            </a>
          </div>
        </div>

        {/* Quick Collections */}
        <div className="space-y-3">
          <h5 className="font-bold text-sm text-zinc-200">
            {isAr ? "المجموعات المميزة" : "Popular Collections"}
          </h5>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/#products" className="hover:text-pink-400 transition flex items-center gap-1.5">
                <span>🧩</span>
                <span>{isAr ? "مكعبات نانو وباقات الورد" : "Nano Blocks & Bouquets"}</span>
              </Link>
            </li>
            <li>
              <Link href="/#products" className="hover:text-pink-400 transition flex items-center gap-1.5">
                <span>💎</span>
                <span>{isAr ? "أدوات وستيكرات البيدازلنج" : "Bedazzling Kits & Gems"}</span>
              </Link>
            </li>
            <li>
              <Link href="/#products" className="hover:text-pink-400 transition flex items-center gap-1.5">
                <span>🎀</span>
                <span>{isAr ? "منظمات المكياج والمكتب الكيوت" : "Cute Vanity & Desk Organizers"}</span>
              </Link>
            </li>
            <li>
              <Link href="/#products" className="hover:text-pink-400 transition flex items-center gap-1.5">
                <span>🎨</span>
                <span>{isAr ? "كتب تلوين الجيب وستيكرات 3D" : "Pocket Coloring & 3D Stickers"}</span>
              </Link>
            </li>
            <li>
              <Link href="/#products" className="hover:text-pink-400 transition flex items-center gap-1.5">
                <span>🎁</span>
                <span>{isAr ? "بليند بوكس وبوكسات الهدايا" : "Blind Boxes & Gift Hampers"}</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Quick Services */}
        <div className="space-y-3">
          <h5 className="font-bold text-sm text-zinc-200">
            {isAr ? "خدمات سريعة ومعلومات" : "Quick Services"}
          </h5>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/card" className="hover:text-pink-400 transition flex items-center gap-1.5">
                <CreditCard size={14} className="text-pink-400" />
                <span>{isAr ? "كارت المتجر الرسمي (QR Codes)" : "Official VIP Store Card"}</span>
              </Link>
            </li>
            <li>
              <Link href="/download" className="hover:text-pink-400 transition flex items-center gap-1.5">
                <Download size={14} className="text-pink-400" />
                <span>{isAr ? "تحميل تطبيق الأندرويد (APK)" : "Download Android App"}</span>
              </Link>
            </li>
            <li>
              <Link href="/login" className="hover:text-pink-400 transition flex items-center gap-1.5">
                <Lock size={14} className="text-pink-400" />
                <span>{isAr ? "بوابة المالك والتشغيل" : "Staff & Owner Portal"}</span>
              </Link>
            </li>
            <li>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-400 transition flex items-center gap-1.5"
              >
                <MapPin size={14} className="text-pink-400" />
                <span>{isAr ? "موقعنا على خرائط جوجل 📍" : "Location on Google Maps"}</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Contact & Location */}
        <div className="space-y-3">
          <h5 className="font-bold text-sm text-zinc-200">
            {isAr ? "خدمة العملاء والاتصال" : "Customer Service & Orders"}
          </h5>
          <div className="space-y-2 text-xs">
            <div className="flex items-start gap-2">
              <Phone size={15} className="text-pink-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-mono font-bold text-zinc-200 block text-sm">{phoneDisplay}</span>
                <span className="text-[11px] text-zinc-400">{hoursText}</span>
              </div>
            </div>

            {secondaryPhoneDisplay && (
              <div className="flex items-start gap-2 pt-1">
                <MessageCircle size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-mono font-bold text-zinc-200 block text-xs">
                    واتس وأوردرات: {secondaryPhoneDisplay}
                  </span>
                  <span className="text-[11px] text-zinc-400">استقبال الرسائل 24/7</span>
                </div>
              </div>
            )}

            <div className="pt-2">
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 group hover:text-pink-400 transition"
              >
                <MapPin size={15} className="text-pink-400 shrink-0 mt-0.5 group-hover:scale-110 transition" />
                <span className="text-zinc-300 leading-relaxed text-xs underline decoration-pink-500/40">
                  {addressText}
                </span>
              </a>
            </div>

            <div className="pt-1">
              <span className="inline-block py-1 px-3 rounded-full bg-pink-500/10 border border-pink-500/25 text-pink-300 text-[11px] font-medium">
                طنطا — شحن سريع لكافة محافظات مصر
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-zinc-850 py-4 px-4 text-center text-xs text-zinc-400">
        <p>
          © 2026 ميني بيك (Mini Pick) — متجر الهدايا والترندات اللطيفة. جميع الحقوق محفوظة.
        </p>
        <p className="text-[10px] text-zinc-400 mt-1">
          تم تطوير وتصميم النظام والمنظومة السحابية بواسطة شركة أوركا للحلول البرمجية
        </p>
      </div>
    </footer>
  );
}
