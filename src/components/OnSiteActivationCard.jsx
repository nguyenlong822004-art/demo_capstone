"use client";

import React from "react";
import { Navigation, QrCode } from "lucide-react";

/**
 * OnSiteActivationCard
 * Khối kích hoạt tại chỗ - Cốt lõi của đề tài Du lịch Văn hóa Việt Nam
 * 
 * Props:
 * - onCheckInGPS: function() - Xử lý khi nhấn nút "Định vị GPS"
 * - onScanQR: function() - Xử lý khi nhấn nút "Quét mã QR"
 */
export default function OnSiteActivationCard({
  onCheckInGPS = () => {},
  onScanQR = () => {},
}) {
  return (
    <section
      aria-label="Khối kích hoạt trải nghiệm thực tế"
      className="rounded-2xl bg-emerald-50/70 border border-emerald-200 p-4 shadow-sm transition-all hover:shadow-md"
    >
      {/* Tiêu đề có vạch xanh lá đứng */}
      <div className="flex items-center gap-2 mb-1.5">
        <span className="w-1 h-4 bg-emerald-600 rounded-full flex-shrink-0" />
        <h2 className="text-xs font-bold text-emerald-900 tracking-wider uppercase">
          TRẢI NGHIỆM THỰC TẾ TẠI ĐIỂM ĐẾN
        </h2>
      </div>

      {/* Mô tả ngắn gọn tính năng */}
      <p className="text-xs text-slate-600 leading-relaxed pl-3 mb-3">
        
      </p>

      {/* 2 nút bấm thao tác lớn, chia đều 2 cột */}
      <div className="grid grid-cols-2 gap-3 pl-3">
        {/* Nút 1: [Định vị GPS] */}
        <button
          type="button"
          onClick={onCheckInGPS}
          className="flex items-center justify-center gap-2 py-2.5 px-3 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold shadow-sm active:scale-95 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-1"
        >
          <Navigation size={16} className="text-white flex-shrink-0" />
          <span>Định vị GPS</span>
        </button>

        {/* Nút 2: [Quét mã QR] */}
        <button
          type="button"
          onClick={onScanQR}
          className="flex items-center justify-center gap-2 py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm active:scale-95 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1"
        >
          <QrCode size={16} className="text-white flex-shrink-0" />
          <span>Quét mã QR</span>
        </button>
      </div>
    </section>
  );
}
