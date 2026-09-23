"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Users,
  MapPin,
  Compass,
  Trophy,
  TrendingUp,
  Coins,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  Calendar,
  CheckCircle2,
  Clock,
  AlertTriangle,
  FileCheck,
  Eye,
  Edit3,
  MoreVertical,
  ChevronRight,
  QrCode,
  Filter,
  Download,
  Share2,
} from "lucide-react";

/**
 * Trang Tổng Quan Content Provider (Dashboard KPI & Quản Lý Điểm Đến)
 * Đơn vị: Ban Quản Lý Di Tích Văn Miếu - Quốc Tử Giám
 */
export default function ProviderOverviewPage() {
  // Bộ lọc thời gian KPI: 'today' | 'week' | 'month' | 'year'
  const [timeRange, setTimeRange] = useState("month");

  // Tab lọc danh sách điểm đến: 'all' | 'published' | 'pending'
  const [destinationFilter, setDestinationFilter] = useState("all");

  // Danh sách các thẻ KPI chính
  const kpiStats = [
    {
      id: "visitors",
      title: "Lượt khách Check-in",
      value: "148,620",
      subValue: "Hôm nay: 4,890 lượt",
      change: "+18.4%",
      isPositive: true,
      icon: Users,
      color: "emerald",
      bgLight: "bg-emerald-50",
      textColor: "text-emerald-700",
      borderColor: "border-emerald-200/80",
    },
    {
      id: "destinations",
      title: "Điểm đến Di tích Quản lý",
      value: "8 / 9",
      subValue: "8 mở cửa • 1 đang tôn tạo",
      change: "100% GPS & QR",
      isPositive: true,
      icon: MapPin,
      color: "sky",
      bgLight: "bg-sky-50",
      textColor: "text-sky-700",
      borderColor: "border-sky-200/80",
    },
    {
      id: "revenue",
      title: "Doanh thu Vé & Trải nghiệm AR",
      value: "452,800,000 ₫",
      subValue: "Vé điện tử: 385tr • AR: 67.8tr",
      change: "+24.5%",
      isPositive: true,
      icon: Coins,
      color: "amber",
      bgLight: "bg-amber-50",
      textColor: "text-amber-700",
      borderColor: "border-amber-200/80",
    },
    {
      id: "missions",
      title: "Nhiệm vụ & Quiz Di sản",
      value: "9,840",
      subValue: "Tỷ lệ trả lời đúng: 92.4%",
      change: "+12.1%",
      isPositive: true,
      icon: Trophy,
      color: "violet",
      bgLight: "bg-violet-50",
      textColor: "text-violet-700",
      borderColor: "border-violet-200/80",
    },
  ];

  // Danh sách điểm đến thuộc BQL Di tích Văn Miếu
  const managedDestinations = [
    {
      id: "dest-1",
      name: "Khuê Văn Các",
      tag: "Biểu tượng Thủ đô",
      location: "Khu vườn bia thứ 2",
      image: "/image/vanmieu.png",
      checkinsToday: 1840,
      audioLanguages: 6,
      rating: 4.9,
      status: "published", // 'published' | 'pending' | 'maintenance'
      statusLabel: "Đang hoạt động",
    },
    {
      id: "dest-2",
      name: "Giếng Thiên Quang & 82 Bia Tiến Sĩ",
      tag: "Di sản Ký ức Thế giới UNESCO",
      location: "Khu vườn bia thứ 3",
      image: "/image/thanglong.png",
      checkinsToday: 1420,
      audioLanguages: 8,
      rating: 5.0,
      status: "published",
      statusLabel: "Đang hoạt động",
    },
    {
      id: "dest-3",
      name: "Nhà Thái Học (Quốc Tử Giám)",
      tag: "Trường Đại học đầu tiên VN",
      location: "Khu di tích thứ 5",
      image: "/image/baotang.png",
      checkinsToday: 950,
      audioLanguages: 5,
      rating: 4.8,
      status: "published",
      statusLabel: "Đang hoạt động",
    },
    {
      id: "dest-4",
      name: "Cổng Đại Thành & Điện Đại Bái",
      tag: "Nơi thờ Khổng Tử & Chu Văn An",
      location: "Khu di tích thứ 4",
      image: "/image/gomsu.png",
      checkinsToday: 680,
      audioLanguages: 4,
      rating: 4.8,
      status: "pending",
      statusLabel: "Đang duyệt thuyết minh",
    },
  ];

  // Lọc điểm đến theo tab
  const filteredDestinations = managedDestinations.filter((dest) => {
    if (destinationFilter === "published") return dest.status === "published";
    if (destinationFilter === "pending") return dest.status === "pending";
    return true;
  });

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* ══════════════════════════════════════════════════════════
          HERO BANNER CHÀO MỪNG BQL ĐỐI TÁC
      ══════════════════════════════════════════════════════════ */}
      <div className="relative rounded-3xl bg-gradient-to-r from-emerald-800 via-teal-800 to-sky-900 text-white p-6 sm:p-8 overflow-hidden shadow-lg shadow-emerald-950/10">
        {/* Họa tiết ánh sáng vàng di sản */}
        <div className="absolute -right-10 -top-10 w-60 h-60 bg-amber-400/15 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -left-10 -bottom-10 w-60 h-60 bg-emerald-400/15 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-2.5">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/30 border border-emerald-300/30 text-emerald-200 text-xs font-bold uppercase tracking-wider">
                Trung tâm Quản trị Đối tác
              </span>
              <span className="text-xs text-slate-300">• Hà Nội, Việt Nam</span>
            </div>

            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight leading-snug">
              BQL Di tích Văn Miếu - Quốc Tử Giám
            </h1>

            <p className="mt-2 text-xs sm:text-sm text-slate-200 font-light leading-relaxed">
              Theo dõi thời gian thực lưu lượng du khách check-in, hiệu quả kinh doanh vé điện tử và chất lượng bài thuyết minh đa ngôn ngữ.
            </p>
          </div>

          {/* Bộ lọc phạm vi thời gian */}
          <div className="flex items-center gap-1.5 bg-black/25 backdrop-blur-md p-1.5 rounded-2xl border border-white/15 self-start md:self-auto">
            <button
              type="button"
              onClick={() => setTimeRange("today")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                timeRange === "today"
                  ? "bg-white text-emerald-950 shadow-xs"
                  : "text-white/80 hover:text-white"
              }`}
            >
              Hôm nay
            </button>
            <button
              type="button"
              onClick={() => setTimeRange("week")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                timeRange === "week"
                  ? "bg-white text-emerald-950 shadow-xs"
                  : "text-white/80 hover:text-white"
              }`}
            >
              7 ngày
            </button>
            <button
              type="button"
              onClick={() => setTimeRange("month")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                timeRange === "month"
                  ? "bg-white text-emerald-950 shadow-xs"
                  : "text-white/80 hover:text-white"
              }`}
            >
              Tháng này
            </button>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          CÁC THẺ CHỈ SỐ KPI TỔNG QUAN (4 KPI CARDS)
      ══════════════════════════════════════════════════════════ */}
      <section aria-label="Thống kê chỉ số KPI">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {kpiStats.map((kpi) => {
            const Icon = kpi.icon;

            return (
              <div
                key={kpi.id}
                className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all group"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div
                    className={`w-11 h-11 rounded-xl ${kpi.bgLight} ${kpi.textColor} border ${kpi.borderColor} flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform`}
                  >
                    <Icon size={22} />
                  </div>

                  {/* Badge tăng trưởng */}
                  <span
                    className={`inline-flex items-center gap-0.5 text-xs font-bold px-2 py-0.5 rounded-full ${
                      kpi.isPositive
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                        : "bg-rose-50 text-rose-700 border border-rose-200/60"
                    }`}
                  >
                    {kpi.isPositive ? (
                      <ArrowUpRight size={13} />
                    ) : (
                      <ArrowDownRight size={13} />
                    )}
                    <span>{kpi.change}</span>
                  </span>
                </div>

                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  {kpi.title}
                </p>

                <p className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
                  {kpi.value}
                </p>

                <p className="text-[11px] text-slate-400 font-medium mt-1 truncate">
                  {kpi.subValue}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          DANH SÁCH ĐIỂM ĐẾN DI TÍCH ĐANG QUẢN LÝ
      ══════════════════════════════════════════════════════════ */}
      <section
        id="destinations"
        className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-xs"
        aria-label="Quản lý Điểm đến"
      >
        {/* Header danh sách & Bộ lọc tab */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-4 bg-emerald-600 rounded-full" />
              <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                Danh sách Điểm đến Di tích trực thuộc
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Quản lý tọa độ check-in, nội dung thuyết minh âm thanh đa ngữ và đánh giá du khách.
            </p>
          </div>

          {/* Bộ lọc tab */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl self-start sm:self-auto text-xs font-bold">
            <button
              type="button"
              onClick={() => setDestinationFilter("all")}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                destinationFilter === "all"
                  ? "bg-white text-slate-900 shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Tất cả (4)
            </button>
            <button
              type="button"
              onClick={() => setDestinationFilter("published")}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                destinationFilter === "published"
                  ? "bg-white text-emerald-800 shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Đang hoạt động (3)
            </button>
            <button
              type="button"
              onClick={() => setDestinationFilter("pending")}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                destinationFilter === "pending"
                  ? "bg-white text-amber-800 shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Chờ duyệt (1)
            </button>
          </div>
        </div>

        {/* Bảng dữ liệu điểm đến */}
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold uppercase text-slate-400 tracking-wider">
                <th className="py-3 px-3">Tên Điểm đến Di tích</th>
                <th className="py-3 px-3">Lượt Check-in hôm nay</th>
                <th className="py-3 px-3">Đánh giá</th>
                <th className="py-3 px-3">Trạng thái</th>
                <th className="py-3 px-3 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredDestinations.map((dest) => (
                <tr key={dest.id} className="hover:bg-slate-50/80 transition-colors group">
                  {/* Cột 1: Tên & Ảnh */}
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={dest.image}
                        alt={dest.name}
                        className="w-11 h-11 rounded-xl object-cover border border-slate-200 flex-shrink-0"
                        onError={(e) => {
                          e.currentTarget.src = "/image/vanmieu.png";
                        }}
                      />
                      <div>
                        <p className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-emerald-700 transition-colors">
                          {dest.name}
                        </p>
                        <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                          <MapPin size={11} className="text-emerald-600" />
                          <span>{dest.location}</span>
                          <span>•</span>
                          <span className="text-emerald-700 font-medium">{dest.tag}</span>
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Cột 2: Lượt Check-in */}
                  <td className="py-3 px-3 font-semibold text-slate-700">
                    <div className="flex items-center gap-1.5">
                      <QrCode size={14} className="text-slate-400" />
                      <span>{dest.checkinsToday.toLocaleString()} lượt</span>
                    </div>
                  </td>

                  {/* Cột 3: Đánh giá sao */}
                  <td className="py-3 px-3 font-bold text-slate-800">
                    <span className="text-amber-500">★</span> {dest.rating} / 5.0
                  </td>

                  {/* Cột 5: Trạng thái */}
                  <td className="py-3 px-3">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                        dest.status === "published"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200/80"
                          : "bg-amber-50 text-amber-700 border border-amber-200/80"
                      }`}
                    >
                      {dest.status === "published" ? (
                        <CheckCircle2 size={12} />
                      ) : (
                        <Clock size={12} />
                      )}
                      <span>{dest.statusLabel}</span>
                    </span>
                  </td>

                  {/* Cột 6: Nút thao tác */}
                  <td className="py-3 px-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors cursor-pointer"
                        title="Chỉnh sửa nội dung"
                      >
                        <Edit3 size={15} />
                      </button>
                      <Link
                        href="/"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-sky-600 hover:bg-sky-50 transition-colors cursor-pointer"
                        title="Xem trang công khai"
                      >
                        <Eye size={15} />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          2 CỘT PHỤ: LỘ TRÌNH VĂN HÓA & TRẠNG THÁI DUYỆT NỘI DUNG
      ══════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Cột Trái (7/12): Lộ trình văn hóa & Nhiệm vụ Quiz */}
        <section
          id="routes"
          className="lg:col-span-7 bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-xs space-y-4"
          aria-label="Lộ trình văn hóa"
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-4 bg-sky-600 rounded-full" />
              <h2 className="text-base font-black text-slate-900 tracking-tight">
                Lộ trình Văn hóa Đang Kích Hoạt
              </h2>
            </div>
            <span className="text-xs font-bold text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200/60">
              3 Tour chuyên đề
            </span>
          </div>

          {/* Card Tour 1 */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start justify-between gap-4 hover:bg-slate-100/60 transition-colors">
            <div className="flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center flex-shrink-0 font-bold shadow-2xs">
                <Compass size={24} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Hành trình Đạo học Thăng Long - Ngàn năm văn hiến
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Đi qua 4 trạm di tích chính • Thời lượng: 90 phút • Điểm thưởng: +120 pts
                </p>
                <div className="flex items-center gap-2 mt-2 text-[11px]">
                  <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">
                    Đã duyệt xuất bản
                  </span>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-600 font-medium">3,420 du khách đã hoàn thành</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card Tour 2 (Nhiệm vụ Quiz) */}
          <div
            id="missions"
            className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start justify-between gap-4 hover:bg-slate-100/60 transition-colors"
          >
            <div className="flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-violet-100 text-violet-700 flex items-center justify-center flex-shrink-0 font-bold shadow-2xs">
                <Trophy size={24} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Nhiệm vụ Quiz: Giải mã 82 Bia Tiến Sĩ Triều Lê - Mạc
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Bộ 5 câu hỏi lịch sử tương tác tại chỗ bằng mã QR định vị GPS
                </p>
                <div className="flex items-center gap-2 mt-2 text-[11px]">
                  <span className="font-semibold text-violet-700 bg-violet-50 px-2 py-0.5 rounded-md border border-violet-200/60">
                    Thử thách hoạt động
                  </span>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-600 font-medium">Tỷ lệ đúng 94%</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cột Phải (5/12): Hộp thư Thông báo duyệt nội dung & Trợ giúp */}
        <section
          id="reviews"
          className="lg:col-span-5 bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-xs space-y-4"
          aria-label="Kiểm duyệt & Hỗ trợ"
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-4 bg-amber-500 rounded-full" />
              <h2 className="text-base font-black text-slate-900 tracking-tight">
                Tiến độ Kiểm duyệt Nội dung
              </h2>
            </div>
            <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200/60">
              Hội đồng VietCulture
            </span>
          </div>

          <div className="space-y-3 text-xs">
            {/* Mục 1 */}
            <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 flex items-start gap-3">
              <CheckCircle2 size={18} className="text-emerald-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-bold text-slate-900">
                  Bản đồ tương tác 3D Văn Miếu đã phê duyệt
                </p>
                <p className="text-[11px] text-slate-600 mt-0.5">
                  Tọa độ định vị các bia rùa và chốt check-in AR đã sẵn sàng cho du khách trải nghiệm.
                </p>
                <span className="text-[10px] text-emerald-700 font-semibold mt-1 inline-block">
                  Hôm nay lúc 08:30
                </span>
              </div>
            </div>

            {/* Mục 2 */}
            <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200/80 flex items-start gap-3">
              <Clock size={18} className="text-amber-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-bold text-slate-900">
                  Yêu cầu cập nhật file âm thanh tiếng Nhật
                </p>
                <p className="text-[11px] text-slate-600 mt-0.5">
                  Ban Thẩm định đề nghị chuẩn hóa lại giọng đọc giới thiệu bia Tiến sĩ Nguyễn Trực.
                </p>
                <span className="text-[10px] text-amber-700 font-semibold mt-1 inline-block">
                  Hôm qua lúc 15:45
                </span>
              </div>
            </div>

            {/* Khối trợ giúp kỹ thuật */}
            <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-800 text-xs">Cần hỗ trợ số hóa di tích?</p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Đội ngũ kỹ thuật VietCulture sẵn sàng hỗ trợ 24/7.
                </p>
              </div>
              <a
                href="tel:19006888"
                className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors flex-shrink-0"
              >
                1900 6888
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
