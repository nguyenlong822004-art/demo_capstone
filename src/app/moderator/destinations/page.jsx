"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  MapPin,
  Compass,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ArrowUpRight,
  Eye,
  Building2,
  Ticket,
  Navigation,
  HelpCircle,
  Camera,
  Layers,
  X,
  Send,
  ExternalLink,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  FileCheck,
} from "lucide-react";

/**
 * Trang Thẩm Định Điểm Đến & Lộ Trình Di Sản (Content Moderator Destinations Page)
 * Đường dẫn: /moderator/destinations
 */
export default function ModeratorDestinationsPage() {
  // State bộ lọc Tab trạng thái: 'all' | 'urgent' | 'revision' | 'approved'
  const [statusTab, setStatusTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [regionFilter, setRegionFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // State Modal xem trước nhanh (Quick Preview Modal)
  const [previewItem, setPreviewItem] = useState(null);
  const [quickFeedbackNote, setQuickFeedbackNote] = useState("");
  const [toastMsg, setToastMsg] = useState("");

  // Toast helper
  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3500);
  };

  // 5 hồ sơ mẫu chuẩn di sản Việt Nam theo đúng yêu cầu
  const initialDestinations = [
    {
      id: "HS-2026-089",
      code: "VM-KVC-01",
      title: "Khuê Văn Các & Giếng Thiên Quang",
      sender: "BQL Di tích Văn Miếu",
      region: "Hà Nội",
      category: "Di tích",
      typeBadge: "Điểm di tích & GPS",
      typeColor: "bg-sky-50 text-sky-800 border-sky-200",
      status: "urgent", // Chờ duyệt gấp
      statusLabel: "Chờ duyệt gấp",
      statusBadge: "bg-rose-50 text-rose-700 border-rose-200",
      priority: "Gấp",
      priorityBadge: "bg-rose-600 text-white",
      image: "/image/vanmieu.png",
      lat: "21.0285",
      lng: "105.8355",
      radius: 60,
      pricing: { isPaid: true, price: 80000 },
      description:
        "Khuê Văn Các là lầu vuông tám mái khởi dựng năm 1805 dưới triều vua Gia Long. Tầng trên có bốn cửa tròn tỏa sáng như sao Khuê soi bóng xuống Giếng Thiên Quang vuông vức, tượng trưng cho trời tròn đất vuông.",
      quiz: {
        question: "Khuê Văn Các tại Văn Miếu được Tổng trấn Bắc thành khởi công vào năm nào?",
        options: [
          { key: "A", text: "Năm 1070 triều Lý" },
          { key: "B", text: "Năm 1805 triều Nguyễn", isCorrect: true },
          { key: "C", text: "Năm 1442 triều Lê" },
          { key: "D", text: "Năm 1902 thời Pháp" },
        ],
        explanation: "Xây dựng năm 1805 dưới triều vua Gia Long do Tổng trấn Bắc thành Nguyễn Văn Thành chủ trì.",
      },
    },
    {
      id: "HS-2026-088",
      code: "HTTL-ROUTE-02",
      title: "Hành trình Ngàn năm Văn hiến (4 trạm)",
      sender: "BQL Hoàng Thành Thăng Long",
      region: "Hà Nội",
      category: "Tuyến du khảo",
      typeBadge: "Tuyến tham quan & Giá vé",
      typeColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
      status: "urgent", // Chờ duyệt
      statusLabel: "Chờ duyệt",
      statusBadge: "bg-amber-50 text-amber-800 border-amber-200",
      priority: "Gấp",
      priorityBadge: "bg-rose-600 text-white",
      image: "/image/thanglong.png",
      lat: "21.0345",
      lng: "105.8398",
      radius: 120,
      pricing: { isPaid: true, price: 80000 },
      description:
        "Tuyến du khảo liên thông 4 trạm lịch sử: Đoan Môn ➜ Điện Kính Thiên ➜ Hậu Lâu ➜ Cửa Bắc. Tuyến có hệ thống audio guide định vị vệ tinh tự động kích hoạt khi khách qua từng cổng thành cổ.",
      quiz: {
        question: "Điện Kính Thiên được xây dựng vào thời kỳ nào trong lịch sử Hoàng thành Thăng Long?",
        options: [
          { key: "A", text: "Thời nhà Lý (1010)" },
          { key: "B", text: "Thời nhà Trần (1225)" },
          { key: "C", text: "Thời Lê Sơ (1428)", isCorrect: true },
          { key: "D", text: "Thời Tây Sơn (1789)" },
        ],
        explanation: "Điện Kính Thiên được khởi dựng năm 1428 thời vua Lê Thái Tổ ngay trên nền điện Càn Nguyên cũ thời Lý.",
      },
    },
    {
      id: "HS-2026-087",
      code: "BT-LBC-03",
      title: "Lò Bầu Cổ & Tinh hoa Gốm Bát Tràng",
      sender: "HTX Gốm Bát Tràng",
      region: "Hà Nội",
      category: "Làng nghề",
      typeBadge: "Điểm đến & Gamification Quiz",
      typeColor: "bg-purple-50 text-purple-800 border-purple-200",
      status: "revision", // Cần rà soát lại
      statusLabel: "Cần rà soát lại",
      statusBadge: "bg-amber-100 text-amber-800 border-amber-300",
      priority: "Tiêu chuẩn",
      priorityBadge: "bg-amber-500 text-white",
      image: "/image/battrang .png",
      lat: "20.9782",
      lng: "105.9126",
      radius: 60,
      pricing: { isPaid: true, price: 50000 },
      description:
        "Lò Bầu cổ gồm 5 bầu nung liên hoàn có niên đại cuối thế kỷ XIX, là chứng nhân sống động cho hơn 700 năm tinh hoa nung gốm củi truyền thống của làng gốm Giang Cao - Bát Tràng.",
      quiz: {
        question: "Lò Bầu nung gốm truyền thống sử dụng loại nhiên liệu gì để đạt nhiệt độ 1.300°C?",
        options: [
          { key: "A", text: "Khí gas hóa lỏng công nghiệp" },
          { key: "B", text: "Củi gỗ tự nhiên (gỗ nghiến, củi phác)", isCorrect: true },
          { key: "C", text: "Than bùn ép khối" },
          { key: "D", text: "Điện cao tần" },
        ],
        explanation: "Lò Bầu cổ sử dụng củi gỗ nghiến tự nhiên tạo nên men hỏa biến độc bản của gốm Bát Tràng.",
      },
    },
    {
      id: "HS-2026-086",
      code: "NB-TA-04",
      title: "Quần thể Hang động Tràng An",
      sender: "BQL Tràng An Ninh Bình",
      region: "Ninh Bình",
      category: "Tuyến du khảo",
      typeBadge: "Lộ trình thuyền & Thử thách ảnh",
      typeColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
      status: "approved", // Đã phê duyệt
      statusLabel: "Đã phê duyệt",
      statusBadge: "bg-emerald-100 text-emerald-800 border-emerald-300",
      priority: "Tiêu chuẩn",
      priorityBadge: "bg-slate-400 text-white",
      image: "/image/trangan.png",
      lat: "20.2528",
      lng: "105.9085",
      radius: 150,
      pricing: { isPaid: true, price: 250000 },
      description:
        "Di sản Văn hóa và Thiên nhiên Thế giới kép duy nhất tại Đông Nam Á. Tuyến tham quan gồm 12 hang động xuyên thủy và 3 ngôi đền cổ tọa lạc giữa thung lũng đá vôi ngập nước kỳ vĩ.",
      quiz: {
        question: "Tràng An được UNESCO ghi danh là Di sản Kép Thế giới vào năm nào?",
        options: [
          { key: "A", text: "Năm 2010" },
          { key: "B", text: "Năm 2014", isCorrect: true },
          { key: "C", text: "Năm 2018" },
          { key: "D", text: "Năm 2021" },
        ],
        explanation: "Năm 2014, Quần thể danh thắng Tràng An chính thức được ghi danh là Di sản Văn hóa và Thiên nhiên Thế giới.",
      },
    },
    {
      id: "HS-2026-085",
      code: "DN-CHAM-05",
      title: "Bảo tàng Điêu khắc Chăm",
      sender: "Trung tâm Di sản Đà Nẵng",
      region: "Huế", // Miền Trung
      category: "Di tích",
      typeBadge: "Điểm đến & Âm bản tư liệu",
      typeColor: "bg-sky-50 text-sky-800 border-sky-200",
      status: "approved", // Đã phê duyệt
      statusLabel: "Đã phê duyệt",
      statusBadge: "bg-emerald-100 text-emerald-800 border-emerald-300",
      priority: "Tiêu chuẩn",
      priorityBadge: "bg-slate-400 text-white",
      image: "/image/gomsu.png",
      lat: "16.0601",
      lng: "108.2235",
      radius: 70,
      pricing: { isPaid: true, price: 60000 },
      description:
        "Bảo tàng lưu giữ bộ sưu tập hiện vật điêu khắc Chăm pa quy mô lớn nhất thế giới, được xây dựng từ năm 1915 theo phong cách kiến trúc Gothic kết hợp đường nét tháp Chăm.",
      quiz: {
        question: "Hiện vật Bảo vật Quốc gia nổi tiếng nhất trưng bày tại Bảo tàng Điêu khắc Chăm là gì?",
        options: [
          { key: "A", text: "Đài thờ Trà Kiệu & Đài thờ Mỹ Sơn E1", isCorrect: true },
          { key: "B", text: "Tượng Thần Sấm Sét La Mã" },
          { key: "C", text: "Trống đồng Đông Sơn" },
          { key: "D", text: "Bia đá Thần tích Cổ Loa" },
        ],
        explanation: "Đài thờ Trà Kiệu và Mỹ Sơn E1 là hai trong số các Bảo vật Quốc gia vô giá của nghệ thuật điêu khắc Champa.",
      },
    },
  ];

  const [destinations, setDestinations] = useState(initialDestinations);

  // Thao tác nhanh: Duyệt nhanh
  const handleQuickApprove = (id, title) => {
    setDestinations((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: "approved",
              statusLabel: "Đã phê duyệt",
              statusBadge: "bg-emerald-100 text-emerald-800 border-emerald-300",
            }
          : item
      )
    );
    showToast(`Đã duyệt & xuất bản thành công hồ sơ: "${title}"`);
    if (previewItem?.id === id) {
      setPreviewItem(null);
    }
  };

  // Thao tác nhanh: Yêu cầu sửa
  const handleQuickRevision = (id, title) => {
    setDestinations((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: "revision",
              statusLabel: "Cần rà soát lại",
              statusBadge: "bg-amber-100 text-amber-800 border-amber-300",
            }
          : item
      )
    );
    showToast(`Đã gửi yêu cầu đính chính tới đối tác cho hồ sơ: "${title}"`);
    if (previewItem?.id === id) {
      setPreviewItem(null);
    }
  };

  // Lọc dữ liệu theo tab và bộ lọc
  const filteredList = destinations.filter((item) => {
    // Tab lọc trạng thái
    if (statusTab === "urgent" && item.status !== "urgent") return false;
    if (statusTab === "revision" && item.status !== "revision") return false;
    if (statusTab === "approved" && item.status !== "approved") return false;

    // Tìm kiếm
    const matchSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase());

    // Khu vực
    const matchRegion =
      regionFilter === "all" ||
      item.region.toLowerCase().includes(regionFilter.toLowerCase());

    // Thể loại
    const matchCategory =
      categoryFilter === "all" || item.category === categoryFilter;

    return matchSearch && matchRegion && matchCategory;
  });

  // Mở modal xem trước
  const handleOpenPreview = (item) => {
    setPreviewItem(item);
    setQuickFeedbackNote(
      `Đã rà soát hồ sơ ${item.title}. Tọa độ GPS ${item.lat}° N, ${item.lng}° E chuẩn thực địa. Câu chuyện lịch sử đạt chuẩn văn hóa.`
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-200">
      {/* Toast thông báo nhanh */}
      {toastMsg && (
        <div className="fixed top-5 right-5 z-50 bg-teal-800 text-white px-4 py-2.5 rounded-2xl shadow-xl border border-teal-600 text-xs font-bold flex items-center gap-2 animate-in slide-in-from-top-3">
          <CheckCircle2 size={16} className="text-teal-300" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* ────────────────────────────────────────────────────────
          1. HEADER & BỘ LỌC HÀNG CHỜ (SUB-HEADER)
      ──────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs space-y-4">
        {/* Tiêu đề trang */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-500" />
              <span className="text-[11px] font-black uppercase tracking-wider text-teal-700">
                Hội Đồng Thẩm Định Văn Hóa
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Thẩm Định Điểm Đến & Lộ Trình Di Sản
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Rà soát tính xác thực lịch sử, tọa độ kích hoạt Geofence và quyền lợi du khách trước khi công bố
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
              Tổng số: <strong>{destinations.length} hồ sơ</strong>
            </span>
          </div>
        </div>

        {/* Thanh Tab trạng thái */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={() => setStatusTab("all")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              statusTab === "all"
                ? "bg-teal-600 text-white shadow-xs"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200/80"
            }`}
          >
            Tất cả (18)
          </button>
          <button
            type="button"
            onClick={() => setStatusTab("urgent")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              statusTab === "urgent"
                ? "bg-rose-600 text-white shadow-xs"
                : "bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            <span>Chờ duyệt gấp (5)</span>
          </button>
          <button
            type="button"
            onClick={() => setStatusTab("revision")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              statusTab === "revision"
                ? "bg-amber-600 text-white shadow-xs"
                : "bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200"
            }`}
          >
            Yêu cầu chỉnh sửa (4)
          </button>
          <button
            type="button"
            onClick={() => setStatusTab("approved")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              statusTab === "approved"
                ? "bg-emerald-600 text-white shadow-xs"
                : "bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200"
            }`}
          >
            Đã phê duyệt (9)
          </button>
        </div>

        {/* Thanh tìm kiếm & Dropdown lọc Tỉnh/Thành + Thể loại */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 pt-1">
          {/* Ô tìm kiếm */}
          <div className="sm:col-span-6 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Search size={14} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm tên di tích, đơn vị gửi (Văn Miếu, Bát Tràng...)..."
              className="w-full pl-8.5 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
            />
          </div>

          {/* Lọc Tỉnh / Thành phố */}
          <div className="sm:col-span-3">
            <select
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
            >
              <option value="all">Tất cả Tỉnh / Thành phố</option>
              <option value="Hà Nội">Hà Nội</option>
              <option value="Ninh Bình">Ninh Bình</option>
              <option value="Huế">Huế / Miền Trung</option>
            </select>
          </div>

          {/* Lọc Thể loại */}
          <div className="sm:col-span-3">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
            >
              <option value="all">Tất cả Thể loại</option>
              <option value="Di tích">Di tích lịch sử</option>
              <option value="Làng nghề">Làng nghề truyền thống</option>
              <option value="Tuyến du khảo">Tuyến du khảo / Lộ trình</option>
            </select>
          </div>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────
          2 & 3. DANH SÁCH THẺ HỒ SƠ ĐIỂM ĐẾN & LỘ TRÌNH (DATA CARDS)
      ──────────────────────────────────────────────────────── */}
      <div className="space-y-3.5">
        {filteredList.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 text-slate-400">
            <p className="text-sm font-semibold">Không tìm thấy hồ sơ di tích phù hợp.</p>
            <p className="text-xs mt-1">Hãy thử xóa bộ lọc tìm kiếm.</p>
          </div>
        ) : (
          filteredList.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs hover:border-teal-300 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4 group"
            >
              {/* Trái: Thumbnail + Nội dung chính */}
              <div className="flex items-start gap-3.5 sm:gap-4 flex-1 min-w-0">
                {/* Ảnh thumbnail di tích sắc nét */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover border border-slate-200 shadow-2xs shrink-0 group-hover:scale-102 transition-transform"
                  onError={(e) => {
                    e.currentTarget.src = "/image/vanmieu.png";
                  }}
                />

                <div className="space-y-1.5 min-w-0 flex-1">
                  {/* Badges thể loại & Mức độ ưu tiên */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`text-[10.5px] font-bold px-2 py-0.5 rounded-md border ${item.typeColor}`}
                    >
                      {item.typeBadge}
                    </span>

                    <span
                      className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${item.priorityBadge}`}
                    >
                      {item.priority}
                    </span>

                    <span
                      className={`text-[10.5px] font-bold px-2.5 py-0.5 rounded-full border ${item.statusBadge}`}
                    >
                      {item.statusLabel}
                    </span>
                  </div>

                  {/* Tên di tích */}
                  <h3 className="text-sm sm:text-base font-black text-slate-900 group-hover:text-teal-700 transition-colors truncate">
                    {item.title}
                  </h3>

                  {/* Đơn vị cung cấp & Khu vực */}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    <span className="flex items-center gap-1 font-semibold text-slate-700">
                      <Building2 size={13} className="text-slate-400" />
                      <span>{item.sender}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin size={12} className="text-teal-600" />
                      <span>{item.region}</span>
                    </span>
                    <span>•</span>
                    <span className="font-bold text-rose-600">
                      {item.pricing.price.toLocaleString("vi-VN")} đ
                    </span>
                  </div>

                  {/* Tọa độ GPS rút gọn kèm bán kính */}
                  <div className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-sky-800 bg-sky-50 border border-sky-200 px-2.5 py-0.5 rounded-md">
                    <Navigation size={11} className="text-sky-600" />
                    <span>
                      {item.lat}° N, {item.lng}° E • Bán kính: {item.radius}m
                    </span>
                  </div>
                </div>
              </div>

              {/* Phải: Cụm nút thao tác */}
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 self-end lg:self-center shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100 w-full lg:w-auto justify-end">
                {/* Nút Xem chi tiết (Mở Modal xem trước nhanh) */}
                <button
                  type="button"
                  onClick={() => handleOpenPreview(item)}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Mở bảng so sánh kiểm định nhanh"
                >
                  <Eye size={14} />
                  <span>So sánh nhanh</span>
                </button>

                {/* Nút [Xem chi tiết & Kiểm định] dẫn sang trang duyệt chi tiết */}
                <Link
                  href={`/moderator/destinations/${item.id}`}
                  className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white font-bold text-xs shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Xem chi tiết & Kiểm định</span>
                  <ArrowUpRight size={14} />
                </Link>

                {/* Thao tác nhanh */}
                <button
                  type="button"
                  onClick={() => handleQuickApprove(item.id, item.title)}
                  className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-bold transition-colors cursor-pointer"
                  title="Duyệt nhanh và xuất bản"
                >
                  <CheckCircle2 size={16} />
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickRevision(item.id, item.title)}
                  className="p-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 text-xs font-bold transition-colors cursor-pointer"
                  title="Yêu cầu sửa"
                >
                  <AlertTriangle size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ────────────────────────────────────────────────────────
          4. MODAL XEM TRƯỚC NHANH (QUICK PREVIEW MODAL)
      ──────────────────────────────────────────────────────── */}
      {previewItem && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-150"
          onClick={() => setPreviewItem(null)}
        >
          <div
            className="w-full max-w-3xl bg-white rounded-3xl p-5 sm:p-7 shadow-2xl border border-slate-100 relative animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Modal */}
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-black text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                    #{previewItem.id}
                  </span>
                  <span className="text-xs font-bold text-slate-500">{previewItem.category}</span>
                </div>
                <h3 className="text-base sm:text-lg font-black text-slate-900 mt-1">
                  {previewItem.title}
                </h3>
                <p className="text-xs text-slate-500">{previewItem.sender} • {previewItem.region}</p>
              </div>

              <button
                type="button"
                onClick={() => setPreviewItem(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Nội dung đối chiếu */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Cột 1: Văn bản thuyết minh & Tọa độ trên bản đồ mô phỏng */}
              <div className="space-y-3">
                <div>
                  <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider mb-1">
                    Nội Dung Thuyết Minh Lịch Sử
                  </h4>
                  <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200 leading-relaxed">
                    {previewItem.description}
                  </p>
                </div>

                {/* Bản đồ mô phỏng tọa độ */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">
                      Tọa Độ Geofence Bản Đồ
                    </h4>
                    <span className="text-[10.5px] text-sky-700 font-bold">
                      {previewItem.lat}° N, {previewItem.lng}° E ({previewItem.radius}m)
                    </span>
                  </div>

                  <div className="relative rounded-xl overflow-hidden border border-slate-200 aspect-[16/8] bg-slate-900/10 flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={previewItem.image}
                      alt="Bản đồ"
                      className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center">
                      <div className="relative flex items-center justify-center">
                        <div className="w-24 h-24 rounded-full border-2 border-dashed border-emerald-400 bg-emerald-500/25 animate-pulse" />
                        <div className="absolute w-7 h-7 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-md ring-2 ring-white">
                          <MapPin size={14} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cột 2: Câu hỏi trắc nghiệm Quiz & Khung nhập phản hồi */}
              <div className="space-y-3">
                {/* 4 Câu hỏi / Đáp án Quiz */}
                <div>
                  <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider mb-1">
                    Câu Hỏi Đố Vui Gamification
                  </h4>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
                    <p className="font-bold text-slate-900">{previewItem.quiz.question}</p>
                    <div className="space-y-1">
                      {previewItem.quiz.options.map((opt) => (
                        <div
                          key={opt.key}
                          className={`p-1.5 rounded-lg border text-[11px] flex items-center justify-between ${
                            opt.isCorrect
                              ? "bg-emerald-50 border-emerald-300 text-emerald-900 font-bold"
                              : "bg-white border-slate-200 text-slate-700"
                          }`}
                        >
                          <span>
                            <strong>{opt.key}.</strong> {opt.text}
                          </span>
                          {opt.isCorrect && (
                            <span className="text-[9px] bg-emerald-600 text-white px-1.5 py-0.2 rounded uppercase font-black">
                              Đáp án chuẩn
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Khung nhập ghi chú phản hồi */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Ghi Chú Phản Hồi Của Thẩm Định Viên
                  </label>
                  <textarea
                    rows={3}
                    value={quickFeedbackNote}
                    onChange={(e) => setQuickFeedbackNote(e.target.value)}
                    placeholder="Nhập yêu cầu bổ sung hoặc căn cứ duyệt..."
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 leading-relaxed"
                  />
                </div>
              </div>
            </div>

            {/* Footer Modal: 2 Nút Phê duyệt ngay & Yêu cầu bổ sung thông tin */}
            <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => handleQuickRevision(previewItem.id, previewItem.title)}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <AlertTriangle size={14} />
                <span>Yêu cầu bổ sung thông tin</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickApprove(previewItem.id, previewItem.title)}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <CheckCircle2 size={15} />
                <span>Phê duyệt ngay & Xuất bản</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
