"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  MapPin,
  Compass,
  Trophy,
  BarChart3,
  FileCheck,
  Search,
  Bell,
  Plus,
  LogOut,
  ShieldCheck,
  Building2,
  ExternalLink,
  ChevronDown,
  CheckCircle2,
  Menu,
  X,
  Sparkles,
  HelpCircle,
} from "lucide-react";

/**
 * Layout Quản Trị Dành Cho Content Provider (Nhà Cung Cấp Nội Dung / Điểm Đến)
 * Ứng dụng Du lịch Văn hóa VietCulture
 * 
 * - Sidebar cố định bên trái (w-64 bg-white border-r border-slate-200)
 * - Header trên cùng: Tìm kiếm nhanh, Chuông thông báo duyệt bài, Nút [+ Tạo Điểm đến / Lộ trình mới]
 */
export default function ProviderLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  // State điều khiển drawer trên mobile/tablet
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // State thông báo duyệt bài & menu tạo mới
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createType, setCreateType] = useState("destination");

  // Danh mục điều hướng Sidebar
  const navMenuItems = [
    {
      id: "overview",
      label: "Tổng quan",
      href: "/provider",
      icon: LayoutDashboard,
    },
    {
      id: "destinations",
      label: "Quản lý Điểm đến",
      href: "/provider/destinations",
      icon: MapPin,
    },
    {
      id: "routes",
      label: "Lộ trình Văn hóa",
      href: "/provider/routes/builder",
      icon: Compass,
    },
    {
      id: "missions",
      label: "Nhiệm vụ & Quiz",
      href: "/provider/tasks/create",
      icon: Trophy,
    },
    {
      id: "revenue",
      label: "Báo cáo Thu nhập",
      href: "/provider/reports",
      icon: BarChart3,
    },
    {
      id: "reviews",
      label: "Trạng thái Kiểm duyệt",
      href: "/provider#reviews",
      icon: FileCheck,
    },
  ];

  // Xử lý Đăng xuất Provider
  const handleLogout = () => {
    try {
      if (typeof window !== "undefined") {
        localStorage.removeItem("vietculture_auth");
        localStorage.removeItem("vietculture_provider");
      }
    } catch {
      // Bỏ qua lỗi
    }
    router.push("/auth");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans antialiased text-slate-800">
      {/* ── Overlay khi mở menu trên mobile ── */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* ══════════════════════════════════════════════════════════
          1. SIDEBAR CỐ ĐỊNH BÊN TRÁI (W-[272PX] THOÁNG ĐÃNG, THANH LỊCH)
      ══════════════════════════════════════════════════════════ */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 w-[272px] min-w-[272px] h-screen bg-white border-r border-slate-200 p-4 flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* TOP: LOGO BÔNG SEN VIETCULTURE & TAG DÀNH CHO ĐỐI TÁC */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <Link href="/provider" className="flex items-center gap-2.5 group">
              {/* Logo Bông sen vietculture */}
              <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center p-1 shadow-2xs group-hover:scale-105 transition-transform flex-shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/image/logo.png"
                  alt="VietCulture Logo"
                  className="w-full h-full object-cover rounded-lg"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>

              <div>
                <div className="flex items-center leading-none">
                  <span className="text-base font-black tracking-tight text-[#00A86B]">
                    viet
                  </span>
                  <span className="text-base font-black tracking-tight text-[#0288D1]">
                    culture
                  </span>
                </div>
                <span className="inline-block mt-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-md leading-none">
                  Dành cho Đối tác/Điểm đến
                </span>
              </div>
            </Link>

            {/* Nút đóng Sidebar trên màn hình di động */}
            <button
              type="button"
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X size={18} />
            </button>
          </div>

          {/* MENU ĐIỀU HƯỚNG CHÍNH (KHÔNG BỊ TRUNCATE, MICRO BADGE NHỎ GỌN) */}
          <nav className="mt-5 space-y-1" aria-label="Menu Đối tác">
            {navMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.id === "overview"
                  ? pathname === "/provider"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all duration-150 group ${
                    isActive
                      ? "bg-emerald-50 text-emerald-900 font-bold border border-emerald-200/80 shadow-2xs"
                      : "hover:bg-slate-50 text-slate-700 hover:text-slate-900"
                  }`}
                >
                  <Icon
                    size={18}
                    className={`shrink-0 transition-colors ${
                      isActive ? "text-emerald-600" : "text-slate-400 group-hover:text-slate-600"
                    }`}
                  />

                  {/* Tên menu hiển thị trọn vẹn, thoáng đãng */}
                  <span
                    className={`text-xs font-semibold ${
                      isActive ? "text-emerald-900 font-bold" : "text-slate-700"
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* BOTTOM: THÔNG TIN ĐƠN VỊ ĐỐI TÁC & NÚT ĐĂNG XUẤT */}
        <div className="pt-4 border-t border-slate-100 space-y-3">
          {/* Card Đơn vị Đối tác: BQL Di tích Văn Miếu */}
          <div className="bg-slate-50 rounded-2xl p-3 border border-slate-200/80">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 overflow-hidden shadow-2xs flex-shrink-0 flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/image/vanmieu.png"
                  alt="BQL Di tích Văn Miếu"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-slate-800 truncate">
                  BQL Di tích Văn Miếu
                </p>
                <div className="flex items-center gap-1 mt-0.5">
                  <ShieldCheck size={13} className="text-emerald-600 flex-shrink-0" />
                  <span className="text-[10.5px] font-semibold text-emerald-700">
                    Đối tác xác thực
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-2 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px] text-slate-400">
              <span>Mã đối tác</span>
              <span className="font-mono font-bold text-slate-600">VM-HN-01</span>
            </div>
          </div>

          {/* Nút Đăng xuất */}
          <button
            type="button"
            onClick={handleLogout}
            className="w-full py-2.5 px-3 rounded-xl border border-rose-100 bg-rose-50/50 hover:bg-rose-100/70 text-rose-600 text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <LogOut size={15} />
            <span>Đăng xuất</span>
          </button>
        </div>
      </aside>

      {/* ══════════════════════════════════════════════════════════
          2. KHU VỰC NỘI DUNG CHÍNH & HEADER TRÊN CÙNG
      ══════════════════════════════════════════════════════════ */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* HEADER TRÊN CÙNG */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/90 h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 shadow-2xs">
          {/* Cụm trái: Nút mở mobile menu & Thanh tìm kiếm nhanh */}
          <div className="flex items-center gap-3 flex-1 max-w-lg">
            <button
              type="button"
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 focus:outline-none"
              aria-label="Mở Menu điều hướng"
            >
              <Menu size={20} />
            </button>

            {/* Thanh tìm kiếm nhanh */}
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Search size={16} />
              </div>
              <input
                type="text"
                placeholder="Tìm nhanh điểm đến, lộ trình văn hóa, nhiệm vụ quiz..."
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
              />
            </div>
          </div>

          {/* Cụm phải: Chuông thông báo duyệt bài & Nút [+ Tạo Điểm đến / Lộ trình mới] */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Chuông thông báo duyệt bài */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors relative cursor-pointer"
                title="Thông báo duyệt bài"
              >
                <Bell size={18} />
                {/* Badge thông báo đỏ nổi bật */}
                <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white animate-pulse" />
              </button>

              {/* Menu Popover thông báo duyệt bài */}
              {isNotificationOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                    <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-800">
                      Thông báo duyệt nội dung
                    </h3>
                    <span className="text-[10.5px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      2 mới
                    </span>
                  </div>

                  <div className="space-y-2.5 text-xs">
                    {/* Thông báo 1 */}
                    <div className="p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-100 flex items-start gap-2.5">
                      <CheckCircle2 size={16} className="text-emerald-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-bold text-slate-800 leading-snug">
                          Lộ trình &quot;Đạo Học Thăng Long&quot; đã được duyệt
                        </p>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          Hội đồng Văn hóa Quốc gia đã phê duyệt xuất bản lên ứng dụng du khách.
                        </p>
                        <span className="text-[10px] text-emerald-700 font-semibold mt-1 inline-block">
                          10 phút trước
                        </span>
                      </div>
                    </div>

                    {/* Thông báo 2 */}
                    <div className="p-2.5 rounded-xl bg-amber-50/60 border border-amber-100 flex items-start gap-2.5">
                      <Sparkles size={16} className="text-amber-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-bold text-slate-800 leading-snug">
                          Bổ sung thuyết minh âm thanh tiếng Pháp
                        </p>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          Điểm đến &quot;Khuê Văn Các&quot; cần cập nhật file audio guide mới.
                        </p>
                        <span className="text-[10px] text-amber-700 font-semibold mt-1 inline-block">
                          1 giờ trước
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Nút bấm nổi bật: [+ Tạo Điểm đến / Lộ trình mới] */}
            <button
              type="button"
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl flex items-center gap-2 shadow-sm shadow-emerald-600/20 text-xs sm:text-sm transition-all duration-200 cursor-pointer"
            >
              <Plus size={18} strokeWidth={2.4} />
              <span className="hidden sm:inline">Tạo Điểm đến / Lộ trình mới</span>
              <span className="sm:hidden">Tạo mới</span>
            </button>
          </div>
        </header>

        {/* ── NỘI DUNG TRANG CHÍNH ── */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>

      {/* ══════════════════════════════════════════════════════════
          MODAL TẠO MỚI ĐIỂM ĐẾN / LỘ TRÌNH VĂN HÓA
      ══════════════════════════════════════════════════════════ */}
      {isCreateModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setIsCreateModalOpen(false)}
        >
          <div
            className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 relative animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
                Khởi tạo nội dung di sản mới
              </h3>
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(false)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X size={15} />
              </button>
            </div>

            <div className="space-y-3 mb-5">
              <div
                role="button"
                tabIndex={0}
                onClick={() => {
                  setCreateType("destination");
                  setIsCreateModalOpen(false);
                  router.push("/provider/destinations/create");
                }}
                className={`w-full p-3.5 rounded-2xl border flex items-center gap-3 cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.99] ${
                  createType === "destination"
                    ? "border-emerald-500 bg-emerald-50/70 text-emerald-950 font-bold shadow-xs ring-1 ring-emerald-400/50"
                    : "border-slate-200 bg-slate-50/60 hover:bg-slate-100 text-slate-700"
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 shadow-xs">
                  <MapPin size={20} />
                </div>
                <div className="text-left">
                  <p className="text-xs sm:text-sm font-bold text-slate-900">Thêm Điểm đến di tích</p>
                  <p className="text-[11px] text-slate-500 font-normal">
                    Khai báo tọa độ GPS, mã QR check-in, ảnh 360° và bài thuyết minh.
                  </p>
                </div>
              </div>

              <div
                role="button"
                tabIndex={0}
                onClick={() => {
                  setCreateType("route");
                  setIsCreateModalOpen(false);
                  router.push("/provider/routes/create");
                }}
                className={`w-full p-3.5 rounded-2xl border flex items-center gap-3 cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.99] ${
                  createType === "route"
                    ? "border-sky-500 bg-sky-50/70 text-sky-950 font-bold shadow-xs ring-1 ring-sky-400/50"
                    : "border-slate-200 bg-slate-50/60 hover:bg-slate-100 text-slate-700"
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center flex-shrink-0 shadow-xs">
                  <Compass size={20} />
                </div>
                <div className="text-left">
                  <p className="text-xs sm:text-sm font-bold text-slate-900">Tạo Lộ trình tham quan di sản</p>
                  <p className="text-[11px] text-slate-500 font-normal">
                    Xâu chuỗi các điểm di tích thành tour chuyên đề trải nghiệm văn hóa.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(false)}
                className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Đóng
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsCreateModalOpen(false);
                  if (createType === "destination") {
                    router.push("/provider/destinations/create");
                  } else {
                    router.push("/provider/routes/create");
                  }
                }}
                className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors shadow-sm shadow-emerald-600/20 cursor-pointer"
              >
                Tiếp tục
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
