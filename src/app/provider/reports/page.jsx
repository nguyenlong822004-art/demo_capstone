"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  BarChart3,
  TrendingUp,
  Coins,
  Ticket,
  Users,
  QrCode,
  MapPin,
  Calendar,
  Download,
  FileSpreadsheet,
  FileText,
  Search,
  Filter,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  RotateCcw,
  Sparkles,
  Award,
  ChevronDown,
  Info,
  CreditCard,
  ShieldCheck,
} from "lucide-react";

/**
 * Trang Báo Cáo Tài Chính & Hiệu Quả Điểm Đến
 * Đường dẫn: src/app/provider/reports/page.jsx
 * Đơn vị: Ban Quản Lý Di Tích Văn Miếu - Quốc Tử Giám
 */
export default function ProviderReportsPage() {
  // Bộ lọc thời gian: '7days' | 'month' | 'quarter' | 'custom'
  const [timeFilter, setTimeFilter] = useState("month");

  // Tìm kiếm trong bảng giao dịch
  const [transactionSearch, setTransactionSearch] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Toast thông báo xuất file
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
  };

  // ════════════════════════════════════════════════════════════
  // 1. DỮ LIỆU CHỈ SỐ TÀI CHÍNH TỔNG QUAN (INCOME OVERVIEW)
  // ════════════════════════════════════════════════════════════
  const reportMetrics = {
    totalRevenue: 482600000, // 482.6 triệu VNĐ
    platformFeeRate: 0.1, // 10%
    platformFeeAmount: 48260000,
    netEarnings: 434340000, // 434.34 triệu VNĐ thực nhận (90%)
    issuedPasses: 6032, // Số vé / pass đã xuất
    checkinCount: 5748, // Số lượt khách đã check-in qua cổng
    checkinRate: "95.3%", // Tỷ lệ kích hoạt thực tế
    growthRate: "+18.2%",
  };

  // Dữ liệu biểu đồ doanh thu các ngày/tuần
  const revenueChartData = [
    { period: "Tuần 1", revenue: 98500000, passes: 1230, height: "65%" },
    { period: "Tuần 2", revenue: 115200000, passes: 1440, height: "76%" },
    { period: "Tuần 3", revenue: 124800000, passes: 1560, height: "82%" },
    { period: "Tuần 4", revenue: 144100000, passes: 1802, height: "95%" },
  ];

  // ════════════════════════════════════════════════════════════
  // 2. BẢNG XẾP HẠNG ĐIỂM ĐẾN & LỘ TRÌNH HIỆU QUẢ NHẤT
  // ════════════════════════════════════════════════════════════
  const topDestinations = [
    {
      rank: 1,
      name: "Khuê Văn Các",
      image: "/image/vanmieu.png",
      category: "Di tích lịch sử",
      checkins: 18420,
      missionsSolved: 14280,
      satisfactionRate: "98.6%",
      rating: 4.9,
      revenueGenerated: "184,200,000 ₫",
    },
    {
      rank: 2,
      name: "Giếng Thiên Quang & 82 Bia Tiến Sĩ",
      image: "/image/thanglong.png",
      category: "Di sản Ký ức UNESCO",
      checkins: 16150,
      missionsSolved: 13920,
      satisfactionRate: "99.2%",
      rating: 5.0,
      revenueGenerated: "161,500,000 ₫",
    },
    {
      rank: 3,
      name: "Nhà Thái Học (Quốc Tử Giám)",
      image: "/image/baotang.png",
      category: "Trường ĐH đầu tiên VN",
      checkins: 12890,
      missionsSolved: 9850,
      satisfactionRate: "97.4%",
      rating: 4.8,
      revenueGenerated: "92,500,000 ₫",
    },
    {
      rank: 4,
      name: "Cổng Đại Thành & Điện Đại Bái",
      image: "/image/gomsu.png",
      category: "Không gian thờ tự",
      checkins: 8240,
      missionsSolved: 6100,
      satisfactionRate: "96.8%",
      rating: 4.8,
      revenueGenerated: "44,400,000 ₫",
    },
  ];

  // ════════════════════════════════════════════════════════════
  // 3. BẢNG LỊCH SỬ GIAO DỊCH VÉ ĐIỆN TỬ (TRANSACTION TABLE)
  // ════════════════════════════════════════════════════════════
  const initialTransactions = [
    {
      id: "tx-101",
      ticketCode: "VC-89412",
      routeName: "Hành trình Ngàn năm Văn hiến Thăng Long",
      transTime: "09/09/2026 08:24",
      amount: 80000,
      paymentMethod: "VNPay",
      status: "active_onsite", // 'active_onsite' | 'unused' | 'refunded'
      customerName: "Nguyễn Hoàng Long",
    },
    {
      id: "tx-102",
      ticketCode: "VC-89411",
      routeName: "Hành trình Ngàn năm Văn hiến Thăng Long",
      transTime: "09/09/2026 08:15",
      amount: 160000, // 2 vé
      paymentMethod: "MoMo",
      status: "active_onsite",
      customerName: "Trần Mai Anh",
    },
    {
      id: "tx-103",
      ticketCode: "VC-89410",
      routeName: "Tour Đêm Di Tích: Tinh Hoa Đạo Học",
      transTime: "09/09/2026 07:50",
      amount: 120000,
      paymentMethod: "ZaloPay",
      status: "unused",
      customerName: "Lê Minh Tuấn",
    },
    {
      id: "tx-104",
      ticketCode: "VC-89409",
      routeName: "Hành trình Ngàn năm Văn hiến Thăng Long",
      transTime: "08/09/2026 16:40",
      amount: 80000,
      paymentMethod: "VNPay",
      status: "active_onsite",
      customerName: "David Johnson (Quốc tế)",
    },
    {
      id: "tx-105",
      ticketCode: "VC-89408",
      routeName: "Khám Phá Di Sản Tư Liệu 82 Bia Tiến Sĩ",
      transTime: "08/09/2026 15:10",
      amount: 50000,
      paymentMethod: "MoMo",
      status: "refunded",
      customerName: "Phạm Hải Đăng",
    },
    {
      id: "tx-106",
      ticketCode: "VC-89407",
      routeName: "Hành trình Ngàn năm Văn hiến Thăng Long",
      transTime: "08/09/2026 14:22",
      amount: 80000,
      paymentMethod: "VNPay",
      status: "active_onsite",
      customerName: "Vũ Bích Ngọc",
    },
    {
      id: "tx-107",
      ticketCode: "VC-89406",
      routeName: "Tour Đêm Di Tích: Tinh Hoa Đạo Học",
      transTime: "08/09/2026 11:35",
      amount: 240000, // 2 vé VIP
      paymentMethod: "ZaloPay",
      status: "unused",
      customerName: "Hoàng Gia Bách",
    },
    {
      id: "tx-108",
      ticketCode: "VC-89405",
      routeName: "Hành trình Ngàn năm Văn hiến Thăng Long",
      transTime: "08/09/2026 09:12",
      amount: 80000,
      paymentMethod: "VNPay",
      status: "active_onsite",
      customerName: "Đỗ Thu Trang",
    },
  ];

  // Lọc giao dịch
  const filteredTransactions = initialTransactions.filter((tx) => {
    const matchesSearch =
      tx.ticketCode.toLowerCase().includes(transactionSearch.toLowerCase()) ||
      tx.routeName.toLowerCase().includes(transactionSearch.toLowerCase()) ||
      tx.customerName.toLowerCase().includes(transactionSearch.toLowerCase());

    const matchesPayment =
      paymentFilter === "all" || tx.paymentMethod === paymentFilter;

    const matchesStatus =
      statusFilter === "all" || tx.status === statusFilter;

    return matchesSearch && matchesPayment && matchesStatus;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* ── Toast Thông Báo ── */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-700 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs sm:text-sm font-semibold animate-in fade-in slide-in-from-top-4 border border-emerald-500/50">
          <Sparkles size={16} className="text-amber-300 flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════
          TOP HEADER: BREADCRUMBS & NÚT XUẤT BÁO CÁO EXCEL/PDF
      ══════════════════════════════════════════════════════════ */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-1">
            <Link href="/provider" className="hover:text-emerald-700 transition-colors">
              Cổng Đối Tác
            </Link>
            <span>/</span>
            <span className="text-emerald-700">Báo cáo Tài chính & Doanh thu</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-1.5 h-5 bg-emerald-600 rounded-full" />
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Báo Cáo Tài Chính & Hiệu Quả Điểm Đến
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Phân tích số liệu bán vé điện tử, phân bổ thực nhận 90%, tỷ lệ check-in tại hiện vật và đối soát giao dịch.
          </p>
        </div>

        {/* 2 Nút xuất file báo cáo định kỳ */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={() =>
              showToast("Đang xuất file bảng tính Excel (.xlsx) báo cáo tài chính...")
            }
            className="px-3.5 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300/80 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
          >
            <FileSpreadsheet size={15} className="text-emerald-600" />
            <span>Xuất Excel (.xlsx)</span>
          </button>

          <button
            type="button"
            onClick={() =>
              showToast("Đang kết xuất tệp PDF báo cáo gửi Hội đồng & Cơ quan thuế...")
            }
            className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300/70 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
          >
            <FileText size={15} />
            <span>Xuất PDF</span>
          </button>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          BỘ LỌC THỜI GIAN (TIME FILTER TABS)
      ══════════════════════════════════════════════════════════ */}
      <div className="bg-white p-3 sm:p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-emerald-600" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Kỳ báo cáo:
          </span>
        </div>

        {/* 4 Tabs thời gian */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl w-full sm:w-auto text-xs font-bold">
          <button
            type="button"
            onClick={() => {
              setTimeFilter("7days");
              showToast("Đã tải dữ liệu tài chính trong 7 ngày qua.");
            }}
            className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
              timeFilter === "7days"
                ? "bg-white text-emerald-900 shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            7 ngày qua
          </button>

          <button
            type="button"
            onClick={() => {
              setTimeFilter("month");
              showToast("Đã tải dữ liệu tài chính Tháng này.");
            }}
            className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
              timeFilter === "month"
                ? "bg-white text-emerald-900 shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Tháng này
          </button>

          <button
            type="button"
            onClick={() => {
              setTimeFilter("quarter");
              showToast("Đã tải dữ liệu tài chính Quý này.");
            }}
            className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
              timeFilter === "quarter"
                ? "bg-white text-emerald-900 shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Quý này
          </button>

          <button
            type="button"
            onClick={() => {
              setTimeFilter("custom");
              showToast("Chọn khoảng ngày tùy chỉnh từ 01/08/2026 đến 09/09/2026.");
            }}
            className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
              timeFilter === "custom"
                ? "bg-white text-emerald-900 shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Tùy chỉnh khoảng ngày
          </button>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          CHỈ SỐ TÀI CHÍNH TỔNG QUAN (4 KPI INCOME CARDS)
      ══════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* 1. Tổng doanh thu bán vé */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center">
              <Coins size={20} />
            </div>
            <span className="inline-flex items-center gap-0.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
              <ArrowUpRight size={13} />
              <span>{reportMetrics.growthRate}</span>
            </span>
          </div>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Tổng Doanh Thu Vé
          </p>
          <p className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
            {reportMetrics.totalRevenue.toLocaleString()} ₫
          </p>
          <p className="text-[11px] text-slate-400 mt-1">
            Bao gồm vé đơn lẻ & combo tour
          </p>
        </div>

        {/* 2. Thực nhận sau phí nền tảng (90%) */}
        <div className="bg-gradient-to-br from-emerald-50 via-teal-50/40 to-white rounded-3xl p-5 border border-emerald-200 shadow-xs hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
              <ShieldCheck size={20} />
            </div>
            <span className="text-[11px] font-extrabold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
              90% Thực nhận
            </span>
          </div>
          <p className="text-xs font-bold text-emerald-900 uppercase tracking-wider">
            Doanh Thu Thực Nhận (90%)
          </p>
          <p className="text-xl sm:text-2xl font-black text-emerald-700 tracking-tight mt-1">
            {reportMetrics.netEarnings.toLocaleString()} ₫
          </p>
          <p className="text-[11px] text-emerald-800/80 mt-1">
            Đã khấu trừ phí sàn 10% ({reportMetrics.platformFeeAmount.toLocaleString()} ₫)
          </p>
        </div>

        {/* 3. Số vé / pass đã phát hành */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 border border-sky-200 flex items-center justify-center">
              <Ticket size={20} />
            </div>
            <span className="text-xs font-bold text-slate-400">Vé QR điện tử</span>
          </div>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Số Vé / Pass Đã Xuất
          </p>
          <p className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
            {reportMetrics.issuedPasses.toLocaleString()} vé
          </p>
          <p className="text-[11px] text-slate-400 mt-1">
            Giá trung bình: 80.000 ₫/vé
          </p>
        </div>

        {/* 4. Số lượt du khách đã check-in qua cổng */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center">
              <Users size={20} />
            </div>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
              <CheckCircle2 size={12} />
              <span>{reportMetrics.checkinRate}</span>
            </span>
          </div>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Du Khách Check-in Qua Cổng
          </p>
          <p className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
            {reportMetrics.checkinCount.toLocaleString()} lượt
          </p>
          <p className="text-[11px] text-slate-400 mt-1">
            Quét mã QR & định vị GPS thực địa
          </p>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          BIỂU ĐỒ DOANH THU & PHÂN BỔ THEO TUẦN (REVENUE BAR CHART)
      ══════════════════════════════════════════════════════════ */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-4 bg-emerald-600 rounded-full" />
              <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                Biểu Đồ Doanh Thu & Lượng Vé Bán Ra Theo Tuần
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Xu hướng tăng trưởng ổn định trong tháng cao điểm du lịch văn hóa.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-md bg-emerald-600" />
              <span className="text-slate-700">Doanh thu bán vé (VNĐ)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-md bg-sky-400" />
              <span className="text-slate-700">Số lượt vé xuất</span>
            </div>
          </div>
        </div>

        {/* Khung biểu đồ cột SVG mô phỏng hiện đại */}
        <div className="mt-6 pt-2">
          <div className="h-56 flex items-end justify-between gap-4 sm:gap-8 px-4 border-b border-slate-200 pb-2">
            {revenueChartData.map((bar, idx) => (
              <div
                key={bar.period}
                className="flex-1 flex flex-col items-center gap-2 h-full justify-end group cursor-pointer"
              >
                {/* Tooltip khi hover */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10.5px] font-bold py-1 px-2.5 rounded-lg shadow-md mb-1 text-center whitespace-nowrap pointer-events-none">
                  <p>{bar.revenue.toLocaleString()} ₫</p>
                  <p className="text-slate-300 font-normal">{bar.passes} vé</p>
                </div>

                {/* Cột biểu đồ */}
                <div className="w-full max-w-[72px] flex items-end gap-1 h-full justify-center">
                  {/* Cột doanh thu xanh ngọc */}
                  <div
                    style={{ height: bar.height }}
                    className="w-8 sm:w-10 rounded-t-xl bg-gradient-to-t from-emerald-600 to-teal-400 group-hover:from-emerald-700 group-hover:to-teal-500 transition-all shadow-xs"
                  />
                </div>

                {/* Tên mốc thời gian */}
                <span className="text-xs font-bold text-slate-600 group-hover:text-emerald-700 transition-colors">
                  {bar.period}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          BẢNG XẾP HẠNG ĐIỂM ĐẾN & LỘ TRÌNH HIỆU QUẢ NHẤT
      ══════════════════════════════════════════════════════════ */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-4 bg-sky-600 rounded-full" />
            <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
              Bảng Xếp Hạng Điểm Đến & Lộ Trình Hiệu Quả Nhất
            </h2>
          </div>
          <span className="text-xs font-bold text-slate-400">
            Xếp hạng theo lưu lượng check-in
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/75 border-b border-slate-200 text-[11px] font-bold uppercase text-slate-500 tracking-wider">
                <th className="py-3 px-4 w-12 text-center">Hạng</th>
                <th className="py-3 px-4">Điểm đến di tích</th>
                <th className="py-3 px-4">Check-in GPS/QR</th>
                <th className="py-3 px-4">Nhiệm vụ đã giải</th>
                <th className="py-3 px-4">Đánh giá du khách</th>
                <th className="py-3 px-4 text-right">Doanh thu tạo ra</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {topDestinations.map((dest) => (
                <tr
                  key={dest.rank}
                  className="even:bg-slate-50/60 hover:bg-slate-100/70 transition-colors"
                >
                  {/* Cột Thứ hạng */}
                  <td className="py-3.5 px-4 text-center">
                    <span
                      className={`inline-flex items-center justify-center w-6 h-6 rounded-full font-black text-xs ${
                        dest.rank === 1
                          ? "bg-amber-400 text-amber-950 shadow-xs"
                          : dest.rank === 2
                          ? "bg-slate-300 text-slate-800"
                          : dest.rank === 3
                          ? "bg-amber-700/80 text-white"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {dest.rank}
                    </span>
                  </td>

                  {/* Cột Tên di tích */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={dest.image}
                        alt={dest.name}
                        className="w-10 h-10 rounded-xl object-cover border border-slate-200 shadow-2xs flex-shrink-0"
                        onError={(e) => {
                          e.currentTarget.src = "/image/vanmieu.png";
                        }}
                      />
                      <div>
                        <p className="font-bold text-slate-900 text-xs sm:text-sm">
                          {dest.name}
                        </p>
                        <p className="text-[10.5px] text-slate-400 mt-0.5">
                          {dest.category}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Cột Check-in */}
                  <td className="py-3.5 px-4 font-bold text-slate-800">
                    <div className="flex items-center gap-1.5">
                      <QrCode size={13} className="text-emerald-600" />
                      <span>{dest.checkins.toLocaleString()} lượt</span>
                    </div>
                  </td>

                  {/* Cột Nhiệm vụ */}
                  <td className="py-3.5 px-4 font-semibold text-slate-700">
                    <span>{dest.missionsSolved.toLocaleString()} câu hỏi/AR</span>
                  </td>

                  {/* Cột Đánh giá */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-amber-600">
                        ★ {dest.rating}
                      </span>
                      <span className="text-[10.5px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        {dest.satisfactionRate} hài lòng
                      </span>
                    </div>
                  </td>

                  {/* Cột Doanh thu */}
                  <td className="py-3.5 px-4 text-right font-mono font-black text-emerald-700 text-sm">
                    {dest.revenueGenerated}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          BẢNG LỊCH SỬ GIAO DỊCH VÉ ĐIỆN TỬ (TRANSACTION TABLE)
      ══════════════════════════════════════════════════════════ */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-4 bg-amber-500 rounded-full" />
              <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                Lịch Sử Giao Dịch Vé Điện Tử
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Danh sách các lượt mua vé thực tế qua cổng thanh toán VNPay, MoMo, ZaloPay.
            </p>
          </div>

          <span className="text-xs font-bold text-slate-400 self-start sm:self-auto">
            Tổng cộng: {filteredTransactions.length} giao dịch
          </span>
        </div>

        {/* Thanh tìm kiếm & lọc giao dịch */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative w-full sm:flex-1">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={transactionSearch}
              onChange={(e) => setTransactionSearch(e.target.value)}
              placeholder="Tìm theo mã vé (#VC-89412), tên du khách, tên lộ trình..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
            />
          </div>

          {/* Lọc phương thức thanh toán */}
          <select
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:bg-white focus:outline-none"
          >
            <option value="all">Tất cả Cổng thanh toán</option>
            <option value="VNPay">VNPay</option>
            <option value="MoMo">Ví MoMo</option>
            <option value="ZaloPay">ZaloPay</option>
          </select>

          {/* Lọc trạng thái vé */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:bg-white focus:outline-none"
          >
            <option value="all">Tất cả Trạng thái</option>
            <option value="active_onsite">Đã kích hoạt on-site</option>
            <option value="unused">Chưa sử dụng</option>
            <option value="refunded">Hoàn tiền</option>
          </select>
        </div>

        {/* Bảng dữ liệu giao dịch xen kẽ trắng - xám nhạt */}
        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-200 text-[11px] font-bold uppercase text-slate-600 tracking-wider">
                <th className="py-3 px-3.5">Mã Vé / Đặt chỗ</th>
                <th className="py-3 px-3.5">Tên lộ trình tham quan</th>
                <th className="py-3 px-3.5">Du khách</th>
                <th className="py-3 px-3.5">Thời gian giao dịch</th>
                <th className="py-3 px-3.5">Cổng thanh toán</th>
                <th className="py-3 px-3.5">Số tiền</th>
                <th className="py-3 px-3.5 text-right">Trạng thái vé</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-slate-400">
                    Không tìm thấy giao dịch nào phù hợp với bộ lọc.
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((tx) => (
                  <tr
                    key={tx.id}
                    className="even:bg-slate-50/70 hover:bg-slate-100/80 transition-colors"
                  >
                    {/* Cột 1: Mã vé */}
                    <td className="py-3 px-3.5 font-mono font-bold text-slate-900">
                      #{tx.ticketCode}
                    </td>

                    {/* Cột 2: Tên lộ trình */}
                    <td className="py-3 px-3.5 font-bold text-slate-800 max-w-[200px] truncate">
                      {tx.routeName}
                    </td>

                    {/* Cột 3: Tên du khách */}
                    <td className="py-3 px-3.5 text-slate-600 font-medium">
                      {tx.customerName}
                    </td>

                    {/* Cột 4: Thời gian */}
                    <td className="py-3 px-3.5 text-slate-500 font-mono text-[11px]">
                      {tx.transTime}
                    </td>

                    {/* Cột 5: Cổng thanh toán */}
                    <td className="py-3 px-3.5">
                      {tx.paymentMethod === "VNPay" ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10.5px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                          VNPay QR
                        </span>
                      ) : tx.paymentMethod === "MoMo" ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10.5px] font-bold bg-pink-50 text-pink-700 border border-pink-200">
                          Ví MoMo
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10.5px] font-bold bg-teal-50 text-teal-700 border border-teal-200">
                          ZaloPay
                        </span>
                      )}
                    </td>

                    {/* Cột 6: Số tiền */}
                    <td className="py-3 px-3.5 font-mono font-extrabold text-slate-900">
                      {tx.amount.toLocaleString()} ₫
                    </td>

                    {/* Cột 7: Trạng thái vé */}
                    <td className="py-3 px-3.5 text-right">
                      {tx.status === "active_onsite" ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10.5px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle2 size={11} />
                          <span>Đã kích hoạt on-site</span>
                        </span>
                      ) : tx.status === "unused" ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10.5px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                          <Clock size={11} />
                          <span>Chưa sử dụng</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10.5px] font-bold bg-slate-100 text-slate-500 border border-slate-200">
                          <RotateCcw size={11} />
                          <span>Hoàn tiền</span>
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
