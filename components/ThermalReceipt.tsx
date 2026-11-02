"use client";

import React from "react";
import { Printer, X } from "lucide-react";
import { playSound } from "@/lib/sounds";

export interface PrintableOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone?: string;
  phone?: string;
  customerAddress?: string;
  address?: string;
  customerCity?: string;
  city?: string;
  orderType?: string;
  status: string;
  items: string | any[];
  subtotal: number;
  deliveryFee: number;
  totalAmount?: number;
  total?: number;
  paymentMethod: string;
  notes?: string;
  cashierName?: string;
  courierName?: string;
  createdAt: string;
}

interface ThermalReceiptModalProps {
  order: PrintableOrder | null;
  onClose: () => void;
}

export function printThermalReceipt(order: PrintableOrder, hotline?: string) {
  playSound("cash");

  const parsedItems: Array<{
    nameAr?: string;
    nameEn?: string;
    quantity?: number;
    qty?: number;
    price?: number;
    unitPrice?: number;
    volume?: string;
    type?: string;
  }> = (() => {
    try {
      return typeof order.items === "string" ? JSON.parse(order.items) : order.items;
    } catch {
      return [];
    }
  })();

  const dateObj = new Date(order.createdAt);
  const formattedDate = dateObj.toLocaleDateString("ar-EG", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const formattedTime = dateObj.toLocaleTimeString("ar-EG", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const total = order.totalAmount ?? order.total ?? 0;
  const phone = order.customerPhone || order.phone || "";
  const address = order.customerAddress || order.address || "";
  const city = order.customerCity || order.city || "";

  const paymentText =
    order.paymentMethod === "INSTAPAY"
      ? "إنستاباي (InstaPay)"
      : order.paymentMethod === "VODAFONE_CASH"
      ? "محفظة إلكترونية"
      : order.paymentMethod === "VISA"
      ? "فيزا / بطاقة بنكية"
      : "الدفع نقداً عند الاستلام (COD)";

  const orderTypeBadge =
    order.orderType === "pos"
      ? "فاتورة كاشير صالة البوتيك"
      : order.orderType === "takeaway"
      ? "استلام فوري من البوتيك"
      : "شحن وتوصيل للمنزل (Delivery)";

  const printWindow = window.open("", "_blank", "width=400,height=600");
  if (!printWindow) {
    alert("يرجى السماح بالنوافذ المنبثقة لطباعة الفاتورة");
    return;
  }

  const itemsHtml = parsedItems
    .map(
      (item) => `
      <tr style="border-bottom: 1px dashed #bbb;">
        <td style="padding: 6px 0; text-align: right; vertical-align: top;">
          <strong style="font-size: 13px;">${item.nameAr || item.nameEn || "عطر فاخر"}</strong>
          <div style="font-size: 11px; color: #555;">${item.volume || "100 ml"} ${
        item.type ? `• ${item.type}` : ""
      }</div>
        </td>
        <td style="padding: 6px 0; text-align: center; vertical-align: top; font-weight: bold;">
          ${item.quantity || item.qty || 1}
        </td>
        <td style="padding: 6px 0; text-align: left; vertical-align: top; font-weight: bold;">
          ${(item.price || item.unitPrice || 0) * (item.quantity || item.qty || 1)} ج.م
        </td>
      </tr>
    `
    )
    .join("");

  const html = `
    <!DOCTYPE html>
    <html dir="rtl" lang="ar">
    <head>
      <meta charset="utf-8" />
      <title>فاتورة ${order.orderNumber} - ميني بيك</title>
      <style>
        @page {
          size: 80mm auto;
          margin: 0;
        }
        body {
          font-family: 'Cairo', 'Segoe UI', Tahoma, sans-serif;
          width: 76mm;
          margin: 0 auto;
          padding: 8mm 2mm;
          color: #000;
          font-size: 12px;
          line-height: 1.35;
          background: #fff;
        }
        .header {
          text-align: center;
          border-bottom: 2px solid #000;
          padding-bottom: 8px;
          margin-bottom: 8px;
        }
        .brand {
          font-size: 18px;
          font-weight: 900;
          letter-spacing: 0.5px;
          margin: 0;
        }
        .subbrand {
          font-size: 11px;
          font-weight: bold;
          color: #333;
          margin: 2px 0 0 0;
        }
        .order-badge {
          display: inline-block;
          font-size: 12px;
          font-weight: 900;
          padding: 2px 8px;
          border: 1px solid #000;
          border-radius: 4px;
          margin: 6px 0;
        }
        .info-row {
          display: flex;
          justify-content: space-between;
          font-size: 11px;
          margin-bottom: 3px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin: 10px 0;
        }
        th {
          font-size: 11px;
          border-bottom: 1.5px solid #000;
          padding: 4px 0;
        }
        .totals {
          border-top: 1.5px solid #000;
          padding-top: 6px;
          margin-top: 6px;
        }
        .total-row {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          margin-bottom: 3px;
        }
        .grand-total {
          font-size: 16px;
          font-weight: 900;
          border-top: 2px solid #000;
          border-bottom: 2px solid #000;
          padding: 6px 0;
          margin-top: 6px;
        }
        .footer {
          text-align: center;
          margin-top: 14px;
          border-top: 1px dashed #666;
          padding-top: 8px;
          font-size: 10.5px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1 class="brand">👑 ميني بيك — MINI PICK</h1>
        <p class="subbrand">بوتيك العطور العالمية والبدائل الملكية الفاخرة</p>
        <div class="order-badge">${orderTypeBadge}</div>
        <div style="font-size: 14px; font-weight: 900; margin-top: 4px;">رقم الفاتورة: #${order.orderNumber}</div>
      </div>

      <div class="info-row">
        <span>التاريخ: ${formattedDate}</span>
        <span>الوقت: ${formattedTime}</span>
      </div>
      <div class="info-row">
        <span>العميل: <strong>${order.customerName}</strong></span>
        <span>الهاتف: ${phone}</span>
      </div>
      ${
        city || address
          ? `<div class="info-row"><span>العنوان: ${city} ${address ? `- ${address}` : ""}</span></div>`
          : ""
      }
      ${
        order.cashierName
          ? `<div class="info-row"><span>الكاشير: ${order.cashierName}</span></div>`
          : ""
      }

      <table>
        <thead>
          <tr>
            <th style="text-align: right;">الصنف</th>
            <th style="text-align: center;">الكمية</th>
            <th style="text-align: left;">السعر</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
        </tbody>
      </table>

      <div class="totals">
        <div class="total-row">
          <span>المجموع الفرعي:</span>
          <span>${order.subtotal} ج.م</span>
        </div>
        ${
          order.deliveryFee > 0
            ? `<div class="total-row"><span>مصاريف الشحن والتوصيل:</span><span>${order.deliveryFee} ج.م</span></div>`
            : ""
        }
        <div class="total-row grand-total">
          <span>الإجمالي النهائي المطلوب:</span>
          <span>${total} ج.م</span>
        </div>
        <div class="total-row" style="margin-top: 6px; font-weight: bold;">
          <span>طريقة الدفع:</span>
          <span>${paymentText}</span>
        </div>
      </div>

      ${
        order.notes
          ? `<div style="margin-top: 8px; padding: 4px; background: #eee; font-size: 11px;"><strong>ملاحظات:</strong> ${order.notes}</div>`
          : ""
      }

      <div class="footer">
        <p style="font-weight: bold; margin: 2px 0;">✨ شكراً لاختياركم ميني بيك ✨</p>
        <p style="margin: 2px 0;">استمتعوا بتجربة عطرية لا تُنسى وصعوبة التركيب يدوم طويلاً</p>
        <p style="margin: 4px 0 0 0; font-size: 10px;">${hotline ? `خدمة العملاء والواتساب: ${hotline}` : "ميني بيك — بوتيك الألعاب التركيبية والهدايا الترند"}</p>
      </div>

      <script>
        window.onload = function() {
          window.print();
          setTimeout(function() {
            window.close();
          }, 800);
        };
      </script>
    </body>
    </html>
  `;

  printWindow.document.write(html);
  printWindow.document.close();
}

export default function ThermalReceiptModal({ order, onClose }: ThermalReceiptModalProps) {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-[#120f1d] border border-pink-500/30 rounded-2xl p-5 shadow-2xl relative text-zinc-200">
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-1 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white"
        >
          <X size={18} />
        </button>

        <h3 className="text-base font-bold text-pink-400 font-serif mb-4 flex items-center gap-2">
          <Printer size={18} />
          <span>معاينة ريسيت حراري (80mm)</span>
        </h3>

        <div className="bg-white text-zinc-900 rounded-xl p-4 font-mono text-xs max-h-[60vh] overflow-y-auto border border-zinc-300">
          <div className="text-center border-b border-zinc-400 pb-2 mb-2">
            <div className="font-bold text-sm">👑 ميني بيك — MINI PICK</div>
            <div className="text-[10px] text-zinc-600">بوتيك الألعاب التركيبية والهدايا الترند</div>
            <div className="text-[11px] font-bold mt-1">فاتورة: #{order.orderNumber}</div>
          </div>

          <div className="space-y-1 text-[11px]">
            <div>العميل: {order.customerName}</div>
            <div>الهاتف: {order.customerPhone || order.phone}</div>
            <div>المجموع: {order.totalAmount ?? order.total} ج.م</div>
          </div>
        </div>

        <div className="flex gap-3 mt-4">
          <button
            onClick={() => {
              printThermalReceipt(order);
              onClose();
            }}
            className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-700 text-black font-bold text-xs flex items-center justify-center gap-2 shadow-lg hover:brightness-110"
          >
            <Printer size={16} />
            <span>طباعة الآن (80mm)</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-zinc-800 text-zinc-300 text-xs font-medium hover:bg-zinc-700"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
}
