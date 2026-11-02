"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "../context/LanguageContext";
import { useCart } from "../context/CartContext";
import { useStoreSettings } from "../context/StoreSettingsContext";
import {
  ShoppingBag,
  Menu,
  X,
  Globe,
  Sparkles,
  Phone,
  ShieldCheck,
  CreditCard,
  Download,
  Lock,
  Heart,
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const { lang, toggleLanguage, t } = useLanguage();
  const { totalCount, setIsCartOpen } = useCart();
  const { settings } = useStoreSettings();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Hide Navbar completely on ERP Management & POS routes
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
  const announcementText =
    lang === "ar"
      ? settings.announcementAr || "✨ شحن مجاني لكافة محافظات مصر للطلبات فوق 500 ج.م + هدايا ستيكرات كيوت مع كل أوردر ✨"
      : settings.announcementEn || "✨ Free shipping on orders over 500 EGP + free cute stickers with every order ✨";

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-pink-950/90 via-black to-pink-950/90 border-b border-pink-500/25 py-1.5 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-pink-300 mx-auto sm:mx-0 font-medium">
            <Sparkles size={14} className="text-pink-400 animate-pulse" />
            <span>{announcementText}</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-zinc-400">
            <a
              href={`tel:${phoneDisplay}`}
              className="flex items-center gap-1.5 hover:text-pink-400 transition"
            >
              <Phone size={12} />
              <span>{phoneDisplay}</span>
            </a>
            <span className="text-zinc-600">•</span>
            <div className="flex items-center gap-1 text-emerald-400">
              <ShieldCheck size={13} />
              <span>{lang === "ar" ? "معاينة الشحنة قبل الاستلام مع المندوب" : "Inspect Order Before Paying"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="glass-luxury border-b border-pink-500/20 py-3 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-pink-400 via-rose-500 to-pink-600 p-0.5 shadow-lg shadow-pink-500/30 group-hover:scale-105 transition">
              <div className="w-full h-full bg-[#140e1a] rounded-[14px] flex items-center justify-center">
                <span className="text-pink-400 font-sans font-black text-sm tracking-tighter">MP</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-sans font-black text-lg sm:text-xl tracking-tight text-pink-gradient">
                {lang === "ar" ? "ميني بيك" : "Mini Pick"}
              </span>
              <span className="text-[10px] tracking-widest uppercase text-pink-400/90 font-medium -mt-0.5">
                {lang === "ar" ? "بوتيك الهدايا والترندات اللطيفة" : "Aesthetic Gifts & Lifestyle"}
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-6 text-xs font-bold text-zinc-300">
            <Link
              href="/"
              className={`hover:text-pink-400 transition ${pathname === "/" ? "text-pink-400 font-black" : ""}`}
            >
              {lang === "ar" ? "الرئيسية" : "Home"}
            </Link>

            <Link
              href="/#categories"
              className="hover:text-pink-400 transition"
            >
              {lang === "ar" ? "أقسام المتجر 🎀" : "Categories 🎀"}
            </Link>

            <Link
              href="/#products"
              className="hover:text-pink-400 transition"
            >
              {lang === "ar" ? "كل المنتجات 🌸" : "All Products 🌸"}
            </Link>

            <Link
              href="/card"
              className={`flex items-center gap-1.5 hover:text-pink-400 transition ${
                pathname === "/card" ? "text-pink-400 font-black" : ""
              }`}
            >
              <CreditCard size={14} className="text-pink-400" />
              <span>{lang === "ar" ? "كارت المتجر" : "VIP Card"}</span>
            </Link>

            <Link
              href="/download"
              className={`flex items-center gap-1.5 hover:text-pink-400 transition ${
                pathname === "/download" ? "text-pink-400 font-black" : ""
              }`}
            >
              <Download size={14} className="text-pink-400" />
              <span>{lang === "ar" ? "تحميل التطبيق" : "Get App"}</span>
            </Link>
          </div>

          {/* Actions: Lang, Login, Cart, Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 py-1.5 px-3 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-xs font-semibold hover:bg-pink-500/20 transition"
              title="Toggle Language"
            >
              <Globe size={13} />
              <span>{lang === "ar" ? "English" : "العربية"}</span>
            </button>

            {/* Admin / Owner Login Link */}
            <Link
              href="/login"
              className="hidden sm:flex items-center gap-1.5 py-1.5 px-3 rounded-full bg-zinc-900 border border-zinc-700 hover:border-pink-500/50 text-zinc-300 hover:text-white text-xs font-medium transition"
            >
              <Lock size={12} className="text-pink-400" />
              <span>{lang === "ar" ? "دخول الإدارة" : "Dashboard"}</span>
            </Link>

            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-xl bg-gradient-to-r from-pink-500/20 to-rose-500/20 border border-pink-500/40 text-pink-300 hover:text-white transition group"
              aria-label="Shopping Cart"
            >
              <ShoppingBag size={19} className="group-hover:scale-110 transition" />
              {totalCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 text-white font-mono text-[10px] font-black flex items-center justify-center shadow-lg shadow-pink-500/50 animate-bounce">
                  {totalCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-pink-500/20 space-y-2 px-2 pb-2">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 px-3 rounded-lg text-sm font-semibold hover:bg-pink-500/10 hover:text-pink-400 transition"
            >
              {lang === "ar" ? "الرئيسية" : "Home"}
            </Link>

            <Link
              href="/#categories"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 px-3 rounded-lg text-sm font-semibold hover:bg-pink-500/10 hover:text-pink-400 transition"
            >
              {lang === "ar" ? "أقسام المتجر 🎀" : "Categories 🎀"}
            </Link>

            <Link
              href="/#products"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 px-3 rounded-lg text-sm font-semibold hover:bg-pink-500/10 hover:text-pink-400 transition"
            >
              {lang === "ar" ? "كل المنتجات 🌸" : "All Products 🌸"}
            </Link>

            <Link
              href="/card"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 py-2 px-3 rounded-lg text-sm font-semibold hover:bg-pink-500/10 hover:text-pink-400 transition"
            >
              <CreditCard size={16} className="text-pink-400" />
              <span>{lang === "ar" ? "كارت المتجر الرسمي" : "VIP Store Card"}</span>
            </Link>

            <Link
              href="/download"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 py-2 px-3 rounded-lg text-sm font-semibold hover:bg-pink-500/10 hover:text-pink-400 transition"
            >
              <Download size={16} className="text-pink-400" />
              <span>{lang === "ar" ? "تحميل تطبيق الأندرويد" : "Download Android App"}</span>
            </Link>

            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 py-2 px-3 rounded-lg text-sm font-semibold bg-pink-500/15 border border-pink-500/30 text-pink-300 transition"
            >
              <Lock size={15} />
              <span>{lang === "ar" ? "دخول المالك والإدارة" : "Staff & Owner Portal"}</span>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
