"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  QrCode,
  Navigation,
  CheckCircle2,
  Sparkles,
  Camera,
  MapPin,
  Compass,
  ArrowRight,
} from "lucide-react";

/**
 * OnSiteActivationModal
 * Bottom Sheet kích hoạt trải nghiệm thực tế di tích qua Quét QR hoặc Định vị GPS
 * 
 * Props:
 * - isOpen: boolean - Trạng thái hiển thị modal
 * - onClose: function() - Đóng modal
 * - onUnlockMission: function() - Bắt đầu làm nhiệm vụ sau khi kích hoạt thành công
 * - initialTab: string ("qr" | "gps")
 */
export default function OnSiteActivationModal({
  isOpen = false,
  onClose = () => {},
  onUnlockMission = () => {},
  initialTab = "qr",
}) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [isLocating, setIsLocating] = useState(false);

  // Đồng bộ tab ban đầu khi mở
  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
      setIsSuccess(false);
      setIsScanning(false);
      setIsLocating(false);
    }
  }, [isOpen, initialTab]);

  // Xử lý mô phỏng quét QR
  const handleSimulateQR = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setIsSuccess(true);
    }, 1000);
  };

  // Xử lý xác thực GPS
  const handleVerifyGPS = () => {
    setIsLocating(true);
    setTimeout(() => {
      setIsLocating(false);
      setIsSuccess(true);
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end justify-center transition-opacity animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* ── Khung Modal Bottom Sheet (giới hạn bề ngang max-w-md cho mobile) ── */}
      <div
        className="w-full max-w-md bg-white rounded-t-3xl shadow-2xl border-t border-slate-200 overflow-hidden max-h-[90vh] flex flex-col animate-in slide-in-from-bottom duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Nút gạt & Header ── */}
        <div className="pt-3 px-4 pb-2 relative flex items-center justify-between border-b border-slate-100">
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-slate-300 rounded-full" />

          <div className="pt-2">
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
              <Sparkles size={16} className="text-emerald-600" />
              Kích Hoạt Di Tích Thực Địa
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer mt-2"
            aria-label="Đóng modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* ── NỘI DUNG CHÍNH ── */}
        <div className="p-5 overflow-y-auto">
          {/* ═════════════════════════════════════════════════════════
              TRƯỜNG HỢP 1: THÀNH CÔNG (Màn hình chúc mừng nền xanh lá)
          ═════════════════════════════════════════════════════════ */}
          {isSuccess ? (
            <div className="space-y-4 text-center py-2 animate-in zoom-in-95 duration-300">
              {/* Thẻ chúc mừng rực rỡ */}
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-3xl p-6 shadow-xl relative overflow-hidden">
                {/* Họa tiết mờ trang trí */}
                <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />
                <div className="absolute -left-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />

                {/* Icon check phát sáng */}
                <div className="w-16 h-16 bg-white rounded-full mx-auto flex items-center justify-center text-emerald-600 shadow-md mb-3">
                  <CheckCircle2 size={36} strokeWidth={2.6} />
                </div>

                <span className="text-[0.7rem] font-extrabold uppercase tracking-widest bg-white/20 backdrop-blur-md px-3 py-1 rounded-full inline-block mb-2">
                  Xác Thực Thành Công
                </span>

                <h3 className="text-xl font-extrabold leading-snug drop-shadow-sm mb-1">
                  Đã mở khóa: Di tích Khuê Văn Các - Văn Miếu
                </h3>

                <p className="text-xs text-emerald-100 mt-2 leading-relaxed">
                  Bạn đã có mặt trực tiếp tại không gian di sản. Câu chuyện lịch sử và các câu đố tương tác đã sẵn sàng!
                </p>

                {/* Phần thưởng mở khóa */}
                <div className="mt-4 pt-3 border-t border-white/20 flex justify-around text-center">
                  <div>
                    <p className="text-[0.65rem] text-emerald-100 font-medium">Điểm khả dụng</p>
                    <p className="text-base font-extrabold text-amber-300">+100 pts</p>
                  </div>
                  <div className="w-px bg-white/20" />
                  <div>
                    <p className="text-[0.65rem] text-emerald-100 font-medium">Huy hiệu mở khóa</p>
                    <p className="text-base font-extrabold text-white">Văn Hiến 🏅</p>
                  </div>
                </div>
              </div>

              {/* Nút bấm nổi bật: [Bắt đầu làm nhiệm vụ nhận điểm] */}
              <button
                type="button"
                onClick={() => {
                  onUnlockMission();
                  onClose();
                }}
                className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold text-sm shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 active:scale-98 transition-all cursor-pointer"
              >
                <span>Bắt đầu làm nhiệm vụ nhận điểm</span>
                <ArrowRight size={18} />
              </button>

              <button
                type="button"
                onClick={onClose}
                className="text-xs font-semibold text-slate-500 hover:text-slate-700 py-1"
              >
                Khám phá xung quanh trước
              </button>
            </div>
          ) : (
            /* ═════════════════════════════════════════════════════════
                TRƯỜNG HỢP 2: TAB QUÉT QR & ĐỊNH VỊ GPS
            ═════════════════════════════════════════════════════════ */
            <div className="space-y-4">
              {/* ── 2 Tab Chuyển Đổi Linh Hoạt ── */}
              <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-2xl">
                <button
                  type="button"
                  onClick={() => setActiveTab("qr")}
                  className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === "qr"
                      ? "bg-white text-emerald-700 shadow-sm"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <QrCode size={16} />
                  <span>Quét mã QR Hiện vật</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("gps")}
                  className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === "gps"
                      ? "bg-white text-sky-700 shadow-sm"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <Navigation size={16} />
                  <span>Định vị GPS Thực địa</span>
                </button>
              </div>

              {/* ── NỘI DUNG TAB 1: QUÉT MÃ QR ── */}
              {activeTab === "qr" && (
                <div className="space-y-4 text-center">
                  {/* Khung quét camera mô phỏng thực tế */}
                  <div className="relative w-64 h-64 mx-auto rounded-3xl overflow-hidden bg-slate-950 border-2 border-emerald-500 shadow-inner flex flex-col items-center justify-center">
                    {/* Họa tiết mắt camera */}
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]" />

                    {/* 4 góc ngắm quét viewfinder */}
                    <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-emerald-400 rounded-tl-lg" />
                    <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-emerald-400 rounded-tr-lg" />
                    <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-emerald-400 rounded-bl-lg" />
                    <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-emerald-400 rounded-br-lg" />

                    {/* Laser scanning line animation */}
                    <div className="absolute inset-x-4 h-0.5 bg-emerald-400 shadow-[0_0_12px_#34d399] animate-bounce top-1/2 -translate-y-1/2" />

                    <Camera size={36} className="text-emerald-400/80 mb-2 animate-pulse" />
                    <span className="text-[0.7rem] font-medium text-emerald-200/90 z-10 px-4">
                      {isScanning
                        ? "Đang nhận diện mã hiện vật..."
                        : "Hướng camera về phía mã QR gắn trên hiện vật"}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500">
                    Mã QR được đặt tại bia tiến sĩ, cột đồng trụ hoặc cổng vào di tích.
                  </p>

                  {/* Nút giả lập: 'Mô phỏng Quét mã QR Bia số 1' để tiện demo khi chấm đồ án */}
                  <button
                    type="button"
                    onClick={handleSimulateQR}
                    disabled={isScanning}
                    className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold text-xs shadow-md shadow-emerald-600/25 flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer disabled:opacity-70"
                  >
                    <QrCode size={18} />
                    <span>
                      {isScanning
                        ? "Đang giải mã QR..."
                        : "Mô phỏng Quét mã QR Bia số 1"}
                    </span>
                  </button>
                </div>
              )}

              {/* ── NỘI DUNG TAB 2: ĐỊNH VỊ GPS THỰC ĐỊA ── */}
              {activeTab === "gps" && (
                <div className="space-y-4 text-center">
                  {/* Radar tìm kiếm tọa độ */}
                  <div className="relative w-56 h-56 mx-auto rounded-full bg-slate-900 border-2 border-sky-500/50 flex items-center justify-center overflow-hidden shadow-inner">
                    {/* Vòng tròn radar đồng tâm */}
                    <div className="absolute w-44 h-44 rounded-full border border-sky-500/20" />
                    <div className="absolute w-32 h-32 rounded-full border border-sky-500/30" />
                    <div className="absolute w-20 h-20 rounded-full border border-sky-500/40" />
                    <div className="absolute w-full h-px bg-sky-500/30" />
                    <div className="absolute h-full w-px bg-sky-500/30" />

                    {/* Chùm tia quét radar xoay tròn */}
                    <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,rgba(14,165,233,0.3)_90deg,transparent_90deg)] animate-spin [animation-duration:3s]" />

                    {/* Điểm di tích đích */}
                    <div className="absolute top-14 right-14 w-3.5 h-3.5 bg-rose-500 rounded-full ring-4 ring-rose-400/40 animate-ping" />
                    <div className="absolute top-14 right-14 w-3.5 h-3.5 bg-rose-500 rounded-full" />

                    {/* Tâm định vị người dùng */}
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="w-9 h-9 rounded-full bg-sky-600 text-white flex items-center justify-center shadow-lg ring-4 ring-sky-400/50">
                        <MapPin size={18} />
                      </div>
                    </div>
                  </div>

                  {/* Thông tin tọa độ */}
                  <div className="bg-sky-50 border border-sky-100 rounded-xl p-2.5 text-left">
                    <div className="flex items-center justify-between text-[0.7rem] text-slate-600 mb-1">
                      <span className="font-semibold text-sky-800 flex items-center gap-1">
                        <Compass size={12} className="text-sky-600" />
                        Tọa độ Văn Miếu:
                      </span>
                      <span className="font-mono text-slate-700">21.0287° N, 105.8355° E</span>
                    </div>
                    <div className="flex items-center justify-between text-[0.7rem]">
                      <span className="text-slate-500">Khoảng cách thực tế:</span>
                      <span className="font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">
                        28m (Hợp lệ &lt; 50m)
                      </span>
                    </div>
                  </div>

                  {/* Nút 'Xác thực vị trí GPS (<50m)' */}
                  <button
                    type="button"
                    onClick={handleVerifyGPS}
                    disabled={isLocating}
                    className="w-full py-3.5 px-4 bg-sky-600 hover:bg-sky-700 text-white rounded-2xl font-bold text-xs shadow-md shadow-sky-600/25 flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer disabled:opacity-70"
                  >
                    <Navigation size={18} />
                    <span>
                      {isLocating
                        ? "Đang đối soát GPS..."
                        : "Xác thực vị trí GPS (<50m)"}
                    </span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
