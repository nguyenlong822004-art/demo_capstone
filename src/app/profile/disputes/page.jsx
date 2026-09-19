"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  PhoneCall,
  ShieldAlert,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
  Ticket,
  ChevronRight,
  Wallet,
  Sparkles,
  Info,
  Calendar,
  CreditCard,
  Building2,
  Check,
  FileCheck2,
} from "lucide-react";
import TouristBottomNav from "@/components/TouristBottomNav";

/**
 * Dữ liệu mẫu 3 trạng thái khiếu nại đơn hàng & hoàn tiền
 */
const DISPUTES_MOCK_DATA = [
  {
    id: "KN-2026-9012",
    ticketCode: "#VK-2026-TRANGAN",
    tourName: "Quần Thể Di Sản Tràng An",
    destination: "Ninh Bình",
    amount: "250.000 đ",
    gateway: "MoMo",
    createdAt: "09:15 - Hôm nay",
    status: "PENDING",
    statusBadge: {
      label: "Đang xác minh",
      bg: "bg-amber-50 text-amber-800 border-amber-200/80",
      dot: "bg-amber-500 animate-ping",
    },
    userReason: "Điểm di tích đóng cửa bảo trì đột xuất",
    stepper: [
      {
        step: 1,
        title: "Đã tiếp nhận yêu cầu",
        time: "09:15 - Hôm nay",
        desc: "Hệ thống VietCulture đã ghi nhận hồ sơ khiếu nại vé.",
        state: "COMPLETED", // COMPLETED | CURRENT | UPCOMING
      },
      {
        step: 2,
        title: "Xác thực sự cố thực địa",
        time: "Đang thực hiện",
        desc: "Ban Quản lý di tích & Admin đang xác thực sự cố thực địa.",
        state: "CURRENT",
      },
      {
        step: 3,
        title: "Hoàn tiền qua cổng ví điện tử",
        time: "Dự kiến trong 2 - 24 giờ",
        desc: "Chuyển trả 250.000 đ trực tiếp về tài khoản MoMo liên kết.",
        state: "UPCOMING",
      },
    ],
  },
  {
    id: "KN-2026-8819",
    ticketCode: "#VK-2026-HTTL-4402",
    tourName: "Đêm Hoàng Thành",
    destination: "Hoàng Thành Thăng Long, Hà Nội",
    amount: "80.000 đ",
    gateway: "VNPay",
    createdAt: "10:30 - 12/09/2026",
    status: "APPROVED",
    statusBadge: {
      label: "Đã duyệt hoàn tiền",
      bg: "bg-emerald-50 text-emerald-800 border-emerald-200/80",
      dot: "bg-emerald-500",
    },
    userReason: "Lỗi mạng thanh toán trùng 2 lần giao dịch",
    refundMessage:
      "Tiền đã được chuyển trả về tài khoản ngân hàng của bạn lúc 14:20 ngày 12/09/2026. Mã giao dịch hoàn: #REF-88319.",
    refundTransactionId: "#REF-88319",
    refundDate: "14:20 - 12/09/2026",
  },
  {
    id: "KN-2026-7734",
    ticketCode: "#VK-2026-VANMIEU-8812",
    tourName: "Văn Miếu - Quốc Tử Giám",
    destination: "Đống Đa, Hà Nội",
    amount: "70.000 đ",
    gateway: "VietQR",
    createdAt: "16:40 - 05/09/2026",
    status: "REJECTED",
    statusBadge: {
      label: "Từ chối khiếu nại",
      bg: "bg-rose-50 text-rose-800 border-rose-200/80",
      dot: "bg-rose-500",
    },
    userReason: "Bận việc đột xuất không tham quan được",
    adminRejectionReason:
      "Vé của quý khách đã được quét check-in qua cổng thành công lúc 08:45 cùng ngày, không đủ điều kiện hoàn hủy.",
    rejectedAt: "17:10 - 05/09/2026",
  },
];

export default function DisputeTrackingPage() {
  const [activeFilter, setActiveFilter] = useState("ALL"); // ALL | PENDING | APPROVED | REJECTED
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Lọc dữ liệu theo tab
  const filteredDisputes =
    activeFilter === "ALL"
      ? DISPUTES_MOCK_DATA
      : DISPUTES_MOCK_DATA.filter((item) => item.status === activeFilter);

  // Đếm số lượng thẻ theo trạng thái
  const counts = {
    ALL: DISPUTES_MOCK_DATA.length,
    PENDING: DISPUTES_MOCK_DATA.filter((d) => d.status === "PENDING").length,
    APPROVED: DISPUTES_MOCK_DATA.filter((d) => d.status === "APPROVED").length,
    REJECTED: DISPUTES_MOCK_DATA.filter((d) => d.status === "REJECTED").length,
  };

  return (
    <div className="w-full min-h-screen bg-slate-100/80 flex justify-center items-start">
      {/* ══════════════════════════════════════════════════════════
          CONTAINER CHUẨN MOBILE VIEW
          max-w-md mx-auto min-h-screen bg-slate-50 pb-20 border-x border-slate-200 shadow-2xl font-sans select-none
      ══════════════════════════════════════════════════════════ */}
      <div className="w-full max-w-md mx-auto min-h-screen bg-slate-50 pb-20 border-x border-slate-200 shadow-2xl font-sans select-none relative flex flex-col">
        {/* Toast thông báo nhanh */}
        {toastMessage && (
          <div className="fixed top-4 left-1/2 -translate-x-1/2 max-w-xs w-11/12 z-50 bg-slate-900/95 backdrop-blur-md text-white text-xs font-semibold px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 border border-white/20 animate-bounce">
            <Sparkles size={16} className="text-amber-300 flex-shrink-0" />
            <span className="leading-snug">{toastMessage}</span>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════
            1. HEADER: Nút quay lại (ArrowLeft) -> /profile + Tiêu đề + Hotline 1900 6888
        ══════════════════════════════════════════════════════════ */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/90 px-4 py-3.5 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/profile"
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors active:scale-95"
              title="Quay lại Hồ sơ cá nhân"
            >
              <ArrowLeft size={18} />
            </Link>
            <div>
              <h1 className="text-sm font-extrabold text-slate-800 leading-tight">
                Tiến Độ Khiếu Nại &amp; Hoàn Tiền
              </h1>
              <p className="text-[10.5px] text-slate-400 font-medium leading-none mt-0.5">
                Bảo vệ quyền lợi khách du lịch VietCulture
              </p>
            </div>
          </div>

          {/* Hotline 1900 6888 nhỏ ở góc phải */}
          <a
            href="tel:19006888"
            onClick={() => showToast("Đang kết nối Tổng đài hỗ trợ 1900 6888...")}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-rose-50 hover:bg-rose-100 border border-rose-200/80 text-rose-600 transition-all cursor-pointer active:scale-95"
            title="Gọi Tổng đài Hỗ trợ 1900 6888"
          >
            <PhoneCall size={12} className="shrink-0 animate-pulse" />
            <span className="text-[10px] font-extrabold tracking-tight">1900 6888</span>
          </a>
        </header>

        {/* ══════════════════════════════════════════════════════════
            2. BỘ LỌC TRẠNG THÁI DẠNG PILL TABS
            [Tất cả (3)], [Đang xác minh (1)], [Đã hoàn tiền (1)], [Bị từ chối (1)]
        ══════════════════════════════════════════════════════════ */}
        <div className="sticky top-[57px] z-20 bg-white/95 backdrop-blur-md border-b border-slate-200/70 px-4 py-2.5 shadow-2xs">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {[
              { key: "ALL", label: `Tất cả (${counts.ALL})` },
              { key: "PENDING", label: `Đang xác minh (${counts.PENDING})` },
              { key: "APPROVED", label: `Đã hoàn tiền (${counts.APPROVED})` },
              { key: "REJECTED", label: `Bị từ chối (${counts.REJECTED})` },
            ].map((tab) => {
              const isActive = activeFilter === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveFilter(tab.key)}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap transition-all flex items-center gap-1 cursor-pointer shrink-0 active:scale-95 ${
                    isActive
                      ? "bg-slate-900 text-white shadow-xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200 border border-transparent"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════
            3. DANH SÁCH THẺ KHIẾU NẠI (DISPUTE CARDS)
        ══════════════════════════════════════════════════════════ */}
        <main className="flex-1 p-4 space-y-3.5">
          {filteredDisputes.map((item) => {
            const isPending = item.status === "PENDING";
            const isApproved = item.status === "APPROVED";
            const isRejected = item.status === "REJECTED";

            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs transition-all"
              >
                {/* ── Row 1: Header thẻ khiếu nại (Status Badge + Mã khiếu nại) ── */}
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span
                    className={`inline-flex items-center gap-1.5 text-[10.5px] font-extrabold px-2.5 py-0.5 rounded-full border ${item.statusBadge.bg}`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${item.statusBadge.dot}`} />
                    {item.statusBadge.label}
                  </span>

                  <span className="text-[10px] font-mono font-bold text-slate-400">
                    Mã KN: #{item.id}
                  </span>
                </div>

                {/* ── Row 2: Chi tiết Tour & Vé ── */}
                <div className="flex items-start justify-between gap-3 mb-2.5">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 text-[10.5px] font-mono font-bold text-slate-500 mb-0.5">
                      <Ticket size={12} className="text-slate-400 shrink-0" />
                      <span>{item.ticketCode}</span>
                    </div>
                    <h3 className="text-xs font-extrabold text-slate-800 leading-snug">
                      {item.tourName}
                    </h3>
                    <p className="text-[10.5px] text-slate-400 truncate mt-0.5">
                      {item.destination}
                    </p>
                  </div>

                  {/* Số tiền và cổng thanh toán */}
                  <div className="text-right shrink-0">
                    <p className="text-xs font-black text-slate-900">{item.amount}</p>
                    <span className="inline-block text-[9.5px] font-bold px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200/70 mt-0.5">
                      qua {item.gateway}
                    </span>
                  </div>
                </div>

                {/* ── Row 3: Lý do du khách chọn ── */}
                <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-100 mb-3 text-[11px]">
                  <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
                    Lý do yêu cầu hỗ trợ:
                  </span>
                  <p className="text-slate-700 italic font-medium leading-snug">
                    &ldquo;{item.userReason}&rdquo;
                  </p>
                </div>

                {/* ═══════════════════════════════════════════════════════
                    TRẠNG THÁI 1: [ĐANG XÁC MINH] - THANH TIẾN ĐỘ STEPPER 3 BƯỚC
                ═══════════════════════════════════════════════════════ */}
                {isPending && (
                  <div className="pt-2 border-t border-slate-100">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                        Tiến trình giải quyết
                      </span>
                      <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200/60 px-2 py-0.5 rounded-full">
                        Bước 2 / 3
                      </span>
                    </div>

                    {/* Stepper dọc 3 bước */}
                    <div className="relative pl-6 space-y-3.5 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                      {/* Bước 1: [x] Đã tiếp nhận yêu cầu (09:15 - Hôm nay) */}
                      <div className="relative">
                        <div className="absolute -left-6 top-0.5 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white shadow-xs flex items-center justify-center text-white">
                          <Check size={10} strokeWidth={3.5} />
                        </div>
                        <div>
                          <div className="flex items-center justify-between">
                            <p className="text-xs font-bold text-slate-800">
                              1. Đã tiếp nhận yêu cầu
                            </p>
                            <span className="text-[10px] text-slate-400 font-medium">
                              09:15 - Hôm nay
                            </span>
                          </div>
                          <p className="text-[10.5px] text-slate-400 mt-0.5 leading-snug">
                            Hệ thống đã xác nhận đơn khiếu nại hợp lệ từ người dùng.
                          </p>
                        </div>
                      </div>

                      {/* Bước 2: [● Đang thực hiện] Ban Quản lý di tích & Admin đang xác thực */}
                      <div className="relative">
                        <div className="absolute -left-6 top-0.5 w-4 h-4 rounded-full bg-amber-500 border-2 border-white shadow-xs flex items-center justify-center text-white animate-pulse">
                          <Clock size={10} strokeWidth={3} />
                        </div>
                        <div>
                          <div className="flex items-center justify-between">
                            <p className="text-xs font-bold text-amber-900">
                              2. Đang xác thực sự cố thực địa
                            </p>
                            <span className="text-[9.5px] font-extrabold px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-800">
                              Đang xử lý
                            </span>
                          </div>
                          <p className="text-[10.5px] text-amber-800 font-medium mt-0.5 leading-snug">
                            Ban Quản lý di tích &amp; Admin đang xác thực sự cố thực địa.
                          </p>
                        </div>
                      </div>

                      {/* Bước 3: [ ] Hoàn tiền qua cổng ví điện tử (Dự kiến trong 2 - 24 giờ) */}
                      <div className="relative opacity-60">
                        <div className="absolute -left-6 top-0.5 w-4 h-4 rounded-full bg-slate-300 border-2 border-white shadow-xs flex items-center justify-center text-white">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between">
                            <p className="text-xs font-bold text-slate-600">
                              3. Hoàn tiền qua cổng ví điện tử
                            </p>
                            <span className="text-[10px] text-slate-400">
                              Dự kiến: 2 - 24 giờ
                            </span>
                          </div>
                          <p className="text-[10.5px] text-slate-400 mt-0.5 leading-snug">
                            Tiền được tự động hoàn về ví MoMo sau khi xác thực thành công.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ═══════════════════════════════════════════════════════
                    TRẠNG THÁI 2: [ĐÃ DUYỆT HOÀN TIỀN] - THÔNG BÁO HOÀN TIỀN
                ═══════════════════════════════════════════════════════ */}
                {isApproved && (
                  <div className="pt-2.5 border-t border-slate-100">
                    <div className="bg-emerald-50/90 border border-emerald-200/80 rounded-xl p-3 text-xs space-y-1.5">
                      <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
                        <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                        <span>Giao dịch hoàn tiền thành công</span>
                      </div>
                      <p className="text-[11px] text-emerald-900 leading-relaxed font-medium">
                        {item.refundMessage}
                      </p>
                      <div className="flex items-center justify-between text-[10px] text-emerald-700 pt-1 border-t border-emerald-200/60 font-mono font-semibold">
                        <span>Mã giao dịch: {item.refundTransactionId}</span>
                        <span>{item.refundDate}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* ═══════════════════════════════════════════════════════
                    TRẠNG THÁI 3: [TỪ CHỐI KHIẾU NẠI] - LÝ DO TỪ CHỐI CỦA ADMIN
                ═══════════════════════════════════════════════════════ */}
                {isRejected && (
                  <div className="pt-2.5 border-t border-slate-100">
                    <div className="bg-rose-50/90 border border-rose-200/80 rounded-xl p-3 text-xs space-y-1.5">
                      <div className="flex items-center gap-1.5 text-rose-800 font-bold">
                        <XCircle size={15} className="text-rose-600 shrink-0" />
                        <span>Lý do từ chối của Admin:</span>
                      </div>
                      <p className="text-[11px] text-rose-900 leading-relaxed font-medium">
                        &ldquo;{item.adminRejectionReason}&rdquo;
                      </p>
                      <p className="text-[10px] text-rose-600 pt-0.5 font-medium">
                        Thời gian phản hồi: {item.rejectedAt}
                      </p>
                    </div>
                  </div>
                )}

                {/* Chân card: nút hành động nhỏ */}
                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">
                    Ngày gửi: {item.createdAt}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      showToast(`Đã sao chép mã đơn khiếu nại #${item.id} vào bộ nhớ tạm!`)
                    }
                    className="text-[10.5px] font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1 cursor-pointer active:scale-95"
                  >
                    <span>Chi tiết biên lai</span>
                    <ChevronRight size={12} className="text-slate-400" />
                  </button>
                </div>
              </div>
            );
          })}

          {filteredDisputes.length === 0 && (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-200/80 p-6">
              <p className="text-3xl mb-2">📋</p>
              <h4 className="text-xs font-bold text-slate-700">Không có đơn khiếu nại nào</h4>
              <p className="text-[11px] text-slate-400 mt-1">
                Hiện không có yêu cầu nào ở trạng thái này.
              </p>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════
              4. NÚT HỖ TRỢ NHANH Ở CHÂN TRANG
              Hộp trợ giúp: "Cần hỗ trợ gấp về lệnh hoàn tiền?"
              Nút bấm [Gọi Tổng Đài Hỗ Trợ 1900 6888]
          ══════════════════════════════════════════════════════════ */}
          <section
            aria-label="Hỗ trợ khẩn cấp"
            className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs mt-4"
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 shrink-0">
                <ShieldAlert size={20} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800">
                  Cần hỗ trợ gấp về lệnh hoàn tiền?
                </h4>
                <p className="text-[11px] text-slate-400 font-medium leading-snug mt-0.5">
                  Bộ phận CSKH VietCulture hỗ trợ trực 24/7 để xác minh và đối soát tiền hoàn trực tiếp với ban quản lý di tích.
                </p>
              </div>
            </div>

            <a
              href="tel:19006888"
              onClick={() => showToast("Đang kết nối tổng đài hỗ trợ 1900 6888...")}
              className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 text-xs transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <PhoneCall size={15} />
              <span>Gọi Tổng Đài Hỗ Trợ 1900 6888</span>
            </a>
          </section>
        </main>

        {/* Bottom Nav Bar */}
        <TouristBottomNav
          activeTab="account"
          setActiveTab={() => {}}
          onOpenCheckIn={() => showToast("📸 Mở camera quét mã Check-in di tích!")}
        />
      </div>
    </div>
  );
}
