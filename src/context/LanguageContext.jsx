"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

/**
 * Danh sách ngôn ngữ được hỗ trợ trong ứng dụng VietCulture
 */
export const SUPPORTED_LANGUAGES = [
  { code: "vi", name: "Tiếng Việt", flag: "🇻🇳", label: "Tiếng Việt" },
  { code: "en", name: "English", flag: "🇬🇧", label: "English" },
  { code: "ja", name: "日本語", flag: "🇯🇵", label: "日本語" },
];

/**
 * Bộ từ điển dịch thuật đa ngôn ngữ (Translations Dictionary)
 * Hỗ trợ: vi (Tiếng Việt), en (English), ja (日本語)
 */
export const translations = {
  vi: {
    // Top Bar & Header
    profileTitle: "Trang Cá Nhân",
    userId: "Mã định danh",
    notifications: "Thông báo",
    settings: "Cài đặt",
    backToHome: "Quay lại Trang chủ",

    // Profile Overview
    userTitle: "Nhà Thám Hiểm Di Sản",
    joinedSince: "Thành viên từ",
    points: "Điểm tích lũy",
    badges: "Huy hiệu",
    tier: "Hạng thành viên",
    silverTier: "Hạng Bạc",
    goldTier: "Hạng Vàng",
    pointsToGold: "Tích lũy thêm {points} điểm để đạt Hạng Vàng!",

    // Badge Collection
    badgeCollectionTitle: "BỘ SƯU TẬP HUY HIỆU DI SẢN",
    viewAll: "Xem tất cả",
    badgeDetails: "Chi tiết huy hiệu",
    earnedOn: "Đạt được ngày",
    understood: "Đã hiểu",

    // Journey Log Timeline
    journeyLogTitle: "NHẬT KÝ HÀNH TRÌNH",
    sitesVisited: "điểm đã đến",
    gpsVerified: "GPS Verified",
    qrScanned: "QR Scanned",

    // My Passes & Tickets
    myPassesTitle: "VÍ VÉ & GIAO DỊCH ĐIỆN TỬ",
    ticketsInWallet: "vé trong ví",
    valid: "Còn hiệu lực",
    used: "Đã sử dụng",
    expiresOn: "Hạn dùng",
    tapToViewQr: "Chạm xem QR",
    ticketCode: "Mã vé",
    closeTicket: "Đóng vé",
    presentQrTip: "Xuất trình mã này tại quầy kiểm soát vé hoặc quét tại cổng tự động.",

    // Account Settings Menu
    settingsSectionTitle: "CÀI ĐẶT & TÙY CHỌN",
    personalInfo: "Thông tin cá nhân",
    personalInfoDesc: "Họ tên, email, số điện thoại",
    paymentHistory: "Lịch sử thanh toán & hóa đơn",
    paymentHistoryDesc: "Vé điện tử, biên lai giao dịch VAT",
    language: "Ngôn ngữ",
    languageDesc: "Tùy chọn hiển thị ngôn ngữ",
    supportHotline: "Hỗ trợ du khách 1900 6888",
    supportHotlineDesc: "Tổng đài hỗ trợ khẩn cấp 24/7",
    callNow: "Gọi ngay",
    logOut: "Đăng xuất",
    logOutDesc: "Thoát tài khoản khỏi thiết bị",

    // Bottom Navigation Bar
    navHome: "Trang chủ",
    navRoutes: "Lộ trình",
    navCheckin: "Check-in",
    navNotifications: "Thông báo",
    navAccount: "Tài khoản",

    // Modal & Toast Actions
    selectLanguageModalTitle: "Chọn ngôn ngữ hiển thị",
    languageChangedToast: "Đã chuyển sang Tiếng Việt",
  },

  en: {
    // Top Bar & Header
    profileTitle: "My Profile",
    userId: "User ID",
    notifications: "Notifications",
    settings: "Settings",
    backToHome: "Back to Home",

    // Profile Overview
    userTitle: "Heritage Explorer",
    joinedSince: "Member since",
    points: "Reward Points",
    badges: "Badges",
    tier: "Member Tier",
    silverTier: "Silver Tier",
    goldTier: "Gold Tier",
    pointsToGold: "Earn {points} more points to reach Gold Tier!",

    // Badge Collection
    badgeCollectionTitle: "HERITAGE BADGE COLLECTION",
    viewAll: "View All",
    badgeDetails: "Badge Details",
    earnedOn: "Earned on",
    understood: "Got it",

    // Journey Log Timeline
    journeyLogTitle: "JOURNEY TIMELINE",
    sitesVisited: "sites visited",
    gpsVerified: "GPS Verified",
    qrScanned: "QR Scanned",

    // My Passes & Tickets
    myPassesTitle: "MY PASSES & E-TICKETS",
    ticketsInWallet: "tickets in wallet",
    valid: "Active",
    used: "Used",
    expiresOn: "Expires",
    tapToViewQr: "Tap for QR",
    ticketCode: "Ticket Code",
    closeTicket: "Close Ticket",
    presentQrTip: "Present this code at the ticket counter or scan at automated gates.",

    // Account Settings Menu
    settingsSectionTitle: "SETTINGS & PREFERENCES",
    personalInfo: "Personal Information",
    personalInfoDesc: "Full name, email, phone number",
    paymentHistory: "Payment History & Invoices",
    paymentHistoryDesc: "E-tickets, official VAT receipts",
    language: "Language",
    languageDesc: "Display language preferences",
    supportHotline: "Tourist Hotline 1900 6888",
    supportHotlineDesc: "24/7 emergency tourist assistance",
    callNow: "Call Now",
    logOut: "Log Out",
    logOutDesc: "Sign out from this device",

    // Bottom Navigation Bar
    navHome: "Home",
    navRoutes: "Routes",
    navCheckin: "Check-in",
    navNotifications: "Alerts",
    navAccount: "Profile",

    // Modal & Toast Actions
    selectLanguageModalTitle: "Select Display Language",
    languageChangedToast: "Language changed to English",
  },

  ja: {
    // Top Bar & Header
    profileTitle: "マイページ",
    userId: "ユーザーID",
    notifications: "お知らせ",
    settings: "設定",
    backToHome: "ホームへ戻る",

    // Profile Overview
    userTitle: "文化遺産探検家",
    joinedSince: "登録日",
    points: "獲得ポイント",
    badges: "バッジ",
    tier: "会員ランク",
    silverTier: "シルバーランク",
    goldTier: "ゴールドランク",
    pointsToGold: "ゴールドランクまであと{points}ポイント！",

    // Badge Collection
    badgeCollectionTitle: "遺産バッジコレクション",
    viewAll: "すべて見る",
    badgeDetails: "バッジ詳細",
    earnedOn: "獲得日",
    understood: "閉じる",

    // Journey Log Timeline
    journeyLogTitle: "旅行日誌タイムライン",
    sitesVisited: "箇所訪問済み",
    gpsVerified: "GPS確認済み",
    qrScanned: "QRスキャン済み",

    // My Passes & Tickets
    myPassesTitle: "電子チケット・パス",
    ticketsInWallet: "枚のチケット",
    valid: "有効",
    used: "使用済み",
    expiresOn: "有効期限",
    tapToViewQr: "QRを表示",
    ticketCode: "チケット番号",
    closeTicket: "閉じる",
    presentQrTip: "入場ゲートまたはチケット売場にてこのQRコードをご提示ください。",

    // Account Settings Menu
    settingsSectionTitle: "設定・環境設定",
    personalInfo: "個人情報",
    personalInfoDesc: "氏名、メールアドレス、電話番号",
    paymentHistory: "支払い履歴・領収書",
    paymentHistoryDesc: "電子チケット、電子領収書",
    language: "表示言語",
    languageDesc: "言語の切り替え設定",
    supportHotline: "観光客サポート 1900 6888",
    supportHotlineDesc: "24時間年中無休 緊急サポート",
    callNow: "今すぐ発信",
    logOut: "ログアウト",
    logOutDesc: "この端末からログアウトする",

    // Bottom Navigation Bar
    navHome: "ホーム",
    navRoutes: "ルート",
    navCheckin: "チェックイン",
    navNotifications: "お知らせ",
    navAccount: "アカウント",

    // Modal & Toast Actions
    selectLanguageModalTitle: "表示言語を選択",
    languageChangedToast: "日本語に切り替えました",
  },
};

const LanguageContext = createContext({
  language: "vi",
  setLanguage: () => {},
  t: (key, fallback) => fallback || key,
  supportedLanguages: SUPPORTED_LANGUAGES,
});

/**
 * LanguageProvider
 * Quản lý ngôn ngữ toàn ứng dụng, lưu trữ vào localStorage
 */
export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState("vi");
  const [isLoaded, setIsLoaded] = useState(false);

  // Đọc ngôn ngữ đã lưu từ localStorage khi component mount (Client-side)
  useEffect(() => {
    try {
      const savedLang = localStorage.getItem("vietculture_lang");
      if (savedLang && (savedLang === "vi" || savedLang === "en" || savedLang === "ja")) {
        setLanguageState(savedLang);
      }
    } catch {
      // Bỏ qua lỗi truy cập localStorage nếu ở môi trường bị chặn
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Đổi ngôn ngữ và lưu vào localStorage
  const setLanguage = (langCode) => {
    if (langCode === "vi" || langCode === "en" || langCode === "ja") {
      setLanguageState(langCode);
      try {
        localStorage.setItem("vietculture_lang", langCode);
      } catch {
        // Fallback an toàn
      }
    }
  };

  /**
   * Hàm dịch thuật t(key, fallback)
   * Truy xuất chuỗi dịch theo key, fallback về Tiếng Việt nếu thiếu
   */
  const t = (key, fallback = "") => {
    const currentDict = translations[language] || translations.vi;
    if (currentDict && currentDict[key] !== undefined) {
      return currentDict[key];
    }

    // Fallback sang Tiếng Việt
    if (translations.vi && translations.vi[key] !== undefined) {
      return translations.vi[key];
    }

    return fallback || key;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        supportedLanguages: SUPPORTED_LANGUAGES,
        isLoaded,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

/**
 * Hook useLanguage()
 * Sử dụng trong các component để lấy ngôn ngữ và hàm dịch t()
 */
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

export default LanguageContext;
