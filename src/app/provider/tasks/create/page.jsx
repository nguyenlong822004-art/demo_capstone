"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Trophy,
  MapPin,
  HelpCircle,
  Camera,
  Award,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Save,
  ArrowRight,
  UploadCloud,
  Smartphone,
  Check,
  ChevronDown,
  Info,
  Layers,
  Star,
  RefreshCw,
} from "lucide-react";

/**
 * Trang Soạn Thảo Nhiệm Vụ Thực Địa & Gamification
 * Đường dẫn: src/app/provider/tasks/create/page.jsx
 */
export default function CreateTaskPage() {
  // Toast thông báo tương tác
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
  };

  // ════════════════════════════════════════════════════════════
  // 1. DANH SÁCH ĐIỂM DI TÍCH ĐỂ GẮN NHIỆM VỤ
  // ════════════════════════════════════════════════════════════
  const destinationOptions = [
    {
      id: "dest-kvc",
      name: "Khuê Văn Các",
      location: "Văn Miếu - Quốc Tử Giám, Hà Nội",
      image: "/image/vanmieu.png",
      lat: "21.028511",
      lng: "105.835520",
    },
    {
      id: "dest-bts",
      name: "Giếng Thiên Quang & 82 Bia Tiến Sĩ",
      location: "Vườn bia thứ 3, Văn Miếu, Hà Nội",
      image: "/image/thanglong.png",
      lat: "21.028820",
      lng: "105.835840",
    },
    {
      id: "dest-nth",
      name: "Nhà Thái Học (Quốc Tử Giám)",
      location: "Khu di tích thứ 5, Văn Miếu, Hà Nội",
      image: "/image/baotang.png",
      lat: "21.029140",
      lng: "105.836100",
    },
    {
      id: "dest-lbc",
      name: "Lò Bầu Cổ Bát Tràng",
      location: "Thôn Giang Cao, Bát Tràng, Gia Lâm, Hà Nội",
      image: "/image/battrang .png",
      lat: "20.978250",
      lng: "105.912640",
    },
  ];

  // ════════════════════════════════════════════════════════════
  // 2. DANH SÁCH HUY HIỆU DANH HIỆU (BADGES)
  // ════════════════════════════════════════════════════════════
  const badgeOptions = [
    {
      id: "badge-trang-nguyen",
      title: "Trạng Nguyên Thăng Long",
      level: "Huy hiệu Vàng",
      color: "from-amber-400 to-amber-600",
      textColor: "text-amber-950",
      description: "Vinh danh du khách giải mã trọn vẹn lịch sử đạo học ngàn năm.",
    },
    {
      id: "badge-nha-thong-thai",
      title: "Nhà Thông Thái Di Sản",
      level: "Huy hiệu Bạc",
      color: "from-sky-400 to-sky-600",
      textColor: "text-sky-950",
      description: "Hoàn thành xuất sắc 3 câu đố lịch sử tại quần thể di tích.",
    },
    {
      id: "badge-bac-thay-gom",
      title: "Bậc Thầy Gốm Bát Tràng",
      level: "Huy hiệu Đồng",
      color: "from-emerald-400 to-emerald-600",
      textColor: "text-emerald-950",
      description: "Thực hiện thành công thử thách thực địa tại làng nghề cổ.",
    },
    {
      id: "badge-su-gia-van-hoa",
      title: "Sứ Giả Văn Hóa Việt",
      level: "Huy hiệu Kim Cương",
      color: "from-purple-400 to-purple-600",
      textColor: "text-purple-950",
      description: "Tích cực lan tỏa hình ảnh di sản Việt Nam đến bạn bè năm châu.",
    },
  ];

  // ════════════════════════════════════════════════════════════
  // 3. FORM STATE CHÍNH
  // ════════════════════════════════════════════════════════════
  // Điểm di tích được chọn
  const [selectedDestId, setSelectedDestId] = useState(destinationOptions[0].id);
  const currentDest =
    destinationOptions.find((d) => d.id === selectedDestId) || destinationOptions[0];

  // Loại nhiệm vụ: 'quiz' (Trắc nghiệm) | 'photo' (Chụp ảnh)
  const [taskType, setTaskType] = useState("quiz");

  // Dữ liệu loại 1: Thử thách Trắc nghiệm (Heritage Quiz)
  const [quizData, setQuizData] = useState({
    question: "Bia Tiến sĩ tại Văn Miếu được đặt trang trọng trên lưng con vật linh thiêng nào?",
    options: [
      { key: "A", text: "Rùa đá (Kim Quy)" },
      { key: "B", text: "Rồng đá (Long Mã)" },
      { key: "C", text: "Nghê đá phong thủy" },
      { key: "D", text: "Hổ đá canh giữ" },
    ],
    correctAnswer: "A",
    explanation:
      "Chính xác! Trong văn hóa phương Đông, Rùa là một trong tứ linh (Long - Lân - Quy - Phụng), biểu trưng cho sự trường tồn, bền vững và trí tuệ bất diệt. Đặt bia trên lưng rùa đá mang ước nguyện vinh danh hiền tài muôn đời của cha ông.",
  });

  // Dữ liệu loại 2: Thử thách Chụp ảnh Xác thực (Photo Challenge)
  const [photoData, setPhotoData] = useState({
    angleDescription:
      "Chụp ảnh góc chính diện cổng Khuê Văn Các, bắt trọn vẹn khung cửa tròn sao Khuê và có mặt bạn (hoặc tay cầm vé tham quan / smartphone) trong khung hình.",
    sampleImage: "/image/vanmieu.png",
    tips: "Giữ khoảng cách 10m - 15m, hướng mặt trời chiếu xiên để công trình lên màu son đỏ đẹp nhất.",
  });

  // Cấu hình Phần thưởng (Reward)
  const [rewards, setRewards] = useState({
    points: 100,
    selectedBadgeId: badgeOptions[0].id,
  });

  const currentBadge =
    badgeOptions.find((b) => b.id === rewards.selectedBadgeId) || badgeOptions[0];

  // State tương tác trên màn hình Mobile Preview
  const [previewSelectedAnswer, setPreviewSelectedAnswer] = useState("");
  const [previewShowResult, setPreviewShowResult] = useState(false);

  // Xử lý thay đổi đáp án trắc nghiệm
  const handleOptionTextChange = (key, text) => {
    setQuizData((prev) => ({
      ...prev,
      options: prev.options.map((opt) =>
        opt.key === key ? { ...opt, text } : opt
      ),
    }));
  };

  // Lưu bản nháp
  const handleSaveDraft = () => {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "vietculture_draft_task",
          JSON.stringify({
            selectedDestId,
            taskType,
            quizData,
            photoData,
            rewards,
            updatedAt: new Date().toISOString(),
          })
        );
      }
    } catch {
      // Bỏ qua lỗi
    }
    showToast("Đã lưu bản nháp nhiệm vụ thực địa thành công!");
  };

  // Xuất bản nhiệm vụ
  const handlePublishTask = () => {
    handleSaveDraft();
    alert("Nhiệm vụ thực địa đã được gửi duyệt xuất bản lên Cổng Du Khách VietCulture!");
  };

  return (
    <div className="space-y-6 pb-12">
      {/* ── Toast Thông Báo ── */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-700 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs sm:text-sm font-semibold animate-in fade-in slide-in-from-top-4 border border-emerald-500/50">
          <Sparkles size={16} className="text-amber-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════
          TOP HEADER & BREADCRUMBS
      ══════════════════════════════════════════════════════════ */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-1">
            <Link href="/provider" className="hover:text-emerald-700 transition-colors">
              Cổng Đối Tác
            </Link>
            <span>/</span>
            <span className="text-emerald-700">Soạn thảo Nhiệm vụ & Gamification</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-1.5 h-5 bg-amber-500 rounded-full" />
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Soạn Thảo Nhiệm Vụ Thực Địa & Gamification
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Cấu hình câu đố lịch sử, thử thách chụp ảnh hiện trường, gán điểm thưởng và trao tặng huy hiệu danh dự.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <button
            type="button"
            onClick={handleSaveDraft}
            className="px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
          >
            <Save size={15} />
            <span>Lưu bản nháp</span>
          </button>

          <button
            type="button"
            onClick={handlePublishTask}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors shadow-sm shadow-emerald-600/25 cursor-pointer"
          >
            <CheckCircle2 size={15} />
            <span>Xuất bản nhiệm vụ</span>
          </button>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          BỐ CỤC 2 CỘT: FORM SOẠN THẢO (TRÁI) & MOBILE LIVE PREVIEW (PHẢI)
      ══════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ────────────────────────────────────────────────────────
            CỘT TRÁI (7/12): BIỂU MẪU SOẠN THẢO NHIỆM VỤ
        ──────────────────────────────────────────────────────── */}
        <div className="lg:col-span-7 space-y-5">
          {/* 1. CHỌN ĐIỂM DI TÍCH GẮN NHIỆM VỤ */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-extrabold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <MapPin size={16} className="text-emerald-600" />
                <span>1. Chọn điểm di tích gắn nhiệm vụ</span>
              </label>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/70 px-2 py-0.5 rounded-full">
                Kích hoạt tự động qua GPS / QR
              </span>
            </div>

            <select
              value={selectedDestId}
              onChange={(e) => {
                setSelectedDestId(e.target.value);
                setPreviewSelectedAnswer("");
                setPreviewShowResult(false);
              }}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-bold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
            >
              {destinationOptions.map((dest) => (
                <option key={dest.id} value={dest.id}>
                  {dest.name} ({dest.location})
                </option>
              ))}
            </select>

            {/* Chip thông tin vị trí thực địa */}
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center justify-between text-xs text-slate-600">
              <div className="flex items-center gap-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={currentDest.image}
                  alt={currentDest.name}
                  className="w-8 h-8 rounded-lg object-cover border border-slate-200 flex-shrink-0"
                  onError={(e) => {
                    e.currentTarget.src = "/image/vanmieu.png";
                  }}
                />
                <div>
                  <p className="font-bold text-slate-800">{currentDest.name}</p>
                  <p className="text-[10.5px] font-mono text-slate-400">
                    GPS: {currentDest.lat}° N, {currentDest.lng}° E
                  </p>
                </div>
              </div>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded-md">
                Bán kính 60m
              </span>
            </div>
          </div>

          {/* 2. LỰA CHỌN LOẠI NHIỆM VỤ (TASK TYPE TABS) */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <label className="text-xs font-extrabold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <Trophy size={16} className="text-amber-500" />
                <span>2. Chọn thể loại thử thách</span>
              </label>
            </div>

            {/* Thanh Tab chuyển đổi: Quiz vs Photo Challenge */}
            <div className="grid grid-cols-2 gap-2.5 p-1 bg-slate-100 rounded-2xl">
              <button
                type="button"
                onClick={() => {
                  setTaskType("quiz");
                  setPreviewSelectedAnswer("");
                  setPreviewShowResult(false);
                }}
                className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  taskType === "quiz"
                    ? "bg-white text-emerald-800 shadow-xs shadow-slate-200"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <HelpCircle size={16} className={taskType === "quiz" ? "text-emerald-600" : ""} />
                <span>Thử thách Trắc nghiệm</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setTaskType("photo");
                  setPreviewSelectedAnswer("");
                  setPreviewShowResult(false);
                }}
                className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  taskType === "photo"
                    ? "bg-white text-sky-800 shadow-xs shadow-slate-200"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <Camera size={16} className={taskType === "photo" ? "text-sky-600" : ""} />
                <span>Chụp ảnh Xác thực</span>
              </button>
            </div>

            {/* ── NỘI DUNG LOẠI 1: THỬ THÁCH TRẮC NGHIỆM (HERITAGE QUIZ) ── */}
            {taskType === "quiz" && (
              <div className="space-y-4 pt-2 animate-in fade-in duration-200">
                {/* Câu hỏi đố lịch sử */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Câu hỏi đố lịch sử <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={2}
                    value={quizData.question}
                    onChange={(e) =>
                      setQuizData((prev) => ({ ...prev, question: e.target.value }))
                    }
                    placeholder="Nhập câu đố văn hóa, niên đại, nhân vật lịch sử hoặc chi tiết cổ vật..."
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                  />
                </div>

                {/* 4 Đáp án A, B, C, D kèm radio chọn đáp án đúng */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      4 Đáp án trắc nghiệm (Chọn chấm tròn cho đáp án ĐÚNG)
                    </label>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                      Đáp án đúng: {quizData.correctAnswer}
                    </span>
                  </div>

                  <div className="space-y-2">
                    {quizData.options.map((opt) => {
                      const isCorrect = quizData.correctAnswer === opt.key;

                      return (
                        <div
                          key={opt.key}
                          className={`flex items-center gap-2.5 p-2 rounded-xl border transition-all ${
                            isCorrect
                              ? "bg-emerald-50/60 border-emerald-300 ring-1 ring-emerald-500/20"
                              : "bg-slate-50 border-slate-200"
                          }`}
                        >
                          {/* Radio chọn đáp án đúng */}
                          <button
                            type="button"
                            onClick={() =>
                              setQuizData((prev) => ({ ...prev, correctAnswer: opt.key }))
                            }
                            className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-extrabold transition-all cursor-pointer ${
                              isCorrect
                                ? "bg-emerald-600 text-white shadow-xs"
                                : "bg-slate-200/70 text-slate-600 hover:bg-slate-300"
                            }`}
                            title={`Đặt ${opt.key} là đáp án đúng`}
                          >
                            {opt.key}
                          </button>

                          {/* Ô nhập nội dung đáp án */}
                          <input
                            type="text"
                            value={opt.text}
                            onChange={(e) => handleOptionTextChange(opt.key, e.target.value)}
                            placeholder={`Nội dung đáp án ${opt.key}...`}
                            className="flex-1 bg-transparent text-xs sm:text-sm font-medium text-slate-800 focus:outline-none"
                          />

                          {isCorrect && (
                            <span className="text-[10.5px] font-bold text-emerald-700 flex items-center gap-1 pr-2">
                              <Check size={13} />
                              <span className="hidden sm:inline">Chính xác</span>
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Lời giải thích lịch sử sau khi du khách trả lời đúng */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Lời giải thích tư liệu lịch sử (Hiển thị khi trả lời đúng)
                  </label>
                  <textarea
                    rows={3}
                    value={quizData.explanation}
                    onChange={(e) =>
                      setQuizData((prev) => ({ ...prev, explanation: e.target.value }))
                    }
                    placeholder="Giải thích vì sao đáp án này đúng, bổ sung thêm kiến thức lịch sử thú vị cho du khách..."
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 leading-relaxed"
                  />
                </div>
              </div>
            )}

            {/* ── NỘI DUNG LOẠI 2: THỬ THÁCH CHỤP ẢNH XÁC THỰC (PHOTO CHALLENGE) ── */}
            {taskType === "photo" && (
              <div className="space-y-4 pt-2 animate-in fade-in duration-200">
                {/* Mô tả góc chụp yêu cầu */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Mô tả góc chụp yêu cầu <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={3}
                    value={photoData.angleDescription}
                    onChange={(e) =>
                      setPhotoData((prev) => ({
                        ...prev,
                        angleDescription: e.target.value,
                      }))
                    }
                    placeholder="Mô tả cụ thể góc máy, chi tiết kiến trúc cần có trong ảnh để hệ thống AI xác thực..."
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-600"
                  />
                </div>

                {/* Tải ảnh mẫu chuẩn để đối chiếu */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Ảnh mẫu đối chiếu cho du khách
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                    <div className="relative rounded-2xl overflow-hidden border border-slate-200 group h-36 bg-slate-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={photoData.sampleImage}
                        alt="Ảnh mẫu đối chiếu"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "/image/vanmieu.png";
                        }}
                      />
                      <span className="absolute bottom-2 left-2 bg-black/60 text-white text-[10.5px] font-bold px-2 py-0.5 rounded-md">
                        Ảnh chuẩn
                      </span>
                    </div>

                    <div className="border-2 border-dashed border-slate-200 hover:border-sky-500 bg-slate-50/70 rounded-2xl p-4 text-center transition-colors cursor-pointer group h-36 flex flex-col items-center justify-center">
                      <UploadCloud size={24} className="text-slate-400 group-hover:text-sky-600 transition-colors" />
                      <p className="text-xs font-bold text-slate-700 mt-1">
                        Kéo thả ảnh mẫu mới
                      </p>
                      <p className="text-[10px] text-slate-400">JPG, PNG tối đa 15MB</p>
                    </div>
                  </div>
                </div>

                {/* Gợi ý chụp ảnh */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Mẹo canh góc chụp cho du khách
                  </label>
                  <input
                    type="text"
                    value={photoData.tips}
                    onChange={(e) =>
                      setPhotoData((prev) => ({ ...prev, tips: e.target.value }))
                    }
                    placeholder="Ví dụ: Đứng cách bia 3m, bật đủ sáng..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                  />
                </div>
              </div>
            )}
          </div>

          {/* 3. CẤU HÌNH PHẦN THƯỞNG & HUY HIỆU (REWARD CONFIGURATION) */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <Award size={18} className="text-amber-500" />
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
                3. Cấu hình Phần thưởng & Huy hiệu
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Điểm thưởng */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Điểm thưởng nhận được (Points)
                </label>
                <div className="flex items-center gap-2">
                  {[50, 100, 150].map((pts) => (
                    <button
                      key={pts}
                      type="button"
                      onClick={() => setRewards((prev) => ({ ...prev, points: pts }))}
                      className={`flex-1 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                        rewards.points === pts
                          ? "bg-amber-500 text-white shadow-xs"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      +{pts} pts
                    </button>
                  ))}
                </div>
              </div>

              {/* Gắn Huy hiệu danh hiệu */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Trao tặng Huy hiệu (Badges)
                </label>
                <select
                  value={rewards.selectedBadgeId}
                  onChange={(e) =>
                    setRewards((prev) => ({ ...prev, selectedBadgeId: e.target.value }))
                  }
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                >
                  {badgeOptions.map((badge) => (
                    <option key={badge.id} value={badge.id}>
                      {badge.title} ({badge.level})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Chi tiết huy hiệu được chọn */}
            <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200/80 flex items-start gap-3">
              <div
                className={`w-10 h-10 rounded-xl bg-gradient-to-br ${currentBadge.color} ${currentBadge.textColor} flex items-center justify-center font-bold shadow-xs flex-shrink-0`}
              >
                <Award size={20} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-xs font-extrabold text-slate-900">
                    {currentBadge.title}
                  </p>
                  <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.2 rounded-md">
                    {currentBadge.level}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">
                  {currentBadge.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ────────────────────────────────────────────────────────
            CỘT PHẢI (5/12): XEM TRƯỚC MÀN HÌNH MOBILE DU KHÁCH (LIVE PREVIEW)
        ──────────────────────────────────────────────────────── */}
        <div className="lg:col-span-5 sticky top-20">
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Smartphone size={18} className="text-emerald-600" />
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
                  Xem trước trên Mobile của Du Khách
                </h3>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                Live Preview
              </span>
            </div>

            {/* ── MÔ PHỎNG ĐIỆN THOẠI SMARTPHONE ── */}
            <div className="mx-auto w-full max-w-[320px] bg-slate-900 p-2.5 rounded-[2.5rem] shadow-2xl border-4 border-slate-800">
              {/* Màn hình hiển thị thực tế */}
              <div className="w-full bg-slate-50 rounded-[2rem] overflow-hidden min-h-[520px] flex flex-col justify-between text-slate-800 select-none relative font-sans">
                {/* Thanh trạng thái đỉnh máy (Notch tai thỏ) */}
                <div className="bg-slate-900 text-white text-[10px] py-1 px-5 flex items-center justify-between rounded-t-[1.8rem]">
                  <span className="font-bold">09:41</span>
                  <div className="w-14 h-3.5 bg-black rounded-full" />
                  <span className="font-bold">5G • 100%</span>
                </div>

                {/* Nội dung màn hình trải nghiệm của Du khách */}
                <div className="p-3.5 flex-1 overflow-y-auto space-y-3">
                  {/* Header Trạm di tích */}
                  <div className="flex items-center gap-2 p-2 bg-white rounded-xl shadow-2xs border border-slate-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={currentDest.image}
                      alt={currentDest.name}
                      className="w-8 h-8 rounded-lg object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "/image/vanmieu.png";
                      }}
                    />
                    <div className="min-w-0">
                      <p className="text-[11px] font-extrabold text-slate-900 truncate">
                        {currentDest.name}
                      </p>
                      <p className="text-[9px] text-slate-400">Nhiệm vụ định vị thực địa GPS</p>
                    </div>
                  </div>

                  {/* Badge & Tiêu đề thử thách */}
                  <div className="text-center pt-1">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider bg-amber-100 text-amber-900 mb-1">
                      {taskType === "quiz" ? "Thử Thách Trắc Nghiệm" : "Nhiệm Vụ Chụp Ảnh AR"}
                    </span>
                    <h4 className="text-xs font-black text-slate-900 leading-snug px-1">
                      {taskType === "quiz" ? quizData.question : "Chụp ảnh lưu niệm tại hiện vật"}
                    </h4>
                  </div>

                  {/* THỬ THÁCH TRẮC NGHIỆM TRÊN MOBILE PREVIEW */}
                  {taskType === "quiz" ? (
                    <div className="space-y-1.5 pt-1">
                      {quizData.options.map((opt) => {
                        const isChosen = previewSelectedAnswer === opt.key;
                        const isCorrect = opt.key === quizData.correctAnswer;

                        let btnStyle = "bg-white text-slate-700 border-slate-200 hover:bg-slate-100";
                        if (previewShowResult) {
                          if (isCorrect) {
                            btnStyle = "bg-emerald-600 text-white border-emerald-600 font-bold";
                          } else if (isChosen && !isCorrect) {
                            btnStyle = "bg-rose-500 text-white border-rose-500";
                          }
                        } else if (isChosen) {
                          btnStyle = "bg-sky-600 text-white border-sky-600 font-bold";
                        }

                        return (
                          <button
                            key={opt.key}
                            type="button"
                            onClick={() => {
                              setPreviewSelectedAnswer(opt.key);
                              setPreviewShowResult(true);
                            }}
                            className={`w-full p-2 rounded-xl border text-left text-[10.5px] flex items-center gap-2 transition-all cursor-pointer ${btnStyle}`}
                          >
                            <span className="w-5 h-5 rounded-md bg-black/10 flex items-center justify-center font-bold text-[10px]">
                              {opt.key}
                            </span>
                            <span className="truncate flex-1">{opt.text}</span>
                          </button>
                        );
                      })}

                      {/* Phản hồi khi trả lời thử */}
                      {previewShowResult && (
                        <div
                          className={`p-2 rounded-xl text-[10px] animate-in fade-in leading-snug ${
                            previewSelectedAnswer === quizData.correctAnswer
                              ? "bg-emerald-50 text-emerald-900 border border-emerald-200"
                              : "bg-rose-50 text-rose-800 border border-rose-200"
                          }`}
                        >
                          {previewSelectedAnswer === quizData.correctAnswer ? (
                            <>
                              <p className="font-bold flex items-center gap-1 text-emerald-800">
                                <Sparkles size={11} className="text-amber-500" />
                                <span>Chúc mừng! +{rewards.points} điểm thưởng!</span>
                              </p>
                              <p className="mt-1 text-slate-600 text-[9.5px]">
                                {quizData.explanation}
                              </p>
                            </>
                          ) : (
                            <p className="font-semibold">
                              Chưa chính xác! Đáp án đúng là {quizData.correctAnswer}.
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    /* THỬ THÁCH CHỤP ẢNH TRÊN MOBILE PREVIEW */
                    <div className="space-y-2 pt-1 text-center">
                      <div className="relative rounded-xl overflow-hidden border border-slate-200 h-28 bg-slate-900">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={photoData.sampleImage}
                          alt="Ảnh mẫu"
                          className="w-full h-full object-cover opacity-80"
                        />
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-2">
                          <Camera size={22} className="animate-pulse text-amber-300" />
                          <span className="text-[9px] font-bold mt-1">Khung ngắm Camera AR</span>
                        </div>
                      </div>

                      <p className="text-[9.5px] text-slate-500 px-1 leading-tight line-clamp-2">
                        {photoData.angleDescription}
                      </p>

                      <button
                        type="button"
                        onClick={() => showToast("Mở Camera du khách mô phỏng!")}
                        className="w-full py-2 bg-emerald-600 text-white rounded-xl text-[10.5px] font-bold shadow-xs cursor-pointer"
                      >
                        Chụp Ảnh & Nhận +{rewards.points} Điểm
                      </button>
                    </div>
                  )}

                  {/* Card Phần thưởng trao tặng */}
                  <div className="mt-2 p-2 rounded-xl bg-gradient-to-r from-amber-50 to-emerald-50 border border-amber-200 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Award size={14} className="text-amber-600" />
                      <span className="text-[9.5px] font-extrabold text-slate-800 truncate">
                        {currentBadge.title}
                      </span>
                    </div>
                    <span className="text-[10px] font-black text-amber-600">
                      +{rewards.points} pts
                    </span>
                  </div>
                </div>

                {/* Thanh điều hướng đáy iPhone (Home Bar) */}
                <div className="p-2 flex justify-center bg-white rounded-b-[1.8rem] border-t border-slate-100">
                  <div className="w-24 h-1 bg-slate-300 rounded-full" />
                </div>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 text-center">
              Mọi thay đổi trên biểu mẫu bên trái sẽ phản chiếu trực tiếp lên màn hình xem trước này.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
