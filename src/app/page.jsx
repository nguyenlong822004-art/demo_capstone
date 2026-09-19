"use client";

import React, { useState } from "react";
import {
  MapPin,
  Bell,
  Navigation,
  QrCode,
  Sparkles,
  ChevronRight,
  Camera,
  HelpCircle,
  Award,
  Star,
  Compass,
  X,
  CheckCircle2,
  Clock,
  MessageSquareShare,
} from "lucide-react";
import TouristBottomNav from "@/components/TouristBottomNav";
import OnSiteActivationCard from "@/components/OnSiteActivationCard";
import OnSiteActivationModal from "@/components/OnSiteActivationModal";
import MissionModal from "@/components/MissionModal";
import AIGuideDrawer from "@/components/AIGuideDrawer";
import DashboardGrid from "@/components/DashboardGrid";
import RecommendedRoutes from "@/components/RecommendedRoutes";
import {
  currentUser,
  recommendedRoutes,
  activeMissions,
  aiQuickQuestions,
} from "@/data/touristMockData";

/**
 * Cổng Thông Tin Du Lịch Quốc Gia - Phân hệ Khách Du Lịch (Tourist)
 * Thiết kế giao diện Mobile View chuẩn trải nghiệm di sản văn hóa Việt Nam
 */
export default function TouristHomePage() {
  // Trạng thái điều hướng & điểm thưởng
  const [activeTab, setActiveTab] = useState("home");
  const [notice, setNotice] = useState(null);
  const [userPoints, setUserPoints] = useState(currentUser.rewardPoints);

  // Trạng thái Modals & Drawer
  const [isActivationOpen, setIsActivationOpen] = useState(false);
  const [activationTab, setActivationTab] = useState("qr");
  const [isMissionOpen, setIsMissionOpen] = useState(false);
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [aiInitialQuestion, setAiInitialQuestion] = useState("");
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [hasUnreadNotification, setHasUnreadNotification] = useState(true);

  // Danh sách thông báo mẫu du lịch di sản
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "🎁 Nhận thưởng Check-in Văn Miếu",
      desc: "Bạn đã nhận được +50 điểm di sản khi hoàn thành tương tác trắc nghiệm.",
      time: "15 phút trước",
      isUnread: true,
      tag: "Điểm thưởng",
      tagColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    {
      id: 2,
      title: "🏮 Khai mạc Tour Đêm Văn Miếu",
      desc: "Chương trình trải nghiệm 3D mapping 'Tinh hoa Đạo học' bắt đầu lúc 19:30 tối nay.",
      time: "1 giờ trước",
      isUnread: true,
      tag: "Sự kiện",
      tagColor: "bg-amber-50 text-amber-700 border-amber-200",
    },
    {
      id: 3,
      title: "🧭 AI gợi ý lộ trình mới cho bạn",
      desc: "Khám phá tuyến 'Dấu ấn Thăng Long ngàn năm' kết hợp 5 di tích trọng điểm.",
      time: "Hôm qua",
      isUnread: false,
      tag: "Gợi ý",
      tagColor: "bg-sky-50 text-sky-700 border-sky-200",
    },
  ]);

  // Hàm hiển thị Toast thông báo tương tác
  const showNotice = (msg) => {
    setNotice(msg);
    setTimeout(() => setNotice(null), 3500);
  };

  // Đánh dấu tất cả thông báo đã đọc
  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isUnread: false })));
    setHasUnreadNotification(false);
    showNotice("Đã đánh dấu tất cả thông báo là đã đọc");
  };

  // Xử lý mở modal Kích hoạt tại chỗ (QR / GPS)
  const handleOpenCheckIn = () => {
    setActivationTab("qr");
    setIsActivationOpen(true);
  };

  const handleCheckInGPS = () => {
    setActivationTab("gps");
    setIsActivationOpen(true);
  };

  const handleScanQR = () => {
    setActivationTab("qr");
    setIsActivationOpen(true);
  };

  // Chuyển từ check-in sang làm nhiệm vụ
  const handleUnlockMission = () => {
    setIsActivationOpen(false);
    setIsMissionOpen(true);
    showNotice("🎯 Hãy hoàn thành câu hỏi trắc nghiệm để nhận điểm thưởng!");
  };

  // Hoàn thành nhiệm vụ cộng điểm thưởng
  const handleCompleteMission = (points) => {
    setUserPoints((prev) => prev + points);
    showNotice(`⭐ Chúc mừng! Bạn nhận được +${points} điểm thưởng vào ví di sản!`);
  };

  // Mở Trợ lý AI Hướng Dẫn
  const handleOpenAI = (question = "") => {
    setAiInitialQuestion(question);
    setIsAIOpen(true);
  };

  // Chọn lộ trình
  const handleSelectRoute = (route) => {
    showNotice(`Đã chọn lộ trình: ${route.name}`);
  };

  // Xử lý tiện ích 4 ô
  const handleSelectUtility = (utilityId, label) => {
    if (utilityId === "ai_guide") {
      handleOpenAI("");
    } else if (utilityId === "heritage_quiz") {
      setIsMissionOpen(true);
    } else {
      showNotice(`Đang mở tiện ích: ${label}`);
    }
  };

  return (
    // Wrapper hỗ trợ hiển thị đẹp mắt cả trên Desktop lẫn thiết bị Di Động
    <div className="w-full min-h-screen bg-slate-100/80 flex justify-center items-start">
      {/* ══════════════════════════════════════════════════════════
          KHUNG CHỨA ỨNG DỤNG (APP CONTAINER)
          Chuẩn tỷ lệ Mobile View theo thiết kế Cổng Thông Tin Du Lịch
      ══════════════════════════════════════════════════════════ */}
      <div className="w-full max-w-md mx-auto min-h-screen bg-slate-50 relative pb-24 shadow-2xl border-x border-slate-200 select-none overflow-x-hidden font-sans">

        {/* Toast thông báo tương tác nhanh */}
        {notice && (
          <div className="fixed top-4 left-1/2 -translate-x-1/2 max-w-sm w-11/12 z-50 bg-emerald-600/95 backdrop-blur-md text-white text-xs font-semibold px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 border border-emerald-400/30 animate-bounce">
            <Sparkles size={16} className="text-amber-300 flex-shrink-0" />
            <span className="leading-snug">{notice}</span>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════
            HERO BANNER TRÀN VIỀN (Chữ & Nút nổi trực tiếp trên ảnh)
        ══════════════════════════════════════════════════════════ */}
        <header className="h-80 w-full relative overflow-hidden bg-sky-900">
          {/* Ảnh nền phong cảnh di sản Văn Miếu - Hà Nội */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="image/vanmieu.png"
            alt="Di tích Văn Miếu Quốc Tử Giám - Hà Nội"
            className="absolute inset-0 w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-1000 ease-out"
          />

          {/* Phủ lớp gradient chuyển màu mượt mà */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-slate-50/90 pointer-events-none" />

          {/* ── Cụm Top Bar nổi trực tiếp ở mép trên ảnh ── */}
          <div className="absolute top-0 inset-x-0 pt-4 px-4 flex items-center justify-between z-20">
            {/* Góc bên trái: Chip vị trí 'Hà Nội, VN' kèm icon MapPin */}
            <div className="bg-black/35 backdrop-blur-md text-white border border-white/20 px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-sm">
              <MapPin size={13} className="text-emerald-400 flex-shrink-0" />
              <span>Hà Nội, VN</span>
            </div>

            {/* Góc bên phải: Nút chuông thông báo dạng nút tròn kính mờ */}
            <button
              type="button"
              onClick={() => setIsNotificationOpen(true)}
              aria-label="Thông báo du khách"
              className="relative w-9 h-9 rounded-full bg-black/35 backdrop-blur-md border border-white/20 flex items-center justify-center text-white active:scale-95 transition-transform hover:bg-black/50 cursor-pointer focus:outline-none"
            >
              <Bell size={17} strokeWidth={2.2} />
              {hasUnreadNotification && (
                <span className="w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white absolute top-1 right-1" />
              )}
            </button>
          </div>

          {/* ── Tiêu đề đè ở chân ảnh: Thẻ kính mờ trắng sáng (White Glassmorphism) ── */}
          <div className="absolute bottom-4 inset-x-0 px-4 z-20 flex justify-center">
            <div className="max-w-[340px] w-full mx-auto px-5 py-3 bg-white/80 backdrop-blur-md border border-white/80 rounded-2xl text-center shadow-[0_4px_20px_rgba(0,0,0,0.12)]">
              <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-emerald-700">
                TRẢI NGHIỆM THỰC TẾ DI SẢN
              </span>
              <h1 className="text-base font-bold text-slate-800 tracking-tight mt-0.5 leading-snug">
                Chạm vào Lịch sử - Khám phá Văn hóa
              </h1>
            </div>
          </div>
        </header>

        {/* ══════════════════════════════════════════════════════════
            MAIN CONTENT — NỘI DUNG TƯƠNG TÁC DU LỊCH VĂN HÓA
        ══════════════════════════════════════════════════════════ */}
        <main className="px-4 -mt-3 relative z-10 space-y-5">
          {/* ── User Welcome Profile Card ── */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-100 p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-11 h-11 rounded-full border-2 border-emerald-400 bg-sky-50 shadow-xs"
              />
              <div>
                <p className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  Xin chào, {currentUser.name}
                  <span className="inline-block animate-wave">👋</span>
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                    {currentUser.level}
                  </span>
                </div>
              </div>
            </div>

            {/* Điểm thưởng & Huy hiệu */}
            <div className="flex items-center gap-2">
              <div className="bg-amber-50 text-amber-800 border border-amber-200/70 px-2.5 py-1 rounded-xl text-xs font-extrabold flex items-center gap-1 shadow-2xs">
                <Star size={13} className="fill-amber-400 text-amber-500" />
                <span>{userPoints}</span>
              </div>
              <div className="bg-sky-50 text-sky-800 border border-sky-200/70 px-2.5 py-1 rounded-xl text-xs font-extrabold flex items-center gap-1 shadow-2xs">
                <Award size={13} className="text-sky-600" />
                <span>{currentUser.badgeCount}</span>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════
              KHỐI KÍCH HOẠT TẠI CHỖ (ON-SITE ACTIVATION)
              Định vị GPS & Quét mã QR tại di tích
          ═══════════════════════════════════════════════════════ */}
          <OnSiteActivationCard
            onCheckInGPS={handleCheckInGPS}
            onScanQR={handleScanQR}
          />

          {/* ═══════════════════════════════════════════════════════
              LỘ TRÌNH VĂN HÓA AI GỢI Ý (RECOMMENDED ROUTES)
          ═══════════════════════════════════════════════════════ */}
          <RecommendedRoutes
            routes={recommendedRoutes}
            onSelectRoute={handleSelectRoute}
          />

          {/* ═══════════════════════════════════════════════════════
              NHIỆM VỤ ĐANG HOẠT ĐỘNG (ACTIVE MISSIONS)
          ═══════════════════════════════════════════════════════ */}
          <section aria-label="Nhiệm vụ di sản">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="w-1 h-4 bg-amber-500 rounded-full flex-shrink-0" />
                <h2 className="text-xs font-bold text-slate-800 tracking-wider uppercase">
                  NHIỆM VỤ ĐANG HOẠT ĐỘNG
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsMissionOpen(true)}
                className="text-xs font-semibold text-sky-600 flex items-center gap-0.5 hover:text-sky-700 transition-colors cursor-pointer"
              >
                Xem tất cả <ChevronRight size={14} />
              </button>
            </div>

            <div className="space-y-3">
              {activeMissions.map((mission) => (
                <article
                  key={mission.id}
                  onClick={() => setIsMissionOpen(true)}
                  className="bg-white rounded-2xl shadow-xs border border-slate-100 p-3.5 flex items-center gap-3.5 hover:shadow-md hover:border-slate-200 transition-all cursor-pointer active:scale-[0.98]"
                >
                  {/* Icon loại nhiệm vụ */}
                  <div
                    className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${
                      mission.type === "QUIZ"
                        ? "bg-amber-100/80 text-amber-600"
                        : "bg-sky-100/80 text-sky-600"
                    }`}
                  >
                    {mission.type === "QUIZ" ? (
                      <HelpCircle size={24} strokeWidth={2.2} />
                    ) : (
                      <Camera size={24} strokeWidth={2.2} />
                    )}
                  </div>

                  {/* Nội dung nhiệm vụ */}
                  <div className="flex-1 min-w-0">
                    <span
                      className={`text-[0.6rem] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        mission.type === "QUIZ"
                          ? "bg-amber-500 text-white"
                          : "bg-sky-500 text-white"
                      }`}
                    >
                      {mission.type === "QUIZ" ? "Trắc Nghiệm" : "Chụp Ảnh"}
                    </span>
                    <p className="text-sm font-bold text-slate-800 mt-1 truncate">
                      {mission.siteName}
                    </p>
                    <p className="text-xs text-slate-500 truncate">
                      {mission.title}
                    </p>
                  </div>

                  {/* Điểm thưởng */}
                  <div className="flex-shrink-0 text-right">
                    <p className="text-base font-black text-emerald-600 leading-tight">
                      +{mission.rewardPoints}
                    </p>
                    <p className="text-[0.65rem] text-slate-400 font-semibold">
                      điểm thưởng
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════
              DASHBOARD GRID — TIỆN ÍCH TRẢI NGHIỆM (4 Ô PASTEL)
          ═══════════════════════════════════════════════════════ */}
          <DashboardGrid onSelectUtility={handleSelectUtility} />

          {/* ═══════════════════════════════════════════════════════
              AI QUICK QUESTIONS — HỎI NHANH AI THUYẾT MINH
          ═══════════════════════════════════════════════════════ */}
          <section aria-label="Hỏi nhanh trợ lý AI">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1 h-4 bg-sky-500 rounded-full flex-shrink-0" />
              <h2 className="text-xs font-bold text-slate-800 tracking-wider uppercase">
                HỎI NHANH AI HƯỚNG DẪN VIÊN
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {aiQuickQuestions.map((q) => (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => handleOpenAI(q.text)}
                  className="bg-white border border-slate-200/80 rounded-xl p-3 text-left text-xs font-medium text-slate-700 flex items-start gap-2 hover:border-sky-400 hover:bg-sky-50/40 hover:shadow-xs transition-all active:scale-[0.97] cursor-pointer group"
                >
                  <span className="text-base flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                    {q.icon}
                  </span>
                  <span className="leading-snug line-clamp-2">{q.text}</span>
                </button>
              ))}
            </div>
          </section>
        </main>

        {/* ══════════════════════════════════════════════════════════
            BOTTOM TAB BAR — TouristBottomNav (5 tabs cố định)
            1: Trang chủ | 2: Lộ trình | 3: Check-in nhô cao
            4: Diễn đàn (/community) | 5: Tài khoản (/profile)
        ══════════════════════════════════════════════════════════ */}
        <TouristBottomNav
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onOpenCheckIn={handleOpenCheckIn}
        />

        {/* ══════════════════════════════════════════════════════════
            MODAL THÔNG BÁO NHANH (QUICK NOTIFICATION MODAL)
        ══════════════════════════════════════════════════════════ */}
        {isNotificationOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-200">
            <div
              className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[85vh] animate-in slide-in-from-bottom duration-300"
              role="dialog"
              aria-modal="true"
              aria-labelledby="notification-modal-title"
            >
              {/* Header Modal */}
              <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-50 to-white">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <Bell size={16} />
                  </div>
                  <div>
                    <h3
                      id="notification-modal-title"
                      className="text-sm font-bold text-slate-800"
                    >
                      Thông Báo Di Sản
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      Cập nhật sự kiện, điểm thưởng & lộ trình
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsNotificationOpen(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors cursor-pointer"
                  aria-label="Đóng"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Danh sách thông báo */}
              <div className="p-4 overflow-y-auto space-y-3 flex-1">
                <div className="flex items-center justify-between pb-1">
                  <span className="text-xs font-semibold text-slate-500">
                    Mới nhất
                  </span>
                  {hasUnreadNotification && (
                    <button
                      type="button"
                      onClick={handleMarkAllRead}
                      className="text-xs text-emerald-600 hover:text-emerald-700 font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <CheckCircle2 size={13} />
                      Đánh dấu đã đọc
                    </button>
                  )}
                </div>

                {notifications.map((item) => (
                  <div
                    key={item.id}
                    className={`p-3 rounded-2xl border transition-all ${
                      item.isUnread
                        ? "bg-emerald-50/30 border-emerald-100 shadow-2xs"
                        : "bg-white border-slate-100 hover:bg-slate-50/60"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${item.tagColor}`}
                        >
                          {item.tag}
                        </span>
                        {item.isUnread && (
                          <span className="w-2 h-2 rounded-full bg-rose-500 flex-shrink-0" />
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400 flex items-center gap-1 flex-shrink-0">
                        <Clock size={11} />
                        {item.time}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-slate-800 mt-1.5">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Footer Modal */}
              <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsNotificationOpen(false)}
                  className="w-full py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition-colors cursor-pointer text-center"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════
            ON-SITE ACTIVATION MODAL — Quét QR & Định Vị GPS
        ══════════════════════════════════════════════════════════ */}
        <OnSiteActivationModal
          isOpen={isActivationOpen}
          onClose={() => setIsActivationOpen(false)}
          initialTab={activationTab}
          onUnlockMission={handleUnlockMission}
        />

        {/* ══════════════════════════════════════════════════════════
            MISSION MODAL — Trắc Nghiệm Di Sản Nhận Điểm
        ══════════════════════════════════════════════════════════ */}
        <MissionModal
          isOpen={isMissionOpen}
          onClose={() => setIsMissionOpen(false)}
          onComplete={handleCompleteMission}
        />

        {/* ══════════════════════════════════════════════════════════
            AI GUIDE DRAWER — Trợ Lý Ảo Thuyết Minh Di Sản 24/7
        ══════════════════════════════════════════════════════════ */}
        <AIGuideDrawer
          isOpen={isAIOpen}
          onClose={() => setIsAIOpen(false)}
          initialQuestion={aiInitialQuestion}
        />
      </div>
    </div>
  );
}
