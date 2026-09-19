"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldAlert,
  Search,
  Filter,
  Download,
  Calendar,
  Activity,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Eye,
  X,
  Clock,
  User,
  Crown,
  Building2,
  Bot,
  Server,
  FileCode,
  Laptop,
  Terminal,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

/**
 * Trang Nhật Ký Kiểm Toán & Truy Vết Hoạt Động Toàn Hệ Thống (System Audit Log)
 * Đường dẫn: /admin/audit-logs
 */
export default function AdminAuditLogsPage() {
  // State Bộ lọc
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all"); // 'all' | 'admin' | 'moderator' | 'provider' | 'system'
  const [riskFilter, setRiskFilter] = useState("all"); // 'all' | 'INFO' | 'WARNING' | 'CRITICAL'
  const [dateRange, setDateRange] = useState("today"); // 'today' | 'week' | 'month'

  // State Modal xem Payload JSON / Before-After Diff
  const [selectedLog, setSelectedLog] = useState(null);
  const [toastMsg, setToastMsg] = useState("");

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3500);
  };

  // 5 Bản ghi kiểm toán mẫu thực tế chuẩn di sản
  const [auditLogs] = useState([
    {
      id: "LOG-9921",
      timestamp: "09:42:15 - 09/09/2026",
      actor: {
        name: "Trần Văn Bình",
        email: "binh.tv@vietculture.vn",
        avatarLetter: "TB",
        avatarBg: "bg-teal-600 text-white",
        role: "moderator",
        roleLabel: "Content Moderator",
        roleBadge: "bg-teal-50 text-teal-800 border-teal-200",
      },
      action: "Phê duyệt điểm đến & GPS",
      actionBadge: "bg-emerald-50 text-emerald-800 border-emerald-200",
      targetEntity: "#HS-2026-089 (Văn Miếu - Quốc Tử Giám)",
      entityType: "destination",
      ipAddress: "118.70.124.85",
      device: "Chrome 128 / macOS 14",
      riskLevel: "INFO",
      riskLabel: "Thành công (Info)",
      riskBadge: "bg-emerald-50 text-emerald-700 border-emerald-300",
      description:
        "Kiểm duyệt viên Trần Văn Bình phê duyệt hồ sơ điểm di tích Văn Miếu sau khi kiểm định tọa độ GPS và câu hỏi trắc nghiệm.",
      payload: {
        before: {
          status: "PENDING_AUDIT",
          gpsValidated: false,
          publishedAt: null,
          gamificationPoints: 0,
        },
        after: {
          status: "PUBLISHED",
          gpsValidated: true,
          coordinates: "21.028511° N, 105.835520° E",
          publishedAt: "2026-09-09T09:42:15Z",
          gamificationPoints: 50,
        },
      },
    },
    {
      id: "LOG-9920",
      timestamp: "09:18:40 - 09/09/2026",
      actor: {
        name: "BQL Hoàng Thành Thăng Long",
        email: "bql@hoangthanh.hanoi.gov.vn",
        avatarLetter: "HT",
        avatarBg: "bg-amber-600 text-white",
        role: "provider",
        roleLabel: "Content Provider",
        roleBadge: "bg-amber-50 text-amber-800 border-amber-200",
      },
      action: "Cập nhật giá vé trải nghiệm",
      actionBadge: "bg-amber-50 text-amber-800 border-amber-200",
      targetEntity: "Tour #TR-8812 (Khảo Cổ Hoàng Thành)",
      entityType: "route",
      ipAddress: "113.190.23.12",
      device: "Edge 127 / Windows 11",
      riskLevel: "WARNING",
      riskLabel: "Cảnh báo (Warning)",
      riskBadge: "bg-amber-50 text-amber-800 border-amber-300",
      description:
        "BQL Hoàng Thành thay đổi biểu phí vé tham quan ban đêm từ 70.000 đ lên 80.000 đ (Tăng 14.2%). Hệ thống tự động gửi thông báo kiểm toán.",
      payload: {
        before: {
          tourPrice: 70000,
          currency: "VND",
          adjustedBy: "BQL Hoàng Thành",
          lastUpdated: "2026-08-15T14:00:00Z",
        },
        after: {
          tourPrice: 80000,
          currency: "VND",
          adjustedBy: "BQL Hoàng Thành (Phê chuẩn theo QĐ số 44/VHTT)",
          lastUpdated: "2026-09-09T09:18:40Z",
        },
      },
    },
    {
      id: "LOG-9919",
      timestamp: "08:55:02 - 09/09/2026",
      actor: {
        name: "Lê Hoàng Quân",
        email: "quan.lh@vietculture.vn",
        avatarLetter: "LQ",
        avatarBg: "bg-purple-900 text-white",
        role: "admin",
        roleLabel: "Administrator",
        roleBadge: "bg-purple-50 text-purple-800 border-purple-200 font-bold",
      },
      action: "Thực hiện hoàn tiền qua Cổng",
      actionBadge: "bg-rose-50 text-rose-800 border-rose-200",
      targetEntity: "Đơn #TK-HT-8821 (Khách: Trần Mai Anh)",
      entityType: "refund",
      ipAddress: "14.232.180.44",
      device: "Chrome 128 / Windows 11",
      riskLevel: "CRITICAL",
      riskLabel: "Nghiêm trọng (Critical)",
      riskBadge: "bg-rose-50 text-rose-700 border-rose-300",
      description:
        "Quản trị viên trưởng kích hoạt lệnh API hoàn trả 200.000 đ qua cổng VNPay do di tích Hoàng Thành đóng cửa tiếp đoàn ngoại giao.",
      payload: {
        before: {
          refundStatus: "PENDING_ADMIN_APPROVAL",
          ticketStatus: "CLAIMED_ISSUE",
          refundedAmount: 0,
        },
        after: {
          refundStatus: "COMPLETED",
          ticketStatus: "REFUNDED",
          refundedAmount: 200000,
          gatewayRefId: "VNPAY-REF-20260909-085501",
          executedByAdmin: "Lê Hoàng Quân (ID: USR-006)",
        },
      },
    },
    {
      id: "LOG-9918",
      timestamp: "08:22:11 - 09/09/2026",
      actor: {
        name: "Trần Văn Bình",
        email: "binh.tv@vietculture.vn",
        avatarLetter: "TB",
        avatarBg: "bg-teal-600 text-white",
        role: "moderator",
        roleLabel: "Content Moderator",
        roleBadge: "bg-teal-50 text-teal-800 border-teal-200",
      },
      action: "Can thiệp tri thức AI (Ground Truth)",
      actionBadge: "bg-indigo-50 text-indigo-800 border-indigo-200",
      targetEntity: "#AI-FLAG-101 (Niên đại Bia Tiến sĩ số 3)",
      entityType: "ai_guard",
      ipAddress: "118.70.124.85",
      device: "Chrome 128 / macOS 14",
      riskLevel: "WARNING",
      riskLabel: "Cảnh báo (Warning)",
      riskBadge: "bg-amber-50 text-amber-800 border-amber-300",
      description:
        "Hiệu đính tri thức cho mô hình AI Guide: Thay vua Lê Thái Tổ thành vua Lê Nhân Tông cho khoa thi năm Đại Bảo thứ 3 (1442) & Thái Hòa năm 1448.",
      payload: {
        before: {
          aiAnswer: "Bia số 3 được dựng dưới triều vua Lê Thái Tổ...",
          isFlagged: true,
          modelWeight: 0.94,
        },
        after: {
          aiAnswer: "Bia số 3 được khắc năm 1484 triều vua Lê Thánh Tông ghi danh tiến sĩ khoa thi 1448 triều vua Lê Nhân Tông.",
          isFlagged: false,
          modelWeight: 1.0,
          approvedByGroundTruth: "Trần Văn Bình",
        },
      },
    },
    {
      id: "LOG-9917",
      timestamp: "04:00:00 - 09/09/2026",
      actor: {
        name: "Hệ Thống Tự Động (Cron Daemon)",
        email: "backup-daemon@vietculture.internal",
        avatarLetter: "SYS",
        avatarBg: "bg-slate-800 text-white",
        role: "system",
        roleLabel: "System / AI Guard",
        roleBadge: "bg-slate-100 text-slate-700 border-slate-200 font-mono",
      },
      action: "Sao lưu cơ sở dữ liệu định kỳ",
      actionBadge: "bg-sky-50 text-sky-800 border-sky-200",
      targetEntity: "Cluster DB Snapshot #SNAP-20260909",
      entityType: "system",
      ipAddress: "10.0.4.15 (Internal VPC)",
      device: "Linux 6.1 / Node Worker",
      riskLevel: "INFO",
      riskLabel: "Thành công (Info)",
      riskBadge: "bg-emerald-50 text-emerald-700 border-emerald-300",
      description:
        "Hệ thống tự động thực hiện snapshot toàn bộ cơ sở dữ liệu PostgreSQL di sản và đẩy lên kho lưu trữ đám mây mã hóa AES-256.",
      payload: {
        before: {
          lastSnapshot: "2026-09-08T04:00:00Z",
          sizeBytes: "4.82 GB",
        },
        after: {
          lastSnapshot: "2026-09-09T04:00:00Z",
          sizeBytes: "4.94 GB",
          checksumSHA256: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
          status: "SUCCESS_VERIFIED",
        },
      },
    },
  ]);

  // Bộ lọc dữ liệu
  const filteredLogs = auditLogs.filter((log) => {
    // 1. Lọc theo vai trò
    if (roleFilter !== "all" && log.actor.role !== roleFilter) return false;

    // 2. Lọc theo mức độ rủi ro
    if (riskFilter !== "all" && log.riskLevel !== riskFilter) return false;

    // 3. Tìm kiếm
    const q = searchQuery.toLowerCase().trim();
    if (q) {
      const matchActor = log.actor.name.toLowerCase().includes(q);
      const matchEmail = log.actor.email.toLowerCase().includes(q);
      const matchAction = log.action.toLowerCase().includes(q);
      const matchTarget = log.targetEntity.toLowerCase().includes(q);
      const matchIp = log.ipAddress.toLowerCase().includes(q);
      const matchId = log.id.toLowerCase().includes(q);
      if (!matchActor && !matchEmail && !matchAction && !matchTarget && !matchIp && !matchId) {
        return false;
      }
    }

    return true;
  });

  // Tải xuống file CSV
  const handleDownloadCSV = () => {
    showToast("Đang kết xuất tệp Nhật ký Kiểm toán An ninh (audit_logs_2026.csv)...");
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
          1. HEADER & BỘ LỌC TRUY VẾT AN NINH (SECURITY AUDIT HEADER)
      ──────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-600" />
              <span className="text-[11px] font-black uppercase tracking-wider text-rose-700">
                An Toàn & Truy Vết Hệ Thống
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Nhật Ký Kiểm Toán & Truy Vết Hoạt Động Toàn Hệ Thống (System Audit Log)
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-3xl leading-relaxed">
              Ghi vết thời gian thực mọi thao tác quản trị, phân quyền, phê duyệt nội dung và biến động giao dịch để đảm bảo tính an toàn, minh bạch của nền tảng.
            </p>
          </div>

          {/* Nút tải xuống CSV */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              type="button"
              onClick={handleDownloadCSV}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2 shadow-2xs transition-colors cursor-pointer"
            >
              <Download size={14} />
              <span>Tải xuống Bản ghi (.CSV)</span>
            </button>
          </div>
        </div>

        {/* Bộ lọc tìm kiếm đa năng */}
        <div className="pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-12 gap-3">
          {/* Ô tìm kiếm */}
          <div className="sm:col-span-5 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Search size={14} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm IP, tên tài khoản, mã hồ sơ (#HS-...), giao dịch..."
              className="w-full pl-8.5 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20"
            />
          </div>

          {/* Lọc Vai trò */}
          <div className="sm:col-span-3">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20"
            >
              <option value="all">Tất cả vai trò thực hiện</option>
              <option value="admin">Administrator (Quản trị viên)</option>
              <option value="moderator">Content Moderator (Kiểm duyệt viên)</option>
              <option value="provider">Content Provider (Đối tác điểm đến)</option>
              <option value="system">Hệ thống tự động / AI Guard</option>
            </select>
          </div>

          {/* Lọc Mức độ rủi ro */}
          <div className="sm:col-span-2">
            <select
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20"
            >
              <option value="all">Tất cả mức độ</option>
              <option value="INFO">Thông thường (Info)</option>
              <option value="WARNING">Cảnh báo (Warning)</option>
              <option value="CRITICAL">Nghiêm trọng (Critical)</option>
            </select>
          </div>

          {/* Khoảng ngày */}
          <div className="sm:col-span-2">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20"
            >
              <option value="today">Hôm nay</option>
              <option value="week">7 ngày qua</option>
              <option value="month">30 ngày qua</option>
            </select>
          </div>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────
          2. THỐNG KÊ NHANH SỰ CỐ & HOẠT ĐỘNG (3 THẺ MINI CARDS)
      ──────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Thẻ 1: Tổng sự kiện hôm nay */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Tổng sự kiện hôm nay
            </p>
            <p className="text-2xl font-black text-slate-900 mt-1">1,842 lượt</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Lưu vết bất biến (Immutable log)</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-100 text-slate-800 border border-slate-200">
            <Activity size={20} />
          </div>
        </div>

        {/* Thẻ 2: Thao tác thẩm định của Moderator */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Thao tác thẩm định của Moderator
            </p>
            <p className="text-2xl font-black text-teal-700 mt-1">54 lượt</p>
            <p className="text-[11px] text-teal-600 font-medium mt-0.5">Duyệt GPS, câu hỏi & ảnh</p>
          </div>
          <div className="p-3 rounded-xl bg-teal-50 text-teal-700 border border-teal-200">
            <ShieldCheck size={20} />
          </div>
        </div>

        {/* Thẻ 3: Cảnh báo bất thường */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Đăng nhập bất thường / Đổi pass
            </p>
            <p className="text-2xl font-black text-emerald-600 mt-1">0 sự cố</p>
            <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 font-bold mt-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Hệ thống an toàn</span>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 size={20} />
          </div>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────
          3. BẢNG NHẬT KÝ KIỂM TOÁN CHI TIẾT (AUDIT TRAIL TABLE)
      ──────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-[10.5px] font-bold uppercase text-slate-500 tracking-wider">
                <th className="py-3.5 px-4">THỜI GIAN</th>
                <th className="py-3.5 px-4">TÁC NHÂN (ACTOR)</th>
                <th className="py-3.5 px-4">HÀNH ĐỘNG (ACTION)</th>
                <th className="py-3.5 px-4">ĐỐI TƯỢNG TÁC ĐỘNG</th>
                <th className="py-3.5 px-3">ĐỊA CHỈ IP & THIẾT BỊ</th>
                <th className="py-3.5 px-3">TRẠNG THÁI / MỨC ĐỘ</th>
                <th className="py-3.5 px-4 text-right">CHI TIẾT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    <p className="text-sm font-semibold">Không tìm thấy bản ghi kiểm toán phù hợp.</p>
                    <p className="text-xs mt-1">Hãy thử xóa bộ lọc tìm kiếm.</p>
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* Cột 1: THỜI GIAN */}
                    <td className="py-3.5 px-4 whitespace-nowrap text-slate-500 font-mono text-[11px]">
                      <div className="flex items-center gap-1.5">
                        <Clock size={12} className="text-slate-400" />
                        <span>{log.timestamp}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono mt-0.5 block">
                        {log.id}
                      </span>
                    </td>

                    {/* Cột 2: TÁC NHÂN (ACTOR) */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-7 h-7 rounded-lg ${log.actor.avatarBg} font-black text-[10.5px] flex items-center justify-center shrink-0 shadow-2xs`}
                        >
                          {log.actor.avatarLetter}
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-slate-900 text-xs truncate">
                            {log.actor.name}
                          </p>
                          <span
                            className={`inline-block px-1.5 py-0.2 rounded text-[9.5px] font-bold border mt-0.5 ${log.actor.roleBadge}`}
                          >
                            {log.actor.roleLabel}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Cột 3: HÀNH ĐỘNG (ACTION) */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-md text-[10.5px] font-bold border ${log.actionBadge}`}
                      >
                        {log.action}
                      </span>
                    </td>

                    {/* Cột 4: ĐỐI TƯỢNG TÁC ĐỘNG */}
                    <td className="py-3.5 px-4 max-w-xs">
                      <p className="font-semibold text-slate-800 text-xs truncate" title={log.targetEntity}>
                        {log.targetEntity}
                      </p>
                      <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                        {log.description}
                      </p>
                    </td>

                    {/* Cột 5: ĐỊA CHỈ IP & THIẾT BỊ */}
                    <td className="py-3.5 px-3 whitespace-nowrap text-slate-600 font-mono text-[11px]">
                      <div>{log.ipAddress}</div>
                      <span className="text-[10px] text-slate-400 font-sans block mt-0.5">
                        {log.device}
                      </span>
                    </td>

                    {/* Cột 6: TRẠNG THÁI / MỨC ĐỘ */}
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10.5px] font-bold border ${log.riskBadge}`}
                      >
                        {log.riskLevel === "INFO" && <CheckCircle2 size={11} />}
                        {log.riskLevel === "WARNING" && <AlertTriangle size={11} />}
                        {log.riskLevel === "CRITICAL" && <XCircle size={11} />}
                        <span>{log.riskLabel}</span>
                      </span>
                    </td>

                    {/* Cột 7: CHI TIẾT (Nút xem Payload JSON) */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => setSelectedLog(log)}
                        className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] transition-colors cursor-pointer inline-flex items-center gap-1"
                        title="Xem chi tiết dữ liệu Before/After"
                      >
                        <FileCode size={13} />
                        <span>JSON Diff</span>
                      </button>
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
            Đang hiển thị <strong>{filteredLogs.length}</strong> sự kiện kiểm toán gần nhất
          </span>
          <span className="text-[11px] text-teal-700 font-semibold">
            ● Chuỗi khối SHA-256 mã hóa nhật ký truy vết
          </span>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────
          MODAL XEM PAYLOAD JSON & BEFORE / AFTER DIFF
      ──────────────────────────────────────────────────────── */}
      {selectedLog && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
          onClick={() => setSelectedLog(null)}
        >
          <div
            className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-6 space-y-4 animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header modal */}
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="font-mono text-xs font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                  {selectedLog.id}
                </span>
                <h3 className="text-base font-black text-slate-900 mt-1.5">
                  Chi Tiết Biến Động Dữ Liệu (Payload Diff)
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {selectedLog.action} • {selectedLog.timestamp}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedLog(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Thông tin ngữ cảnh */}
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Tác nhân thực hiện:</span>
                <span className="font-bold text-slate-900">
                  {selectedLog.actor.name} ({selectedLog.actor.email})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Đối tượng tác động:</span>
                <span className="font-semibold text-slate-800">{selectedLog.targetEntity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Địa chỉ IP & Môi trường:</span>
                <span className="font-mono font-medium text-slate-700">
                  {selectedLog.ipAddress} • {selectedLog.device}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Mức độ rủi ro:</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${selectedLog.riskBadge}`}>
                  {selectedLog.riskLabel}
                </span>
              </div>
            </div>

            {/* Khung so sánh Before / After (Diff View) */}
            <div>
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Terminal size={14} className="text-slate-600" />
                <span>So Sánh Trạng Thái (Before vs After):</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-[11px]">
                {/* Trạng thái trước (Before) */}
                <div className="p-3 bg-rose-50/70 rounded-xl border border-rose-200 text-rose-950 overflow-x-auto">
                  <div className="text-[10px] font-bold text-rose-700 uppercase tracking-wider pb-1 mb-2 border-b border-rose-200">
                    - Trước khi chỉnh sửa (Before)
                  </div>
                  <pre className="whitespace-pre-wrap leading-relaxed">
                    {JSON.stringify(selectedLog.payload.before, null, 2)}
                  </pre>
                </div>

                {/* Trạng thái sau (After) */}
                <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-200 text-emerald-950 overflow-x-auto">
                  <div className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider pb-1 mb-2 border-b border-emerald-200">
                    + Sau khi chỉnh sửa (After)
                  </div>
                  <pre className="whitespace-pre-wrap leading-relaxed">
                    {JSON.stringify(selectedLog.payload.after, null, 2)}
                  </pre>
                </div>
              </div>
            </div>

            {/* Mô tả chi tiết hành vi */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 leading-relaxed">
              <span className="font-bold text-slate-800">Biên bản ghi nhận: </span>
              <span>{selectedLog.description}</span>
            </div>

            {/* Nút đóng modal */}
            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedLog(null)}
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
              >
                Đóng chi tiết
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
