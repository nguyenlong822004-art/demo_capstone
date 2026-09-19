"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  PhoneCall,
  Sparkles,
  Gift,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  ArrowRight,
  Compass,
  AlertCircle,
  Loader2,
  ChevronDown,
  Landmark,
  Crown,
} from "lucide-react";

/**
 * Trang Xác Thực Du Khách (Authentication Page) - VietCulture
 * Thiết kế giao diện Web Split-Screen chuẩn màn hình lớn (Desktop-First)
 * 
 * - Cột trái (5/12): Hero banner di tích Việt Nam ngập nắng (Tràng An / Văn Miếu),
 *   logo bông sen vietculture, slogan, huy hiệu +100 điểm thưởng và hotline 1900 6888.
 * - Cột phải (7/12): Thanh tab chuyển đổi [Đăng nhập] / [Tạo tài khoản mới], các trường nhập liệu
 *   với tính năng ẩn/hiện mật khẩu, nút hành động chuẩn màu sắc tươi sáng và nút đăng nhập mạng xã hội.
 */
export default function AuthPage() {
  const router = useRouter();

  // Trạng thái tab đang chọn: 'login' (Đăng nhập) | 'register' (Tạo tài khoản)
  const [activeTab, setActiveTab] = useState("login");

  // Vai trò đăng nhập: 'tourist' (Khách du lịch) | 'provider' (Đối tác điểm đến) | 'moderator' (Kiểm duyệt viên)
  const [selectedRole, setSelectedRole] = useState("tourist");

  // Cấu hình vai trò
  const roleOptions = [
    {
      id: "tourist",
      label: "Khách du lịch",
      subLabel: "Tourist",
      icon: User,
      targetPath: "/",
      activeClasses: "bg-sky-50 border-sky-400 text-sky-800 shadow-xs ring-2 ring-sky-500/20",
    },
    {
      id: "provider",
      label: "Đối tác điểm đến",
      subLabel: "Content Provider",
      icon: Landmark,
      targetPath: "/provider",
      activeClasses: "bg-emerald-50 border-emerald-500 text-emerald-800 shadow-xs ring-2 ring-emerald-500/20",
    },
    {
      id: "moderator",
      label: "Kiểm duyệt viên",
      subLabel: "Content Moderator",
      icon: ShieldCheck,
      targetPath: "/moderator",
      activeClasses: "bg-teal-50 border-teal-500 text-teal-800 font-bold shadow-xs ring-2 ring-teal-500/20",
    },
    {
      id: "admin",
      label: "Quản trị viên cấp cao",
      subLabel: "Administrator",
      icon: Crown,
      targetPath: "/admin",
      activeClasses: "bg-rose-50 border-rose-500 text-rose-800 font-bold shadow-xs ring-2 ring-rose-500/20",
    },
  ];

  // Trạng thái ẩn/hiện mật khẩu
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Trạng thái menu dropdown chọn vai trò
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

  // Trạng thái loading và thông báo phản hồi (Toast / Alert)
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", message: "" });

  // Dữ liệu form Đăng nhập
  const [loginForm, setLoginForm] = useState({
    identifier: "",
    password: "",
    rememberMe: true,
  });

  // Dữ liệu form Đăng ký
  const [registerForm, setRegisterForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: true,
  });

  // Di tích nổi bật hiển thị ở cột bên trái (Mặc định Tràng An - Ninh Bình)
  const [activeBanner, setActiveBanner] = useState("trangan");

  const heritageBanners = {
    trangan: {
      name: "Quần thể Danh thắng Tràng An",
      location: "Ninh Bình, Việt Nam",
      image: "/image/trangan.png",
      badge: "Di sản Kép Thế giới UNESCO",
    },
    vanmieu: {
      name: "Văn Miếu - Quốc Tử Giám",
      location: "Hà Nội, Việt Nam",
      image: "/image/vanmieu.png",
      badge: "Di tích Quốc gia Đặc biệt",
    },
  };

  const currentBanner = heritageBanners[activeBanner] || heritageBanners.trangan;

  // Cập nhật giá trị form đăng nhập
  const handleLoginChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLoginForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Cập nhật giá trị form đăng ký
  const handleRegisterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRegisterForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Hiển thị thông báo phản hồi
  const showFeedback = (type, message) => {
    setFeedback({ type, message });
    setTimeout(() => {
      setFeedback({ type: "", message: "" });
    }, 4000);
  };

  // Chuyển hướng ngay lập tức theo vai trò / phân hệ được chọn
  const handleRoleSelectAndNavigate = (roleId) => {
    setSelectedRole(roleId);
    setIsRoleDropdownOpen(false);
    const targetOption = roleOptions.find((r) => r.id === roleId) || roleOptions[0];

    const mockUserData = {
      tourist: {
        name: "Nguyễn An",
        email: "dukhach@vietculture.vn",
        roleTitle: "Khách du lịch (Tourist)",
      },
      provider: {
        name: "Ban Quản Lý Tràng An",
        email: "doitac@vietculture.vn",
        roleTitle: "Đối tác di tích (Content Provider)",
      },
      moderator: {
        name: "Trần Văn Bình",
        email: "kiemduyet@vietculture.vn",
        roleTitle: "Kiểm duyệt viên (Content Moderator)",
      },
      admin: {
        name: "Lê Hoàng Quân",
        email: "admin@vietculture.vn",
        roleTitle: "Quản trị viên cấp cao (Administrator)",
      },
    };

    const currentUser = mockUserData[roleId] || mockUserData.tourist;

    try {
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "vietculture_auth",
          JSON.stringify({
            isLoggedIn: true,
            role: roleId,
            user: {
              name: currentUser.name,
              email: currentUser.email,
              roleTitle: currentUser.roleTitle,
              rewardPoints: 1250,
            },
          })
        );
      }
    } catch {
      // Bỏ qua lỗi storage nếu có
    }

    showFeedback("success", `Đang chuyển tới phân hệ: ${targetOption.label}...`);
    setTimeout(() => {
      router.push(targetOption.targetPath);
    }, 250);
  };

  // Xử lý gửi form Đăng nhập
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!loginForm.identifier.trim()) {
      showFeedback("error", "Vui lòng nhập tài khoản hoặc email của bạn.");
      return;
    }
    if (!loginForm.password) {
      showFeedback("error", "Vui lòng nhập mật khẩu đăng nhập.");
      return;
    }

    setIsLoading(true);
    showFeedback("info", "Đang xác thực thông tin tài khoản...");

    // Giả lập kết nối xác thực và lưu phiên đăng nhập
    setTimeout(() => {
      setIsLoading(false);
      const activeOption =
        roleOptions.find((r) => r.id === selectedRole) || roleOptions[0];

      try {
        if (typeof window !== "undefined") {
          localStorage.setItem(
            "vietculture_auth",
            JSON.stringify({
              isLoggedIn: true,
              role: selectedRole,
              user: {
                name: loginForm.identifier.includes("@")
                  ? loginForm.identifier.split("@")[0]
                  : loginForm.identifier,
                email: loginForm.identifier,
                roleTitle: activeOption.label,
                rewardPoints: 1250,
              },
            })
          );
        }
      } catch {
        // Bỏ qua lỗi truy cập storage nếu có
      }

      showFeedback(
        "success",
        `Đăng nhập thành công với vai trò ${activeOption.label}! Đang chuyển hướng...`
      );
      setTimeout(() => {
        router.push(activeOption.targetPath);
      }, 900);
    }, 1100);
  };

  // Xử lý gửi form Đăng ký
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!registerForm.fullName.trim()) {
      showFeedback("error", "Vui lòng nhập họ và tên của bạn.");
      return;
    }
    if (!registerForm.phone.trim()) {
      showFeedback("error", "Vui lòng nhập số điện thoại liên hệ.");
      return;
    }
    if (!registerForm.email.trim()) {
      showFeedback("error", "Vui lòng nhập địa chỉ email hợp lệ.");
      return;
    }
    if (registerForm.password.length < 6) {
      showFeedback("error", "Mật khẩu phải có độ dài tối thiểu 6 ký tự.");
      return;
    }
    if (registerForm.password !== registerForm.confirmPassword) {
      showFeedback("error", "Mật khẩu xác nhận không trùng khớp.");
      return;
    }
    if (!registerForm.agreeTerms) {
      showFeedback("error", "Bạn cần đồng ý với điều khoản sử dụng của VietCulture.");
      return;
    }

    setIsLoading(true);
    showFeedback("info", "Đang khởi tạo hồ sơ du khách mới...");

    // Giả lập đăng ký thành công và tặng ngay 100 điểm thưởng chào mừng
    setTimeout(() => {
      setIsLoading(false);
      try {
        if (typeof window !== "undefined") {
          localStorage.setItem(
            "vietculture_auth",
            JSON.stringify({
              isLoggedIn: true,
              user: {
                name: registerForm.fullName,
                email: registerForm.email,
                phone: registerForm.phone,
                rewardPoints: 1350, // +100 điểm thưởng chào mừng
              },
            })
          );
        }
      } catch {
        // Bỏ qua lỗi truy cập storage
      }

      showFeedback(
        "success",
        "Chào mừng bạn đến với VietCulture! Bạn vừa nhận +100 điểm thưởng di sản."
      );
      setTimeout(() => {
        router.push("/");
      }, 1300);
    }, 1400);
  };

  // Đăng nhập nhanh qua mạng xã hội (Google / Apple)
  const handleSocialAuth = (provider) => {
    setIsLoading(true);
    showFeedback("info", `Đang kết nối với tài khoản ${provider}...`);
    setTimeout(() => {
      setIsLoading(false);
      try {
        if (typeof window !== "undefined") {
          localStorage.setItem(
            "vietculture_auth",
            JSON.stringify({
              isLoggedIn: true,
              user: {
                name: `Du khách ${provider}`,
                email: `user.${provider.toLowerCase()}@vietculture.vn`,
                rewardPoints: 1350,
              },
            })
          );
        }
      } catch {
        // Bỏ qua lỗi
      }
      showFeedback("success", `Đăng nhập qua ${provider} thành công!`);
      setTimeout(() => {
        router.push("/");
      }, 900);
    }, 1100);
  };

  return (
    <main className="h-screen w-screen max-h-screen overflow-hidden bg-slate-100/70 flex items-center justify-center p-4 sm:p-6 relative font-sans">
      {/* ── Nền họa tiết ánh sáng nhẹ nhàng (Tươi sáng, không dùng nền tối hay màu neon) ── */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-sky-100/60 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-emerald-100/60 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 h-80 bg-amber-50/70 rounded-full blur-3xl pointer-events-none" />

      {/* ── Thông báo tương tác Toast nổi bật ── */}
      {feedback.message && (
        <div
          className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 max-w-md w-11/12 px-4 py-2.5 rounded-2xl shadow-xl border backdrop-blur-md flex items-center gap-3 transition-all animate-in fade-in slide-in-from-top-4 duration-300 ${feedback.type === "error"
              ? "bg-rose-50 text-rose-800 border-rose-200"
              : feedback.type === "success"
                ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                : "bg-sky-50 text-sky-800 border-sky-200"
            }`}
        >
          {feedback.type === "error" ? (
            <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
          ) : feedback.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          ) : (
            <Sparkles className="w-5 h-5 text-sky-600 flex-shrink-0" />
          )}
          <span className="text-xs sm:text-sm font-medium leading-relaxed">
            {feedback.message}
          </span>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════
          KHUNG CARD LỚN SPLIT-SCREEN CHUẨN TỶ LỆ MÀN HÌNH MÁY TÍNH
          w-full max-w-5xl xl:max-w-6xl h-[88vh] max-h-[820px] min-h-[580px]
      ══════════════════════════════════════════════════════════ */}
      <div className="w-full max-w-5xl xl:max-w-6xl h-[88vh] max-h-[820px] min-h-[580px] bg-white rounded-3xl shadow-2xl shadow-slate-200/80 border border-slate-100 overflow-hidden grid grid-cols-1 lg:grid-cols-12 z-10 transition-all">

        {/* ────────────────────────────────────────────────────────
            CỘT TRÁI (CHIẾM 5/12): HERO BANNER DI TÍCH VIỆT NAM
            Sắc nét ngập nắng + Logo bông sen + Slogan + Điểm thưởng + Hotline
        ──────────────────────────────────────────────────────── */}
        <aside className="lg:col-span-5 relative p-8 xl:p-9 flex flex-col justify-between text-white overflow-hidden">
          {/* Ảnh nền di tích Việt Nam sắc nét ngập nắng */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={currentBanner.image}
            alt={currentBanner.name}
            className="absolute inset-0 w-full h-full object-cover object-center scale-105 hover:scale-100 transition-transform duration-1000 ease-out"
            onError={(e) => {
              e.currentTarget.src =
                "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80";
            }}
          />

          {/* Lớp phủ đa tầng ấm áp ngập tràn ánh nắng tự nhiên */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-emerald-950/45 to-sky-950/40 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/30 via-transparent to-transparent pointer-events-none" />

          {/* Họa tiết ánh sáng vàng di sản ấm áp */}
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-amber-400/20 rounded-full blur-2xl pointer-events-none" />

          {/* Header Cột Trái: Logo Bông Sen vietculture & Chuyển đổi di tích */}
          <div className="relative z-10">
            <div className="flex items-center justify-between gap-2">
              {/* Logo bông sen thương hiệu VietCulture */}
              <div className="inline-flex items-center gap-2.5 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full shadow-md border border-white/80">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/image/logo.png"
                  alt="VietCulture Lotus Logo"
                  className="w-7 h-7 rounded-full object-cover border border-emerald-200"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
                <div className="flex items-center tracking-tight leading-none">
                  <span className="text-sm sm:text-base font-black tracking-tight text-[#00A86B]">
                    viet
                  </span>
                  <span className="text-sm sm:text-base font-black tracking-tight text-[#0288D1]">
                    culture
                  </span>
                </div>
              </div>

              {/* Nút chuyển đổi ảnh Tràng An / Văn Miếu */}
              <div className="flex items-center gap-1 bg-black/35 backdrop-blur-md p-1 rounded-full border border-white/20 text-xs">
                <button
                  type="button"
                  onClick={() => setActiveBanner("trangan")}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${activeBanner === "trangan"
                      ? "bg-white text-emerald-900 shadow-xs"
                      : "text-white/80 hover:text-white"
                    }`}
                  title="Quần thể Tràng An"
                >
                  Tràng An
                </button>
                <button
                  type="button"
                  onClick={() => setActiveBanner("vanmieu")}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${activeBanner === "vanmieu"
                      ? "bg-white text-sky-900 shadow-xs"
                      : "text-white/80 hover:text-white"
                    }`}
                  title="Văn Miếu Quốc Tử Giám"
                >
                  Văn Miếu
                </button>
              </div>
            </div>

            {/* Tag di sản thế giới */}
            <div className="mt-3.5 inline-flex items-center gap-1.5 bg-emerald-500/30 backdrop-blur-md text-emerald-100 border border-emerald-300/30 px-3 py-1 rounded-full text-xs font-semibold">
              <MapPin size={13} className="text-emerald-300 flex-shrink-0" />
              <span>{currentBanner.name}</span>
            </div>
          </div>

          {/* Phần Nội Dung Giữa: Slogan & Huy hiệu Quà Tặng +100 Điểm Thưởng */}
          <div className="relative z-10 my-auto py-3">
            <h1 className="text-2xl xl:text-3xl font-black text-white leading-tight tracking-tight drop-shadow-md">
              Chạm vào Lịch sử <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-emerald-200 to-sky-200">
                Khám phá Di sản
              </span>
            </h1>

            {/* ── THẺ QUÀ TẶNG: +100 ĐIỂM THƯỞNG (P-3.5 KÍNH MỜ SANG TRỌNG) ── */}
            <div className="mt-5 p-3.5 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 shadow-lg relative overflow-hidden group hover:bg-white/20 transition-all">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center text-amber-950 font-bold shadow-md flex-shrink-0 mt-0.5">
                  <Gift size={20} className="text-amber-950" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2 py-0.5 rounded-md bg-amber-400 text-amber-950 text-[10px] font-black uppercase tracking-wide">
                      Quà tặng thành viên
                    </span>
                    <span className="text-amber-300 font-extrabold text-sm sm:text-base">
                      +100 điểm thưởng
                    </span>
                  </div>
                  <p className="text-xs text-slate-200 mt-1.5 leading-snug">
                    Tặng ngay vào ví di sản khi đăng ký hoặc kích hoạt tài khoản để quy đổi vé tham quan và quà lưu niệm.
                  </p>
                </div>
              </div>
            </div>

            {/* Danh sách 2 đặc quyền văn hóa nổi bật */}
            <div className="mt-4 space-y-2 text-xs text-slate-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-emerald-300 flex-shrink-0" />
                <span>Thuyết minh Audio Guide di tích chuẩn xác</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-sky-300 flex-shrink-0" />
                <span>Bản đồ thông minh định vị trạm & check-in GPS</span>
              </div>
            </div>
          </div>

          {/* Footer Cột Trái: Hotline hỗ trợ 1900 6888 */}
          <div className="relative z-10 pt-4 border-t border-white/20 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-emerald-500/30 border border-emerald-400/40 flex items-center justify-center text-emerald-300">
                <PhoneCall size={16} className="animate-pulse" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-semibold text-slate-300 tracking-wider">
                  Tổng đài hỗ trợ 24/7
                </p>
                <a
                  href="tel:19006888"
                  className="text-base sm:text-lg font-black text-amber-300 hover:text-amber-200 tracking-wide transition-colors"
                >
                  1900 6888
                </a>
              </div>
            </div>

            <span className="text-xs text-slate-300 hidden sm:inline-block">
              vietculture.vn
            </span>
          </div>
        </aside>

        {/* ────────────────────────────────────────────────────────
            CỘT PHẢI (CHIẾM 7/12): FORM NỀN TRẮNG RỘNG THOÁNG
            Tab chuyển đổi [Đăng nhập] / [Tạo tài khoản] + Form inputs + Social
        ──────────────────────────────────────────────────────── */}
        <section className="lg:col-span-7 bg-white p-8 xl:p-10 flex flex-col justify-between overflow-y-auto">
          <div>
            {/* Thanh Tab Ngang chuyển đổi mượt mà giữa Đăng nhập & Tạo tài khoản mới */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3.5 mb-4">
              <div className="bg-slate-100 p-1 rounded-2xl flex items-center gap-1 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setActiveTab("login")}
                  className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${activeTab === "login"
                      ? "bg-white text-sky-700 shadow-xs shadow-slate-200"
                      : "text-slate-500 hover:text-slate-800"
                    }`}
                >
                  Đăng nhập
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("register")}
                  className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${activeTab === "register"
                      ? "bg-white text-emerald-700 shadow-xs shadow-slate-200"
                      : "text-slate-500 hover:text-slate-800"
                    }`}
                >
                  Tạo tài khoản mới
                </button>
              </div>

              {/* Dropdown Menu chọn Vai trò tiếng Việt ở góc trên bên phải */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                  className={`inline-flex items-center gap-2 text-xs sm:text-sm font-bold px-3.5 py-2 rounded-xl border transition-all cursor-pointer select-none ${isRoleDropdownOpen
                      ? "bg-teal-50 text-teal-800 border-teal-400 shadow-xs ring-2 ring-teal-500/20"
                      : "bg-slate-100 hover:bg-slate-200/80 text-slate-700 border-slate-200/80"
                    }`}
                  title="Chọn vai trò truy cập"
                >
                  <Compass size={15} className="text-teal-600 flex-shrink-0" />
                  <span className="whitespace-nowrap">
                    {roleOptions.find((r) => r.id === selectedRole)?.label || "Chọn vai trò"}
                  </span>
                  <ChevronDown
                    size={14}
                    className={`text-slate-400 transition-transform duration-200 flex-shrink-0 ${isRoleDropdownOpen ? "rotate-180 text-teal-600" : ""
                      }`}
                  />
                </button>

                {/* Danh sách các vai trò xổ xuống */}
                {isRoleDropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setIsRoleDropdownOpen(false)}
                    />

                    <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                      <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Chuyển nhanh đến vai trò
                      </div>

                      {/* 1. Vai trò Khách Du Lịch */}
                      <button
                        type="button"
                        onClick={() => handleRoleSelectAndNavigate("tourist")}
                        className={`w-full p-2.5 rounded-xl text-left flex items-start gap-3 transition-colors cursor-pointer group ${selectedRole === "tourist" ? "bg-sky-50" : "hover:bg-slate-50"
                          }`}
                      >
                        <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform mt-0.5">
                          <User size={16} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-sky-800">
                            Khách du lịch
                          </p>
                          <p className="text-[10px] text-slate-500 leading-snug">
                            Khám phá di tích, check-in GPS & nhận quà
                          </p>
                        </div>
                      </button>

                      {/* 2. Vai trò Đối Tác Di Tích */}
                      <button
                        type="button"
                        onClick={() => handleRoleSelectAndNavigate("provider")}
                        className={`w-full p-2.5 rounded-xl text-left flex items-start gap-3 transition-colors cursor-pointer group mt-1 ${selectedRole === "provider" ? "bg-emerald-50" : "hover:bg-slate-50"
                          }`}
                      >
                        <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform mt-0.5">
                          <Landmark size={16} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-emerald-800">
                            Đối tác di tích
                          </p>
                          <p className="text-[10px] text-slate-500 leading-snug">
                            Quản lý điểm đến, lộ trình & nhiệm vụ
                          </p>
                        </div>
                      </button>

                      {/* 3. Vai trò Kiểm Duyệt Viên */}
                      <button
                        type="button"
                        onClick={() => handleRoleSelectAndNavigate("moderator")}
                        className={`w-full p-2.5 rounded-xl text-left flex items-start gap-3 transition-colors cursor-pointer group mt-1 ${selectedRole === "moderator" ? "bg-teal-50" : "hover:bg-slate-50"
                          }`}
                      >
                        <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform mt-0.5">
                          <ShieldCheck size={16} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-teal-800">
                            Kiểm duyệt viên
                          </p>
                          <p className="text-[10px] text-slate-500 leading-snug">
                            Thẩm định hồ sơ di tích & duyệt nội dung
                          </p>
                        </div>
                      </button>

                      {/* 4. Vai trò Quản Trị Viên */}
                      <button
                        type="button"
                        onClick={() => handleRoleSelectAndNavigate("admin")}
                        className={`w-full p-2.5 rounded-xl text-left flex items-start gap-3 transition-colors cursor-pointer group mt-1 ${selectedRole === "admin" ? "bg-rose-50" : "hover:bg-slate-50"
                          }`}
                      >
                        <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-800 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform mt-0.5">
                          <Crown size={16} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-rose-800">
                            Quản trị viên
                          </p>
                          <p className="text-[10px] text-slate-500 leading-snug">
                            Vận hành toàn sàn, tài chính & kiểm toán
                          </p>
                        </div>
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Tiêu đề ngắn gọn tương ứng với từng Tab */}
            <div className="mb-4">
              {activeTab === "login" ? (
                <>
                  <h2 className="text-xl xl:text-2xl font-black text-slate-900 tracking-tight">
                    Chào mừng trở lại!
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Đăng nhập để tiếp tục hành trình khám phá di sản và nhận điểm thưởng.
                  </p>
                </>
              ) : (
                <>
                  <h2 className="text-xl xl:text-2xl font-black text-slate-900 tracking-tight">
                    Đăng ký tài khoản du khách
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Trải nghiệm di sản Việt Nam và nhận ngay{" "}
                    <strong className="text-emerald-600 font-semibold">+100 điểm thưởng</strong>.
                  </p>
                </>
              )}
            </div>

            {/* ══════════════════════════════════════════════════════
                FORM ĐĂNG NHẬP
            ══════════════════════════════════════════════════════ */}
            {activeTab === "login" && (
              <form onSubmit={handleLoginSubmit} className="space-y-3 sm:space-y-3.5">
                {/* Thanh xổ xuống chọn vai trò đăng nhập & Các nút chuyển nhanh */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label
                      htmlFor="login-role"
                      className="block text-xs font-semibold text-slate-700 uppercase tracking-wider"
                    >
                      Vai trò đăng nhập (Phân hệ)
                    </label>
                    <span className="text-[10.5px] text-emerald-600 font-bold">
                      ⚡ Bấm chọn chuyển phân hệ ngay
                    </span>
                  </div>

                  <div className="relative mb-2">
                    <select
                      id="login-role"
                      value={selectedRole}
                      onChange={(e) => handleRoleSelectAndNavigate(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs sm:text-sm font-bold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-600 transition-all cursor-pointer"
                    >
                      <option value="tourist">👤 Khách du lịch (Tourist) → Trang chủ</option>
                      <option value="provider">🏛️ Đối tác di tích (Content Provider) → /provider</option>
                      <option value="moderator">🛡️ Kiểm duyệt viên (Content Moderator) → /moderator</option>
                      <option value="admin">👑 Quản trị viên cấp cao (Administrator) → /admin</option>
                    </select>
                  </div>

                  {/* 4 Thẻ phân hệ bấm trực tiếp để chuyển trang tức thì */}
                  <div className="grid grid-cols-2 gap-2">
                    {roleOptions.map((role) => {
                      const Icon = role.icon;
                      const isSelected = selectedRole === role.id;
                      return (
                        <button
                          key={role.id}
                          type="button"
                          onClick={() => handleRoleSelectAndNavigate(role.id)}
                          className={`p-2.5 rounded-xl border text-left flex items-center gap-2.5 transition-all cursor-pointer group active:scale-95 ${
                            isSelected
                              ? "bg-slate-900 text-white border-slate-900 shadow-xs ring-2 ring-slate-900/10"
                              : "bg-white hover:bg-slate-50 text-slate-700 border-slate-200/90 shadow-2xs hover:border-slate-300"
                          }`}
                          title={`Vào ngay phân hệ ${role.label}`}
                        >
                          <div
                            className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${
                              isSelected
                                ? "bg-white/20 text-white"
                                : "bg-slate-100 text-slate-700 border border-slate-200/60"
                            }`}
                          >
                            <Icon size={14} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-bold truncate leading-tight">
                              {role.label}
                            </p>
                            <p
                              className={`text-[10px] truncate leading-tight mt-0.5 font-medium ${
                                isSelected ? "text-slate-300" : "text-emerald-600"
                              }`}
                            >
                              Vào ngay →
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Ô Tài khoản / Email */}
                <div>
                  <label
                    htmlFor="login-identifier"
                    className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5"
                  >
                    Tài khoản hoặc Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Mail size={16} />
                    </div>
                    <input
                      id="login-identifier"
                      name="identifier"
                      type="text"
                      value={loginForm.identifier}
                      onChange={handleLoginChange}
                      placeholder="dukhach@vietculture.vn hoặc 0912..."
                      className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-600 transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Ô Mật khẩu có icon mắt ẩn/hiện */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label
                      htmlFor="login-password"
                      className="block text-xs font-semibold text-slate-700 uppercase tracking-wider"
                    >
                      Mật khẩu
                    </label>
                    <button
                      type="button"
                      onClick={() =>
                        showFeedback(
                          "info",
                          "Liên hệ hotline 1900 6888 hoặc nhập email để cấp lại mật khẩu."
                        )
                      }
                      className="text-xs font-semibold text-sky-600 hover:text-sky-700 transition-colors"
                    >
                      Quên mật khẩu?
                    </button>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Lock size={16} />
                    </div>
                    <input
                      id="login-password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={loginForm.password}
                      onChange={handleLoginChange}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-600 transition-all"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors focus:outline-none cursor-pointer"
                      title={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {/* Ghi nhớ đăng nhập */}
                <div className="flex items-center pt-0.5">
                  <label className="flex items-center gap-2 cursor-pointer select-none text-xs text-slate-600 font-medium">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={loginForm.rememberMe}
                      onChange={handleLoginChange}
                      className="w-4 h-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                    />
                    <span>Ghi nhớ đăng nhập trên thiết bị này</span>
                  </label>
                </div>

                {/* Nút Submit chính */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full mt-2 text-white font-bold py-3 text-xs sm:text-sm rounded-xl shadow-md flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-75 cursor-pointer ${selectedRole === "moderator"
                      ? "bg-teal-700 hover:bg-teal-800 active:bg-teal-900 shadow-teal-700/20"
                      : selectedRole === "provider"
                        ? "bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 shadow-emerald-600/20"
                        : selectedRole === "admin"
                          ? "bg-rose-700 hover:bg-rose-800 active:bg-rose-900 shadow-rose-700/20"
                          : "bg-sky-600 hover:bg-sky-700 active:bg-sky-800 shadow-sky-600/20"
                    }`}
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Đang xác thực...</span>
                    </>
                  ) : (
                    <>
                      <span>
                        Đăng nhập {roleOptions.find((r) => r.id === selectedRole)?.label}
                      </span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* ══════════════════════════════════════════════════════
                FORM ĐĂNG KÝ / TẠO TÀI KHOẢN MỚI
            ══════════════════════════════════════════════════════ */}
            {activeTab === "register" && (
              <form onSubmit={handleRegisterSubmit} className="space-y-2.5 sm:space-y-3">
                {/* Hàng 1: Họ tên & Số điện thoại */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Họ tên */}
                  <div>
                    <label
                      htmlFor="register-fullname"
                      className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1"
                    >
                      Họ và tên
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <User size={15} />
                      </div>
                      <input
                        id="register-fullname"
                        name="fullName"
                        type="text"
                        value={registerForm.fullName}
                        onChange={handleRegisterChange}
                        placeholder="Nguyễn Văn A"
                        className="w-full pl-9 pr-3 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
                        required
                      />
                    </div>
                  </div>

                  {/* Số điện thoại */}
                  <div>
                    <label
                      htmlFor="register-phone"
                      className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1"
                    >
                      Số điện thoại
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <Phone size={15} />
                      </div>
                      <input
                        id="register-phone"
                        name="phone"
                        type="tel"
                        value={registerForm.phone}
                        onChange={handleRegisterChange}
                        placeholder="0912 345 678"
                        className="w-full pl-9 pr-3 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="register-email"
                    className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1"
                  >
                    Địa chỉ Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Mail size={15} />
                    </div>
                    <input
                      id="register-email"
                      name="email"
                      type="email"
                      value={registerForm.email}
                      onChange={handleRegisterChange}
                      placeholder="nguyenvana@gmail.com"
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Hàng 2: Mật khẩu & Xác nhận mật khẩu */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Mật khẩu */}
                  <div>
                    <label
                      htmlFor="register-password"
                      className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1"
                    >
                      Mật khẩu
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <Lock size={15} />
                      </div>
                      <input
                        id="register-password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={registerForm.password}
                        onChange={handleRegisterChange}
                        placeholder="Tối thiểu 6 ký tự"
                        className="w-full pl-9 pr-9 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                        title={showPassword ? "Ẩn" : "Hiện"}
                      >
                        {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                  </div>

                  {/* Xác nhận mật khẩu */}
                  <div>
                    <label
                      htmlFor="register-confirm-password"
                      className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1"
                    >
                      Xác nhận mật khẩu
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <ShieldCheck size={15} />
                      </div>
                      <input
                        id="register-confirm-password"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={registerForm.confirmPassword}
                        onChange={handleRegisterChange}
                        placeholder="Nhập lại mật khẩu"
                        className="w-full pl-9 pr-9 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                        title={showConfirmPassword ? "Ẩn" : "Hiện"}
                      >
                        {showConfirmPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Điều khoản sử dụng */}
                <div className="pt-0.5">
                  <label className="flex items-start gap-2 cursor-pointer select-none text-xs leading-relaxed text-slate-600">
                    <input
                      type="checkbox"
                      name="agreeTerms"
                      checked={registerForm.agreeTerms}
                      onChange={handleRegisterChange}
                      className="mt-0.5 w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <span>
                      Tôi đồng ý với{" "}
                      <span className="text-emerald-700 font-semibold hover:underline">
                        Điều khoản dịch vụ
                      </span>{" "}
                      và{" "}
                      <span className="text-emerald-700 font-semibold hover:underline">
                        Bảo mật di sản
                      </span>{" "}
                      của VietCulture.
                    </span>
                  </label>
                </div>

                {/* Nút Tạo tài khoản */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-2 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold py-3 text-xs sm:text-sm rounded-xl shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-75 cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Đang khởi tạo...</span>
                    </>
                  ) : (
                    <>
                      <Gift size={16} className="text-amber-300" />
                      <span>Tạo Tài Khoản & Nhận +100 Điểm</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* ────────────────────────────────────────────────────────
              NÚT ĐĂNG NHẬP MẠNG XÃ HỘI (GOOGLE & APPLE ID)
          ──────────────────────────────────────────────────────── */}
          <div className="mt-4 xl:mt-5 pt-3.5 xl:pt-4 border-t border-slate-100">
            {/* Divider */}
            <div className="relative flex items-center justify-center mb-3">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200/80" />
              </div>
              <span className="relative bg-white px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Hoặc tiếp tục với
              </span>
            </div>

            {/* 2 nút Google và Apple ID bo góc thanh lịch */}
            <div className="grid grid-cols-2 gap-3">
              {/* Nút Google */}
              <button
                type="button"
                onClick={() => handleSocialAuth("Google")}
                className="flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 active:bg-slate-100 transition-colors text-xs sm:text-sm font-semibold text-slate-700 shadow-2xs hover:shadow-xs cursor-pointer"
              >
                <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.36 7.34 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.16 0 9.94 0 12s.45 3.84 1.24 5.42l4.04-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                  />
                </svg>
                <span>Google</span>
              </button>

              {/* Nút Apple ID */}
              <button
                type="button"
                onClick={() => handleSocialAuth("Apple ID")}
                className="flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 active:bg-slate-100 transition-colors text-xs sm:text-sm font-semibold text-slate-700 shadow-2xs hover:shadow-xs cursor-pointer"
              >
                <svg
                  className="w-4 h-4 flex-shrink-0 fill-current text-slate-800"
                  viewBox="0 0 170 170"
                >
                  <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.74 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.58-7.7-11.64-13.99-5.99-9.12-10.74-19.64-14.25-31.55-3.51-11.91-5.26-23.17-5.26-33.79 0-14.34 3.42-26.31 10.27-35.91 6.85-9.6 15.65-14.51 26.41-14.74 4.58 0 9.77 1.25 15.58 3.75 5.8 2.5 9.7 3.86 11.68 4.08 2.44-.43 6.47-1.84 12.1-4.24 5.63-2.4 10.58-3.48 14.85-3.26 13.06.66 23.37 5.75 30.93 15.28-11.41 6.85-17.01 16.53-16.8 29.04.21 9.9 4.02 18.27 11.44 25.12 7.42 6.85 16.32 10.72 26.71 11.62-2.17 6.74-4.88 13.62-8.12 20.65zM119.22 31.84c0-7.39 2.67-14.34 8.01-20.85 5.34-6.51 11.96-10.49 19.86-11.94.33 1.09.49 2.18.49 3.27 0 7.39-2.73 14.5-8.19 21.34-5.46 6.84-12.16 10.66-20.1 11.46-.07-1.09-.07-2.18-.07-3.28z" />
                </svg>
                <span>Apple ID</span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
