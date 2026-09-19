"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Settings,
  Bell,
  Sparkles,
  QrCode,
  MapPin,
  Clock,
  Ticket,
  ChevronRight,
  ShieldCheck,
  User,
  CreditCard,
  Globe,
  PhoneCall,
  LogOut,
  Navigation,
  CheckCircle2,
  Calendar,
  Layers,
  Award,
  Check,
  X,
  BadgeCheck,
  RefreshCcw,
  Share2,
  Wallet,
  ScanLine,
  Banknote,
  ShieldAlert,
  HelpCircle,
  AlertCircle,
  BellOff,
  Gift,
  CheckCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import TouristBottomNav from "@/components/TouristBottomNav";
import ProfileOverview from "@/components/profile/ProfileOverview";
import BadgeCollection from "@/components/profile/BadgeCollection";
import { useLanguage } from "@/context/LanguageContext";
import {
  profileInfo,
  unlockedBadges,
  journeyTimeline,
} from "@/data/userProfileMockData";
import {
  ticketList,
  journeyAndTicketSummary,
} from "@/data/journeyAndTicketMockData";
import { mockNotifications as initialMockNotifications } from "@/data/notificationsMockData";

/**
 * Trang Cá Nhân Khách Du Lịch (Tourist Profile)
 * Chuẩn Cổng Thông Tin Du Lịch Quốc Gia - VietCulture
 */
export default function TouristProfilePage() {
  const router = useRouter();
  const { language, setLanguage, t, supportedLanguages } = useLanguage();
  const [toastMessage, setToastMessage] = useState(null);
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);

  // State Quản lý Thông Báo
  const [notifications, setNotifications] = useState(initialMockNotifications);
  const [isOpenNotifications, setIsOpenNotifications] = useState(false);
  const [notifFilter, setNotifFilter] = useState("ALL"); // ALL | REWARD | TICKET

  // Đếm số lượng thông báo chưa đọc
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  // Đánh dấu tất cả thông báo là đã đọc
  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    showToast("Đã đánh dấu tất cả thông báo là đã đọc");
  };

  // Đánh dấu 1 thông báo là đã đọc và điều hướng
  const handleNotificationClick = (item) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === item.id ? { ...n, isRead: true } : n))
    );
    if (item.linkAction) {
      setIsOpenNotifications(false);
      router.push(item.linkAction);
    }
  };

  // Lọc thông báo theo chip tabs
  const filteredNotifications = notifications.filter((item) => {
    if (notifFilter === "ALL") return true;
    if (notifFilter === "REWARD") return item.type === "REWARD";
    if (notifFilter === "TICKET") return item.type === "TICKET";
    return true;
  });

  // Hàm thông báo Toast tương tác
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Xử lý đăng xuất tài khoản và điều hướng về trang đăng nhập
  const handleLogout = () => {
    try {
      if (typeof window !== "undefined") {
        localStorage.removeItem("vietculture_auth");
      }
    } catch {
      // Bỏ qua lỗi truy cập storage nếu có
    }
    showToast(t("logOut") || "Đang đăng xuất khỏi hệ thống...");
    setTimeout(() => {
      router.push("/auth");
    }, 600);
  };

  return (
    <div className="w-full min-h-screen bg-slate-100/80 flex justify-center items-start">
      {/* ══════════════════════════════════════════════════════════
          CONTAINER CHUẨN MOBILE VIEW
          max-w-md mx-auto min-h-screen bg-slate-50 pb-24 font-sans
      ══════════════════════════════════════════════════════════ */}
      <div className="w-full max-w-md mx-auto min-h-screen bg-slate-50 relative pb-24 shadow-2xl border-x border-slate-200 font-sans flex flex-col">

        {/* Toast thông báo tương tác nhanh */}
        {toastMessage && (
          <div className="fixed top-4 left-1/2 -translate-x-1/2 max-w-sm w-11/12 z-50 bg-emerald-600/95 backdrop-blur-md text-white text-xs font-semibold px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 border border-emerald-400/30 animate-bounce">
            <Sparkles size={16} className="text-amber-300 flex-shrink-0" />
            <span className="leading-snug">{toastMessage}</span>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════
            TOP HEADER TRẮNG MỎNG
            Tiêu đề 'Trang Cá Nhân', nút Cài đặt (Settings) & Chuông thông báo (Bell)
        ══════════════════════════════════════════════════════════ */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/90 px-4 py-3 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Link
              href="/"
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors active:scale-95"
              title={t("backToHome")}
            >
              <ArrowLeft size={17} />
            </Link>
            <div>
              <h1 className="text-sm font-extrabold text-slate-800 leading-tight">
                {t("profileTitle")}
              </h1>
              <p className="text-[10px] text-slate-400 font-medium leading-none mt-0.5">

              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* THẺ CHA BỌC NÚT CHUÔNG VỚI 'relative' */}
            <div className="relative">
              {/* Chuông thông báo (icon Bell) */}
              <button
                type="button"
                onClick={() => setIsOpenNotifications((prev) => !prev)}
                className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 relative hover:bg-slate-200 active:scale-90 transition-transform cursor-pointer"
                aria-label={t("notifications")}
              >
                <Bell size={18} />
                {unreadCount > 0 && (
                  <span className="w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white absolute top-1.5 right-1.5 animate-pulse" />
                )}
              </button>

              {/* DROPDOWN POPOVER XỔ XUỐNG DƯỚI NÚT CHUÔNG */}
              <AnimatePresence>
                {isOpenNotifications && (
                  <>
                    {/* Backdrop mờ nhẹ phía sau bắt click outside */}
                    <div
                      className="fixed inset-0 z-40 bg-black/10"
                      onClick={() => setIsOpenNotifications(false)}
                    />

                    {/* Hộp thông báo xổ xuống */}
                    <motion.div
                      style={{ transformOrigin: "top right" }}
                      initial={{ opacity: 0, scale: 0.9, y: -8 }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        transition: { type: "spring", damping: 22, stiffness: 320 },
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0.92,
                        y: -6,
                        transition: { duration: 0.15 },
                      }}
                      className="absolute right-0 top-full mt-2 w-80 sm:w-96 z-50 bg-white rounded-2xl shadow-2xl border border-slate-200/90 overflow-hidden select-none flex flex-col"
                    >
                      {/* Mũi tên nhọn nhỏ (caret) hướng thẳng lên nút chuông */}
                      <div className="absolute -top-1.5 right-3 w-3 h-3 bg-white border-t border-l border-slate-200 rotate-45 z-10" />

                      {/* Header Dropdown */}
                      <div className="p-3.5 border-b border-slate-100 flex items-center justify-between bg-white relative z-20">
                        <div className="flex items-center gap-2">
                          <h3 className="text-xs font-bold text-slate-800">
                            Thông báo
                          </h3>
                          {unreadCount > 0 ? (
                            <span className="bg-rose-100 text-rose-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                              {unreadCount} tin mới
                            </span>
                          ) : (
                            <span className="bg-slate-100 text-slate-500 text-[10px] font-bold px-2 py-0.5 rounded-full">
                              Đã đọc hết
                            </span>
                          )}
                        </div>

                        {unreadCount > 0 && (
                          <button
                            type="button"
                            onClick={handleMarkAllAsRead}
                            className="text-[11px] font-bold text-sky-600 hover:text-sky-700 hover:underline cursor-pointer flex items-center gap-1"
                          >
                            <CheckCheck size={13} />
                            <span>Đánh dấu đã đọc</span>
                          </button>
                        )}
                      </div>

                      {/* Danh sách cuộn: max-h-[380px] divide-y divide-slate-100 */}
                      <div className="max-h-[380px] overflow-y-auto divide-y divide-slate-100 relative z-20">
                        {notifications.length > 0 ? (
                          notifications.map((item) => {
                            const isUnread = !item.isRead;

                            const renderIcon = () => {
                              switch (item.iconType) {
                                case "Award":
                                  return (
                                    <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 border border-amber-200/60">
                                      <Award size={16} />
                                    </div>
                                  );
                                case "Ticket":
                                  return (
                                    <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200/60">
                                      <Ticket size={16} />
                                    </div>
                                  );
                                case "CheckCircle2":
                                  return (
                                    <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 border border-rose-200/60">
                                      <CheckCircle2 size={16} />
                                    </div>
                                  );
                                case "Sparkles":
                                  return (
                                    <div className="w-8 h-8 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center shrink-0 border border-teal-200/60">
                                      <Sparkles size={16} />
                                    </div>
                                  );
                                case "Gift":
                                  return (
                                    <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center shrink-0 border border-purple-200/60">
                                      <Gift size={16} />
                                    </div>
                                  );
                                default:
                                  return (
                                    <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                                      <Bell size={16} />
                                    </div>
                                  );
                              }
                            };

                            return (
                              <div
                                key={item.id}
                                onClick={() => handleNotificationClick(item)}
                                className={`p-3 flex items-start gap-2.5 transition-colors cursor-pointer hover:bg-slate-50 relative ${
                                  isUnread ? "bg-sky-50/40" : "bg-white"
                                }`}
                              >
                                {renderIcon()}

                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center justify-between gap-1 mb-0.5">
                                    <h4 className="text-xs font-bold text-slate-800 truncate">
                                      {item.title}
                                    </h4>
                                    <span className="text-[9.5px] text-slate-400 font-medium shrink-0">
                                      {item.time}
                                    </span>
                                  </div>

                                  <p className="text-[11px] text-slate-600 leading-snug line-clamp-2">
                                    {item.content}
                                  </p>
                                </div>

                                {isUnread && (
                                  <span className="w-2 h-2 rounded-full bg-sky-500 shrink-0 self-center" />
                                )}
                              </div>
                            );
                          })
                        ) : (
                          <div className="text-center py-8 px-4 flex flex-col items-center justify-center">
                            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mb-2">
                              <BellOff size={20} />
                            </div>
                            <h4 className="text-xs font-bold text-slate-700 mb-0.5">
                              Không có thông báo nào
                            </h4>
                            <p className="text-[11px] text-slate-400 leading-relaxed">
                              Bạn đã xem hết các thông báo di sản!
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Footer Dropdown */}
                      <div className="p-2.5 bg-slate-50 border-t border-slate-100 text-center relative z-20">
                        <button
                          type="button"
                          onClick={() => {
                            setIsOpenNotifications(false);
                            showToast("Đã xem tất cả nhật ký thông báo");
                          }}
                          className="text-[11px] font-bold text-slate-700 hover:text-slate-900 transition-colors inline-flex items-center gap-1 cursor-pointer"
                        >
                          <span>Xem tất cả nhật ký thông báo →</span>
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Nút cài đặt (icon Settings) */}
            <button
              type="button"
              onClick={() => {
                const settingSection = document.getElementById("account-settings-menu");
                settingSection?.scrollIntoView({ behavior: "smooth" });
                showToast(t("settings"));
              }}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors active:scale-95 cursor-pointer"
              aria-label={t("settings")}
            >
              <Settings size={16} />
            </button>
          </div>
        </header>

        {/* ══════════════════════════════════════════════════════════
            MAIN CONTENT — HỒ SƠ KHÁCH DU LỊCH
        ══════════════════════════════════════════════════════════ */}
        <main className="flex-1 p-4 space-y-5">
          {/* ── 1. TÍCH HỢP PROFILE OVERVIEW ── */}
          <ProfileOverview
            profile={profileInfo}
            onViewRank={() =>
              showToast(
                `Hạng hiện tại: ${profileInfo.rankTier}. Cần thêm ${profileInfo.pointsToNextTier} điểm để đạt Hạng Vàng!`
              )
            }
          />

          {/* ── 2. TÍCH HỢP BADGE COLLECTION (Huy hiệu ảnh thật) ── */}
          <BadgeCollection
            badges={unlockedBadges}
            onViewAll={() =>
              showToast("Bạn đã xuất sắc mở khóa toàn bộ 4/4 huy hiệu di sản văn hóa!")
            }
          />

          {/* ═══════════════════════════════════════════════════════
              3. KHỐI NHẬT KÝ HÀNH TRÌNH (MY JOURNEY LOG TIMELINE)
              Dòng thời gian dọc (Vertical Timeline)
          ═══════════════════════════════════════════════════════ */}
          <section aria-label="Nhật ký hành trình">
            {/* Tiêu đề nhóm có vạch màu */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="w-1 h-4 bg-emerald-600 rounded-full flex-shrink-0" />
                <h2 className="text-xs font-bold text-slate-800 tracking-wider uppercase">
                  {t("journeyLogTitle")}
                </h2>
              </div>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                {journeyTimeline.length} {t("sitesVisited")}
              </span>
            </div>

            {/* Dòng thời gian dọc (Vertical Timeline) */}
            <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-emerald-200">
              {journeyTimeline.map((item) => {
                const isGPS = item.method.toLowerCase().includes("gps");

                return (
                  <div key={item.id} className="relative group">
                    {/* Chốt mốc thời gian dọc */}
                    <div className="absolute -left-6 top-3 w-5 h-5 rounded-full bg-emerald-600 border-4 border-white shadow-xs flex items-center justify-center text-white">
                      <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    </div>

                    {/* Thẻ hành trình nền trắng bo tròn */}
                    <div className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-sm hover:shadow-md transition-all">
                      <div className="flex items-start gap-3">
                        {/* Ảnh chụp thật di tích đã check-in */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.photoUrl}
                          alt={item.siteName}
                          className="w-16 h-16 rounded-xl object-cover flex-shrink-0 shadow-2xs border border-slate-100"
                        />

                        <div className="min-w-0 flex-1">
                          {/* Tags: Tag xanh lá phương thức + Điểm thưởng màu cam */}
                          <div className="flex items-center justify-between gap-1 mb-1">
                            {/* Tag xanh lá: 'GPS Verified' hoặc 'QR Scanned' */}
                            <span className="inline-flex items-center gap-1 text-[9.5px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80">
                              {isGPS ? (
                                <>
                                  <Navigation size={10} className="text-emerald-600" />
                                  GPS Verified
                                </>
                              ) : (
                                <>
                                  <QrCode size={10} className="text-emerald-600" />
                                  QR Scanned
                                </>
                              )}
                            </span>

                            {/* Điểm thưởng +100 pts màu cam */}
                            <span className="text-xs font-black text-amber-500 flex items-center gap-0.5">
                              {item.rewardPoints}
                            </span>
                          </div>

                          {/* Tên di tích đã ghé thăm */}
                          <h3 className="text-xs font-bold text-slate-800 truncate">
                            {item.siteName}
                          </h3>

                          {/* Vị trí & Ngày giờ check-in */}
                          <p className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1 truncate">
                            <Clock size={10} className="text-slate-400 flex-shrink-0" />
                            <span>{item.checkinDate}</span>
                            <span>•</span>
                            <span>{item.location}</span>
                          </p>

                          {/* Cảm nghĩ / ghi chú kỷ niệm */}
                          <p className="text-[11px] text-slate-600 italic mt-1.5 leading-snug line-clamp-1 bg-slate-50 rounded-lg px-2 py-1 border border-slate-100">
                            &ldquo;{item.caption}&rdquo;
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════
              4. NHÓM "GIAO DỊCH & TIỆN ÍCH"
              (Dẫn sang trang Vé & Chi phí riêng biệt /tickets và Hỗ trợ khiếu nại)
          ═══════════════════════════════════════════════════════ */}
          <section aria-label="Giao dịch & Tiện ích">
            {/* Tiêu đề nhóm Giao dịch & Tiện ích */}
            <div className="flex items-center gap-2 mb-2.5">
              <span className="w-1 h-4 bg-rose-500 rounded-full flex-shrink-0" />
              <h2 className="text-xs font-bold text-slate-800 tracking-wider uppercase">
                Giao dịch &amp; Tiện ích
              </h2>
            </div>

            {/* 4.1. Dòng menu: Ví vé / Lịch sử thanh toán -> Chuyển hướng sang trang /tickets riêng biệt */}
            <Link
              href="/tickets"
              className="w-full bg-white rounded-2xl border border-slate-200/80 p-3.5 mb-2.5 flex items-center justify-between shadow-xs hover:bg-slate-50 transition-colors cursor-pointer active:scale-98"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                  <Ticket size={20} />
                </div>
                <div className="text-left">
                  <h3 className="text-xs font-bold text-slate-800">
                    Ví vé &amp; Chi phí du lịch
                  </h3>
                  <p className="text-[11px] text-slate-400 font-medium">
                    {ticketList.length} vé • Hóa đơn, mã QR &amp; lịch sử chi phí
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
                  {journeyAndTicketSummary.activeTicketsCount} khả dụng
                </span>
                <ChevronRight size={16} className="text-slate-300" />
              </div>
            </Link>

            {/* 4.2. Dòng menu: Hỗ trợ & Khiếu nại đơn hàng -> Chuyển trực tiếp sang /profile/disputes */}
            <Link
              href="/profile/disputes"
              className="w-full bg-white rounded-2xl border border-slate-200/80 p-3.5 mb-2.5 flex items-center justify-between shadow-xs hover:bg-slate-50 transition-colors cursor-pointer active:scale-98"
            >
              {/* Cột trái: Khung icon tròn nền hồng đào nhạt */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500 shrink-0">
                  <ShieldAlert size={20} />
                </div>
                {/* Phần text ở giữa */}
                <div className="text-left">
                  <h3 className="text-xs font-bold text-slate-800">
                    Hỗ trợ &amp; Khiếu nại đơn hàng
                  </h3>
                  <p className="text-[11px] text-slate-400 font-medium">
                    Theo dõi tiến độ hoàn tiền &amp; xử lý sự cố vé
                  </p>
                </div>
              </div>

              {/* Cột phải: Micro-badge màu hổ phách + Icon mũi tên ChevronRight */}
              <div className="flex items-center gap-2">
                <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
                  1 đang xử lý
                </span>
                <ChevronRight size={16} className="text-slate-300" />
              </div>
            </Link>
          </section>

          {/* ═══════════════════════════════════════════════════════
              6. CÀI ĐẶT CHUNG (General Settings)
          ═══════════════════════════════════════════════════════ */}
          <section id="account-settings-menu" aria-label="Cài đặt chung">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1 h-4 bg-slate-700 rounded-full flex-shrink-0" />
              <h2 className="text-xs font-bold text-slate-800 tracking-wider uppercase">
                Cài đặt chung
              </h2>
            </div>

            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden divide-y divide-slate-100">
              {/* 1. Thông tin cá nhân */}
              <button
                type="button"
                onClick={() => showToast(t("personalInfo"))}
                className="w-full px-4 py-3.5 flex items-center justify-between text-left hover:bg-slate-50 active:bg-slate-100 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center flex-shrink-0 border border-sky-100 group-hover:scale-105 transition-transform">
                    <User size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">{t("personalInfo")}</p>
                    <p className="text-[10px] text-slate-400">{t("personalInfoDesc")}</p>
                  </div>
                </div>
                <ChevronRight size={16} className="text-slate-300 group-hover:text-slate-500 transition-colors" />
              </button>

              {/* 2. Ngôn ngữ (Mở Modal chọn ngôn ngữ) */}
              <button
                type="button"
                onClick={() => setIsLangModalOpen(true)}
                className="w-full px-4 py-3.5 flex items-center justify-between text-left hover:bg-slate-50 active:bg-slate-100 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0 border border-amber-100 group-hover:scale-105 transition-transform">
                    <Globe size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">{t("language")}</p>
                    <p className="text-[10px] text-slate-400">{t("languageDesc")}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <span>{supportedLanguages.find((l) => l.code === language)?.flag}</span>
                    <span>{supportedLanguages.find((l) => l.code === language)?.name}</span>
                  </span>
                  <ChevronRight size={16} className="text-slate-300 group-hover:text-slate-500 transition-colors" />
                </div>
              </button>

              {/* 3. Hỗ trợ du khách 1900 6888 */}
              <a
                href="tel:19006888"
                onClick={() => showToast(t("supportHotline"))}
                className="w-full px-4 py-3.5 flex items-center justify-between text-left hover:bg-rose-50/50 active:bg-rose-50 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center flex-shrink-0 border border-rose-100 group-hover:scale-105 transition-transform">
                    <PhoneCall size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">{t("supportHotline")}</p>
                    <p className="text-[10px] text-slate-400">{t("supportHotlineDesc")}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-rose-500">
                  <span>{t("callNow")}</span>
                  <ChevronRight size={16} className="text-rose-400" />
                </div>
              </a>

              {/* 4. Nút chữ đỏ Đăng xuất */}
              <button
                type="button"
                onClick={handleLogout}
                className="w-full px-4 py-3.5 flex items-center justify-between text-left hover:bg-rose-50/70 active:bg-rose-100 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <LogOut size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-rose-600">{t("logOut")}</p>
                    <p className="text-[10px] text-rose-400">{t("logOutDesc")}</p>
                  </div>
                </div>
                <ChevronRight size={16} className="text-rose-400" />
              </button>
            </div>
          </section>
        </main>

        {/* ══════════════════════════════════════════════════════════
            MODAL CHỌN NGÔN NGỮ HIỂN THỊ (3 NGÔN NGỮ: VI, EN, JA)
        ══════════════════════════════════════════════════════════ */}
        {isLangModalOpen && (
          <div
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
            onClick={() => setIsLangModalOpen(false)}
          >
            <div
              className="w-full max-w-xs bg-white rounded-3xl p-5 shadow-2xl border border-slate-100 relative animate-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-3.5">
                <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                  {t("selectLanguageModalTitle")}
                </h3>
                <button
                  type="button"
                  onClick={() => setIsLangModalOpen(false)}
                  className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Đóng"
                >
                  <X size={15} />
                </button>
              </div>

              <div className="space-y-2">
                {supportedLanguages.map((langItem) => {
                  const isSelected = language === langItem.code;
                  return (
                    <button
                      key={langItem.code}
                      type="button"
                      onClick={() => {
                        setLanguage(langItem.code);
                        setIsLangModalOpen(false);
                        showToast(
                          langItem.code === "vi"
                            ? "Đã chuyển sang Tiếng Việt 🇻🇳"
                            : langItem.code === "en"
                              ? "Language changed to English 🇬🇧"
                              : "日本語に切り替えました 🇯🇵"
                        );
                      }}
                      className={`w-full p-3 rounded-2xl border flex items-center justify-between transition-all cursor-pointer active:scale-95 ${isSelected
                        ? "bg-emerald-50 border-emerald-300 text-emerald-900 shadow-2xs font-bold"
                        : "bg-slate-50/70 border-slate-200/80 text-slate-700 hover:bg-slate-100"
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{langItem.flag}</span>
                        <div className="text-left">
                          <p className="text-xs font-bold">{langItem.name}</p>
                          <p className="text-[10px] text-slate-400">{langItem.code.toUpperCase()}</p>
                        </div>
                      </div>
                      {isSelected && <Check size={16} className="text-emerald-600" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Bottom Navigation */}
        <TouristBottomNav
          activeTab="account"
          setActiveTab={() => { }}
          onOpenCheckIn={() => showToast("📸 Mở camera quét mã Check-in di tích!")}
        />
      </div>
    </div>
  );
}
