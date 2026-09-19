"use client";

import React, { useState } from "react";
import {
  SlidersHorizontal,
  FolderTree,
  Award,
  CircleDollarSign,
  Save,
  CheckCircle2,
  Plus,
  Edit2,
  Eye,
  EyeOff,
  Trash2,
  MapPin,
  QrCode,
  HelpCircle,
  Camera,
  Compass,
  Landmark,
  Utensils,
  Sparkles,
  Percent,
  CreditCard,
  ShieldCheck,
  ToggleLeft,
  ToggleRight,
  Info,
  ChevronRight,
  RotateCcw,
} from "lucide-react";

/**
 * Trang Cấu Hình Danh Mục & Luật Hệ Thống (System Config & Rules)
 * Đường dẫn: /admin/system-config
 */
export default function AdminSystemConfigPage() {
  // State Tab đang chọn: 'catalogs' | 'gamification' | 'pricing'
  const [activeTab, setActiveTab] = useState("catalogs");

  // State Toast
  const [toastMsg, setToastMsg] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 4000);
  };

  // ══════════════════════════════════════════════════════════
  // 1. DỮ LIỆU TAB 1: DANH MỤC DI SẢN & ĐIỂM ĐẾN (CATALOGS)
  // ══════════════════════════════════════════════════════════

  // Danh mục Vùng miền
  const [regions, setRegions] = useState([
    { id: "reg-01", name: "Bắc Bộ", code: "NORTH", count: 142, isVisible: true },
    { id: "reg-02", name: "Trung Bộ", code: "CENTRAL", count: 128, isVisible: true },
    { id: "reg-03", name: "Nam Bộ", code: "SOUTH", count: 78, isVisible: true },
  ]);
  const [newRegionName, setNewRegionName] = useState("");

  // Danh mục Chủ đề di sản
  const [themes, setThemes] = useState([
    {
      id: "theme-01",
      name: "Di tích lịch sử",
      description: "Đền đài, chùa cổ, hoàng thành, chiến khu và khu lăng tẩm",
      iconName: "Landmark",
      count: 156,
      color: "bg-emerald-50 text-emerald-700 border-emerald-200",
      isVisible: true,
    },
    {
      id: "theme-02",
      name: "Làng nghề truyền thống",
      description: "Gốm sứ Bát Tràng, lụa Vạn Phúc, tranh Đông Hồ, đúc đồng",
      iconName: "Compass",
      count: 64,
      color: "bg-amber-50 text-amber-800 border-amber-200",
      isVisible: true,
    },
    {
      id: "theme-03",
      name: "Danh thắng thiên nhiên",
      description: "Vịnh Hạ Long, quần thể Tràng An, Tam Cốc, Phong Nha",
      iconName: "MapPin",
      count: 88,
      color: "bg-sky-50 text-sky-700 border-sky-200",
      isVisible: true,
    },
    {
      id: "theme-04",
      name: "Ẩm thực dân gian",
      description: "Văn hóa ẩm thực tiến vua, làng nghề bún, bánh cốm di sản",
      iconName: "Utensils",
      count: 40,
      color: "bg-rose-50 text-rose-700 border-rose-200",
      isVisible: true,
    },
  ]);

  // Loại nhiệm vụ tương tác thực địa (Task Types)
  const [taskTypes, setTaskTypes] = useState([
    {
      id: "task-01",
      title: "Kích hoạt GPS Geofencing",
      description: "Du khách di chuyển vào bán kính 30m - 60m quanh hiện vật để mở khóa bài học",
      icon: MapPin,
      iconColor: "text-emerald-600 bg-emerald-50",
      badge: "Định vị vệ tinh",
      isEnabled: true,
    },
    {
      id: "task-02",
      title: "Quét mã QR Hiện vật",
      description: "Quét mã QR khắc laser tại bia đá, cổng di tích để xác thực sự có mặt",
      icon: QrCode,
      iconColor: "text-sky-600 bg-sky-50",
      badge: "Quét trực tiếp",
      isEnabled: true,
    },
    {
      id: "task-03",
      title: "Trắc nghiệm Quiz Kiến Thức",
      description: "Trả lời bộ 3 - 5 câu hỏi lịch sử đối soát từ kho tri thức Ground Truth",
      icon: HelpCircle,
      iconColor: "text-purple-600 bg-purple-50",
      badge: "Hỏi đáp lịch sử",
      isEnabled: true,
    },
    {
      id: "task-04",
      title: "Săn ảnh Photo Challenge",
      description: "Chụp ảnh đúng góc mẫu hiện vật và gửi kiểm duyệt viên thẩm định",
      icon: Camera,
      iconColor: "text-amber-600 bg-amber-50",
      badge: "Đối chiếu thị giác",
      isEnabled: true,
    },
  ]);

  // ══════════════════════════════════════════════════════════
  // 2. DỮ LIỆU TAB 2: CƠ CHẾ GAME HÓA & ĐIỂM THƯỞNG (GAMIFICATION)
  // ══════════════════════════════════════════════════════════
  const [gamificationPoints, setGamificationPoints] = useState({
    gpsCheckin: 50,
    quizCorrect: 20,
    photoChallenge: 100,
  });

  // Quản lý Danh hiệu người dùng
  const [tierRanks, setTierRanks] = useState([
    {
      id: "tier-bronze",
      name: "Hạng Đồng (Kẻ Lữ Hành)",
      range: "0 - 500 pts",
      minPoints: 0,
      maxPoints: 500,
      badgeColor: "bg-amber-100 text-amber-900 border-amber-300",
      perk: "Mở khóa bản đồ di sản 2D, nhận huy hiệu nhập môn",
    },
    {
      id: "tier-silver",
      name: "Hạng Bạc (Nhà Thám Hiểm)",
      range: "501 - 1,500 pts",
      minPoints: 501,
      maxPoints: 1500,
      badgeColor: "bg-slate-200 text-slate-800 border-slate-300",
      perk: "Giảm 5% vé tour đêm di tích, mở khóa hướng dẫn viên AI giọng đọc Huế",
    },
    {
      id: "tier-gold",
      name: "Hạng Vàng (Đại Sứ Di Sản)",
      range: "1,501+ pts",
      minPoints: 1501,
      maxPoints: 99999,
      badgeColor: "bg-yellow-100 text-yellow-800 border-yellow-400 font-bold",
      perk: "Giảm 10% toàn sàn, tặng vé trải nghiệm làng nghề và quà lưu niệm số 3D",
    },
  ]);

  // ══════════════════════════════════════════════════════════
  // 3. DỮ LIỆU TAB 3: PHÍ SÀN & CHÍNH SÁCH GIÁ (PRICING & FEES)
  // ══════════════════════════════════════════════════════════
  const [platformFeePercent, setPlatformFeePercent] = useState(10);
  const [exemptSpecialMonuments, setExemptSpecialMonuments] = useState(true);
  const [defaultGateway, setDefaultGateway] = useState("VNPay"); // 'VNPay' | 'MoMo'

  // Xử lý thêm Vùng miền
  const handleAddRegion = () => {
    if (!newRegionName.trim()) return;
    const newReg = {
      id: `reg-${Date.now()}`,
      name: newRegionName.trim(),
      code: newRegionName.trim().toUpperCase().slice(0, 4),
      count: 0,
      isVisible: true,
    };
    setRegions([...regions, newReg]);
    setNewRegionName("");
    showToast(`Đã thêm vùng miền mới: "${newRegionName.trim()}"`);
  };

  // Toggle ẩn/hiện Vùng miền
  const handleToggleRegionVisibility = (id) => {
    setRegions((prev) =>
      prev.map((r) => (r.id === id ? { ...r, isVisible: !r.isVisible } : r))
    );
  };

  // Toggle ẩn/hiện Chủ đề
  const handleToggleThemeVisibility = (id) => {
    setThemes((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isVisible: !t.isVisible } : t))
    );
  };

  // Toggle kích hoạt loại nhiệm vụ
  const handleToggleTaskType = (id) => {
    setTaskTypes((prev) =>
      prev.map((tk) => (tk.id === id ? { ...tk, isEnabled: !tk.isEnabled } : tk))
    );
  };

  // Xử lý Lưu cấu hình toàn hệ thống
  const handleSaveAllConfig = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      showToast(
        "Đã lưu và đồng bộ toàn bộ cấu hình hệ thống (Danh mục, Gamification, Phí sàn) xuống cơ sở dữ liệu thành công!"
      );
    }, 900);
  };

  return (
    <div className="space-y-6 pb-24 animate-in fade-in-50 duration-200">
      {/* Toast thông báo */}
      {toastMsg && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl border border-slate-700 text-xs font-bold flex items-center gap-2.5 animate-in slide-in-from-top-3 max-w-md">
          <CheckCircle2 size={18} className="text-teal-300 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header trang cấu hình */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-600" />
              <span className="text-[11px] font-black uppercase tracking-wider text-teal-700">
                Thiết Lập Vận Hành Nền Tảng
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Cấu Hình Danh Mục & Luật Hệ Thống
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Chuẩn hóa taxonomy di sản, thuật toán tích điểm thưởng thực địa và quy định chính sách tài chính toàn sàn.
            </p>
          </div>

          {/* Badge phiên bản quy tắc */}
          <div className="bg-teal-50 border border-teal-200 text-teal-800 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 self-start sm:self-auto">
            <SlidersHorizontal size={14} className="text-teal-600" />
            <span>Quy tắc vận hành: v2.4 (Active)</span>
          </div>
        </div>

        {/* Thanh 3 Tab cấu hình */}
        <div className="pt-4 border-t border-slate-100 flex items-center gap-2 overflow-x-auto mt-4">
          <button
            type="button"
            onClick={() => setActiveTab("catalogs")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeTab === "catalogs"
                ? "bg-teal-700 text-white shadow-xs"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900"
            }`}
          >
            <FolderTree size={14} />
            <span>1. Danh Mục Di Sản & Điểm Đến (Catalogs)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("gamification")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeTab === "gamification"
                ? "bg-teal-700 text-white shadow-xs"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900"
            }`}
          >
            <Award size={14} />
            <span>2. Cơ Chế Game Hóa & Điểm Thưởng (Gamification Engine)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("pricing")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeTab === "pricing"
                ? "bg-teal-700 text-white shadow-xs"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900"
            }`}
          >
            <CircleDollarSign size={14} />
            <span>3. Phí Sàn & Chính Sách Giá (Platform Pricing & Fees)</span>
          </button>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────
          TAB 1: CẤU HÌNH DANH MỤC DI SẢN & ĐIỂM ĐẾN (CATALOGS)
      ──────────────────────────────────────────────────────── */}
      {activeTab === "catalogs" && (
        <div className="space-y-6">
          {/* 1.1 Quản lý danh mục Vùng miền */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                  Phân Vùng Địa Lý & Lãnh Thổ (Regions)
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Dùng để nhóm lộ trình tour và hiển thị trên bộ lọc di sản cho du khách
                </p>
              </div>

              {/* Form thêm nhanh */}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newRegionName}
                  onChange={(e) => setNewRegionName(e.target.value)}
                  placeholder="Thêm vùng (VD: Tây Bắc, Tây Nguyên...)"
                  className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                />
                <button
                  type="button"
                  onClick={handleAddRegion}
                  className="px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Plus size={14} />
                  <span>Thêm vùng</span>
                </button>
              </div>
            </div>

            {/* Danh sách các vùng miền */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {regions.map((reg) => (
                <div
                  key={reg.id}
                  className={`p-4 rounded-xl border transition-all flex items-center justify-between ${
                    reg.isVisible
                      ? "bg-slate-50/80 border-slate-200"
                      : "bg-slate-100/60 border-slate-200 opacity-60"
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">{reg.name}</span>
                      <span className="font-mono text-[10px] text-slate-400 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                        {reg.code}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1 font-medium">
                      {reg.count} điểm di tích đã gán
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleToggleRegionVisibility(reg.id)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-teal-700 hover:bg-teal-50 transition-colors cursor-pointer"
                      title={reg.isVisible ? "Ẩn vùng miền này" : "Hiện vùng miền này"}
                    >
                      {reg.isVisible ? <Eye size={15} /> : <EyeOff size={15} />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 1.2 Quản lý danh mục Chủ đề di sản */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs space-y-4">
            <div className="pb-3 border-b border-slate-100">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                Chủ Đề & Thể Loại Di Sản (Heritage Themes)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Các phân loại văn hóa chuẩn hóa giúp AI phân loại nội dung thuyết minh và nhiệm vụ du khách
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {themes.map((theme) => (
                <div
                  key={theme.id}
                  className={`p-4 rounded-xl border transition-all flex flex-col justify-between ${
                    theme.isVisible
                      ? "bg-white border-slate-200 shadow-2xs hover:border-slate-300"
                      : "bg-slate-50 border-slate-200 opacity-60"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-md text-[10.5px] font-bold border mb-1.5 ${theme.color}`}
                      >
                        {theme.count} điểm di tích
                      </span>
                      <h4 className="font-bold text-slate-900 text-sm">{theme.name}</h4>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        {theme.description}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleToggleThemeVisibility(theme.id)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
                      title={theme.isVisible ? "Ẩn phân loại" : "Hiện phân loại"}
                    >
                      {theme.isVisible ? <Eye size={16} /> : <EyeOff size={16} />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 1.3 Quản lý Loại nhiệm vụ tương tác thực địa (Task Types) */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs space-y-4">
            <div className="pb-3 border-b border-slate-100">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                Cơ Chế Nhiệm Vụ Trải Nghiệm Thực Địa (On-site Task Types)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Các phương thức tương tác được phép tạo bởi Content Provider và kiểm duyệt bởi Moderator
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {taskTypes.map((task) => {
                const Icon = task.icon;
                return (
                  <div
                    key={task.id}
                    className={`p-4 rounded-xl border transition-all flex items-start gap-3.5 ${
                      task.isEnabled
                        ? "bg-white border-slate-200 shadow-2xs"
                        : "bg-slate-50 border-slate-200 opacity-60"
                    }`}
                  >
                    <div className={`p-3 rounded-xl ${task.iconColor} shrink-0`}>
                      <Icon size={20} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-slate-900 text-xs">{task.title}</h4>
                        <button
                          type="button"
                          onClick={() => handleToggleTaskType(task.id)}
                          className="cursor-pointer"
                          title={task.isEnabled ? "Đang bật" : "Đang tắt"}
                        >
                          {task.isEnabled ? (
                            <ToggleRight size={26} className="text-teal-600" />
                          ) : (
                            <ToggleLeft size={26} className="text-slate-400" />
                          )}
                        </button>
                      </div>
                      <p className="text-[11.5px] text-slate-500 mt-1 leading-relaxed">
                        {task.description}
                      </p>
                      <span className="inline-block mt-2 text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-200 font-mono">
                        {task.badge}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ────────────────────────────────────────────────────────
          TAB 2: CƠ CHẾ GAME HÓA & ĐIỂM THƯỞNG (GAMIFICATION ENGINE)
      ──────────────────────────────────────────────────────── */}
      {activeTab === "gamification" && (
        <div className="space-y-6">
          {/* 2.1 Các ô thiết lập điểm thưởng tương tác */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs space-y-4">
            <div className="pb-3 border-b border-slate-100">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                Định Mức Điểm Thưởng Di Sản (Base Heritage Points)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Cấu hình số điểm du khách nhận được ngay sau khi hoàn thành các thử thách on-site
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Thử thách GPS */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-emerald-600" />
                    <label className="font-bold text-xs text-slate-800">
                      Check-in GPS Thực Địa
                    </label>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    Bắt buộc
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Số điểm cộng khi du khách vào đúng vùng geofence 60m:
                </p>
                <div className="relative pt-1">
                  <input
                    type="number"
                    value={gamificationPoints.gpsCheckin}
                    onChange={(e) =>
                      setGamificationPoints({
                        ...gamificationPoints,
                        gpsCheckin: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm font-black text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                  />
                  <span className="absolute inset-y-0 right-0 pr-3 pt-1 flex items-center text-xs font-bold text-slate-400 pointer-events-none">
                    điểm / lượt
                  </span>
                </div>
              </div>

              {/* Trả lời đúng Quiz */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <HelpCircle size={16} className="text-purple-600" />
                    <label className="font-bold text-xs text-slate-800">
                      Đúng Câu Hỏi Lịch Sử
                    </label>
                  </div>
                  <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">
                    Kiến thức
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Số điểm thưởng cho mỗi câu trắc nghiệm chính xác:
                </p>
                <div className="relative pt-1">
                  <input
                    type="number"
                    value={gamificationPoints.quizCorrect}
                    onChange={(e) =>
                      setGamificationPoints({
                        ...gamificationPoints,
                        quizCorrect: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm font-black text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                  />
                  <span className="absolute inset-y-0 right-0 pr-3 pt-1 flex items-center text-xs font-bold text-slate-400 pointer-events-none">
                    điểm / câu
                  </span>
                </div>
              </div>

              {/* Hoàn thành Photo Challenge */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Camera size={16} className="text-amber-600" />
                    <label className="font-bold text-xs text-slate-800">
                      Săn Ảnh Di Sản Đạt Chuẩn
                    </label>
                  </div>
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                    Thẩm định
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Số điểm thưởng khi ảnh được Moderator phê duyệt:
                </p>
                <div className="relative pt-1">
                  <input
                    type="number"
                    value={gamificationPoints.photoChallenge}
                    onChange={(e) =>
                      setGamificationPoints({
                        ...gamificationPoints,
                        photoChallenge: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm font-black text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                  />
                  <span className="absolute inset-y-0 right-0 pr-3 pt-1 flex items-center text-xs font-bold text-slate-400 pointer-events-none">
                    điểm / ảnh
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 2.2 Quản lý Danh hiệu người dùng (Tier Ranks) */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs space-y-4">
            <div className="pb-3 border-b border-slate-100">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                Hệ Thống Cấp Bậc & Danh Hiệu Du Khách (Tier Ranks)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Các mốc tích lũy để thăng hạng tài khoản, cấp đặc quyền giảm giá vé và mở khóa quà tặng
              </p>
            </div>

            <div className="space-y-3.5">
              {tierRanks.map((tier) => (
                <div
                  key={tier.id}
                  className="p-4 rounded-xl bg-slate-50/70 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center font-black text-sm shadow-2xs">
                      <Sparkles size={18} className="text-amber-500" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
                          {tier.name}
                        </h4>
                        <span
                          className={`text-[10.5px] px-2 py-0.5 rounded-full border ${tier.badgeColor}`}
                        >
                          {tier.range}
                        </span>
                      </div>
                      <p className="text-[11.5px] text-slate-500 mt-1 leading-relaxed">
                        <strong>Quyền lợi:</strong> {tier.perk}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <span className="text-[11px] font-mono text-slate-400 bg-white px-2 py-1 rounded border border-slate-200">
                      Ngưỡng: &gt;= {tier.minPoints} pts
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ────────────────────────────────────────────────────────
          TAB 3: CẤU HÌNH PHÍ SÀN & CHÍNH SÁCH GIÁ (PRICING & FEES)
      ──────────────────────────────────────────────────────── */}
      {activeTab === "pricing" && (
        <div className="space-y-6">
          {/* 3.1 Thiết lập tỷ lệ phí sàn chiết khấu */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs space-y-4">
            <div className="pb-3 border-b border-slate-100">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                Tỷ Lệ Phí Nền Tảng (Platform Commission Rate)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Mức phí trích lại tự động trên mỗi giao dịch vé trải nghiệm để duy trì máy chủ, GPS và AI
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              {/* Ô nhập tỷ lệ phí */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Mức phí chiết khấu mặc định
                </label>
                <div className="relative max-w-xs">
                  <input
                    type="number"
                    min={0}
                    max={50}
                    value={platformFeePercent}
                    onChange={(e) => setPlatformFeePercent(Number(e.target.value))}
                    className="w-full pl-4 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl text-lg font-black text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-500 font-black text-base">
                    %
                  </div>
                </div>
                <p className="text-xs text-slate-400">
                  Mức khuyến nghị ngành du lịch văn hóa: 8% - 12%.
                </p>
              </div>

              {/* Hộp mô phỏng phân chia doanh thu */}
              <div className="p-4 bg-teal-50/60 rounded-2xl border border-teal-200 text-xs space-y-2">
                <p className="font-bold text-teal-900 flex items-center gap-1.5">
                  <Info size={14} />
                  <span>Mô phỏng phân chia với vé 100.000 đ:</span>
                </p>
                <div className="flex justify-between pt-1 border-t border-teal-200/60">
                  <span className="text-slate-600">Sàn vietculture giữ lại ({platformFeePercent}%):</span>
                  <span className="font-black text-teal-800">
                    {(100000 * (platformFeePercent / 100)).toLocaleString("vi-VN")} đ
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Đối tác điểm đến nhận về ({100 - platformFeePercent}%):</span>
                  <span className="font-black text-slate-900">
                    {(100000 * ((100 - platformFeePercent) / 100)).toLocaleString("vi-VN")} đ
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 3.2 Tùy chọn miễn phí phí sàn cho di tích đặc biệt */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2">
                  <Landmark size={18} className="text-amber-600" />
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                    Chính Sách Hỗ Trợ Di Tích Quốc Gia Đặc Biệt (0% Phí Sàn)
                  </h3>
                </div>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Khi bật chính sách này, 100% doanh thu bán vé số của các quần thể Di tích Quốc gia Đặc biệt (Văn Miếu, Hoàng Thành, Cố Đô Hoa Lư, Cố Đô Huế) sẽ được chuyển trọn vẹn cho Ban Quản Lý di tích để phục vụ công tác tu bổ, bảo tồn di sản.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setExemptSpecialMonuments(!exemptSpecialMonuments)}
                className="cursor-pointer self-start sm:self-center"
                title={exemptSpecialMonuments ? "Đang áp dụng miễn phí" : "Không áp dụng"}
              >
                {exemptSpecialMonuments ? (
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
                    <ToggleRight size={26} className="text-emerald-600" />
                    <span>Đang áp dụng</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-400 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
                    <ToggleLeft size={26} className="text-slate-400" />
                    <span>Đang tắt</span>
                  </div>
                )}
              </button>
            </div>
          </div>

          {/* 3.3 Cấu hình Cổng thanh toán mặc định */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs space-y-4">
            <div className="pb-3 border-b border-slate-100">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                Cổng Thanh Toán Ưu Tiên Mặc Định (Default Payment Gateway)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Cổng thanh toán được gợi ý đầu tiên khi du khách bấm thanh toán vé trải nghiệm
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Lựa chọn VNPay */}
              <label
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3.5 ${
                  defaultGateway === "VNPay"
                    ? "bg-blue-50/70 border-blue-400 ring-2 ring-blue-500/20 shadow-2xs"
                    : "bg-slate-50/70 border-slate-200 hover:bg-slate-100/70"
                }`}
              >
                <input
                  type="radio"
                  name="defaultGateway"
                  value="VNPay"
                  checked={defaultGateway === "VNPay"}
                  onChange={() => setDefaultGateway("VNPay")}
                  className="mt-1 text-blue-600"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-black text-sm text-blue-800">Cổng VNPay-QR</span>
                    <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                      Thẻ nội địa / QR Ngân hàng
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Hỗ trợ quét mã QR từ hơn 40 ứng dụng ngân hàng tại Việt Nam, phí xử lý cổng 1.1%.
                  </p>
                </div>
              </label>

              {/* Lựa chọn MoMo */}
              <label
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3.5 ${
                  defaultGateway === "MoMo"
                    ? "bg-pink-50/70 border-pink-400 ring-2 ring-pink-500/20 shadow-2xs"
                    : "bg-slate-50/70 border-slate-200 hover:bg-slate-100/70"
                }`}
              >
                <input
                  type="radio"
                  name="defaultGateway"
                  value="MoMo"
                  checked={defaultGateway === "MoMo"}
                  onChange={() => setDefaultGateway("MoMo")}
                  className="mt-1 text-pink-600"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-black text-sm text-pink-800">Ví Điện Tử MoMo</span>
                    <span className="text-[10px] font-bold text-pink-700 bg-pink-100 px-2 py-0.5 rounded">
                      Ví số phổ biến
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Tiện lợi cho du khách trẻ tuổi, hoàn tiền nhanh tức thì về ví, phí xử lý cổng 1.2%.
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* ────────────────────────────────────────────────────────
          4. NÚT BẤM CỐ ĐỊNH Ở GÓC DƯỚI [LƯU CẤU HÌNH TOÀN HỆ THỐNG]
      ──────────────────────────────────────────────────────── */}
      <div className="fixed bottom-5 right-6 z-40">
        <button
          type="button"
          onClick={handleSaveAllConfig}
          disabled={isSaving}
          className="bg-teal-700 hover:bg-teal-800 text-white font-bold py-3 px-6 rounded-2xl shadow-xl flex items-center gap-2 cursor-pointer transition-all duration-200 hover:scale-102 active:scale-98 border border-teal-500"
        >
          {isSaving ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Đang đồng bộ cơ sở dữ liệu...</span>
            </>
          ) : (
            <>
              <Save size={18} />
              <span>Lưu Cấu Hình Toàn Hệ Thống</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
