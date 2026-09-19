"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  Camera,
  Star,
  MapPin,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  CheckCircle2,
  Sparkles,
  SlidersHorizontal,
  X,
  Send,
  Image as ImageIcon,
  Award,
  Clock,
  ThumbsUp,
  MessageSquareShare,
  Flame,
  ChevronDown,
} from "lucide-react";
import TouristBottomNav from "@/components/TouristBottomNav";
import OnSiteActivationModal from "@/components/OnSiteActivationModal";
import { currentUser } from "@/data/touristMockData";

/**
 * Dữ liệu bài đăng cộng đồng ban đầu
 */
const INITIAL_POSTS = [
  {
    id: "post_001",
    author: {
      name: "Lê Thu Hà",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      badge: "Nhà Thám Hiểm Bạc",
      badgeColor: "bg-slate-100 text-slate-700 border-slate-300",
    },
    createdAt: "2 giờ trước",
    location: "Văn Miếu - Quốc Tử Giám",
    rating: 5,
    ratingLabel: "Tuyệt vời",
    content:
      "Hôm nay mình check-in GPS và quét mã QR tại Bia Tiến Sĩ số 3, hệ thống mở khóa bài thuyết minh chi tiết rất hay! Các bạn nhớ làm thử thách Quiz để nhận đủ +100 điểm thưởng nhé.",
    image: "/image/vanmieu.png",
    imageCaption: "Góc Khuê Văn Các cổ kính phản chiếu bóng nước hồ Thiên Quang",
    category: "checkin", // "all", "checkin", "review", "tips"
    likesCount: 48,
    isLiked: false,
    commentsCount: 12,
    sharesCount: 5,
    comments: [
      {
        id: "c1",
        author: "Trần An",
        avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=TranAn",
        text: "Ảnh chụp Khuê Văn Các góc này đẹp quá bạn ơi!",
        time: "1 giờ trước",
      },
    ],
  },
  {
    id: "post_002",
    author: {
      name: "Trần Tuấn Kiệt",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      badge: "Thành viên Tích cực",
      badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
    },
    createdAt: "5 giờ trước",
    location: "Làng Gốm Bát Tràng",
    rating: 4.8,
    ratingLabel: "Rất đáng thử",
    content:
      "Lộ trình AI gợi ý tour nửa ngày ở Bát Tràng rất hợp lý, tự tay nặn gốm tại Lò Bầu Cổ cực kỳ đáng thử!",
    image: "/image/gomsu.png",
    imageCaption: "Trải nghiệm xoay gốm thủ công mộc mạc bên lò nung truyền thống",
    category: "tips",
    likesCount: 65,
    isLiked: true,
    commentsCount: 8,
    sharesCount: 9,
    comments: [
      {
        id: "c2",
        author: "Mai Linh",
        avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=MaiLinh",
        text: "Tự tay nặn xong có được mang sản phẩm về sau khi nung không bạn?",
        time: "3 giờ trước",
      },
    ],
  },
  {
    id: "post_003",
    author: {
      name: "Phạm Minh Trang",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
      badge: "Sứ Giả Di Sản",
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    createdAt: "1 ngày trước",
    location: "Hoàng Thành Thăng Long",
    rating: 5,
    ratingLabel: "Tuyệt tác",
    content:
      "Tour đêm 'Giải mã Hoàng Thành Thăng Long' thật sự chạm vào cảm xúc. Nước giếng cổ thời Trần thanh mát, kiến trúc Đoan Môn huyền ảo dưới ánh đèn đêm. Cảm giác như được xuyên không về quá khứ ngàn năm!",
    image: "/image/thanglong.png",
    imageCaption: "Đoan Môn tráng lệ uy nghiêm trong không gian ánh sáng đêm di sản",
    category: "review",
    likesCount: 92,
    isLiked: false,
    commentsCount: 24,
    sharesCount: 16,
    comments: [],
  },
];

const CATEGORY_TABS = [
  { id: "all", label: "Tất cả bài viết", icon: Sparkles },
  { id: "checkin", label: "Ảnh Check-in Mới", icon: Camera },
  { id: "review", label: "Review Điểm Đến", icon: Star },
  { id: "tips", label: "Mẹo Du Lịch Làng Nghề", icon: Flame },
];

export default function CommunityPage() {
  // Trạng thái tab & filter
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedLocationFilter, setSelectedLocationFilter] = useState("all");

  // Dữ liệu danh sách bài viết
  const [posts, setPosts] = useState(INITIAL_POSTS);

  // Trạng thái modal tương tác & chia sẻ
  const [isCheckInModalOpen, setIsCheckInModalOpen] = useState(false);
  const [isNewPostModalOpen, setIsNewPostModalOpen] = useState(false);
  const [notice, setNotice] = useState(null);

  // Form đăng bài mới
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostLocation, setNewPostLocation] = useState("Văn Miếu - Quốc Tử Giám");
  const [newPostRating, setNewPostRating] = useState(5);
  const [newPostImage, setNewPostImage] = useState("/image/vanmieu.png");

  // Bình luận nhanh mở rộng
  const [activeCommentPostId, setActiveCommentPostId] = useState(null);
  const [commentInput, setCommentInput] = useState("");

  const showNotice = (msg) => {
    setNotice(msg);
    setTimeout(() => setNotice(null), 3000);
  };

  // Toggle Like bài viết
  const handleToggleLike = (postId) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const newIsLiked = !p.isLiked;
          return {
            ...p,
            isLiked: newIsLiked,
            likesCount: newIsLiked ? p.likesCount + 1 : p.likesCount - 1,
          };
        }
        return p;
      })
    );
  };

  // Gửi bình luận mới
  const handleAddComment = (postId) => {
    if (!commentInput.trim()) return;

    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const newComment = {
            id: `c_${Date.now()}`,
            author: currentUser.name || "Nguyễn An",
            avatar: currentUser.avatar,
            text: commentInput.trim(),
            time: "Vừa xong",
          };
          return {
            ...p,
            commentsCount: p.commentsCount + 1,
            comments: [...(p.comments || []), newComment],
          };
        }
        return p;
      })
    );

    setCommentInput("");
    showNotice("Đã đăng bình luận của bạn");
  };

  // Chia sẻ bài viết
  const handleSharePost = (siteName) => {
    showNotice(`Đã sao chép liên kết chia sẻ bài viết về ${siteName}!`);
  };

  // Đăng bài viết mới từ modal
  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newPostContent.trim()) {
      showNotice("Vui lòng nhập nội dung chia sẻ!");
      return;
    }

    const newPostObj = {
      id: `post_${Date.now()}`,
      author: {
        name: currentUser.name || "Nguyễn An",
        avatar: currentUser.avatar,
        badge: "Nhà Thám Hiểm",
        badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
      },
      createdAt: "Vừa xong",
      location: newPostLocation,
      rating: newPostRating,
      ratingLabel: newPostRating >= 5 ? "Tuyệt vời" : "Rất tốt",
      content: newPostContent.trim(),
      image: newPostImage,
      imageCaption: `Ảnh thực địa check-in tại ${newPostLocation}`,
      category: "checkin",
      likesCount: 1,
      isLiked: true,
      commentsCount: 0,
      sharesCount: 0,
      comments: [],
    };

    setPosts([newPostObj, ...posts]);
    setNewPostContent("");
    setIsNewPostModalOpen(false);
    showNotice("🎉 Bài viết và đánh giá thực địa đã được đăng thành công!");
  };

  // Lọc bài viết
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchCategory =
        selectedCategory === "all" || post.category === selectedCategory;
      const matchLocation =
        selectedLocationFilter === "all" ||
        post.location.toLowerCase().includes(selectedLocationFilter.toLowerCase());
      const matchSearch =
        !searchQuery.trim() ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.name.toLowerCase().includes(searchQuery.toLowerCase());

      return matchCategory && matchLocation && matchSearch;
    });
  }, [posts, selectedCategory, selectedLocationFilter, searchQuery]);

  return (
    <div className="w-full min-h-screen bg-slate-100/80 flex justify-center items-start font-sans">
      {/* ══════════════════════════════════════════════════════════
          KHUNG CHỨA ỨNG DỤNG DI ĐỘNG (MOBILE CONTAINER)
      ══════════════════════════════════════════════════════════ */}
      <div className="w-full max-w-md mx-auto min-h-screen bg-slate-50 relative pb-24 shadow-2xl border-x border-slate-200 select-none overflow-x-hidden">
        
        {/* Toast thông báo tương tác nhanh */}
        {notice && (
          <div className="fixed top-4 left-1/2 -translate-x-1/2 max-w-sm w-11/12 z-50 bg-emerald-600/95 backdrop-blur-md text-white text-xs font-semibold px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 border border-emerald-400/30 animate-bounce">
            <Sparkles size={15} className="text-amber-300 flex-shrink-0" />
            <span className="leading-snug">{notice}</span>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════
            1. TOP HEADER TRẮNG SÁNG CỐ ĐỊNH (STICKY TOP BAR)
        ══════════════════════════════════════════════════════════ */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 py-3 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-base font-extrabold text-slate-900 tracking-tight">
                  Diễn đàn & Đánh giá Di sản
                </h1>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                Cộng đồng du khách khám phá thực địa Việt Nam
              </p>
            </div>

            {/* Các nút hành động: Tìm kiếm & Bộ lọc */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                  isSearchOpen
                    ? "bg-sky-50 text-sky-600 border border-sky-200"
                    : "bg-slate-100/90 text-slate-600 hover:bg-slate-200 active:scale-95"
                }`}
                aria-label="Tìm kiếm bài viết"
              >
                <Search size={17} strokeWidth={2.2} />
              </button>

              <button
                type="button"
                onClick={() => {
                  if (selectedLocationFilter === "all") {
                    setSelectedLocationFilter("Văn Miếu");
                    showNotice("Đang lọc: Địa danh Văn Miếu");
                  } else if (selectedLocationFilter === "Văn Miếu") {
                    setSelectedLocationFilter("Bát Tràng");
                    showNotice("Đang lọc: Địa danh Làng Gốm Bát Tràng");
                  } else {
                    setSelectedLocationFilter("all");
                    showNotice("Đã bỏ lọc địa danh");
                  }
                }}
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer relative ${
                  selectedLocationFilter !== "all"
                    ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                    : "bg-slate-100/90 text-slate-600 hover:bg-slate-200 active:scale-95"
                }`}
                aria-label="Lọc theo chủ đề hoặc địa danh"
              >
                <SlidersHorizontal size={17} strokeWidth={2.2} />
                {selectedLocationFilter !== "all" && (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-500" />
                )}
              </button>
            </div>
          </div>

          {/* Ô input tìm kiếm trượt xuống khi bấm kính lúp */}
          {isSearchOpen && (
            <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center gap-2 animate-in fade-in slide-in-from-top-1 duration-200">
              <div className="relative flex-1">
                <Search
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm bài viết, di tích (Văn Miếu, Bát Tràng)..."
                  className="w-full bg-slate-100/90 rounded-xl pl-9 pr-8 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/40 border border-slate-200/60"
                  autoFocus
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>
          )}
        </header>

        {/* ══════════════════════════════════════════════════════════
            2. HÀNG TAB CHUYỂN ĐỔI NHANH (CATEGORY PILLS)
        ══════════════════════════════════════════════════════════ */}
        <div className="px-4 pt-3.5 pb-2">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
            {CATEGORY_TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer active:scale-95 flex-shrink-0 ${
                    isActive
                      ? "bg-sky-600 text-white shadow-xs border border-sky-600"
                      : "bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-100/70"
                  }`}
                >
                  <Icon size={13} className={isActive ? "text-sky-200" : "text-slate-400"} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════
            NỘI DUNG CHÍNH (MAIN SCROLLABLE FEED)
        ══════════════════════════════════════════════════════════ */}
        <main className="px-4 py-2 space-y-4">
          
          {/* ══════════════════════════════════════════════════════════
              3. HỘP ĐĂNG BÀI / CHIA SẺ NHẬT KÝ THỰC ĐỊA (QUICK SHARE BOX)
          ══════════════════════════════════════════════════════════ */}
          <section className="bg-white rounded-2xl border border-slate-200/80 p-3.5 shadow-sm">
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-10 h-10 rounded-full border-2 border-emerald-400 bg-sky-50 shadow-xs flex-shrink-0"
              />
              <button
                type="button"
                onClick={() => setIsNewPostModalOpen(true)}
                className="flex-1 bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 rounded-xl px-3.5 py-2.5 text-left text-xs text-slate-400 font-normal transition-colors cursor-pointer"
              >
                Chia sẻ cảm nhận hoặc ảnh chụp di tích của bạn...
              </button>
            </div>

            {/* Hàng 3 nút tiện ích nhỏ */}
            <div className="mt-3 pt-2.5 border-t border-slate-100 grid grid-cols-3 gap-1.5">
              <button
                type="button"
                onClick={() => {
                  setNewPostImage("/image/vanmieu.png");
                  setIsNewPostModalOpen(true);
                }}
                className="flex items-center justify-center gap-1.5 py-1.5 px-1 rounded-xl text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 transition-colors text-xs font-semibold cursor-pointer active:scale-95"
              >
                <Camera size={15} className="text-emerald-500 flex-shrink-0" />
                <span className="truncate">Ảnh thực địa</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsNewPostModalOpen(true);
                }}
                className="flex items-center justify-center gap-1.5 py-1.5 px-1 rounded-xl text-slate-600 hover:bg-amber-50 hover:text-amber-700 transition-colors text-xs font-semibold cursor-pointer active:scale-95"
              >
                <Star size={15} className="text-amber-500 fill-amber-400 flex-shrink-0" />
                <span className="truncate">Chấm sao</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsNewPostModalOpen(true);
                }}
                className="flex items-center justify-center gap-1.5 py-1.5 px-1 rounded-xl text-slate-600 hover:bg-sky-50 hover:text-sky-700 transition-colors text-xs font-semibold cursor-pointer active:scale-95"
              >
                <MapPin size={15} className="text-sky-500 flex-shrink-0" />
                <span className="truncate">Gắn di tích</span>
              </button>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════
              4. DANH SÁCH BÀI VIẾT & ĐÁNH GIÁ THỰC TẾ (FEED LIST)
          ══════════════════════════════════════════════════════════ */}
          {filteredPosts.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-8 text-center">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center mb-3">
                <Search size={22} />
              </div>
              <p className="text-xs font-bold text-slate-700">
                Không tìm thấy bài viết phù hợp
              </p>
              <p className="text-[11px] text-slate-400 mt-1">
                Hãy thử chọn danh mục khác hoặc xóa từ khóa tìm kiếm
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("all");
                  setSelectedLocationFilter("all");
                  setSearchQuery("");
                }}
                className="mt-3.5 text-xs font-bold text-sky-600 hover:text-sky-700 bg-sky-50 px-3.5 py-1.5 rounded-full"
              >
                Xem tất cả bài viết
              </button>
            </div>
          ) : (
            filteredPosts.map((post) => {
              const isCommentActive = activeCommentPostId === post.id;

              return (
                <article
                  key={post.id}
                  className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden transition-all hover:shadow-md"
                >
                  {/* Header bài đăng: Avatar, Tên, Huy hiệu, Thời gian */}
                  <div className="p-3.5 pb-2.5 flex items-start justify-between">
                    <div className="flex items-center gap-2.5">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-10 h-10 rounded-full object-cover border border-slate-200 flex-shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="text-xs font-bold text-slate-900">
                            {post.author.name}
                          </h3>
                          {post.author.badge && (
                            <span
                              className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md border ${post.author.badgeColor}`}
                            >
                              {post.author.badge}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5">
                          <Clock size={11} />
                          <span>{post.createdAt}</span>
                        </div>
                      </div>
                    </div>

                    {/* Đánh giá sao */}
                    <div className="flex items-center gap-1 bg-amber-50/80 border border-amber-200/70 px-2 py-0.5 rounded-lg">
                      <Star size={12} className="fill-amber-400 text-amber-500" />
                      <span className="text-xs font-black text-amber-700">
                        {post.rating}
                      </span>
                      {post.ratingLabel && (
                        <span className="text-[10px] text-amber-600 font-semibold hidden sm:inline">
                          ({post.ratingLabel})
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Vị trí di tích được gắn thẻ */}
                  <div className="px-3.5 pb-2">
                    <div className="inline-flex items-center gap-1 bg-slate-100/90 text-slate-700 px-2.5 py-1 rounded-md text-[11px] font-semibold border border-slate-200/60">
                      <MapPin size={12} className="text-rose-500 flex-shrink-0" />
                      <span>{post.location}</span>
                    </div>
                  </div>

                  {/* Nội dung bài viết */}
                  <p className="px-3.5 pb-3 text-xs text-slate-700 leading-relaxed">
                    {post.content}
                  </p>

                  {/* Ảnh đính kèm thực địa */}
                  {post.image && (
                    <div className="relative w-full bg-slate-950 overflow-hidden group">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={post.image}
                        alt={post.imageCaption || post.location}
                        className="w-full h-56 object-cover object-center group-hover:scale-102 transition-transform duration-500 ease-out"
                      />
                      {post.imageCaption && (
                        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 pt-6 text-[11px] text-white/90 font-medium">
                          {post.imageCaption}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Thanh thống kê & Nút hành động (Like, Comment, Share) */}
                  <div className="p-3 border-t border-slate-100 flex items-center justify-between text-slate-500 text-xs font-semibold">
                    {/* Nút Like (Thả tim) */}
                    <button
                      type="button"
                      onClick={() => handleToggleLike(post.id)}
                      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl transition-all cursor-pointer active:scale-90 ${
                        post.isLiked
                          ? "text-rose-600 bg-rose-50 font-bold"
                          : "hover:bg-slate-100 text-slate-600"
                      }`}
                    >
                      <Heart
                        size={16}
                        className={
                          post.isLiked
                            ? "fill-rose-500 text-rose-500 animate-pulse"
                            : ""
                        }
                      />
                      <span>{post.likesCount}</span>
                    </button>

                    {/* Nút Bình luận */}
                    <button
                      type="button"
                      onClick={() =>
                        setActiveCommentPostId(isCommentActive ? null : post.id)
                      }
                      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                        isCommentActive
                          ? "text-sky-600 bg-sky-50 font-bold"
                          : "hover:bg-slate-100 text-slate-600"
                      }`}
                    >
                      <MessageCircle size={16} />
                      <span>{post.commentsCount}</span>
                      <span className="hidden sm:inline">bình luận</span>
                    </button>

                    {/* Nút Chia sẻ */}
                    <button
                      type="button"
                      onClick={() => handleSharePost(post.location)}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer active:scale-95"
                    >
                      <Share2 size={16} />
                      <span>Chia sẻ</span>
                    </button>
                  </div>

                  {/* Khối danh sách bình luận khi người dùng bấm vào */}
                  {isCommentActive && (
                    <div className="px-3.5 pb-3.5 pt-2 border-t border-slate-100 bg-slate-50/60 animate-in fade-in duration-200">
                      {/* Các bình luận hiện có */}
                      {post.comments && post.comments.length > 0 ? (
                        <div className="space-y-2 mb-3">
                          {post.comments.map((cm) => (
                            <div
                              key={cm.id}
                              className="bg-white p-2.5 rounded-xl border border-slate-200/70 text-xs"
                            >
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-bold text-slate-800">
                                  {cm.author}
                                </span>
                                <span className="text-[10px] text-slate-400">
                                  {cm.time}
                                </span>
                              </div>
                              <p className="text-slate-600 leading-snug">{cm.text}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-center text-[11px] text-slate-400 py-1 mb-2">
                          Chưa có bình luận nào. Hãy là người đầu tiên!
                        </p>
                      )}

                      {/* Ô nhập bình luận nhanh */}
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={commentInput}
                          onChange={(e) => setCommentInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") handleAddComment(post.id);
                          }}
                          placeholder="Viết cảm nhận của bạn..."
                          className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                        />
                        <button
                          type="button"
                          onClick={() => handleAddComment(post.id)}
                          className="w-8 h-8 rounded-xl bg-sky-600 text-white flex items-center justify-center hover:bg-sky-700 active:scale-95 transition-all cursor-pointer flex-shrink-0"
                          aria-label="Gửi bình luận"
                        >
                          <Send size={14} />
                        </button>
                      </div>
                    </div>
                  )}
                </article>
              );
            })
          )}
        </main>

        {/* ══════════════════════════════════════════════════════════
            5. MODAL SOẠN BÀI VIẾT / CHIA SẺ THỰC ĐỊA MỚI
        ══════════════════════════════════════════════════════════ */}
        {isNewPostModalOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-200">
            <div
              className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh] animate-in slide-in-from-bottom duration-300"
              role="dialog"
              aria-modal="true"
            >
              {/* Header Modal */}
              <div className="px-4 py-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <Sparkles size={16} />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-800">
                      Tạo Bài Viết & Đánh Giá Thực Địa
                    </h3>
                    <p className="text-[10px] text-slate-400">
                      Nhận điểm thưởng di sản sau khi đăng bài
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsNewPostModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors cursor-pointer"
                >
                  <X size={15} />
                </button>
              </div>

              {/* Form nội dung */}
              <form onSubmit={handleCreatePost} className="p-4 space-y-3.5 overflow-y-auto flex-1">
                {/* Thông tin người đăng & chọn địa danh */}
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-9 h-9 rounded-full border border-emerald-400 bg-sky-50"
                  />
                  <div className="flex-1">
                    <p className="text-xs font-bold text-slate-800">
                      {currentUser.name}
                    </p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <MapPin size={12} className="text-sky-600 flex-shrink-0" />
                      <select
                        value={newPostLocation}
                        onChange={(e) => setNewPostLocation(e.target.value)}
                        className="text-xs font-semibold text-slate-700 bg-slate-100 rounded-md px-2 py-0.5 border border-slate-200 focus:outline-none"
                      >
                        <option value="Văn Miếu - Quốc Tử Giám">Văn Miếu - Quốc Tử Giám</option>
                        <option value="Làng Gốm Bát Tràng">Làng Gốm Bát Tràng</option>
                        <option value="Hoàng Thành Thăng Long">Hoàng Thành Thăng Long</option>
                        <option value="Quần Thể Danh Thắng Tràng An">Quần Thể Danh Thắng Tràng An</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Chọn đánh giá sao */}
                <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-3 flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-900">
                    Đánh giá trải nghiệm:
                  </span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setNewPostRating(s)}
                        className="p-1 cursor-pointer transition-transform hover:scale-120"
                      >
                        <Star
                          size={18}
                          className={
                            s <= newPostRating
                              ? "fill-amber-400 text-amber-500"
                              : "text-slate-300"
                          }
                        />
                      </button>
                    ))}
                    <span className="text-xs font-black text-amber-700 ml-1">
                      {newPostRating}/5
                    </span>
                  </div>
                </div>

                {/* Textarea nội dung */}
                <div>
                  <textarea
                    rows={4}
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    placeholder="Hãy chia sẻ trải nghiệm tham quan, bí quyết check-in hoặc mẹo hữu ích cho cộng đồng du khách nhé..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                  />
                </div>

                {/* Chọn ảnh mẫu thực địa */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1.5">
                    Chọn ảnh thực địa minh họa:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { path: "/image/vanmieu.png", name: "Văn Miếu" },
                      { path: "/image/gomsu.png", name: "Bát Tràng" },
                      { path: "/image/thanglong.png", name: "Hoàng Thành" },
                    ].map((img) => (
                      <button
                        key={img.path}
                        type="button"
                        onClick={() => setNewPostImage(img.path)}
                        className={`relative rounded-xl overflow-hidden border-2 h-16 cursor-pointer ${
                          newPostImage === img.path
                            ? "border-sky-500 ring-2 ring-sky-500/30"
                            : "border-transparent opacity-75 hover:opacity-100"
                        }`}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={img.path}
                          alt={img.name}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[9px] font-semibold py-0.5 text-center truncate">
                          {img.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Nút submit */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md active:scale-98 transition-all cursor-pointer"
                  >
                    Đăng Bài Lên Diễn Đàn (+30 điểm)
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════
            6. THANH ĐIỀU HƯỚNG ĐÁY (TOURIST BOTTOM NAV BAR)
            Tab 'Diễn đàn' đang được kích hoạt (activeTab="community")
        ══════════════════════════════════════════════════════════ */}
        <TouristBottomNav
          activeTab="community"
          setActiveTab={() => {}}
          onOpenCheckIn={() => setIsCheckInModalOpen(true)}
        />

        {/* Modal Check-in khi bấm nút tròn nhô cao giữa đáy */}
        <OnSiteActivationModal
          isOpen={isCheckInModalOpen}
          onClose={() => setIsCheckInModalOpen(false)}
          initialTab="qr"
          onUnlockMission={() => {
            setIsCheckInModalOpen(false);
            showNotice("Đã hoàn tất check-in tại di tích!");
          }}
        />
      </div>
    </div>
  );
}
