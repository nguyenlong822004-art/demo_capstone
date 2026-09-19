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
  ExternalLink,
  Highlighter,
  Check,
  X,
  Ticket,
  Maximize2,
  Layers,
  Sparkles,
} from "lucide-react";

/**
 * Trang Thẩm Định Chi Tiết Hồ Sơ Điểm Đến Di Tích (Destination Audit Detail Page)
 * Đường dẫn: /moderator/destinations/[id]
 */
export default function DestinationAuditDetailPage({ params }) {
  const router = useRouter();
  const resolvedParams = params ? use(params) : { id: "HS-2026-091" };
  const recordId = resolvedParams?.id || "HS-2026-091";

  // Dữ liệu mẫu hồ sơ điểm di tích do Provider gửi lên
  const destinationData = {
    id: recordId,
    name: "Lò Bầu Cổ Bát Tràng - Không Gian Nung Gốm Thủ Công 700 Năm",
    category: "Làng nghề truyền thống",
    sender: "Hợp tác xã Gốm Sứ Bát Tràng",
    senderContact: "battrang.htx@vietculture.vn • 0912 345 678",
    submittedAt: "15 phút trước - 09/09/2026",
    priority: "Gấp",
    pricing: {
      isPaid: true,
      price: 80000,
      includedServices: [
        "Vé tham quan 5 bầu nung cổ liên hoàn",
        "Thuyết minh AI Virtual Guide bằng GPS",
        "Tham gia đố vui nhận Huy hiệu Nghệ nhân Gốm",
      ],
    },
    geofence: {
      lat: "20.978250",
      lng: "105.912640",
      radius: 60, // mét
      address: "Thôn Giang Cao, xã Bát Tràng, huyện Gia Lâm, Hà Nội",
    },
    images: [
      {
        url: "/image/battrang .png",
        caption: "Cổng vào lò bầu cổ và giàn củi phơi truyền thống",
        source: "Kho tư liệu HTX Bát Tràng",
      },
      {
        url: "/image/gomsu.png",
        caption: "Khu vực bàn xoay thủ công và không gian trưng bày gốm cổ",
        source: "Bảo tàng Gốm Bát Tràng",
      },
    ],
    paragraphs: [
      {
        id: "p1",
        text: "Lò Bầu cổ là lò gốm thủ công lâu đời nhất còn nguyên vẹn tại làng gốm Bát Tràng. Được xây dựng từ cuối thế kỷ XIX, lò gồm 5 bầu nung liên hoàn hình mai rùa sử dụng củi gỗ nghiến, đại diện cho kỹ nghệ nung gốm truyền thống có lịch sử hơn 700 năm của cha ông.",
        highlightable: true,
      },
      {
        id: "p2",
        text: "Mỗi mẻ nung kéo dài liên tục từ 24 đến 48 giờ ở nhiệt độ lên tới 1.300°C, đòi hỏi nghệ nhân phải có kinh nghiệm 'xem lửa' qua các lỗ dòm nhỏ trên thân bầu để điều chỉnh củi nung cho chuẩn màu men lam.",
        highlightable: true,
      },
    ],
    quizChallenge: {
      question: "Lò Bầu cổ Bát Tràng truyền thống sử dụng nhiên liệu gì để đạt nhiệt độ nung 1.300°C?",
      options: [
        { key: "A", text: "Khí gas hóa lỏng công nghiệp" },
        { key: "B", text: "Than đá bùn Quảng Ninh" },
        { key: "C", text: "Củi gỗ tự nhiên (gỗ nghiến, củi phác)", isCorrect: true },
        { key: "D", text: "Điện trở nhiệt ba pha" },
      ],
      explanation: "Lò Bầu cổ hoàn toàn sử dụng củi gỗ tự nhiên, ngọn lửa củi đượm tạo ra lớp tro bay tự nhiên bám vào men gốm tạo nên sắc men hỏa biến độc bản không lò hiện đại nào mô phỏng được.",
    },
  };

  // State công cụ Highlight văn bản
  const [highlightedParas, setHighlightedParas] = useState({
    p1: false,
    p2: false,
  });

  // State kiểm tra bản đồ thực tế
  const [isMapVerifying, setIsMapVerifying] = useState(false);
  const [mapVerifiedStatus, setMapVerifiedStatus] = useState("VERIFIED"); // 'VERIFIED' | 'WARNING'

  // State Khung chấm điểm tiêu chí của Moderator
  const [criteria, setCriteria] = useState({
    historyAccuracy: true,
    photoQuality: true,
    gpsValidity: true,
  });

  // State Ô nhập lý do phản hồi (Feedback/Note)
  const [feedbackNote, setFeedbackNote] = useState(
    "Hồ sơ đầy đủ, thông số lò bầu 5 ngăn và kỹ nghệ nung củi chuẩn xác. Tọa độ GPS nằm trọn trong khuôn viên lò nung, an toàn cho du khách."
  );

  // State quyết định phê duyệt
  const [submissionStatus, setSubmissionStatus] = useState("PENDING"); // 'PENDING' | 'PUBLISHED' | 'REVISION' | 'REJECTED'
  const [decisionModal, setDecisionModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "",
  });

  // Toggle Highlight đoạn văn
  const toggleHighlight = (id) => {
    setHighlightedParas((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Toggle tiêu chí
  const toggleCriteria = (key) => {
    setCriteria((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Kiểm tra định vị thực tế
  const handleVerifyGPSOnMap = () => {
    setIsMapVerifying(true);
    setTimeout(() => {
      setIsMapVerifying(false);
      setMapVerifiedStatus("VERIFIED");
      alert(
        `[HỆ THỐNG GEODATA ĐÃ XÁC THỰC]:\n• Tọa độ: ${destinationData.geofence.lat}° N, ${destinationData.geofence.lng}° E\n• Bán kính: ${destinationData.geofence.radius}m\n• Kết quả: Nằm chính xác tại sân nội bộ xưởng gốm Giang Cao, cách đường lộ 25m, an toàn cho khách du lịch đi bộ check-in.`
      );
    }, 600);
  };

  // Mở Google Maps thực tế ở tab mới
  const handleOpenGoogleMaps = () => {
    const url = `https://www.google.com/maps?q=${destinationData.geofence.lat},${destinationData.geofence.lng}`;
    window.open(url, "_blank");
  };

  // Nút 1: Xác nhận Phê duyệt & Xuất bản
  const handleApprove = () => {
    setSubmissionStatus("PUBLISHED");
    setDecisionModal({
      isOpen: true,
      type: "PUBLISHED",
      title: "HỒ SƠ ĐÃ ĐƯỢC PHÊ DUYỆT & XUẤT BẢN!",
      message: `Hồ sơ "${destinationData.name}" (${recordId}) đã được duyệt thành công. Điểm đến đã sẵn sàng hiển thị trên bản đồ mobile của khách du lịch.`,
    });
  };

  // Nút 2: Yêu cầu đối tác chỉnh sửa
  const handleRequestRevision = () => {
    if (!feedbackNote.trim()) {
      alert("Vui lòng nhập lý do cụ thể vào ô phản hồi để đối tác biết phần cần chỉnh sửa.");
      return;
    }
    setSubmissionStatus("REVISION");
    setDecisionModal({
      isOpen: true,
      type: "REVISION",
      title: "ĐÃ GỬI YÊU CẦU CHỈNH SỬA TỚI ĐỐI TÁC",
      message: `Phản hồi đã được chuyển tiếp đến ${destinationData.sender}. Hồ sơ chuyển sang trạng thái chờ đối tác cập nhật lại.`,
    });
  };

  // Nút 3: Từ chối hồ sơ
  const handleReject = () => {
    if (!feedbackNote.trim()) {
      alert("Vui lòng nhập lý do từ chối hồ sơ (vấn đề pháp lý, tư liệu sai lệch nghiêm trọng, v.v.).");
      return;
    }
    setSubmissionStatus("REJECTED");
    setDecisionModal({
      isOpen: true,
      type: "REJECTED",
      title: "ĐÃ TỪ CHỐI DUYỆT HỒ SƠ",
      message: `Hồ sơ ${recordId} đã bị từ chối phê duyệt. Biên bản thẩm định đã được lưu trữ trong nhật ký hệ thống.`,
    });
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* ────────────────────────────────────────────────────────
          THANH ĐIỀU HƯỚNG VÀ TRẠNG THÁI HỒ SƠ
      ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200/80">
        <div className="flex items-center gap-3">
          <Link
            href="/moderator"
            className="w-9 h-9 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-colors shadow-2xs"
            title="Quay lại Bàn làm việc tổng quan"
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
                {destinationData.category}
              </span>
            </div>
            <h1 className="text-base sm:text-lg font-black text-slate-900 tracking-tight mt-0.5">
              Thẩm định Hồ sơ Điểm Di Tích
            </h1>
          </div>
        </div>

        {/* Trạng thái Badge */}
        <div className="flex items-center gap-2">
          {submissionStatus === "PUBLISHED" ? (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 border border-emerald-300">
              <CheckCircle2 size={13} />
              <span>ĐÃ XUẤT BẢN</span>
            </span>
          ) : submissionStatus === "REVISION" ? (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black bg-amber-100 text-amber-800 border border-amber-300">
              <AlertTriangle size={13} />
              <span>CHỜ ĐỐI TÁC SỬA ĐỔI</span>
            </span>
          ) : submissionStatus === "REJECTED" ? (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black bg-rose-100 text-rose-800 border border-rose-300">
              <XCircle size={13} />
              <span>ĐÃ TỪ CHỐI</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-amber-50 text-amber-800 border border-amber-300">
              <Clock size={13} className="text-amber-600" />
              <span>ĐANG THẨM ĐỊNH (GẤP)</span>
            </span>
          )}
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────
          BỐ CỤC SPLIT-SCREEN CHUYÊN NGHIỆP
      ──────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ══════════════════════════════════════════════════════
            CỘT TRÁI (CHIẾM 7/12): NỘI DUNG CẦN THẨM ĐỊNH
        ══════════════════════════════════════════════════════ */}
        <div className="lg:col-span-7 space-y-5">
          {/* Khối 1: Tên điểm di tích, phân loại, đơn vị gửi */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="inline-block text-[11px] font-bold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-md border border-teal-200 mb-1.5">
                  {destinationData.category}
                </span>
                <h2 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
                  {destinationData.name}
                </h2>
              </div>

              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200 shrink-0">
                <Ticket size={12} />
                <span>{destinationData.pricing.price.toLocaleString("vi-VN")} đ</span>
              </span>
            </div>

            <div className="pt-2.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <Building2 size={14} className="text-slate-400" />
                <span className="font-bold text-slate-800">{destinationData.sender}</span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-400">{destinationData.submittedAt}</span>
              </div>
            </div>
          </div>

          {/* Khối 2: Ảnh tư liệu và câu chuyện lịch sử (Kèm công cụ Highlight) */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center">
                  <FileText size={16} />
                </div>
                <div>
                  <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                    Ảnh Tư Liệu & Câu Chuyện Lịch Sử
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Bấm icon bút nhớ để đánh dấu đoạn văn bản cần lưu ý hoặc yêu cầu đối tác chỉnh sửa
                  </p>
                </div>
              </div>

              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
                <Highlighter size={12} className="text-amber-500" />
                <span>Chế độ bút nhớ</span>
              </span>
            </div>

            {/* Đoạn văn bản có công cụ highlight */}
            <div className="space-y-2.5">
              {destinationData.paragraphs.map((p) => {
                const isHl = highlightedParas[p.id];
                return (
                  <div
                    key={p.id}
                    className={`p-3.5 rounded-xl border text-xs leading-relaxed transition-all relative group ${
                      isHl
                        ? "bg-amber-50/90 border-amber-300 text-slate-900 ring-2 ring-amber-400/20"
                        : "bg-slate-50 border-slate-200/90 text-slate-700 hover:bg-slate-100/70"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="flex-1">{p.text}</p>
                      <button
                        type="button"
                        onClick={() => toggleHighlight(p.id)}
                        className={`p-1 rounded-md text-xs transition-colors shrink-0 ${
                          isHl
                            ? "bg-amber-200 text-amber-900 font-bold"
                            : "text-slate-400 hover:text-amber-700 hover:bg-amber-100"
                        }`}
                        title={isHl ? "Bỏ đánh dấu đoạn này" : "Đánh dấu đoạn này cần lưu ý"}
                      >
                        <Highlighter size={13} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Ảnh tư liệu */}
            <div className="pt-2">
              <p className="text-xs font-bold text-slate-700 mb-2">
                Ảnh tư liệu thực tế ({destinationData.images.length} tệp):
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {destinationData.images.map((img, idx) => (
                  <div
                    key={idx}
                    className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50 group hover:border-slate-300 transition-colors"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img.url}
                      alt={img.caption}
                      className="w-full h-32 object-cover group-hover:scale-102 transition-transform duration-200"
                      onError={(e) => {
                        e.currentTarget.src = "/image/vanmieu.png";
                      }}
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

          {/* Khối 3: Kiểm tra tọa độ Geofence (20.9782° N, 105.9126° E - 60m) */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-sky-50 border border-sky-200 text-sky-700 flex items-center justify-center">
                  <Navigation size={16} />
                </div>
                <div>
                  <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                    Kiểm Tra Tọa Độ Geofence & Bán Kính Check-in
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Đối soát tọa độ GPS và phạm vi kích hoạt thuyết minh âm thanh
                  </p>
                </div>
              </div>

              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                <CheckCircle2 size={12} />
                <span>Khuôn viên an toàn</span>
              </span>
            </div>

            {/* Chi tiết tọa độ GPS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs">
              <div>
                <span className="text-[10.5px] text-slate-400 block font-semibold">Vĩ độ (Latitude)</span>
                <span className="font-mono font-bold text-slate-800">
                  {destinationData.geofence.lat}° N
                </span>
              </div>
              <div>
                <span className="text-[10.5px] text-slate-400 block font-semibold">Kinh độ (Longitude)</span>
                <span className="font-mono font-bold text-slate-800">
                  {destinationData.geofence.lng}° E
                </span>
              </div>
              <div>
                <span className="text-[10.5px] text-slate-400 block font-semibold">Bán kính Geofence</span>
                <span className="font-bold text-sky-700">
                  {destinationData.geofence.radius} mét (Chuẩn di tích)
                </span>
              </div>
            </div>

            {/* Bản đồ minh họa nhỏ kèm nút kiểm tra định vị */}
            <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-900/5 aspect-[16/7] flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/image/battrang .png"
                alt="Bản đồ thực địa"
                className="w-full h-full object-cover opacity-80"
                onError={(e) => {
                  e.currentTarget.src = "/image/vanmieu.png";
                }}
              />

              <div className="absolute inset-0 bg-slate-900/35 backdrop-blur-2xs flex items-center justify-center p-4">
                <div className="relative flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full border-2 border-dashed border-emerald-400 bg-emerald-500/25 animate-pulse flex items-center justify-center" />
                  <div className="absolute w-8 h-8 rounded-full bg-rose-600 text-white shadow-lg flex items-center justify-center ring-4 ring-white">
                    <MapPin size={16} />
                  </div>
                  <div className="absolute -bottom-7 bg-white/95 backdrop-blur-md px-2 py-0.5 rounded-md shadow border border-slate-200 text-[10px] font-bold text-slate-800 whitespace-nowrap">
                    Tâm check-in ({destinationData.geofence.radius}m)
                  </div>
                </div>
              </div>

              {/* Nút hành động kiểm tra định vị */}
              <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleVerifyGPSOnMap}
                  disabled={isMapVerifying}
                  className="px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white font-bold text-xs shadow-md flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Navigation size={13} className={isMapVerifying ? "animate-spin" : ""} />
                  <span>{isMapVerifying ? "Đang dò quét..." : "Kiểm tra định vị trên bản đồ thực tế"}</span>
                </button>

                <button
                  type="button"
                  onClick={handleOpenGoogleMaps}
                  className="p-1.5 rounded-lg bg-white/90 hover:bg-white text-slate-700 border border-slate-200 text-xs shadow transition-colors"
                  title="Mở Google Maps vệ tinh"
                >
                  <ExternalLink size={13} />
                </button>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 italic">
              * Địa chỉ khai báo: {destinationData.geofence.address}
            </p>
          </div>

          {/* Khối 4: Kiểm tra bài đố Gamification */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-purple-50 border border-purple-200 text-purple-700 flex items-center justify-center">
                  <HelpCircle size={16} />
                </div>
                <div>
                  <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                    Kiểm Tra Bài Đố Gamification
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Nhiệm vụ tương tác khách trả lời qua ứng dụng di động khi đến trạm
                  </p>
                </div>
              </div>

              <span className="text-[11px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">
                +50 Điểm thưởng
              </span>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2.5">
              <p className="font-bold text-slate-900 text-xs sm:text-sm">
                Câu hỏi: {destinationData.quizChallenge.question}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {destinationData.quizChallenge.options.map((opt) => (
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

              <p className="text-[11px] text-slate-500 pt-2 border-t border-slate-200">
                <strong>Lời giải thích lịch sử:</strong> {destinationData.quizChallenge.explanation}
              </p>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════
            CỘT PHẢI (CHIẾM 5/12): BẢNG ĐIỀU KHIỂN QUYẾT ĐỊNH CỦA KIỂM DUYỆT VIÊN
        ══════════════════════════════════════════════════════ */}
        <div className="lg:col-span-5 space-y-5 lg:sticky lg:top-20">
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs space-y-5">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-teal-500" />
                <span className="text-[11px] font-black uppercase tracking-wider text-teal-700">
                  Bảng Quyết Định
                </span>
              </div>
              <h2 className="text-base font-black text-slate-900">
                Đánh Giá & Phê Duyệt Hồ Sơ
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Kiểm duyệt viên xác nhận các tiêu chí bắt buộc trước khi xuất bản
              </p>
            </div>

            {/* Khung chấm điểm tiêu chí (Checkboxes) */}
            <div className="space-y-2.5 pt-1">
              <label className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 hover:border-teal-300 transition-colors cursor-pointer select-none group">
                <input
                  type="checkbox"
                  checked={criteria.historyAccuracy}
                  onChange={() => toggleCriteria("historyAccuracy")}
                  className="w-4 h-4 mt-0.5 rounded text-teal-600 focus:ring-teal-500 cursor-pointer"
                />
                <div className="text-xs">
                  <p className="font-bold text-slate-900 group-hover:text-teal-900">
                    [x] Chuẩn xác lịch sử
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Niên đại lò nung thế kỷ XIX và nguồn gốc làng nghề 700 năm chính xác.
                  </p>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 hover:border-teal-300 transition-colors cursor-pointer select-none group">
                <input
                  type="checkbox"
                  checked={criteria.photoQuality}
                  onChange={() => toggleCriteria("photoQuality")}
                  className="w-4 h-4 mt-0.5 rounded text-teal-600 focus:ring-teal-500 cursor-pointer"
                />
                <div className="text-xs">
                  <p className="font-bold text-slate-900 group-hover:text-teal-900">
                    [x] Ảnh đạt chất lượng
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Ảnh chụp sắc nét, có bản quyền rõ ràng, không vi phạm thuần phong mỹ tục.
                  </p>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 hover:border-teal-300 transition-colors cursor-pointer select-none group">
                <input
                  type="checkbox"
                  checked={criteria.gpsValidity}
                  onChange={() => toggleCriteria("gpsValidity")}
                  className="w-4 h-4 mt-0.5 rounded text-teal-600 focus:ring-teal-500 cursor-pointer"
                />
                <div className="text-xs">
                  <p className="font-bold text-slate-900 group-hover:text-teal-900">
                    [x] Tọa độ GPS hợp lệ
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Bán kính 60m nằm trọn trong sân lò nung, không bị lấn ra lòng đường lộ.
                  </p>
                </div>
              </label>
            </div>

            {/* Ô nhập lý do phản hồi (Feedback/Note) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Lý do phản hồi / Ghi chú đối tác (Feedback / Note)
              </label>
              <textarea
                rows={4}
                value={feedbackNote}
                onChange={(e) => setFeedbackNote(e.target.value)}
                placeholder="Nhập ghi chú hoặc nguyên nhân cụ thể nếu yêu cầu đối tác chỉnh sửa lại..."
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 leading-relaxed"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Ghi chú này sẽ được gửi trực tiếp đến hộp thư của Hợp tác xã Bát Tràng.
              </p>
            </div>

            {/* 3 Nút hành động chính */}
            <div className="pt-3 border-t border-slate-100 space-y-2">
              {/* Nút 1: Xác nhận Phê duyệt & Xuất bản (Xanh ngọc to) */}
              <button
                type="button"
                onClick={handleApprove}
                className="w-full py-3 px-5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold rounded-xl shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 text-sm transition-all cursor-pointer"
              >
                <CheckCircle2 size={18} />
                <span>Xác nhận Phê duyệt & Xuất bản</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                {/* Nút 2: Yêu cầu đối tác chỉnh sửa (Vàng cam) */}
                <button
                  type="button"
                  onClick={handleRequestRevision}
                  className="w-full py-2.5 px-3 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  <AlertTriangle size={14} />
                  <span>Yêu cầu sửa đổi</span>
                </button>

                {/* Nút 3: Từ chối hồ sơ (Viền đỏ) */}
                <button
                  type="button"
                  onClick={handleReject}
                  className="w-full py-2.5 px-3 border border-rose-300 text-rose-600 hover:bg-rose-50 active:bg-rose-100 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <XCircle size={14} />
                  <span>Từ chối hồ sơ</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────
          POPUP MODAL KẾT QUẢ QUYẾT ĐỊNH
      ──────────────────────────────────────────────────────── */}
      {decisionModal.isOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setDecisionModal({ ...decisionModal, isOpen: false })}
        >
          <div
            className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 text-center relative animate-in zoom-in-95 duration-200 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={`w-14 h-14 rounded-full mx-auto flex items-center justify-center ${
                decisionModal.type === "PUBLISHED"
                  ? "bg-emerald-100 text-emerald-600"
                  : decisionModal.type === "REVISION"
                  ? "bg-amber-100 text-amber-600"
                  : "bg-rose-100 text-rose-600"
              }`}
            >
              {decisionModal.type === "PUBLISHED" && <CheckCircle2 size={32} />}
              {decisionModal.type === "REVISION" && <AlertTriangle size={32} />}
              {decisionModal.type === "REJECTED" && <XCircle size={32} />}
            </div>

            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900">
                {decisionModal.title}
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                {decisionModal.message}
              </p>
            </div>

            <div className="pt-2 flex items-center justify-center gap-2">
              <Link
                href="/moderator"
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
              >
                Về bàn làm việc
              </Link>
              <button
                type="button"
                onClick={() => setDecisionModal({ ...decisionModal, isOpen: false })}
                className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition-colors shadow-xs cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
