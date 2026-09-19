"use client";

import React from "react";
import { MapPin, Clock, Star, Sparkles } from "lucide-react";
import { recommendedRoutes as defaultRoutes } from "@/data/touristMockData";

/**
 * RecommendedRoutes
 * Danh sách lộ trình văn hóa do AI gợi ý dạng cuộn ngang
 * 
 * Props:
 * - routes: Array (mặc định lấy từ touristMockData.js)
 * - onSelectRoute: function(route) - Callback khi bấm vào một lộ trình
 */
export default function RecommendedRoutes({
  routes = defaultRoutes,
  onSelectRoute = () => {},
}) {
  // Ảnh chụp thực tế ưu tiên local trong public/image hoặc fallback Unsplash
  const imageMapping = {
    route_001: "/image/thanglong.png",
    route_002: "/image/gomsu.png",
    route_003: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80",
  };

  return (
    <section aria-label="Lộ trình văn hóa AI gợi ý" className="space-y-3">
      {/* ── Tiêu đề & Tag nhỏ 'Dành riêng cho bạn' ── */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-1 h-4 bg-sky-500 rounded-full flex-shrink-0" />
          <h2 className="text-xs font-bold text-slate-800 tracking-wider uppercase">
            LỘ TRÌNH VĂN HÓA AI GỢI Ý
          </h2>
        </div>
        <span className="text-[0.65rem] font-semibold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-200 flex items-center gap-1">
          <Sparkles size={11} className="text-sky-500" />
          Dành riêng cho bạn
        </span>
      </div>

      {/* ── Danh sách thẻ cuộn ngang ── */}
      <div className="flex overflow-x-auto gap-4 pb-2 scrollbar-hide -mx-4 px-4">
        {routes.map((route) => {
          const imgSrc = imageMapping[route.id] || route.coverImage;

          return (
            <article
              key={route.id}
              onClick={() => onSelectRoute(route)}
              className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden w-64 shrink-0 flex flex-col cursor-pointer hover:shadow-md active:scale-98 transition-all group"
            >
              {/* Ảnh bìa sắc nét kèm thời lượng */}
              <div className="relative h-36 w-full overflow-hidden bg-slate-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imgSrc}
                  alt={route.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    if (route.coverImage && e.currentTarget.src !== route.coverImage) {
                      e.currentTarget.src = route.coverImage;
                    }
                  }}
                />
                {/* Thời lượng */}
                <span className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-xs text-white text-[0.65rem] px-2 py-0.5 rounded-md flex items-center gap-1">
                  <Clock size={11} /> {route.duration}
                </span>

                {/* Đánh giá sao */}
                {route.rating && (
                  <span className="absolute top-2 right-2 bg-white/90 backdrop-blur-xs text-slate-800 text-[0.65rem] font-bold px-1.5 py-0.5 rounded-md flex items-center gap-0.5 shadow-xs">
                    <Star size={11} className="fill-amber-400 text-amber-400" />
                    {route.rating}
                  </span>
                )}
              </div>

              {/* Thông tin chi tiết */}
              <div className="p-3 flex-1 flex flex-col justify-between">
                <div>
                  {/* Địa danh */}
                  <div className="flex items-center gap-1 text-[0.7rem] text-slate-500 mb-1">
                    <MapPin size={12} className="text-slate-400 flex-shrink-0" />
                    <span>{route.location}</span>
                  </div>

                  {/* Tên lộ trình */}
                  <h3 className="text-xs font-bold text-slate-800 line-clamp-1 group-hover:text-sky-600 transition-colors">
                    {route.name}
                  </h3>
                </div>

                {/* Tags giá vé và điểm thưởng */}
                <div className="flex items-center justify-between pt-2.5 mt-2 border-t border-slate-100">
                  {/* Giá vé màu hồng đậm */}
                  <span className="text-xs font-bold text-rose-500">
                    {route.ticketPrice}
                  </span>

                  {/* Tag điểm thưởng +150 pts màu vàng cam */}
                  <span className="text-[0.68rem] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                    ⭐ {route.rewardPoints}
                  </span>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
