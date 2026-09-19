"use client";

import React from "react";

/**
 * MobileContainer
 * Khung mô phỏng màn hình điện thoại (PWA mobile frame) đặt ở giữa màn hình desktop
 * Phong cách Cổng thông tin Du lịch Việt Nam: Tươi sáng, tinh tế, viền bóng đổ nhẹ
 */
export default function MobileContainer({ children, className = "" }) {
  return (
    <div className="w-full min-h-screen bg-slate-200/60 flex justify-center items-start">
      <main
        className={`w-full max-w-md mx-auto min-h-screen bg-slate-50 relative shadow-2xl border-x border-slate-200 pb-20 overflow-x-hidden ${className}`}
      >
        {children}
      </main>
    </div>
  );
}
