"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Globe,
  Activity,
  Users,
  MapPin,
  QrCode,
  DollarSign,
  CircleDollarSign,
  ArrowUpRight,
  TrendingUp,
  CreditCard,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Building2,
  RefreshCw,
  ExternalLink,
  ChevronRight,
  Search,
  Filter,
  X,
  ShieldAlert,
  UserCheck,
} from "lucide-react";

/**
 * Trang Tổng Quan Vận Hành & Tăng Trưởng Toàn Sàn (Admin Dashboard)
 * Đường dẫn: /admin
 */
export default function AdminDashboardPage() {
  // State phản hồi Toast & Modal xử lý tác vụ
  const [toastMsg, setToastMsg] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3500);
  };

  // 1. Dữ liệu 4 thẻ KPI chỉ số vĩ mô toàn hệ sinh thái
  const kpiCards = [
    {
      id: "users",
      title: "Tổng Người dùng Hoạt động",
      count: "42,850",
      unit: "tài khoản",
      subBreakdown: "42k Du khách • 85 Đối tác • 12 Kiểm duyệt viên",
      trend: "+12.8% tháng này",
      icon: Users,
      iconColor: "text-sky-600 bg-sky-50 border-sky-200",
    },
    {
      id: "destinations",
      title: "Điểm di tích & Lộ trình xuất bản",
      count: "348",
      unit: "điểm",
      subBreakdown: "18 tuyến tour di sản liên tỉnh đã kích hoạt",
      trend: "+24 điểm mới",
      icon: MapPin,
      iconColor: "text-emerald-600 bg-emerald-50 border-emerald-200",
    },
    {
      id: "checkins",
      title: "Lượt Kích hoạt Thực tế (GPS/QR)",
      count: "186,420",
      unit: "lượt",
    
      trend: "+18.5% so với tuần trước",
      icon: QrCode,
      iconColor: "text-amber-600 bg-amber-50 border-amber-200",
    },
    {
      id: "gmv",
      title: "Tổng Doanh số Toàn Sàn",
      count: "1.845.000.000",
      unit: "đ",
      subBreakdown: "Phí hoa hồng sàn thu về: 184.500.000 đ (10%)",
      trend: "+21.4% GMV",
      icon: DollarSign,
      iconColor: "text-rose-600 bg-rose-50 border-rose-200",
    },
  ];

  // 2. Dữ liệu 5 giao dịch vé trải nghiệm mới nhất
  const [recentTransactions, setRecentTransactions] = useState([
    {
      id: "ORD-2026-8812",
      customer: "Nguyễn Minh Châu",
      customerEmail: "chau.nm@gmail.com",
      routeName: "Tour Đêm Văn Miếu: Đạo Học Thăng Long",
      gateway: "VNPay",
      gatewayColor: "bg-blue-50 text-blue-700 border-blue-200",
      amount: "199.000 đ",
      time: "2 phút trước",
      status: "SUCCESS",
      statusLabel: "Thành công",
      statusBadge: "bg-emerald-50 text-emerald-700 border-emerald-300",
    },
    {
      id: "ORD-2026-8811",
      customer: "Trần Anh Đức",
      customerEmail: "duc.tran@outlook.com",
      routeName: "Vé Tham quan Hoàng Thành Thăng Long & Hầm Cổ",
      gateway: "MoMo",
      gatewayColor: "bg-pink-50 text-pink-700 border-pink-200",
      amount: "70.000 đ",
      time: "8 phút trước",
      status: "SUCCESS",
      statusLabel: "Thành công",
      statusBadge: "bg-emerald-50 text-emerald-700 border-emerald-300",
    },
    {
      id: "ORD-2026-8810",
      customer: "Lê Hoàng Yến",
      customerEmail: "yen.lehoang@fpt.vn",
      routeName: "Hành Trình Khảo Cổ & Du Thuyền Tràng An Cổ",
      gateway: "VNPay",
      gatewayColor: "bg-blue-50 text-blue-700 border-blue-200",
      amount: "250.000 đ",
      time: "14 phút trước",
      status: "PENDING",
      statusLabel: "Chờ xử lý",
      statusBadge: "bg-amber-50 text-amber-800 border-amber-300",
    },
    {
      id: "ORD-2026-8809",
      customer: "Vũ Đình Trọng",
      customerEmail: "trong.vu@vietjetair.com",
      routeName: "Trải Nghiệm Làm Gốm & Vé Lò Bầu Bát Tràng",
      gateway: "MoMo",
      gatewayColor: "bg-pink-50 text-pink-700 border-pink-200",
      amount: "120.000 đ",
      time: "21 phút trước",
      status: "SUCCESS",
      statusLabel: "Thành công",
      statusBadge: "bg-emerald-50 text-emerald-700 border-emerald-300",
    },
    {
      id: "ORD-2026-8808",
      customer: "Phạm Thúy Hằng",
      customerEmail: "hang.pham@culture.edu.vn",
      routeName: "Tour Khám Phá Di Sản UNESCO Cố Đô Hoa Lư",
      gateway: "VNPay",
      gatewayColor: "bg-blue-50 text-blue-700 border-blue-200",
      amount: "150.000 đ",
      time: "32 phút trước",
      status: "SUCCESS",
      statusLabel: "Thành công",
      statusBadge: "bg-emerald-50 text-emerald-700 border-emerald-300",
    },
  ]);

  // 3. Dữ liệu 3 yêu cầu cần phê duyệt cấp Quản trị
  const [approvalTasks, setApprovalTasks] = useState([
    {
      id: "TASK-01",
      type: "PROVIDER_REGISTRATION",
      category: "Hồ sơ Đăng ký Đối tác",
      title: "BQL Làng Nghề Gốm Sứ Bát Tràng",
      subtitle: "Người đại diện: Nguyễn Văn Lợi • Mã GP: #GP-8821/HN",
      description: "Đề nghị mở tài khoản Content Provider để số hóa 12 xưởng gốm và tích hợp bán vé trải nghiệm trên sàn vietculture.",
      badge: "Đối tác mới",
      badgeColor: "bg-amber-50 text-amber-800 border-amber-300",
      time: "15 phút trước",
    },
    {
      id: "TASK-02",
      type: "PROVIDER_REGISTRATION",
      category: "Hồ sơ Đăng ký Đối tác",
      title: "Trung Tâm Bảo Tồn Di Tích Cố Đô Huế",
      subtitle: "Người đại diện: TS. Phan Thanh Hải • Mã GP: #GP-1993/TTH",
      description: "Đăng ký mở quyền cung cấp nội dung thuyết minh số 3D Audio cho Đại Nội & Hệ thống Lăng tẩm triều Nguyễn.",
      badge: "Đối tác mới",
      badgeColor: "bg-amber-50 text-amber-800 border-amber-300",
      time: "42 phút trước",
    },
    {
      id: "TASK-03",
      type: "REFUND_REQUEST",
      category: "Yêu cầu Hoàn Tiền Vé",
      title: "Vé Tham Quan Tháp Rùa - Hồ Gươm #TK-7719",
      subtitle: "Du khách: Đoàn Văn Hậu (0904***128) • Số tiền: 180.000 đ",
      description: "Di tích đóng cửa bảo trì đột xuất do thời tiết mưa bão. Du khách yêu cầu hoàn tiền về ví MoMo theo chính sách bảo hộ.",
      badge: "Hoàn tiền khẩn cấp",
      badgeColor: "bg-rose-50 text-rose-700 border-rose-300",
      time: "1 giờ trước",
    },
  ]);

  // Xử lý phê duyệt tác vụ
  const handleProcessTask = (task) => {
    setSelectedTask(task);
  };

  const handleConfirmTaskAction = (action) => {
    if (!selectedTask) return;

    if (action === "approve") {
      showToast(`Đã duyệt thành công: ${selectedTask.title}`);
      setApprovalTasks((prev) => prev.filter((t) => t.id !== selectedTask.id));
    } else {
      showToast(`Đã từ chối hoặc chuyển tiếp xem xét: ${selectedTask.title}`);
      setApprovalTasks((prev) => prev.filter((t) => t.id !== selectedTask.id));
    }
    setSelectedTask(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-200">
      {/* Toast thông báo nhanh */}
      {toastMsg && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl border border-slate-700 text-xs font-bold flex items-center gap-2.5 animate-in slide-in-from-top-3 max-w-md">
          <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* ────────────────────────────────────────────────────────
          1. HERO BANNER ĐIỀU HÀNH TRUNG ƯƠNG
      ──────────────────────────────────────────────────────── */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-teal-950 text-white p-6 sm:p-7 rounded-3xl relative overflow-hidden shadow-sm border border-slate-800">
        {/* Watermark đồ họa mờ chìm góc phải: Biểu tượng mạng lưới toàn cầu Globe / Activity */}
        <div className="absolute -right-8 -bottom-8 pointer-events-none opacity-10">
          <Globe size={240} strokeWidth={1.2} className="stroke-white" />
        </div>

        <div className="relative z-10 max-w-3xl">
          {/* Tag nhận diện */}
          <div className="bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs text-teal-200 inline-flex items-center gap-2 mb-3 border border-white/10 shadow-xs">
            <span>🏛️ Trung Tâm Chỉ Huy Vận Hành Toàn Sàn vietculture</span>
          </div>

          {/* Tiêu đề chính */}
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight leading-snug">
            Tổng Quan Hạ Tầng & Tăng Trưởng Di Sản Số
          </h1>

          {/* Mô tả ngắn */}
          <p className="mt-2 text-xs sm:text-sm text-slate-200 font-normal leading-relaxed">
            Theo dõi lưu lượng du khách theo thời gian thực, giám sát cổng thanh toán trực tuyến, quản lý đối tác cung cấp nội dung và kiểm soát chất lượng dữ liệu văn hóa trên toàn quốc.
          </p>

          {/* Hàng 3 thông số vận hành nhanh ở chân banner */}
          <div className="mt-5 pt-4 border-t border-white/15 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-300">
            <span className="flex items-center gap-1.5 text-emerald-300 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              ● Cổng thanh toán (VNPay / MoMo): Kết nối ổn định
            </span>

            <span className="flex items-center gap-1.5 text-sky-300 font-medium">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
              ● Dịch vụ Bản đồ & GPS: 99.98% Uptime
            </span>

            <span className="flex items-center gap-1.5 text-amber-200 font-medium">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              ● Trợ lý AI Virtual Guide: Đang phục vụ 1,240 du khách trực tuyến
            </span>
          </div>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────
          2. LƯỚI 4 THẺ KPI CHỈ SỐ VĨ MÔ (Toàn hệ sinh thái)
      ──────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              className="bg-white rounded-2xl p-5 border border-slate-200/85 shadow-2xs hover:border-slate-300 hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    {card.title}
                  </p>
                  <div className={`p-2.5 rounded-xl border ${card.iconColor} shadow-2xs`}>
                    <Icon size={18} />
                  </div>
                </div>

                <div className="flex items-baseline gap-1.5 mt-2.5">
                  <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    {card.count}
                  </span>
                  <span className="text-xs font-bold text-slate-400">
                    {card.unit}
                  </span>
                </div>

                {/* Phân rã nhỏ */}
                <p className="text-[11.5px] text-slate-500 mt-2 font-medium leading-relaxed">
                  {card.subBreakdown}
                </p>
              </div>

              {/* Dòng tỷ lệ tăng trưởng */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                  <TrendingUp size={12} />
                  {card.trend}
                </span>
                <span className="text-[10.5px] text-slate-400">Thời gian thực</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ────────────────────────────────────────────────────────
          3. KHỐI 2 CỘT GIÁM SÁT THỜI GIAN THỰC (SPLIT SECTION)
      ──────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* CỘT TRÁI (7/12): Giao Dịch Vé Trải Nghiệm Mới Nhất */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
          {/* Header bảng giao dịch */}
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-700 border border-sky-200 flex items-center justify-center">
                <CreditCard size={16} />
              </div>
              <div>
                <h2 className="text-sm font-black text-slate-900 tracking-tight">
                  Giao Dịch Vé Trải Nghiệm Mới Nhất
                </h2>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  5 đơn hàng vé di tích vừa hoàn tất thanh toán trên toàn sàn
                </p>
              </div>
            </div>

            <Link
              href="/admin/finance"
              className="text-xs font-bold text-teal-700 hover:text-teal-800 hover:underline flex items-center gap-1"
            >
              <span>Xem tất cả</span>
              <ChevronRight size={13} />
            </Link>
          </div>

          {/* Bảng dữ liệu 5 giao dịch */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-[10.5px] font-bold uppercase text-slate-500 tracking-wider">
                  <th className="py-3 px-4">MÃ ĐƠN & KHÁCH</th>
                  <th className="py-3 px-3">TÊN LỘ TRÌNH DI TÍCH</th>
                  <th className="py-3 px-3">CỔNG</th>
                  <th className="py-3 px-3">SỐ TIỀN</th>
                  <th className="py-3 px-4 text-right">TRẠNG THÁI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* Cột 1: Mã đơn & Tên du khách */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="font-bold text-slate-900 text-xs">{tx.customer}</div>
                      <div className="text-[10px] font-mono text-slate-400 mt-0.5">{tx.id}</div>
                    </td>

                    {/* Cột 2: Tên lộ trình */}
                    <td className="py-3.5 px-3 max-w-[200px]">
                      <p className="font-semibold text-slate-800 truncate" title={tx.routeName}>
                        {tx.routeName}
                      </p>
                      <p className="text-[10px] text-slate-400 mt-0.5">⏱ {tx.time}</p>
                    </td>

                    {/* Cột 3: Cổng thanh toán (MoMo / VNPay) */}
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-md text-[10.5px] font-bold border ${tx.gatewayColor}`}
                      >
                        {tx.gateway}
                      </span>
                    </td>

                    {/* Cột 4: Số tiền */}
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <span className="font-black text-slate-900 text-xs">
                        {tx.amount}
                      </span>
                    </td>

                    {/* Cột 5: Trạng thái */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10.5px] font-bold border ${tx.statusBadge}`}
                      >
                        {tx.status === "SUCCESS" ? (
                          <CheckCircle2 size={11} />
                        ) : (
                          <Clock size={11} />
                        )}
                        <span>{tx.statusLabel}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Chân khối giao dịch */}
          <div className="p-3 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 px-4">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Đồng bộ dữ liệu thời gian thực (Live Gateway Sync)
            </span>
            <span className="font-semibold text-slate-600">Đã cập nhật vừa xong</span>
          </div>
        </div>

        {/* CỘT PHẢI (5/12): Yêu Cầu Cần Phê Duyệt Cấp Quản Trị */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden flex flex-col justify-between">
          <div>
            {/* Header danh sách yêu cầu duyệt */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 flex items-center justify-center">
                  <ShieldAlert size={16} />
                </div>
                <div>
                  <h2 className="text-sm font-black text-slate-900 tracking-tight">
                    Yêu Cầu Cần Phê Duyệt Cấp Quản Trị
                  </h2>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {approvalTasks.length} tác vụ cấp thiết chờ bạn ra quyết định
                  </p>
                </div>
              </div>

              <span className="bg-rose-100 text-rose-800 text-[10.5px] font-black px-2.5 py-0.5 rounded-full border border-rose-200">
                {approvalTasks.length} chờ
              </span>
            </div>

            {/* Danh sách 3 tác vụ cấp thiết */}
            <div className="p-4 space-y-3.5">
              {approvalTasks.length === 0 ? (
                <div className="py-12 text-center text-slate-400">
                  <CheckCircle2 size={32} className="mx-auto text-emerald-500 mb-2" />
                  <p className="text-xs font-bold text-slate-700">Tất cả tác vụ đã được xử lý xong!</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Không còn hồ sơ tồn đọng cấp quản trị.</p>
                </div>
              ) : (
                approvalTasks.map((task) => (
                  <div
                    key={task.id}
                    className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/80 hover:border-slate-300 hover:bg-white transition-all space-y-2.5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span
                          className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold border mb-1.5 ${task.badgeColor}`}
                        >
                          {task.badge}
                        </span>
                        <h3 className="text-xs font-bold text-slate-900 leading-snug">
                          {task.title}
                        </h3>
                        <p className="text-[10.5px] text-slate-500 mt-0.5">
                          {task.subtitle}
                        </p>
                      </div>

                      <span className="text-[10px] text-slate-400 whitespace-nowrap font-mono">
                        {task.time}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-600 bg-white p-2.5 rounded-lg border border-slate-150 leading-relaxed">
                      {task.description}
                    </p>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[10px] font-mono text-slate-400">
                        Mã tác vụ: {task.id}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleProcessTask(task)}
                        className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-rose-700 text-white font-bold text-xs transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
                      >
                        <span>Xử lý ngay</span>
                        <ArrowUpRight size={13} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Chân khối nhắc nhở SLA */}
          <div className="p-3.5 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 px-5">
            <span className="font-semibold text-rose-700">
              ● Cam kết SLA duyệt đối tác: &lt; 24h
            </span>
            <span className="text-slate-400">Quyền phê duyệt: Quản trị viên</span>
          </div>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────
          MODAL XỬ LÝ NHANH TÁC VỤ PHÊ DUYỆT (POPUP)
      ──────────────────────────────────────────────────────── */}
      {selectedTask && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
          onClick={() => setSelectedTask(null)}
        >
          <div
            className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 space-y-4 animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Modal */}
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div>
                <span
                  className={`inline-block px-2 py-0.5 rounded-md text-[10.5px] font-bold border ${selectedTask.badgeColor}`}
                >
                  {selectedTask.category}
                </span>
                <h3 className="text-base font-black text-slate-900 mt-1.5">
                  {selectedTask.title}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">{selectedTask.subtitle}</p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedTask(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Nội dung chi tiết */}
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed">
              <p className="font-bold text-slate-800 mb-1">Chi tiết yêu cầu đệ trình:</p>
              <p>{selectedTask.description}</p>
            </div>

            {/* Cảnh báo quyết định */}
            <div className="flex items-center gap-2 p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-800 text-xs">
              <AlertTriangle size={16} className="shrink-0 text-amber-600" />
              <span>
                Quyết định này sẽ tự động gửi thông báo hệ thống và kích hoạt tài khoản/lệnh hoàn tiền qua cổng thanh toán.
              </span>
            </div>

            {/* Nút hành động */}
            <div className="pt-2 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => handleConfirmTaskAction("reject")}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
              >
                Yêu cầu bổ sung hồ sơ
              </button>

              <button
                type="button"
                onClick={() => handleConfirmTaskAction("approve")}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors cursor-pointer shadow-xs"
              >
                Phê duyệt chính thức
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
