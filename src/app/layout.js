import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

const beVietnam = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-be-vietnam",
  display: "swap",
});

export const metadata = {
  title: "VietCulture – Khám Phá Di Sản Văn Hóa Việt Nam",
  description:
    "Ứng dụng du lịch văn hóa thông minh – Khám phá di tích lịch sử, hoàn thành nhiệm vụ và tích điểm thưởng tại các địa danh nổi tiếng Việt Nam.",
  keywords: "du lịch văn hóa, Việt Nam, di tích lịch sử, Văn Miếu, Hoàng Thành, Tràng An",
  manifest: "/manifest.json",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#0ea5e9",
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi" className={beVietnam.variable} suppressHydrationWarning>
      <body className="font-[var(--font-be-vietnam)] bg-slate-50 text-slate-800">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
