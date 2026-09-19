"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Building2,
  MapPin,
  Compass,
  Navigation,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Clock,
  ArrowLeft,
  FileText,
  HelpCircle,
  Sparkles,
  ExternalLink,
  Layers,
  Info,
  Check,
  X,
  Share2,
  Calendar,
  Ticket,
  ChevronRight,
  Send,
  Eye,
} from "lucide-react";

/**
 * Trang Thẩm Định Chi Tiết Hồ Sơ Điểm Đến & Lộ Trình (Content Moderator Review Page)
 * Đường dẫn: /moderator/review/[id]
 */
export default function ModeratorReviewDetailPage({ params }) {
  const router = useRouter();
  // Unwrap params an toàn theo chuẩn Next.js App Router
  const resolvedParams = params ? use(params) : { id: "HS-2026-089" };
  const recordId = resolvedParams?.id || "HS-2026-089";

  // Dữ liệu mẫu chi tiết của hồ sơ do Content Provider đệ trình
  const submissionData = {
    id: recordId,
    status: "PENDING_REVIEW", // 'PENDING_REVIEW' | 'PUBLISHED' | 'REVISION_REQUESTED' | 'REJECTED'
    destinationName: "Khuê Văn Các & Vườn Bia Tiến Sĩ",
    category: "Di tích lịch sử Quốc gia Đặc biệt",
    submittedBy: "BQL Di tích Văn Miếu - Quốc Tử Giám",
    submittedAt: "08:30 - 09/09/2026",
    priority: "Gấp",
    pricing: {
      isPaid: true,
      price: 80000,
      includedServices: [
        "Vé vào cổng di tích",
        "Hướng dẫn viên số AI Virtual Guide",
        "Thử thách trắc nghiệm Gamification",
      ],
    },
    geofence: {
      lat: "21.028511",
      lng: "105.835520",
      radius: 60, // mét
      addressNote: "Sân trước Giếng Thiên Quang, Văn Miếu, Đống Đa, Hà Nội",
      isSafeFromTraffic: true, // Nằm trọn vẹn trong khuôn viên đi bộ
    },
    narrative: {
      title: "Gác Sao Khuê - Biểu tượng Trí tuệ Thăng Long Ngàn năm",
      period: "Niên hiệu Gia Long năm thứ 4 (1805) - Triều Nguyễn",
      body: `Khuê Văn Các là một lầu vuông tám mái, gồm bốn mái thượng và bốn mái hạ, cao gần 9 thước, do Tổng trấn Bắc thành Nguyễn Văn Thành cho khởi công xây dựng vào năm 1805 dưới triều vua Gia Long. Tầng dưới gồm 4 cột gạch vuông chạm khắc hoa văn tinh xảo nâng đỡ toàn bộ gác trên bằng gỗ lim đỏ. Tầng trên có bốn cửa sổ tròn trổ ra bốn hướng, viền hoa văn tỏa ra xung quanh như những tia sáng lung linh của sao Khuê - ngôi sao chủ quản việc văn chương học vấn.`,
      images: [
        {
          url: "/image/vanmieu.png",
          caption: "Chính diện Khuê Văn Các soi bóng xuống Giếng Thiên Quang",
          source: "Tư liệu chính thức BQL Văn Miếu - Bản quyền số VM-2026",
        },
        {
          url: "/image/thanglong.png",
          caption: "Hàng Bia Tiến sĩ đặt trên lưng rùa đá trong hoa viên",
          source: "Kho lưu trữ Di sản tư liệu UNESCO",
        },
      ],
    },
    quizChallenge: {
      question: "Khuê Văn Các tại Văn Miếu - Quốc Tử Giám được khởi công xây dựng vào năm nào?",
      options: [
        { key: "A", text: "Năm 1070 dưới triều vua Lý Thánh Tông" },
        { key: "B", text: "Năm 1076 dưới triều vua Lý Nhân Tông" },
        { key: "C", text: "Năm 1805 dưới triều vua Gia Long", isCorrect: true },
        { key: "D", text: "Năm 1484 dưới triều vua Lê Thánh Tông" },
      ],
      explanation: "Khuê Văn Các được khởi dựng năm 1805 dưới triều vua Gia Long thời nhà Nguyễn, do Tổng trấn Bắc thành Nguyễn Văn Thành chủ trì hưng công.",
      pointsReward: 50,
      badgeReward: "Huy hiệu Sao Khuê Trí Tuệ",
    },
  };

  // State Checklist kiểm chuẩn văn hóa của Moderator
  const [checklist, setChecklist] = useState({
    historyAccuracy: true,
    mediaRights: true,
    gpsSafety: true,
    quizValidity: true,
  });

  // State ý kiến phản hồi / ghi chú của Moderator
  const [feedbackNotes, setFeedbackNotes] = useState(
    "Hồ sơ được chuẩn bị công phu, dữ liệu lịch sử niên đại 1805 chuẩn xác. Tọa độ thực địa 21.028511° N, 105.835520° E nằm chuẩn trong sân nội bộ, an toàn cho du khách đi bộ."
  );

  // State trạng thái phê duyệt & Modal kết quả
  const [currentStatus, setCurrentStatus] = useState(submissionData.status);
  const [isDecisionModalOpen, setIsDecisionModalOpen] = useState(false);
  const [decisionResult, setDecisionResult] = useState({
    type: "", // 'PUBLISHED' | 'REVISION_REQUESTED' | 'REJECTED'
    title: "",
    message: "",
  });

  // Toggle checkbox checklist
  const handleToggleChecklist = (key) => {
    setChecklist((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const isAllChecked = Object.values(checklist).every(Boolean);

  // Xử lý Phê duyệt & Xuất bản (PUBLISHED)
  const handleApproveAndPublish = () => {
    setCurrentStatus("PUBLISHED");
    setDecisionResult({
      type: "PUBLISHED",
      title: "HỒ SƠ ĐÃ ĐƯỢC PHÊ DUYỆT & XUẤT BẢN!",
      message: `Hồ sơ ${submissionData.destinationName} (${recordId}) đã được chứng nhận đạt chuẩn di sản quốc gia và đồng bộ ngay lập tức sang ứng dụng Mobile cho khách du lịch trải nghiệm.`,
    });
    setIsDecisionModalOpen(true);
  };

  // Xử lý Yêu cầu chỉnh sửa (REVISION_REQUESTED)
  const handleRequestRevision = () => {
    if (!feedbackNotes.trim()) {
      alert("Vui lòng nhập ý kiến ghi chú lý do yêu cầu chỉnh sửa để Provider nắm được.");
      return;
    }
    setCurrentStatus("REVISION_REQUESTED");
    setDecisionResult({
      type: "REVISION_REQUESTED",
      title: "ĐÃ GỬI YÊU CẦU ĐÍNH CHÍNH TỚI PROVIDER",
      message: `Ý kiến phản hồi đã được chuyển tiếp đến ${submissionData.submittedBy}. Hồ sơ chuyển sang trạng thái chờ Provider bổ sung tài liệu.`,
    });
    setIsDecisionModalOpen(true);
  };

  // Xử lý Từ chối hồ sơ (REJECTED)
  const handleReject = () => {
    if (!feedbackNotes.trim()) {
      alert("Vui lòng ghi rõ căn cứ từ chối hồ sơ (vấn đề bản quyền, thông tin sai lệch nghiêm trọng, v.v.).");
      return;
    }
    setCurrentStatus("REJECTED");
    setDecisionResult({
      type: "REJECTED",
      title: "ĐÃ TỪ CHỐI DUYỆT HỒ SƠ",
      message: `Hồ sơ ${recordId} không được thông qua. Đã lưu biên bản thẩm định vào lịch sử kiểm định hệ thống.`,
    });
    setIsDecisionModalOpen(true);
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* ────────────────────────────────────────────────────────
          THANH ĐIỀU HƯỚNG QUAY LẠI & TIÊU ĐỀ TRANG
      ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200/80">
        <div className="flex items-center gap-3">
          <Link
            href="/moderator"
            className="w-9 h-9 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-colors shadow-2xs"
            title="Quay lại Tổng quan hàng chờ"
          >
            <ArrowLeft size={16} />
          </Link>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-black text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                #{recordId}
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-xs font-bold text-slate-500">
                {submissionData.category}
              </span>
            </div>
            <h1 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight mt-0.5">
              Thẩm định Hồ sơ: {submissionData.destinationName}
            </h1>
          </div>
        </div>

        {/* Badge trạng thái hồ sơ */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          {currentStatus === "PUBLISHED" ? (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 border border-emerald-300 animate-in zoom-in-95">
              <CheckCircle2 size={13} />
              <span>ĐÃ XUẤT BẢN (PUBLISHED)</span>
            </span>
          ) : currentStatus === "REVISION_REQUESTED" ? (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black bg-amber-100 text-amber-800 border border-amber-300">
              <AlertTriangle size={13} />
              <span>YÊU CẦU CHỈNH SỬA</span>
            </span>
          ) : currentStatus === "REJECTED" ? (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black bg-rose-100 text-rose-800 border border-rose-300">
              <XCircle size={13} />
              <span>ĐÃ TỪ CHỐI</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-amber-50 text-amber-800 border border-amber-300">
              <Clock size={13} className="text-amber-600" />
              <span>CHỜ KIỂM ĐỊNH (PENDING)</span>
            </span>
          )}
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────
          BỐ CỤC KHÔNG GIAN LÀM VIỆC (AUDIT SPLIT VIEW)
      ──────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ══════════════════════════════════════════════════════
            CỘT TRÁI (CHIẾM 7/12): CHI TIẾT NỘI DUNG DO PROVIDER ĐỆ TRÌNH
        ══════════════════════════════════════════════════════ */}
        <div className="lg:col-span-7 space-y-5">
          {/* Thẻ 1: Thông tin đơn vị gửi & Thời gian */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-teal-50 border border-teal-200 text-teal-800 flex items-center justify-center font-bold text-sm flex-shrink-0">
                  <Building2 size={20} />
                </div>
                <div>
                  <p className="text-[10.5px] font-bold uppercase tracking-wider text-slate-400">
                    Đơn vị đệ trình hồ sơ
                  </p>
                  <p className="text-sm font-black text-slate-900 leading-snug">
                    {submissionData.submittedBy}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-500">
                    <span>Gửi lúc: {submissionData.submittedAt}</span>
                    <span>•</span>
                    <span className="text-rose-600 font-bold">Mức độ: {submissionData.priority}</span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
                  <Ticket size={12} className="text-rose-500" />
                  <span>{submissionData.pricing.price.toLocaleString("vi-VN")} đ</span>
                </span>
                <p className="text-[10px] text-slate-400 mt-1">
                  {submissionData.pricing.includedServices.length} quyền lợi đính kèm
                </p>
              </div>
            </div>
          </div>

          {/* Thẻ 2: Kiểm tra thông số thực địa (Geofence Validation) */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-sky-50 border border-sky-200 text-sky-700 flex items-center justify-center">
                  <Navigation size={16} />
                </div>
                <div>
                  <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                    Kiểm Tra Tọa Độ Thực Địa (Geofence Validation)
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Xác thực vị trí GPS kích hoạt thuyết minh không bị lệch ra lòng đường giao thông
                  </p>
                </div>
              </div>

              {submissionData.geofence.isSafeFromTraffic && (
                <span className="inline-flex items-center gap-1 text-[10.5px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                  <CheckCircle2 size={12} />
                  <span>An toàn khuôn viên nội bộ</span>
                </span>
              )}
            </div>

            {/* Khung thông số GPS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs">
              <div>
                <span className="text-[10.5px] text-slate-400 block font-semibold">Vĩ độ (Latitude)</span>
                <span className="font-mono font-bold text-slate-800 text-xs sm:text-sm">
                  {submissionData.geofence.lat}° N
                </span>
              </div>
              <div>
                <span className="text-[10.5px] text-slate-400 block font-semibold">Kinh độ (Longitude)</span>
                <span className="font-mono font-bold text-slate-800 text-xs sm:text-sm">
                  {submissionData.geofence.lng}° E
                </span>
              </div>
              <div>
                <span className="text-[10.5px] text-slate-400 block font-semibold">Bán kính kích hoạt</span>
                <span className="font-bold text-sky-700 text-xs sm:text-sm">
                  {submissionData.geofence.radius} mét (Vùng xanh)
                </span>
              </div>
            </div>

            {/* Bản đồ minh họa trực quan nhỏ (Interactive GPS Map Preview) */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-900/5 aspect-[16/7] flex items-center justify-center">
              {/* Hình nền vệ tinh / bản đồ di tích */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/image/vanmieu.png"
                alt="Bản đồ thực địa"
                className="w-full h-full object-cover opacity-85"
              />

              {/* Lớp phủ minh họa Geofence ảo */}
              <div className="absolute inset-0 bg-slate-900/35 backdrop-blur-2xs flex items-center justify-center p-4">
                <div className="relative flex items-center justify-center">
                  {/* Bán kính radar 60m */}
                  <div className="w-36 h-36 rounded-full border-2 border-dashed border-emerald-400 bg-emerald-500/25 animate-pulse flex items-center justify-center" />
                  
                  {/* Điểm ghim tọa độ trung tâm */}
                  <div className="absolute w-8 h-8 rounded-full bg-rose-600 text-white shadow-lg flex items-center justify-center ring-4 ring-white">
                    <MapPin size={16} />
                  </div>

                  {/* Nhãn chú thích */}
                  <div className="absolute -bottom-8 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg shadow-md border border-slate-200 text-[10px] font-bold text-slate-800 whitespace-nowrap">
                    Tâm check-in ({submissionData.geofence.radius}m)
                  </div>
                </div>
              </div>

              {/* Chú giải góc bản đồ */}
              <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-bold text-slate-700 border border-slate-200">
                Khuôn viên đi bộ Văn Miếu
              </div>
            </div>

            <p className="text-[11px] text-slate-500 italic">
              * Địa chỉ thực địa: {submissionData.geofence.addressNote}.
            </p>
          </div>

          {/* Thẻ 3: Nội dung thuyết minh lịch sử & Hình ảnh tư liệu */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center">
                <FileText size={16} />
              </div>
              <div>
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                  Nội Dung Thuyết Minh & Hình Ảnh Tư Liệu
                </h3>
                <p className="text-[11px] text-slate-500">
                  Thẩm định câu chuyện di sản, niên đại lịch sử và bản quyền hình ảnh
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                  {submissionData.narrative.period}
                </span>
              </div>
              <h4 className="text-sm font-black text-slate-900">
                {submissionData.narrative.title}
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
                {submissionData.narrative.body}
              </p>
            </div>

            {/* Danh sách ảnh tư liệu đính kèm */}
            <div>
              <p className="text-xs font-bold text-slate-700 mb-2">
                Hình ảnh tư liệu di tích ({submissionData.narrative.images.length} tệp):
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {submissionData.narrative.images.map((img, idx) => (
                  <div
                    key={idx}
                    className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50 group hover:border-slate-300 transition-colors"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img.url}
                      alt={img.caption}
                      className="w-full h-32 object-cover group-hover:scale-102 transition-transform duration-200"
                    />
                    <div className="p-2.5 text-[11px]">
                      <p className="font-bold text-slate-800 line-clamp-1">{img.caption}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5 truncate font-mono">
                        {img.source}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Thẻ 4: Khung câu hỏi trắc nghiệm Gamification (Quiz) */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-purple-50 border border-purple-200 text-purple-700 flex items-center justify-center">
                  <HelpCircle size={16} />
                </div>
                <div>
                  <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                    Thử Thách Trắc Nghiệm Văn Hóa (Heritage Quiz)
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Câu hỏi đố lịch sử du khách trả lời khi check-in tại hiện vật
                  </p>
                </div>
              </div>

              <span className="text-[11px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">
                +{submissionData.quizChallenge.pointsReward} Điểm thưởng
              </span>
            </div>

            {/* Câu hỏi */}
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
              <p className="font-bold text-slate-900 text-xs sm:text-sm">
                Câu hỏi: {submissionData.quizChallenge.question}
              </p>

              {/* 4 Đáp án */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                {submissionData.quizChallenge.options.map((opt) => (
                  <div
                    key={opt.key}
                    className={`p-2.5 rounded-xl border text-xs flex items-center justify-between ${
                      opt.isCorrect
                        ? "bg-emerald-50 border-emerald-300 text-emerald-900 font-bold"
                        : "bg-white border-slate-200 text-slate-700"
                    }`}
                  >
                    <span>
                      <strong>{opt.key}.</strong> {opt.text}
                    </span>
                    {opt.isCorrect && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-600 text-white font-black uppercase">
                        Đáp án đúng
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Lời giải thích */}
              <p className="text-[11px] text-slate-500 mt-3 pt-2.5 border-t border-slate-200">
                <strong>Giải thích sử liệu:</strong> {submissionData.quizChallenge.explanation}
              </p>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════
            CỘT PHẢI (CHIẾM 5/12): BẢNG ĐÁNH GIÁ & QUYẾT ĐỊNH CỦA MODERATOR
        ══════════════════════════════════════════════════════ */}
        <div className="lg:col-span-5 space-y-5 lg:sticky lg:top-6">
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-5">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-teal-500" />
                <span className="text-[11px] font-black uppercase tracking-wider text-teal-700">
                  Hội Đồng Thẩm Định
                </span>
              </div>
              <h2 className="text-base font-black text-slate-900">
                Bảng Kiểm Chuẩn & Ra Quyết Định
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Đánh dấu các tiêu chí đạt chuẩn trước khi phê duyệt xuất bản
              </p>
            </div>

            {/* Checklist kiểm chuẩn văn hóa (Checkboxes) */}
            <div className="space-y-2.5 pt-1">
              <label className="flex items-start gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200 hover:border-teal-300 transition-colors cursor-pointer select-none group">
                <input
                  type="checkbox"
                  checked={checklist.historyAccuracy}
                  onChange={() => handleToggleChecklist("historyAccuracy")}
                  className="w-4 h-4 mt-0.5 rounded text-teal-600 focus:ring-teal-500 cursor-pointer"
                />
                <div className="text-xs">
                  <p className="font-bold text-slate-900 group-hover:text-teal-900">
                    Niên đại và sự tích lịch sử chính xác
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Đối chiếu chuẩn theo Đại Việt Sử Ký Toàn Thư và tư liệu BQL.
                  </p>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200 hover:border-teal-300 transition-colors cursor-pointer select-none group">
                <input
                  type="checkbox"
                  checked={checklist.mediaRights}
                  onChange={() => handleToggleChecklist("mediaRights")}
                  className="w-4 h-4 mt-0.5 rounded text-teal-600 focus:ring-teal-500 cursor-pointer"
                />
                <div className="text-xs">
                  <p className="font-bold text-slate-900 group-hover:text-teal-900">
                    Hình ảnh tư liệu hợp pháp & thuần phong mỹ tục
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Có bản quyền rõ ràng, độ phân giải cao và tôn trọng không gian di tích.
                  </p>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200 hover:border-teal-300 transition-colors cursor-pointer select-none group">
                <input
                  type="checkbox"
                  checked={checklist.gpsSafety}
                  onChange={() => handleToggleChecklist("gpsSafety")}
                  className="w-4 h-4 mt-0.5 rounded text-teal-600 focus:ring-teal-500 cursor-pointer"
                />
                <div className="text-xs">
                  <p className="font-bold text-slate-900 group-hover:text-teal-900">
                    Tọa độ GPS & bán kính Geofence an toàn
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Tránh lòng đường giao thông, nằm trọn trong lối đi bộ an toàn.
                  </p>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200 hover:border-teal-300 transition-colors cursor-pointer select-none group">
                <input
                  type="checkbox"
                  checked={checklist.quizValidity}
                  onChange={() => handleToggleChecklist("quizValidity")}
                  className="w-4 h-4 mt-0.5 rounded text-teal-600 focus:ring-teal-500 cursor-pointer"
                />
                <div className="text-xs">
                  <p className="font-bold text-slate-900 group-hover:text-teal-900">
                    Câu hỏi trắc nghiệm có căn cứ rõ ràng
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Đáp án đúng chuẩn xác, kèm phần giải thích giúp khách học hỏi lịch sử.
                  </p>
                </div>
              </label>
            </div>

            {/* Ô nhập ý kiến phản hồi (Moderator Feedback) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Ý kiến phản hồi & Ghi chú thẩm định
              </label>
              <textarea
                rows={4}
                value={feedbackNotes}
                onChange={(e) => setFeedbackNotes(e.target.value)}
                placeholder="Ghi chú chi tiết gửi tới Provider (VD: Vui lòng đính chính lại năm khởi dựng Khuê Văn Các là 1805)..."
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 leading-relaxed"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Ghi chú này sẽ được đính kèm vào thông báo gửi tới Ban Quản Lý di tích.
              </p>
            </div>

            {/* Cụm 3 nút hành động ở chân trang */}
            <div className="pt-3 border-t border-slate-100 space-y-2">
              {/* Nút Phê duyệt & Xuất bản (Xanh ngọc to) */}
              <button
                type="button"
                onClick={handleApproveAndPublish}
                className="w-full py-3 px-5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold rounded-xl shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 text-sm transition-all cursor-pointer"
              >
                <CheckCircle2 size={18} />
                <span>Phê duyệt & Xuất bản</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                {/* Nút Yêu cầu chỉnh sửa (Vàng hổ phách) */}
                <button
                  type="button"
                  onClick={handleRequestRevision}
                  className="w-full py-2.5 px-3 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  <AlertTriangle size={15} />
                  <span>Yêu cầu sửa đổi</span>
                </button>

                {/* Nút Từ chối hồ sơ (Viền đỏ) */}
                <button
                  type="button"
                  onClick={handleReject}
                  className="w-full py-2.5 px-3 border border-rose-300 text-rose-600 hover:bg-rose-50 active:bg-rose-100 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <XCircle size={15} />
                  <span>Từ chối hồ sơ</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────
          MODAL THÔNG BÁO KẾT QUẢ QUYẾT ĐỊNH THẨM ĐỊNH
      ──────────────────────────────────────────────────────── */}
      {isDecisionModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setIsDecisionModalOpen(false)}
        >
          <div
            className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 text-center relative animate-in zoom-in-95 duration-200 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={`w-14 h-14 rounded-full mx-auto flex items-center justify-center ${
                decisionResult.type === "PUBLISHED"
                  ? "bg-emerald-100 text-emerald-600"
                  : decisionResult.type === "REVISION_REQUESTED"
                  ? "bg-amber-100 text-amber-600"
                  : "bg-rose-100 text-rose-600"
              }`}
            >
              {decisionResult.type === "PUBLISHED" && <CheckCircle2 size={32} />}
              {decisionResult.type === "REVISION_REQUESTED" && <AlertTriangle size={32} />}
              {decisionResult.type === "REJECTED" && <XCircle size={32} />}
            </div>

            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900">
                {decisionResult.title}
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                {decisionResult.message}
              </p>
            </div>

            <div className="pt-2 flex items-center justify-center gap-2">
              <Link
                href="/moderator"
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
              >
                Về danh sách hàng chờ
              </Link>
              <button
                type="button"
                onClick={() => setIsDecisionModalOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition-colors shadow-xs"
              >
                Đóng thông báo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
