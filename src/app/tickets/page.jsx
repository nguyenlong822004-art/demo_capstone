"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Ticket,
  ChevronRight,
  ScanLine,
  X,
  Share2,
  CheckCircle2,
  Clock,
  Sparkles,
  CreditCard,
  Building2,
  Search,
  Filter,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";
import TouristBottomNav from "@/components/TouristBottomNav";
import {
  ticketList,
  TICKET_STATUS_CONFIG,
  journeyAndTicketSummary,
} from "@/data/journeyAndTicketMockData";

/**
 * Trang Vé & Chi Phí Riêng Biệt (/tickets)
 * Chuẩn Mobile View ứng dụng Du lịch Di sản VietCulture
 */
export default function TicketsAndExpensesPage() {
  const router = useRouter();
  const [ticketFilter, setTicketFilter] = useState("ALL"); // ALL | ACTIVE | USED | REFUNDED
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Lọc vé theo tab & tìm kiếm
  const filteredTickets = ticketList
    .filter((t) => (ticketFilter === "ALL" ? true : t.status === ticketFilter))
    .filter((t) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        t.tourName.toLowerCase().includes(q) ||
        t.destination.toLowerCase().includes(q) ||
        t.ticketCode.toLowerCase().includes(q)
      );
    });

  return (
    <div className="w-full min-h-screen bg-slate-100/80 flex justify-center items-start">
      {/* ══════════════════════════════════════════════════════════
          CONTAINER CHUẨN MOBILE VIEW
          max-w-md mx-auto min-h-screen bg-slate-50 relative pb-24 shadow-2xl border-x border-slate-200 font-sans select-none
      ══════════════════════════════════════════════════════════ */}
      <div className="w-full max-w-md mx-auto min-h-screen bg-slate-50 relative pb-24 shadow-2xl border-x border-slate-200 font-sans select-none flex flex-col">
        {/* Toast thông báo nhanh */}
        {toastMessage && (
          <div className="fixed top-4 left-1/2 -translate-x-1/2 max-w-xs w-11/12 z-50 bg-slate-900/95 backdrop-blur-md text-white text-xs font-semibold px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 border border-white/20 animate-bounce">
            <Sparkles size={16} className="text-amber-300 flex-shrink-0" />
            <span className="leading-snug">{toastMessage}</span>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════
            HEADER: Nút quay lại (ArrowLeft) -> /profile + Tiêu đề
        ══════════════════════════════════════════════════════════ */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/90 px-4 py-3.5 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => router.push("/profile")}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors active:scale-95 cursor-pointer"
              title="Quay lại Hồ sơ cá nhân"
            >
              <ArrowLeft size={18} />
            </button>
            <div>
              <h1 className="text-sm font-extrabold text-slate-800 leading-tight">
                Ví Vé &amp; Chi Phí
              </h1>
              <p className="text-[10px] text-slate-400 font-medium leading-none mt-0.5">
                Quản lý vé điện tử &amp; lịch sử thanh toán di sản
              </p>
            </div>
          </div>

          <span className="text-[11px] font-bold text-slate-500 bg-slate-100 border border-slate-200/80 px-2.5 py-1 rounded-full">
            {ticketList.length} vé trong ví
          </span>
        </header>

        {/* ══════════════════════════════════════════════════════════
            MAIN CONTENT
        ══════════════════════════════════════════════════════════ */}
        <main className="flex-1 p-4 space-y-4">
          {/* ── KPI Stats Bar ── */}
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-emerald-50 border border-emerald-200/70 rounded-2xl p-2.5 text-center">
              <p className="text-base font-black text-emerald-700">
                {journeyAndTicketSummary.activeTicketsCount}
              </p>
              <p className="text-[9.5px] font-bold text-emerald-600 leading-tight mt-0.5">
                Còn hiệu lực
              </p>
            </div>
            <div className="bg-slate-100 border border-slate-200/70 rounded-2xl p-2.5 text-center">
              <p className="text-base font-black text-slate-600">
                {journeyAndTicketSummary.usedTicketsCount}
              </p>
              <p className="text-[9.5px] font-bold text-slate-500 leading-tight mt-0.5">
                Đã sử dụng
              </p>
            </div>
            <div className="bg-amber-50 border border-amber-200/70 rounded-2xl p-2.5 text-center">
              <p className="text-base font-black text-amber-600">
                {journeyAndTicketSummary.totalExpenseFormatted}
              </p>
              <p className="text-[9.5px] font-bold text-amber-600 leading-tight mt-0.5">
                Tổng chi
              </p>
            </div>
          </div>

          {/* ── Thanh tìm kiếm vé nhanh ── */}
          <div className="relative">
            <Search
              size={15}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo tên tour, di tích, mã vé..."
              className="w-full pl-9.5 pr-4 py-2 bg-white rounded-xl border border-slate-200/90 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* ── Filter Tabs ── */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
            {[
              { key: "ALL", label: "Tất cả", count: ticketList.length },
              {
                key: "ACTIVE",
                label: "Còn hiệu lực",
                count: journeyAndTicketSummary.activeTicketsCount,
              },
              {
                key: "USED",
                label: "Đã dùng",
                count: journeyAndTicketSummary.usedTicketsCount,
              },
              {
                key: "REFUNDED",
                label: "Hoàn tiền",
                count: journeyAndTicketSummary.refundedTicketsCount,
              },
            ].map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setTicketFilter(tab.key)}
                className={`px-3 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap transition-all flex-shrink-0 flex items-center gap-1 cursor-pointer active:scale-95 ${
                  ticketFilter === tab.key
                    ? "bg-rose-600 text-white shadow-sm"
                    : "bg-white text-slate-500 border border-slate-200 hover:border-slate-300"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] font-black px-1 rounded-full ${
                    ticketFilter === tab.key
                      ? "bg-white/20 text-white"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* ── Danh sách thẻ vé ── */}
          <div className="space-y-3">
            {filteredTickets.map((ticket) => {
              const statusCfg = TICKET_STATUS_CONFIG[ticket.status];
              const isActive = ticket.status === "ACTIVE";
              const isRefunded = ticket.status === "REFUNDED";

              return (
                <div
                  key={ticket.ticketCode}
                  onClick={() => setSelectedTicket(ticket)}
                  className={`bg-white rounded-2xl border shadow-sm hover:shadow-md active:scale-[0.99] transition-all cursor-pointer relative overflow-hidden ${
                    isActive
                      ? "border-emerald-200/80"
                      : isRefunded
                      ? "border-amber-200/60"
                      : "border-slate-100"
                  }`}
                >
                  {/* Dải màu trạng thái trên cùng */}
                  <div
                    className={`h-1 w-full ${
                      isActive
                        ? "bg-gradient-to-r from-emerald-500 to-teal-400"
                        : isRefunded
                        ? "bg-gradient-to-r from-amber-400 to-orange-300"
                        : "bg-gradient-to-r from-slate-300 to-slate-200"
                    }`}
                  />

                  <div className="p-4">
                    {/* Row 1: Status badge + Mã vé */}
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          statusCfg?.badgeClass ?? ""
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${statusCfg?.dotClass}`}
                        />
                        {statusCfg?.label}
                      </span>
                      <span className="text-[10px] font-mono font-bold text-slate-400 tracking-widest">
                        {ticket.ticketCode}
                      </span>
                    </div>

                    <div className="flex items-end justify-between gap-3">
                      {/* Thông tin chính */}
                      <div className="min-w-0 flex-1">
                        <h3 className="text-xs font-extrabold text-slate-800 leading-snug mb-0.5">
                          {ticket.tourName}
                        </h3>
                        <p className="text-[10.5px] text-slate-500 truncate">
                          {ticket.destination}
                        </p>

                        {/* Meta row: cổng thanh toán + giá */}
                        <div className="flex items-center gap-2 mt-2">
                          <span
                            className={`text-[9.5px] font-bold px-2 py-0.5 rounded-full border ${
                              ticket.paymentGateway === "VNPay"
                                ? "bg-blue-50 text-blue-700 border-blue-200/70"
                                : "bg-rose-50 text-rose-700 border-rose-200/70"
                            }`}
                          >
                            {ticket.paymentGateway}
                          </span>
                          <span className="text-[10px] text-slate-400">•</span>
                          <span
                            className={`text-xs font-extrabold ${
                              ticket.numericPrice === 0
                                ? "text-emerald-600"
                                : "text-slate-800"
                            }`}
                          >
                            {ticket.price}
                          </span>
                        </div>

                        <p className="text-[9.5px] text-slate-400 mt-1.5">
                          Mua: {ticket.purchaseDate}
                        </p>
                      </div>

                      {/* Mã QR nhỏ */}
                      <div
                        className={`flex flex-col items-center justify-center p-1.5 rounded-xl border flex-shrink-0 ${
                          isActive
                            ? "bg-emerald-50/50 border-emerald-200/60"
                            : "bg-slate-50 border-slate-200/70"
                        }`}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={ticket.qrCodeUrl}
                          alt={`QR ${ticket.ticketCode}`}
                          className={`w-12 h-12 rounded-lg ${
                            !isActive ? "opacity-40 grayscale" : ""
                          }`}
                        />
                        <span className="text-[8px] font-bold text-slate-400 mt-0.5">
                          {isActive ? "Sẵn sàng quét" : "Không khả dụng"}
                        </span>
                      </div>
                    </div>

                    {/* Divider + Hành động nhanh nếu ACTIVE */}
                    {isActive && (
                      <div className="mt-3 pt-2.5 border-t border-emerald-100 flex items-center justify-between">
                        <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                          <ScanLine size={11} className="text-emerald-600" />
                          Sẵn sàng quét QR qua cổng di tích
                        </span>
                        <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-0.5">
                          Xem QR
                          <ChevronRight size={12} />
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Rãnh cắt cuống vé */}
                  <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-slate-100 border-r border-slate-200" />
                  <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-slate-100 border-l border-slate-200" />
                </div>
              );
            })}

            {filteredTickets.length === 0 && (
              <div className="text-center py-12 bg-white rounded-2xl border border-slate-100 p-6">
                <p className="text-3xl mb-2">🎫</p>
                <h4 className="text-xs font-bold text-slate-700">
                  Không tìm thấy vé nào
                </h4>
                <p className="text-[11px] text-slate-400 mt-1">
                  {searchQuery
                    ? `Không có kết quả khớp với "${searchQuery}".`
                    : "Chưa có vé ở trạng thái này."}
                </p>
              </div>
            )}
          </div>

          {/* ── Banner dẫn sang Hỗ trợ & Khiếu nại ── */}
          <Link
            href="/profile/disputes"
            className="w-full bg-gradient-to-r from-rose-50 to-orange-50 border border-rose-100 rounded-2xl p-3.5 flex items-center justify-between shadow-2xs hover:shadow-xs transition-all cursor-pointer active:scale-98"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-rose-500 text-white flex items-center justify-center shrink-0">
                <ShieldCheck size={16} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">
                  Cần hoàn tiền hoặc báo cáo sự cố vé?
                </p>
                <p className="text-[10.5px] text-slate-500">
                  Xem tiến độ giải quyết &amp; khiếu nại đơn hàng
                </p>
              </div>
            </div>
            <ChevronRight size={16} className="text-rose-400 shrink-0" />
          </Link>
        </main>

        {/* ══════════════════════════════════════════════════════════
            MODAL CHI TIẾT VÉ ĐIỆN TỬ — MÃ QR + QUYỀN LỢI + CỔNG THANH TOÁN
        ══════════════════════════════════════════════════════════ */}
        {selectedTicket && (
          <div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end justify-center animate-in fade-in duration-200"
            onClick={() => setSelectedTicket(null)}
          >
            <div
              className="w-full max-w-md bg-white rounded-t-3xl shadow-2xl border-t border-slate-200 max-h-[88vh] overflow-y-auto animate-in slide-in-from-bottom duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              {/* ── Header Modal ── */}
              <div
                className={`px-5 pt-5 pb-4 ${
                  selectedTicket.status === "ACTIVE"
                    ? "bg-gradient-to-br from-emerald-50 to-teal-50/60"
                    : selectedTicket.status === "REFUNDED"
                    ? "bg-gradient-to-br from-amber-50 to-orange-50/60"
                    : "bg-slate-50"
                }`}
              >
                {/* Drag handle */}
                <div className="w-10 h-1 bg-slate-300 rounded-full mx-auto mb-4" />

                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    {/* Status badge */}
                    {(() => {
                      const cfg = TICKET_STATUS_CONFIG[selectedTicket.status];
                      return (
                        <span
                          className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full border mb-2 ${cfg?.badgeClass}`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${cfg?.dotClass}`}
                          />
                          {cfg?.label} — {cfg?.description}
                        </span>
                      );
                    })()}
                    <h3 className="text-sm font-extrabold text-slate-800 leading-snug">
                      {selectedTicket.tourName}
                    </h3>
                    <p className="text-[10px] font-mono font-bold text-slate-400 mt-0.5 tracking-widest">
                      {selectedTicket.ticketCode}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedTicket(null)}
                    className="w-7 h-7 rounded-full bg-slate-200/70 hover:bg-slate-300 text-slate-500 flex items-center justify-center flex-shrink-0 ml-3 transition-colors cursor-pointer"
                    aria-label="Đóng"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>

              <div className="px-5 pb-6 pt-4 space-y-4">
                {/* ── Mã QR lớn ── */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-48 h-48 p-3 rounded-2xl border-2 shadow-sm flex items-center justify-center ${
                      selectedTicket.status === "ACTIVE"
                        ? "border-emerald-400 bg-emerald-50/40"
                        : "border-slate-200 bg-slate-50"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={selectedTicket.qrCodeUrl}
                      alt={selectedTicket.ticketCode}
                      className={`w-full h-full object-contain rounded-xl ${
                        selectedTicket.status !== "ACTIVE"
                          ? "opacity-40 grayscale"
                          : ""
                      }`}
                    />
                  </div>
                  {selectedTicket.status === "ACTIVE" ? (
                    <p className="text-[11px] text-emerald-700 font-semibold mt-2 flex items-center gap-1">
                      <ScanLine size={12} />
                      Xuất trình tại cổng soát vé tự động
                    </p>
                  ) : (
                    <p className="text-[11px] text-slate-400 font-medium mt-2">
                      Vé này không còn khả dụng để quét
                    </p>
                  )}
                </div>

                {/* ── Thông tin giao dịch ── */}
                <div className="bg-slate-50 rounded-2xl border border-slate-100 p-3.5 space-y-2">
                  <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-1">
                    Thông tin giao dịch
                  </p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Điểm tham quan</span>
                    <span className="font-semibold text-slate-700 text-right max-w-[55%] truncate">
                      {selectedTicket.destination}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Giá vé</span>
                    <span
                      className={`font-extrabold ${
                        selectedTicket.numericPrice === 0
                          ? "text-emerald-600"
                          : "text-slate-800"
                      }`}
                    >
                      {selectedTicket.price}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Ngày mua</span>
                    <span className="font-semibold text-slate-700">
                      {selectedTicket.purchaseDate}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Hạn sử dụng</span>
                    <span className="font-semibold text-slate-700">
                      {selectedTicket.validDate}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Cổng thanh toán</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        selectedTicket.paymentGateway === "VNPay"
                          ? "bg-blue-50 text-blue-700 border-blue-200"
                          : "bg-rose-50 text-rose-700 border-rose-200"
                      }`}
                    >
                      {selectedTicket.paymentGateway}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Mã giao dịch</span>
                    <span className="font-mono text-[10px] font-bold text-slate-500">
                      {selectedTicket.transactionId}
                    </span>
                  </div>
                  {selectedTicket.usedAt && (
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500">Đã quét lúc</span>
                      <span className="font-semibold text-slate-700">
                        {selectedTicket.usedAt}
                      </span>
                    </div>
                  )}
                  {selectedTicket.refundedAt && (
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500">Hoàn tiền lúc</span>
                      <span className="font-semibold text-amber-700">
                        {selectedTicket.refundedAt}
                      </span>
                    </div>
                  )}
                </div>

                {/* ── Quyền lợi vé ── */}
                <div>
                  <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">
                    Quyền lợi vé
                  </p>
                  <div className="space-y-1.5">
                    {selectedTicket.benefits?.map((benefit, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2 text-xs text-slate-700"
                      >
                        <CheckCircle2
                          size={13}
                          className="text-emerald-500 flex-shrink-0 mt-0.5"
                        />
                        <span className="leading-snug">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Nút hành động ── */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      showToast(
                        "📤 Đã sao chép liên kết chia sẻ vé vào clipboard!"
                      );
                    }}
                    className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                  >
                    <Share2 size={13} />
                    Chia sẻ vé
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedTicket(null)}
                    className="py-2.5 px-3 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition-all cursor-pointer active:scale-95"
                  >
                    Đóng
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════
            BOTTOM NAVIGATION BAR CỐ ĐỊNH ĐÁY
        ══════════════════════════════════════════════════════════ */}
        <TouristBottomNav
          activeTab="account"
          setActiveTab={() => {}}
          onOpenCheckIn={() =>
            showToast("📸 Mở camera quét mã Check-in di tích!")
          }
        />
      </div>
    </div>
  );
}
