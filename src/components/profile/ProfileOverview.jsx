"use client";

import React from "react";
import Link from "next/link";
import { Star, Award, Shield, Sparkles, Calendar, ChevronRight, Edit3 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { profileInfo as defaultProfile } from "@/data/userProfileMockData";

/**
 * ProfileOverview
 * Thẻ tổng quan hồ sơ Khách du lịch (Tourist Profile Card)
 * Phong cách Cổng thông tin du lịch Việt Nam: Tươi sáng, sang trọng, màu ngọc lục bảo (Emerald - Teal)
 * 
 * Props:
 * - profile: Object thông tin cá nhân (mặc định lấy từ userProfileMockData.js)
 * - onEditProfile: Function xử lý chỉnh sửa hồ sơ
 * - onViewRank: Function xem quyền lợi thứ hạng
 */
export default function ProfileOverview({
  profile = defaultProfile,
  onEditProfile = () => {},
  onViewRank = () => {},
}) {
  const { t } = useLanguage();
  return (
    <section aria-label="Thông tin hồ sơ cá nhân">
      {/* ── Thẻ hồ sơ bo góc lớn gradient xanh ngọc - lam mượt mà ── */}
      <div className="rounded-3xl bg-gradient-to-br from-emerald-500 via-teal-600 to-sky-700 text-white p-5 shadow-lg relative overflow-hidden transition-all">
        {/* Vòng tròn hoa văn trang trí nền kính mờ */}
        <div className="absolute -right-8 -top-8 w-36 h-36 bg-white/10 rounded-full blur-sm pointer-events-none" />
        <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-emerald-400/20 rounded-full blur-md pointer-events-none" />

        {/* ── Cụm thông tin tài khoản chính ── */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-3.5 min-w-0">
            {/* Avatar tròn viền trắng nổi bật */}
            <div className="relative flex-shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-16 h-16 rounded-full border-2 border-white/95 bg-white/30 shadow-md object-cover"
              />
              {/* Chấm trực tuyến nhỏ */}
              <span className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-300 border-2 border-teal-700 rounded-full" />
            </div>

            {/* Tên và Danh hiệu */}
            <div className="min-w-0">
              <h2 className="text-base sm:text-lg font-extrabold text-white tracking-tight leading-tight truncate">
                {profile.name}
              </h2>

              {/* Badge danh hiệu nhỏ */}
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-[10.5px] font-semibold text-white mt-1 shadow-2xs">
                <Sparkles size={11} className="text-amber-300 flex-shrink-0" />
                <span className="truncate">{t("userTitle")}</span>
              </div>

              {/* Ngày tham gia */}
              <p className="text-[10px] text-emerald-100/90 mt-1 flex items-center gap-1 font-medium">
                <Calendar size={11} className="text-emerald-200" />
                <span>{t("joinedSince")} {profile.joinedDate}</span>
              </p>
            </div>
          </div>

          {/* Nút sửa nhanh hồ sơ chuyển sang /profile/edit */}
          <Link
            href="/profile/edit"
            className="w-9 h-9 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white flex items-center justify-center transition-all active:scale-90 shadow-2xs group flex-shrink-0"
            title="Chỉnh sửa hồ sơ"
            aria-label="Chỉnh sửa hồ sơ"
          >
            <Edit3 size={15} className="group-hover:rotate-12 transition-transform" />
          </Link>
        </div>

        {/* ── Thanh chỉ số 3 cột ngang màu trắng mờ ── */}
        <div className="relative z-10 bg-white/15 backdrop-blur-md rounded-2xl p-3 grid grid-cols-3 divide-x divide-white/20 mt-4 border border-white/20 text-center shadow-xs">
          {/* Cột 1: [350 Điểm] (icon Star) */}
          <button
            type="button"
            onClick={onViewRank}
            className="flex flex-col items-center justify-center px-1 active:scale-95 transition-transform cursor-pointer group"
          >
            <div className="flex items-center gap-1 text-amber-300 font-extrabold text-sm sm:text-base leading-none">
              <Star size={15} className="fill-amber-300 text-amber-300 group-hover:rotate-12 transition-transform" />
              <span>{profile.totalPoints}</span>
            </div>
            <span className="text-[10.5px] font-medium text-emerald-100 mt-1 leading-none">
              {t("points")}
            </span>
          </button>

          {/* Cột 2: [4 Huy hiệu] (icon Award) */}
          <div className="flex flex-col items-center justify-center px-1 active:scale-95 transition-transform cursor-pointer group">
            <div className="flex items-center gap-1 text-white font-extrabold text-sm sm:text-base leading-none">
              <Award size={15} className="text-sky-200 group-hover:scale-110 transition-transform" />
              <span>{profile.stats?.badgesEarned || 4}</span>
            </div>
            <span className="text-[10.5px] font-medium text-emerald-100 mt-1 leading-none">
              {t("badges")}
            </span>
          </div>

          {/* Cột 3: [Hạng Bạc] (icon Shield) */}
          <button
            type="button"
            onClick={onViewRank}
            className="flex flex-col items-center justify-center px-1 active:scale-95 transition-transform cursor-pointer group"
          >
            <div className="flex items-center gap-1 text-white font-extrabold text-sm sm:text-base leading-none">
              <Shield size={15} className="text-emerald-200 group-hover:scale-110 transition-transform" />
              <span>{t("silverTier")}</span>
            </div>
            <span className="text-[10.5px] font-medium text-emerald-100 mt-1 leading-none">
              {t("tier")}
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
