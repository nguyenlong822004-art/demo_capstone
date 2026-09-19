"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  MapPin,
  Bot,
  Camera,
  History,
  LogOut,
  Search,
  Bell,
  Menu,
  X,
  ExternalLink,
  ChevronRight,
  Sparkles,
} from "lucide-react";

/**
 * Layout Làm Việc Của Content Moderator (Kiểm Duyệt Viên) - VietCulture
 * - Sidebar cố định bên trái (w-64 bg-white border-r border-slate-200)
 * - Topbar trên cùng với thanh tìm kiếm mã hồ sơ, chuông khẩn cấp và trạng thái trực thẩm định
 */
export default function ModeratorLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  // State điều khiển drawer trên mobile/tablet
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [topSearch, setTopSearch] = useState("");
  const [hasUrgentAlerts, setHasUrgentAlerts] = useState(true);

  // 5 mục menu điều hướng chuyên biệt chuẩn yêu cầu
  const moderatorNavItems = [
    {
      id: "overview",
      label: "Bàn làm việc tổng quan",
      href: "/moderator",
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: "destinations-routes",
      label: "Duyệt Điểm đến & Lộ trình",
      href: "/moderator/destinations",
      icon: MapPin,

    },
    {
      id: "ai-knowledge",
      label: "Kiểm tra Kiến thức AI",
      href: "/moderator/ai-auditing",
      icon: Bot,

    },
    {
      id: "community-media",
      label: "Duyệt Ảnh & Bài Cộng đồng",
      href: "/moderator/community",
      icon: Camera,

    },
    {
      id: "audit-history",
      label: "Nhật ký & Lịch sử duyệt",
      href: "/moderator/history",
      icon: History,
      badge: null,
    },
  ];

  // Xử lý Đăng xuất
  const handleLogout = () => {
    try {
      if (typeof window !== "undefined") {
        localStorage.removeItem("vietculture_auth");
      }
    } catch {
      // Bỏ qua lỗi truy cập storage
    }
    router.push("/auth");
  };

  // Xử lý tìm kiếm mã hồ sơ nhanh từ Topbar
  const handleTopSearchSubmit = (e) => {
    e.preventDefault();
    if (topSearch.trim()) {
      router.push(`/moderator?search=${encodeURIComponent(topSearch.trim())}`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex text-slate-800 font-sans antialiased">
      {/* ────────────────────────────────────────────────────────
          SIDEBAR CỐ ĐỊNH BÊN TRÁI (w-64 bg-white border-r border-slate-200)
      ──────────────────────────────────────────────────────── */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 p-4 flex flex-col justify-between transition-transform duration-300 md:translate-x-0 ${isSidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full md:shadow-none"
          }`}
      >
        {/* Phía trên: Logo vietculture kèm tag Ban Kiểm duyệt Di sản */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <Link href="/moderator" className="flex items-center gap-2.5 group">
              {/* Logo Bông sen thương hiệu VietCulture */}
              <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center p-0.5 shadow-2xs group-hover:scale-105 transition-transform flex-shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/image/logo.png"
                  alt="VietCulture Lotus Logo"
                  className="w-full h-full object-cover rounded-lg"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>

              <div className="flex flex-col">
                <div className="flex items-center tracking-tight leading-none">
                  <span className="text-base font-black tracking-tight text-[#00A86B]">
                    viet
                  </span>
                  <span className="text-base font-black tracking-tight text-[#0288D1]">
                    culture
                  </span>
                </div>
                <span className="bg-teal-50 text-teal-700 font-bold text-[10px] px-2 py-0.5 rounded-full border border-teal-200/80 mt-1 inline-block w-fit leading-none">
                  Ban Kiểm duyệt Di sản
                </span>
              </div>
            </Link>

            {/* Nút đóng drawer trên mobile */}
            <button
              type="button"
              onClick={() => setIsSidebarOpen(false)}
              className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <X size={18} />
            </button>
          </div>

          {/* Nhãn nhóm điều hướng */}
          <div className="pt-4 pb-2 px-2">
            <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              Quy Trình Kiểm Chuẩn
            </p>
          </div>

          {/* Menu điều hướng 5 mục chuyên biệt */}
          <nav className="space-y-1">
            {moderatorNavItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href ||
                (item.href !== "/moderator" && pathname?.startsWith(item.href));

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group ${isActive
                    ? "bg-teal-50 text-teal-800 font-bold shadow-2xs border border-teal-200/80"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-transparent"
                    }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon
                      size={16}
                      className={`flex-shrink-0 transition-colors ${isActive ? "text-teal-700" : "text-slate-400 group-hover:text-slate-600"
                        }`}
                    />
                    <span className="truncate">{item.label}</span>
                  </div>

                  {/* Micro-Badge số lượng đếm hồ sơ tồn đọng ở góc phải */}
                  {item.badge && (
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full border shrink-0 ml-2 ${item.badge.color}`}
                    >
                      {item.badge.text}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Phía dưới: Thẻ thông tin Kiểm duyệt viên & Nút Đăng xuất chữ đỏ */}
        <div className="pt-4 border-t border-slate-200/80 space-y-3">
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold text-xs shadow-2xs flex-shrink-0">
                TB
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-black text-slate-900 truncate">
                  Trần Văn Bình
                </p>
                <p className="text-[10px] text-slate-500 truncate mt-0.5">
                  Thẩm định viên Di sản Cấp 2
                </p>
              </div>
            </div>
          </div>

          {/* Nút Đăng xuất chữ đỏ */}
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 text-xs font-bold transition-colors cursor-pointer"
            title="Đăng xuất khỏi tài khoản Kiểm duyệt viên"
          >
            <LogOut size={15} />
            <span>Đăng xuất</span>
          </button>
        </div>
      </aside>

      {/* Backdrop trên thiết bị di động */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* ────────────────────────────────────────────────────────
          KHU VỰC NỘI DUNG CHÍNH (MAIN WORKSPACE VỚI TOPBAR TRÊN CÙNG)
      ──────────────────────────────────────────────────────── */}
      <div className="flex-1 md:ml-64 flex flex-col min-w-0 min-h-screen">
        {/* ══════════════════════════════════════════════════════
            TOPBAR TRÊN CÙNG (Sticky Topbar)
        ══════════════════════════════════════════════════════ */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 py-3 flex items-center justify-between gap-4 shadow-2xs">
          {/* Cụm trái: Nút mở menu mobile + Tiêu đề khu vực thẩm định */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
              title="Mở menu"
            >
              <Menu size={18} />
            </button>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-black text-slate-900 tracking-tight">
                  Khu Vực Thẩm Định & Kiểm Chuẩn Di Sản
                </span>
                <span className="hidden lg:inline-block text-slate-300">•</span>
                <span className="hidden lg:inline-block text-[11px] font-semibold text-slate-500">

                </span>
              </div>
            </div>
          </div>

          {/* Cụm phải: Tìm kiếm nhanh mã hồ sơ + Chuông khẩn cấp + Trạng thái trực */}
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            {/* Thanh tìm kiếm nhanh mã hồ sơ */}
            <form onSubmit={handleTopSearchSubmit} className="relative hidden sm:block">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Search size={14} />
              </div>
              <input
                type="text"
                value={topSearch}
                onChange={(e) => setTopSearch(e.target.value)}
                placeholder="Tìm mã hồ sơ (HS-...), tên di tích..."
                className="pl-8.5 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 w-44 md:w-56 transition-all"
              />
            </form>

            {/* Nút chuông thông báo hồ sơ khẩn cấp */}
            <div className="relative">
              <Link
                href="/moderator"
                className="w-9 h-9 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 transition-colors relative"
                title="Thông báo hồ sơ khẩn cấp"
              >
                <Bell size={16} />
                {hasUrgentAlerts && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white animate-ping" />
                )}
                {hasUrgentAlerts && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
                )}
              </Link>
            </div>

            {/* Trạng thái Đang trực thẩm định (chấm xanh pulse) */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-800 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="hidden sm:inline">Đang trực thẩm định</span>
              <span className="sm:hidden">Trực tuyến</span>
            </div>
          </div>
        </header>

        {/* Nội dung trang làm việc */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
