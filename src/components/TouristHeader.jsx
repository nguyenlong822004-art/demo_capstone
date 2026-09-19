"use client";

import React from "react";
import { MapPin, Phone } from "lucide-react";
import VietCultureLogo from "./VietCultureLogo";

/**
 * TouristHeader
 * Header phong cảnh tươi sáng cho Cổng Thông Tin Du Lịch Văn Hóa Việt Nam
 * 
 * Props:
 * - location: string (mặc định "Hà Nội, VN")
 * - hotline: string (mặc định "1900 6888")
 * - bannerImage: string (đường dẫn ảnh banner)
 * - subtitle: string (mặc định "Trải nghiệm thực tế di sản")
 * - headline: string (mặc định "Chạm vào Lịch sử - Khám phá Văn hóa")
 */
export default function TouristHeader({
  location = "Hà Nội, VN",
  hotline = "1900 6888",
  bannerImage = "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80",
  subtitle = "TRẢI NGHIỆM THỰC TẾ DI SẢN",
  headline = "Chạm vào Lịch sử - Khám phá Văn hóa",
}) {
  return (
    <header className="h-80 w-full relative overflow-hidden bg-sky-900">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={bannerImage}
        alt="Phong cảnh Di Sản Văn Hóa Việt Nam"
        className="absolute inset-0 w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-1000 ease-out"
        onError={(e) => {
          e.currentTarget.src =
            "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80";
        }}
      />

      {/* Lớp gradient chuyển màu chuẩn thiết kế */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/20 to-slate-50/90 pointer-events-none" />

      {/* ── Cụm Top Bar nổi trực tiếp ở mép trên ảnh ── */}
      <div className="absolute top-0 inset-x-0 pt-4 px-4 flex items-center justify-between z-20">
        {/* Bên trái: Chip vị trí Hà Nội, VN */}
        <div className="bg-black/35 backdrop-blur-md text-white border border-white/20 rounded-full px-3 py-1.5 text-xs font-semibold flex items-center gap-1.5 shadow-sm">
          <MapPin size={13} className="text-emerald-400 flex-shrink-0" />
          <span>{location}</span>
        </div>

        {/* Ở giữa: Logo thương hiệu vietculture có búp sen chữ V xanh lá mạ */}
        <div className="bg-white/90 backdrop-blur-md rounded-full px-3.5 py-1.5 shadow-md flex items-center gap-2 border border-white/70">
          <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 drop-shadow-xs"
            >
              <path
                d="M12 21C7 16.5 4 12.5 4 8C4 5 6 3 8.5 3C10.2 3 11.4 4 12 5.2C12.6 4 13.8 3 15.5 3C18 3 20 5 20 8C20 12.5 17 16.5 12 21Z"
                fill="url(#lotus-grad-header)"
              />
              <path
                d="M8.5 8L12 15L15.5 8"
                stroke="#ffffff"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <defs>
                <linearGradient id="lotus-grad-header" x1="4" y1="3" x2="20" y2="21" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#84cc16" />
                  <stop offset="1" stopColor="#10b981" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="flex items-center tracking-tight leading-none text-xs font-black">
            <span className="text-lime-600">viet</span>
            <span className="text-sky-700">culture</span>
          </div>
        </div>

        {/* Bên phải: Nút hotline 1900 6888 */}
        <a
          href={`tel:${hotline.replace(/\s+/g, "")}`}
          title="Gọi hotline hỗ trợ khẩn cấp"
          className="bg-rose-500/85 backdrop-blur-md text-white rounded-full px-3 py-1.5 text-xs font-semibold flex items-center gap-1.5 shadow-sm hover:bg-rose-600 active:scale-95 transition-all"
        >
          <Phone size={13} className="text-white flex-shrink-0 animate-pulse" />
          <span>{hotline}</span>
        </a>
      </div>

      {/* ── Tiêu đề đè ở chân ảnh: Thẻ kính mờ trắng sáng (White Glassmorphism) ── */}
      <div className="absolute bottom-4 inset-x-0 px-4 z-20 flex justify-center">
        <div className="max-w-[340px] w-full mx-auto px-5 py-3 bg-white/80 backdrop-blur-md border border-white/80 rounded-2xl text-center shadow-[0_4px_20px_rgba(0,0,0,0.12)]">
          <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-emerald-700">
            {subtitle}
          </span>
          <h1 className="text-base font-bold text-slate-800 tracking-tight mt-0.5 leading-snug">
            {headline}
          </h1>
        </div>
      </div>
    </header>
  );
}
