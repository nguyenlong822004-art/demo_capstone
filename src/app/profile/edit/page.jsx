"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Camera,
  User,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Sparkles,
  CheckCircle2,
  Check,
  Loader2,
  Smile,
  ShieldCheck,
  Landmark,
  Palette,
  Utensils,
  PartyPopper,
  Building2,
  Compass,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Trang Chỉnh Sửa Hồ Sơ Cá Nhân Khách Du Lịch (Edit Profile)
 * Chuẩn Mobile View - Ứng dụng Du lịch Văn hóa VietCulture
 */
export default function EditProfilePage() {
  const router = useRouter();
  const fileInputRef = useRef(null);

  // ════════════════════════════════════════════════════════════
  // 1. STATE DỮ LIỆU HỒ SƠ
  // ════════════════════════════════════════════════════════════
  const [formData, setFormData] = useState({
    fullName: "Nguyễn An",
    nickname: "an_nguyen99",
    birthday: "1999-08-15",
    gender: "Nam", // "Nam" | "Nữ" | "Khác"
    phone: "0988 123 456",
    email: "nguyen.an@vietculture.vn",
    city: "Hà Nội",
    interests: ["Di tích lịch sử", "Làng nghề cổ truyền"],
    avatar:
      "https://api.dicebear.com/7.x/adventurer/svg?seed=NguyenAn&backgroundColor=b6e3f4",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Đọc dữ liệu đã lưu từ localStorage nếu có
  useEffect(() => {
    try {
      const stored = localStorage.getItem("vietculture_user_profile");
      if (stored) {
        const parsed = JSON.parse(stored);
        setFormData((prev) => ({ ...prev, ...parsed }));
      }
    } catch {
      // Fallback dữ liệu mặc định
    }
  }, []);

  // Danh sách Tỉnh / Thành phố
  const cities = [
    "Hà Nội",
    "TP. Hồ Chí Minh",
    "Ninh Bình",
    "Thừa Thiên Huế",
    "Đà Nẵng",
    "Quảng Nam",
    "Lâm Đồng",
    "Quảng Ninh",
    "Cần Thơ",
    "Khánh Hòa",
    "Hải Phòng",
    "Bắc Ninh",
  ];

  // Danh mục sở thích du lịch văn hóa phục vụ gợi ý AI
  const interestOptions = [
    { id: "heritage", label: "Di tích lịch sử", icon: Landmark },
    { id: "craft", label: "Làng nghề cổ truyền", icon: Palette },
    { id: "food", label: "Ẩm thực truyền thống", icon: Utensils },
    { id: "festival", label: "Lễ hội dân gian", icon: PartyPopper },
    { id: "spiritual", label: "Kiến trúc tâm linh", icon: Building2 },
    { id: "ar_tour", label: "Khám phá di sản AR", icon: Compass },
  ];

  // ════════════════════════════════════════════════════════════
  // 2. CÁC HÀM XỬ LÝ SỰ KIỆN
  // ════════════════════════════════════════════════════════════
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Toggle chọn nhiều sở thích văn hóa
  const handleToggleInterest = (label) => {
    setFormData((prev) => {
      const exists = prev.interests.includes(label);
      const updated = exists
        ? prev.interests.filter((item) => item !== label)
        : [...prev.interests, label];
      return { ...prev, interests: updated };
    });
  };

  // Kích hoạt chọn file ảnh đại diện
  const handleTriggerAvatarUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Xử lý đổi ảnh đại diện
  const handleAvatarFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setFormData((prev) => ({
            ...prev,
            avatar: event.target.result,
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Xử lý Lưu thông tin cá nhân
  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);

    // Lưu vào localStorage
    try {
      localStorage.setItem(
        "vietculture_user_profile",
        JSON.stringify(formData)
      );
    } catch {
      // Bỏ qua lỗi storage
    }

    // Hiệu ứng Loading nhẹ trong 0.8 giây
    setTimeout(() => {
      setIsLoading(false);
      setToastMessage("Cập nhật hồ sơ thành công!");

      // Quay về trang /profile sau khi hiển thị toast
      setTimeout(() => {
        router.push("/profile");
      }, 700);
    }, 800);
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-slate-50 relative pb-20 shadow-2xl border-x border-slate-200 font-sans select-none">
      {/* ══════════════════════════════════════════════════════════
          1. HEADER CỐ ĐỊNH TRÊN CÙNG
      ══════════════════════════════════════════════════════════ */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-100 px-4 py-3.5 flex items-center justify-between shadow-2xs">
        {/* Nút quay lại */}
        <Link
          href="/profile"
          className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors active:scale-95 cursor-pointer"
          aria-label="Quay lại hồ sơ"
        >
          <ArrowLeft size={18} />
        </Link>

        {/* Tiêu đề trang */}
        <h1 className="text-sm sm:text-base font-extrabold text-slate-800 tracking-tight">
          Chỉnh Sửa Hồ Sơ
        </h1>

        {/* Nút chữ nhỏ [Lưu] màu xanh biển nổi bật */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isLoading}
          className="text-sm font-bold text-sky-600 hover:text-sky-700 active:scale-95 transition-transform px-2 py-1 rounded-lg hover:bg-sky-50 cursor-pointer disabled:opacity-50"
        >
          {isLoading ? (
            <Loader2 size={16} className="animate-spin text-sky-600" />
          ) : (
            "Lưu"
          )}
        </button>
      </header>

      {/* ── TOAST THÔNG BÁO HOÀN TẤT ── */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 inset-x-0 mx-auto z-50 max-w-xs px-4 py-2.5 rounded-2xl bg-emerald-600 text-white font-bold text-xs sm:text-sm shadow-xl shadow-emerald-600/30 flex items-center justify-center gap-2"
          >
            <CheckCircle2 size={18} className="text-emerald-200" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════════════════════
          2. NỘI DUNG FORM CHỈNH SỬA
      ══════════════════════════════════════════════════════════ */}
      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        {/* ── KHU VỰC ĐỔI ẢNH ĐẠI DIỆN (AVATAR PICKER) ── */}
        <div className="flex flex-col items-center justify-center pt-3 pb-2">
          <div className="relative group">
            {/* Avatar tròn lớn w-24 h-24 có đường viền đôi */}
            <div className="w-24 h-24 rounded-full p-1 bg-white border-2 border-slate-200 shadow-md ring-2 ring-emerald-500/20 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={formData.avatar}
                alt="Avatar du khách"
                className="w-full h-full rounded-full object-cover bg-slate-100"
              />
            </div>

            {/* Nút icon Camera nhỏ bo tròn nền xanh ngọc */}
            <button
              type="button"
              onClick={handleTriggerAvatarUpload}
              className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center border-2 border-white shadow-md active:scale-90 transition-transform cursor-pointer"
              title="Đổi ảnh đại diện"
              aria-label="Đổi ảnh đại diện"
            >
              <Camera size={15} />
            </button>

            {/* Input file ẩn */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarFileChange}
            />
          </div>

          <p className="text-[11px] font-semibold text-slate-500 mt-2">
            Chạm vào biểu tượng máy ảnh để tải ảnh mới
          </p>
        </div>

        {/* ── NHÓM 1: THÔNG TIN CƠ BẢN ── */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs space-y-3.5">
          <div className="flex items-center gap-2 pb-1 border-b border-slate-100">
            <span className="w-1 h-3.5 bg-emerald-600 rounded-full" />
            <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Thông Tin Cơ Bản
            </h2>
          </div>

          {/* Họ và tên */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Họ và tên
            </label>
            <div className="relative">
              <User
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                placeholder="Ví dụ: Nguyễn An"
                required
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/60 focus:bg-white text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition-all font-medium"
              />
            </div>
          </div>

          {/* Tên hiển thị / Biệt danh */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Tên hiển thị / Biệt danh trên cộng đồng
            </label>
            <div className="relative">
              <Smile
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                value={formData.nickname}
                onChange={(e) => handleInputChange("nickname", e.target.value)}
                placeholder="Ví dụ: an_nguyen99"
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/60 focus:bg-white text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition-all font-medium"
              />
            </div>
          </div>

          {/* Ngày sinh & Giới tính */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Ngày sinh */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Ngày sinh
              </label>
              <div className="relative">
                <Calendar
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="date"
                  value={formData.birthday}
                  onChange={(e) => handleInputChange("birthday", e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50/60 focus:bg-white text-xs text-slate-800 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition-all font-medium"
                />
              </div>
            </div>

            {/* Giới tính - Radio pills */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Giới tính
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {["Nam", "Nữ", "Khác"].map((item) => {
                  const isSelected = formData.gender === item;
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => handleInputChange("gender", item)}
                      className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        isSelected
                          ? "bg-sky-50 border-sky-400 text-sky-700 shadow-2xs"
                          : "bg-slate-50/60 border-slate-200 text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ── NHÓM 2: THÔNG TIN LIÊN HỆ & VỊ TRÍ ── */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs space-y-3.5">
          <div className="flex items-center gap-2 pb-1 border-b border-slate-100">
            <span className="w-1 h-3.5 bg-sky-600 rounded-full" />
            <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Liên Hệ &amp; Vị Trí
            </h2>
          </div>

          {/* Số điện thoại (có badge Đã xác thực) */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700">
                Số điện thoại
              </label>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <CheckCircle2 size={11} />
                Đã xác thực
              </span>
            </div>
            <div className="relative">
              <Phone
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="0912 345 678"
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/60 focus:bg-white text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition-all font-medium font-mono"
              />
            </div>
          </div>

          {/* Địa chỉ Email */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700">
                Địa chỉ Email
              </label>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-50 text-sky-700 border border-sky-200">
                <ShieldCheck size={11} />
                Google Login
              </span>
            </div>
            <div className="relative">
              <Mail
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="nguyen.an@vietculture.vn"
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/60 focus:bg-white text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition-all font-medium"
              />
            </div>
          </div>

          {/* Tỉnh / Thành phố */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Tỉnh / Thành phố sinh sống
            </label>
            <div className="relative">
              <MapPin
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
              <select
                value={formData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 rounded-xl border border-slate-200 bg-slate-50/60 focus:bg-white text-xs sm:text-sm text-slate-800 font-semibold focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition-all appearance-none cursor-pointer"
              >
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* ── NHÓM 3: SỞ THÍCH DU LỊCH VĂN HÓA (GỢI Ý AI) ── */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-1 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="w-1 h-3.5 bg-amber-500 rounded-full" />
              <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Sở Thích Du Lịch Văn Hóa
              </h2>
            </div>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
              <Sparkles size={11} className="text-amber-500" />
              Gợi ý bởi AI
            </span>
          </div>

          <p className="text-[11px] text-slate-500 leading-relaxed font-normal">
            Chọn các chủ đề bạn quan tâm để AI đề xuất tour di sản và lộ trình check-in tối ưu.
          </p>

          {/* Danh sách Multi-select Pills */}
          <div className="flex flex-wrap gap-2 pt-1">
            {interestOptions.map((item) => {
              const Icon = item.icon;
              const isChecked = formData.interests.includes(item.label);

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleToggleInterest(item.label)}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer select-none active:scale-95 ${
                    isChecked
                      ? "bg-emerald-50 border-emerald-500 text-emerald-800 shadow-2xs ring-1 ring-emerald-400/40"
                      : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <Icon
                    size={14}
                    className={isChecked ? "text-emerald-600" : "text-slate-400"}
                  />
                  <span>{item.label}</span>
                  {isChecked && (
                    <Check size={13} className="text-emerald-600 ml-0.5" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════
            4. NÚT HÀNH ĐỘNG Ở CHÂN TRANG (BOTTOM ACTIONS)
        ══════════════════════════════════════════════════════════ */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold py-3.5 rounded-2xl shadow-md shadow-emerald-600/25 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 text-xs sm:text-sm tracking-wide uppercase"
          >
            {isLoading ? (
              <>
                <Loader2 size={18} className="animate-spin text-white" />
                <span>Đang Lưu Hồ Sơ...</span>
              </>
            ) : (
              <>
                <CheckCircle2 size={18} />
                <span>Lưu Thông Tin Cá Nhân</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
