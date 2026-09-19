"use client";

import React, { useState } from "react";
import { ChevronRight, Award, CheckCircle2, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { unlockedBadges as defaultBadges } from "@/data/userProfileMockData";

/**
 * BadgeCollection
 * Bộ sưu tập huy hiệu di sản văn hóa đã mở khóa của du khách
 * Phong cách Cổng thông tin du lịch Việt Nam: Tươi sáng, mềm mại, pastel tinh tế
 * 
 * Props:
 * - badges: Danh sách huy hiệu (mặc định lấy từ userProfileMockData.js)
 * - onViewAll: Function xử lý khi nhấn "Xem tất cả"
 */
export default function BadgeCollection({
  badges = defaultBadges,
  onViewAll = () => {},
}) {
  const { t } = useLanguage();
  const [selectedBadge, setSelectedBadge] = useState(null);

  return (
    <section aria-label="Bộ sưu tập huy hiệu di sản" className="space-y-3">
      {/* ── Tiêu đề có vạch xanh & nút 'Xem tất cả' ── */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Vạch xanh lá đặc trưng */}
          <span className="w-1 h-4 bg-emerald-600 rounded-full flex-shrink-0" />
          <h2 className="text-xs font-bold text-slate-800 tracking-wider uppercase">
            {t("badgeCollectionTitle")}
          </h2>
        </div>

        <button
          type="button"
          onClick={onViewAll}
          className="text-xs font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-0.5 transition-colors cursor-pointer active:scale-95"
        >
          <span>{t("viewAll")}</span>
          <ChevronRight size={14} />
        </button>
      </div>

      {/* ── Lưới 4 cột huy hiệu dạng huân chương di sản thật ── */}
      <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-sm">
        <div className="grid grid-cols-4 gap-2.5">
          {badges.map((badge) => (
            <button
              key={badge.id}
              type="button"
              onClick={() => setSelectedBadge(badge)}
              className="flex flex-col items-center text-center group cursor-pointer active:scale-95 transition-transform"
              title={`${badge.name} - Bấm xem chi tiết`}
            >
              {/* Huy hiệu dạng huy chương kim loại cao cấp bọc ảnh chụp thật */}
              <div className="w-14 h-14 rounded-full p-0.5 bg-gradient-to-tr from-amber-400 via-amber-200 to-amber-500 shadow-md relative group-hover:scale-110 transition-transform duration-300">
                <div className="w-full h-full rounded-full overflow-hidden border-2 border-white bg-slate-100 flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={badge.imageUrl}
                    alt={badge.name}
                    className="w-full h-full object-cover object-center"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>

                {/* Dấu tích xanh nhỏ đã đạt */}
                <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center border-2 border-white text-[9px] shadow-2xs">
                  <CheckCircle2 size={10} strokeWidth={3} />
                </span>
              </div>

              {/* Tên huy hiệu chữ nhỏ phía dưới */}
              <span className="text-[10.5px] font-bold text-slate-700 mt-2 leading-snug line-clamp-2 px-0.5 group-hover:text-emerald-700 transition-colors">
                {badge.name}
              </span>

              {/* Danh mục tag nhỏ */}
              <span className="text-[9px] text-slate-400 font-medium mt-0.5 leading-none">
                {badge.category}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Modal Pop-up Chi Tiết Huy Hiệu Khi Người Dùng Bấm Vào ── */}
      {selectedBadge && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedBadge(null)}
        >
          <div
            className="w-full max-w-xs bg-white rounded-3xl p-5 shadow-2xl border border-slate-100 text-center relative animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Nút đóng */}
            <button
              type="button"
              onClick={() => setSelectedBadge(null)}
              className="absolute top-3.5 right-3.5 w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Đóng"
            >
              <X size={15} />
            </button>

            {/* Huy chương lớn với ảnh chụp di tích thật */}
            <div className="w-20 h-20 mx-auto rounded-full p-1 bg-gradient-to-tr from-amber-400 via-amber-200 to-amber-500 shadow-lg mb-3">
              <div className="w-full h-full rounded-full overflow-hidden border-2 border-white bg-slate-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedBadge.imageUrl}
                  alt={selectedBadge.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Tên & Tag */}
            <span className="inline-block text-[9.5px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 mb-1">
              {selectedBadge.category}
            </span>
            <h3 className="text-sm font-extrabold text-slate-800">
              {selectedBadge.name}
            </h3>

            {/* Mô tả chi tiết */}
            <p className="text-xs text-slate-600 mt-2 leading-relaxed px-1">
              {selectedBadge.description}
            </p>

            {/* Ngày nhận */}
            <p className="text-[10px] text-slate-400 font-medium mt-3 pt-2 border-t border-slate-100">
              Đạt được ngày: <b>{selectedBadge.earnedAt}</b>
            </p>

            {/* Nút đóng */}
            <button
              type="button"
              onClick={() => setSelectedBadge(null)}
              className="w-full mt-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              Đã hiểu
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
