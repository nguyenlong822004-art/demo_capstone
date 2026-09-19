"use client";

import React from "react";

/**
 * CuteAIMascot
 * Nhân vật AI Chatbot Chibi dễ thương mang nón lá truyền thống Việt Nam
 * Thiết kế bằng SVG thuần, sắc nét, có hiệu ứng chớp mắt và nhấp nhô nhẹ
 * 
 * Props:
 * - size: "sm" | "md" | "lg"
 * - className: string
 * - withHat: boolean (mặc định true: nón lá Việt Nam)
 * - isFloating: boolean (mặc định true: hiệu ứng bồng bềnh)
 */
export default function CuteAIMascot({
  size = "md",
  className = "",
  withHat = true,
  isFloating = true,
}) {
  const sizeMap = {
    sm: "w-10 h-10",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-20 h-20",
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  return (
    <div
      className={`relative flex items-center justify-center select-none ${currentSize} ${
        isFloating ? "animate-[bounce_3s_ease-in-out_infinite]" : ""
      } ${className}`}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md"
      >
        <defs>
          {/* Gradient đầu chatbot */}
          <linearGradient id="headGrad" x1="20" y1="20" x2="80" y2="85" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ffffff" />
            <stop offset="0.6" stopColor="#e0f2fe" />
            <stop offset="1" stopColor="#bae6fd" />
          </linearGradient>

          {/* Gradient nón lá Việt Nam */}
          <linearGradient id="hatGrad" x1="50" y1="5" x2="50" y2="45" gradientUnits="userSpaceOnUse">
            <stop stopColor="#fef08a" />
            <stop offset="0.5" stopColor="#fde047" />
            <stop offset="1" stopColor="#eab308" />
          </linearGradient>

          {/* Gradient tai nghe / ốp tai */}
          <linearGradient id="earGrad" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#0284c7" />
            <stop offset="1" stopColor="#0369a1" />
          </linearGradient>

          {/* Bóng đổ gương mặt */}
          <filter id="softGlow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#0284c7" floodOpacity="0.2" />
          </filter>
        </defs>

        {/* ── 1. Tai nghe hai bên đầu ── */}
        <rect x="12" y="44" width="8" height="20" rx="4" fill="url(#earGrad)" />
        <rect x="80" y="44" width="8" height="20" rx="4" fill="url(#earGrad)" />
        <path d="M16 48C16 30 84 30 84 48" stroke="#0284c7" strokeWidth="4" strokeLinecap="round" />

        {/* ── 2. Đầu tròn Chibi Robot ── */}
        <rect
          x="18"
          y="32"
          width="64"
          height="54"
          rx="27"
          fill="url(#headGrad)"
          stroke="#38bdf8"
          strokeWidth="3"
          filter="url(#softGlow)"
        />

        {/* Màn hình hiển thị gương mặt (Kính đen / xanh đậm mềm mại) */}
        <rect x="25" y="40" width="50" height="38" rx="19" fill="#0f172a" />

        {/* ── 3. Đôi mắt to tròn long lanh màu xanh ngọc ── */}
        {/* Mắt trái */}
        <g className="animate-pulse">
          <ellipse cx="40" cy="56" rx="5.5" ry="7.5" fill="#38bdf8" />
          {/* Đốm sáng phản chiếu to */}
          <circle cx="38" cy="53" r="2.2" fill="#ffffff" />
          {/* Đốm sáng nhỏ */}
          <circle cx="42" cy="59" r="1.1" fill="#ffffff" />
        </g>

        {/* Mắt phải */}
        <g className="animate-pulse">
          <ellipse cx="60" cy="56" rx="5.5" ry="7.5" fill="#38bdf8" />
          {/* Đốm sáng phản chiếu to */}
          <circle cx="58" cy="53" r="2.2" fill="#ffffff" />
          {/* Đốm sáng nhỏ */}
          <circle cx="62" cy="59" r="1.1" fill="#ffffff" />
        </g>

        {/* ── 4. Má hồng e thẹn cute ── */}
        <ellipse cx="32" cy="65" rx="3.5" ry="2" fill="#f43f5e" opacity="0.65" />
        <ellipse cx="68" cy="65" rx="3.5" ry="2" fill="#f43f5e" opacity="0.65" />

        {/* ── 5. Miệng cười tươi dễ thương ── */}
        <path
          d="M46 64C46 67 54 67 54 64"
          stroke="#38bdf8"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* ── 6. Nón lá Việt Nam đội lệch đáng yêu ── */}
        {withHat && (
          <g transform="rotate(-8 50 25)">
            {/* Thân nón */}
            <path
              d="M50 8L20 32C20 32 35 36 50 36C65 36 80 32 80 32L50 8Z"
              fill="url(#hatGrad)"
              stroke="#ca8a04"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            {/* Các nan vành nón lá */}
            <path d="M50 8L35 34" stroke="#eab308" strokeWidth="0.8" opacity="0.7" />
            <path d="M50 8L50 36" stroke="#eab308" strokeWidth="0.8" opacity="0.7" />
            <path d="M50 8L65 34" stroke="#eab308" strokeWidth="0.8" opacity="0.7" />
            <path d="M28 26C39 29 61 29 72 26" stroke="#ca8a04" strokeWidth="0.8" opacity="0.6" />
            {/* Chóp nón nhỏ đỏ/xanh trang trí */}
            <circle cx="50" cy="8" r="2" fill="#ef4444" />
          </g>
        )}

        {/* Đèn tín hiệu trạng thái trên nón/đầu */}
        <circle cx="73" cy="38" r="2.5" fill="#22c55e" className="animate-ping" opacity="0.75" />
        <circle cx="73" cy="38" r="2.5" fill="#22c55e" />
      </svg>

      {/* Chấm xanh trực tuyến Online nhỏ ở góc */}
      <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-white" />
      </span>
    </div>
  );
}
