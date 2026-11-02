"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { printThermalReceipt, PrintableOrder } from "@/components/ThermalReceipt";
import { Printer, ArrowRight, RefreshCw, CheckCircle2 } from "lucide-react";

export default function StandaloneReceiptPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const [order, setOrder] = useState<PrintableOrder | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    async function load() {
      try {
        const res = await fetch(`/api/orders`);
        const data = await res.json();
        const found = (data.orders || []).find((o: any) => o.id === id || o.orderNumber === id);
        if (found) {
          setOrder(found);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-pink-400 flex items-center justify-center">
        <RefreshCw size={28} className="animate-spin mr-2" />
        <span>جاري تحميل إيصال الفاتورة...</span>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-black text-zinc-300 flex flex-col items-center justify-center p-4">
        <h2 className="text-lg font-bold text-red-400 mb-2">عذراً، لم يتم العثور على الفاتورة المطلوبة</h2>
        <button
          onClick={() => router.push("/dashboard")}
          className="px-4 py-2 rounded-xl bg-zinc-800 text-xs font-bold text-pink-400"
        >
          العودة للوحة التحكم
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07050a] text-zinc-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white text-zinc-900 rounded-3xl p-6 shadow-2xl font-mono text-xs border border-pink-500/30">
        <div className="text-center border-b-2 border-black pb-3 mb-3">
          <h2 className="text-lg font-black font-serif">👑 ميني بيك — MINI PICK</h2>
          <p className="text-[11px] font-bold text-zinc-700 mt-0.5">بوتيك الألعاب التركيبية والهدايا الترند</p>
          <div className="mt-2 text-xs font-bold bg-black text-white py-1 px-3 rounded inline-block">
            فاتورة #{order.orderNumber}
          </div>
        </div>

        <div className="space-y-1 text-xs border-b border-dashed border-zinc-400 pb-3 mb-3">
          <div>العميل: <strong>{order.customerName}</strong></div>
          <div>الهاتف: {order.customerPhone || order.phone}</div>
          <div>العنوان: {order.customerCity || order.city}</div>
          <div>التاريخ: {new Date(order.createdAt).toLocaleDateString("ar-EG")}</div>
        </div>

        <div className="space-y-2 border-b border-black pb-3 mb-3">
          <div className="flex justify-between font-bold">
            <span>المجموع الفرعي:</span>
            <span>{order.subtotal} ج.م</span>
          </div>
          {order.deliveryFee > 0 && (
            <div className="flex justify-between">
              <span>الشحن والتوصيل:</span>
              <span>{order.deliveryFee} ج.م</span>
            </div>
          )}
          <div className="flex justify-between text-base font-black border-t border-black pt-2 mt-1">
            <span>الإجمالي:</span>
            <span>{order.totalAmount ?? order.total} ج.م</span>
          </div>
        </div>

        <div className="space-y-2 pt-2">
          <button
            onClick={() => printThermalReceipt(order)}
            className="w-full py-2.5 rounded-xl bg-pink-500 hover:bg-pink-600 text-black font-bold text-xs flex items-center justify-center gap-2"
          >
            <Printer size={16} />
            <span>طباعة الإيصال (80mm)</span>
          </button>
          <button
            onClick={() => router.push("/dashboard")}
            className="w-full py-2 rounded-xl bg-zinc-200 hover:bg-zinc-300 text-zinc-800 text-xs font-bold"
          >
            العودة للداش بورد
          </button>
        </div>
      </div>
    </div>
  );
}
