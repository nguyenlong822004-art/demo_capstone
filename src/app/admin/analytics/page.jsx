"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  BarChart3,
  TrendingUp,
  Wallet,
  Ticket,
  PieChart,
  Download,
  Calendar,
  Filter,
  ArrowUpRight,
  Sparkles,
  Building2,
  Star,
  CheckCircle2,
  ChevronDown,
  Layers,
  MapPin,
  Landmark,
  Compass,
  FileText,
} from "lucide-react";

/**
 * Trang Báo Cáo Doanh Thu & Phân Tích Tăng Trưởng Toàn Sàn (Analytics Dashboard)
 * Đường dẫn: /admin/analytics
 */
export default function AdminAnalyticsPage() {
  // State Bộ lọc thời gian & vùng miền
  const [timeRange, setTimeRange] = useState("30days"); // '7days' | '30days' | 'quarter' | 'year'
  const [selectedRegion, setSelectedRegion] = useState("all"); // 'all' | 'north' | 'central' | 'south'
  const [activeChartMetric, setActiveChartMetric] = useState("gmv"); // 'gmv' | 'checkins'

  // State Toast
  const [toastMsg, setToastMsg] = useState("");

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3500);
  };

  // Dữ liệu biểu đồ tăng trưởng 9 tháng (Tháng 1 đến Tháng 9/2026)
  const monthlyData = [
    { month: "T1", gmv: 850, checkins: 4200, label: "850 Tr" },
    { month: "T2", gmv: 1100, checkins: 5800, label: "1.10 Tỷ" },
    { month: "T3", gmv: 1350, checkins: 7200, label: "1.35 Tỷ" },
    { month: "T4", gmv: 1600, checkins: 9100, label: "1.60 Tỷ" },
    { month: "T5", gmv: 1800, checkins: 11200, label: "1.80 Tỷ" },
    { month: "T6", gmv: 1950, checkins: 12500, label: "1.95 Tỷ" },
    { month: "T7", gmv: 2100, checkins: 13800, label: "2.10 Tỷ" },
    { month: "T8", gmv: 2300, checkins: 15200, label: "2.30 Tỷ" },
    { month: "T9", gmv: 2450, checkins: 16800, label: "2.45 Tỷ", isCurrent: true },
  ];

  const maxGMV = 2600; // Ngưỡng trần để tính chiều cao thanh biểu đồ

  // Top 5 Content Provider có doanh thu cao nhất
  const topPartners = [
    {
      rank: 1,
      badgeColor: "bg-amber-400 text-slate-950 font-black",
      name: "BQL Di tích Văn Miếu - Quốc Tử Giám",
      location: "Hà Nội",
      avatarLetter: "VM",
      ticketsSold: "4,850",
      gmv: "790.000.000 đ",
      commission: "79.000.000 đ",
      rating: 4.95,
      reviewsCount: 1420,
    },
    {
      rank: 2,
      badgeColor: "bg-slate-300 text-slate-900 font-black",
      name: "BQL Quần Thể Danh Thắng Tràng An",
      location: "Ninh Bình",
      avatarLetter: "TA",
      ticketsSold: "3,920",
      gmv: "680.000.000 đ",
      commission: "68.000.000 đ",
      rating: 4.92,
      reviewsCount: 1180,
    },
    {
      rank: 3,
      badgeColor: "bg-amber-700 text-white font-black",
      name: "BQL Hoàng Thành Thăng Long",
      location: "Hà Nội",
      avatarLetter: "HT",
      ticketsSold: "2,750",
      gmv: "440.000.000 đ",
      commission: "44.000.000 đ",
      rating: 4.88,
      reviewsCount: 890,
    },
    {
      rank: 4,
      badgeColor: "bg-slate-100 text-slate-600 font-bold",
      name: "HTX Gốm Sứ Làng Cổ Bát Tràng",
      location: "Hà Nội",
      avatarLetter: "BT",
      ticketsSold: "1,980",
      gmv: "320.000.000 đ",
      commission: "32.000.000 đ",
      rating: 4.86,
      reviewsCount: 740,
    },
    {
      rank: 5,
      badgeColor: "bg-slate-100 text-slate-600 font-bold",
      name: "Trung Tâm Bảo Tồn Di Tích Cố Đô Huế",
      location: "Thừa Thiên Huế",
      avatarLetter: "CH",
      ticketsSold: "1,320",
      gmv: "220.000.000 đ",
      commission: "22.000.000 đ",
      rating: 4.90,
      reviewsCount: 580,
    },
  ];

  // Xuất file Báo cáo tài chính
  const handleExport = (format) => {
    showToast(
      `Đang khởi tạo tệp Báo cáo Tăng trưởng & Doanh thu Di sản (${format.toUpperCase()})... Tệp sẽ được tải xuống tự động.`
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-200">
      {/* Toast thông báo */}
      {toastMsg && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl border border-slate-700 text-xs font-bold flex items-center gap-2.5 animate-in slide-in-from-top-3 max-w-md">
          <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* ────────────────────────────────────────────────────────
          1. HEADER & BỘ LỌC THỜI GIAN (ANALYTICS HEADER)
      ──────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-600" />
              <span className="text-[11px] font-black uppercase tracking-wider text-teal-700">
                Thống Kê Kinh Doanh & Tăng Trưởng
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Báo Cáo Doanh Thu & Phân Tích Tăng Trưởng Toàn Sàn
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-3xl">
              Tổng hợp chỉ số tài chính, tốc độ tăng trưởng người dùng và hiệu quả kinh doanh của các lộ trình trải nghiệm di sản có thu phí trên toàn quốc.
            </p>
          </div>

          {/* Cụm nút xuất báo cáo */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              type="button"
              onClick={() => handleExport("Excel")}
              className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download size={14} />
              <span>Xuất Excel</span>
            </button>
            <button
              type="button"
              onClick={() => handleExport("PDF")}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
            >
              <FileText size={14} />
              <span>Xuất Báo Cáo PDF</span>
            </button>
          </div>
        </div>

        {/* Bộ chọn khoảng ngày & Dropdown lọc vùng miền */}
        <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* 4 Mốc thời gian */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl text-xs font-bold text-slate-600">
            <button
              type="button"
              onClick={() => setTimeRange("7days")}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                timeRange === "7days"
                  ? "bg-white text-slate-900 shadow-2xs"
                  : "hover:text-slate-900"
              }`}
            >
              7 ngày qua
            </button>
            <button
              type="button"
              onClick={() => setTimeRange("30days")}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                timeRange === "30days"
                  ? "bg-white text-slate-900 shadow-2xs"
                  : "hover:text-slate-900"
              }`}
            >
              30 ngày qua
            </button>
            <button
              type="button"
              onClick={() => setTimeRange("quarter")}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                timeRange === "quarter"
                  ? "bg-white text-slate-900 shadow-2xs"
                  : "hover:text-slate-900"
              }`}
            >
              Quý này (Q3/2026)
            </button>
            <button
              type="button"
              onClick={() => setTimeRange("year")}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                timeRange === "year"
                  ? "bg-white text-slate-900 shadow-2xs"
                  : "hover:text-slate-900"
              }`}
            >
              Năm nay (2026)
            </button>
          </div>

          {/* Dropdown Vùng miền */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-semibold hidden sm:inline-block">
              Lọc theo:
            </span>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
            >
              <option value="all">Tất cả vùng miền (Toàn quốc)</option>
              <option value="north">Miền Bắc (48% thị phần)</option>
              <option value="central">Miền Trung (32% thị phần)</option>
              <option value="south">Miền Nam (20% thị phần)</option>
            </select>
          </div>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────
          2. LƯỚI 4 THẺ CHỈ SỐ TÀI CHÍNH & TĂNG TRƯỞNG (KPI CARDS)
      ──────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Thẻ 1: Tổng Giá Trị Giao Dịch (GMV) */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Tổng Giá Trị Giao Dịch (GMV)
              </p>
              <div className="p-2.5 rounded-xl border bg-emerald-50 text-emerald-600 border-emerald-200">
                <TrendingUp size={20} />
              </div>
            </div>
            <div className="mt-2.5">
              <p className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                2.450.000.000 <span className="text-sm font-bold text-slate-400">đ</span>
              </p>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
              ↑ +18.4%
            </span>
            <span className="text-slate-400">so với tháng trước</span>
          </div>
        </div>

        {/* Thẻ 2: Doanh Thu Sàn Thực Nhận (Net Revenue 10%) */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Doanh Thu Sàn Thực Nhận (10%)
              </p>
              <div className="p-2.5 rounded-xl border bg-sky-50 text-sky-600 border-sky-200">
                <Wallet size={20} />
              </div>
            </div>
            <div className="mt-2.5">
              <p className="text-2xl sm:text-3xl font-black text-sky-800 tracking-tight">
                245.000.000 <span className="text-sm font-bold text-sky-400">đ</span>
              </p>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-[11px] font-bold text-sky-700 bg-sky-50 border border-sky-200 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
              ↑ +15.2%
            </span>
            <span className="text-slate-400">lợi nhuận ròng sàn</span>
          </div>
        </div>

        {/* Thẻ 3: Vé & Lộ Trình Đã Bán */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Vé & Lộ Trình Đã Bán
              </p>
              <div className="p-2.5 rounded-xl border bg-purple-50 text-purple-600 border-purple-200">
                <Ticket size={20} />
              </div>
            </div>
            <div className="mt-2.5">
              <p className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                14,820 <span className="text-sm font-bold text-slate-400">vé</span>
              </p>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-[11px] font-bold text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
              ↑ +12.6%
            </span>
            <span className="text-slate-400">85 đối tác phát hành</span>
          </div>
        </div>

        {/* Thẻ 4: Tỷ Lệ Chuyển Đổi Mua Trải Nghiệm */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Tỷ Lệ Chuyển Đổi Mua Trải Nghiệm
              </p>
              <div className="p-2.5 rounded-xl border bg-amber-50 text-amber-600 border-amber-200">
                <PieChart size={20} />
              </div>
            </div>
            <div className="mt-2.5">
              <p className="text-2xl sm:text-3xl font-black text-amber-700 tracking-tight">
                4.8% <span className="text-sm font-bold text-amber-400">/ lượt xem</span>
              </p>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-[11px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
              ↑ +0.6%
            </span>
            <span className="text-slate-400">vượt kỳ vọng SLA</span>
          </div>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────
          3. KHU VỰC BIỂU ĐỒ PHÂN TÍCH TRỰC QUAN (SPLIT SECTION)
      ──────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* CỘT TRÁI (7/12): Biểu đồ Tăng trưởng Doanh thu & Lượt Check-in (12 Tháng) */}
        <div className="lg:col-span-7 min-w-0 overflow-hidden bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <BarChart3 size={16} className="text-teal-600" />
                <span>Biểu Đồ Tăng Trưởng Doanh Thu Toàn Sàn (2026)</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Dòng tiền GMV tăng đều đặn từ Tháng 1 đến Tháng 9/2026
              </p>
            </div>

            {/* Toggle metric */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl text-xs font-bold text-slate-600">
              <button
                type="button"
                onClick={() => setActiveChartMetric("gmv")}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  activeChartMetric === "gmv"
                    ? "bg-white text-teal-800 shadow-2xs"
                    : "hover:text-slate-900"
                }`}
              >
                Doanh thu (GMV)
              </button>
              <button
                type="button"
                onClick={() => setActiveChartMetric("checkins")}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  activeChartMetric === "checkins"
                    ? "bg-white text-teal-800 shadow-2xs"
                    : "hover:text-slate-900"
                }`}
              >
                Lượt Check-in
              </button>
            </div>
          </div>

          {/* Khung vẽ biểu đồ dạng hệ lưới 9 cột tự co giãn đều, không tràn khung */}
          <div className="pt-4 overflow-hidden">
            <div className="grid grid-cols-9 gap-1.5 sm:gap-2.5 w-full h-64 items-end">
              {monthlyData.map((item, idx) => {
                const heightPercent = Math.round((item.gmv / maxGMV) * 100);
                return (
                  <div
                    key={idx}
                    className="w-full flex flex-col items-center justify-end group cursor-pointer"
                  >
                    {/* Tooltip khi hover */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] font-bold px-1.5 sm:px-2 py-1 rounded-md mb-2 pointer-events-none whitespace-nowrap shadow-lg z-10">
                      {activeChartMetric === "gmv"
                        ? `${item.label}`
                        : `${item.checkins.toLocaleString("vi-VN")}`}
                    </div>

                    {/* Thanh cột nền xám giữ cố định h-52, phần trăm tiến độ co giãn theo tỷ lệ */}
                    <div className="w-full h-52 bg-slate-100 rounded-t-xl overflow-hidden relative flex items-end">
                      <div
                        className={`w-full rounded-t-xl transition-all duration-500 ${
                          item.isCurrent
                            ? "bg-gradient-to-t from-teal-700 to-emerald-500 shadow-md"
                            : "bg-gradient-to-t from-slate-300 to-teal-500/70 group-hover:from-teal-500 group-hover:to-emerald-400"
                        }`}
                        style={{ height: `${heightPercent}%` }}
                      />
                    </div>

                    {/* Nhãn tháng */}
                    <span
                      className={`text-[11px] mt-2 font-bold ${
                        item.isCurrent ? "text-teal-700 font-black" : "text-slate-400"
                      }`}
                    >
                      {item.month}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Chú giải chân biểu đồ */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-gradient-to-r from-teal-700 to-emerald-500" />
                <span>Cột doanh thu GMV thực tế đã ghi nhận qua cổng</span>
              </span>
              <span className="font-mono text-[11px] text-teal-700 font-bold">
                Đỉnh tháng 9: 2.45 Tỷ đ
              </span>
            </div>
          </div>
        </div>

        {/* CỘT PHẢI (5/12): Cơ cấu Doanh thu Theo Vùng Miền & Thể Loại */}
        <div className="lg:col-span-5 min-w-0 overflow-hidden bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs space-y-5">
          <div className="pb-3 border-b border-slate-100">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Layers size={16} className="text-indigo-600" />
              <span>Cơ Cấu Doanh Thu Toàn Sàn</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Phân bổ tỷ trọng dòng tiền theo vùng miền và thể loại di sản
            </p>
          </div>

          {/* Phân bổ 1: Theo Vùng Miền */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                1. Tỷ Trọng Theo Vùng Miền
              </h4>
              <span className="text-[10px] text-slate-400 font-semibold">GMV 2.45 Tỷ</span>
            </div>

            {/* Thanh tiến trình Miền Bắc */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-700">Miền Bắc (Hà Nội, Ninh Bình)</span>
                <span className="font-black text-emerald-700">48% (1.176 Tỷ đ)</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: "48%" }} />
              </div>
            </div>

            {/* Thanh tiến trình Miền Trung */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-700">Miền Trung (Huế, Hội An, Đà Nẵng)</span>
                <span className="font-black text-teal-700">32% (784 Tr đ)</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-teal-500 h-full rounded-full" style={{ width: "32%" }} />
              </div>
            </div>

            {/* Thanh tiến trình Miền Nam */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-700">Miền Nam (TP.HCM, Miền Tây)</span>
                <span className="font-black text-sky-700">20% (490 Tr đ)</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-sky-500 h-full rounded-full" style={{ width: "20%" }} />
              </div>
            </div>
          </div>

          {/* Phân bổ 2: Theo Thể Loại Di Sản */}
          <div className="space-y-3 pt-3 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                2. Tỷ Trọng Theo Thể Loại Trải Nghiệm
              </h4>
            </div>

            {/* Lộ trình lịch sử */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-700">Lộ trình lịch sử & Cổ kính</span>
                <span className="font-black text-indigo-700">55%</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-indigo-500 h-full rounded-full" style={{ width: "55%" }} />
              </div>
            </div>

            {/* Làng nghề trải nghiệm */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-700">Làng nghề trải nghiệm thủ công</span>
                <span className="font-black text-amber-700">30%</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full rounded-full" style={{ width: "30%" }} />
              </div>
            </div>

            {/* Danh thắng thiên nhiên */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-700">Danh thắng thiên nhiên sinh thái</span>
                <span className="font-black text-emerald-700">15%</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: "15%" }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────
          4. BẢNG XẾP HẠNG TOP 5 ĐỐI TÁC CÓ DOANH THU CAO NHẤT
      ──────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 flex items-center justify-center font-bold">
              <Sparkles size={18} />
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900 tracking-tight">
                Top 5 Đơn Vị Đối Tác Có Doanh Thu Cao Nhất
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Xếp hạng các Content Provider dẫn đầu về doanh số vé và mức độ hài lòng của du khách
              </p>
            </div>
          </div>

          <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full self-start sm:self-auto">
            Cập nhật theo chu kỳ tháng 09/2026
          </span>
        </div>

        {/* Bảng Top 5 */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-[10.5px] font-bold uppercase text-slate-500 tracking-wider">
                <th className="py-3.5 px-4 text-center w-16">THỨ HẠNG</th>
                <th className="py-3.5 px-4">ĐƠN VỊ ĐỐI TÁC</th>
                <th className="py-3.5 px-4">TỔNG VÉ BÁN</th>
                <th className="py-3.5 px-4">GMV ĐẠT ĐƯỢC</th>
                <th className="py-3.5 px-4">PHÍ SÀN GIỮ LẠI (10%)</th>
                <th className="py-3.5 px-5 text-right">ĐÁNH GIÁ CỦA KHÁCH</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {topPartners.map((item) => (
                <tr key={item.rank} className="hover:bg-slate-50/70 transition-colors">
                  {/* Thứ hạng */}
                  <td className="py-4 px-4 text-center">
                    <span
                      className={`inline-flex items-center justify-center w-7 h-7 rounded-xl text-xs ${item.badgeColor}`}
                    >
                      #{item.rank}
                    </span>
                  </td>

                  {/* Đơn vị đối tác */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-800 font-black text-xs flex items-center justify-center shrink-0 border border-teal-200">
                        {item.avatarLetter}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 text-xs sm:text-sm">
                          {item.name}
                        </p>
                        <p className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1">
                          <MapPin size={10} />
                          <span>{item.location}</span>
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Tổng vé bán */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span className="font-bold text-slate-800 text-xs">
                      {item.ticketsSold} vé
                    </span>
                  </td>

                  {/* GMV đạt được */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span className="font-black text-slate-900 text-xs">
                      {item.gmv}
                    </span>
                  </td>

                  {/* Phí sàn giữ lại */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span className="font-black text-teal-700 text-xs bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">
                      {item.commission}
                    </span>
                  </td>

                  {/* Đánh giá của khách */}
                  <td className="py-4 px-5 text-right whitespace-nowrap">
                    <div className="inline-flex items-center gap-1.5">
                      <div className="flex items-center text-amber-500 font-bold text-xs">
                        <Star size={13} className="fill-amber-400 text-amber-400 mr-1" />
                        <span>{item.rating}</span>
                      </div>
                      <span className="text-[11px] text-slate-400">
                        ({item.reviewsCount.toLocaleString("vi-VN")} đánh giá)
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer bảng */}
        <div className="p-4 bg-slate-50/80 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500">
          <span>
            5 đối tác đóng góp <strong>74.2%</strong> tổng giá trị giao dịch toàn sàn
          </span>
          <span className="text-[11px] text-teal-700 font-semibold">
            ● Chuẩn hóa xếp hạng theo thuật toán Weighted Revenue Score
          </span>
        </div>
      </div>
    </div>
  );
}
