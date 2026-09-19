// =============================================================================
// touristMockData.js
// Dữ liệu mẫu cho ứng dụng Du lịch Văn hóa Việt Nam
// Sử dụng: import { currentUser, recommendedRoutes, activeMissions, aiQuickQuestions } from '@/data/touristMockData';
// =============================================================================

// -----------------------------------------------------------------------------
// 1. CURRENT USER — Thông tin người dùng hiện tại
// -----------------------------------------------------------------------------
export const currentUser = {
  id: "user_001",
  name: "Nguyễn An",
  email: "nguyen.an@example.com",
  avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=NguyenAn&backgroundColor=b6e3f4",
  rewardPoints: 350,
  badgeCount: 3,
  level: "Nhà Thám Hiểm",
  badges: [
    { id: "badge_001", name: "Người Khởi Hành", icon: "🧭", earnedAt: "2025-06-01" },
    { id: "badge_002", name: "Khám Phá Hà Nội", icon: "🏛️", earnedAt: "2025-07-15" },
    { id: "badge_003", name: "Tri Thức Văn Hóa", icon: "📜", earnedAt: "2025-08-20" },
  ],
  visitedSites: 5,
  joinedAt: "2025-05-01",
};

// -----------------------------------------------------------------------------
// 2. RECOMMENDED ROUTES — Danh sách lộ trình văn hóa được gợi ý
// -----------------------------------------------------------------------------
export const recommendedRoutes = [
  {
    id: "route_001",
    name: "Hành Trình Ngàn Năm Văn Hiến",
    description:
      "Khám phá trái tim lịch sử của Hà Nội qua Văn Miếu – Quốc Tử Giám và Hoàng Thành Thăng Long, nơi lưu giữ tinh hoa khoa bảng và vương triều phong kiến Việt Nam.",
    location: "Hà Nội",
    duration: "1 ngày",
    ticketPrice: "80.000 đ",
    rewardPoints: "+150 pts",
    difficulty: "Dễ",
    rating: 4.8,
    reviewCount: 1240,
    coverImage: "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=800&q=80",
    tags: ["Lịch sử", "Kiến trúc", "UNESCO"],
    stops: [
      { order: 1, name: "Văn Miếu – Quốc Tử Giám", duration: "2 giờ" },
      { order: 2, name: "Hoàng Thành Thăng Long", duration: "2.5 giờ" },
      { order: 3, name: "Hồ Tây – Chùa Trấn Quốc", duration: "1 giờ" },
    ],
  },
  {
    id: "route_002",
    name: "Làng Nghề Gốm Bát Tràng",
    description:
      "Trải nghiệm nghề gốm truyền thống hơn 700 năm tuổi tại làng Bát Tràng, tự tay nặn gốm và tìm hiểu kỹ thuật nung lò độc đáo của nghệ nhân Hà Nội.",
    location: "Hà Nội",
    duration: "Nửa ngày",
    ticketPrice: "Miễn phí",
    rewardPoints: "+80 pts",
    difficulty: "Dễ",
    rating: 4.6,
    reviewCount: 870,
    coverImage: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80",
    tags: ["Làng nghề", "Thủ công", "Trải nghiệm"],
    stops: [
      { order: 1, name: "Chợ Gốm Bát Tràng", duration: "45 phút" },
      { order: 2, name: "Xưởng thủ công truyền thống", duration: "1.5 giờ" },
      { order: 3, name: "Bảo tàng Gốm sứ Bát Tràng", duration: "30 phút" },
    ],
  },
  {
    id: "route_003",
    name: "Quần Thể Di Sản Tràng An",
    description:
      "Chinh phục kỳ quan thiên nhiên thế giới Tràng An – Ninh Bình, ngồi thuyền len lỏi qua hang động huyền bí và khám phá các đền chùa cổ kính ẩn mình giữa núi non.",
    location: "Ninh Bình",
    duration: "1 ngày",
    ticketPrice: "250.000 đ",
    rewardPoints: "+200 pts",
    difficulty: "Trung bình",
    rating: 4.9,
    reviewCount: 3560,
    coverImage: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80",
    tags: ["UNESCO", "Thiên nhiên", "Tâm linh", "Chèo thuyền"],
    stops: [
      { order: 1, name: "Bến thuyền Tràng An", duration: "3 giờ" },
      { order: 2, name: "Đền Trần", duration: "1 giờ" },
      { order: 3, name: "Chùa Bái Đính", duration: "1.5 giờ" },
    ],
  },
];

// -----------------------------------------------------------------------------
// 3. ACTIVE MISSIONS — Nhiệm vụ tương tác đang diễn ra
// -----------------------------------------------------------------------------
export const activeMissions = [
  {
    id: "mission_001",
    siteName: "Khuê Văn Các",
    siteId: "site_van_mieu",
    type: "QUIZ",
    title: "Bí Ẩn Khuê Văn Các",
    description:
      "Trả lời câu hỏi về biểu tượng văn hóa nổi tiếng nhất của Văn Miếu để nhận điểm thưởng.",
    rewardPoints: 50,
    timeLimit: 60,
    thumbnail: "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=400&q=80",
    status: "active",
    quiz: {
      question: "Khuê Văn Các được xây dựng vào năm nào và dưới triều đại nào?",
      options: [
        { id: "A", text: "Năm 1070, triều Lý Thánh Tông" },
        { id: "B", text: "Năm 1805, triều Nguyễn – vua Gia Long" },
        { id: "C", text: "Năm 1076, triều Lý Nhân Tông" },
        { id: "D", text: "Năm 1484, triều Lê – vua Lê Thánh Tông" },
      ],
      correctAnswer: "B",
      explanation:
        "Khuê Văn Các được xây dựng năm 1805 dưới triều Nguyễn (vua Gia Long), là lầu ngắm sao Khuê – ngôi sao chủ về văn chương trong quan niệm phương Đông.",
    },
  },
  {
    id: "mission_002",
    siteName: "Hoàng Thành Thăng Long",
    siteId: "site_hoang_thanh",
    type: "PHOTO",
    title: "Ghi Dấu Hoàng Thành",
    description:
      "Chụp ảnh tại Đoan Môn – cổng chính của Hoàng Thành Thăng Long và chia sẻ khoảnh khắc lịch sử của bạn.",
    rewardPoints: 75,
    thumbnail: "https://images.unsplash.com/photo-1581872151450-d5a97b82c29d?w=400&q=80",
    status: "active",
    photoChallenge: {
      targetSpot: "Đoan Môn – Hoàng Thành Thăng Long",
      instruction:
        "Chụp một bức ảnh tại cổng Đoan Môn với kiến trúc lịch sử hiện ra phía sau. Đảm bảo hình ảnh rõ nét và thể hiện kiến trúc cổ.",
      hints: [
        "Góc chụp đẹp nhất: Đứng cách Đoan Môn khoảng 10m, chụp thẳng chính diện.",
        "Ánh sáng lý tưởng: Buổi sáng từ 8h – 10h.",
        "Lưu ý: Không có chướng ngại vật che khuất cổng chính.",
      ],
      approvalMode: "auto",
    },
  },
];

// -----------------------------------------------------------------------------
// 4. AI QUICK QUESTIONS — Câu hỏi nhanh mẫu cho trợ lý AI
// -----------------------------------------------------------------------------
export const aiQuickQuestions = [
  {
    id: "qq_001",
    text: "Ý nghĩa 82 bia tiến sĩ?",
    icon: "📜",
    category: "Lịch sử",
    relatedSite: "Văn Miếu – Quốc Tử Giám",
  },
  {
    id: "qq_002",
    text: "Giờ mở cửa Văn Miếu?",
    icon: "🕐",
    category: "Thực tế",
    relatedSite: "Văn Miếu – Quốc Tử Giám",
  },
  {
    id: "qq_003",
    text: "Kiến trúc Khuê Văn Các có gì đặc biệt?",
    icon: "🏛️",
    category: "Kiến trúc",
    relatedSite: "Văn Miếu – Quốc Tử Giám",
  },
  {
    id: "qq_004",
    text: "Đặc sản ẩm thực gần Văn Miếu?",
    icon: "🍜",
    category: "Ẩm thực",
    relatedSite: "Hà Nội",
  },
];

// -----------------------------------------------------------------------------
// 5. FEATURED SITES — Di tích nổi bật
// -----------------------------------------------------------------------------
export const featuredSites = [
  {
    id: "site_van_mieu",
    name: "Văn Miếu – Quốc Tử Giám",
    shortName: "Văn Miếu",
    location: "Đống Đa, Hà Nội",
    coordinates: { lat: 21.0277, lng: 105.8351 },
    category: "Di tích Quốc gia Đặc biệt",
    openingHours: {
      weekday: "08:00 – 17:00",
      weekend: "08:00 – 17:30",
      closedOn: "Thứ Hai",
    },
    ticketPrice: { adult: "80.000 đ", child: "Miễn phí (dưới 15 tuổi)" },
    image: "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=800&q=80",
    rating: 4.8,
    shortDescription:
      "Trường đại học đầu tiên của Việt Nam, thành lập năm 1076, lưu giữ 82 bia đá tiến sĩ.",
    tags: ["UNESCO", "Khoa bảng", "Lịch sử"],
  },
  {
    id: "site_hoang_thanh",
    name: "Hoàng Thành Thăng Long",
    shortName: "Hoàng Thành",
    location: "Ba Đình, Hà Nội",
    coordinates: { lat: 21.0364, lng: 105.8353 },
    category: "Di sản Thế giới UNESCO",
    openingHours: {
      weekday: "08:00 – 17:00",
      weekend: "08:00 – 17:00",
      closedOn: "Thứ Hai",
    },
    ticketPrice: { adult: "30.000 đ", child: "Miễn phí (dưới 15 tuổi)" },
    image: "https://images.unsplash.com/photo-1581872151450-d5a97b82c29d?w=800&q=80",
    rating: 4.7,
    shortDescription:
      "Khu di tích trung tâm của Hoàng Thành Thăng Long – Di sản Văn hóa Thế giới được UNESCO công nhận năm 2010.",
    tags: ["UNESCO", "Vương triều", "Khảo cổ"],
  },
  {
    id: "site_bat_trang",
    name: "Làng Gốm Bát Tràng",
    shortName: "Bát Tràng",
    location: "Gia Lâm, Hà Nội",
    coordinates: { lat: 20.9786, lng: 105.9027 },
    category: "Làng nghề truyền thống",
    openingHours: {
      weekday: "07:00 – 18:00",
      weekend: "06:00 – 19:00",
      closedOn: null,
    },
    ticketPrice: { adult: "Miễn phí", child: "Miễn phí" },
    image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80",
    rating: 4.6,
    shortDescription:
      "Làng gốm truyền thống hơn 700 năm tuổi, nổi tiếng với gốm sứ men trắng xanh độc đáo.",
    tags: ["Làng nghề", "Gốm sứ", "Thủ công"],
  },
  {
    id: "site_trang_an",
    name: "Quần Thể Danh Thắng Tràng An",
    shortName: "Tràng An",
    location: "Gia Viễn & Hoa Lư, Ninh Bình",
    coordinates: { lat: 20.2523, lng: 105.9079 },
    category: "Di sản Thế giới UNESCO",
    openingHours: {
      weekday: "07:00 – 17:00",
      weekend: "07:00 – 17:00",
      closedOn: null,
    },
    ticketPrice: { adult: "250.000 đ", child: "125.000 đ" },
    image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80",
    rating: 4.9,
    shortDescription:
      "Di sản Thế giới hỗn hợp đầu tiên của Việt Nam, kết hợp vẻ đẹp thiên nhiên hang động và giá trị văn hóa lịch sử.",
    tags: ["UNESCO", "Thiên nhiên", "Tâm linh", "Chèo thuyền"],
  },
];

// -----------------------------------------------------------------------------
// 6. LEADERBOARD — Bảng xếp hạng người dùng
// -----------------------------------------------------------------------------
export const leaderboard = [
  {
    rank: 1,
    userId: "user_top1",
    name: "Trần Minh Khoa",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=TranMinhKhoa",
    rewardPoints: 1240,
    badgeCount: 12,
    level: "Đại Sứ Văn Hóa",
    isCurrentUser: false,
  },
  {
    rank: 2,
    userId: "user_top2",
    name: "Lê Thị Hương",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=LeThiHuong",
    rewardPoints: 980,
    badgeCount: 9,
    level: "Nhà Thám Hiểm Kỳ Cựu",
    isCurrentUser: false,
  },
  {
    rank: 3,
    userId: "user_001",
    name: "Nguyễn An",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=NguyenAn&backgroundColor=b6e3f4",
    rewardPoints: 350,
    badgeCount: 3,
    level: "Nhà Thám Hiểm",
    isCurrentUser: true,
  },
];
