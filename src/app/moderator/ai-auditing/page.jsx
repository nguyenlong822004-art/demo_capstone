"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Bot,
  AlertTriangle,
  Sparkles,
  CheckCircle2,
  ShieldAlert,
  ShieldCheck,
  Clock,
  User,
  MessageSquare,
  ArrowRight,
  Send,
  Trash2,
  Check,
  X,
  Cpu,
  RefreshCw,
  Database,
  ThumbsDown,
  Info,
} from "lucide-react";

/**
 * Phân Hệ Kiểm Chuẩn & Hiệu Đính Tri Thức AI (AI Guard Audit)
 * Đường dẫn: /moderator/ai-auditing
 */
export default function AIAuditingPage() {
  // Toast thông báo
  const [toastMsg, setToastMsg] = useState("");

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 4000);
  };

  // Danh sách 3 sự cố AI bị gắn cờ cần xử lý gấp
  const initialIncidents = [
    {
      id: "AI-FLAG-101",
      caseTitle: "Ca 1: Sai niên đại lịch sử & Tên hoàng đế",
      category: "Lịch sử & Niên đại",
      severity: "Nghiêm trọng",
      severityBadge: "bg-rose-50 text-rose-700 border-rose-200",
      reportedAt: "18 phút trước",
      touristQuestion: "Bia Tiến sĩ số 3 ở Văn Miếu được dựng vào năm nào và tôn vinh ai?",
      aiResponse:
        "Bia số 3 được dựng năm 1484, ghi lại khoa thi năm 1448 thời vua Lê Thái Tổ nhằm biểu dương các hiền tài...",
      touristReport:
        "Sai thông tin: Vua Lê Thái Tổ đã mất năm 1433, năm 1448 là thời vua Lê Nhân Tông. Đề nghị chỉnh sửa để không làm lệch lạc kiến thức lịch sử của học sinh.",
      defaultGroundTruth:
        "Bia Tiến sĩ số 3 ghi lại khoa thi năm Mậu Thìn (1448) niên hiệu Thái Hòa năm thứ 6 dưới triều vua Lê Nhân Tông. Khoa thi này lấy đỗ 27 tiến sĩ, tiêu biểu có Trạng nguyên Nguyễn Trực.",
      suggestedCorrection:
        "Thay thế vua Lê Thái Tổ bằng vua Lê Nhân Tông; bổ sung niên hiệu Thái Hòa năm thứ 6 (1448).",
    },
    {
      id: "AI-FLAG-102",
      caseTitle: "Ca 2: Gợi ý lộ trình không an toàn ban đêm",
      category: "Lộ trình thực địa & An toàn",
      severity: "Nguy hiểm",
      severityBadge: "bg-rose-50 text-rose-700 border-rose-200",
      reportedAt: "45 phút trước",
      touristQuestion: "Lộ trình đi bộ buổi tối quanh khu vực Hoàng Thành Thăng Long có gì thú vị?",
      aiResponse:
        "Bạn có thể đi bộ xuyên qua lối sau của khu khảo cổ 18 Hoàng Diệu sau 18h để ngắm nhìn hố khai quật dưới ánh đèn lung linh...",
      touristReport:
        "Khu vực đang trùng tu hố khảo cổ, có biển cấm vào sau 18h. Đi vào buổi tối rất nguy hiểm, dễ ngã xuống hố sâu hoặc vấp giàn giáo.",
      defaultGroundTruth:
        "Khu khảo cổ 18 Hoàng Diệu đóng cửa sau 17h00 hàng ngày và có biển cấm vào để bảo tồn hiện vật. Vào buổi tối, du khách nên chọn tuyến đi bộ đường Hoàng Diệu - Phan Đình Phùng rực rỡ ánh sáng hoặc tham gia Tour Đêm Hoàng Thành Thăng Long có hướng dẫn viên đi kèm.",
      suggestedCorrection:
        "Cấm gợi ý đi vào công trường khảo cổ sau 17h; bổ sung khuyến nghị Tour Đêm chính thức.",
    },
    {
      id: "AI-FLAG-103",
      caseTitle: "Ca 3: Nhầm lẫn địa danh ẩm thực truyền thống",
      category: "Văn hóa Ẩm thực",
      severity: "Cảnh báo",
      severityBadge: "bg-amber-50 text-amber-800 border-amber-200",
      reportedAt: "1 giờ trước",
      touristQuestion: "Cốm làng Vòng có nguồn gốc từ đâu và mùa cốm ngon nhất là khi nào?",
      aiResponse:
        "Cốm Vòng là đặc sản truyền thống xuất xứ từ làng gốm Bát Tràng, Gia Lâm, thường được làm vào dịp Tết Nguyên Đán...",
      touristReport:
        "Nhầm lẫn tai hại: Cốm Vòng thuộc làng Vòng (phường Dịch Vọng Hậu, quận Cầu Giấy, Hà Nội), mùa cốm chuẩn nhất là vào mùa thu chứ không phải Bát Tràng hay ngày Tết.",
      defaultGroundTruth:
        "Cốm làng Vòng có xuất xứ từ làng Vòng (thôn Hậu, xã Dịch Vọng, nay thuộc phường Dịch Vọng Hậu, quận Cầu Giấy, Hà Nội). Mùa thu hoạch và thưởng thức cốm ngon nhất là vào mùa thu (khoảng tháng 8 đến tháng 10 âm lịch).",
      suggestedCorrection:
        "Đính chính địa danh làng Vòng tại Cầu Giấy; xác nhận mùa cốm là mùa thu Hà Nội.",
    },
  ];

  const [incidents, setIncidents] = useState(initialIncidents);
  const [groundTruths, setGroundTruths] = useState({
    "AI-FLAG-101": initialIncidents[0].defaultGroundTruth,
    "AI-FLAG-102": initialIncidents[1].defaultGroundTruth,
    "AI-FLAG-103": initialIncidents[2].defaultGroundTruth,
  });

  // Cập nhật Ground Truth cho từng ca
  const handleGroundTruthChange = (id, val) => {
    setGroundTruths((prev) => ({
      ...prev,
      [id]: val,
    }));
  };

  // Nút 1: Cập nhật vào Bộ Tri thức AI & Đóng cờ
  const handleUpdateKnowledgeBase = (id) => {
    setIncidents((prev) => prev.filter((item) => item.id !== id));
    showToast(
      "Đã bổ sung vào cơ sở dữ liệu huấn luyện AI thành công! Trọng số tri thức mới đã được nạp vào mô hình LLM Du lịch Văn hóa v2.4."
    );
  };

  // Nút 2: Phạt giảm trọng số câu trả lời này
  const handlePenalize = (id) => {
    setIncidents((prev) => prev.filter((item) => item.id !== id));
    showToast(
      "Đã giảm 100% trọng số của câu trả lời sai lệch. Mô hình AI sẽ không bao giờ tái sử dụng cấu trúc câu này."
    );
  };

  // Nút 3: Bỏ qua (Báo cáo không đúng)
  const handleDismiss = (id) => {
    setIncidents((prev) => prev.filter((item) => item.id !== id));
    showToast("Đã đóng cờ sự cố (Xác định báo cáo từ người dùng chưa thỏa đáng).");
  };

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-200">
      {/* Toast thông báo phản hồi */}
      {toastMsg && (
        <div className="fixed top-5 right-5 z-50 bg-teal-800 text-white px-4 py-3 rounded-2xl shadow-xl border border-teal-600 text-xs font-bold flex items-center gap-2.5 animate-in slide-in-from-top-3 max-w-md">
          <CheckCircle2 size={18} className="text-teal-300 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* ────────────────────────────────────────────────────────
          1. SUB-HEADER PHÂN HỆ AI GUARD
      ──────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 ring-4 ring-indigo-100" />
              <span className="text-[11px] font-black uppercase tracking-wider text-indigo-700">
                Phân Hệ Giám Sát AI Du Lịch
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Kiểm Chuẩn & Hiệu Đính Tri Thức AI (AI Guard Audit)
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-3xl">
              Rà soát câu trả lời của Trợ lý ảo AI thuyết minh bị người dùng báo cáo sai lệch lịch sử và chuẩn hóa bộ dữ liệu tri thức (Ground Truth).
            </p>
          </div>

          {/* Badge hệ điều hành AI */}
          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-200 px-3.5 py-2 rounded-2xl text-xs shrink-0 self-start md:self-auto">
            <Bot size={16} className="text-indigo-600" />
            <div>
              <p className="text-[10px] text-slate-400 font-semibold uppercase">Mô hình hoạt động</p>
              <p className="text-xs font-black text-indigo-950">LLM Du lịch Văn hóa v2.4</p>
            </div>
          </div>
        </div>

        {/* Thanh thống kê nhanh */}
        <div className="pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
            <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-xs">
              <ShieldAlert size={16} />
            </div>
            <div>
              <p className="text-[10.5px] text-slate-400 font-semibold">Cảnh báo cần xử lý</p>
              <p className="text-xs font-black text-slate-800">
                {incidents.length} cảnh báo cần rà soát
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
              <CheckCircle2 size={16} />
            </div>
            <div>
              <p className="text-[10.5px] text-slate-400 font-semibold">Tỷ lệ chính xác lịch sử</p>
              <p className="text-xs font-black text-emerald-700">98.2% độ tin cậy</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
            <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-xs">
              <Database size={16} />
            </div>
            <div>
              <p className="text-[10.5px] text-slate-400 font-semibold">Cơ sở dữ liệu tri thức</p>
              <p className="text-xs font-black text-slate-800">14.850 Ground Truths</p>
            </div>
          </div>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────
          2 & 3. DANH SÁCH SỰ CỐ AI BỊ GẮN CỜ (SPLIT VIEW CARD)
      ──────────────────────────────────────────────────────── */}
      <div className="space-y-5">
        {incidents.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-2xs space-y-3">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full mx-auto flex items-center justify-center">
              <CheckCircle2 size={32} />
            </div>
            <h3 className="text-base font-black text-slate-800">
              Đã rà soát xong toàn bộ cờ báo cáo!
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Không còn cảnh báo nào tồn đọng. Dữ liệu chuẩn hóa đã được đồng bộ vào lõi Vector Database của Trợ lý ảo AI.
            </p>
            <button
              type="button"
              onClick={() => {
                setIncidents(initialIncidents);
                showToast("Đã khôi phục dữ liệu demo ban đầu.");
              }}
              className="mt-2 text-xs font-bold text-teal-700 hover:text-teal-800 underline inline-flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw size={12} />
              <span>Tải lại dữ liệu kiểm thử</span>
            </button>
          </div>
        ) : (
          incidents.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden transition-all hover:border-slate-300"
            >
              {/* Header của thẻ sự cố */}
              <div className="p-4 sm:p-5 bg-slate-50/80 border-b border-slate-200/80 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-xs font-black text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                    {item.id}
                  </span>
                  <h3 className="text-sm font-black text-slate-900">{item.caseTitle}</h3>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock size={12} />
                    <span>{item.reportedAt}</span>
                  </span>
                  <span
                    className={`text-[10.5px] font-black uppercase px-2.5 py-0.5 rounded-full border ${item.severityBadge}`}
                  >
                    {item.severity}
                  </span>
                </div>
              </div>

              {/* Thân thẻ: Bố cục Split 2 bên */}
              <div className="p-5 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
                {/* ── CỘT TRÁI (5/12): HỘI THOẠI & PHẢN HỒI CỦA KHÁCH ── */}
                <div className="lg:col-span-5 space-y-3.5">
                  {/* Du khách hỏi */}
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-slate-700">
                      <User size={13} className="text-sky-600" />
                      <span>Du khách hỏi:</span>
                    </div>
                    <p className="text-slate-800 font-medium italic">"{item.touristQuestion}"</p>
                  </div>

                  {/* AI trả lời bị lỗi */}
                  <div className="p-3 bg-rose-50/70 rounded-xl border border-rose-200 text-xs space-y-1">
                    <div className="flex items-center justify-between font-bold text-rose-800">
                      <div className="flex items-center gap-1.5">
                        <Bot size={13} className="text-rose-600" />
                        <span>AI trả lời (Bị gắn cờ):</span>
                      </div>
                      <span className="text-[10px] text-rose-600 font-mono">Trọng số: 0.88</span>
                    </div>
                    <p className="text-slate-800">{item.aiResponse}</p>
                  </div>

                  {/* Báo cáo của khách */}
                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-amber-900">
                      <AlertTriangle size={13} className="text-amber-600" />
                      <span>Báo cáo của khách du lịch:</span>
                    </div>
                    <p className="text-amber-950 font-medium">{item.touristReport}</p>
                  </div>
                </div>

                {/* ── CỘT PHẢI (7/12): HỘP CÔNG CỤ XỬ LÝ CỦA THẨM ĐỊNH VIÊN ── */}
                <div className="lg:col-span-7 space-y-3.5 lg:pl-3 lg:border-l border-slate-100">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                        <Sparkles size={13} className="text-teal-600" />
                        <span>Nội dung chuẩn hóa di sản (Ground Truth)</span>
                      </label>
                      <span className="text-[10.5px] text-teal-700 font-bold">
                        Được thẩm định bởi Ban Di sản
                      </span>
                    </div>

                    {/* Textarea nhập câu trả lời lịch sử chuẩn xác */}
                    <textarea
                      rows={4}
                      value={groundTruths[item.id] || ""}
                      onChange={(e) => handleGroundTruthChange(item.id, e.target.value)}
                      placeholder="Gõ nội dung chuẩn xác để huấn luyện lại AI..."
                      className="w-full p-3 bg-slate-50 border border-teal-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 leading-relaxed font-sans"
                    />

                    <p className="text-[11px] text-slate-400 mt-1">
                      💡 Gợi ý hiệu đính: {item.suggestedCorrection}
                    </p>
                  </div>

                  {/* Cụm 3 nút hành động */}
                  <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-end gap-2">
                    {/* Nút 3: Bỏ qua */}
                    <button
                      type="button"
                      onClick={() => handleDismiss(item.id)}
                      className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                      Bỏ qua (Báo cáo không đúng)
                    </button>

                    {/* Nút 2: Phạt giảm trọng số */}
                    <button
                      type="button"
                      onClick={() => handlePenalize(item.id)}
                      className="px-3 py-2 rounded-xl text-xs font-bold text-rose-600 border border-rose-200 hover:bg-rose-50 transition-colors cursor-pointer flex items-center gap-1"
                      title="Giảm độ ưu tiên xuất hiện của câu trả lời sai lệch"
                    >
                      <ThumbsDown size={13} />
                      <span>Phạt giảm trọng số câu trả lời này</span>
                    </button>

                    {/* Nút 1: Cập nhật vào Bộ Tri thức AI & Đóng cờ */}
                    <button
                      type="button"
                      onClick={() => handleUpdateKnowledgeBase(item.id)}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <CheckCircle2 size={14} />
                      <span>Cập nhật vào Bộ Tri thức AI & Đóng cờ</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
