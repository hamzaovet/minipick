"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";
import { useCart } from "../context/CartContext";
import { ShoppingBag, Star, Zap, Eye, Sparkles, Heart } from "lucide-react";

interface ProductCardProps {
  product: any;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { lang, t } = useLanguage();
  const { addToCart } = useCart();
  const isAr = lang === "ar";

  return (
    <div className="group glass-luxury rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-pink-500/20 border border-pink-500/25">
      {/* Top Image Container */}
      <div className="relative aspect-[3/4] w-full bg-[#181120] overflow-hidden">
        <Link href={`/product/${product.slug}`} className="block w-full h-full">
          <Image
            src={product.image || "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=800&q=80"}
            alt={isAr ? product.nameAr : product.nameEn}
            fill
            className="object-cover group-hover:scale-108 transition-transform duration-500"
          />
        </Link>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between gap-2 z-10 pointer-events-none">
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-pink-500/25 border border-pink-400/40 text-pink-200 backdrop-blur-md">
            {product.type || (isAr ? "منتج كيوت" : "Cute Item")}
          </span>

          {product.isFeatured && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-500/30 border border-rose-400/50 text-rose-200 backdrop-blur-md flex items-center gap-1 shadow-sm">
              <span>💖</span>
              <span>{isAr ? "ترند تيك توك" : "Viral"}</span>
            </span>
          )}
        </div>

        {/* Quick View Button on Hover */}
        <Link
          href={`/product/${product.slug}`}
          className="absolute bottom-3 right-3 p-2.5 rounded-xl bg-black/70 border border-pink-500/40 text-pink-300 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md hover:bg-pink-500 hover:text-white"
          title="Quick View"
        >
          <Eye size={16} />
        </Link>
      </div>

      {/* Content Area */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Volume/Pieces */}
          <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
            <span className="font-bold text-pink-400 tracking-wider text-[11px]">
              {isAr ? product.brandAr : product.brandEn}
            </span>
            <span className="text-[10px] text-zinc-400 font-medium">
              {product.volume || product.concentration}
            </span>
          </div>

          {/* Product Title */}
          <Link href={`/product/${product.slug}`}>
            <h3 className="font-sans font-bold text-base text-zinc-100 group-hover:text-pink-300 transition line-clamp-1 leading-snug">
              {isAr ? product.nameAr : product.nameEn}
            </h3>
          </Link>

          {/* Description Preview */}
          <p className="text-xs text-zinc-400 mt-1.5 line-clamp-2 leading-relaxed">
            {isAr ? product.descriptionAr : product.descriptionEn}
          </p>

          {/* Highlights / Specs Badges */}
          <div className="mt-2.5 flex flex-wrap gap-1">
            {product.topNotesAr && (
              <span className="px-2 py-0.5 rounded-md bg-pink-950/40 border border-pink-500/20 text-[10px] text-pink-200">
                {isAr ? product.topNotesAr.split("،")[0] : product.topNotesEn?.split(",")[0]}
              </span>
            )}
            {product.baseNotesAr && (
              <span className="px-2 py-0.5 rounded-md bg-zinc-900 border border-zinc-750 text-[10px] text-zinc-300">
                {isAr ? product.baseNotesAr.split("،")[0] : product.baseNotesEn?.split(",")[0]}
              </span>
            )}
          </div>
        </div>

        {/* Pricing & Actions */}
        <div className="mt-4 pt-3 border-t border-zinc-850">
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="font-sans font-black text-lg text-pink-gradient">
                  {product.price} ج.م
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-xs text-zinc-500 line-through">
                    {product.originalPrice} ج.م
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-1 text-pink-400 text-xs font-bold">
              <Star size={13} className="fill-pink-400 text-pink-400" />
              <span>{product.rating}</span>
              <span className="text-zinc-500 text-[10px]">({product.reviewsCount})</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => addToCart(product, 1)}
              className="py-2.5 px-3 rounded-xl bg-zinc-900 border border-pink-500/35 hover:border-pink-400 text-pink-300 hover:bg-pink-500/15 text-xs font-bold flex items-center justify-center gap-1.5 transition"
            >
              <ShoppingBag size={14} />
              <span>{isAr ? "أضف للسلة" : "Add to Bag"}</span>
            </button>

            <Link
              href={`/product/${product.slug}`}
              className="py-2.5 px-3 rounded-xl btn-pink text-xs font-black flex items-center justify-center gap-1.5 text-center shadow-md hover:scale-102 transition"
            >
              <Zap size={14} />
              <span>{isAr ? "تفاصيل وطلب" : "View & Buy"}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
