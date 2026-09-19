"use client";

import React from "react";
import Link from "next/link";
import { Trophy, Ticket, BookOpen } from "lucide-react";
import CuteAIMascot from "./CuteAIMascot";

/**
 * DashboardGrid
 * Lưới 4 ô màu phẳng pastel bo góc - Tiện ích trải nghiệm du lịch văn hóa
 * Ô đầu tiên nổi bật với Linh vật AI Chatbot Chibi đội nón lá Việt Nam
 * 
 * Props:
 * - onSelectUtility: function(utilityId, label) - Callback khi bấm vào tiện ích
 */
export default function DashboardGrid({ onSelectUtility = () => {} }) {
  const utilities = [
    {
      id: "ai_guide",
      label: "Hỏi AI Hướng Dẫn",
      desc: "Trợ lý ảo 24/7",
      isMascot: true,
      boxBg: "bg-cyan-50 border border-cyan-200/60",
    },
    {
      id: "heritage_quiz",
      label: "Giải Đố Di Sản",
      desc: "Tích điểm đổi quà",
      boxBg: "bg-amber-50 border border-amber-200/60",
      iconColor: "text-amber-600",
      icon: Trophy,
    },
    {
      id: "tickets_cost",
      label: "Vé & Chi Phí",
      desc: "Bảng giá minh bạch",
      boxBg: "bg-rose-50 border border-rose-200/60",
      iconColor: "text-rose-500",
      icon: Ticket,
      href: "/profile", // Điều hướng sang trang Profile (section Vé & Chi Phí)
    },
    {
      id: "tour_journal",
      label: "Nhật Ký Tour",
      desc: "Lưu dấu hành trình",
      boxBg: "bg-indigo-50 border border-indigo-200/60",
      iconColor: "text-indigo-500",
      icon: BookOpen,
      href: "/journey-log", // Điều hướng sang trang Nhật Ký Tour
    },
  ];

  return (
    <section aria-label="Tiện ích trải nghiệm" className="space-y-2.5">
      {/* ── Tiêu đề nhóm có vạch màu ── */}
      <div className="flex items-center gap-2">
        <span className="w-1 h-4 bg-teal-500 rounded-full flex-shrink-0" />
        <h2 className="text-xs font-bold text-slate-800 tracking-wider uppercase">
          TIỆN ÍCH TRẢI NGHIỆM
        </h2>
      </div>

      {/* ── Lưới 4 ô chuẩn phong cách ứng dụng thương mại hiện đại (2x2) ── */}
      <div className="grid grid-cols-2 gap-3">
        {utilities.map((item) => {
          // Ô đặc biệt: Linh vật AI Chatbot Chibi dễ thương
          if (item.isMascot) {
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectUtility(item.id, item.label)}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm p-3 flex items-center gap-3 hover:shadow-md hover:border-slate-200 active:scale-[0.98] transition-all cursor-pointer text-left group"
              >
                {/* Hộp icon linh vật AI pastel nhạt */}
                <div className={`w-11 h-11 rounded-xl ${item.boxBg} flex-shrink-0 flex items-center justify-center group-hover:scale-105 transition-transform`}>
                  <CuteAIMascot size="sm" withHat={true} isFloating={true} />
                </div>

                {/* Tiêu đề & mô tả */}
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-slate-800 leading-tight group-hover:text-sky-600 transition-colors truncate">
                    {item.label}
                  </p>
                  <p className="text-[10px] text-slate-400 font-medium mt-0.5 leading-none flex items-center gap-1 truncate">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {item.desc}
                  </p>
                </div>
              </button>
            );
          }

          const Icon = item.icon;

          // Ô điều hướng sang trang riêng (journey-log / profile)
          if (item.href) {
            return (
              <Link
                key={item.id}
                href={item.href}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm p-3 flex items-center gap-3 hover:shadow-md hover:border-slate-200 active:scale-[0.98] transition-all cursor-pointer text-left group"
              >
                <div
                  className={`w-11 h-11 rounded-xl ${item.boxBg} flex items-center justify-center ${item.iconColor} flex-shrink-0 transition-transform group-hover:scale-105`}
                >
                  <Icon size={20} strokeWidth={2} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-slate-800 leading-tight group-hover:text-slate-900 truncate">
                    {item.label}
                  </p>
                  <p className="text-[10px] text-slate-400 font-medium mt-0.5 leading-none truncate">
                    {item.desc}
                  </p>
                </div>
              </Link>
            );
          }

          // Ô callback thông thường
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectUtility(item.id, item.label)}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm p-3 flex items-center gap-3 hover:shadow-md hover:border-slate-200 active:scale-[0.98] transition-all cursor-pointer text-left group"
            >
              {/* Khung vuông bo tròn rounded-xl w-11 h-11 dùng màu nền pastel nhạt kết hợp icon nét mảnh */}
              <div
                className={`w-11 h-11 rounded-xl ${item.boxBg} flex items-center justify-center ${item.iconColor} flex-shrink-0 transition-transform group-hover:scale-105`}
              >
                <Icon size={20} strokeWidth={2} />
              </div>

              {/* Tiêu đề text-xs font-bold và dòng mô tả text-[10px] text-slate-400 font-medium */}
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-slate-800 leading-tight group-hover:text-slate-900 truncate">
                  {item.label}
                </p>
                <p className="text-[10px] text-slate-400 font-medium mt-0.5 leading-none truncate">
                  {item.desc}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
