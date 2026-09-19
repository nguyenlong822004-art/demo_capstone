"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  CircleDollarSign,
  Receipt,
  Landmark,
  ShieldAlert,
  ArrowUpRight,
  TrendingUp,
  CreditCard,
  CheckCircle2,
  Clock,
  AlertTriangle,
  XCircle,
  Download,
  Search,
  Filter,
  RefreshCw,
  Building2,
  Calendar,
  ChevronRight,
  X,
  ExternalLink,
  ShieldCheck,
  Check,
} from "lucide-react";

/**
 * Trang Quản Lý Tài Chính & Xử Lý Hoàn Tiền (Finance & Refund Management)
 * Đường dẫn: /admin/finance
 */
export default function AdminFinancePage() {
  // State Bộ lọc lịch sử thanh toán
  const [gatewayFilter, setGatewayFilter] = useState("all"); // 'all' | 'VNPay' | 'MoMo' | 'ZaloPay'
  const [statusFilter, setStatusFilter] = useState("all"); // 'all' | 'SUCCESS' | 'REFUNDED' | 'FAILED'
  const [dateFilter, setDateFilter] = useState("month"); // 'today' | 'week' | 'month'
  const [searchQuery, setSearchQuery] = useState("");

  // State Hàng chờ Hoàn tiền (Refund Queue)
  const [refundQueue, setRefundQueue] = useState([
    {
      id: "REF-2026-001",
      ticketCode: "#TK-HT-8821",
      customerName: "Trần Mai Anh",
      customerPhone: "0912.345.678",
      tourName: "Tour Trải Nghiệm Đêm Hoàng Thành Thăng Long",
      destination: "Hoàng Thành Thăng Long - Hà Nội",
      provider: "BQL Hoàng Thành Thăng Long",
      amount: "200.000 đ",
      numericAmount: 200000,
      gateway: "VNPay",
      gatewayColor: "bg-blue-50 text-blue-700 border-blue-200",
      reason: "Di tích đóng cửa đột xuất để tiếp đoàn ngoại giao cấp cao.",
      providerConfirmation: "BQL Hoàng Thành đã xác nhận sự cố & đề nghị hoàn tiền.",
      requestedAt: "08:15 - Hôm nay",
      slaTimeLeft: "Còn 35 phút (Khẩn cấp)",
      isUrgent: true,
      status: "PENDING",
    },
    {
      id: "REF-2026-002",
      ticketCode: "#TK-BT-4419",
      customerName: "Lê Hoàng Long",
      customerPhone: "0988.776.655",
      tourName: "Vé Khảo Khảo & Trải Nghiệm Gốm Cổ Lò Bầu Bát Tràng",
      destination: "Làng Cổ Bát Tràng - Gia Lâm",
      provider: "Hợp Tác Xã Gốm Sứ Bát Tràng",
      amount: "80.000 đ",
      numericAmount: 80000,
      gateway: "MoMo",
      gatewayColor: "bg-pink-50 text-pink-700 border-pink-200",
      reason: "Du khách mua nhầm 2 lần vé do mạng di động bị nghẽn (Trùng đơn #TK-BT-4418).",
      providerConfirmation: "Hệ thống ghi nhận 2 giao dịch cùng 1 căn cước/số điện thoại trong 1 phút.",
      requestedAt: "09:05 - Hôm nay",
      slaTimeLeft: "Còn 1 giờ 20 phút",
      isUrgent: false,
      status: "PENDING",
    },
  ]);

  // State Bảng lịch sử giao dịch toàn sàn
  const [transactions, setTransactions] = useState([
    {
      id: "TX-9901",
      orderCode: "ORD-2026-8812",
      customer: "Nguyễn Minh Châu",
      tour: "Tour Đêm Văn Miếu: Đạo Học Thăng Long",
      provider: "BQL Di tích Văn Miếu",
      gateway: "VNPay",
      gatewayColor: "bg-blue-50 text-blue-700 border-blue-200",
      amount: "199.000 đ",
      date: "09:42 - 09/09/2026",
      status: "SUCCESS",
      statusLabel: "Thành công",
      statusBadge: "bg-emerald-50 text-emerald-700 border-emerald-300",
    },
    {
      id: "TX-9900",
      orderCode: "ORD-2026-8811",
      customer: "Trần Anh Đức",
      tour: "Vé Tham Quan Hoàng Thành Thăng Long & Hầm Khảo Cổ",
      provider: "BQL Hoàng Thành Thăng Long",
      gateway: "MoMo",
      gatewayColor: "bg-pink-50 text-pink-700 border-pink-200",
      amount: "70.000 đ",
      date: "09:35 - 09/09/2026",
      status: "SUCCESS",
      statusLabel: "Thành công",
      statusBadge: "bg-emerald-50 text-emerald-700 border-emerald-300",
    },
    {
      id: "TX-9899",
      orderCode: "ORD-2026-8805",
      customer: "Vũ Hải Yến",
      tour: "Hành Trình Khảo Cổ & Du Thuyền Tràng An Cổ",
      provider: "Doanh nghiệp Xuân Trường (KDL Tràng An)",
      gateway: "ZaloPay",
      gatewayColor: "bg-sky-50 text-sky-700 border-sky-200",
      amount: "250.000 đ",
      date: "08:50 - 09/09/2026",
      status: "SUCCESS",
      statusLabel: "Thành công",
      statusBadge: "bg-emerald-50 text-emerald-700 border-emerald-300",
    },
    {
      id: "TX-9898",
      orderCode: "ORD-2026-8790",
      customer: "Đoàn Văn Hậu",
      tour: "Vé Tham Quan Tháp Rùa - Hồ Hoàn Kiếm",
      provider: "BQL Khu Vực Hồ Hoàn Kiếm",
      gateway: "VNPay",
      gatewayColor: "bg-blue-50 text-blue-700 border-blue-200",
      amount: "180.000 đ",
      date: "16:20 - 08/09/2026",
      status: "REFUNDED",
      statusLabel: "Đã hoàn tiền",
      statusBadge: "bg-rose-50 text-rose-700 border-rose-300",
    },
    {
      id: "TX-9897",
      orderCode: "ORD-2026-8782",
      customer: "Phạm Thúy Hằng",
      tour: "Vé Lò Bầu Bát Tràng & Workshop Gốm",
      provider: "HTX Gốm Sứ Bát Tràng",
      gateway: "MoMo",
      gatewayColor: "bg-pink-50 text-pink-700 border-pink-200",
      amount: "120.000 đ",
      date: "14:15 - 08/09/2026",
      status: "SUCCESS",
      statusLabel: "Thành công",
      statusBadge: "bg-emerald-50 text-emerald-700 border-emerald-300",
    },
    {
      id: "TX-9896",
      orderCode: "ORD-2026-8770",
      customer: "Ngô Quốc Bảo",
      tour: "Vé Thuyền Thăm Động Am Tiên (Tuyệt Tịnh Cốc)",
      provider: "BQL Di tích Cố Đô Hoa Lư",
      gateway: "ZaloPay",
      gatewayColor: "bg-sky-50 text-sky-700 border-sky-200",
      amount: "100.000 đ",
      date: "11:00 - 08/09/2026",
      status: "FAILED",
      statusLabel: "Thất bại (Timeout)",
      statusBadge: "bg-slate-100 text-slate-600 border-slate-300",
    },
  ]);

  // State Toast & Modal
  const [toastMsg, setToastMsg] = useState("");
  const [rejectingItem, setRejectingItem] = useState(null);
  const [rejectReason, setRejectReason] = useState("");

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 4000);
  };

  // Xử lý thực hiện hoàn tiền qua cổng
  const handleExecuteRefund = (item) => {
    // Giả lập gọi API cổng thanh toán VNPay / MoMo
    setRefundQueue((prev) => prev.filter((q) => q.id !== item.id));

    // Thêm bản ghi mới vào lịch sử
    const newTx = {
      id: `TX-${Math.floor(1000 + Math.random() * 9000)}`,
      orderCode: item.ticketCode,
      customer: item.customerName,
      tour: item.tourName,
      provider: item.provider,
      gateway: item.gateway,
      gatewayColor: item.gatewayColor,
      amount: item.amount,
      date: "Vừa xong (09/09/2026)",
      status: "REFUNDED",
      statusLabel: "Đã hoàn tiền qua API",
      statusBadge: "bg-rose-50 text-rose-700 border-rose-300",
    };
    setTransactions((prev) => [newTx, ...prev]);

    showToast(
      `Đã kích hoạt API ${item.gateway}: Hoàn trả thành công ${item.amount} cho du khách ${item.customerName}!`
    );
  };

  // Mở modal bác bỏ
  const handleOpenRejectModal = (item) => {
    setRejectingItem(item);
    setRejectReason("");
  };

  // Xác nhận bác bỏ
  const handleConfirmReject = () => {
    if (!rejectingItem) return;
    setRefundQueue((prev) => prev.filter((q) => q.id !== rejectingItem.id));
    showToast(
      `Đã bác bỏ yêu cầu hoàn tiền của du khách ${rejectingItem.customerName}. Lý do: ${
        rejectReason || "Không đủ điều kiện hoàn vé theo quy định."
      }`
    );
    setRejectingItem(null);
  };

  // Xuất file báo cáo đối soát Excel
  const handleExportExcel = () => {
    showToast(
      "Đang kết xuất tệp Báo cáo Đối soát Tài chính & Doanh thu Sàn (Tháng 09/2026)... Tệp Excel sẽ tự động tải về."
    );
  };

  // Lọc danh sách giao dịch
  const filteredTransactions = transactions.filter((tx) => {
    if (gatewayFilter !== "all" && tx.gateway !== gatewayFilter) return false;
    if (statusFilter !== "all" && tx.status !== statusFilter) return false;

    const q = searchQuery.toLowerCase().trim();
    if (q) {
      const matchId = tx.id.toLowerCase().includes(q);
      const matchOrder = tx.orderCode.toLowerCase().includes(q);
      const matchCust = tx.customer.toLowerCase().includes(q);
      const matchTour = tx.tour.toLowerCase().includes(q);
      const matchProv = tx.provider.toLowerCase().includes(q);
      if (!matchId && !matchOrder && !matchCust && !matchTour && !matchProv) return false;
    }

    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-200">
      {/* Toast thông báo */}
      {toastMsg && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl border border-slate-700 text-xs font-bold flex items-center gap-2.5 animate-in slide-in-from-top-3 max-w-md">
          <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header trang quản lý tài chính */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
              <span className="text-[11px] font-black uppercase tracking-wider text-emerald-700">
                Tài Chính & Đối Soát Sàn
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Quản Lý Dòng Tiền & Xử Lý Hoàn Tiền Vé
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Kiểm soát doanh thu toàn sàn, trích phí hoa hồng tự động, điều phối dòng tiền cho đối tác và giải quyết các khiếu nại hoàn tiền.
            </p>
          </div>

          <div className="flex items-center gap-2.5 self-start sm:self-auto">
            <button
              type="button"
              onClick={handleExportExcel}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2 shadow-2xs transition-colors cursor-pointer"
            >
              <Download size={14} />
              <span>Xuất Báo Cáo Đối Soát (Excel)</span>
            </button>
          </div>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────
          1. KHỐI TỔNG HỢP DÒNG TIỀN (FINANCIAL CARDS)
      ──────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Thẻ 1: Tổng tiền thanh toán qua cổng (GMV) */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/85 shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Tổng Tiền Thanh Toán (GMV)
              </p>
              <p className="text-2xl sm:text-3xl font-black text-slate-900 mt-2 tracking-tight">
                1.845.000.000 <span className="text-base font-bold text-slate-400">đ</span>
              </p>
            </div>
            <div className="p-2.5 rounded-xl border bg-emerald-50 text-emerald-700 border-emerald-200">
              <CircleDollarSign size={20} />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">Tháng 09/2026</span>
            <span className="font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full text-[11px]">
              +21.4% GMV
            </span>
          </div>
        </div>

        {/* Thẻ 2: Doanh thu thực giữ lại của Sàn (10% Commission) */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/85 shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Hoa Hồng Sàn (10% Commission)
              </p>
              <p className="text-2xl sm:text-3xl font-black text-teal-700 mt-2 tracking-tight">
                184.500.000 <span className="text-base font-bold text-teal-400">đ</span>
              </p>
            </div>
            <div className="p-2.5 rounded-xl border bg-teal-50 text-teal-700 border-teal-200">
              <Receipt size={20} />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">Doanh thu giữ lại</span>
            <span className="font-bold text-teal-700 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-full text-[11px]">
              Lợi nhuận ròng
            </span>
          </div>
        </div>

        {/* Thẻ 3: Doanh thu đã đối soát chi trả cho Content Provider */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/85 shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Đã Chi Trả Cho Đối Tác (90%)
              </p>
              <p className="text-2xl sm:text-3xl font-black text-sky-700 mt-2 tracking-tight">
                1.620.500.000 <span className="text-base font-bold text-sky-400">đ</span>
              </p>
            </div>
            <div className="p-2.5 rounded-xl border bg-sky-50 text-sky-700 border-sky-200">
              <Landmark size={20} />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">85 Content Provider</span>
            <span className="font-bold text-sky-700 bg-sky-50 border border-sky-200 px-2 py-0.5 rounded-full text-[11px]">
              Đã quyết toán
            </span>
          </div>
        </div>

        {/* Thẻ 4: Quỹ dự phòng & Hoàn tiền (Pending Refunds) */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/85 shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Quỹ Dự Phòng & Hoàn Tiền
              </p>
              <p className="text-2xl sm:text-3xl font-black text-rose-700 mt-2 tracking-tight">
                40.000.000 <span className="text-base font-bold text-rose-400">đ</span>
              </p>
            </div>
            <div className="p-2.5 rounded-xl border bg-rose-50 text-rose-700 border-rose-200">
              <ShieldAlert size={20} />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">Đang giữ an toàn</span>
            <span className="font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full text-[11px]">
              {refundQueue.length} lệnh chờ duyệt
            </span>
          </div>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────
          2. KHU VỰC XỬ LÝ LỆNH HOÀN TIỀN (REFUND MANAGEMENT QUEUE)
          Trọng tâm đồ án bảo vệ quyền lợi du khách
      ──────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 flex items-center justify-center font-bold">
              <AlertTriangle size={18} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-black text-slate-900 tracking-tight">
                  Hàng Chờ Xử Lý Lệnh Hoàn Tiền Vé (Refund Queue)
                </h2>
                <span className="bg-rose-100 text-rose-800 text-[10.5px] font-black px-2.5 py-0.5 rounded-full border border-rose-200">
                  {refundQueue.length} yêu cầu khẩn
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Các sự cố di tích đóng cửa hoặc lỗi giao dịch cần Quản trị viên kích hoạt hoàn tiền tự động qua cổng
              </p>
            </div>
          </div>
        </div>

        {/* Danh sách 2 ca hoàn tiền */}
        <div className="p-5 sm:p-6 space-y-4">
          {refundQueue.length === 0 ? (
            <div className="py-10 text-center text-slate-400 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              <CheckCircle2 size={36} className="mx-auto text-emerald-500 mb-2" />
              <p className="text-sm font-bold text-slate-800">
                Tuyệt vời! Không còn lệnh hoàn tiền nào tồn đọng.
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                Tất cả khiếu nại đã được giải quyết hoặc đối soát hoàn tất.
              </p>
            </div>
          ) : (
            refundQueue.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200 hover:border-slate-300 hover:bg-white transition-all space-y-3"
              >
                {/* Header ca hoàn tiền */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono font-black text-xs text-rose-700 bg-rose-100/80 px-2 py-0.5 rounded-md border border-rose-200">
                      {item.id}
                    </span>
                    <span className="font-mono text-xs font-semibold text-slate-500">
                      Mã vé: {item.ticketCode}
                    </span>
                    <span
                      className={`text-[10.5px] font-bold px-2 py-0.5 rounded-md border ${item.gatewayColor}`}
                    >
                      Cổng {item.gateway}
                    </span>
                    {item.isUrgent && (
                      <span className="text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Clock size={11} />
                        SLA: {item.slaTimeLeft}
                      </span>
                    )}
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-slate-400">Số tiền yêu cầu hoàn:</span>
                    <span className="text-lg font-black text-rose-600 ml-2">
                      {item.amount}
                    </span>
                  </div>
                </div>

                {/* Chi tiết nội dung ca */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 text-xs pt-1">
                  <div className="md:col-span-4 p-3 bg-white rounded-xl border border-slate-150 space-y-1">
                    <p className="text-slate-400">Du khách khiếu nại:</p>
                    <p className="font-bold text-slate-900 text-sm">{item.customerName}</p>
                    <p className="text-slate-500 font-mono text-[11px]">{item.customerPhone}</p>
                    <p className="text-slate-400 text-[10.5px] mt-1">Gửi lúc: {item.requestedAt}</p>
                  </div>

                  <div className="md:col-span-8 p-3 bg-white rounded-xl border border-slate-150 space-y-2">
                    <div>
                      <span className="text-slate-400">Lộ trình / Dịch vụ di tích:</span>
                      <p className="font-bold text-slate-800">{item.tourName}</p>
                      <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                        <Building2 size={12} className="text-slate-400" />
                        {item.provider}
                      </p>
                    </div>

                    <div className="p-2.5 bg-rose-50/60 rounded-lg border border-rose-100 text-slate-700">
                      <span className="font-bold text-rose-900">Lý do du khách: </span>
                      <span>"{item.reason}"</span>
                    </div>

                    <div className="p-2.5 bg-emerald-50/70 rounded-lg border border-emerald-100 text-slate-700 flex items-center gap-1.5">
                      <ShieldCheck size={14} className="text-emerald-600 shrink-0" />
                      <span className="text-emerald-950 font-medium">
                        {item.providerConfirmation}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Hộp thao tác của Admin */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200/80">
                  <span className="text-[11px] text-slate-400 font-medium">
                    Hành động sẽ tự động cập nhật số dư đối soát của đối tác và hoàn trả trực tiếp về ví du khách.
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleOpenRejectModal(item)}
                      className="px-3 py-1.5 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-bold transition-colors cursor-pointer"
                    >
                      Bác bỏ yêu cầu
                    </button>

                    <button
                      type="button"
                      onClick={() => handleExecuteRefund(item)}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <Check size={14} />
                      <span>Thực hiện Hoàn tiền qua Cổng</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────
          3. BẢNG LỊCH SỬ THANH TOÁN TOÀN SÀN (PAYMENT HISTORY)
      ──────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
        {/* Header bảng & Bộ lọc */}
        <div className="p-5 sm:p-6 border-b border-slate-100 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-black text-slate-900 tracking-tight">
                Nhật Ký Giao Dịch & Thanh Toán Toàn Sàn
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Tra cứu mọi khoản thanh toán vé trải nghiệm, tiền hoàn và giao dịch trực tuyến
              </p>
            </div>

            {/* Lọc khoảng thời gian */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl self-start sm:self-auto text-xs font-bold text-slate-600">
              <button
                type="button"
                onClick={() => setDateFilter("today")}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  dateFilter === "today" ? "bg-white text-slate-900 shadow-2xs" : "hover:text-slate-900"
                }`}
              >
                Hôm nay
              </button>
              <button
                type="button"
                onClick={() => setDateFilter("week")}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  dateFilter === "week" ? "bg-white text-slate-900 shadow-2xs" : "hover:text-slate-900"
                }`}
              >
                7 ngày qua
              </button>
              <button
                type="button"
                onClick={() => setDateFilter("month")}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  dateFilter === "month" ? "bg-white text-slate-900 shadow-2xs" : "hover:text-slate-900"
                }`}
              >
                Tháng 09/2026
              </button>
            </div>
          </div>

          {/* Bộ lọc cổng thanh toán, trạng thái & tìm kiếm */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-1">
            {/* Lọc Cổng */}
            <div className="sm:col-span-3">
              <select
                value={gatewayFilter}
                onChange={(e) => setGatewayFilter(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              >
                <option value="all">Tất cả Cổng thanh toán</option>
                <option value="VNPay">Cổng VNPay</option>
                <option value="MoMo">Cổng MoMo</option>
                <option value="ZaloPay">Cổng ZaloPay</option>
              </select>
            </div>

            {/* Lọc Trạng thái */}
            <div className="sm:col-span-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              >
                <option value="all">Tất cả Trạng thái</option>
                <option value="SUCCESS">Thành công (Success)</option>
                <option value="REFUNDED">Đã hoàn tiền (Refunded)</option>
                <option value="FAILED">Thất bại (Failed)</option>
              </select>
            </div>

            {/* Ô tìm kiếm */}
            <div className="sm:col-span-6 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Search size={14} />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm mã đơn, tên du khách, tour di tích..."
                className="w-full pl-8.5 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
          </div>
        </div>

        {/* Bảng danh sách */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-[10.5px] font-bold uppercase text-slate-500 tracking-wider">
                <th className="py-3 px-4">MÃ GIAO DỊCH</th>
                <th className="py-3 px-4">THỜI GIAN</th>
                <th className="py-3 px-4">DU KHÁCH</th>
                <th className="py-3 px-4">DỊCH VỤ & DI TÍCH</th>
                <th className="py-3 px-3">CỔNG</th>
                <th className="py-3 px-3">SỐ TIỀN</th>
                <th className="py-3 px-4 text-right">TRẠNG THÁI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    <p className="text-sm font-semibold">Không tìm thấy giao dịch phù hợp.</p>
                    <p className="text-xs mt-1">Hãy thử xóa bộ lọc tìm kiếm.</p>
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* Cột 1: Mã */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <p className="font-mono font-bold text-slate-900">{tx.id}</p>
                      <p className="font-mono text-[10.5px] text-slate-400 mt-0.5">{tx.orderCode}</p>
                    </td>

                    {/* Cột 2: Thời gian */}
                    <td className="py-3.5 px-4 whitespace-nowrap text-slate-500 font-mono text-[11px]">
                      {tx.date}
                    </td>

                    {/* Cột 3: Du khách */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <p className="font-bold text-slate-900">{tx.customer}</p>
                    </td>

                    {/* Cột 4: Dịch vụ & Di tích */}
                    <td className="py-3.5 px-4 max-w-xs">
                      <p className="font-semibold text-slate-800 truncate" title={tx.tour}>
                        {tx.tour}
                      </p>
                      <p className="text-[10.5px] text-slate-400 mt-0.5 truncate" title={tx.provider}>
                        {tx.provider}
                      </p>
                    </td>

                    {/* Cột 5: Cổng */}
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-md text-[10.5px] font-bold border ${tx.gatewayColor}`}
                      >
                        {tx.gateway}
                      </span>
                    </td>

                    {/* Cột 6: Số tiền */}
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <span className="font-black text-slate-900 text-xs">
                        {tx.amount}
                      </span>
                    </td>

                    {/* Cột 7: Trạng thái */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10.5px] font-bold border ${tx.statusBadge}`}
                      >
                        {tx.status === "SUCCESS" && <CheckCircle2 size={11} />}
                        {tx.status === "REFUNDED" && <RotateCcwIcon size={11} />}
                        {tx.status === "FAILED" && <XCircle size={11} />}
                        <span>{tx.statusLabel}</span>
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer bảng */}
        <div className="p-4 bg-slate-50/80 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500">
          <span>
            Đang hiển thị <strong>{filteredTransactions.length}</strong> giao dịch mới nhất
          </span>
          <span className="text-[11px] text-emerald-700 font-semibold">
            ● Chu kỳ đối soát: Hàng ngày 23:59 (T+1)
          </span>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────
          MODAL BÁC BỎ YÊU CẦU HOÀN TIỀN
      ──────────────────────────────────────────────────────── */}
      {rejectingItem && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
          onClick={() => setRejectingItem(null)}
        >
          <div
            className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 space-y-4 animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-rose-600">
                <AlertTriangle size={18} />
                <h3 className="text-base font-black text-slate-900">
                  Bác Bỏ Yêu Cầu Hoàn Tiền
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setRejectingItem(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-600">
              <p>
                Bạn đang từ chối yêu cầu hoàn tiền vé{" "}
                <strong>{rejectingItem.ticketCode}</strong> của du khách{" "}
                <strong>{rejectingItem.customerName}</strong> ({rejectingItem.amount}).
              </p>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px] mb-1.5">
                  Lý do từ chối (sẽ gửi qua SMS/Email cho du khách):
                </label>
                <textarea
                  rows={3}
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="Nhập lý do không thể hoàn trả (Ví dụ: Du khách đã quét mã check-in sử dụng dịch vụ tại cổng...)"
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setRejectingItem(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
              >
                Đóng
              </button>
              <button
                type="button"
                onClick={handleConfirmReject}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition-colors cursor-pointer shadow-xs"
              >
                Xác nhận Bác bỏ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Icon phụ trợ quay vòng
function RotateCcwIcon({ size = 12, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
    </svg>
  );
}
