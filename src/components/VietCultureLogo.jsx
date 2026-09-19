"use client";

import React from "react";

/**
 * VietCultureLogo
 * Logo nhận diện thương hiệu VietCulture kết hợp cánh hoa sen và chốt định vị GPS
 * Tone màu: Xanh ngọc lục bảo (#00A86B), xanh biển tươi (#0288D1) và vàng kim
 */
export default function VietCultureLogo({ className = "", size = "md", showText = true }) {
  const sizeMap = {
    sm: "w-6 h-6",
    md: "w-7 h-7",
    lg: "w-9 h-9",
    xl: "w-12 h-12",
  };

  const imgSize = sizeMap[size] || sizeMap.md;

  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      {/* Biểu tượng logo hoa sen + GPS pin */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/image/logo.png"
        alt="VietCulture Logo"
        className={`${imgSize} rounded-full object-cover shadow-xs border border-emerald-100 flex-shrink-0`}
      />

      {/* Tên thương hiệu */}
      {showText && (
        <div className="flex items-center tracking-tight leading-none">
          <span className="text-xs font-black tracking-tight text-[#00A86B]">
            viet
          </span>
          <span className="text-xs font-black tracking-tight text-[#0288D1]">
            culture
          </span>
        </div>
      )}
    </div>
  );
}
