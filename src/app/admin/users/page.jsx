"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Users,
  Search,
  Filter,
  UserCheck,
  ShieldCheck,
  Building2,
  Lock,
  Unlock,
  Eye,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  X,
  ChevronRight,
  Landmark,
  User,
  ShieldAlert,
  Crown,
  FileCheck,
  Mail,
  Phone,
  Calendar,
  Sparkles,
  ArrowRight,
  MoreVertical,
  Clock,
  ExternalLink,
} from "lucide-react";

/**
 * Trang Quản Lý Người Dùng & Cấp Quyền Hệ Thống (RBAC & User Management)
 * Đường dẫn: /admin/users
 */
export default function AdminUsersPage() {
  // State Tab phân quyền RBAC: 'all' | 'provider' | 'moderator' | 'tourist'
  const [activeTab, setActiveTab] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all"); // 'all' | 'ACTIVE' | 'PENDING' | 'LOCKED'
  const [searchQuery, setSearchQuery] = useState("");

  // State Modal
  const [selectedPartner, setSelectedPartner] = useState(null); // Modal xét duyệt đối tác
  const [roleModalUser, setRoleModalUser] = useState(null); // Modal phân lại quyền
  const [newSelectedRole, setNewSelectedRole] = useState("tourist");
  const [viewProfileUser, setViewProfileUser] = useState(null); // Modal xem chi tiết hồ sơ

  // State Toast
  const [toastMsg, setToastMsg] = useState("");

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3500);
  };

  // Dữ liệu danh sách tài khoản mẫu toàn sàn
  const [usersList, setUsersList] = useState([
    {
      id: "USR-001",
      name: "BQL Khu di tích Cố đô Hoa Lư",
      avatarLetter: "HL",
      avatarBg: "bg-amber-600 text-white",
      email: "bql.hoalu@ninhbinh.gov.vn",
      phone: "0229.362.1888",
      role: "provider",
      roleLabel: "Đối tác Điểm đến",
      roleBadge: "bg-amber-50 text-amber-800 border-amber-300",
      organization: "BQL Khu di tích Cố đô Hoa Lư",
      status: "PENDING",
      statusLabel: "Chờ xét duyệt",
      statusBadge: "bg-amber-50 text-amber-800 border-amber-300",
      joinedDate: "09/09/2026",
      // Chi tiết pháp lý đối tác
      partnerDetails: {
        agency: "Sở Văn hóa & Thể thao Tỉnh Ninh Bình",
        licenseNumber: "GP-2026/VHTT-NB",
        representative: "Nguyễn Cao Tấn",
        repTitle: "Phó Giám đốc Thường trực",
        address: "Xã Trường Yên, Huyện Hoa Lư, Tỉnh Ninh Bình",
        plannedDestinations: [
          "Đền Thờ Vua Đinh Tiên Hoàng",
          "Đền Thờ Vua Lê Đại Hành",
          "Động Am Tiên (Tuyệt Tịnh Cốc)",
          "Tuyến đường thủy sông Sào Khê khảo cổ",
        ],
        submissionNotes:
          "Đề nghị cấp quyền Portal Nhà cung cấp nội dung để tích hợp hệ thống thuyết minh song ngữ và bán vé điện tử QR Code cho mùa lễ hội 2026.",
      },
    },
    {
      id: "USR-002",
      name: "Hợp Tác Xã Lụa Tơ Tằm Vạn Phúc",
      avatarLetter: "VP",
      avatarBg: "bg-amber-600 text-white",
      email: "contact@vanphuksilk.vn",
      phone: "0912.456.789",
      role: "provider",
      roleLabel: "Đối tác Điểm đến",
      roleBadge: "bg-amber-50 text-amber-800 border-amber-300",
      organization: "HTX Làng Nghề Dệt Lụa Vạn Phúc",
      status: "PENDING",
      statusLabel: "Chờ xét duyệt",
      statusBadge: "bg-amber-50 text-amber-800 border-amber-300",
      joinedDate: "08/09/2026",
      partnerDetails: {
        agency: "UBND Phường Vạn Phúc, Quận Hà Đông, Hà Nội",
        licenseNumber: "DKKD-0102938812",
        representative: "Đỗ Thị Minh",
        repTitle: "Chủ nhiệm Hợp tác xã",
        address: "Phố Lụa, Phường Vạn Phúc, Quận Hà Đông, TP. Hà Nội",
        plannedDestinations: [
          "Xưởng dệt lụa cổ truyền nghệ nhân Triệu Văn Mão",
          "Đền Thờ Thành Hoàng Làng Dệt Lụa",
          "Con đường Ô Che Nắng Phố Lụa",
        ],
        submissionNotes:
          "Xin mở gian hàng số hóa và kết nối trải nghiệm thử thách săn ảnh thực địa cho du khách làng nghề.",
      },
    },
    {
      id: "USR-003",
      name: "BQL Di tích Văn Miếu - Quốc Tử Giám",
      avatarLetter: "VM",
      avatarBg: "bg-emerald-700 text-white",
      email: "vanmieu@hanoi.gov.vn",
      phone: "024.3845.2917",
      role: "provider",
      roleLabel: "Đối tác Điểm đến",
      roleBadge: "bg-amber-50 text-amber-800 border-amber-300",
      organization: "Trung tâm HĐ VHKH Văn Miếu - Quốc Tử Giám",
      status: "ACTIVE",
      statusLabel: "Đang hoạt động",
      statusBadge: "bg-emerald-50 text-emerald-700 border-emerald-300",
      joinedDate: "15/07/2026",
    },
    {
      id: "USR-004",
      name: "Trần Văn Bình",
      avatarLetter: "TB",
      avatarBg: "bg-teal-600 text-white",
      email: "binh.tv@vietculture.vn",
      phone: "0988.112.233",
      role: "moderator",
      roleLabel: "Kiểm duyệt viên",
      roleBadge: "bg-teal-50 text-teal-800 border-teal-300",
      organization: "Ban Kiểm Chuẩn Di Sản Quốc Gia",
      status: "ACTIVE",
      statusLabel: "Đang hoạt động",
      statusBadge: "bg-emerald-50 text-emerald-700 border-emerald-300",
      joinedDate: "01/06/2026",
    },
    {
      id: "USR-005",
      name: "Lê Thu Thủy",
      avatarLetter: "TT",
      avatarBg: "bg-teal-600 text-white",
      email: "thuy.le@vietculture.vn",
      phone: "0977.334.455",
      role: "moderator",
      roleLabel: "Kiểm duyệt viên",
      roleBadge: "bg-teal-50 text-teal-800 border-teal-300",
      organization: "Ban Kiểm Chuẩn Di Sản Quốc Gia",
      status: "ACTIVE",
      statusLabel: "Đang hoạt động",
      statusBadge: "bg-emerald-50 text-emerald-700 border-emerald-300",
      joinedDate: "10/06/2026",
    },
    {
      id: "USR-006",
      name: "Lê Hoàng Quân",
      avatarLetter: "LQ",
      avatarBg: "bg-purple-900 text-white",
      email: "quan.lh@vietculture.vn",
      phone: "0909.999.888",
      role: "admin",
      roleLabel: "Quản trị viên",
      roleBadge: "bg-purple-50 text-purple-800 border-purple-300 font-bold",
      organization: "Hội đồng Điều hành Tối cao vietculture",
      status: "ACTIVE",
      statusLabel: "Đang hoạt động",
      statusBadge: "bg-emerald-50 text-emerald-700 border-emerald-300",
      joinedDate: "01/01/2026",
    },
    {
      id: "USR-007",
      name: "Đoàn Văn Hậu",
      avatarLetter: "DH",
      avatarBg: "bg-sky-600 text-white",
      email: "hau.doan@gmail.com",
      phone: "0904.128.999",
      role: "tourist",
      roleLabel: "Khách du lịch",
      roleBadge: "bg-sky-50 text-sky-800 border-sky-300",
      organization: "Khách cá nhân (Hạng Vàng)",
      status: "ACTIVE",
      statusLabel: "Đang hoạt động",
      statusBadge: "bg-emerald-50 text-emerald-700 border-emerald-300",
      joinedDate: "20/08/2026",
    },
    {
      id: "USR-008",
      name: "Hoàng Văn Tuấn",
      avatarLetter: "HT",
      avatarBg: "bg-slate-400 text-white",
      email: "tuan.hoangviolation@yahoo.com",
      phone: "0933.888.777",
      role: "tourist",
      roleLabel: "Khách du lịch",
      roleBadge: "bg-sky-50 text-sky-800 border-sky-300",
      organization: "Khách cá nhân",
      status: "LOCKED",
      statusLabel: "Bị tạm khóa",
      statusBadge: "bg-rose-50 text-rose-700 border-rose-300",
      joinedDate: "05/09/2026",
    },
  ]);

  // Bộ lọc tài khoản
  const filteredUsers = usersList.filter((u) => {
    // 1. Lọc theo Tab vai trò
    if (activeTab === "provider" && u.role !== "provider") return false;
    if (activeTab === "moderator" && u.role !== "moderator") return false;
    if (activeTab === "tourist" && u.role !== "tourist") return false;

    // 2. Lọc theo trạng thái
    if (statusFilter !== "all" && u.status !== statusFilter) return false;

    // 3. Tìm kiếm
    const q = searchQuery.toLowerCase().trim();
    if (q) {
      const matchName = u.name.toLowerCase().includes(q);
      const matchEmail = u.email.toLowerCase().includes(q);
      const matchPhone = u.phone.toLowerCase().includes(q);
      const matchOrg = u.organization.toLowerCase().includes(q);
      if (!matchName && !matchEmail && !matchPhone && !matchOrg) return false;
    }

    return true;
  });

  // Đếm số hồ sơ đối tác đang chờ duyệt
  const pendingPartnerCount = usersList.filter(
    (u) => u.role === "provider" && u.status === "PENDING"
  ).length;

  // Xử lý Phê duyệt đối tác
  const handleApprovePartner = (user) => {
    setUsersList((prev) =>
      prev.map((item) =>
        item.id === user.id
          ? {
              ...item,
              status: "ACTIVE",
              statusLabel: "Đang hoạt động",
              statusBadge: "bg-emerald-50 text-emerald-700 border-emerald-300",
            }
          : item
      )
    );
    showToast(`Đã phê duyệt và cấp quyền Content Provider cho "${user.name}" thành công!`);
    setSelectedPartner(null);
  };

  // Xử lý Từ chối / Yêu cầu bổ sung
  const handleRejectPartner = (user) => {
    showToast(`Đã gửi thông báo yêu cầu bổ sung hồ sơ pháp lý đến "${user.name}"`);
    setSelectedPartner(null);
  };

  // Xử lý Khóa / Mở khóa tài khoản
  const handleToggleLockUser = (user) => {
    const isLocking = user.status !== "LOCKED";
    setUsersList((prev) =>
      prev.map((item) =>
        item.id === user.id
          ? {
              ...item,
              status: isLocking ? "LOCKED" : "ACTIVE",
              statusLabel: isLocking ? "Bị tạm khóa" : "Đang hoạt động",
              statusBadge: isLocking
                ? "bg-rose-50 text-rose-700 border-rose-300"
                : "bg-emerald-50 text-emerald-700 border-emerald-300",
            }
          : item
      )
    );
    showToast(
      isLocking
        ? `Đã tạm khóa tài khoản của "${user.name}".`
        : `Đã mở khóa và khôi phục quyền truy cập cho "${user.name}".`
    );
  };

  // Xử lý Lưu thay đổi Phân lại quyền
  const handleSaveRoleChange = () => {
    if (!roleModalUser) return;

    const roleConfig = {
      tourist: {
        roleLabel: "Khách du lịch",
        roleBadge: "bg-sky-50 text-sky-800 border-sky-300",
      },
      provider: {
        roleLabel: "Đối tác Điểm đến",
        roleBadge: "bg-amber-50 text-amber-800 border-amber-300",
      },
      moderator: {
        roleLabel: "Kiểm duyệt viên",
        roleBadge: "bg-teal-50 text-teal-800 border-teal-300",
      },
      admin: {
        roleLabel: "Quản trị viên",
        roleBadge: "bg-purple-50 text-purple-800 border-purple-300 font-bold",
      },
    };

    const cfg = roleConfig[newSelectedRole];
    setUsersList((prev) =>
      prev.map((item) =>
        item.id === roleModalUser.id
          ? {
              ...item,
              role: newSelectedRole,
              roleLabel: cfg.roleLabel,
              roleBadge: cfg.roleBadge,
            }
          : item
      )
    );

    showToast(
      `Đã cập nhật vai trò mới cho "${roleModalUser.name}" thành: ${cfg.roleLabel}`
    );
    setRoleModalUser(null);
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
          1. HEADER & BỘ LỌC PHÂN QUYỀN (RBAC TABS)
      ──────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-600" />
              <span className="text-[11px] font-black uppercase tracking-wider text-rose-700">
                Phân Quyền & Quản Lý Thành Viên (RBAC)
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Quản Lý Người Dùng & Cấp Quyền Hệ Thống
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-3xl">
              Kiểm soát tài khoản toàn sàn, xét duyệt hồ sơ đối tác điểm đến và phân quyền nhân sự kiểm duyệt.
            </p>
          </div>

          {/* Nút tác vụ nhanh */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setActiveTab("provider");
                setStatusFilter("PENDING");
              }}
              className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
            >
              <FileCheck size={14} />
              <span>Duyệt đối tác chờ ({pendingPartnerCount})</span>
            </button>
          </div>
        </div>

        {/* 4 Tab lọc vai trò & Thanh tìm kiếm */}
        <div className="pt-2 border-t border-slate-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* 4 Tab lọc vai trò */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
            {/* Tab 1: Tất cả */}
            <button
              type="button"
              onClick={() => setActiveTab("all")}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === "all"
                  ? "bg-white text-slate-900 shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Tất cả (42,850)
            </button>

            {/* Tab 2: Đối tác Điểm đến - Provider */}
            <button
              type="button"
              onClick={() => setActiveTab("provider")}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === "provider"
                  ? "bg-white text-amber-900 shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <span>Đối tác Điểm đến - Provider (85)</span>
              {pendingPartnerCount > 0 && (
                <span className="bg-amber-100 text-amber-800 text-[10px] font-black px-2 py-0.5 rounded-full border border-amber-200">
                  {pendingPartnerCount} hồ sơ mới nộp
                </span>
              )}
            </button>

            {/* Tab 3: Kiểm duyệt viên - Moderator */}
            <button
              type="button"
              onClick={() => setActiveTab("moderator")}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === "moderator"
                  ? "bg-white text-teal-900 shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Kiểm duyệt viên - Moderator (12)
            </button>

            {/* Tab 4: Khách du lịch - Tourist */}
            <button
              type="button"
              onClick={() => setActiveTab("tourist")}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === "tourist"
                  ? "bg-white text-sky-900 shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Khách du lịch - Tourist (42,753)
            </button>
          </div>

          {/* Ô tìm kiếm & Dropdown lọc trạng thái */}
          <div className="flex items-center gap-2.5">
            {/* Lọc trạng thái */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="ACTIVE">Đang hoạt động</option>
              <option value="PENDING">Chờ kích hoạt / Xét duyệt</option>
              <option value="LOCKED">Bị tạm khóa</option>
            </select>

            {/* Tìm kiếm */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Search size={14} />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm tên, email, SĐT, đơn vị..."
                className="pl-8.5 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 w-56 sm:w-64"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────
          2. BẢNG DANH SÁCH TÀI KHOẢN CHUYÊN NGHIỆP (USER TABLE)
      ──────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold uppercase text-slate-500 tracking-wider">
                <th className="py-3.5 px-5">THÀNH VIÊN</th>
                <th className="py-3.5 px-4">VAI TRÒ</th>
                <th className="py-3.5 px-4">ĐƠN VỊ / TỔ CHỨC</th>
                <th className="py-3.5 px-4">TRẠNG THÁI</th>
                <th className="py-3.5 px-4">NGÀY THAM GIA</th>
                <th className="py-3.5 px-5 text-right">THAO TÁC</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    <p className="text-sm font-semibold">Không tìm thấy tài khoản phù hợp.</p>
                    <p className="text-xs mt-1">Hãy thử xóa bộ lọc tìm kiếm hoặc chuyển tab.</p>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50/70 transition-colors group">
                    {/* Cột 1: THÀNH VIÊN (Avatar, Tên, Email, SĐT) */}
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-xl ${user.avatarBg} font-black text-xs flex items-center justify-center shrink-0 shadow-2xs`}
                        >
                          {user.avatarLetter}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 text-sm">{user.name}</p>
                          <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-500 font-normal">
                            <span className="flex items-center gap-1">
                              <Mail size={11} className="text-slate-400" />
                              {user.email}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1 font-mono">
                              <Phone size={11} className="text-slate-400" />
                              {user.phone}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Cột 2: VAI TRÒ */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10.5px] font-bold border ${user.roleBadge}`}
                      >
                        {user.role === "tourist" && <User size={11} />}
                        {user.role === "provider" && <Landmark size={11} />}
                        {user.role === "moderator" && <ShieldCheck size={11} />}
                        {user.role === "admin" && <Crown size={11} />}
                        <span>{user.roleLabel}</span>
                      </span>
                    </td>

                    {/* Cột 3: ĐƠN VỊ / TỔ CHỨC */}
                    <td className="py-4 px-4 whitespace-nowrap text-slate-700">
                      <div className="flex items-center gap-1.5 font-medium">
                        <Building2 size={13} className="text-slate-400 shrink-0" />
                        <span className="truncate max-w-[200px]">{user.organization}</span>
                      </div>
                    </td>

                    {/* Cột 4: TRẠNG THÁI */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10.5px] font-bold border ${user.statusBadge}`}
                      >
                        {user.status === "ACTIVE" && <CheckCircle2 size={11} />}
                        {user.status === "PENDING" && <Clock size={11} />}
                        {user.status === "LOCKED" && <XCircle size={11} />}
                        <span>{user.statusLabel}</span>
                      </span>
                    </td>

                    {/* Cột 5: NGÀY THAM GIA */}
                    <td className="py-4 px-4 whitespace-nowrap text-slate-500 font-mono text-[11px]">
                      {user.joinedDate}
                    </td>

                    {/* Cột 6: THAO TÁC */}
                    <td className="py-4 px-5 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5">
                        {/* Nếu là đối tác đang chờ duyệt -> Nút Duyệt nổi bật */}
                        {user.role === "provider" && user.status === "PENDING" && (
                          <button
                            type="button"
                            onClick={() => setSelectedPartner(user)}
                            className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
                            title="Mở hồ sơ thẩm tra pháp lý"
                          >
                            <FileCheck size={13} />
                            <span>Duyệt đối tác</span>
                          </button>
                        )}

                        {/* Nút Xem hồ sơ */}
                        <button
                          type="button"
                          onClick={() => setViewProfileUser(user)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                          title="Xem chi tiết hồ sơ"
                        >
                          <Eye size={15} />
                        </button>

                        {/* Nút Phân lại quyền */}
                        <button
                          type="button"
                          onClick={() => {
                            setRoleModalUser(user);
                            setNewSelectedRole(user.role);
                          }}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-purple-700 hover:bg-purple-50 transition-colors cursor-pointer"
                          title="Phân lại quyền hệ thống (RBAC)"
                        >
                          <UserCheck size={15} />
                        </button>

                        {/* Nút Khóa / Mở khóa tài khoản */}
                        <button
                          type="button"
                          onClick={() => handleToggleLockUser(user)}
                          className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                            user.status === "LOCKED"
                              ? "text-emerald-600 hover:bg-emerald-50"
                              : "text-rose-500 hover:bg-rose-50"
                          }`}
                          title={user.status === "LOCKED" ? "Mở khóa tài khoản" : "Khóa tài khoản"}
                        >
                          {user.status === "LOCKED" ? <Unlock size={15} /> : <Lock size={15} />}
                        </button>
                      </div>
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
            Đang hiển thị <strong>{filteredUsers.length}</strong> / 42,850 tài khoản toàn sàn
          </span>
          <span className="text-[11px] text-slate-400 font-semibold">
            ● Đồng bộ cơ sở dữ liệu RBAC thời gian thực
          </span>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────
          3. MODAL XÉT DUYỆT ĐỐI TÁC MỚI (PARTNER APPROVAL MODAL)
      ──────────────────────────────────────────────────────── */}
      {selectedPartner && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
          onClick={() => setSelectedPartner(null)}
        >
          <div
            className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-6 sm:p-7 space-y-5 animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Modal */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white font-black text-base flex items-center justify-center shrink-0 shadow-xs">
                  {selectedPartner.avatarLetter}
                </div>
                <div>
                  <span className="bg-amber-100 text-amber-800 text-[10.5px] font-black px-2.5 py-0.5 rounded-full border border-amber-200">
                    Hồ Sơ Chờ Phê Duyệt Cấp Quyền Portal
                  </span>
                  <h3 className="text-lg font-black text-slate-900 mt-1">
                    {selectedPartner.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Mã hồ sơ: {selectedPartner.id} • Ngày nộp: {selectedPartner.joinedDate}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedPartner(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Thông tin pháp lý */}
            {selectedPartner.partnerDetails && (
              <div className="space-y-4 text-xs">
                <div>
                  <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-2">
                    1. Thông Tin Pháp Lý & Đại Diện Đơn Vị
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                    <div>
                      <span className="text-slate-400">Cơ quan chủ quản:</span>
                      <p className="font-bold text-slate-900 mt-0.5">
                        {selectedPartner.partnerDetails.agency}
                      </p>
                    </div>
                    <div>
                      <span className="text-slate-400">Số Giấy phép / ĐKKD:</span>
                      <p className="font-mono font-bold text-slate-900 mt-0.5">
                        {selectedPartner.partnerDetails.licenseNumber}
                      </p>
                    </div>
                    <div>
                      <span className="text-slate-400">Người đại diện theo pháp luật:</span>
                      <p className="font-bold text-slate-900 mt-0.5">
                        {selectedPartner.partnerDetails.representative} (
                        {selectedPartner.partnerDetails.repTitle})
                      </p>
                    </div>
                    <div>
                      <span className="text-slate-400">Email & Điện thoại liên hệ:</span>
                      <p className="font-medium text-slate-800 mt-0.5">
                        {selectedPartner.email} • {selectedPartner.phone}
                      </p>
                    </div>
                    <div className="sm:col-span-2">
                      <span className="text-slate-400">Địa chỉ trụ sở:</span>
                      <p className="font-medium text-slate-800 mt-0.5">
                        {selectedPartner.partnerDetails.address}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Danh mục điểm di tích dự kiến đưa lên sàn */}
                <div>
                  <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-2">
                    2. Danh Mục Điểm Di Tích Dự Kiến Số Hóa & Bán Vé
                  </h4>
                  <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                    {selectedPartner.partnerDetails.plannedDestinations.map((dest, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 bg-white rounded-xl border border-slate-200/80 flex items-center gap-2 text-slate-800 font-semibold"
                      >
                        <Landmark size={14} className="text-amber-600 shrink-0" />
                        <span>{dest}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ghi chú đệ trình */}
                <div>
                  <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-1">
                    Ghi Chú Đề Nghị Của Đơn Vị:
                  </h4>
                  <p className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 italic leading-relaxed">
                    "{selectedPartner.partnerDetails.submissionNotes}"
                  </p>
                </div>
              </div>
            )}

            {/* Cụm 2 nút quyết định */}
            <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => handleRejectPartner(selectedPartner)}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 font-bold text-xs transition-colors cursor-pointer"
              >
                Từ chối / Yêu cầu bổ sung hồ sơ
              </button>

              <button
                type="button"
                onClick={() => handleApprovePartner(selectedPartner)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors cursor-pointer shadow-xs flex items-center justify-center gap-1.5"
              >
                <CheckCircle2 size={15} />
                <span>Phê duyệt & Cấp quyền Portal</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ────────────────────────────────────────────────────────
          4. MODAL PHÂN LẠI QUYỀN (ROLE REASSIGNMENT MODAL)
      ──────────────────────────────────────────────────────── */}
      {roleModalUser && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
          onClick={() => setRoleModalUser(null)}
        >
          <div
            className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 space-y-4 animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-black text-slate-900">
                  Phân Lại Quyền Hệ Thống (RBAC)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Tài khoản: <strong>{roleModalUser.name}</strong> ({roleModalUser.email})
                </p>
              </div>

              <button
                type="button"
                onClick={() => setRoleModalUser(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <div className="space-y-2.5 text-xs">
              <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                Chọn Vai Trò Mới:
              </label>

              {/* Lựa chọn 1: Khách du lịch */}
              <label
                className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                  newSelectedRole === "tourist"
                    ? "bg-sky-50 border-sky-400 text-sky-950 ring-2 ring-sky-500/20"
                    : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100/70"
                }`}
              >
                <input
                  type="radio"
                  name="role"
                  value="tourist"
                  checked={newSelectedRole === "tourist"}
                  onChange={() => setNewSelectedRole("tourist")}
                  className="mt-1 text-sky-600"
                />
                <div>
                  <p className="font-bold">Khách du lịch (Tourist)</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Quyền cơ bản: Đặt vé, check-in GPS, tích điểm di sản.
                  </p>
                </div>
              </label>

              {/* Lựa chọn 2: Đối tác Điểm đến */}
              <label
                className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                  newSelectedRole === "provider"
                    ? "bg-amber-50 border-amber-400 text-amber-950 ring-2 ring-amber-500/20"
                    : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100/70"
                }`}
              >
                <input
                  type="radio"
                  name="role"
                  value="provider"
                  checked={newSelectedRole === "provider"}
                  onChange={() => setNewSelectedRole("provider")}
                  className="mt-1 text-amber-600"
                />
                <div>
                  <p className="font-bold">Đối tác Điểm đến (Content Provider)</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Quyền truy cập Portal: Tạo lộ trình, cấu hình giá vé, quản lý check-in.
                  </p>
                </div>
              </label>

              {/* Lựa chọn 3: Kiểm duyệt viên */}
              <label
                className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                  newSelectedRole === "moderator"
                    ? "bg-teal-50 border-teal-400 text-teal-950 ring-2 ring-teal-500/20"
                    : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100/70"
                }`}
              >
                <input
                  type="radio"
                  name="role"
                  value="moderator"
                  checked={newSelectedRole === "moderator"}
                  onChange={() => setNewSelectedRole("moderator")}
                  className="mt-1 text-teal-600"
                />
                <div>
                  <p className="font-bold">Kiểm duyệt viên (Content Moderator)</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Quyền thẩm định dữ liệu di sản, duyệt GPS, kiểm chuẩn tri thức AI.
                  </p>
                </div>
              </label>

              {/* Lựa chọn 4: Quản trị viên */}
              <label
                className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                  newSelectedRole === "admin"
                    ? "bg-purple-50 border-purple-400 text-purple-950 ring-2 ring-purple-500/20"
                    : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100/70"
                }`}
              >
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={newSelectedRole === "admin"}
                  onChange={() => setNewSelectedRole("admin")}
                  className="mt-1 text-purple-600"
                />
                <div>
                  <p className="font-bold">Quản trị viên (Super Admin)</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Toàn quyền hệ thống, quản lý tài chính, đối soát dòng tiền & kiểm toán.
                  </p>
                </div>
              </label>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setRoleModalUser(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                onClick={handleSaveRoleChange}
                className="px-4 py-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs transition-colors cursor-pointer shadow-xs"
              >
                Xác nhận phân quyền
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ────────────────────────────────────────────────────────
          5. MODAL XEM CHI TIẾT HỒ SƠ TÀI KHOẢN (USER PROFILE MODAL)
      ──────────────────────────────────────────────────────── */}
      {viewProfileUser && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
          onClick={() => setViewProfileUser(null)}
        >
          <div
            className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 space-y-4 animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div
                  className={`w-11 h-11 rounded-2xl ${viewProfileUser.avatarBg} font-black text-sm flex items-center justify-center shrink-0`}
                >
                  {viewProfileUser.avatarLetter}
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">
                    {viewProfileUser.name}
                  </h3>
                  <p className="text-xs text-slate-400 font-mono">{viewProfileUser.id}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setViewProfileUser(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">Email:</span>
                  <span className="font-semibold text-slate-800">{viewProfileUser.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Số điện thoại:</span>
                  <span className="font-mono font-semibold text-slate-800">
                    {viewProfileUser.phone}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Vai trò:</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10.5px] font-bold border ${viewProfileUser.roleBadge}`}>
                    {viewProfileUser.roleLabel}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Đơn vị / Tổ chức:</span>
                  <span className="font-semibold text-slate-800 text-right">
                    {viewProfileUser.organization}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Trạng thái:</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10.5px] font-bold border ${viewProfileUser.statusBadge}`}>
                    {viewProfileUser.statusLabel}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Ngày tham gia:</span>
                  <span className="font-mono text-slate-600">{viewProfileUser.joinedDate}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setViewProfileUser(null)}
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
              >
                Đóng thông tin
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
