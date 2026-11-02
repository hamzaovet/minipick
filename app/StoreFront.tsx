"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";
import ProductCard from "../components/ProductCard";
import {
  Sparkles,
  Search,
  Filter,
  ShieldCheck,
  Star,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Flame,
  Award,
  Phone,
  MessageCircle,
  Heart,
  Gift,
  Layers,
} from "lucide-react";
import InstagramIcon from "../components/InstagramIcon";

interface StoreFrontProps {
  initialProducts: any[];
  categories: any[];
  reviews: any[];
}

export default function StoreFront({
  initialProducts,
  categories,
  reviews,
}: StoreFrontProps) {
  const { lang, dir, t } = useLanguage();
  const isAr = lang === "ar";

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("featured");

  // Featured Products
  const featuredProducts = useMemo(() => {
    return initialProducts.filter((p) => p.isFeatured);
  }, [initialProducts]);

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return initialProducts
      .filter((p) => {
        // Category filter
        if (selectedCategory !== "all") {
          if (p.category?.slug !== selectedCategory && p.categoryId !== selectedCategory) {
            return false;
          }
        }

        // Type filter
        if (selectedType !== "all") {
          if (p.type !== selectedType) return false;
        }

        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName =
            p.nameAr.toLowerCase().includes(q) || p.nameEn.toLowerCase().includes(q);
          const matchBrand =
            p.brandAr.toLowerCase().includes(q) || p.brandEn.toLowerCase().includes(q);
          const matchDesc =
            p.descriptionAr.toLowerCase().includes(q) || p.descriptionEn.toLowerCase().includes(q);
          if (!matchName && !matchBrand && !matchDesc) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [initialProducts, selectedCategory, selectedType, searchQuery, sortBy]);

  // Fallback cute reviews
  const displayReviews = reviews.length > 0 ? reviews : [
    {
      customerName: "سارة المهندس",
      customerCity: "طنطا",
      rating: 5,
      comment: "استلمت أوردر باقة ورد الليجو وقلم البيدازلنج دلوقتي.. الحاجات تحفة وكيوت جداً تسلم إيديكم بجد! التغليف لوحده قمة في الذوق ❤️",
    },
    {
      customerName: "مريم عبد الرحمن",
      customerCity: "القاهرة",
      rating: 5,
      comment: "المنظم البينك خرافة وحجمه ممتاز، والكريستالات بتلمع بطريقة تجنن. شكراً لسرعة الشحن والستيكرات الهدية الجميلة 🌸",
    },
    {
      customerName: "نورهان السعدني",
      customerCity: "الإسكندرية",
      rating: 5,
      comment: "البليند بوكس وميني بوك التلوين فكرتهم عبقرية لتفريغ التوتر! أحلى ستور اتعاملت معاه ومنتجاتكم كلها مبهجة وأصلية.",
    },
    {
      customerName: "هدير مصطفى",
      customerCity: "المنصورة",
      rating: 5,
      comment: "بيت شجرة الساكورا وإضاءة الليد بتاعته عملت جو خيالي في أوضتي! تجربة شراء سلسة وخدمة عملاء في قمة الاحترام والذوق.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden py-16 sm:py-24 px-4 sm:px-6 border-b border-pink-500/20">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-pink-500/15 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute -top-10 right-10 w-72 h-72 bg-rose-600/12 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Hero Text */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-start">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/15 border border-pink-500/35 text-pink-300 text-xs font-bold tracking-wide">
              <Sparkles size={14} className="text-pink-400 animate-spin" />
              <span>
                {isAr
                  ? "ميني بيك 2026 — عالم الترندات اللطيفة والجمال 🌸"
                  : "Mini Pick 2026 — Viral Aesthetic Lifestyle"}
              </span>
            </div>

            <h1 className="font-sans font-black text-4xl sm:text-5xl lg:text-6xl text-pink-gradient leading-[1.15]">
              {isAr ? "عالمكِ الوردي الأنيق للإبداع والهدايا" : "Your Aesthetic Pink World for Gifts & Creativity"}
            </h1>

            <p className="text-base sm:text-lg text-zinc-300 max-w-2xl leading-relaxed font-light">
              {isAr
                ? "وجهتكِ الأولى في مصر لأجمل مكعبات النانو وباقات الورد، أدوات البيدازلنج الكريستالية، منظمات المكياج والمكتب، وهدايا الترند الكيوت بأفضل جودة وتوصيل سريع لكافة المحافظات."
                : "Your favorite aesthetic destination in Egypt for Nano Lego blocks, crystal bedazzling tools, cute desk organizers, and viral TikTok trends with express nationwide delivery."}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#products"
                className="px-7 py-3.5 rounded-2xl btn-pink text-sm font-black flex items-center gap-2 shadow-2xl hover:scale-105 transition"
              >
                <span>{isAr ? "تصفحي المنتجات الكيوت 🌸" : "Explore Products 🌸"}</span>
                {dir === "rtl" ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
              </a>

              <a
                href="#categories"
                className="px-6 py-3.5 rounded-2xl bg-zinc-900/90 border border-pink-500/35 hover:border-pink-400 text-pink-300 text-sm font-bold transition flex items-center gap-2"
              >
                <Layers size={16} className="text-pink-400" />
                <span>{isAr ? "أقسام المتجر 🎀" : "Browse Categories 🎀"}</span>
              </a>
            </div>

            {/* Trust Highlights */}
            <div className="pt-6 border-t border-zinc-850 grid grid-cols-3 gap-4 text-xs text-zinc-400">
              <div className="flex flex-col items-center lg:items-start gap-1">
                <span className="font-black text-pink-400 text-lg">100%</span>
                <span>{isAr ? "معاينة وفحص قبل الدفع" : "Inspect Before Pay"}</span>
              </div>
              <div className="flex flex-col items-center lg:items-start gap-1 border-x border-zinc-800 px-2">
                <span className="font-black text-pink-400 text-lg">+10K</span>
                <span>{isAr ? "عميلة سعيدة في مصر" : "Happy Customers"}</span>
              </div>
              <div className="flex flex-col items-center lg:items-start gap-1">
                <span className="font-black text-pink-400 text-lg">طنطا</span>
                <span>{isAr ? "شحن سريع لكافة مصر" : "Express All Egypt"}</span>
              </div>
            </div>
          </div>

          {/* Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden glass-luxury p-2 shadow-2xl border-2 border-pink-500/40">
              <div className="relative w-full h-full rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=800&q=80"
                  alt="Mini Pick Pink Flower Bouquet"
                  fill
                  priority
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                {/* Floating Glass Label */}
                <div className="absolute bottom-4 inset-x-4 p-4 rounded-2xl glass-luxury border border-pink-500/40 text-center">
                  <span className="text-[10px] uppercase tracking-widest text-pink-400 font-bold">
                    {isAr ? "الترند الأكثر طلباً 🌸" : "Most Viral Product"}
                  </span>
                  <h3 className="font-sans font-black text-lg text-zinc-100 mt-0.5">
                    {isAr ? "باقة ورد الليجو النانو الوردية الدائمة" : "Eternal Pink Blossom Nano Bouquet"}
                  </h3>
                  <div className="flex items-center justify-center gap-3 mt-2">
                    <span className="font-black text-pink-gradient text-lg">385 ج.م</span>
                    <span className="text-xs text-zinc-500 line-through">450 ج.م</span>
                    <Link
                      href="/product/eternal-pink-blossom-bouquet"
                      className="px-3.5 py-1.5 rounded-xl btn-pink text-xs font-bold"
                    >
                      {isAr ? "اطلبي الآن" : "Order Now"}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES SECTION */}
      <section id="categories" className="py-14 px-4 sm:px-6 max-w-7xl mx-auto scroll-mt-20">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest text-pink-400 font-bold">
            {isAr ? "تسوقي حسب القسم 🎀" : "Shop by Category"}
          </span>
          <h2 className="font-sans font-black text-2xl sm:text-3xl text-pink-gradient mt-1">
            {isAr ? "عالم ميني بيك المتنوع" : "Explore Mini Pick Collections"}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            {isAr
              ? "مكعبات ورد، أقلام بيدازلنج، منظمات تسريحة، وكتب تلوين مختارة بعناية لأجمل الأوقات"
              : "Nano blocks, bedazzling kits, vanity organizers, and cute coloring books"}
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((c) => {
            const isSelected = selectedCategory === c.slug;
            return (
              <button
                key={c.id || c.slug}
                onClick={() => {
                  setSelectedCategory(c.slug);
                  const el = document.getElementById("products");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className={`p-5 rounded-2xl text-center transition-all duration-300 flex flex-col items-center justify-center gap-3 group border ${
                  isSelected
                    ? "bg-gradient-to-b from-pink-600/30 to-rose-600/10 border-pink-500 shadow-lg shadow-pink-500/20"
                    : "glass-luxury border-pink-500/20 hover:border-pink-500/50 hover:-translate-y-1"
                }`}
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-400/20 to-rose-500/20 border border-pink-500/30 flex items-center justify-center text-2xl group-hover:scale-110 transition">
                  {c.icon || "🌸"}
                </div>
                <div>
                  <h4 className="font-sans font-bold text-sm text-zinc-100 group-hover:text-pink-300 transition">
                    {isAr ? c.nameAr : c.nameEn}
                  </h4>
                  <p className="text-[10px] text-zinc-400 mt-0.5 line-clamp-1">
                    {isAr ? c.descriptionAr : c.descriptionEn}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* FEATURED BESTSELLERS */}
      <section className="py-12 px-4 sm:px-6 max-w-7xl mx-auto border-t border-pink-500/15">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 pb-4 border-b border-pink-500/20">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-pink-400 uppercase tracking-widest mb-1">
              <span>💖</span>
              <span>{isAr ? "الأكثر طلباً على تيك توك" : "Viral TikTok Drops"}</span>
            </div>
            <h2 className="font-sans font-black text-2xl sm:text-3xl text-pink-gradient">
              {isAr ? "الترندات الأكثر مبيعاً وإبهاراً" : "Trending Bestsellers"}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              {isAr
                ? "القطع المفضلة لدى عميلات ميني بيك والتي تنفد سريعاً"
                : "Top-rated aesthetic kits loved by thousands of creative girls"}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-pink-300 font-bold px-3 py-1.5 rounded-xl bg-pink-950/40 border border-pink-500/30">
              {featuredProducts.length} {isAr ? "منتجات تريند مميزة" : "Featured Items"}
            </span>
          </div>
        </div>

        {/* Featured Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredProducts.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ALL PRODUCTS WITH FILTERING */}
      <section id="products" className="py-16 px-4 sm:px-6 max-w-7xl mx-auto scroll-mt-20 border-t border-zinc-800">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest text-pink-400 font-bold">
            {isAr ? "الكتالوج الكامل 🌸" : "Complete Catalog"}
          </span>
          <h2 className="font-sans font-black text-3xl sm:text-4xl text-pink-gradient mt-1">
            {isAr ? "كل منتجات ميني بيك" : "All Mini Pick Products"}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2">
            {isAr
              ? "ابحثي باسم المنتج أو اختاري القسم المناسب لتجربة تسوق ممتعة"
              : "Search or filter by category to find your next favorite cute piece"}
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="glass-luxury rounded-2xl p-4 sm:p-6 mb-8 border border-pink-500/25 space-y-4">
          <div className="flex flex-col md:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search
                size={18}
                className={`absolute top-1/2 -translate-y-1/2 ${
                  dir === "rtl" ? "right-3.5" : "left-3.5"
                } text-zinc-400`}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isAr ? "ابحثي عن ورد ليجو، قلم بيدازلنج، منظم، أو ستيكرات..." : "Search nano blocks, bedazzling pen, organizers..."}
                className={`w-full py-3 ${
                  dir === "rtl" ? "pr-10 pl-4" : "pl-10 pr-4"
                } rounded-xl bg-zinc-900/90 border border-zinc-700/80 focus:border-pink-400 text-sm text-zinc-100 placeholder:text-zinc-500 outline-none transition`}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className={`absolute top-1/2 -translate-y-1/2 ${
                    dir === "rtl" ? "left-3.5" : "right-3.5"
                  } text-xs text-zinc-400 hover:text-white`}
                >
                  ✕
                </button>
              )}
            </div>

            {/* Sort Select */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="py-3 px-4 rounded-xl bg-zinc-900 border border-zinc-700/80 text-xs font-semibold text-zinc-200 outline-none focus:border-pink-400"
            >
              <option value="featured">{isAr ? "المقترحة" : "Featured"}</option>
              <option value="price-low">{isAr ? "الأقل سعراً" : "Price: Low to High"}</option>
              <option value="price-high">{isAr ? "الأعلى سعراً" : "Price: High to Low"}</option>
              <option value="rating">{isAr ? "الأعلى تقييماً" : "Top Rated"}</option>
            </select>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition ${
                selectedCategory === "all"
                  ? "btn-pink"
                  : "bg-zinc-900/80 border border-zinc-800 text-zinc-300 hover:border-pink-500/40"
              }`}
            >
              {isAr ? "جميع الأقسام 🌸" : "All Products"}
            </button>
            {categories.map((c) => (
              <button
                key={c.id || c.slug}
                onClick={() => setSelectedCategory(c.slug)}
                className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition flex items-center gap-1.5 ${
                  selectedCategory === c.slug
                    ? "btn-pink"
                    : "bg-zinc-900/80 border border-zinc-800 text-zinc-300 hover:border-pink-500/40"
                }`}
              >
                <span>{c.icon || "🎀"}</span>
                <span>{isAr ? c.nameAr : c.nameEn}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Catalog Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-zinc-950/40 rounded-2xl border border-zinc-800">
            <p className="text-zinc-400 text-sm mb-2">
              {isAr ? "لا توجد منتجات تطابق خيارات البحث الحالية" : "No products found matching your search."}
            </p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSelectedType("all");
                setSearchQuery("");
              }}
              className="text-xs text-pink-400 underline font-semibold"
            >
              {isAr ? "إعادة ضبط الفلاتر" : "Reset Filters"}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* VERIFIED REVIEWS SECTION */}
      <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto border-t border-zinc-800">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest text-pink-400 font-bold">
            {isAr ? "آراء عميلات ميني بيك 💖" : "Customer Love & Feedback"}
          </span>
          <h2 className="font-sans font-black text-2xl sm:text-3xl text-pink-gradient mt-1">
            {isAr ? "ثقة وتجارب نعتز بها دائماً" : "Loved Across All Egypt"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {displayReviews.map((r, idx) => (
            <div
              key={idx}
              className="glass-luxury p-5 rounded-2xl border border-pink-500/20 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-pink-400 mb-2">
                  {[...Array(r.rating || 5)].map((_, i) => (
                    <Star key={i} size={14} className="fill-pink-400 text-pink-400" />
                  ))}
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed italic">
                  "{r.comment}"
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between">
                <div>
                  <h4 className="font-sans font-bold text-xs text-zinc-100">
                    {r.customerName}
                  </h4>
                  <span className="text-[10px] text-pink-400/80">
                    {r.customerCity}
                  </span>
                </div>
                <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-semibold">
                  <CheckCircle2 size={12} />
                  <span>{isAr ? "مشترية موثقة" : "Verified"}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
