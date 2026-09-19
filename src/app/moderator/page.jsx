"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Clock,
  CheckCircle2,
  AlertTriangle,
  ShieldAlert,
  ShieldCheck,
  Search,
  ArrowUpRight,
  MapPin,
  Compass,
  HelpCircle,
  Bot,
  Building2,
  ChevronRight,
  Sparkles,
} from "lucide-react";

/**
 * Trang Bảng Điều Khiển Ban Kiểm Định & Chuẩn Hóa Di Sản (Content Moderator Dashboard)
 * Đường dẫn: /moderator
 */
export default function ModeratorDashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Dữ liệu 4 thẻ KPI kiểm duyệt bám sát thiết kế
  const kpiStats = [
    {
      id: "pending",
      title: "Hồ sơ chờ phê duyệt",
      count: "20",
      unit: "mục",
      trend: "16 hồ sơ gửi đến sáng nay",
      icon: Clock,
      iconWrapper: "bg-amber-50 text-amber-600 p-2.5 rounded-2xl",
      trendColor: "text-slate-400",
      linkText: "Chi tiết →",
      linkHref: "/moderator#queue",
    },
    {
      id: "published",
      title: "Đã xuất bản hôm nay",
      count: "34",
      unit: "mục",
      trend: "Chuẩn hóa dữ liệu 100%",
      icon: CheckCircle2,
      iconWrapper: "bg-emerald-50 text-emerald-600 p-2.5 rounded-2xl",
      trendColor: "text-slate-400",
      linkText: "Chi tiết →",
      linkHref: "/moderator/history",
    },
    {
      id: "revision",
      title: "Yêu cầu hiệu đính / Từ chối",
      count: "4",
      unit: "mục",
      trend: "Đính chính niên đại & GPS",
      icon: AlertTriangle,
      iconWrapper: "bg-rose-50 text-rose-500 p-2.5 rounded-2xl",
      trendColor: "text-slate-400",
      linkText: "Chi tiết →",
      linkHref: "/moderator#queue",
    },
    {
      id: "alerts",
      title: "Cảnh báo phản cảm / Sai sự thật",
      count: "2",
      unit: "cảnh báo",
      trend: "Cần thẩm định khẩn cấp",
      icon: ShieldAlert,
      iconWrapper: "bg-purple-50 text-purple-600 p-2.5 rounded-2xl",
      trendColor: "text-rose-500 font-semibold",
      linkText: "Chi tiết →",
      linkHref: "/moderator/ai-monitor",
    },
  ];

  // Dữ liệu 4 hồ sơ cần xử lý gấp nhất theo mô tả chi tiết
  const queueData = [
    {
      id: "HS-2026-089",
      code: "#HS-2026-089",
      title: "Khuê Văn Các & Giếng Thiên Quang",
      type: "destination",
      typeLabel: "Điểm đến & GPS",
      sender: "BQL Di tích Văn Miếu - Quốc Tử Giám",
      submittedTime: "15 phút trước",
      urgency: "urgent", // Khẩn cấp (badge đỏ)
      urgencyLabel: "Khẩn cấp",
      actionText: "Thẩm định ngay",
      actionHref: "/moderator/destinations/HS-2026-089",
      actionStyle: "bg-teal-600 hover:bg-teal-700 text-white",
    },
    {
      id: "HS-2026-088",
      code: "#HS-2026-088",
      title: "Lộ trình: Theo Dấu Chân Nghệ Nhân Gốm",
      type: "route",
      typeLabel: "Lộ trình & Vé",
      sender: "HTX Gốm Cổ Bát Tràng",
      submittedTime: "42 phút trước",
      urgency: "standard", // Tiêu chuẩn
      urgencyLabel: "Tiêu chuẩn",
      actionText: "Thẩm định ngay",
      actionHref: "/moderator/review/HS-2026-088",
      actionStyle: "bg-teal-600 hover:bg-teal-700 text-white",
    },
    {
      id: "HS-2026-087",
      code: "#HS-2026-087",
      title: "Bộ câu hỏi Quiz: Bia Tiến Sĩ Số 3",
      type: "quiz",
      typeLabel: "Gamification Quiz",
      sender: "BQL Văn Miếu",
      submittedTime: "1 giờ trước",
      urgency: "urgent", // Khẩn cấp (badge đỏ)
      urgencyLabel: "Khẩn cấp",
      actionText: "Thẩm định ngay",
      actionHref: "/moderator/review/HS-2026-087",
      actionStyle: "bg-teal-600 hover:bg-teal-700 text-white",
    },
    {
      id: "HS-2026-086",
      code: "#HS-2026-086",
      title: "Câu trả lời AI: Sự tích Rùa Vàng Hoàn Kiếm",
      type: "ai",
      typeLabel: "Kiểm tra AI",
      sender: "Hệ thống AI Guard",
      submittedTime: "2 giờ trước",
      urgency: "warning", // Cảnh báo sai lệch
      urgencyLabel: "Cảnh báo sai lệch",
      actionText: "Hiệu đính ngay",
      actionHref: "/moderator/review/HS-2026-086",
      actionStyle: "bg-purple-600 hover:bg-purple-700 text-white",
    },
  ];

  // Lọc dữ liệu theo từ khóa tìm kiếm và loại hình
  const filteredQueue = queueData.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.code.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType =
      categoryFilter === "all" || item.type === categoryFilter;

    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-200">
      {/* ────────────────────────────────────────────────────────
          1. HERO BANNER BAN KIỂM ĐỊNH (Chiếm trọn bề ngang, rounded-3xl)
      ──────────────────────────────────────────────────────── */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 text-white rounded-3xl p-6 sm:p-7 relative overflow-hidden shadow-sm">
        {/* Watermark đồ họa chìm chiếc khiên bảo mật to bản ở góc phải */}
        <ShieldCheck
          size={192}
          strokeWidth={1}
          className="stroke-white/10 w-48 h-48 absolute -right-6 -bottom-6 pointer-events-none"
        />

        <div className="relative z-10 max-w-3xl">
          {/* Tag nhỏ viền mỏng phía trên */}
          <div className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs text-emerald-200 inline-flex items-center gap-1.5 mb-3 border border-white/10">
            <span>🛡️ Ban Kiểm Định & Chuẩn Hóa Di Sản Quốc Gia</span>
          </div>

          {/* Tiêu đề chính lớn */}
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight leading-snug">
            Trung tâm Thẩm định & Chuẩn hóa Dữ liệu Văn hóa
          </h1>

          {/* Đoạn mô tả */}
          <p className="mt-2 text-xs sm:text-sm text-slate-200 font-normal leading-relaxed">
            Đảm bảo 100% dữ liệu lịch sử, tọa độ GPS thực địa và nội dung AI đạt chuẩn mực văn hóa Việt Nam trước khi tiếp cận du khách.
          </p>

          {/* Hàng thông số vận hành ở chân banner */}
          <div className="mt-5 pt-4 border-t border-white/15 flex flex-wrap items-center">
            <span className="text-emerald-300 text-xs font-medium flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Hệ thống AI Guard Audit: Sẵn sàng
            </span>
            <span className="text-slate-300 text-xs font-medium ml-6 flex items-center gap-1.5">
              <span>⏱</span>
              Thời gian xử lý trung bình: &lt; 2 giờ
            </span>
          </div>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────
          2. HÀNG 4 THẺ KPI KIỂM DUYỆT (Lưới 4 cột grid-cols-1 md:grid-cols-2 lg:grid-cols-4)
      ──────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {kpiStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.id}
              className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:border-teal-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between">
                  <p className="text-xs font-bold text-slate-500 leading-tight">
                    {stat.title}
                  </p>
                  <div className={stat.iconWrapper}>
                    <Icon size={20} />
                  </div>
                </div>

                <div className="flex items-baseline gap-1.5 mt-2.5">
                  <span className="text-3xl font-black text-slate-800 tracking-tight">
                    {stat.count}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">
                    {stat.unit}
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className={stat.trendColor}>{stat.trend}</span>
                <Link
                  href={stat.linkHref}
                  className="text-teal-600 text-xs font-bold hover:text-teal-700 transition-colors inline-flex items-center"
                >
                  {stat.linkText}
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* ────────────────────────────────────────────────────────
          3. KHỐI DANH SÁCH HÀNG CHỜ ƯU TIÊN (Priority Queue Table)
      ──────────────────────────────────────────────────────── */}
      <div
        id="queue"
        className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden mt-6"
      >
        {/* Header khối */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
          {/* Bên trái: Tiêu đề + Badge cam + Dòng chữ mờ */}
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-black text-slate-900">
                Danh sách Hàng chờ Ưu tiên
              </h2>
              <span className="bg-amber-100 text-amber-800 text-xs px-2.5 py-0.5 rounded-full font-bold border border-amber-200">
                4 hồ sơ cần duyệt
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              4 hồ sơ quan trọng cần thẩm định gấp để đồng bộ lên ứng dụng di tích
            </p>
          </div>

          {/* Bên phải: Ô tìm kiếm + Dropdown lọc */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Search size={14} />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm tên nội dung, đơn vị gửi..."
                className="pl-8.5 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 w-52 sm:w-60"
              />
            </div>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
            >
              <option value="all">Tất cả loại hình</option>
              <option value="destination">Điểm đến & GPS</option>
              <option value="route">Lộ trình & Vé</option>
              <option value="quiz">Gamification Quiz</option>
              <option value="ai">Kiểm tra AI</option>
            </select>
          </div>
        </div>

        {/* Bảng dữ liệu (Table) với các cột đúng chuẩn mẫu */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold uppercase text-slate-500 tracking-wider">
                <th className="py-3.5 px-5">MÃ HỒ SƠ</th>
                <th className="py-3.5 px-4">TÊN NỘI DUNG</th>
                <th className="py-3.5 px-4">LOẠI NỘI DUNG</th>
                <th className="py-3.5 px-4">NGƯỜI GỬI / ĐƠN VỊ CUNG CẤP</th>
                <th className="py-3.5 px-4">THỜI GIAN GỬI</th>
                <th className="py-3.5 px-4">MỨC ĐỘ</th>
                <th className="py-3.5 px-5 text-right">THAO TÁC NHANH</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredQueue.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    <p className="text-sm font-semibold">Không tìm thấy hồ sơ phù hợp.</p>
                    <p className="text-xs mt-1">Hãy thử xóa từ khóa tìm kiếm.</p>
                  </td>
                </tr>
              ) : (
                filteredQueue.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50/70 transition-colors group"
                  >
                    {/* Cột 1: MÃ HỒ SƠ */}
                    <td className="py-3.5 px-5 font-mono font-bold text-slate-800 text-xs whitespace-nowrap">
                      <span className="px-2 py-1 bg-slate-100 rounded-md border border-slate-200">
                        {item.code}
                      </span>
                    </td>

                    {/* Cột 2: TÊN NỘI DUNG */}
                    <td className="py-3.5 px-4 max-w-xs sm:max-w-sm">
                      <p className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-teal-700 transition-colors">
                        {item.title}
                      </p>
                    </td>

                    {/* Cột 3: LOẠI NỘI DUNG */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                          item.type === "destination"
                            ? "bg-sky-50 text-sky-800 border-sky-200"
                            : item.type === "route"
                            ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                            : item.type === "quiz"
                            ? "bg-amber-50 text-amber-800 border-amber-200"
                            : "bg-purple-50 text-purple-800 border-purple-200"
                        }`}
                      >
                        {item.type === "destination" && <MapPin size={11} />}
                        {item.type === "route" && <Compass size={11} />}
                        {item.type === "quiz" && <HelpCircle size={11} />}
                        {item.type === "ai" && <Bot size={11} />}
                        <span>{item.typeLabel}</span>
                      </span>
                    </td>

                    {/* Cột 4: NGƯỜI GỬI / ĐƠN VỊ CUNG CẤP */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
                        <Building2 size={13} className="text-slate-400 flex-shrink-0" />
                        <span>{item.sender}</span>
                      </div>
                    </td>

                    {/* Cột 5: THỜI GIAN GỬI */}
                    <td className="py-3.5 px-4 text-slate-500 text-[11px] whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <Clock size={12} className="text-amber-500 flex-shrink-0" />
                        <span>{item.submittedTime}</span>
                      </div>
                    </td>

                    {/* Cột 6: MỨC ĐỘ */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {item.urgency === "urgent" ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10.5px] font-black bg-rose-50 text-rose-700 border border-rose-200 animate-pulse">
                          <span>{item.urgencyLabel}</span>
                        </span>
                      ) : item.urgency === "warning" ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10.5px] font-black bg-purple-50 text-purple-700 border border-purple-200">
                          <span>{item.urgencyLabel}</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-slate-100 text-slate-600 border border-slate-200">
                          <span>{item.urgencyLabel}</span>
                        </span>
                      )}
                    </td>

                    {/* Cột 7: THAO TÁC NHANH */}
                    <td className="py-3.5 px-5 text-right whitespace-nowrap">
                      <Link
                        href={item.actionHref}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs shadow-xs transition-all cursor-pointer ${item.actionStyle}`}
                      >
                        <span>{item.actionText}</span>
                        <ArrowUpRight size={14} />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Chân bảng */}
        <div className="p-4 bg-slate-50/75 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500">
          <span>
            Đang hiển thị {filteredQueue.length} hồ sơ ưu tiên xử lý khẩn cấp
          </span>
          <Link
            href="/moderator/destinations/HS-2026-089"
            className="font-bold text-teal-700 hover:text-teal-800 inline-flex items-center gap-1 transition-colors"
          >
            <span>Mở hồ sơ kiểm chuẩn trọng điểm</span>
            <ChevronRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
