"use client";

/**
 * PaymentModal.jsx
 * Bottom Sheet Drawer thanh toan ve lo trinh du lich van hoa VietCulture.
 *
 * Props:
 *  - isOpen            : boolean
 *  - onClose           : () => void
 *  - route             : object    - thong tin lo trinh can thanh toan
 *  - onSuccess         : (routeId: string) => void
 *
 * Luong UX:
 *  1. idle   — Route Summary + Cost Breakdown + Chon phuong thuc
 *  2. loading — Spinner 1.5s "Dang ket noi cong thanh toan..."
 *  3. success — Phao hoa CSS + The ve QR + Ma ve dien tu + nut kham pha
 */

import React, { useState, useEffect, useCallback } from "react";
import {
  X, Clock, MapPin, Sparkles, ChevronRight, CheckCircle2,
  ShieldCheck, CreditCard, QrCode, Banknote, Smartphone,
  Lock, Star, Navigation, Ticket, Award, PartyPopper, Copy, Check,
} from "lucide-react";

// --- Cong thanh toan ---
const PAYMENT_METHODS = [
  {
    id: "vietqr",
    label: "VietQR — Chuyển khoản ngân hàng",
    sub: "Tức thì • Hỗ trợ 40+ ngân hàng",
    icon: QrCode,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-700",
    badge: "Ưu tiên",
    badgeColor: "bg-emerald-500 text-white",
  },
  {
    id: "vnpay",
    label: "VNPAY",
    sub: "QR Pay / Thẻ ATM nội địa",
    icon: Banknote,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-700",
    badge: null,
  },
  {
    id: "momo",
    label: "Ví MoMo",
    sub: "Thanh toán ví điện tử",
    icon: Smartphone,
    iconBg: "bg-rose-100",
    iconColor: "text-rose-600",
    badge: null,
  },
  {
    id: "card",
    label: "Thẻ Quốc Tế",
    sub: "Visa / Mastercard / JCB",
    icon: CreditCard,
    iconBg: "bg-slate-100",
    iconColor: "text-slate-700",
    badge: null,
  },
];

// --- Phan tich chi phi ---
const COST_ITEMS = [
  { label: "Giá vé vào cổng di tích & thuyền", amount: "220.000 đ", isFree: false },
  { label: "Phí kích hoạt Trợ lý AI & Nhiệm vụ On-site", amount: "30.000 đ", isFree: false },
  { label: "Phí giao dịch sàn", amount: "Miễn phí", isFree: true },
];

// --- Sinh ma ve ---
function generateTicketCode(routeName) {
  const slug = (routeName || "ROUTE")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "")
    .toUpperCase()
    .slice(0, 8);
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return "VK-2026-" + slug + "-" + rand;
}

// --- Phao hoa ---
function ConfettiBlast() {
  const colors = ["bg-emerald-400","bg-amber-400","bg-sky-400","bg-rose-400","bg-violet-400","bg-teal-400"];
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (360 / 16) * i;
        const radius = 60 + (i % 3) * 12;
        const tx = Math.round(Math.cos((angle * Math.PI) / 180) * radius);
        const ty = Math.round(Math.sin((angle * Math.PI) / 180) * radius);
        const color = colors[i % colors.length];
        const size = i % 3 === 0 ? "w-2.5 h-2.5" : i % 3 === 1 ? "w-2 h-1" : "w-1.5 h-1.5";
        return (
          <span
            key={i}
            className={"absolute rounded-sm " + color + " " + size + " animate-confetti opacity-0"}
            style={{ "--tx": tx + "px", "--ty": ty + "px", animationDelay: (i * 40) + "ms" }}
          />
        );
      })}
    </div>
  );
}

// --- Component chinh ---
export default function PaymentModal({ isOpen, onClose, route, onSuccess }) {
  const [selectedMethod, setSelectedMethod] = useState("vietqr");
  const [step, setStep] = useState("idle"); // idle | loading | success
  const [ticketCode, setTicketCode] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setStep("idle");
      setSelectedMethod("vietqr");
      setTicketCode("");
      setCopied(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleConfirmPayment = useCallback(() => {
    if (step !== "idle") return;
    setStep("loading");
    setTimeout(() => {
      const code = generateTicketCode(route?.name);
      setTicketCode(code);
      setStep("success");
      setTimeout(() => { onSuccess?.(route?.id); }, 200);
    }, 1500);
  }, [step, route, onSuccess]);

  const handleCopyCode = () => {
    if (!ticketCode) return;
    navigator.clipboard?.writeText(ticketCode).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen || !route) return null;
  const totalPrice = route.ticketPrice || "250.000 đ";

  // QR matrix 7x7 tuong trung
  const QR_MATRIX = [
    [1,1,1,1,1,1,1],[1,0,0,0,0,0,1],[1,0,1,1,1,0,1],
    [1,0,1,0,1,0,1],[1,0,1,1,1,0,1],[1,0,0,0,0,0,1],[1,1,1,1,1,1,1],
  ];

  return (
    <>
      {/* Nen phu mo */}
      <div
        className="fixed inset-0 z-40 bg-black/55 backdrop-blur-sm animate-in fade-in duration-200"
        aria-hidden="true"
        onClick={() => step !== "loading" && onClose()}
      />

      {/* Bottom Sheet */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Xac nhan dat cho va thanh toan"
        className="fixed bottom-0 left-0 right-0 z-50 flex justify-center animate-in slide-in-from-bottom duration-300"
      >
        <div className="w-full max-w-md bg-white rounded-t-3xl shadow-2xl border-t border-slate-200 select-none font-sans max-h-[92vh] overflow-y-auto overscroll-contain">

          {/* Drag handle */}
          <div className="flex justify-center pt-3 pb-1 sticky top-0 bg-white/90 backdrop-blur-sm z-10">
            <div className="w-10 h-1 bg-slate-300 rounded-full" />
          </div>

          {/* ====== LOADING ====== */}
          {step === "loading" && (
            <div className="flex flex-col items-center justify-center py-16 px-6 gap-5">
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 rounded-full border-4 border-emerald-100" />
                <div className="absolute inset-0 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin" />
                <div
                  className="absolute inset-2 rounded-full border-4 border-sky-200 border-b-transparent animate-spin"
                  style={{ animationDirection: "reverse", animationDuration: "0.7s" }}
                />
              </div>
              <div className="text-center space-y-1.5">
                <p className="text-sm font-extrabold text-slate-800">
                  Đang kết nối cổng thanh toán an toàn...
                </p>
                <p className="text-xs text-slate-400 flex items-center justify-center gap-1.5">
                  <ShieldCheck size={12} className="text-emerald-500" />
                  Mã hóa SSL 256-bit đang hoạt động
                </p>
              </div>
            </div>
          )}

          {/* ====== SUCCESS ====== */}
          {step === "success" && (
            <div className="px-5 pb-8 pt-4 flex flex-col items-center gap-5 animate-in fade-in slide-in-from-bottom-2 duration-400">

              {/* Icon check + phao hoa */}
              <div className="relative flex items-center justify-center w-20 h-20">
                <ConfettiBlast />
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-200 z-10">
                  <CheckCircle2 size={38} className="text-white" strokeWidth={2.5} />
                </div>
              </div>

              {/* Tieu de */}
              <div className="text-center space-y-1">
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <PartyPopper size={16} className="text-amber-500" />
                  <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Chúc mừng!</span>
                  <PartyPopper size={16} className="text-amber-500" />
                </div>
                <h2 className="text-base font-extrabold text-slate-800">Thanh toán thành công!</h2>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Vé điện tử của bạn đã được kích hoạt và sẵn sàng sử dụng
                </p>
              </div>

              {/* The ve dien tu gradient */}
              <div className="w-full bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-700 rounded-2xl p-4 text-white shadow-lg relative overflow-hidden">
                <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-white/5 pointer-events-none" />
                <div className="absolute -bottom-6 -left-2 w-16 h-16 rounded-full bg-teal-400/10 pointer-events-none" />
                <div className="relative z-10">
                  <div className="flex items-center gap-1.5 mb-3">
                    <Ticket size={14} className="text-emerald-200" />
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-200">
                      VietCulture • Vé điện tử đã xác thực
                    </span>
                  </div>
                  <p className="text-sm font-extrabold leading-snug mb-3">{route.name}</p>
                  <div className="flex items-center gap-1 mb-3">
                    <div className="w-3 h-3 rounded-full bg-emerald-900/40 -ml-5 flex-shrink-0" />
                    <div className="flex-1 border-t-2 border-dashed border-emerald-400/40" />
                    <div className="w-3 h-3 rounded-full bg-emerald-900/40 -mr-5 flex-shrink-0" />
                  </div>
                  <div className="flex items-end justify-between gap-3">
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-1.5 text-[10px] text-emerald-200">
                        <Clock size={10} /><span>{route.duration}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] text-emerald-200">
                        <MapPin size={10} /><span>{route.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] text-emerald-200">
                        <Award size={10} /><span>Thưởng {route.rewardPoints} khi hoàn thành</span>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-1.5 shadow-sm flex-shrink-0">
                      <svg width="52" height="52" viewBox="0 0 7 7">
                        {QR_MATRIX.map((row, r) =>
                          row.map((cell, c) =>
                            cell ? <rect key={r + "-" + c} x={c} y={r} width={1} height={1} fill="#065f46" /> : null
                          )
                        )}
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ma ve + Copy */}
              <div className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3.5 flex items-center justify-between gap-3">
                <div>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Mã vé điện tử</p>
                  <p className="text-xs font-black text-slate-800 font-mono tracking-wide">{ticketCode}</p>
                </div>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className={"flex items-center gap-1.5 px-3 py-2 rounded-xl text-[10px] font-bold transition-all cursor-pointer " +
                    (copied
                      ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                      : "bg-slate-200 text-slate-700 hover:bg-slate-300 border border-slate-300")}
                >
                  {copied ? <Check size={12} /> : <Copy size={12} />}
                  {copied ? "Đã sao chép!" : "Sao chép"}
                </button>
              </div>

              {/* Quyen loi da mo khoa */}
              <div className="w-full space-y-2">
                <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Quyền lợi đã kích hoạt</p>
                {[
                  "Thẻ thông hành QR qua cổng di tích",
                  "Mở khóa toàn bộ nhiệm vụ GPS thực địa",
                  "Trợ lý AI thuyết minh 24/7 cá nhân hóa",
                  "Nhận " + route.rewardPoints + " điểm khi hoàn thành hành trình",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                    <CheckCircle2 size={14} className="text-emerald-500 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Nut vao kham pha */}
              <button
                type="button"
                onClick={onClose}
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-extrabold rounded-2xl shadow-lg shadow-emerald-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Navigation size={16} />
                <span>Vào khám phá lộ trình ngay bây giờ!</span>
              </button>
            </div>
          )}

          {/* ====== IDLE ====== */}
          {step === "idle" && (
            <div className="px-5 pb-8 pt-2 space-y-5">

              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-extrabold text-slate-800 leading-tight">
                    Xác Nhận Đặt Chỗ &amp; Thanh Toán
                  </h2>
                  <p className="text-[10px] text-slate-400 font-medium mt-0.5 flex items-center gap-1">
                    <Lock size={9} />Giao dịch bảo mật SSL 256-bit
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors cursor-pointer flex-shrink-0"
                  aria-label="Dong modal"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Route Summary */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3 flex items-center gap-3">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-200 flex-shrink-0 shadow-sm">
                  {route.coverImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={route.coverImage} alt={route.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-emerald-100">
                      <MapPin size={20} className="text-emerald-600" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-extrabold text-slate-800 leading-snug truncate">{route.name}</p>
                  <div className="mt-1.5 space-y-1">
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                      <Clock size={10} className="text-sky-500 flex-shrink-0" />
                      <span>Thời lượng {route.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                      <MapPin size={10} className="text-rose-500 flex-shrink-0" />
                      <span>{route.stops?.length || 3} trạm dừng thực tế</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] text-emerald-700 font-semibold">
                      <Sparkles size={10} className="text-amber-500 flex-shrink-0" />
                      <span>Thưởng {route.rewardPoints} sau khi hoàn thành</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-0.5 flex-shrink-0">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center">
                    <Star size={15} className="fill-amber-400 text-amber-400" />
                  </div>
                  <span className="text-[10px] font-black text-amber-700">{route.rating}</span>
                </div>
              </div>

              {/* Cost Breakdown */}
              <div>
                <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-2.5">
                  Phân tích chi phí
                </p>
                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 space-y-2 text-xs">
                  {COST_ITEMS.map((item, i) => (
                    <div key={i} className="flex items-center justify-between gap-2">
                      <span className="text-slate-600 leading-snug flex-1">{item.label}</span>
                      <span className={"font-bold flex-shrink-0 " + (item.isFree ? "text-emerald-600" : "text-slate-800")}>
                        {item.amount}
                      </span>
                    </div>
                  ))}
                  <div className="border-t border-dashed border-slate-300 pt-2 mt-2 flex items-center justify-between">
                    <span className="font-extrabold text-slate-700 text-xs">Tổng cộng</span>
                    <span className="font-black text-base text-rose-600">{totalPrice}</span>
                  </div>
                </div>
                <div className="mt-2.5 bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Ticket size={11} className="text-amber-700" />
                  </div>
                  <p className="text-[10.5px] text-amber-900 leading-relaxed">
                    <span className="font-bold">Quyền lợi bao gồm:</span>{" "}
                    Thẻ thông hành QR qua cổng + Mở khóa toàn bộ nhiệm vụ GPS + Trợ lý AI thuyết minh 24/7
                  </p>
                </div>
              </div>

              {/* Payment Method Selection */}
              <div>
                <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-2.5">
                  Phương thức thanh toán
                </p>
                <div className="space-y-2">
                  {PAYMENT_METHODS.map((method) => {
                    const Icon = method.icon;
                    const isSelected = selectedMethod === method.id;
                    return (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setSelectedMethod(method.id)}
                        className={"w-full flex items-center gap-3 p-3 rounded-2xl border text-left transition-all cursor-pointer active:scale-[0.99] " +
                          (isSelected
                            ? "border-sky-600 bg-sky-50/40 shadow-sm ring-1 ring-sky-300"
                            : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60")}
                      >
                        <div className={"w-10 h-10 rounded-xl " + method.iconBg + " " + method.iconColor +
                          " flex items-center justify-center flex-shrink-0 transition-transform " +
                          (isSelected ? "scale-105" : "")}>
                          <Icon size={20} strokeWidth={1.8} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className={"text-xs font-bold " + (isSelected ? "text-sky-800" : "text-slate-800")}>
                              {method.label}
                            </p>
                            {method.badge && (
                              <span className={"text-[9px] font-extrabold px-1.5 py-0.5 rounded-full " + method.badgeColor}>
                                {method.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-[10px] text-slate-400 font-medium mt-0.5">{method.sub}</p>
                        </div>
                        <div className={"w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all " +
                          (isSelected ? "border-sky-600 bg-sky-600" : "border-slate-300")}>
                          {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* CTA Button */}
              <div className="space-y-3">
                <button
                  type="button"
                  id="payment-confirm-btn"
                  onClick={handleConfirmPayment}
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-extrabold rounded-2xl shadow-lg shadow-emerald-200/50 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShieldCheck size={16} />
                  <span>Xác nhận thanh toán {totalPrice}</span>
                  <ChevronRight size={16} />
                </button>
                <div className="flex items-center justify-center gap-4 text-[10px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <ShieldCheck size={10} className="text-emerald-500" />SSL bảo mật
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 size={10} className="text-sky-500" />Hoàn tiền 24h
                  </span>
                  <span className="flex items-center gap-1">
                    <Lock size={10} className="text-slate-500" />Không lưu thẻ
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Confetti animation */}
      <style>{`
        @keyframes confetti-burst {
          0%   { opacity: 1; transform: translate(0, 0) rotate(0deg) scale(1); }
          80%  { opacity: 0.8; }
          100% { opacity: 0; transform: translate(var(--tx), var(--ty)) rotate(360deg) scale(0.4); }
        }
        .animate-confetti { animation: confetti-burst 0.7s ease-out forwards; }
      `}</style>
    </>
  );
}
