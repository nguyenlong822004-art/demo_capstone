// =============================================================================
// journeyAndTicketMockData.js
// Dữ liệu mẫu cho màn hình "Nhật Ký Tour" và "Vé & Chi Phí" - Ứng dụng VietCulture
// JavaScript thuần (ES6 Module), chuẩn hóa di sản văn hóa Việt Nam
// =============================================================================

/**
 * 1. JOURNEY LOGS — Nhật ký các chặng hành trình đã hoàn thành
 * Bao gồm check-in, cơ chế Geofence/QR, nhiệm vụ giải đố và ảnh thực địa
 */
export const journeyLogs = [
  {
    id: "journey-vm-001",
    destinationName: "Văn Miếu - Quốc Tử Giám",
    location: "58 Quốc Tử Giám, Văn Miếu, Đống Đa, Hà Nội",
    category: "Di tích Lịch sử - Giáo dục",
    checkInTime: "09:30 - Hôm nay",
    timestamp: "2026-09-18T09:30:00+07:00",
    activationMethod: "GPS Geofence (45m)",
    solvedQuest: "Bí Ẩn Khuê Văn Các (+50 pts)",
    pointsEarned: 50,
    questDifficulty: "Trung bình",
    memoryImage: "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?auto=format&fit=crop&w=1200&q=80",
    imageCaption: "Bình minh rọi bóng Khuê Văn Các xuống giếng Thiên Quang",
    shortReflection: "Không gian cổ kính ngập tràn tinh hoa ngàn năm văn hiến. Rất ấn tượng với câu đố phân biệt hoa văn thời Lê - Nguyễn trên 82 bia Tiến sĩ!",
    culturalFact: "Khuê Văn Các được dựng năm 1805 dưới thời Nguyễn, là biểu tượng trường tồn của trí tuệ và truyền thống hiếu học Việt Nam.",
    tags: ["Văn Miếu", "Khuê Văn Các", "Đạo học Việt", "Check-in GPS"],
  },
  {
    id: "journey-ht-002",
    destinationName: "Hoàng Thành Thăng Long",
    location: "19C Hoàng Diệu, Quán Thánh, Ba Đình, Hà Nội",
    category: "Di sản Thế giới UNESCO",
    checkInTime: "15:45 - 12/09/2026",
    timestamp: "2026-09-12T15:45:00+07:00",
    activationMethod: "Quét mã QR Hiện vật",
    solvedQuest: "Chụp ảnh Cột Cờ (+75 pts)",
    pointsEarned: 75,
    questDifficulty: "Thử thách",
    memoryImage: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
    imageCaption: "Cột Cờ Hà Nội kiêu hãnh trong ánh hoàng hôn tháng 9",
    shortReflection: "Đứng trên Đoan Môn nhìn về nền điện Kính Thiên có rồng đá chầu uy nghiêm. Quét mã hiện vật đầu rồng đất nung thời Lý mở ra mô hình AR sống động tuyệt vời.",
    culturalFact: "Hoàng thành Thăng Long là trung tâm quyền lực chính trị liên tục suốt hơn 13 thế kỷ, từ thời Lý, Trần, Lê qua Mạc đến thời Nguyễn.",
    tags: ["Hoàng Thành", "Cột Cờ Hà Nội", "UNESCO", "Quét mã QR"],
  },
  {
    id: "journey-bt-003",
    destinationName: "Làng Gốm Bát Tràng",
    location: "Bát Tràng, Gia Lâm, Hà Nội",
    category: "Làng nghề Truyền thống",
    checkInTime: "10:15 - 05/09/2026",
    timestamp: "2026-09-05T10:15:00+07:00",
    activationMethod: "Quét mã QR Hiện vật",
    solvedQuest: "Xoay Bàn Gốm Cổ Truyền (+60 pts)",
    pointsEarned: 60,
    questDifficulty: "Trải nghiệm",
    memoryImage: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1200&q=80",
    imageCaption: "Tự tay vuốt đất sét và nung men hỏa biến tại Lò Bầu cổ",
    shortReflection: "Mùi phù sa sông Hồng quyện với đất sét nung. Được nghệ nhân già hướng dẫn kỹ thuật chuốt gốm và nghe chuyện lò bầu cổ hơn 100 năm giữ lửa.",
    culturalFact: "Gốm Bát Tràng nổi tiếng với các dòng men đặc sắc như men tro, men rạn, men ngọc và kỹ thuật đắp nổi hoa văn tinh xảo từ thế kỷ 14.",
    tags: ["Làng Gốm Bát Tràng", "Nghệ nhân Việt", "Lò Bầu Cổ", "Trải nghiệm"],
  },
];

/**
 * 2. TICKET LIST — Danh sách vé điện tử & chi phí tham quan
 * Quản lý trạng thái vé (ACTIVE, USED, REFUNDED), cổng thanh toán và mã QR tượng trưng
 */
export const ticketList = [
  {
    ticketCode: "VK-2026-089",
    tourName: "Hành Trình Ngàn Năm Văn Hiến",
    destination: "Cụm Di Tích Nội Thành Hà Nội",
    price: "80.000 đ",
    numericPrice: 80000,
    status: "ACTIVE", // ACTIVE: Còn hiệu lực - sẵn sàng quét QR qua cổng
    statusLabel: "Còn hiệu lực",
    statusBadgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    purchaseDate: "14:20 - 18/09/2026",
    validDate: "18/09/2026 - 20/09/2026",
    paymentGateway: "VNPay",
    transactionId: "VNP-9823419082",
    qrCodeUrl: "https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=VIETCULTURE_VK-2026-089_ACTIVE",
    holderName: "Nguyễn An",
    passengerCount: 1,
    benefits: [
      "Vé vào cổng di tích ưu tiên (không cần xếp hàng đổi vé giấy)",
      "Trợ lý AI thuyết minh cá nhân hóa qua tai nghe",
      "Tham gia giải đố văn hóa tương tác nhận huy hiệu độc quyền",
      "Bảo hiểm du lịch nội địa theo lượt tham quan",
    ],
  },
  {
    ticketCode: "VK-2026-042",
    tourName: "Khám Phá Lò Bầu Cổ Bát Tràng",
    destination: "Bảo tàng Gốm & Làng cổ Bát Tràng",
    price: "Miễn phí",
    numericPrice: 0,
    status: "USED", // USED: Đã sử dụng
    statusLabel: "Đã sử dụng",
    statusBadgeColor: "bg-slate-100 text-slate-700 border-slate-300",
    purchaseDate: "08:10 - 05/09/2026",
    validDate: "05/09/2026",
    usedAt: "10:10 - 05/09/2026 tại Cửa Soát Vé Lò Bầu",
    paymentGateway: "MoMo",
    transactionId: "MOMO-77123901",
    qrCodeUrl: "https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=VIETCULTURE_VK-2026-042_USED",
    holderName: "Nguyễn An",
    passengerCount: 1,
    benefits: [
      "Vé vào cổng di tích Lò Bầu Cổ",
      "Trợ lý AI thuyết minh quy trình nung gốm 5 màu men",
      "Tham gia giải đố nhận huy hiệu 'Tinh Hoa Gốm Sứ'",
    ],
  },
  {
    ticketCode: "VK-2026-031",
    tourName: "Dấu Ấn Hoàng Thành Thăng Long",
    destination: "Khu di tích Trung tâm Hoàng thành Thăng Long",
    price: "50.000 đ",
    numericPrice: 50000,
    status: "USED",
    statusLabel: "Đã sử dụng",
    statusBadgeColor: "bg-slate-100 text-slate-700 border-slate-300",
    purchaseDate: "13:00 - 12/09/2026",
    validDate: "12/09/2026",
    usedAt: "15:40 - 12/09/2026 tại Cổng Đoan Môn",
    paymentGateway: "VNPay",
    transactionId: "VNP-124950821",
    qrCodeUrl: "https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=VIETCULTURE_VK-2026-031_USED",
    holderName: "Nguyễn An",
    passengerCount: 1,
    benefits: [
      "Vé vào cổng di tích khảo cổ 18 Hoàng Diệu & Điện Kính Thiên",
      "Trợ lý AI thuyết minh lịch sử triều đại",
      "Tham gia giải đố nhận huy hiệu 'Dấu Ấn Thăng Long'",
    ],
  },
  {
    ticketCode: "VK-2026-015",
    tourName: "Tour Đêm Văn Miếu: Tinh Hoa Đạo Học",
    destination: "Văn Miếu - Quốc Tử Giám",
    price: "120.000 đ",
    numericPrice: 120000,
    status: "REFUNDED", // REFUNDED: Đã hoàn tiền
    statusLabel: "Đã hoàn tiền",
    statusBadgeColor: "bg-amber-50 text-amber-700 border-amber-200",
    purchaseDate: "19:00 - 28/08/2026",
    validDate: "30/08/2026",
    refundedAt: "10:30 - 29/08/2026",
    paymentGateway: "MoMo",
    transactionId: "MOMO-99381200",
    qrCodeUrl: "https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=VIETCULTURE_VK-2026-015_REFUNDED",
    holderName: "Nguyễn An",
    passengerCount: 1,
    benefits: [
      "Vé vào cổng di tích chương trình đêm kết hợp trình diễn 3D Mapping",
      "Trợ lý AI thuyết minh chuyên đề Văn Miếu",
      "Tham gia giải đố nhận huy hiệu đặc biệt",
    ],
  },
];

/**
 * 3. TICKET_STATUS_CONFIG — Hỗ trợ filter và style badge cho màn hình Vé & Chi Phí
 */
export const TICKET_STATUS_CONFIG = {
  ACTIVE: {
    key: "ACTIVE",
    label: "Còn hiệu lực",
    description: "Sẵn sàng quét QR qua cổng di tích",
    badgeClass: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20",
    dotClass: "bg-emerald-500",
  },
  USED: {
    key: "USED",
    label: "Đã sử dụng",
    description: "Vé đã hoàn tất quét mã vào cổng",
    badgeClass: "bg-slate-500/10 text-slate-600 dark:text-slate-400 border border-slate-500/20",
    dotClass: "bg-slate-400",
  },
  REFUNDED: {
    key: "REFUNDED",
    label: "Đã hoàn tiền",
    description: "Giao dịch đã được hủy & hoàn tiền về tài khoản",
    badgeClass: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20",
    dotClass: "bg-amber-500",
  },
};

/**
 * 4. SUMMARY_STATS — Số liệu tổng hợp nhanh cho các widget KPI/Thống kê trên màn hình
 */
export const journeyAndTicketSummary = {
  totalJourneysCompleted: 3,
  totalQuestsSolved: 3,
  totalQuestPoints: 185,
  totalTickets: 4,
  activeTicketsCount: 1,
  usedTicketsCount: 2,
  refundedTicketsCount: 1,
  totalExpenseFormatted: "130.000 đ", // Chỉ tính tiền vé thực tế đã sử dụng / đang hiệu lực: 80k + 50k
  savedWithCulturePassFormatted: "40.000 đ",
};
