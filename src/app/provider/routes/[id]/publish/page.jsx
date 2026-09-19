"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Compass,
  MapPin,
  Clock,
  Sparkles,
  Coins,
  CheckCircle2,
  AlertTriangle,
  Send,
  FileCheck,
  ShieldCheck,
  Building2,
  ArrowLeft,
  ArrowRight,
  Info,
  DollarSign,
  Ticket,
  Users,
  Check,
  X,
  Footprints,
  Eye,
  Edit3,
  HelpCircle,
  Award,
} from "lucide-react";

/**
 * Trang Cấu Hình Giá & Xuất Bản Lộ Trình Tham Quan
 * Đường dẫn: src/app/provider/routes/[id]/publish/page.jsx
 */
export default function RoutePublishPage() {
  const params = useParams();
  const router = useRouter();
  const routeId = params?.id || "tour-thang-long";

  // Toast thông báo
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 4000);
  };

  // Trạng thái phê duyệt của lộ trình: 'DRAFT' | 'PENDING_REVIEW' | 'REVISION_REQUIRED' | 'PUBLISHED'
  const [moderationStatus, setModerationStatus] = useState("REVISION_REQUIRED");

  // ════════════════════════════════════════════════════════════
  // 1. STATE CẤU HÌNH CHI PHÍ TRẢI NGHIỆM (COST & PRICING)
  // ════════════════════════════════════════════════════════════
  // 'free' (Miễn phí) | 'paid' (Có thu phí)
  const [pricingType, setPricingType] = useState("paid");

  // Giá vé niêm yết (VNĐ)
  const [ticketPrice, setTicketPrice] = useState(80000);

  // Tỷ lệ phí nền tảng sàn (10%)
  const PLATFORM_FEE_RATE = 0.1;
  const platformFee = Math.round(ticketPrice * PLATFORM_FEE_RATE);
  const netEarnings = ticketPrice - platformFee;

  // Các chính sách vé đi kèm
  const [ticketPolicies, setTicketPolicies] = useState({
    audioGuide: true,
    quizGamification: true,
    entryTicket: true,
    map3D: true,
    insurance: true,
  });

  const togglePolicy = (key) => {
    setTicketPolicies((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // ════════════════════════════════════════════════════════════
  // 2. MODAL CAM KẾT VÀ GỬI HỒ SƠ PHÊ DUYỆT
  // ════════════════════════════════════════════════════════════
  const [isCommitModalOpen, setIsCommitModalOpen] = useState(false);
  const [hasAgreedCommitment, setHasAgreedCommitment] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Xử lý xác nhận gửi hồ sơ phê duyệt
  const handleConfirmSubmission = () => {
    if (!hasAgreedCommitment) {
      alert("Vui lòng tích chọn đồng ý cam kết tính chính xác của dữ liệu lịch sử.");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsCommitModalOpen(false);
      setModerationStatus("PENDING_REVIEW");
      showToast(
        "Hồ sơ lộ trình đã được gửi thành công đến Hội đồng Thẩm định Di sản Quốc gia (Trạng thái: PENDING_REVIEW)!"
      );
    }, 1200);
  };

  // Mock data tóm tắt lộ trình
  const routeSummary = {
    name: "Hành trình Ngàn năm Văn hiến Thăng Long",
    code: "TOUR-TL-01",
    duration: "Nửa ngày (3 - 4 giờ)",
    distance: "1.2 km",
    theme: "Di sản Lịch sử & Nho học",
    pointsReward: 200,
    coverImage: "/image/vanmieu.png",
    storySummary:
      "Tuyến tham quan dẫn dắt du khách đi ngược dòng thời gian về thế kỷ XI - XIX, khám phá tinh hoa đạo học, bia tiến sĩ đá và biểu tượng kiến trúc Khuê Văn Các tại trung tâm Thủ đô.",
    stops: [
      {
        order: 1,
        name: "Khuê Văn Các",
        image: "/image/vanmieu.png",
        location: "Hà Nội",
        lat: "21.028511",
        lng: "105.835520",
        mission: "Quiz: Ý nghĩa biểu tượng Sao Khuê tỏa sáng",
      },
      {
        order: 2,
        name: "Giếng Thiên Quang & 82 Bia Tiến Sĩ",
        image: "/image/thanglong.png",
        location: "Hà Nội",
        lat: "21.028820",
        lng: "105.835840",
        mission: "Check-in GPS & Thuyết minh 82 Bia Tiến Sĩ",
      },
      {
        order: 3,
        name: "Nhà Thái Học (Quốc Tử Giám)",
        image: "/image/baotang.png",
        location: "Hà Nội",
        lat: "21.029140",
        lng: "105.836100",
        mission: "Chụp ảnh lưu niệm AR cùng không gian trường xưa",
      },
    ],
  };

  return (
    <div className="space-y-6 pb-16">
      {/* ── Toast Thông Báo ── */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-700 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs sm:text-sm font-semibold animate-in fade-in slide-in-from-top-4 border border-emerald-500/50 max-w-md">
          <Sparkles size={16} className="text-amber-300 flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════
          TOP BAR & BREADCRUMBS
      ══════════════════════════════════════════════════════════ */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-1">
            <Link href="/provider" className="hover:text-emerald-700 transition-colors">
              Cổng Đối Tác
            </Link>
            <span>/</span>
            <Link href="/provider/routes/builder" className="hover:text-emerald-700 transition-colors">
              Lộ trình Văn hóa
            </Link>
            <span>/</span>
            <span className="text-emerald-700">Cấu hình Giá & Xuất bản</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="w-1.5 h-5 bg-emerald-600 rounded-full" />
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Cấu Hình Chi Phí & Xuất Bản Lộ Trình
            </h1>
            <span className="font-mono text-xs font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
              {routeSummary.code}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Xác lập biểu phí vé điện tử, phân bổ doanh thu sàn và gửi hồ sơ thẩm định di sản trước khi công khai trên ứng dụng du khách.
          </p>
        </div>

        {/* Trạng thái duyệt của Lộ trình */}
        <div className="self-start sm:self-auto">
          {moderationStatus === "PENDING_REVIEW" && (
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-300 shadow-2xs">
              <Clock size={14} className="animate-spin text-amber-600" />
              <span>PENDING_REVIEW (Đang chờ Hội đồng duyệt)</span>
            </span>
          )}

          {moderationStatus === "REVISION_REQUIRED" && (
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-rose-50 text-rose-800 border border-rose-300 shadow-2xs">
              <AlertTriangle size={14} className="text-rose-600" />
              <span>REVISION_REQUIRED (Cần bổ sung tư liệu)</span>
            </span>
          )}

          {moderationStatus === "DRAFT" && (
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-300">
              <FileCheck size={14} />
              <span>BẢN NHÁP (DRAFT)</span>
            </span>
          )}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          THẺ THÔNG BÁO PHẢN HỒI TỪ MODERATOR (NẾU BỊ TỪ CHỐI / CẦN SỬA)
      ══════════════════════════════════════════════════════════ */}
      {moderationStatus === "REVISION_REQUIRED" && (
        <div className="p-4 sm:p-5 rounded-3xl bg-amber-50/90 border-2 border-amber-300/80 shadow-xs flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center flex-shrink-0 shadow-xs">
            <AlertTriangle size={20} />
          </div>
          <div className="flex-1 min-w-0 text-xs text-amber-950">
            <div className="flex items-center justify-between gap-2">
              <p className="font-extrabold text-sm text-amber-900">
                Phản hồi từ Hội đồng Thẩm định Di sản Quốc gia (Moderator Feedback)
              </p>
              <span className="text-[10.5px] font-semibold text-amber-800">
                Cập nhật lúc 09:15 hôm nay
              </span>
            </div>

            <p className="mt-1.5 text-amber-900 leading-relaxed font-medium">
              &ldquo;Lộ trình có nội dung câu chuyện rất hấp dẫn. Tuy nhiên, tại trạm số 2 (&apos;82 Bia Tiến Sĩ&apos;), đề nghị BQL bổ sung thêm nguồn trích dẫn lịch sử khoa thi năm 1442 theo Đại Việt Sử Ký Toàn Thư và kiểm tra lại file audio guide thuyết minh tiếng Anh trước khi duyệt xuất bản công khai.&rdquo;
            </p>

            <div className="mt-3 flex items-center gap-2">
              <Link
                href="/provider/routes/builder"
                className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-[11px] inline-flex items-center gap-1 transition-colors"
              >
                <Edit3 size={13} />
                <span>Chỉnh sửa trạm dừng ngay</span>
              </Link>

              <button
                type="button"
                onClick={() => {
                  showToast("Đã ghi nhận phản hồi. Bạn có thể gửi lại hồ sơ sau khi hoàn thiện.");
                }}
                className="px-3 py-1.5 rounded-xl bg-white border border-amber-300 hover:bg-amber-100/60 text-amber-900 font-bold text-[11px] transition-colors"
              >
                Đã hiểu nhận xét
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════
          BỐ CỤC 2 CỘT CHÍNH: CẤU HÌNH GIÁ (TRÁI) & TÓM TẮT TOÀN TUYẾN (PHẢI)
      ══════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ────────────────────────────────────────────────────────
            CỘT TRÁI (7/12): CẤU HÌNH CHI PHÍ TRẢI NGHIỆM
        ──────────────────────────────────────────────────────── */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. CÔNG TẮC LỰA CHỌN MIỄN PHÍ / THU PHÍ */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Coins size={18} className="text-emerald-600" />
                <h2 className="text-sm sm:text-base font-extrabold text-slate-900">
                  1. Mô hình Thu phí & Vé Điện tử
                </h2>
              </div>
              <span className="text-[11px] font-bold text-slate-400">
                Thanh toán tự động qua VNPay / MoMo
              </span>
            </div>

            {/* Công tắc chuyển đổi Miễn phí / Có thu phí */}
            <div className="grid grid-cols-2 gap-3 p-1.5 bg-slate-100 rounded-2xl">
              <button
                type="button"
                onClick={() => setPricingType("free")}
                className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  pricingType === "free"
                    ? "bg-white text-emerald-800 shadow-xs"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <span>🌿 Miễn phí trải nghiệm</span>
              </button>

              <button
                type="button"
                onClick={() => setPricingType("paid")}
                className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  pricingType === "paid"
                    ? "bg-white text-emerald-800 shadow-xs"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <span>💳 Có thu phí vé di sản</span>
              </button>
            </div>

            {/* ── NẾU CÓ THU PHÍ TRẢI NGHIỆM ── */}
            {pricingType === "paid" ? (
              <div className="space-y-4 pt-2 animate-in fade-in duration-200">
                {/* Ô nhập giá vé vào cổng / chi phí gói tour */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Giá niêm yết cho du khách (VNĐ) <span className="text-rose-500">*</span>
                  </label>

                  <div className="relative">
                    <input
                      type="number"
                      step={5000}
                      min={10000}
                      max={2000000}
                      value={ticketPrice}
                      onChange={(e) => setTicketPrice(Number(e.target.value) || 0)}
                      className="w-full pl-4 pr-16 py-3 bg-slate-50 border border-slate-200 rounded-xl text-lg font-mono font-extrabold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                      VNĐ / vé
                    </span>
                  </div>

                  {/* Nút chọn nhanh giá gợi ý */}
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[11px] font-semibold text-slate-400">Gợi ý nhanh:</span>
                    {[50000, 80000, 120000, 200000].map((price) => (
                      <button
                        key={price}
                        type="button"
                        onClick={() => setTicketPrice(price)}
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border transition-colors cursor-pointer ${
                          ticketPrice === price
                            ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                            : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        {price.toLocaleString()} đ
                      </button>
                    ))}
                  </div>
                </div>

                {/* ── BẢNG TÍNH TỰ ĐỘNG MINH BẠCH (TRANSPARENT REVENUE TABLE) ── */}
                <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-emerald-200/60">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-950">
                      Bảng tính phân bổ doanh thu vé minh bạch
                    </span>
                    <span className="text-[10.5px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                      Tự động quyết toán 24h
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    {/* Hàng 1: Giá niêm yết */}
                    <div className="flex items-center justify-between text-slate-700 font-semibold">
                      <span>1. Giá vé niêm yết cho du khách</span>
                      <span className="font-mono text-sm font-bold text-slate-900">
                        {ticketPrice.toLocaleString()} ₫
                      </span>
                    </div>

                    {/* Hàng 2: Phí nền tảng */}
                    <div className="flex items-center justify-between text-slate-500">
                      <span className="flex items-center gap-1">
                        <span>2. Phí nền tảng VietCulture (10%)</span>
                        <HelpCircle
                          size={13}
                          className="text-slate-400"
                          title="Bao gồm chi phí hạ tầng máy chủ GPS, bảo trì AI Audio Guide & cổng thanh toán"
                        />
                      </span>
                      <span className="font-mono font-bold text-rose-600">
                        - {platformFee.toLocaleString()} ₫
                      </span>
                    </div>

                    {/* Hàng 3: Thực nhận */}
                    <div className="pt-2 border-t border-emerald-200 flex items-center justify-between text-emerald-950 font-extrabold">
                      <span className="text-xs sm:text-sm">
                        3. Số tiền thực nhận của Provider (90%)
                      </span>
                      <span className="font-mono text-base sm:text-lg text-emerald-700 font-black">
                        {netEarnings.toLocaleString()} ₫ / vé
                      </span>
                    </div>
                  </div>

                  <p className="text-[10.5px] text-emerald-800 leading-relaxed font-normal pt-1">
                    💡 Ước tính với <strong>1.000 lượt vé</strong> bán ra qua Cổng di sản, BQL sẽ nhận về:{" "}
                    <strong>{(netEarnings * 1000).toLocaleString()} ₫</strong>.
                  </p>
                </div>

                {/* ── CÁC CHÍNH SÁCH VÉ BAO GỒM ── */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Quyền lợi & Chính sách gói vé bao gồm
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <label
                      onClick={() => togglePolicy("entryTicket")}
                      className={`p-3 rounded-xl border flex items-center gap-2.5 text-xs font-bold cursor-pointer transition-all ${
                        ticketPolicies.entryTicket
                          ? "bg-emerald-50 text-emerald-900 border-emerald-300"
                          : "bg-slate-50 text-slate-500 border-slate-200"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-md flex items-center justify-center text-white ${
                          ticketPolicies.entryTicket ? "bg-emerald-600" : "bg-slate-300"
                        }`}
                      >
                        <Check size={11} strokeWidth={3} />
                      </div>
                      <span>Vé vào cổng trực tiếp di tích</span>
                    </label>

                    <label
                      onClick={() => togglePolicy("audioGuide")}
                      className={`p-3 rounded-xl border flex items-center gap-2.5 text-xs font-bold cursor-pointer transition-all ${
                        ticketPolicies.audioGuide
                          ? "bg-emerald-50 text-emerald-900 border-emerald-300"
                          : "bg-slate-50 text-slate-500 border-slate-200"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-md flex items-center justify-center text-white ${
                          ticketPolicies.audioGuide ? "bg-emerald-600" : "bg-slate-300"
                        }`}
                      >
                        <Check size={11} strokeWidth={3} />
                      </div>
                      <span>Thuyết minh AI Audio Guide</span>
                    </label>

                    <label
                      onClick={() => togglePolicy("quizGamification")}
                      className={`p-3 rounded-xl border flex items-center gap-2.5 text-xs font-bold cursor-pointer transition-all ${
                        ticketPolicies.quizGamification
                          ? "bg-emerald-50 text-emerald-900 border-emerald-300"
                          : "bg-slate-50 text-slate-500 border-slate-200"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-md flex items-center justify-center text-white ${
                          ticketPolicies.quizGamification ? "bg-emerald-600" : "bg-slate-300"
                        }`}
                      >
                        <Check size={11} strokeWidth={3} />
                      </div>
                      <span>Quyền truy cập Quiz & AR Check-in</span>
                    </label>

                    <label
                      onClick={() => togglePolicy("insurance")}
                      className={`p-3 rounded-xl border flex items-center gap-2.5 text-xs font-bold cursor-pointer transition-all ${
                        ticketPolicies.insurance
                          ? "bg-emerald-50 text-emerald-900 border-emerald-300"
                          : "bg-slate-50 text-slate-500 border-slate-200"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-md flex items-center justify-center text-white ${
                          ticketPolicies.insurance ? "bg-emerald-600" : "bg-slate-300"
                        }`}
                      >
                        <Check size={11} strokeWidth={3} />
                      </div>
                      <span>Bảo hiểm du lịch di sản toàn tuyến</span>
                    </label>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1.5 animate-in fade-in">
                <p className="font-bold text-slate-800">
                  Lộ trình cộng đồng hoàn toàn miễn phí
                </p>
                <p className="text-[11px] leading-relaxed">
                  Du khách có thể tự do trải nghiệm bản đồ số, quét mã check-in và nghe thuyết minh tự động mà không phải thanh toán tiền vé. Điểm thưởng và huy hiệu vẫn được cấp phát đầy đủ.
                </p>
              </div>
            )}
          </div>

          {/* 2. KHỐI HÀNH ĐỘNG GỬI PHÊ DUYỆT */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Send size={18} className="text-emerald-600" />
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                  2. Trình duyệt Hội đồng Văn hóa Quốc gia
                </h3>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Trước khi công khai và mở bán vé cho hàng vạn du khách trên ứng dụng di động, lộ trình sẽ được Hội đồng Thẩm định Di sản kiểm duyệt nội dung lịch sử và tọa độ trong vòng <strong>24 - 48 giờ</strong>.
            </p>

            {/* NÚT BẤM TO MÀU XANH NGỌC: GỬI HỒ SƠ PHÊ DUYỆT */}
            <button
              type="button"
              onClick={() => setIsCommitModalOpen(true)}
              disabled={moderationStatus === "PENDING_REVIEW"}
              className="w-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-black py-4 px-6 rounded-2xl shadow-md shadow-emerald-600/25 flex items-center justify-center gap-2.5 text-base sm:text-lg cursor-pointer transition-all duration-200"
            >
              <Send size={20} strokeWidth={2.5} />
              <span>
                {moderationStatus === "PENDING_REVIEW"
                  ? "Hồ sơ đang chờ duyệt..."
                  : "Gửi Hồ Sơ Phê Duyệt"}
              </span>
            </button>
          </div>
        </div>

        {/* ────────────────────────────────────────────────────────
            CỘT PHẢI (5/12): KHUNG TÓM TẮT TOÀN TUYẾN (SUMMARY REVIEW)
        ──────────────────────────────────────────────────────── */}
        <div className="lg:col-span-5 space-y-5 sticky top-20">
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Compass size={18} className="text-sky-600" />
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
                  Tóm Tắt Hồ Sơ Toàn Tuyến
                </h3>
              </div>
              <span className="text-[11px] font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md">
                3 Trạm dừng
              </span>
            </div>

            {/* Card ảnh bìa & Tiêu đề tour */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={routeSummary.coverImage}
                alt={routeSummary.name}
                className="w-full h-36 object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-3.5 text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
                  {routeSummary.theme}
                </span>
                <h4 className="text-sm font-black leading-snug mt-0.5">
                  {routeSummary.name}
                </h4>
              </div>
            </div>

            {/* Thông số nhanh */}
            <div className="grid grid-cols-3 gap-2 py-2 px-3 bg-slate-50 rounded-2xl border border-slate-100 text-center text-xs">
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400">Thời lượng</p>
                <p className="font-extrabold text-slate-800 mt-0.5">3 - 4 giờ</p>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400">Cự ly</p>
                <p className="font-extrabold text-slate-800 mt-0.5">1.2 km</p>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400">Thưởng</p>
                <p className="font-extrabold text-amber-600 mt-0.5">+{routeSummary.pointsReward} pts</p>
              </div>
            </div>

            {/* Danh sách các trạm dừng chân */}
            <div>
              <p className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Trình tự các trạm tham quan & Nhiệm vụ
              </p>

              <div className="space-y-2.5">
                {routeSummary.stops.map((stop) => (
                  <div
                    key={stop.order}
                    className="p-3 rounded-2xl border border-slate-200/80 bg-slate-50/50 flex items-start gap-3"
                  >
                    <div className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                      {stop.order}
                    </div>

                    <div className="min-w-0 flex-1 text-xs">
                      <div className="flex items-center justify-between">
                        <p className="font-extrabold text-slate-900 truncate">{stop.name}</p>
                        <span className="font-mono text-[10px] text-slate-400">
                          {stop.lat}, {stop.lng}
                        </span>
                      </div>
                      <p className="text-[11px] text-emerald-700 font-semibold mt-0.5 flex items-center gap-1">
                        <Award size={12} />
                        <span className="truncate">{stop.mission}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tóm tắt giá niêm yết */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-500">Giá vé công bố:</span>
              <span className="font-mono text-base font-black text-emerald-700">
                {pricingType === "free" ? "MIỄN PHÍ" : `${ticketPrice.toLocaleString()} ₫`}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          MODAL: CAM KẾT TÍNH CHÍNH XÁC DỮ LIỆU LỊCH SỬ & DI SẢN
      ══════════════════════════════════════════════════════════ */}
      {isCommitModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setIsCommitModalOpen(false)}
        >
          <div
            className="w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 relative animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <ShieldCheck size={20} className="text-emerald-600" />
                <h3 className="text-base font-extrabold text-slate-900">
                  Cam Kết Chuẩn Xác Dữ Liệu Di Sản
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsCommitModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <div className="space-y-3.5 text-xs text-slate-600 leading-relaxed">
              <p className="font-medium text-slate-800">
                Nhằm bảo vệ giá trị chân thực của di sản văn hóa Việt Nam, Ban Quản Lý (Content Provider) cam kết các nội dung sau trước khi gửi duyệt:
              </p>

              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle2 size={15} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>
                    Toàn bộ tư liệu lịch sử, niên đại, truyền tích và câu hỏi trắc nghiệm đã được đối chiếu với hồ sơ khoa học di tích.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 size={15} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>
                    Tọa độ GPS thực địa và bán kính kích hoạt check-in phản ánh đúng phạm vi khoanh vùng bảo vệ di tích.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 size={15} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>
                    Biểu phí vé điện tử được niêm yết đúng quy định pháp luật và chính sách sàn VietCulture.
                  </span>
                </div>
              </div>

              {/* Checkbox cam kết */}
              <label className="flex items-start gap-2.5 p-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={hasAgreedCommitment}
                  onChange={(e) => setHasAgreedCommitment(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 mt-0.5"
                />
                <span className="font-bold text-slate-800">
                  Tôi đại diện cho BQL Điểm đến cam kết chịu hoàn toàn trách nhiệm về tính xác thực của lộ trình di sản này.
                </span>
              </label>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setIsCommitModalOpen(false)}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Xem lại
              </button>

              <button
                type="button"
                onClick={handleConfirmSubmission}
                disabled={!hasAgreedCommitment || isSubmitting}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl text-xs font-bold transition-colors shadow-sm shadow-emerald-600/25 flex items-center gap-1.5 cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Đang gửi hồ sơ...</span>
                ) : (
                  <>
                    <Send size={14} />
                    <span>Xác nhận & Gửi duyệt</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
