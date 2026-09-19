"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  Sparkles,
  Compass,
  MapPin,
  Clock,
  Star,
  ChevronRight,
  ArrowLeft,
  X,
  Send,
  Navigation,
  CheckCircle2,
  Ticket,
  Calendar,
  Layers,
  Info,
  HelpCircle,
  Share2,
  Bookmark,
  Award,
  Lock,
  CreditCard,
  ShieldCheck,
} from "lucide-react";
import TouristBottomNav from "@/components/TouristBottomNav";
import CuteAIMascot from "@/components/CuteAIMascot";
import PaymentModal from "@/components/PaymentModal";
import { recommendedRoutes } from "@/data/touristMockData";

/**
 * Danh sách lộ trình du lịch văn hóa mở rộng cho màn hình Khám phá
 */
const EXTENDED_ROUTES = [
  {
    ...recommendedRoutes[0],
    coverImage: "/image/thanglong.png",
  },
  {
    ...recommendedRoutes[1],
    coverImage: "/image/gomsu.png",
  },
  {
    ...recommendedRoutes[2],
    coverImage: "image/trangan.png",
  },
  {
    id: "route_004",
    name: "Di Tích Lịch Sử & Kháng Chiến Hà Nội",
    description:
      "Ngược dòng lịch sử tìm hiểu về lòng quả cảm kiên cường của quân dân Thủ đô qua Di tích Nhà tù Hỏa Lò, Cột Cờ Hà Nội và Bảo tàng Lịch sử Quân sự Việt Nam.",
    location: "Hà Nội",
    duration: "Nửa ngày (3.5 giờ)",
    ticketPrice: "50.000 đ",
    rewardPoints: "+100 pts",
    difficulty: "Dễ",
    rating: 4.7,
    reviewCount: 940,
    category: "history",
    coverImage: "/image/vanmieu.png",
    tags: ["Lịch sử", "Di tích", "Kháng chiến"],
    stops: [
      { order: 1, name: "Di tích Nhà tù Hỏa Lò", duration: "1.5 giờ" },
      { order: 2, name: "Cột Cờ Hà Nội", duration: "45 phút" },
      { order: 3, name: "Bảo tàng Lịch sử Quân sự", duration: "1 giờ" },
    ],
  },
];

// Danh mục tag lọc dạng viên thuốc
const FILTER_TAGS = [
  { id: "all", label: "Tất cả", count: 4 },
  { id: "history", label: "Di tích lịch sử", count: 2 },
  { id: "craft", label: "Làng nghề", count: 1 },
  { id: "scenery", label: "Danh thắng di sản", count: 1 },
  { id: "free", label: "Miễn phí vé", count: 1 },
];

// Gợi ý câu hỏi nhanh cho AI Lập Tour
const AI_QUICK_CHIPS = [
  { id: "qc_afternoon", text: "Rảnh buổi chiều tại Hà Nội ☕" },
  { id: "qc_pottery", text: "Thích tự tay làm gốm & chụp ảnh 🏺" },
  { id: "qc_unesco", text: "Tour di tích lịch sử UNESCO 🏛️" },
  { id: "qc_trangan", text: "Khám phá Tràng An 1 ngày có chèo thuyền 🚣" },
];

export default function ExploreRoutesPage() {
  // Chế độ kép: 'direct' (Tìm trực tiếp) | 'ai' (AI Lập Tour)
  const [activeMode, setActiveMode] = useState("direct");

  // State Tim truc tiep
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // ──────────────────────────────────────────────────────────────────
  // STATE QUAN LY VE DA MUA & THANH TOAN
  // 'route_002' (Gom Bat Trang) la mien phi nen mac dinh da so huu
  // ──────────────────────────────────────────────────────────────────
  /** Danh sach id cac lo trinh nguoi dung da so huu */
  const [purchasedRouteIds, setPurchasedRouteIds] = useState(["route_002"]);
  /** Trang thai mo / dong modal thanh toan */
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  /** Lo trinh dang cho thanh toan */
  const [selectedRouteForPayment, setSelectedRouteForPayment] = useState(null);
  /** Trang thai spinner khi dang xu ly thanh toan */
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  /** Phuong thuc thanh toan duoc chon */
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("vnpay");

  // State AI Conversational Planner
  const [chatMessages, setChatMessages] = useState([
    {
      id: "msg_ai_intro",
      sender: "ai",
      text: "Xin chào bạn! 👋 Tôi là Bé AI Hướng Dẫn Viên Du Lịch Văn Hóa. Hãy cho tôi biết nhu cầu của bạn (ví dụ: bạn rảnh mấy tiếng, thích làm đồ thủ công, thích chụp ảnh hay muốn tìm hiểu di tích nào?), tôi sẽ lập ngay lộ trình hoàn hảo nhất cho bạn nhé!",
      time: "Vừa xong",
      suggestedRoute: null,
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isAiTyping, setIsAiTyping] = useState(false);
  const chatBottomRef = useRef(null);

  // Hien thi Toast thong bao
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // ──────────────────────────────────────────────────────────────────
  // HELPERS: Kiem tra quyen truy cap lo trinh
  // ──────────────────────────────────────────────────────────────────

  /** Kiem tra lo trinh co mien phi khong */
  const isFree = (route) =>
    route.ticketPrice.toLowerCase().includes("mien phi") ||
    route.ticketPrice === "0" ||
    route.ticketPrice === "0 d";

  /** Kiem tra nguoi dung da mua lo trinh nay chua */
  const isPurchased = (route) => purchasedRouteIds.includes(route.id);

  /** Co quyen truy cap = mien phi HOAC da mua */
  const hasAccess = (route) => isFree(route) || isPurchased(route);

  /**
   * Xu ly click nut chinh tren card:
   * - Co quyen: mo modal chi tiet
   * - Chua mua: mo modal thanh toan
   */
  const handleRouteAction = (route) => {
    if (hasAccess(route)) {
      setSelectedRoute(route);
    } else {
      setSelectedRouteForPayment(route);
      setIsPaymentOpen(true);
    }
  };

  /** Gia lap xu ly thanh toan thanh cong */
  const handleConfirmPayment = () => {
    if (!selectedRouteForPayment) return;
    setIsProcessingPayment(true);
    setTimeout(() => {
      setPurchasedRouteIds((prev) => [...prev, selectedRouteForPayment.id]);
      setIsProcessingPayment(false);
      setIsPaymentOpen(false);
      // Mo modal chi tiet sau khi mua thanh cong
      setSelectedRoute(selectedRouteForPayment);
      setSelectedRouteForPayment(null);
      showToast(
        "Thanh toan thanh cong! Bat dau kham pha lo trinh: " +
        selectedRouteForPayment.name
      );
    }, 1800);
  };

  // Cuộn chat xuống đáy khi có tin nhắn mới
  useEffect(() => {
    if (activeMode === "ai") {
      chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages, isAiTyping, activeMode]);

  // Xử lý lọc danh sách lộ trình theo từ khóa & tag
  const filteredRoutes = EXTENDED_ROUTES.filter((route) => {
    const matchesSearch =
      route.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      route.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      route.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      route.stops.some((s) => s.name.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    if (selectedTag === "all") return true;
    if (selectedTag === "history") return route.tags.some((t) => t.includes("Lịch sử") || t.includes("UNESCO"));
    if (selectedTag === "craft") return route.tags.some((t) => t.includes("Làng nghề") || t.includes("Thủ công"));
    if (selectedTag === "scenery") return route.tags.some((t) => t.includes("Thiên nhiên") || t.includes("Danh thắng"));
    if (selectedTag === "free") return route.ticketPrice.toLowerCase().includes("miễn phí");

    return true;
  });

  // Xử lý gửi tin nhắn trong chế độ AI Lập Tour
  const handleSendChatMessage = (textToSend) => {
    const query = textToSend.trim();
    if (!query) return;

    // 1. Thêm tin nhắn của User
    const userMsg = {
      id: `user_${Date.now()}`,
      sender: "user",
      text: query,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setChatInput("");
    setIsAiTyping(true);

    // 2. Bé AI phân tích và phản hồi sau 1000ms
    setTimeout(() => {
      const lower = query.toLowerCase();
      let matchedRoute = null;
      let replyText = "";

      if (lower.includes("gốm") || lower.includes("bát tràng") || lower.includes("thủ công")) {
        matchedRoute = EXTENDED_ROUTES.find((r) => r.id === "route_002");
        replyText =
          "Tuyệt vời! Nếu bạn thích tự tay nặn gốm và chụp ảnh cùng những lò gốm cổ kính, 'Làng Nghề Gốm Bát Tràng' là lựa chọn lý tưởng nhất. Tour này chỉ mất nửa ngày, vé vào làng hoàn toàn miễn phí!";
      } else if (lower.includes("tràng an") || lower.includes("ninh bình") || lower.includes("thuyền") || lower.includes("núi")) {
        matchedRoute = EXTENDED_ROUTES.find((r) => r.id === "route_003");
        replyText =
          "Một lựa chọn tuyệt mỹ! 'Quần Thể Di Sản Tràng An' sẽ đưa bạn ngồi thuyền xuôi dòng sông thơ mộng, len qua các hang động kỳ ảo và viếng thăm các đền đài ngàn năm tuổi giữa non nước hữu tình.";
      } else if (lower.includes("chiều") || lower.includes("kháng chiến") || lower.includes("hỏa lò")) {
        matchedRoute = EXTENDED_ROUTES.find((r) => r.id === "route_004") || EXTENDED_ROUTES[0];
        replyText =
          "Một buổi chiều đầy ý nghĩa lịch sử! Bạn có thể bắt đầu với Di tích Nhà tù Hỏa Lò, check-in Cột Cờ Hà Nội và dạo mát ngắm hoàng hôn Thủ đô nhé.";
      } else {
        matchedRoute = EXTENDED_ROUTES.find((r) => r.id === "route_001");
        replyText =
          "Theo nhu cầu của bạn, tôi đề xuất lộ trình văn hóa trọng điểm 'Hành Trình Ngàn Năm Văn Hiến'. Bạn sẽ được khám phá trọn vẹn trường đại học đầu tiên Văn Miếu và Hoàng Thành Thăng Long di sản UNESCO!";
      }

      const aiMsg = {
        id: `ai_${Date.now()}`,
        sender: "ai",
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        suggestedRoute: matchedRoute,
      };

      setIsAiTyping(false);
      setChatMessages((prev) => [...prev, aiMsg]);
    }, 1000);
  };

  return (
    <div className="w-full min-h-screen bg-slate-100/80 flex justify-center items-start">
      {/* ══════════════════════════════════════════════════════════
          KHUNG GIAO DIỆN MOBILE VIEW
          max-w-md mx-auto min-h-screen bg-slate-50 relative pb-20 shadow-2xl border-x border-slate-200 font-sans
      ══════════════════════════════════════════════════════════ */}
      <div className="w-full max-w-md mx-auto min-h-screen bg-slate-50 relative pb-20 shadow-2xl border-x border-slate-200 font-sans flex flex-col">

        {/* Toast thông báo tương tác nhanh */}
        {toastMessage && (
          <div className="fixed top-4 left-1/2 -translate-x-1/2 max-w-sm w-11/12 z-50 bg-emerald-600/95 backdrop-blur-md text-white text-xs font-semibold px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 border border-emerald-400/30 animate-bounce">
            <Sparkles size={16} className="text-amber-300 flex-shrink-0" />
            <span className="leading-snug">{toastMessage}</span>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════
            HEADER & DUAL MODE SWITCH (Chế độ kép)
        ══════════════════════════════════════════════════════════ */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 pt-3 pb-2.5 shadow-xs">
          {/* Top Bar với nút quay lại và tiêu đề trang */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <Link
                href="/"
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors active:scale-95"
                title="Quay lại Trang chủ"
              >
                <ArrowLeft size={17} />
              </Link>
              <div>
                <h1 className="text-sm font-extrabold text-slate-800 leading-tight">
                  Lộ Trình Du Lịch Văn Hóa
                </h1>
                <p className="text-[10px] text-slate-500 font-medium">
                  Khám phá di sản Việt Nam thông minh
                </p>
              </div>
            </div>

            {/* Badge vị trí Hà Nội */}
            <div className="flex items-center gap-1 text-[11px] font-semibold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-full border border-sky-100">
              <MapPin size={12} className="text-sky-600" />
              <span>Hà Nội</span>
            </div>
          </div>

          {/* ── Nút chuyển đổi chế độ kép (Dual Mode Segmented Control) ── */}
          <div className="grid grid-cols-2 p-1 bg-slate-100/90 rounded-2xl border border-slate-200/80">
            {/* Tab 1: Tìm trực tiếp */}
            <button
              type="button"
              onClick={() => setActiveMode("direct")}
              className={`flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeMode === "direct"
                  ? "bg-white text-sky-800 shadow-xs border border-slate-200/60"
                  : "text-slate-500 hover:text-slate-700"
                }`}
            >
              <Search size={14} className={activeMode === "direct" ? "text-sky-600" : "text-slate-400"} />
              <span>Tìm trực tiếp</span>
            </button>

            {/* Tab 2: AI Lập Tour */}
            <button
              type="button"
              onClick={() => setActiveMode("ai")}
              className={`flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer relative ${activeMode === "ai"
                  ? "bg-white text-emerald-800 shadow-xs border border-slate-200/60"
                  : "text-slate-500 hover:text-slate-700"
                }`}
            >
              <Sparkles size={14} className={activeMode === "ai" ? "text-emerald-600" : "text-slate-400"} />
              <span>AI Lập Tour</span>
              {/* Badge "Hot" nhỏ */}
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[8px] font-black px-1.5 py-0.2 rounded-full uppercase tracking-tighter animate-pulse">
                AI
              </span>
            </button>
          </div>
        </header>

        {/* ══════════════════════════════════════════════════════════
            NỘI DUNG CHẾ ĐỘ 1: TÌM TRỰC TIẾP (DIRECT SEARCH MODE)
        ══════════════════════════════════════════════════════════ */}
        {activeMode === "direct" && (
          <main className="flex-1 px-4 py-3 space-y-4">
            {/* Ô input tìm kiếm địa danh */}
            <div className="relative">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm Văn Miếu, Bát Tràng, Tràng An..."
                className="w-full bg-white border border-slate-200 rounded-2xl pl-10 pr-9 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 shadow-2xs transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  aria-label="Xóa từ khóa"
                >
                  <X size={15} />
                </button>
              )}
            </div>

            {/* Hàng tag lọc dạng viên thuốc (Filter Pills) */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
              {FILTER_TAGS.map((tag) => (
                <button
                  key={tag.id}
                  type="button"
                  onClick={() => setSelectedTag(tag.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex-shrink-0 flex items-center gap-1.5 ${selectedTag === tag.id
                      ? "bg-sky-600 text-white shadow-xs"
                      : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                >
                  <span>{tag.label}</span>
                </button>
              ))}
            </div>

            {/* Số lượng kết quả */}
            <div className="flex items-center justify-between text-[11px] text-slate-500 px-0.5">
              <span>Tìm thấy <b>{filteredRoutes.length}</b> lộ trình di sản</span>
              <span className="text-sky-600 font-medium flex items-center gap-1">
                <Compass size={12} /> Sắp xếp theo gợi ý
              </span>
            </div>

            {/* Danh sách các thẻ lộ trình văn hóa */}
            <div className="space-y-4">
              {filteredRoutes.map((route) => (
                <article
                  key={route.id}
                  className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md hover:border-slate-200 transition-all duration-300 group"
                >
                  {/* Ảnh cover thật với các tag nổi */}
                  <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={route.coverImage}
                      alt={route.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    {/* Tag Giá vé ở góc trên trái */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[11px] font-extrabold shadow-sm backdrop-blur-md ${route.ticketPrice.toLowerCase().includes("miễn phí")
                            ? "bg-emerald-500/90 text-white"
                            : "bg-white/95 text-slate-800 border border-white/80"
                          }`}
                      >
                        {route.ticketPrice}
                      </span>
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-black/40 text-white backdrop-blur-md border border-white/20 flex items-center gap-1">
                        <Clock size={11} className="text-sky-300" />
                        {route.duration}
                      </span>
                    </div>

                    {/* Badge Điểm thưởng & Đánh giá góc trên phải */}
                    <div className="absolute top-3 right-3 flex items-center gap-1 bg-amber-400/95 text-amber-950 font-black text-xs px-2.5 py-1 rounded-full shadow-sm backdrop-blur-md">
                      <Star size={12} className="fill-amber-950 text-amber-950" />
                      <span>{route.rating}</span>
                    </div>

                    {/* Tên lộ trình đè trên chân ảnh */}
                    <div className="absolute bottom-3 inset-x-3 text-white">
                      <div className="flex items-center gap-1.5 text-[10px] text-sky-200 font-semibold mb-0.5">
                        <MapPin size={11} />
                        <span>{route.location}</span>
                        <span>•</span>
                        <span>{route.rewardPoints}</span>
                      </div>
                      <h3 className="text-sm font-extrabold text-white leading-tight drop-shadow-sm">
                        {route.name}
                      </h3>
                    </div>
                  </div>

                  {/* Nội dung chi tiết & Các trạm dừng thực tế */}
                  <div className="p-4 space-y-3">
                    {/* Mô tả ngắn */}
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                      {route.description}
                    </p>

                    {/* Trạm dừng chân thực tế (Timeline các trạm) */}
                    <div className="bg-slate-50/80 rounded-2xl p-3 border border-slate-100">
                      <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">
                        Trạm dừng chân thực tế ({route.stops.length} điểm đến)
                      </p>
                      <div className="space-y-2">
                        {route.stops.map((stop, idx) => (
                          <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-700">
                            <span className="w-5 h-5 rounded-full bg-sky-100 text-sky-700 text-[10px] font-black flex items-center justify-center flex-shrink-0">
                              {stop.order}
                            </span>
                            <span className="font-semibold flex-1 truncate">{stop.name}</span>
                            <span className="text-[11px] text-slate-400 flex-shrink-0">{stop.duration}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Nut hanh dong chinh — Phan nhanh theo quyen truy cap */}
                    {hasAccess(route) ? (
                      /* Co quyen (mien phi hoac da mua): BAT DAU KHAM PHA */
                      <button
                        type="button"
                        onClick={() => setSelectedRoute(route)}
                        className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white rounded-2xl text-xs font-bold shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Navigation size={14} />
                        <span>
                          {isPurchased(route) && !isFree(route)
                            ? "Vé đã mua — Bắt đầu khám phá"
                            : "Bắt đầu khám phá lộ trình"}
                        </span>
                        <ChevronRight size={14} />
                      </button>
                    ) : (
                      /* Chua mua: THANH TOAN MO KHOA */
                      <button
                        type="button"
                        onClick={() => handleRouteAction(route)}
                        className="w-full py-3 px-4 bg-sky-600 hover:bg-sky-700 active:scale-[0.98] text-white rounded-2xl text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Lock size={13} />
                        <span>Thanh toán {route.ticketPrice} để mở khóa</span>
                        <ChevronRight size={14} />
                      </button>
                    )}
                  </div>
                </article>
              ))}

              {filteredRoutes.length === 0 && (
                <div className="text-center py-12 bg-white rounded-3xl border border-slate-100 p-6">
                  <p className="text-2xl mb-2">🔍</p>
                  <p className="text-xs font-bold text-slate-700">Không tìm thấy lộ trình phù hợp</p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Thử đổi từ khóa hoặc chọn tag lọc khác
                  </p>
                </div>
              )}
            </div>
          </main>
        )}

        {/* ══════════════════════════════════════════════════════════
            NỘI DUNG CHẾ ĐỘ 2: CHATBOT AI LẬP TOUR THEO YÊU CẦU
            (AI Conversational Tour Planner)
        ══════════════════════════════════════════════════════════ */}
        {activeMode === "ai" && (
          <main className="flex-1 flex flex-col h-[calc(100vh-140px)]">
            {/* Banner giới thiệu Bé AI Hướng Dẫn */}
            <div className="px-4 py-2.5 bg-gradient-to-r from-emerald-50 via-teal-50 to-sky-50 border-b border-emerald-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-white border border-emerald-200/80 flex items-center justify-center flex-shrink-0 shadow-2xs">
                  <CuteAIMascot size="sm" withHat={true} isFloating={false} />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs font-bold text-emerald-900">Bé AI Lập Tour Di Sản</p>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  </div>
                  <p className="text-[10px] text-emerald-700">
                    Cá nhân hóa theo sở thích & thời gian rảnh
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-white px-2 py-0.5 rounded-full border border-emerald-200">
                24/7 AI
              </span>
            </div>

            {/* Danh sách các tin nhắn trao đổi trong khung chat */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3.5">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-end gap-2.5 ${msg.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                >
                  {/* Avatar AI */}
                  {msg.sender === "ai" && (
                    <div className="w-7 h-7 rounded-xl bg-cyan-50 border border-cyan-200 flex items-center justify-center flex-shrink-0 mb-1 overflow-hidden shadow-2xs">
                      <CuteAIMascot size="sm" withHat={false} isFloating={false} />
                    </div>
                  )}

                  <div className="max-w-[85%] space-y-2">
                    {/* Bong bóng tin nhắn */}
                    <div
                      className={`p-3 text-xs leading-relaxed ${msg.sender === "user"
                          ? "bg-sky-600 text-white rounded-2xl rounded-tr-xs shadow-xs"
                          : "bg-white text-slate-800 rounded-2xl rounded-tl-xs shadow-xs border border-slate-100"
                        }`}
                    >
                      <p>{msg.text}</p>
                      <p
                        className={`text-[9px] mt-1 text-right font-medium ${msg.sender === "user" ? "text-sky-200" : "text-slate-400"
                          }`}
                      >
                        {msg.time}
                      </p>
                    </div>

                    {/* Thẻ lộ trình gợi ý nổi bật trực tiếp trong chat nếu có */}
                    {msg.suggestedRoute && (
                      <div className="bg-white rounded-2xl border-2 border-emerald-400 shadow-md p-3 space-y-2.5 animate-in fade-in zoom-in-95 duration-300">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500 text-white flex items-center gap-1">
                            <Sparkles size={10} />
                            GỢI Ý RIÊNG CHO BẠN
                          </span>
                          <span className="text-xs font-extrabold text-emerald-600">
                            {msg.suggestedRoute.ticketPrice}
                          </span>
                        </div>

                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={msg.suggestedRoute.coverImage}
                          alt={msg.suggestedRoute.name}
                          className="w-full h-28 object-cover rounded-xl"
                        />

                        <div>
                          <h4 className="text-xs font-bold text-slate-800">
                            {msg.suggestedRoute.name}
                          </h4>
                          <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-0.5">
                            <span className="flex items-center gap-0.5">
                              <Clock size={11} /> {msg.suggestedRoute.duration}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-0.5">
                              <Star size={11} className="fill-amber-400 text-amber-400" />{" "}
                              {msg.suggestedRoute.rating}
                            </span>
                            <span>•</span>
                            <span className="text-emerald-600 font-bold">
                              {msg.suggestedRoute.rewardPoints}
                            </span>
                          </div>
                        </div>

                        {/* Nút hành động trực tiếp: [Bắt đầu đi ngay] */}
                        <div className="grid grid-cols-2 gap-2 pt-1">
                          <button
                            type="button"
                            onClick={() => setSelectedRoute(msg.suggestedRoute)}
                            className="py-2 px-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-[11px] font-bold transition-all text-center"
                          >
                            Xem chi tiết
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              showToast(`🚀 Đã kích hoạt lộ trình: ${msg.suggestedRoute.name}!`);
                              setSelectedRoute(msg.suggestedRoute);
                            }}
                            className="py-2 px-2.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white rounded-xl text-[11px] font-bold shadow-xs transition-all flex items-center justify-center gap-1 cursor-pointer"
                          >
                            <span>Bắt đầu đi ngay</span>
                            <Navigation size={12} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Trạng thái Bé AI đang tính toán / gõ phím */}
              {isAiTyping && (
                <div className="flex items-end gap-2.5 justify-start">
                  <div className="w-7 h-7 rounded-xl bg-cyan-50 border border-cyan-200 flex items-center justify-center flex-shrink-0 mb-1 shadow-2xs">
                    <CuteAIMascot size="sm" withHat={false} isFloating={false} />
                  </div>
                  <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-xs p-3 shadow-xs flex items-center gap-1.5 text-xs text-slate-500">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" />
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                    <span className="text-[10px] font-medium text-slate-400 ml-1">
                      Bé AI đang tính lộ trình tối ưu...
                    </span>
                  </div>
                </div>
              )}

              <div ref={chatBottomRef} />
            </div>

            {/* ── Hàng chip câu hỏi nhanh (Quick Chips) phía trên thanh nhập liệu ── */}
            <div className="px-4 py-2 bg-white/80 backdrop-blur-xs border-t border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 mb-1.5 flex items-center gap-1">
                <Sparkles size={11} className="text-amber-500" />
                Gợi ý nhanh cho bạn:
              </p>
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
                {AI_QUICK_CHIPS.map((chip) => (
                  <button
                    key={chip.id}
                    type="button"
                    onClick={() => handleSendChatMessage(chip.text)}
                    className="px-2.5 py-1.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/70 hover:bg-emerald-100 hover:border-emerald-300 transition-all flex-shrink-0 cursor-pointer active:scale-95 text-left"
                  >
                    {chip.text}
                  </button>
                ))}
              </div>
            </div>

            {/* Thanh nhập liệu chat */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendChatMessage(chatInput);
              }}
              className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
            >
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Nhắn nhu cầu của bạn (thời gian, sở thích)..."
                className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition-all"
              />
              <button
                type="submit"
                disabled={!chatInput.trim()}
                className={`w-9 h-9 rounded-2xl flex items-center justify-center text-white transition-all cursor-pointer ${chatInput.trim()
                    ? "bg-emerald-600 hover:bg-emerald-700 shadow-xs active:scale-95"
                    : "bg-slate-300 cursor-not-allowed"
                  }`}
                aria-label="Gửi yêu cầu"
              >
                <Send size={15} />
              </button>
            </form>
          </main>
        )}

        {/* ══════════════════════════════════════════════════════════
            MODAL CHI TIẾT LỘ TRÌNH (ROUTE DETAIL MODAL)
        ══════════════════════════════════════════════════════════ */}
        {selectedRoute && (
          <div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end justify-center animate-in fade-in duration-200"
            onClick={() => setSelectedRoute(null)}
          >
            <div
              className="w-full max-w-md bg-white rounded-t-3xl shadow-2xl border-t border-slate-200 max-h-[85vh] overflow-y-auto flex flex-col animate-in slide-in-from-bottom duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header ảnh lớn với nút đóng */}
              <div className="relative h-52 w-full overflow-hidden bg-slate-900">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedRoute.coverImage}
                  alt={selectedRoute.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <button
                  type="button"
                  onClick={() => setSelectedRoute(null)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-md transition-colors cursor-pointer"
                  aria-label="Đóng"
                >
                  <X size={18} />
                </button>

                <div className="absolute bottom-4 inset-x-4 text-white">
                  <span className="inline-block text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-emerald-500 text-white mb-1 shadow-xs">
                    {selectedRoute.ticketPrice}
                  </span>
                  <h2 className="text-base font-extrabold leading-snug drop-shadow-sm">
                    {selectedRoute.name}
                  </h2>
                  <div className="flex items-center gap-2 text-[11px] text-sky-200 mt-1">
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {selectedRoute.duration}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Star size={12} className="fill-amber-400 text-amber-400" /> {selectedRoute.rating} ({selectedRoute.reviewCount} đánh giá)
                    </span>
                  </div>
                </div>
              </div>

              {/* Thân Modal */}
              <div className="p-4 space-y-4">
                {/* Mô tả lộ trình */}
                <div>
                  <h3 className="text-xs font-bold text-slate-800 mb-1">Mô tả hành trình</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {selectedRoute.description}
                  </p>
                </div>

                {/* Danh sách trạm dừng chi tiết */}
                <div>
                  <h3 className="text-xs font-bold text-slate-800 mb-2">
                    Lịch trình trạm dừng chân thực tế ({selectedRoute.stops.length} điểm)
                  </h3>
                  <div className="space-y-3 relative before:absolute before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-sky-200">
                    {selectedRoute.stops.map((stop, idx) => (
                      <div key={idx} className="flex items-start gap-3 relative z-10">
                        <div className="w-6 h-6 rounded-full bg-sky-600 text-white text-xs font-extrabold flex items-center justify-center flex-shrink-0 shadow-xs">
                          {stop.order}
                        </div>
                        <div className="bg-slate-50 border border-slate-100 rounded-xl p-2.5 flex-1">
                          <p className="text-xs font-bold text-slate-800">{stop.name}</p>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            Thời gian khuyến nghị: <b>{stop.duration}</b>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Thông tin vé & điểm thưởng */}
                <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-3 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider">
                      Điểm thưởng hoàn thành
                    </p>
                    <p className="text-sm font-black text-emerald-700">
                      {selectedRoute.rewardPoints} vào ví di sản
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                    <Award size={20} />
                  </div>
                </div>

                {/* Nut CTA trong Modal chi tiet — phan nhanh quyen truy cap */}
                <div className="pt-1 pb-2">
                  {hasAccess(selectedRoute) ? (
                    /* Co quyen: Bat dau hanh trinh GPS */
                    <button
                      type="button"
                      onClick={() => {
                        showToast(`Bat GPS dan duong cho "${selectedRoute.name}"!`);
                        setSelectedRoute(null);
                      }}
                      className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white rounded-2xl text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Navigation size={16} />
                      <span>Bắt đầu hành trình (Bật GPS chỉ đường)</span>
                    </button>
                  ) : (
                    /* Chua mua: Thanh toan ngay */
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedRoute(null);
                        setSelectedRouteForPayment(selectedRoute);
                        setIsPaymentOpen(true);
                      }}
                      className="w-full py-3 bg-sky-600 hover:bg-sky-700 active:scale-[0.98] text-white rounded-2xl text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Lock size={15} />
                      <span>
                        Mua vé {selectedRoute.ticketPrice} &amp; Khám phá ngay
                      </span>
                      <ChevronRight size={14} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════
            PAYMENT MODAL — Component PaymentModal tai su dung
            3 buoc: idle (chon phuong thuc) → loading → success (phao hoa + QR)
        ══════════════════════════════════════════════════════════ */}
        <PaymentModal
          isOpen={isPaymentOpen && !!selectedRouteForPayment}
          onClose={() => {
            setIsPaymentOpen(false);
            setSelectedRouteForPayment(null);
          }}
          route={selectedRouteForPayment}
          onSuccess={(routeId) => {
            if (routeId) {
              setPurchasedRouteIds((prev) =>
                prev.includes(routeId) ? prev : [...prev, routeId]
              );
            }
          }}
        />

        {/* ══════════════════════════════════════════════════════════
            BOTTOM NAVIGATION BAR (TouristBottomNav)
        ══════════════════════════════════════════════════════════ */}
        <TouristBottomNav
          activeTab="routes"
          setActiveTab={(tab) => {
            if (tab === "home") {
              window.location.href = "/";
            }
          }}
          onOpenCheckIn={() => {
            showToast("Mo camera quet ma Check-in di tich!");
          }}
        />
      </div>
    </div>
  );
}
