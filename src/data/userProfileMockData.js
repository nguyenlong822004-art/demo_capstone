// =============================================================================
// userProfileMockData.js
// Dữ liệu mẫu trang cá nhân Khách du lịch (Tourist Profile) - Ứng dụng VietCulture
// Sử dụng:
//   import { profileInfo, unlockedBadges, journeyTimeline, myTickets } from '@/data/userProfileMockData';
// =============================================================================

/**
 * 1. PROFILE INFO — Thông tin tài khoản du khách
 */
export const profileInfo = {
  id: "user_tourist_001",
  name: "Nguyễn An",
  email: "nguyen.an@vietculture.vn",
  phone: "0988 123 456",
  avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=NguyenAn&backgroundColor=b6e3f4",
  title: "Nhà Thám Hiểm Di Sản",
  rankTier: "Bạc",
  tierBadgeColor: "bg-slate-200 text-slate-700 border-slate-300",
  joinedDate: "15/03/2025",
  totalPoints: 350,
  nextTierPoints: 500, // Cần 500 điểm để lên hạng Vàng
  pointsToNextTier: 150,
  stats: {
    visitedSites: 3,
    badgesEarned: 4,
    ticketsBooked: 2,
    quizzesCompleted: 5,
  },
};

/**
 * 2. UNLOCKED BADGES — Danh sách 4 huy hiệu di sản văn hóa đã đạt được
 */
export const unlockedBadges = [
  {
    id: "badge_thang_long",
    name: "Dấu Ấn Thăng Long",
    imageUrl: "/image/thanglong.png",
    earnedAt: "10/01/2026",
    category: "Lịch sử",
    description: "Hoàn thành check-in và khám phá cụm di tích Hoàng Thành Thăng Long – Hà Nội.",
    accentColor: "from-amber-500/20 to-amber-500/5 text-amber-700 border-amber-200",
  },
  {
    id: "badge_gom_su",
    name: "Tinh Hoa Gốm Sứ",
    imageUrl: "/image/gomsu.png",
    earnedAt: "22/01/2026",
    category: "Làng nghề",
    description: "Trải nghiệm tự tay nặn gốm tại Lò Bầu Cổ Bát Tràng hơn 700 năm tuổi.",
    accentColor: "from-orange-500/20 to-orange-500/5 text-orange-700 border-orange-200",
  },
  {
    id: "badge_trang_an",
    name: "Cố Đô Tràng An",
    imageUrl: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=400&q=80",
    earnedAt: "14/02/2026",
    category: "Danh thắng",
    description: "Chinh phục danh thắng Di sản Kép thế giới Quần thể Tràng An – Ninh Bình.",
    accentColor: "from-emerald-500/20 to-emerald-500/5 text-emerald-700 border-emerald-200",
  },
  {
    id: "badge_giai_do",
    name: "Bậc Thầy Giải Đố",
    imageUrl: "/image/vanmieu.png",
    earnedAt: "01/03/2026",
    category: "Tri thức",
    description: "Trả lời chính xác các câu đố lịch sử tại Văn Miếu – Quốc Tử Giám.",
    accentColor: "from-sky-500/20 to-sky-500/5 text-sky-700 border-sky-200",
  },
];

/**
 * 3. JOURNEY TIMELINE — Hành trình 3 điểm đến đã check-in on-site thành công
 */
export const journeyTimeline = [
  {
    id: "checkin_001",
    siteName: "Văn Miếu - Quốc Tử Giám",
    location: "Đống Đa, Hà Nội",
    checkinDate: "05/03/2026 - 09:30",
    method: "QR Code Scan",
    rewardPoints: "+100 pts",
    photoUrl: "/image/vanmieu.png",
    caption: "Chiêm ngưỡng 82 bia tiến sĩ và lầu Khuê Văn Các trong nắng sớm tinh khôi.",
    coordinates: { lat: 21.0277, lng: 105.8351 },
  },
  {
    id: "checkin_002",
    siteName: "Hoàng Thành Thăng Long",
    location: "Ba Đình, Hà Nội",
    checkinDate: "28/02/2026 - 15:15",
    method: "GPS Check-in",
    rewardPoints: "+100 pts",
    photoUrl: "/image/thanglong.png",
    caption: "Ghé thăm cổng Đoan Môn và khu di tích khảo cổ ngàn năm vương triều Đại Việt.",
    coordinates: { lat: 21.0364, lng: 105.8353 },
  },
  {
    id: "checkin_003",
    siteName: "Lò Bầu Cổ Bát Tràng",
    location: "Gia Lâm, Hà Nội",
    checkinDate: "15/02/2026 - 14:00",
    method: "QR Code Scan",
    rewardPoints: "+100 pts",
    photoUrl: "/image/gomsu.png",
    caption: "Tự tay chuốt một chiếc bình gốm nhỏ cùng nghệ nhân làng nghề truyền thống.",
    coordinates: { lat: 20.9786, lng: 105.9027 },
  },
];

/**
 * 4. MY TICKETS — Danh sách vé điện tử di sản
 */
export const myTickets = [
  {
    id: "ticket_001",
    ticketCode: "VK-2026-089",
    tourName: "Hành trình Ngàn năm Văn hiến",
    destination: "Văn Miếu – Quốc Tử Giám & Hoàng Thành Thăng Long",
    price: "80.000 đ",
    purchaseDate: "04/03/2026",
    expiryDate: "04/04/2026",
    status: "Còn hiệu lực", // 'Còn hiệu lực' | 'Đã sử dụng' | 'Hết hạn'
    statusColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
    ticketType: "Vé người lớn (Tham quan trọn gói)",
    qrCodeUrl: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=VK-2026-089",
  },
  {
    id: "ticket_002",
    ticketCode: "VK-2026-042",
    tourName: "Trải nghiệm Làng Gốm Bát Tràng",
    destination: "Bảo tàng Gốm sứ & Xưởng thủ công Bát Tràng",
    price: "Miễn phí",
    purchaseDate: "14/02/2026",
    expiryDate: "15/02/2026",
    status: "Đã sử dụng",
    statusColor: "bg-slate-100 text-slate-500 border-slate-200",
    ticketType: "Vé tham quan trải nghiệm",
    qrCodeUrl: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=VK-2026-042",
  },
];

// Xuất mặc định gom toàn bộ dữ liệu
const userProfileData = {
  profileInfo,
  unlockedBadges,
  journeyTimeline,
  myTickets,
};

export default userProfileData;
