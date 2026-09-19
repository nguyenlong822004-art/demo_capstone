"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Share2,
  MapPin,
  CheckCircle2,
  Navigation,
  QrCode,
  Sparkles,
  Award,
  MessageSquareShare,
  Download,
  Camera,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Trophy,
  Star,
  Zap,
} from "lucide-react";
import TouristBottomNav from "@/components/TouristBottomNav";
import {
  journeyLogs,
  journeyAndTicketSummary,
} from "@/data/journeyAndTicketMockData";

// ─── Hằng số màu & icon theo phương thức kích hoạt ────────────────────────────
const ACTIVATION_CONFIG = {
  GPS: {
    label: "Đã xác thực qua GPS",
    icon: Navigation,
    bgClass: "bg-sky-50 text-sky-700 border-sky-200",
    dotClass: "bg-sky-500",
    timelineDotBg: "bg-sky-600",
  },
  QR: {
    label: "Quét mã QR",
    icon: QrCode,
    bgClass: "bg-violet-50 text-violet-700 border-violet-200",
    dotClass: "bg-violet-500",
    timelineDotBg: "bg-violet-600",
  },
};

// Lấy config theo phương thức kích hoạt của mỗi chặng
function getActivationConfig(method) {
  return method.toLowerCase().includes("gps")
    ? ACTIVATION_CONFIG.GPS
    : ACTIVATION_CONFIG.QR;
}

// ─── Màu theo độ khó nhiệm vụ ─────────────────────────────────────────────────
function getDifficultyStyle(difficulty) {
  switch (difficulty) {
    case "Thử thách":
      return "bg-rose-50 text-rose-700 border-rose-200";
    case "Trải nghiệm":
      return "bg-amber-50 text-amber-700 border-amber-200";
    default:
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
  }
}

// ─── Component: Thẻ hành trình từng chặng ─────────────────────────────────────
function JourneyCard({ log, index, totalCount, showToast }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const cfg = getActivationConfig(log.activationMethod);
  const ActivationIcon = cfg.icon;
  const isLast = index === totalCount - 1;

  // Tách tên nhiệm vụ và điểm từ chuỗi "+50 pts"
  const questMatch = log.solvedQuest.match(/^(.*?)\s*\((\+\d+\s*pts)\)$/);
  const questName = questMatch ? questMatch[1].trim() : log.solvedQuest;
  const questPoints = questMatch ? questMatch[2] : "";

  return (
    <div className="relative flex gap-3">
      {/* ── Trục timeline dọc ── */}
      <div className="flex flex-col items-center flex-shrink-0">
        {/* Chấm mốc tròn check-in */}
        <div
          className={`w-9 h-9 rounded-full ${cfg.timelineDotBg} border-4 border-white shadow-md flex items-center justify-center flex-shrink-0 z-10`}
        >
          <CheckCircle2 size={16} className="text-white" strokeWidth={2.5} />
        </div>
        {/* Đường kẻ nối xuống (ẩn tại trạm cuối) */}
        {!isLast && (
          <div className="w-0.5 flex-1 bg-gradient-to-b from-emerald-300 to-emerald-100 mt-1 min-h-[40px]" />
        )}
      </div>

      {/* ── Thẻ nội dung chặng ── */}
      <div className="flex-1 mb-5">
        {/* Số thứ tự & thời gian check-in */}
        <div className="flex items-center gap-2 mb-2 -mt-0.5">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
            Chặng {totalCount - index}
          </span>
          <span className="text-[10px] text-slate-400">•</span>
          <span className="text-[10px] font-semibold text-slate-500">
            {log.checkInTime}
          </span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
          {/* ── Ảnh kỷ niệm thực địa ── */}
          <div className="relative h-40 w-full overflow-hidden bg-slate-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={log.memoryImage}
              alt={log.destinationName}
              className="w-full h-full object-cover"
            />
            {/* Overlay gradient dưới để đọc text */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

            {/* Tag phương thức kích hoạt (góc trên trái) */}
            <span
              className={`absolute top-3 left-3 inline-flex items-center gap-1 text-[9.5px] font-bold px-2.5 py-1 rounded-full border backdrop-blur-md ${cfg.bgClass} shadow-sm`}
            >
              <ActivationIcon size={10} />
              {cfg.label}
            </span>

            {/* Tag độ khó (góc trên phải) */}
            <span
              className={`absolute top-3 right-3 inline-flex items-center gap-1 text-[9.5px] font-bold px-2.5 py-1 rounded-full border backdrop-blur-md ${getDifficultyStyle(log.questDifficulty)} shadow-sm`}
            >
              <Zap size={9} />
              {log.questDifficulty}
            </span>

            {/* Tên di tích đè dưới ảnh */}
            <div className="absolute bottom-3 inset-x-3 text-white">
              <p className="text-[10px] text-emerald-300 font-semibold mb-0.5 flex items-center gap-1">
                <MapPin size={10} />
                {log.location}
              </p>
              <h3 className="text-sm font-extrabold leading-tight drop-shadow-sm">
                {log.destinationName}
              </h3>
            </div>
          </div>

          {/* ── Nội dung chi tiết phía dưới ảnh ── */}
          <div className="p-3.5 space-y-3">
            {/* Nhiệm vụ đã hoàn thành */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <div className="w-7 h-7 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                  <Trophy size={13} className="text-amber-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider leading-none mb-0.5">
                    Nhiệm vụ hoàn thành
                  </p>
                  <p className="text-xs font-bold text-slate-800 truncate">
                    {questName}
                  </p>
                </div>
              </div>
              {questPoints && (
                <span className="text-sm font-black text-amber-500 flex-shrink-0 whitespace-nowrap">
                  {questPoints.replace("pts", "điểm")}
                </span>
              )}
            </div>

            {/* Chú thích ảnh kỷ niệm */}
            <div className="bg-slate-50 rounded-xl px-3 py-2 border border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                <Camera size={10} />
                Khoảnh khắc ghi lại
              </p>
              <p className="text-[11px] text-slate-600 italic leading-snug">
                &ldquo;{log.imageCaption}&rdquo;
              </p>
            </div>

            {/* Nút xem thêm / thu gọn */}
            <button
              type="button"
              onClick={() => setIsExpanded((v) => !v)}
              className="w-full flex items-center justify-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-slate-700 transition-colors py-0.5 cursor-pointer"
            >
              {isExpanded ? (
                <>
                  Thu gọn <ChevronUp size={13} />
                </>
              ) : (
                <>
                  Xem cảm nghĩ &amp; tri thức di sản <ChevronDown size={13} />
                </>
              )}
            </button>

            {/* Nội dung mở rộng */}
            {isExpanded && (
              <div className="space-y-2.5 animate-in fade-in slide-in-from-top-1 duration-200">
                {/* Cảm nghĩ ngắn của du khách */}
                <div className="bg-emerald-50/70 rounded-xl p-3 border border-emerald-100">
                  <p className="text-[9.5px] font-bold text-emerald-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <Star size={10} className="fill-emerald-600 text-emerald-600" />
                    Cảm nghĩ của tôi
                  </p>
                  <p className="text-[11px] text-emerald-900 leading-relaxed">
                    {log.shortReflection}
                  </p>
                </div>

                {/* Tri thức di sản văn hóa */}
                <div className="bg-sky-50/70 rounded-xl p-3 border border-sky-100">
                  <p className="text-[9.5px] font-bold text-sky-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <BookOpen size={10} />
                    Tri thức di sản
                  </p>
                  <p className="text-[11px] text-sky-900 leading-relaxed">
                    {log.culturalFact}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  {log.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-semibold px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full border border-slate-200"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* ── Nút tiện ích: Chia sẻ lên Diễn đàn ── */}
            <Link
              href="/community"
              className="flex items-center justify-center gap-1.5 w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 active:scale-[0.98] text-slate-700 text-[11px] font-bold transition-all cursor-pointer border border-slate-200/80"
              onClick={() =>
                showToast("Đang chuyển đến Diễn đàn cộng đồng...")
              }
            >
              <MessageSquareShare size={13} className="text-emerald-600" />
              Chia sẻ lên Diễn đàn cộng đồng
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Trang chính: Nhật Ký Tour ────────────────────────────────────────────────
export default function JourneyLogPage() {
  const [toastMessage, setToastMessage] = useState(null);
  const [isExporting, setIsExporting] = useState(false);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  // Giả lập xuất ảnh/PDF thẻ kỷ niệm
  const handleExportCard = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      showToast(
        "Đã xuất Thẻ Kỷ Niệm Di Sản vào Thư Viện Ảnh thành công! Hành trình tuần này thật đáng tự hào."
      );
    }, 1800);
  };

  // Tổng điểm từ journeyLogs
  const totalPoints = journeyLogs.reduce((acc, l) => acc + l.pointsEarned, 0);

  return (
    <div className="w-full min-h-screen bg-slate-100/80 flex justify-center items-start">
      <div className="w-full max-w-md mx-auto min-h-screen bg-slate-50 relative pb-28 shadow-2xl border-x border-slate-200 font-sans select-none flex flex-col">

        {/* ── Toast thông báo ── */}
        {toastMessage && (
          <div className="fixed top-4 left-1/2 -translate-x-1/2 max-w-sm w-11/12 z-50 bg-emerald-600/95 backdrop-blur-md text-white text-xs font-semibold px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 border border-emerald-400/30 animate-in fade-in slide-in-from-top-2 duration-300">
            <Sparkles size={15} className="text-amber-300 flex-shrink-0" />
            <span className="leading-snug">{toastMessage}</span>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════
            HEADER — Quay lại & Tiêu đề & Chia sẻ
        ══════════════════════════════════════════════════════════ */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 py-3 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Link
              href="/"
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors active:scale-95"
              title="Quay lại Trang chủ"
            >
              <ArrowLeft size={17} />
            </Link>
            <div>
              <h1 className="text-sm font-extrabold text-slate-800 leading-tight">
                Nhật Ký Khám Phá Di Sản
              </h1>
              <p className="text-[10px] text-slate-500 font-medium">
                {journeyLogs.length} chặng đã hoàn thành • Tuần này
              </p>
            </div>
          </div>

          {/* Nút chia sẻ hành trình */}
          <button
            type="button"
            onClick={() =>
              showToast(
                "Đã sao chép liên kết hành trình vào clipboard để chia sẻ!"
              )
            }
            className="w-9 h-9 rounded-full bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 flex items-center justify-center transition-all active:scale-95 cursor-pointer"
            title="Chia sẻ hành trình"
            aria-label="Chia sẻ hành trình"
          >
            <Share2 size={16} />
          </button>
        </header>

        {/* ══════════════════════════════════════════════════════════
            MILESTONE CARD — Tóm tắt thành tích hành trình tuần
        ══════════════════════════════════════════════════════════ */}
        <main className="flex-1 px-4 pt-4 pb-2">
          <div className="relative bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-700 text-white rounded-2xl p-4 shadow-lg mb-5 overflow-hidden">
            {/* Vòng trang trí nền */}
            <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-white/5 pointer-events-none" />
            <div className="absolute -bottom-8 -left-4 w-24 h-24 rounded-full bg-teal-400/10 pointer-events-none" />

            {/* Icon và tiêu đề */}
            <div className="flex items-center gap-2 mb-3 relative z-10">
              <div className="w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center">
                <Award size={18} className="text-amber-300" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-emerald-200 uppercase tracking-wider">
                  Tổng kết hành trình tuần này
                </p>
                <p className="text-xs font-extrabold text-white">
                  của Nguyễn An
                </p>
              </div>
            </div>

            {/* 3 chỉ số thành tích */}
            <div className="grid grid-cols-3 gap-2 relative z-10">
              {[
                {
                  icon: MapPin,
                  value: journeyLogs.length,
                  label: "Địa danh đã đến",
                  iconColor: "text-sky-300",
                  iconBg: "bg-sky-400/20",
                },
                {
                  icon: Sparkles,
                  value: `+${totalPoints}`,
                  label: "Điểm nhận được",
                  iconColor: "text-amber-300",
                  iconBg: "bg-amber-400/20",
                },
                {
                  icon: Award,
                  value: 2,
                  label: "Huy hiệu mở khóa",
                  iconColor: "text-violet-300",
                  iconBg: "bg-violet-400/20",
                },
              ].map((stat, i) => {
                const StatIcon = stat.icon;
                return (
                  <div
                    key={i}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-2.5 text-center border border-white/10"
                  >
                    <div
                      className={`w-7 h-7 rounded-lg ${stat.iconBg} flex items-center justify-center mx-auto mb-1`}
                    >
                      <StatIcon size={14} className={stat.iconColor} />
                    </div>
                    <p className="text-base font-black text-white leading-none">
                      {stat.value}
                    </p>
                    <p className="text-[9px] text-emerald-200 font-semibold leading-tight mt-0.5">
                      {stat.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════════
              VERTICAL JOURNEY TIMELINE
          ══════════════════════════════════════════════════════════ */}
          <div className="mb-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1 h-4 bg-emerald-600 rounded-full flex-shrink-0" />
              <h2 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">
                Dòng thời gian trải nghiệm
              </h2>
              <span className="ml-auto text-[11px] text-emerald-700 font-semibold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                {journeyLogs.length} chặng
              </span>
            </div>

            {/* Render các thẻ hành trình */}
            <div>
              {journeyLogs.map((log, index) => (
                <JourneyCard
                  key={log.id}
                  log={log}
                  index={index}
                  totalCount={journeyLogs.length}
                  showToast={showToast}
                />
              ))}
            </div>

            {/* Điểm cuối timeline — khởi đầu hành trình */}
            <div className="flex gap-3 items-center pl-1 mt-1">
              <div className="w-7 h-7 rounded-full bg-slate-200 border-4 border-white shadow-sm flex items-center justify-center flex-shrink-0">
                <span className="w-2 h-2 rounded-full bg-slate-400" />
              </div>
              <p className="text-[11px] text-slate-400 font-medium italic">
                Bắt đầu hành trình khám phá di sản của bạn...
              </p>
            </div>
          </div>
        </main>

        {/* ══════════════════════════════════════════════════════════
            NÚT XUẤT THẺ KỶ NIỆM CỐ ĐỊNH ĐÁY TRANG
        ══════════════════════════════════════════════════════════ */}
        <div className="fixed bottom-16 left-1/2 -translate-x-1/2 max-w-md w-full px-4 z-30 pointer-events-none">
          <button
            type="button"
            onClick={handleExportCard}
            disabled={isExporting}
            className={`pointer-events-auto w-full py-3.5 rounded-2xl text-xs font-extrabold shadow-xl flex items-center justify-center gap-2 transition-all active:scale-[0.97] cursor-pointer border ${
              isExporting
                ? "bg-emerald-700 border-emerald-600 cursor-wait"
                : "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 border-emerald-500/30"
            } text-white`}
            aria-label="Xuất thẻ kỷ niệm di sản"
          >
            {isExporting ? (
              <>
                <svg
                  className="animate-spin w-4 h-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                <span>Đang tạo thẻ kỷ niệm...</span>
              </>
            ) : (
              <>
                <Download size={16} />
                <span>Xuất Thẻ Kỷ Niệm Di Sản (Ảnh / PDF)</span>
                <Camera size={14} className="opacity-70" />
              </>
            )}
          </button>
        </div>

        {/* ══════════════════════════════════════════════════════════
            BOTTOM NAVIGATION BAR
        ══════════════════════════════════════════════════════════ */}
        <TouristBottomNav
          activeTab="home"
          setActiveTab={(tab) => {
            if (tab === "home") window.location.href = "/";
          }}
          onOpenCheckIn={() =>
            showToast("Mở camera quét mã Check-in di tích!")
          }
        />
      </div>
    </div>
  );
}
