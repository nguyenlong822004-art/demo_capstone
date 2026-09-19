"use client";

import React, { useState, useEffect } from "react";
import { X, Trophy, CheckCircle2, AlertCircle, BookMarked, Sparkles } from "lucide-react";

/**
 * MissionModal
 * Nhiệm vụ trắc nghiệm tương tác nhận điểm thưởng văn hóa
 * 
 * Props:
 * - isOpen: boolean
 * - onClose: function()
 * - onComplete: function(points)
 */
export default function MissionModal({
  isOpen = false,
  onClose = () => {},
  onComplete = () => {},
}) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Câu hỏi & 4 đáp án
  const question = "Bia Tiến sĩ tại Văn Miếu được đặt trang trọng trên lưng con vật nào?";
  const options = [
    { id: "A", text: "Con Voi", isCorrect: false },
    { id: "B", text: "Con Ngựa", isCorrect: false },
    { id: "C", text: "Con Rùa", isCorrect: true },
    { id: "D", text: "Con Hổ", isCorrect: false },
  ];

  // Reset khi mở modal
  useEffect(() => {
    if (isOpen) {
      setSelectedOption(null);
      setIsAnswered(false);
      setIsCorrect(false);
    }
  }, [isOpen]);

  const handleSelectOption = (option) => {
    setSelectedOption(option.id);
    setIsAnswered(true);

    if (option.isCorrect) {
      setIsCorrect(true);
      onComplete(100);
    } else {
      setIsCorrect(false);
    }
  };

  const handleSaveJournal = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 transition-opacity animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Header ── */}
        <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <Trophy size={18} />
            </span>
            <div>
              <h2 className="text-xs font-bold text-slate-800 leading-tight">
                Nhiệm vụ: Tìm hiểu Bia Tiến Sĩ
              </h2>
              <p className="text-[0.68rem] text-slate-500">Văn Miếu – Quốc Tử Giám</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="bg-amber-100 text-amber-700 font-bold px-2.5 py-1 rounded-full text-xs shadow-xs flex items-center gap-1">
              ⭐ +100 Điểm
            </span>
            <button
              type="button"
              onClick={onClose}
              className="w-7 h-7 rounded-full bg-white hover:bg-slate-200 text-slate-400 hover:text-slate-700 flex items-center justify-center transition-colors cursor-pointer border border-slate-200"
              aria-label="Đóng"
            >
              <X size={15} />
            </button>
          </div>
        </div>

        {/* ── Nội dung câu hỏi ── */}
        <div className="p-5 space-y-4">
          <div className="bg-sky-50 border border-sky-100 rounded-2xl p-4">
            <span className="text-[0.65rem] font-bold uppercase tracking-wider text-sky-700 bg-sky-100/80 px-2 py-0.5 rounded-full inline-block mb-1.5">
              Câu hỏi trắc nghiệm
            </span>
            <p className="text-sm font-bold text-slate-800 leading-relaxed">
              {question}
            </p>
          </div>

          {/* 4 đáp án */}
          <div className="space-y-2.5">
            {options.map((opt) => {
              const isSelected = selectedOption === opt.id;
              let btnStyle = "bg-white border-slate-200 text-slate-700 hover:border-sky-300 hover:bg-slate-50";

              if (isSelected) {
                if (opt.isCorrect) {
                  btnStyle = "bg-emerald-500 border-emerald-500 text-white font-bold shadow-md shadow-emerald-500/30";
                } else {
                  btnStyle = "bg-rose-50 border-rose-400 text-rose-700 font-bold animate-shake";
                }
              }

              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleSelectOption(opt)}
                  disabled={isCorrect}
                  className={`w-full p-3.5 rounded-2xl border-2 text-left text-xs font-semibold flex items-center justify-between transition-all cursor-pointer active:scale-98 ${btnStyle} ${
                    isCorrect && !isSelected ? "opacity-40" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-6 h-6 rounded-lg text-[0.7rem] font-bold flex items-center justify-center ${
                        isSelected && opt.isCorrect
                          ? "bg-white text-emerald-600"
                          : isSelected && !opt.isCorrect
                          ? "bg-rose-200 text-rose-800"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {opt.id}
                    </span>
                    <span>{opt.text}</span>
                  </div>

                  {isSelected && opt.isCorrect && (
                    <CheckCircle2 size={18} className="text-white" />
                  )}
                  {isSelected && !opt.isCorrect && (
                    <AlertCircle size={18} className="text-rose-500" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Thông báo kết quả */}
          {isAnswered && (
            <div className="pt-1">
              {isCorrect ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-center space-y-3 animate-in zoom-in-95">
                  <div className="flex items-center justify-center gap-1.5 text-emerald-800 font-bold text-xs">
                    <Sparkles size={16} className="text-emerald-600" />
                    <span>CHÍNH XÁC! BẠN ĐƯỢC CỘNG +100 ĐIỂM</span>
                  </div>
                  <p className="text-[0.72rem] text-emerald-700 leading-relaxed">
                    Con rùa trong văn hóa Việt Nam là biểu tượng của sự trường thọ, bền vững và lòng hiếu học ngàn năm văn hiến.
                  </p>

                  <button
                    type="button"
                    onClick={handleSaveJournal}
                    className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-md shadow-emerald-600/30 flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
                  >
                    <BookMarked size={16} />
                    <span>Lưu vào Nhật ký hành trình</span>
                  </button>
                </div>
              ) : (
                <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 flex items-center gap-2 text-rose-700 text-xs">
                  <AlertCircle size={16} className="flex-shrink-0 text-rose-500" />
                  <span>Chưa chính xác! Hãy quan sát kỹ lại bia đá và thử chọn lại nhé.</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
