"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Compass, Plus, ArrowRight, Sparkles } from "lucide-react";

/**
 * Trang Lộ Trình Văn Hóa (Provider Routes)
 * Chuyển hướng hoặc mở nhanh Route Builder
 */
export default function ProviderRoutesPage() {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-5 bg-sky-600 rounded-full" />
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Lộ Trình Văn Hóa & Tour Di Sản
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Quản lý và thiết kế các tuyến tham quan kết nối các di tích lịch sử và làng nghề truyền thống.
          </p>
        </div>

        <Link
          href="/provider/routes/builder"
          className="bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-sm shadow-emerald-600/25 text-xs sm:text-sm transition-all cursor-pointer self-start sm:self-auto"
        >
          <Plus size={18} strokeWidth={2.4} />
          <span>Thiết kế Lộ trình mới (Builder)</span>
        </Link>
      </div>

      {/* Card nổi bật giới thiệu Route Builder */}
      <div className="bg-gradient-to-br from-sky-50 via-emerald-50/40 to-slate-50 border border-sky-200/80 rounded-3xl p-6 sm:p-8 text-slate-800 relative overflow-hidden">
        <div className="max-w-xl">
          <span className="px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-extrabold uppercase tracking-wider">
            Công Cụ Thiết Kế Tour Tương Tác
          </span>
          <h2 className="text-lg sm:text-xl font-black text-slate-900 mt-3 leading-snug">
            Tạo Lộ trình Di sản thông minh với Route Builder
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
            Sắp xếp các trạm dừng chân di tích (Khuê Văn Các ➜ Giếng Thiên Quang ➜ Nhà Thái Học), tính toán khoảng cách tự động và gắn kèm nhiệm vụ quiz nhận điểm thưởng cho du khách.
          </p>

          <div className="mt-5">
            <Link
              href="/provider/routes/builder"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-sky-600/20 transition-all"
            >
              <Compass size={16} />
              <span>Mở Trình Thiết Kế Lộ Trình (Route Builder)</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
