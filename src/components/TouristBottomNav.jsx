"use client";

import React from "react";
import Link from "next/link";
import { Home, Compass, QrCode, MessageSquareShare, User } from "lucide-react";

/**
 * TouristBottomNav
 * Thanh điều hướng đáy ứng dụng Du lịch Văn hóa Việt Nam
 * 
 * Props:
 * - activeTab: string ("home" | "routes" | "community" | "account")
 * - setActiveTab: function(tabId)
 * - onOpenCheckIn: function() - kích hoạt modal / camera quét QR check-in
 */
export default function TouristBottomNav({
  activeTab = "home",
  setActiveTab = () => {},
  onOpenCheckIn = () => {},
}) {
  const navItems = [
    { id: "home", label: "Trang chủ", icon: Home, href: "/" },
    { id: "routes", label: "Lộ trình", icon: Compass, href: "/explore" },
    { id: "checkin", isSpecial: true },
    { id: "community", label: "Diễn đàn", icon: MessageSquareShare, href: "/community" },
    { id: "account", label: "Tài khoản", icon: User, href: "/profile" },
  ];

  return (
    <nav
      className="fixed bottom-0 left-1/2 -translate-x-1/2 max-w-md w-full bg-white border-t border-slate-200 flex justify-around items-center h-16 z-40 shadow-[0_-4px_16px_rgba(0,0,0,0.04)] px-2"
      aria-label="Thanh điều hướng chính"
    >
      {navItems.map((item) => {
        // Nút chính giữa Check-in nhô cao
        if (item.isSpecial) {
          return (
            <div key="center-checkin" className="relative flex justify-center w-16">
              <button
                type="button"
                onClick={onOpenCheckIn}
                className="absolute -top-5 w-14 h-14 rounded-full bg-emerald-600 shadow-lg flex flex-col items-center justify-center border-4 border-white active:scale-95 transition-transform hover:bg-emerald-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                aria-label="Mở quét mã Check-in di tích"
              >
                <QrCode size={22} className="text-white mb-0.5" strokeWidth={2.4} />
                <span className="text-[0.55rem] font-bold text-white tracking-wide uppercase leading-none">
                  Check-in
                </span>
              </button>
            </div>
          );
        }

        const Icon = item.icon;
        const isActive = activeTab === item.id;

        const buttonContent = (
          <>
            <Icon
              size={20}
              strokeWidth={isActive ? 2.3 : 1.8}
              className={`transition-transform duration-200 ${
                isActive ? "scale-110" : ""
              }`}
            />
            <span className="text-[0.68rem] mt-1 leading-none tracking-tight">
              {item.label}
            </span>

            {/* Chỉ báo active nhẹ nhàng */}
            {isActive && (
              <span className="absolute bottom-0 w-4 h-0.5 bg-[#0288D1] rounded-full" />
            )}
          </>
        );

        if (item.href) {
          return (
            <Link
              key={item.id}
              href={item.href}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors relative cursor-pointer ${
                isActive
                  ? "text-[#0288D1] font-semibold"
                  : "text-slate-400 hover:text-slate-600 font-normal"
              }`}
            >
              {buttonContent}
            </Link>
          );
        }

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors relative cursor-pointer ${
              isActive
                ? "text-[#0288D1] font-semibold"
                : "text-slate-400 hover:text-slate-600 font-normal"
            }`}
          >
            {buttonContent}
          </button>
        );
      })}
    </nav>
  );
}
