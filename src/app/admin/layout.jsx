"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  CircleDollarSign,
  SlidersHorizontal,
  BarChart3,
  ShieldAlert,
  LogOut,
  Search,
  Bell,
  Menu,
  X,
  ExternalLink,
  Activity,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  ShieldCheck,
  Server,
  RefreshCw,
} from "lucide-react";

/**
 * Layout Làm Việc Của Quản Trị Viên Cấp Cao (Administrator) - VietCulture
 * - Nền xám nhạt thanh lịch (bg-slate-50), không dùng dark mode.
 * - Sidebar cố định bên trái (w-64 bg-white border-r border-slate-200 min-h-screen)
 * - Topbar trên cùng với thanh tìm kiếm toàn cục, chuông cảnh báo dòng tiền và trạng thái máy chủ 100%
 */
export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  // State drawer trên mobile
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3500);
  };

  // 6 mục menu điều hướng với micro-badge
  const adminNavItems = [
    {
      id: "dashboard",
      label: "Tổng quan toàn sàn",
      href: "/admin",
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: "users-partners",
      label: "Người dùng & Đối tác",
      href: "/admin/users",
      icon: Users,
      badge: {
        count: 3,

        color: "bg-amber-100 text-amber-800 border-amber-200",
      },
    },
    {
      id: "finances",
      label: "Quản lý Dòng tiền",
      href: "/admin/finance",
      icon: CircleDollarSign,
      badge: {
        count: 2,

        color: "bg-rose-100 text-rose-800 border-rose-200",
      },
    },
    {
      id: "settings",
      label: "Danh mục & Gamification",
      href: "/admin/system-config",
      icon: SlidersHorizontal,
      badge: null,
    },
    {
      id: "analytics",
      label: "Doanh thu & Tăng trưởng",
      href: "/admin/analytics",
      icon: BarChart3,
      badge: null,
    },
    {
      id: "audit",
      label: "Nhật ký Kiểm toán Hệ thống",
      href: "/admin/audit-logs",
      icon: ShieldAlert,
      badge: null,
    },
  ];

  // Danh sách cảnh báo dòng tiền khẩn cấp
  const urgentAlerts = [
    {
      id: "REF-01",
      title: "Yêu cầu hoàn tiền vé Văn Miếu #TK-8921",
      amount: "160.000 đ",
      reason: "Hủy do thời tiết mưa bão (SLA &lt; 2h)",
      time: "10 phút trước",
    },
    {
      id: "REF-02",
      title: "Khiếu nại lộ trình Tràng An #TR-4402",
      amount: "450.000 đ",
      reason: "Du khách không thể quét GPS cổng 2",
      time: "35 phút trước",
    },
  ];

  // Xử lý đăng xuất
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

  // Xử lý tìm kiếm toàn cục
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      showToast(`Đang tìm kiếm toàn cục cho: "${searchQuery.trim()}"`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex text-slate-800 font-sans antialiased">
      {/* Toast thông báo */}
      {toastMsg && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl border border-slate-700 text-xs font-bold flex items-center gap-2.5 animate-in slide-in-from-top-3 max-w-md">
          <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* ────────────────────────────────────────────────────────
          1. SIDEBAR CỐ ĐỊNH BÊN TRÁI (w-64 bg-white border-r border-slate-200)
      ──────────────────────────────────────────────────────── */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 p-4 flex flex-col justify-between transition-transform duration-300 md:translate-x-0 shrink-0 ${isSidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full md:shadow-none"
          }`}
      >
        {/* TOP SIDEBAR */}
        <div>
          {/* Header Brand: Logo vietculture chính thức & nhãn Quản trị viên */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <Link href="/admin" className="flex items-center gap-2.5 group">
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
                <span className="bg-rose-50 text-rose-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-rose-200 mt-1 inline-block w-fit leading-none">
                  Quản trị viên
                </span>
              </div>
            </Link>

            {/* Nút đóng drawer trên mobile */}
            <button
              type="button"
              onClick={() => setIsSidebarOpen(false)}
              className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Nhãn nhóm: VẬN HÀNH TOÀN SÀN */}
          <div className="mt-5 mb-2 px-2">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              QUẢN LÍ
            </p>
          </div>

          {/* 6 mục menu điều hướng */}
          <nav className="space-y-1">
            {adminNavItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname?.startsWith(item.href);

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group ${isActive
                    ? "bg-rose-50 text-rose-900 font-bold shadow-2xs border border-rose-200"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-transparent"
                    }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon
                      size={16}
                      className={`shrink-0 transition-colors ${isActive
                        ? "text-rose-600"
                        : "text-slate-400 group-hover:text-slate-600"
                        }`}
                    />
                    <span className="truncate">{item.label}</span>
                  </div>

                  {/* Micro-badge nhỏ ở góc phải */}
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

        {/* BOTTOM SIDEBAR */}
        <div className="pt-4 border-t border-slate-200/80 space-y-3">
          {/* Thẻ Admin: Lê Hoàng Quân - Quản Trị Viên Trưởng */}
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
            <div className="flex items-center gap-2.5">
              {/* Avatar chữ LQ nền xanh navy đậm */}
              <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black text-xs shadow-2xs shrink-0 tracking-wider">
                LQ
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-black text-slate-900 truncate">
                  Lê Hoàng Quân
                </p>
                <p className="text-[10.5px] text-slate-500 truncate mt-0.5">
                  Quản Trị Viên Trưởng
                </p>
                <div className="flex items-center gap-1 mt-1 text-[10px] font-bold text-emerald-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Hệ thống an toàn</span>
                </div>
              </div>
            </div>
          </div>

          {/* Nút Đăng xuất dẫn về /auth */}
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 text-xs font-bold transition-colors cursor-pointer"
            title="Đăng xuất khỏi phiên Quản trị viên"
          >
            <LogOut size={15} />
            <span>Đăng xuất</span>
          </button>
        </div>
      </aside>

      {/* Backdrop trên mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* ────────────────────────────────────────────────────────
          2. KHU VỰC CHÍNH (MAIN CONTENT VỚI TOPBAR TRÊN CÙNG)
      ──────────────────────────────────────────────────────── */}
      <div className="flex-1 md:ml-64 flex flex-col min-w-0 min-h-screen">
        {/* ══════════════════════════════════════════════════════
            TOPBAR TRÊN CÙNG (Sticky Topbar)
        ══════════════════════════════════════════════════════ */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 py-3 flex items-center justify-between gap-4 shadow-2xs">
          {/* Cụm trái: Nút mobile menu + Tiêu đề Cổng Điều Hành Trung Ương */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
              title="Mở thanh điều hướng"
            >
              <Menu size={18} />
            </button>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-black text-slate-900 tracking-tight">
                  Cổng Điều Hành Chính
                </span>
                <span className="hidden sm:inline-block text-slate-300">•</span>
                <span className="hidden sm:inline-block text-[11.5px] font-semibold text-slate-500">

                </span>
              </div>
            </div>
          </div>

          {/* Cụm phải: Tìm kiếm toàn cục, Chuông cảnh báo dòng tiền & Trạng thái máy chủ 100% */}
          <div className="flex items-center gap-3">
            {/* Thanh tìm kiếm toàn cục (Global Search: tìm user, mã đơn hàng, đối tác) */}
            <form onSubmit={handleSearchSubmit} className="relative hidden lg:block">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Search size={14} />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm user, mã đơn hàng, đối tác..."
                className="pl-8.5 pr-8 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 w-64 xl:w-72 transition-all"
              />
              <span className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-[10px] text-slate-400 font-mono pointer-events-none">
                ↵
              </span>
            </form>

            {/* Chuông thông báo cảnh báo dòng tiền */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-600 transition-colors relative cursor-pointer"
                title="Cảnh báo dòng tiền & hoàn tiền"
              >
                <Bell size={16} />
                {/* Badge đỏ cảnh báo 2 yêu cầu hoàn tiền */}
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-600 text-white rounded-full text-[9px] font-black flex items-center justify-center border-2 border-white animate-bounce">
                  2
                </span>
              </button>

              {/* Dropdown danh sách cảnh báo dòng tiền */}
              {isNotificationOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsNotificationOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <div className="flex items-center gap-1.5">
                        <AlertTriangle size={15} className="text-rose-600" />
                        <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                          Cảnh Báo Dòng Tiền & Hoàn Tiền
                        </h4>
                      </div>
                      <span className="text-[10px] font-bold bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full">
                        2 khẩn cấp
                      </span>
                    </div>

                    <div className="divide-y divide-slate-100 my-2 max-h-64 overflow-y-auto">
                      {urgentAlerts.map((alert) => (
                        <div
                          key={alert.id}
                          className="py-2.5 hover:bg-slate-50 px-2 rounded-xl transition-colors"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-xs font-bold text-slate-900">
                              {alert.title}
                            </p>
                            <span className="text-xs font-black text-rose-600 whitespace-nowrap">
                              {alert.amount}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            {alert.reason}
                          </p>
                          <div className="flex items-center justify-between mt-2 pt-1 text-[10px] text-slate-400">
                            <span>⏱ {alert.time}</span>
                            <Link
                              href="/admin/finance"
                              onClick={() => setIsNotificationOpen(false)}
                              className="text-rose-600 font-bold hover:underline"
                            >
                              Xử lý ngay →
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-slate-100 text-center">
                      <Link
                        href="/admin/finance"
                        onClick={() => setIsNotificationOpen(false)}
                        className="text-xs font-bold text-slate-600 hover:text-slate-900 inline-block py-1"
                      >
                        Xem tất cả yêu cầu hoàn tiền
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Trạng thái "Máy chủ: Hoạt động 100%" */}
            <div className="hidden sm:flex items-center gap-2 bg-emerald-50 text-emerald-800 border border-emerald-200/90 rounded-full px-3 py-1 text-xs font-bold shadow-2xs select-none">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Máy chủ: Hoạt động 100%</span>
            </div>
          </div>
        </header>

        {/* ══════════════════════════════════════════════════════
            VÙNG {children} CUỘN NỘI DUNG ĐỘC LẬP
        ══════════════════════════════════════════════════════ */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
