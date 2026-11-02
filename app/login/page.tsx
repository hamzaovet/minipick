"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLanguage } from "../../context/LanguageContext";
import { Lock, User, KeyRound, ShieldAlert, ArrowRight, ArrowLeft, Sparkles } from "lucide-react";

export default function LoginPage() {
  const { lang, dir, t } = useLanguage();
  const router = useRouter();
  const isAr = lang === "ar";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!username.trim() || !password.trim() || !pin.trim()) {
      setErrorMessage(
        isAr
          ? "يرجى كتابة اسم المستخدم وكلمة المرور وكود الأمان السري PIN"
          : "Please enter your username, password, and security PIN."
      );
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username.trim(),
          password: password.trim(),
          pin: pin.trim(),
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        // Save user to localStorage for client-side state
        localStorage.setItem("rovy_user", JSON.stringify(data.user));
        window.dispatchEvent(new CustomEvent("rovy_auth_change"));
        router.push("/dashboard");
      } else {
        setErrorMessage(data.error || (isAr ? "فشل تسجيل الدخول" : "Login failed"));
      }
    } catch (err: any) {
      setErrorMessage(
        isAr
          ? "تعذر الاتصال بالخادم، يرجى المحاولة مرة أخرى."
          : "Network connection error, please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md glass-luxury p-8 rounded-3xl border border-pink-500/30 shadow-2xl relative overflow-hidden">
        {/* Subtle Ambient Glow */}
        <div className="absolute -top-12 -right-12 w-36 h-36 bg-pink-500/15 blur-3xl rounded-full pointer-events-none" />

        {/* Brand Icon & Heading */}
        <div className="text-center space-y-2 mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-700 p-0.5 shadow-xl mx-auto flex items-center justify-center">
            <div className="w-full h-full bg-[#0a080e] rounded-[14px] flex items-center justify-center">
              <span className="text-pink-400 font-serif font-black text-2xl">R</span>
            </div>
          </div>

          <h2 className="font-serif font-black text-2xl text-pink-gradient">
            {t("login_title")}
          </h2>
          <p className="text-xs text-zinc-400 font-light">
            {t("login_subtitle")}
          </p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-6 p-3.5 rounded-xl bg-red-950/50 border border-red-500/40 text-red-300 text-xs flex items-start gap-2.5">
            <ShieldAlert size={16} className="shrink-0 mt-0.5 text-red-400" />
            <span className="leading-relaxed">{errorMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} autoComplete="off" className="space-y-4 text-xs">
          {/* Username */}
          <div>
            <label className="block text-zinc-300 font-medium mb-1.5">
              {t("login_user")}
            </label>
            <div className="relative">
              <User
                size={16}
                className={`absolute top-1/2 -translate-y-1/2 ${
                  dir === "rtl" ? "right-3.5" : "left-3.5"
                } text-zinc-400`}
              />
              <input
                type="text"
                required
                autoComplete="off"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={isAr ? "مثال: maestro أو manager" : "e.g. maestro or manager"}
                className={`w-full py-3 ${
                  dir === "rtl" ? "pr-10 pl-4" : "pl-10 pr-4"
                } rounded-xl bg-zinc-900 border border-zinc-700/80 focus:border-pink-400 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none transition font-sans`}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-zinc-300 font-medium mb-1.5">
              {t("login_password")}
            </label>
            <div className="relative">
              <Lock
                size={16}
                className={`absolute top-1/2 -translate-y-1/2 ${
                  dir === "rtl" ? "right-3.5" : "left-3.5"
                } text-zinc-400`}
              />
              <input
                type="password"
                required
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="•••••••••"
                className={`w-full py-3 ${
                  dir === "rtl" ? "pr-10 pl-4" : "pl-10 pr-4"
                } rounded-xl bg-zinc-900 border border-zinc-700/80 focus:border-pink-400 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none transition font-mono`}
              />
            </div>
          </div>

          {/* Security PIN Code */}
          <div>
            <label className="block text-zinc-300 font-medium mb-1.5">
              {t("login_pin")}
            </label>
            <div className="relative">
              <KeyRound
                size={16}
                className={`absolute top-1/2 -translate-y-1/2 ${
                  dir === "rtl" ? "right-3.5" : "left-3.5"
                } text-zinc-400`}
              />
              <input
                type="password"
                required
                maxLength={8}
                autoComplete="off"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="••••••"
                className={`w-full py-3 ${
                  dir === "rtl" ? "pr-10 pl-4" : "pl-10 pr-4"
                } rounded-xl bg-zinc-900 border border-zinc-700/80 focus:border-pink-400 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none transition font-mono tracking-widest`}
              />
            </div>
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl btn-pink text-center text-sm font-black flex items-center justify-center gap-2 shadow-xl disabled:opacity-50"
            >
              {loading ? (
                <span>جاري التحقق من الصلاحيات...</span>
              ) : (
                <>
                  <Sparkles size={16} />
                  <span>{t("login_submit")}</span>
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-6 pt-4 border-t border-zinc-800 text-center">
          <Link href="/" className="text-xs text-zinc-500 hover:text-pink-400 transition">
            {isAr ? "← العودة إلى المتجر" : "← Back to Storefront"}
          </Link>
        </div>
      </div>
    </div>
  );
}
