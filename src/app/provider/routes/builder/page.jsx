"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Compass,
  MapPin,
  Clock,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  ChevronUp,
  ChevronDown,
  Plus,
  Trash2,
  UploadCloud,
  CheckCircle2,
  Trophy,
  Save,
  HelpCircle,
  GripVertical,
  Layers,
  Footprints,
  Award,
  BookOpen,
  X,
  Check,
  Tag,
  AlertCircle,
} from "lucide-react";

/**
 * Trang Thiết Kế Lộ Trình Tham Quan Di Sản (Route Builder)
 * Dành cho Content Provider / Ban Quản Lý Điểm Đến
 */
export default function RouteBuilderPage() {
  const router = useRouter();

  // Toast thông báo tương tác
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
  };

  // ════════════════════════════════════════════════════════════
  // 1. STATE CỘT TRÁI: CẤU HÌNH THÔNG TIN TUYẾN
  // ════════════════════════════════════════════════════════════
  const [routeInfo, setRouteInfo] = useState({
    name: "Hành trình Ngàn năm Văn hiến Thăng Long",
    duration: "Nửa ngày (3 - 4 giờ)",
    theme: "Di sản Lịch sử & Nho học",
    rewardPoints: 200,
    storySummary:
      "Tuyến tham quan dẫn dắt du khách đi ngược dòng thời gian về thế kỷ XI - XIX, khám phá tinh hoa đạo học, bia tiến sĩ đá và biểu tượng kiến trúc Khuê Văn Các tại trung tâm Thủ đô.",
    coverImage: "/image/vanmieu.png",
  });

  const durationOptions = [
    "2 - 3 giờ (Tham quan nhanh)",
    "Nửa ngày (3 - 4 giờ)",
    "1 ngày (Trọn gói trải nghiệm)",
    "Buổi sáng (8:00 - 12:00)",
    "Tour đêm di tích (19:00 - 21:30)",
  ];

  const themeOptions = [
    "Di sản Lịch sử & Nho học",
    "Làng nghề Truyền thống & Mỹ nghệ",
    "Kiến trúc Cổ & Khảo cổ học",
    "Tâm linh & Danh thắng Quốc gia",
  ];

  // ════════════════════════════════════════════════════════════
  // 2. MOCK DATA DANH MỤC ĐIỂM ĐẾN (TỪ BƯỚC 2 ĐỂ CHỌN THÊM TRẠM)
  // ════════════════════════════════════════════════════════════
  const availableDestinations = [
    {
      id: "dest-kvc",
      name: "Khuê Văn Các",
      region: "Hà Nội",
      image: "/image/vanmieu.png",
      tag: "Biểu tượng Thủ đô",
      defaultMission: "Quiz trắc nghiệm: Ý nghĩa biểu tượng Sao Khuê tỏa sáng",
    },
    {
      id: "dest-bts",
      name: "Giếng Thiên Quang & 82 Bia Tiến Sĩ",
      region: "Hà Nội",
      image: "/image/thanglong.png",
      tag: "Di sản Ký ức UNESCO",
      defaultMission: "Check-in GPS & Thuyết minh âm thanh 82 Bia Tiến Sĩ",
    },
    {
      id: "dest-nth",
      name: "Nhà Thái Học (Quốc Tử Giám)",
      region: "Hà Nội",
      image: "/image/baotang.png",
      tag: "Trường ĐH đầu tiên VN",
      defaultMission: "Chụp ảnh lưu niệm AR cùng không gian lớp học xưa",
    },
    {
      id: "dest-lbc",
      name: "Lò Bầu Cổ Bát Tràng",
      region: "Hà Nội",
      image: "/image/battrang .png",
      tag: "Làng gốm 700 năm",
      defaultMission: "Thử thách: Vuốt gốm thủ công trên bàn xoay",
    },
    {
      id: "dest-btg",
      name: "Bảo Tàng Gốm Sứ Bát Tràng",
      region: "Hà Nội",
      image: "/image/gomsu.png",
      tag: "Kiến trúc 7 cánh xoắn ốc",
      defaultMission: "Tìm cổ vật: Chiếc bình gốm thời Lê sơ",
    },
  ];

  // ════════════════════════════════════════════════════════════
  // 3. STATE CỘT PHẢI: TRÌNH TỰ CÁC TRẠM DỪNG CHÂN (STOPS SEQUENCE)
  // ════════════════════════════════════════════════════════════
  const [stops, setStops] = useState([
    {
      stopId: "stop-1",
      destId: "dest-kvc",
      name: "Khuê Văn Các",
      region: "Hà Nội",
      image: "/image/vanmieu.png",
      distanceText: "Điểm xuất phát",
      durationWalk: "0 phút",
      mission: "Quiz trắc nghiệm: Ý nghĩa biểu tượng Sao Khuê tỏa sáng",
      missionPoints: 50,
    },
    {
      stopId: "stop-2",
      destId: "dest-bts",
      name: "Giếng Thiên Quang & 82 Bia Tiến Sĩ",
      region: "Hà Nội",
      image: "/image/thanglong.png",
      distanceText: "Cách trạm trước 150m",
      durationWalk: "3 phút đi bộ",
      mission: "Check-in GPS & Thuyết minh âm thanh 82 Bia Tiến Sĩ",
      missionPoints: 80,
    },
    {
      stopId: "stop-3",
      destId: "dest-nth",
      name: "Nhà Thái Học (Quốc Tử Giám)",
      region: "Hà Nội",
      image: "/image/baotang.png",
      distanceText: "Cách trạm trước 220m",
      durationWalk: "4 phút đi bộ",
      mission: "Chụp ảnh lưu niệm AR cùng không gian lớp học xưa",
      missionPoints: 70,
    },
  ]);

  // State Modal chọn trạm từ danh mục
  const [isAddStopModalOpen, setIsAddStopModalOpen] = useState(false);

  // Xử lý di chuyển trạm lên (Move Up)
  const handleMoveUp = (index) => {
    if (index === 0) return;
    const newStops = [...stops];
    const temp = newStops[index];
    newStops[index] = newStops[index - 1];
    newStops[index - 1] = temp;
    setStops(newStops);
    showToast(`Đã di chuyển "${temp.name}" lên vị trí Trạm ${index}.`);
  };

  // Xử lý di chuyển trạm xuống (Move Down)
  const handleMoveDown = (index) => {
    if (index === stops.length - 1) return;
    const newStops = [...stops];
    const temp = newStops[index];
    newStops[index] = newStops[index + 1];
    newStops[index + 1] = temp;
    setStops(newStops);
    showToast(`Đã di chuyển "${temp.name}" xuống vị trí Trạm ${index + 2}.`);
  };

  // Xử lý xóa trạm
  const handleDeleteStop = (index) => {
    const stopName = stops[index].name;
    const newStops = stops.filter((_, i) => i !== index);
    setStops(newStops);
    showToast(`Đã gỡ bỏ trạm "${stopName}".`);
  };

  // Xử lý thêm trạm từ danh mục
  const handleAddStopFromCategory = (dest) => {
    const newStop = {
      stopId: `stop-${Date.now()}`,
      destId: dest.id,
      name: dest.name,
      region: dest.region,
      image: dest.image,
      distanceText:
        stops.length === 0 ? "Điểm xuất phát" : "Cách trạm trước 350m",
      durationWalk: stops.length === 0 ? "0 phút" : "5 phút đi bộ",
      mission: dest.defaultMission,
      missionPoints: 50,
    };
    setStops([...stops, newStop]);
    setIsAddStopModalOpen(false);
    showToast(`Đã thêm "${dest.name}" vào vị trí Trạm ${stops.length + 1}!`);
  };

  // Cập nhật nhiệm vụ tại trạm
  const handleMissionChange = (index, value) => {
    const newStops = [...stops];
    newStops[index].mission = value;
    setStops(newStops);
  };

  // Cập nhật thông tin tuyến
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRouteInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Lưu bản nháp
  const handleSaveDraft = () => {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "vietculture_draft_route",
          JSON.stringify({ routeInfo, stops, updatedAt: new Date().toISOString() })
        );
      }
    } catch {
      // Bỏ qua lỗi
    }
    showToast("Đã lưu bản nháp lộ trình thành công!");
  };

  // Tiếp tục sang bước Gamification
  const handleNextStep = () => {
    if (stops.length < 2) {
      alert("Lộ trình cần tối thiểu 2 trạm dừng chân để du khách trải nghiệm.");
      return;
    }
    handleSaveDraft();
    router.push("/provider/tasks/create");
  };

  // Tính tổng điểm thưởng tích lũy
  const totalMissionPoints = stops.reduce(
    (acc, stop) => acc + (stop.missionPoints || 0),
    routeInfo.rewardPoints || 0
  );

  return (
    <div className="space-y-6 pb-12">
      {/* ── Toast thông báo tương tác ── */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-700 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs sm:text-sm font-semibold animate-in fade-in slide-in-from-top-4 border border-emerald-500/50">
          <Sparkles size={16} className="text-amber-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════
          TOP BAR & BREADCRUMBS
      ══════════════════════════════════════════════════════════ */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-1">
            <Link href="/provider" className="hover:text-emerald-700 transition-colors">
              Cổng Đối Tác
            </Link>
            <span>/</span>
            <span className="text-emerald-700">Thiết kế Lộ trình (Route Builder)</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-1.5 h-5 bg-sky-600 rounded-full" />
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Thiết Kế Lộ Trình Tham Quan Di Sản
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Xâu chuỗi các điểm đến di tích thành tour chuyên đề, xác lập trình tự trạm dừng chân và nhiệm vụ tương tác.
          </p>
        </div>

        {/* Nút hành động */}
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
            onClick={handleNextStep}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors shadow-sm shadow-emerald-600/25 cursor-pointer"
          >
            <span>Tiếp tục: Gamification</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          BỐ CỤC 2 CỘT CHÍNH: ROUTE BUILDER SPLIT VIEW
      ══════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ────────────────────────────────────────────────────────
            CỘT TRÁI (5/12): CẤU HÌNH THÔNG TIN TUYẾN
        ──────────────────────────────────────────────────────── */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Compass size={18} className="text-sky-600" />
            <h2 className="text-sm sm:text-base font-extrabold text-slate-900">
              Thông tin Tuyến tham quan
            </h2>
          </div>

          {/* Tên lộ trình */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Tên lộ trình văn hóa <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={routeInfo.name}
              onChange={handleInputChange}
              placeholder="Ví dụ: Hành trình Ngàn năm Văn hiến, Dấu ấn Làng gốm..."
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-600"
            />
          </div>

          {/* Thời lượng ước tính */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Thời lượng ước tính
            </label>
            <select
              name="duration"
              value={routeInfo.duration}
              onChange={handleInputChange}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-600"
            >
              {durationOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Chủ đề & Điểm thưởng hoàn thành */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Chủ đề tuyến
              </label>
              <select
                name="theme"
                value={routeInfo.theme}
                onChange={handleInputChange}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20"
              >
                {themeOptions.map((theme) => (
                  <option key={theme} value={theme}>
                    {theme}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Thưởng hoàn thành tour
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="rewardPoints"
                  value={routeInfo.rewardPoints}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-bold text-amber-600">
                  +pts
                </span>
              </div>
            </div>
          </div>

          {/* Mục tiêu trải nghiệm & Tóm tắt câu chuyện lộ trình */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Mục tiêu & Tóm tắt câu chuyện lộ trình
            </label>
            <textarea
              rows={4}
              name="storySummary"
              value={routeInfo.storySummary}
              onChange={handleInputChange}
              placeholder="Kể câu chuyện lịch sử kết nối các di tích với nhau, gợi mở cảm hứng khám phá cho du khách..."
              className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-600 leading-relaxed"
            />
          </div>

          {/* Tải ảnh bìa đại diện cho tuyến */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Ảnh bìa đại diện tuyến tham quan
            </label>
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={routeInfo.coverImage}
                alt={routeInfo.name}
                className="w-full h-36 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  e.currentTarget.src = "/image/vanmieu.png";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent flex items-end justify-between p-3 text-white">
                <span className="text-[11px] font-semibold bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-md">
                  Ảnh hiện tại
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setRouteInfo((prev) => ({
                      ...prev,
                      coverImage:
                        prev.coverImage === "/image/vanmieu.png"
                          ? "/image/thanglong.png"
                          : "/image/vanmieu.png",
                    }))
                  }
                  className="text-[11px] font-bold bg-white/90 text-slate-800 hover:bg-white px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                >
                  Đổi ảnh mẫu
                </button>
              </div>
            </div>

            {/* Dropzone Upload */}
            <div className="mt-2 border-2 border-dashed border-slate-200 hover:border-sky-500 bg-slate-50/70 rounded-xl p-3 text-center transition-colors cursor-pointer group">
              <UploadCloud size={20} className="mx-auto text-slate-400 group-hover:text-sky-600 transition-colors" />
              <p className="text-[11px] font-semibold text-slate-600 mt-1">
                Kéo thả ảnh bìa mới hoặc bấm để chọn tệp
              </p>
            </div>
          </div>

          {/* Thống kê nhanh tổng quan tuyến */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Tổng {stops.length} trạm dừng chân</span>
            <span className="text-amber-600 font-bold">
              +{totalMissionPoints} điểm thưởng tích lũy
            </span>
          </div>
        </div>

        {/* ────────────────────────────────────────────────────────
            CỘT PHẢI (7/12): TRÌNH TỰ CÁC TRẠM DỪNG CHÂN (STOPS SEQUENCE)
        ──────────────────────────────────────────────────────── */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-4 bg-emerald-600 rounded-full" />
                <h2 className="text-sm sm:text-base font-extrabold text-slate-900">
                  Trình tự các Trạm dừng chân (Stops Sequence)
                </h2>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Sắp xếp thứ tự ghé thăm của du khách và cấu hình nhiệm vụ tại mỗi điểm.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsAddStopModalOpen(true)}
              className="bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 text-xs shadow-sm shadow-emerald-600/20 transition-all cursor-pointer self-start sm:self-auto"
            >
              <Plus size={16} strokeWidth={2.4} />
              <span>Thêm trạm từ danh mục</span>
            </button>
          </div>

          {/* Tag chuỗi hành trình */}
          <div className="p-2.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center gap-2 overflow-x-auto text-xs font-bold text-slate-600">
            <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider shrink-0">
              Lộ trình:
            </span>
            {stops.map((stop, idx) => (
              <React.Fragment key={`breadcrumb-${stop.stopId}`}>
                <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200/80 text-emerald-900 shrink-0 shadow-2xs">
                  {idx + 1}. {stop.name}
                </span>
                {idx < stops.length - 1 && (
                  <span className="text-slate-300 font-black shrink-0">➜</span>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Danh sách các thẻ trạm dừng chân */}
          <div className="space-y-4 pt-2">
            {stops.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-2xl p-6">
                <Compass size={36} className="mx-auto text-slate-300 mb-2" />
                <p className="text-sm font-bold text-slate-700">Chưa có trạm dừng chân nào</p>
                <p className="text-xs text-slate-400 mt-1">
                  Hãy bấm &quot;Thêm trạm từ danh mục&quot; để bắt đầu xây dựng lộ trình.
                </p>
              </div>
            ) : (
              stops.map((stop, index) => {
                const isFirst = index === 0;
                const isLast = index === stops.length - 1;

                return (
                  <div key={stop.stopId} className="relative group">
                    {/* Dải nối khoảng cách giữa các trạm */}
                    {index > 0 && (
                      <div className="flex items-center gap-2 py-1 pl-6 text-[11px] text-slate-400 font-medium">
                        <span className="w-0.5 h-6 bg-slate-200 rounded-full" />
                        <span className="inline-flex items-center gap-1 bg-slate-100/90 text-slate-600 px-2 py-0.5 rounded-md border border-slate-200/60 font-semibold text-[10.5px]">
                          <Footprints size={11} className="text-sky-600" />
                          <span>{stop.distanceText}</span>
                          <span>•</span>
                          <span>{stop.durationWalk}</span>
                        </span>
                      </div>
                    )}

                    {/* Khung thẻ trạm */}
                    <div className="bg-white rounded-2xl border border-slate-200/90 hover:border-emerald-300 p-4 shadow-2xs hover:shadow-xs transition-all space-y-3">
                      {/* Hàng 1: Badge thứ tự, Ảnh, Tên trạm, Nút sắp xếp */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3 min-w-0">
                          {/* Badge thứ tự trạm */}
                          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center text-xs font-black shadow-xs flex-shrink-0">
                            {index + 1}
                          </div>

                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={stop.image}
                            alt={stop.name}
                            className="w-12 h-12 rounded-xl object-cover border border-slate-200 shadow-2xs flex-shrink-0"
                            onError={(e) => {
                              e.currentTarget.src = "/image/vanmieu.png";
                            }}
                          />

                          <div className="min-w-0">
                            <h3 className="text-sm font-bold text-slate-900 truncate">
                              {stop.name}
                            </h3>
                            <p className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1">
                              <MapPin size={11} className="text-emerald-600" />
                              <span>{stop.region}</span>
                              <span>•</span>
                              <span className="text-emerald-700 font-semibold">Trạm {index + 1}</span>
                            </p>
                          </div>
                        </div>

                        {/* Nút điều hướng Lên / Xuống & Xóa trạm */}
                        <div className="flex items-center gap-1 flex-shrink-0">
                          {/* Nút Di chuyển Lên */}
                          <button
                            type="button"
                            onClick={() => handleMoveUp(index)}
                            disabled={isFirst}
                            className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 disabled:opacity-30 disabled:hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer"
                            title="Di chuyển trạm lên trước"
                          >
                            <ChevronUp size={16} />
                          </button>

                          {/* Nút Di chuyển Xuống */}
                          <button
                            type="button"
                            onClick={() => handleMoveDown(index)}
                            disabled={isLast}
                            className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 disabled:opacity-30 disabled:hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer"
                            title="Di chuyển trạm xuống sau"
                          >
                            <ChevronDown size={16} />
                          </button>

                          {/* Nút Xóa */}
                          <button
                            type="button"
                            onClick={() => handleDeleteStop(index)}
                            className="w-8 h-8 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 flex items-center justify-center transition-colors cursor-pointer ml-1"
                            title="Gỡ bỏ trạm này"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>

                      {/* Hàng 2: Gắn nhiệm vụ tương tác đi kèm */}
                      <div className="pt-2.5 border-t border-slate-100 bg-slate-50/60 -mx-4 -mb-4 p-3.5 rounded-b-2xl">
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                            <Trophy size={13} className="text-amber-600" />
                            <span>Nhiệm vụ tương tác tại trạm</span>
                          </label>
                          <span className="text-[10.5px] font-extrabold text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded-md">
                            +{stop.missionPoints} điểm thưởng
                          </span>
                        </div>

                        <input
                          type="text"
                          value={stop.mission}
                          onChange={(e) => handleMissionChange(index, e.target.value)}
                          placeholder="Nhập nội dung câu đố, thử thách AR hoặc check-in..."
                          className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                        />
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer nút hành động cột phải */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setIsAddStopModalOpen(true)}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Plus size={15} />
              <span>Thêm trạm tiếp theo</span>
            </button>

            <button
              type="button"
              onClick={handleNextStep}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm shadow-emerald-600/20 transition-all cursor-pointer"
            >
              <span>Xác nhận & Cấu hình Gamification</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          MODAL: CHỌN ĐIỂM ĐẾN TỪ DANH MỤC ĐỂ THÊM TRẠM DỪNG CHÂN
      ══════════════════════════════════════════════════════════ */}
      {isAddStopModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setIsAddStopModalOpen(false)}
        >
          <div
            className="w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 relative animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div>
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                  Chọn Điểm đến Di tích vào Lộ trình
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Danh mục các di tích đã được tạo ở Bước 2
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsAddStopModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Danh sách điểm đến có sẵn */}
            <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
              {availableDestinations.map((dest) => {
                const isAlreadyAdded = stops.some((s) => s.destId === dest.id);

                return (
                  <div
                    key={dest.id}
                    className="p-3 rounded-2xl border border-slate-200 hover:border-emerald-300 bg-slate-50/60 hover:bg-emerald-50/30 flex items-center justify-between gap-3 transition-colors group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={dest.image}
                        alt={dest.name}
                        className="w-12 h-12 rounded-xl object-cover border border-slate-200 shadow-2xs flex-shrink-0"
                        onError={(e) => {
                          e.currentTarget.src = "/image/vanmieu.png";
                        }}
                      />
                      <div className="min-w-0">
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                          {dest.name}
                        </h4>
                        <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                          <MapPin size={11} className="text-emerald-600" />
                          <span>{dest.region}</span>
                          <span>•</span>
                          <span className="text-emerald-700 font-semibold">{dest.tag}</span>
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleAddStopFromCategory(dest)}
                      className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs font-bold transition-colors shrink-0 cursor-pointer shadow-2xs"
                    >
                      {isAlreadyAdded ? "+ Thêm lại" : "+ Chọn trạm"}
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <Link
                href="/provider/destinations"
                className="text-xs font-bold text-slate-500 hover:text-emerald-700 flex items-center gap-1 transition-colors"
              >
                <span>Tạo thêm điểm đến mới ở Bước 2</span>
                <ArrowRight size={13} />
              </Link>

              <button
                type="button"
                onClick={() => setIsAddStopModalOpen(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
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
