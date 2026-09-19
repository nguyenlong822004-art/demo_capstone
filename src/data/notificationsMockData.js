/**
 * Dữ liệu Mock Thông Báo Khách Du Lịch (Tourist Notifications Mock Data)
 * Ứng dụng Du Lịch Văn Hóa Việt Nam - VietCulture
 * Định dạng: JavaScript Object thuần (ES Module)
 */

export const NOTIFICATION_TYPE_CONFIG = {
  REWARD: {
    label: "Thưởng & Huy hiệu",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
    iconBg: "bg-amber-100 text-amber-600",
  },
  TICKET: {
    label: "Vé & Lộ trình",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    iconBg: "bg-emerald-100 text-emerald-600",
  },
  AI_ROUTE: {
    label: "Trợ lý AI",
    badgeColor: "bg-sky-50 text-sky-700 border-sky-200",
    iconBg: "bg-sky-100 text-sky-600",
  },
  SYSTEM: {
    label: "Hệ thống",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
    iconBg: "bg-purple-100 text-purple-600",
  },
};

export const mockNotifications = [
  {
    id: "notif-001",
    type: "REWARD",
    title: "Mở khóa huy hiệu mới!",
    content:
      "Chúc mừng Nguyễn An đã hoàn thành thử thách QR tại Văn Miếu và nhận +100 điểm thưởng.",
    time: "5 phút trước",
    isRead: false,
    linkAction: "/profile",
    iconType: "Award",
  },
  {
    id: "notif-002",
    type: "TICKET",
    title: "Vé điện tử đã sẵn sàng",
    content:
      "Mã QR vào cổng tour Quần Thể Di Sản Tràng An của bạn đã được kích hoạt thành công.",
    time: "2 giờ trước",
    isRead: false,
    linkAction: "/tickets",
    iconType: "Ticket",
  },
  {
    id: "notif-003",
    type: "TICKET",
    title: "Hoàn tiền thành công",
    content:
      "Yêu cầu hoàn vé tour Đêm Hoàng Thành đã được giải quyết. Số tiền 80.000 đ đã chuyển về ví MoMo.",
    time: "Hôm qua",
    isRead: true,
    linkAction: "/profile/disputes",
    iconType: "CheckCircle2",
  },
  {
    id: "notif-004",
    type: "AI_ROUTE",
    title: "Gợi ý lộ trình sáng nay",
    content:
      "Thời tiết Hà Nội hôm nay rất đẹp, Trợ lý AI gợi ý bạn tour dạo quanh Làng Gốm Bát Tràng.",
    time: "Hôm qua",
    isRead: true,
    linkAction: "/explore",
    iconType: "Sparkles",
  },
  {
    id: "notif-005",
    type: "SYSTEM",
    title: "Chào mừng thành viên mới",
    content:
      "Tặng bạn +100 điểm thưởng ban đầu để bắt đầu hành trình khám phá di sản.",
    time: "2 ngày trước",
    isRead: true,
    linkAction: "/profile",
    iconType: "Gift",
  },
];

// Helper: Số lượng thông báo chưa đọc
export const unreadNotificationsCount = mockNotifications.filter(
  (n) => !n.isRead
).length;

export default mockNotifications;
