"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Camera,
  MessageSquare,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
  User,
  ShieldAlert,
  Award,
  Sparkles,
  MapPin,
  Eye,
  Trash2,
  Check,
  X,
  Flag,
  RotateCcw,
} from "lucide-react";

/**
 * Trang Kiểm Duyệt Ảnh Thực Địa & Bài Viết Cộng Đồng (Community & Photo Challenge Moderation)
 * Đường dẫn: /moderator/community
 */
export default function ModeratorCommunityPage() {
  // Trạng thái tab đang chọn: 'photos' | 'posts'
  const [activeTab, setActiveTab] = useState("photos");
  const [toastMsg, setToastMsg] = useState("");

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3500);
  };

  // 1. Dữ liệu mẫu Tab 1: Thử thách Săn ảnh Thực địa (8 ảnh mới)
  const initialPhotos = [
    {
      id: "PHOTO-01",
      touristName: "Nguyễn Văn An",
      touristAvatar: "NA",
      challengeTitle: "Chụp chính diện Khuê Văn Các",
      destination: "Văn Miếu - Quốc Tử Giám",
      submittedTime: "10 phút trước",
      rewardPoints: 100,
      userPhoto: "/image/vanmieu.png",
      standardPhoto: "/image/vanmieu.png",
      note: "Góc chụp chuẩn chính diện, ánh sáng đầy đủ",
    },
    {
      id: "PHOTO-02",
      touristName: "Trần Mai Phương",
      touristAvatar: "MP",
      challengeTitle: "Check-in bên Lò Bầu 5 ngăn",
      destination: "Làng gốm Bát Tràng",
      submittedTime: "25 phút trước",
      rewardPoints: 100,
      userPhoto: "/image/battrang .png",
      standardPhoto: "/image/battrang .png",
      note: "Khách đứng trước vòm lò số 1, nhận diện chuẩn",
    },
    {
      id: "PHOTO-03",
      touristName: "Lê Hoàng Long",
      touristAvatar: "HL",
      challengeTitle: "Chụp cận cảnh Bia Tiến sĩ số 3",
      destination: "Khu vườn bia Văn Miếu",
      submittedTime: "32 phút trước",
      rewardPoints: 100,
      userPhoto: "/image/thanglong.png",
      standardPhoto: "/image/thanglong.png",
      note: "Rõ nét rùa đá và hoa văn trán bia",
    },
    {
      id: "PHOTO-04",
      touristName: "Đỗ Thu Trang",
      touristAvatar: "TT",
      challengeTitle: "Chèo thuyền xuyên Hang Sáng",
      destination: "Danh thắng Tràng An",
      submittedTime: "40 phút trước",
      rewardPoints: 100,
      userPhoto: "/image/trangan.png",
      standardPhoto: "/image/trangan.png",
      note: "Khung cảnh nhũ đá tự nhiên trong lòng hang",
    },
    {
      id: "PHOTO-05",
      touristName: "Phạm Quốc Hưng",
      touristAvatar: "QH",
      challengeTitle: "Bàn xoay vuốt gốm thủ công",
      destination: "Bảo tàng Gốm Bát Tràng",
      submittedTime: "1 giờ trước",
      rewardPoints: 100,
      userPhoto: "/image/gomsu.png",
      standardPhoto: "/image/gomsu.png",
      note: "Chụp nghệ nhân thao tác vuốt gốm tại chỗ",
    },
    {
      id: "PHOTO-06",
      touristName: "Vũ Bảo Ngọc",
      touristAvatar: "BN",
      challengeTitle: "Cổng Tam Quan Đoan Môn",
      destination: "Hoàng Thành Thăng Long",
      submittedTime: "1 giờ trước",
      rewardPoints: 100,
      userPhoto: "/image/thanglong.png",
      standardPhoto: "/image/thanglong.png",
      note: "Toàn cảnh 3 cửa vòm cuốn thời Lê",
    },
    {
      id: "PHOTO-07",
      touristName: "Hoàng Gia Huy",
      touristAvatar: "GH",
      challengeTitle: "Giếng Thiên Quang dưới nắng sớm",
      destination: "Văn Miếu - Quốc Tử Giám",
      submittedTime: "2 giờ trước",
      rewardPoints: 100,
      userPhoto: "/image/vanmieu.png",
      standardPhoto: "/image/vanmieu.png",
      note: "Bóng Khuê Văn Các in rõ trên mặt nước",
    },
    {
      id: "PHOTO-08",
      touristName: "Bùi Khánh Linh",
      touristAvatar: "KL",
      challengeTitle: "Đền thờ Vua Đinh Tiên Hoàng",
      destination: "Cố đô Hoa Lư - Ninh Bình",
      submittedTime: "3 giờ trước",
      rewardPoints: 100,
      userPhoto: "/image/trangan.png",
      standardPhoto: "/image/trangan.png",
      note: "Chính điện đền thờ giữa thung lũng đá vôi",
    },
  ];

  // 2. Dữ liệu mẫu Tab 2: Bài viết & Nhật ký Hành trình bị Báo cáo (4 bài vi phạm)
  const initialPosts = [
    {
      id: "POST-REP-01",
      authorName: "Đình Tuấn (Traveler)",
      authorAvatar: "DT",
      postedTime: "1 giờ trước",
      destinationTag: "Văn Miếu - Quốc Tử Giám",
      content:
        "Nhận cúng bái xin điểm thi đại học, bùa may mắn đỗ thủ khoa tại Bia Tiến sĩ bao đỗ 100%. Inbox Zalo 0988xxxxxx để mua quẻ linh thiêng giá chỉ 200k...",
      imageAttached: "/image/vanmieu.png",
      reportReason: "Quảng cáo mê tín dị đoan, bán hàng trái phép tại di tích quốc gia",
      reportCount: 5,
      severity: "Nghiêm trọng",
    },
    {
      id: "POST-REP-02",
      authorName: "Gia Bảo Phượt Thủ",
      authorAvatar: "GB",
      postedTime: "2 giờ trước",
      destinationTag: "Khu khảo cổ Hoàng Thành",
      content:
        "Mách các bác mẹo trèo tường rào ban đêm vào hố khảo cổ không cần mua vé. Nhảy qua cổng phụ đường Hoàng Diệu là tha hồ vào chụp ảnh không ai biết...",
      imageAttached: "/image/thanglong.png",
      reportReason: "Xúi giục hành vi xâm nhập trái phép, phá hoại khu di tích",
      reportCount: 4,
      severity: "Nguy hiểm",
    },
    {
      id: "POST-REP-03",
      authorName: "Hải Nam Gốm",
      authorAvatar: "HN",
      postedTime: "3 giờ trước",
      destinationTag: "Làng gốm Bát Tràng",
      content:
        "Lò bầu này làm màu lừa đảo khách du lịch thôi, thực ra toàn mua đồ nhựa Trung Quốc về dán nhãn Bát Tràng lừa tiền du khách...",
      imageAttached: "/image/battrang .png",
      reportReason: "Ngôn từ bôi nhọ vô căn cứ, thông tin sai sự thật về làng nghề",
      reportCount: 3,
      severity: "Sai sự thật",
    },
    {
      id: "POST-REP-04",
      authorName: "Thanh Hằng Check-in",
      authorAvatar: "TH",
      postedTime: "5 giờ trước",
      destinationTag: "Danh thắng Tràng An",
      content:
        "Cần tuyển PG đi tour riêng kín đáo, bao ăn ở tại các resort Ninh Bình lương ngày 3 triệu. Bạn nữ nào muốn đi tour kiếm tiền ib...",
      imageAttached: "/image/trangan.png",
      reportReason: "Nội dung phản cảm, quảng cáo môi giới không lành mạnh",
      reportCount: 6,
      severity: "Phản cảm",
    },
  ];

  const [photos, setPhotos] = useState(initialPhotos);
  const [posts, setPosts] = useState(initialPosts);

  // Xử lý duyệt ảnh hợp lệ
  const handleApprovePhoto = (item) => {
    setPhotos((prev) => prev.filter((p) => p.id !== item.id));
    showToast(
      `Đã duyệt ảnh của "${item.touristName}"! Cộng ngay +${item.rewardPoints} điểm thưởng vào ví du khách.`
    );
  };

  // Xử lý từ chối ảnh
  const handleRejectPhoto = (item) => {
    setPhotos((prev) => prev.filter((p) => p.id !== item.id));
    showToast(`Đã từ chối ảnh của "${item.touristName}" (Ảnh mờ / Sai hiện vật).`);
  };

  // Xử lý gỡ bài vi phạm
  const handleRemovePost = (post) => {
    setPosts((prev) => prev.filter((p) => p.id !== post.id));
    showToast(
      `Đã gỡ bài viết của "${post.authorName}" và gửi lệnh khóa cảnh cáo 7 ngày đến tài khoản!`
    );
  };

  // Xử lý bài viết hợp lệ (Bác bỏ báo cáo)
  const handleDismissPostReport = (post) => {
    setPosts((prev) => prev.filter((p) => p.id !== post.id));
    showToast(`Đã bác bỏ báo cáo vi phạm. Bài viết của "${post.authorName}" được giữ nguyên.`);
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
          1. HEADER & TAB PHÂN LUỒNG KIỂM DUYỆT
      ──────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500 ring-4 ring-purple-100" />
              <span className="text-[11px] font-black uppercase tracking-wider text-purple-700">
                Kiểm Duyệt Tương Tác Cộng Đồng
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Kiểm Duyệt Ảnh Thực Địa & Bài Viết Cộng Đồng
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Đối chiếu ảnh chụp check-in của du khách và xử lý các bài viết bị gắn cờ vi phạm quy chuẩn văn hóa di sản.
            </p>
          </div>

          {/* Nút reset demo */}
          {(photos.length < initialPhotos.length || posts.length < initialPosts.length) && (
            <button
              type="button"
              onClick={() => {
                setPhotos(initialPhotos);
                setPosts(initialPosts);
                showToast("Đã khôi phục dữ liệu mẫu kiểm thử ban đầu.");
              }}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors inline-flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
            >
              <RotateCcw size={13} />
              <span>Khôi phục danh sách</span>
            </button>
          )}
        </div>

        {/* 2 Tab chuyển đổi linh hoạt */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={() => setActiveTab("photos")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "photos"
                ? "bg-teal-600 text-white shadow-xs"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200/80"
            }`}
          >
            <Camera size={15} />
            <span>Thử thách Săn ảnh Thực địa - Photo Challenge</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[10.5px] font-black ${
                activeTab === "photos" ? "bg-white/20 text-white" : "bg-teal-100 text-teal-800"
              }`}
            >
              {photos.length} ảnh mới
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("posts")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "posts"
                ? "bg-rose-600 text-white shadow-xs"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200/80"
            }`}
          >
            <MessageSquare size={15} />
            <span>Bài viết & Nhật ký Hành trình bị Báo cáo</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[10.5px] font-black ${
                activeTab === "posts" ? "bg-white/20 text-white" : "bg-rose-100 text-rose-800"
              }`}
            >
              {posts.length} bài vi phạm
            </span>
          </button>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────
          2. NỘI DUNG TAB 1: LƯỚI DUYỆT ẢNH THỰC ĐỊA (PHOTO CHALLENGE)
          Lưới 3 cột grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4
      ──────────────────────────────────────────────────────── */}
      {activeTab === "photos" && (
        <div className="space-y-4">
          {photos.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-2xs space-y-2">
              <CheckCircle2 size={36} className="text-emerald-500 mx-auto" />
              <h3 className="text-base font-black text-slate-800">
                Đã duyệt xong toàn bộ ảnh thực địa!
              </h3>
              <p className="text-xs text-slate-500">
                Không còn ảnh nào chờ xử lý. Toàn bộ điểm thưởng đã được chuyển đến ví du khách.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {photos.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden flex flex-col justify-between hover:border-teal-300 transition-all group"
                >
                  {/* Khung ảnh chính chụp ngoài đời thực + Ảnh đối chiếu chuẩn góc nhỏ */}
                  <div className="relative aspect-[4/3] bg-slate-900 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.userPhoto}
                      alt={item.challengeTitle}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                    />

                    {/* Tag điểm thưởng góc trên bên trái */}
                    <div className="absolute top-2.5 left-2.5 bg-emerald-600/90 backdrop-blur-md text-white text-[11px] font-black px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                      <Award size={13} />
                      <span>+{item.rewardPoints} pts</span>
                    </div>

                    {/* Badge thời gian góc trên bên phải */}
                    <div className="absolute top-2.5 right-2.5 bg-slate-900/75 backdrop-blur-md text-white text-[10px] font-semibold px-2 py-0.5 rounded-md flex items-center gap-1">
                      <Clock size={11} />
                      <span>{item.submittedTime}</span>
                    </div>

                    {/* ẢNH ĐỐI CHIẾU CHUẨN CỦA BAN TỔ CHỨC (Góc dưới bên phải) */}
                    <div className="absolute bottom-2.5 right-2.5 p-1 bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-slate-200 flex flex-col items-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.standardPhoto}
                        alt="Góc chuẩn"
                        className="w-16 h-12 rounded-lg object-cover border border-slate-200"
                      />
                      <span className="text-[9px] font-bold text-slate-600 uppercase mt-0.5">
                        Góc chuẩn BTC
                      </span>
                    </div>
                  </div>

                  {/* Thông tin thử thách & Du khách */}
                  <div className="p-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-xs shrink-0">
                        {item.touristAvatar}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-black text-slate-800 truncate">
                          {item.touristName}
                        </p>
                        <p className="text-[10.5px] text-slate-400 truncate">
                          {item.destination}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-black text-slate-900 line-clamp-1">
                        {item.challengeTitle}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                        {item.note}
                      </p>
                    </div>

                    {/* 2 Nút duyệt nhanh ngay trên thẻ */}
                    <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2">
                      {/* Nút từ chối */}
                      <button
                        type="button"
                        onClick={() => handleRejectPhoto(item)}
                        className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 text-xs font-bold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                        title="Từ chối (Ảnh mờ / Sai hiện vật)"
                      >
                        <X size={14} />
                        <span className="truncate">Từ chối</span>
                      </button>

                      {/* Nút hợp lệ */}
                      <button
                        type="button"
                        onClick={() => handleApprovePhoto(item)}
                        className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs font-bold flex items-center justify-center gap-1 transition-colors shadow-xs cursor-pointer"
                        title="Hợp lệ - Duyệt & Cộng +100 Điểm"
                      >
                        <Check size={14} />
                        <span className="truncate">Duyệt +100 pts</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ────────────────────────────────────────────────────────
          3. NỘI DUNG TAB 2: XỬ LÝ BÀI VIẾT BỊ KHIẾU NẠI (REPORTED POSTS)
      ──────────────────────────────────────────────────────── */}
      {activeTab === "posts" && (
        <div className="space-y-4">
          {posts.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-2xs space-y-2">
              <CheckCircle2 size={36} className="text-emerald-500 mx-auto" />
              <h3 className="text-base font-black text-slate-800">
                Không có bài viết vi phạm nào cần xử lý!
              </h3>
              <p className="text-xs text-slate-500">
                Cộng đồng vietculture đang tuân thủ rất tốt các tiêu chuẩn văn hóa và thuần phong mỹ tục.
              </p>
            </div>
          ) : (
            posts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 sm:p-6 space-y-4 hover:border-slate-300 transition-all"
              >
                {/* Header bài viết */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs">
                      {post.authorAvatar}
                    </div>
                    <div>
                      <p className="text-xs font-black text-slate-900">{post.authorName}</p>
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                        <span>{post.postedTime}</span>
                        <span>•</span>
                        <span className="text-teal-700 font-semibold">{post.destinationTag}</span>
                      </div>
                    </div>
                  </div>

                  <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200 flex items-center gap-1">
                    <Flag size={12} className="text-rose-600" />
                    <span>{post.reportCount} du khách đã gắn cờ</span>
                  </span>
                </div>

                {/* Nội dung bài viết + Ảnh đính kèm */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                  <div className="md:col-span-8 space-y-2.5">
                    <p className="text-xs sm:text-sm text-slate-800 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                      {post.content}
                    </p>

                    {/* KHUNG ĐỎ CẢNH BÁO: LÝ DO BỊ BÁO CÁO */}
                    <div className="p-3 bg-rose-50 rounded-xl border border-rose-200 text-xs flex items-start gap-2 text-rose-800">
                      <ShieldAlert size={16} className="text-rose-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-black text-rose-900 uppercase text-[11px]">
                          Lý do bị báo cáo ({post.severity}):
                        </p>
                        <p className="text-xs mt-0.5">{post.reportReason}</p>
                      </div>
                    </div>
                  </div>

                  {/* Ảnh bài viết */}
                  <div className="md:col-span-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.imageAttached}
                      alt="Ảnh bài viết"
                      className="w-full h-36 object-cover rounded-xl border border-slate-200"
                    />
                  </div>
                </div>

                {/* Footer: Nút xử lý của Moderator */}
                <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-end gap-2.5">
                  {/* Nút hợp lệ */}
                  <button
                    type="button"
                    onClick={() => handleDismissPostReport(post)}
                    className="border border-slate-200 text-slate-700 hover:bg-slate-100 font-bold px-4 py-2 rounded-xl text-xs transition-colors cursor-pointer"
                  >
                    Bài Viết Hợp Lệ - Bác Bỏ Báo Cáo
                  </button>

                  {/* Nút phạt vi phạm */}
                  <button
                    type="button"
                    onClick={() => handleRemovePost(post)}
                    className="bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white font-bold px-4 py-2 rounded-xl text-xs transition-colors shadow-xs cursor-pointer flex items-center gap-1.5"
                  >
                    <Trash2 size={14} />
                    <span>Xác nhận Vi Phạm - Gỡ Bài & Khóa Cảnh Cáo 7 Ngày</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
