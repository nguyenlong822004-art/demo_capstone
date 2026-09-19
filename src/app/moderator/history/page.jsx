"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  History,
  Search,
  Filter,
  Download,
  Calendar,
  Eye,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  FileCheck,
  ShieldCheck,
  Building2,
  Clock,
  User,
  X,
  Compass,
  MapPin,
  Bot,
  Camera,
  ExternalLink,
  ChevronRight,
  TrendingUp,
} from "lucide-react";

/**
 * Trang Nhật Ký Thẩm Định & Truy Vết Hoạt Động (Audit Trail & History Page)
 * Đường dẫn: /moderator/history
 */
export default function ModeratorHistoryPage() {
  // State bộ lọc
  const [dateRange, setDateRange] = useState("week"); // 'today' | 'week' | 'month'
  const [decisionFilter, setDecisionFilter] = useState("all"); // 'all' | 'published' | 'revision' | 'ai'
  const [searchQuery, setSearchQuery] = useState("");

  // State Drawer xem lại chi tiết phiên bản lưu vết
  const [selectedLog, setSelectedLog] = useState(null);
  const [toastMsg, setToastMsg] = useState("");

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3500);
  };

  // Dữ liệu mẫu lịch sử thẩm định chi tiết chuẩn di sản Việt Nam
  const auditLogs = [
    {
      id: "LOG-01",
      recordId: "#HS-2026-089",
      destinationName: "Khuê Văn Các & Vườn Bia Tiến Sĩ",
      category: "Điểm đến & GPS",
      categoryType: "destination",
      organization: "BQL Di tích Văn Miếu - Quốc Tử Giám",
      moderator: "Trần Văn Bình",
      timestamp: "09:15 - 09/09/2026",
      decision: "PUBLISHED",
      decisionLabel: "ĐÃ PHÊ DUYỆT (PUBLISHED)",
      decisionBadge: "bg-emerald-50 text-emerald-700 border-emerald-300",
      notes: "Đã chuẩn hóa năm khởi dựng 1805 triều vua Gia Long. Tọa độ thực địa 21.0285° N, 105.8355° E an toàn khuôn viên nội bộ.",
      versionDetails: {
        changeType: "Xuất bản điểm di tích mới",
        changes: [
          "Xác thực tọa độ GPS 21.028511° N, 105.835520° E",
          "Duyệt mức giá trải nghiệm 80.000 đ",
          "Kích hoạt bộ câu hỏi Gamification 82 Bia Tiến sĩ",
        ],
      },
    },
    {
      id: "LOG-02",
      recordId: "#AI-FLAG-101",
      destinationName: "Tri thức AI: Niên đại Bia số 3 Văn Miếu",
      category: "Tri thức AI",
      categoryType: "ai",
      organization: "Hệ thống AI Guard Audit",
      moderator: "Trần Văn Bình",
      timestamp: "08:45 - 09/09/2026",
      decision: "AI_TUNED",
      decisionLabel: "ĐÃ CHỈNH TRI THỨC AI",
      decisionBadge: "bg-indigo-50 text-indigo-700 border-indigo-300",
      notes: "Hiệu đính Ground Truth: Thay vua Lê Thái Tổ thành vua Lê Nhân Tông (khoa thi năm 1448). Nạp vào LLM v2.4.",
      versionDetails: {
        changeType: "Hiệu đính cơ sở dữ liệu huấn luyện AI",
        changes: [
          "Giảm trọng số câu trả lời sai lệch về 0%",
          "Cập nhật Ground Truth niên hiệu Thái Hòa năm thứ 6 (1448)",
        ],
      },
    },
    {
      id: "LOG-03",
      recordId: "#HS-2026-085",
      destinationName: "Tuyến đường đêm công trường Hoàng Thành",
      category: "Lộ trình",
      categoryType: "route",
      organization: "BQL Hoàng Thành Thăng Long",
      moderator: "Lê Thu Thủy",
      timestamp: "16:20 - 08/09/2026",
      decision: "REJECTED",
      decisionLabel: "TỪ CHỐI / GỠ BỎ (REJECTED)",
      decisionBadge: "bg-rose-50 text-rose-700 border-rose-300",
      notes: "Từ chối lộ trình đi qua hố khảo cổ 18 Hoàng Diệu ban đêm do công trường đang trùng tu nguy hiểm.",
      versionDetails: {
        changeType: "Từ chối phê duyệt lộ trình",
        changes: [
          "Yêu cầu đổi sang tuyến đường Hoàng Diệu - Phan Đình Phùng",
          "Gửi văn bản khuyến cáo an toàn thực địa",
        ],
      },
    },
    {
      id: "LOG-04",
      recordId: "#HS-2026-083",
      destinationName: "Lò Bầu Cổ Bát Tràng - 5 Bầu Nung",
      category: "Điểm đến",
      categoryType: "destination",
      organization: "Hợp tác xã Gốm Sứ Bát Tràng",
      moderator: "Trần Văn Bình",
      timestamp: "14:10 - 08/09/2026",
      decision: "REVISION",
      decisionLabel: "YÊU CẦU HIỆU ĐÍNH (REVISION REQUIRED)",
      decisionBadge: "bg-amber-50 text-amber-800 border-amber-300",
      notes: "Yêu cầu cung cấp thêm bản quyền số tư liệu ảnh nung củi truyền thống và giấy phép bán vé trải nghiệm.",
      versionDetails: {
        changeType: "Yêu cầu bổ sung hồ sơ pháp lý",
        changes: [
          "Bổ sung văn bản xác nhận bản quyền hình ảnh",
          "Kiểm định lại bán kính radar 60m",
        ],
      },
    },
    {
      id: "LOG-05",
      recordId: "#PHOTO-01",
      destinationName: "Ảnh Thử Thách Khuê Văn Các",
      category: "Ảnh du khách",
      categoryType: "photo",
      organization: "Du khách: Nguyễn Văn An",
      moderator: "Trần Văn Bình",
      timestamp: "11:35 - 08/09/2026",
      decision: "PUBLISHED",
      decisionLabel: "ĐÃ PHÊ DUYỆT (PUBLISHED)",
      decisionBadge: "bg-emerald-50 text-emerald-700 border-emerald-300",
      notes: "Ảnh góc chính diện đạt chuẩn BTC. Đã cộng +100 điểm thưởng vào ví di sản du khách.",
      versionDetails: {
        changeType: "Phê duyệt ảnh Gamification",
        changes: [
          "Cộng +100 điểm thưởng thành công",
          "Mở khóa Huy hiệu Sao Khuê cho du khách",
        ],
      },
    },
    {
      id: "LOG-06",
      recordId: "#POST-REP-01",
      destinationName: "Bài viết quảng cáo mê tín tại Văn Miếu",
      category: "Bài cộng đồng",
      categoryType: "post",
      organization: "Tài khoản: Đình Tuấn (Traveler)",
      moderator: "Vũ Hoàng Nam",
      timestamp: "09:00 - 08/09/2026",
      decision: "REJECTED",
      decisionLabel: "TỪ CHỐI / GỠ BỎ (REJECTED)",
      decisionBadge: "bg-rose-50 text-rose-700 border-rose-300",
      notes: "Xác nhận vi phạm: Bán quẻ mê tín dị đoan. Đã gỡ bài viết vĩnh viễn và khóa cảnh cáo tài khoản 7 ngày.",
      versionDetails: {
        changeType: "Xử phạt vi phạm chính sách",
        changes: [
          "Gỡ bỏ bài viết khỏi bảng tin cộng đồng",
          "Gửi thông báo vi phạm và đình chỉ tài khoản 7 ngày",
        ],
      },
    },
  ];

  // Lọc dữ liệu theo bộ lọc
  const filteredLogs = auditLogs.filter((log) => {
    // Lọc quyết định
    if (decisionFilter === "published" && log.decision !== "PUBLISHED") return false;
    if (
      decisionFilter === "revision" &&
      log.decision !== "REVISION" &&
      log.decision !== "REJECTED"
    )
      return false;
    if (decisionFilter === "ai" && log.decision !== "AI_TUNED") return false;

    // Tìm kiếm
    const matchSearch =
      log.recordId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.destinationName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.moderator.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.organization.toLowerCase().includes(searchQuery.toLowerCase());

    return matchSearch;
  });

  // Xuất báo cáo giả lập
  const handleExportReport = (type) => {
    showToast(
      `Đang kết xuất tệp Báo cáo Thanh tra Di sản (${type.toUpperCase()})... Tệp sẽ được tải xuống tự động.`
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-200">
      {/* Toast thông báo */}
      {toastMsg && (
        <div className="fixed top-5 right-5 z-50 bg-teal-800 text-white px-4 py-3 rounded-2xl shadow-xl border border-teal-600 text-xs font-bold flex items-center gap-2.5 animate-in slide-in-from-top-3 max-w-md">
          <CheckCircle2 size={18} className="text-teal-300 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* ────────────────────────────────────────────────────────
          1. HEADER & BỘ LỌC LỊCH SỬ (AUDIT LOG HEADER)
      ──────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-500" />
              <span className="text-[11px] font-black uppercase tracking-wider text-teal-700">
                Lịch Sử Kiểm Định & Thanh Tra
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Nhật Ký Thẩm Định & Truy Vết Hoạt Động
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-3xl">
              Toàn bộ lịch sử duyệt, từ chối và hiệu đính dữ liệu văn hóa được ghi vết minh bạch để phục vụ công tác thanh tra di sản.
            </p>
          </div>

          {/* Nút Xuất Báo Cáo Excel / PDF */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              type="button"
              onClick={() => handleExportReport("Excel")}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download size={14} />
              <span>Xuất Excel</span>
            </button>

            <button
              type="button"
              onClick={() => handleExportReport("PDF")}
              className="px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white font-bold text-xs shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download size={14} />
              <span>Xuất Báo Cáo PDF</span>
            </button>
          </div>
        </div>

        {/* Bộ lọc tiện ích đa tầng */}
        <div className="pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
          {/* Khoảng ngày (Date Range) */}
          <div className="sm:col-span-4 flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold text-slate-600">
            <button
              type="button"
              onClick={() => setDateRange("today")}
              className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer ${
                dateRange === "today"
                  ? "bg-white text-teal-800 shadow-2xs font-bold"
                  : "hover:text-slate-900"
              }`}
            >
              Hôm nay
            </button>
            <button
              type="button"
              onClick={() => setDateRange("week")}
              className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer ${
                dateRange === "week"
                  ? "bg-white text-teal-800 shadow-2xs font-bold"
                  : "hover:text-slate-900"
              }`}
            >
              7 ngày qua
            </button>
            <button
              type="button"
              onClick={() => setDateRange("month")}
              className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer ${
                dateRange === "month"
                  ? "bg-white text-teal-800 shadow-2xs font-bold"
                  : "hover:text-slate-900"
              }`}
            >
              Tháng này
            </button>
          </div>

          {/* Lọc theo Quyết định */}
          <div className="sm:col-span-4">
            <select
              value={decisionFilter}
              onChange={(e) => setDecisionFilter(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
            >
              <option value="all">Tất cả quyết định</option>
              <option value="published">Đã xuất bản (Published)</option>
              <option value="revision">Đã từ chối / Yêu cầu sửa</option>
              <option value="ai">Đã chỉnh tri thức AI</option>
            </select>
          </div>

          {/* Ô tìm kiếm thẩm định viên hoặc mã hồ sơ */}
          <div className="sm:col-span-4 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Search size={14} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm mã hồ sơ (#HS-...), thẩm định viên..."
              className="w-full pl-8.5 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
            />
          </div>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────
          2. BẢNG LỊCH SỬ THẨM ĐỊNH CHI TIẾT (AUDIT TRAIL TABLE)
      ──────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold uppercase text-slate-500 tracking-wider">
                <th className="py-3.5 px-5">THỜI GIAN</th>
                <th className="py-3.5 px-4">LOẠI HÌNH</th>
                <th className="py-3.5 px-4">ĐƠN VỊ LIÊN QUAN</th>
                <th className="py-3.5 px-4">THẨM ĐỊNH VIÊN</th>
                <th className="py-3.5 px-4">QUYẾT ĐỊNH & TRẠNG THÁI</th>
                <th className="py-3.5 px-5 text-right">CHI TIẾT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    <p className="text-sm font-semibold">Không tìm thấy bản ghi lịch sử phù hợp.</p>
                    <p className="text-xs mt-1">Hãy thử xóa bộ lọc tìm kiếm.</p>
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => (
                  <tr
                    key={log.id}
                    className="hover:bg-slate-50/70 transition-colors group"
                  >
                    {/* Cột 1: THỜI GIAN */}
                    <td className="py-3.5 px-5 text-slate-500 text-[11px] whitespace-nowrap font-mono">
                      <div className="flex items-center gap-1.5">
                        <Clock size={12} className="text-slate-400" />
                        <span>{log.timestamp}</span>
                      </div>
                    </td>

                    {/* Cột 2: LOẠI HÌNH */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10.5px] font-bold border ${
                          log.categoryType === "destination"
                            ? "bg-sky-50 text-sky-800 border-sky-200"
                            : log.categoryType === "route"
                            ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                            : log.categoryType === "ai"
                            ? "bg-indigo-50 text-indigo-800 border-indigo-200"
                            : "bg-purple-50 text-purple-800 border-purple-200"
                        }`}
                      >
                        {log.categoryType === "destination" && <MapPin size={10} />}
                        {log.categoryType === "route" && <Compass size={10} />}
                        {log.categoryType === "ai" && <Bot size={10} />}
                        {log.categoryType === "photo" && <Camera size={10} />}
                        <span>{log.category}</span>
                      </span>
                    </td>

                    {/* Cột 3: ĐƠN VỊ LIÊN QUAN */}
                    <td className="py-3.5 px-4 whitespace-nowrap text-slate-700">
                      <div className="flex items-center gap-1.5 font-medium">
                        <Building2 size={12} className="text-slate-400 flex-shrink-0" />
                        <span className="truncate max-w-[180px]">{log.organization}</span>
                      </div>
                    </td>

                    {/* Cột 4: THẨM ĐỊNH VIÊN */}
                    <td className="py-3.5 px-4 whitespace-nowrap font-semibold text-slate-800">
                      <div className="flex items-center gap-1.5">
                        <User size={12} className="text-teal-600" />
                        <span>{log.moderator}</span>
                      </div>
                    </td>

                    {/* Cột 5: QUYẾT ĐỊNH & TRẠNG THÁI */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10.5px] font-black border ${log.decisionBadge}`}
                      >
                        {log.decision === "PUBLISHED" && <CheckCircle2 size={11} />}
                        {log.decision === "REVISION" && <AlertTriangle size={11} />}
                        {log.decision === "REJECTED" && <XCircle size={11} />}
                        {log.decision === "AI_TUNED" && <Bot size={11} />}
                        <span>{log.decisionLabel}</span>
                      </span>
                    </td>

                    {/* Cột 6: CHI TIẾT (Nút Eye) */}
                    <td className="py-3.5 px-5 text-right whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => setSelectedLog(log)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-teal-700 hover:bg-teal-50 transition-colors cursor-pointer"
                        title="Xem lại phiên bản lưu vết chi tiết"
                      >
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer bảng */}
        <div className="p-4 bg-slate-50/75 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500">
          <span>
            Đang hiển thị {filteredLogs.length} sự kiện kiểm định gần nhất
          </span>
          <span className="text-[11px] text-teal-700 font-semibold">
            ● Dữ liệu ghi vết bất biến (Immutable Audit Log)
          </span>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────
          3. KHỐI TÓM TẮT HOẠT ĐỘNG CÁ NHÂN TRONG TUẦN (SUMMARY STAT BOX)
      ──────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp size={16} className="text-teal-600" />
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
            Hiệu Suất Thẩm Định Cá Nhân Trong Tuần (Trần Văn Bình)
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
            <p className="text-[11px] font-bold text-slate-500">Tổng hồ sơ đã xử lý</p>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="text-2xl font-black text-slate-900">84</span>
              <span className="text-xs font-semibold text-slate-400">hồ sơ</span>
            </div>
            <p className="text-[10.5px] text-emerald-600 font-semibold mt-1">
              ↑ 12% so với tuần trước
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
            <p className="text-[11px] font-bold text-slate-500">Tỷ lệ phê duyệt đạt chuẩn</p>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="text-2xl font-black text-emerald-700">88.5%</span>
              <span className="text-xs font-semibold text-slate-400">tổng lượt</span>
            </div>
            <p className="text-[10.5px] text-slate-400 mt-1">
              11.5% yêu cầu hiệu đính
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
            <p className="text-[11px] font-bold text-slate-500">Thời gian thẩm định trung bình</p>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="text-2xl font-black text-slate-900">14.2</span>
              <span className="text-xs font-semibold text-slate-400">phút / hồ sơ</span>
            </div>
            <p className="text-[10.5px] text-teal-600 font-semibold mt-1">
              Vượt chỉ tiêu SLA (&lt; 20 phút)
            </p>
          </div>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────
          DRAWER XEM LẠI TOÀN BỘ PHIÊN BẢN ĐÃ LƯU (SLIDE-OVER MODAL)
      ──────────────────────────────────────────────────────── */}
      {selectedLog && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-end animate-in fade-in duration-150"
          onClick={() => setSelectedLog(null)}
        >
          <div
            className="w-full max-w-lg bg-white h-full shadow-2xl p-6 overflow-y-auto space-y-5 animate-in slide-in-from-right duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Drawer */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="font-mono text-xs font-black text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                  {selectedLog.recordId}
                </span>
                <h3 className="text-base font-black text-slate-900 mt-1.5">
                  Bản Ghi Thẩm Định Lưu Vết
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Ghi nhận lúc: {selectedLog.timestamp}</p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedLog(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Thông tin hồ sơ */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Tên nội dung:</span>
                <span className="font-bold text-slate-900 text-right">{selectedLog.destinationName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Đơn vị gửi:</span>
                <span className="font-semibold text-slate-800">{selectedLog.organization}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Thẩm định viên:</span>
                <span className="font-bold text-teal-700">{selectedLog.moderator}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-slate-200">
                <span className="text-slate-400">Quyết định ban hành:</span>
                <span className={`px-2 py-0.5 rounded-full text-[10.5px] font-black border ${selectedLog.decisionBadge}`}>
                  {selectedLog.decisionLabel}
                </span>
              </div>
            </div>

            {/* Ghi chú phản hồi bàn duyệt */}
            <div>
              <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider mb-1.5">
                Biên Bản & Ghi Chú Của Bàn Duyệt
              </h4>
              <p className="text-xs text-slate-700 bg-amber-50/70 p-3.5 rounded-xl border border-amber-200 leading-relaxed italic">
                "{selectedLog.notes}"
              </p>
            </div>

            {/* Chi tiết thay đổi phiên bản */}
            <div>
              <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider mb-2">
                Các Thay Đổi Đã Được Chuẩn Hóa
              </h4>
              <div className="space-y-1.5 text-xs">
                {selectedLog.versionDetails.changes.map((ch, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-2 text-slate-700"
                  >
                    <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                    <span>{ch}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Drawer */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setSelectedLog(null)}
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
              >
                Đóng biên bản
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
