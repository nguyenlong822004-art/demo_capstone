"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, Send, Sparkles, User } from "lucide-react";
import CuteAIMascot from "./CuteAIMascot";

/**
 * AIGuideDrawer
 * Trợ lý ảo AI thuyết minh di sản văn hóa Việt Nam
 * 
 * Props:
 * - isOpen: boolean
 * - onClose: function()
 * - initialQuestion: string (tùy chọn)
 */
export default function AIGuideDrawer({
  isOpen = false,
  onClose = () => {},
  initialQuestion = "",
}) {
  const [messages, setMessages] = useState([
    {
      id: "msg_welcome",
      sender: "ai",
      text: "Xin chào! Tôi là Trợ lý Di sản Việt Nam. Bạn muốn tìm hiểu về kiến trúc, lịch sử hay câu chuyện dân gian của di tích nào?",
      time: "Vừa xong",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Quick Chips gợi ý câu hỏi nhanh
  const quickChips = [
    "Ý nghĩa Khuê Văn Các?",
    "Sự tích Rùa vàng?",
    "Giờ mở cửa Văn Miếu?",
    "Giá vé tham quan?",
  ];

  // Kho kiến thức AI giải đáp tự động
  const knowledgeBase = {
    "khe van cac":
      "Khuê Văn Các được xây dựng năm 1805 dưới triều vua Gia Long. 'Khuê' là ngôi sao sáng tượng trưng cho văn chương, khoa bảng và trí tuệ dân tộc. Kiến trúc dạng cổ lầu với mái ngói cong và cửa tròn giao hòa giữa Đất và Trời.",
    "rua vang":
      "Hình tượng Rùa cõng bia đá (Quy phụng bia) thể hiện ước vọng trường tồn muôn đời cho nền văn hiến và vinh danh những bậc hiền tài - vốn được coi là 'nguyên khí của quốc gia'.",
    "gio mo cua":
      "Văn Miếu – Quốc Tử Giám mở cửa đón khách từ 08:00 đến 17:00 hàng ngày (kể cả Thứ Bảy, Chủ Nhật và ngày lễ).",
    "gia ve":
      "Giá vé tham quan: Người lớn là 70.000 đ/lượt. Học sinh, sinh viên có thẻ và người cao tuổi được giảm 50% chỉ còn 35.000 đ. Trẻ em dưới 15 tuổi được miễn phí vé.",
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Nhận câu hỏi ban đầu nếu có
  useEffect(() => {
    if (isOpen && initialQuestion) {
      sendMessage(initialQuestion);
    }
  }, [isOpen, initialQuestion]);

  const sendMessage = (textToSend) => {
    const query = textToSend.trim();
    if (!query) return;

    // Thêm tin nhắn của User
    const userMsg = {
      id: `user_${Date.now()}`,
      sender: "user",
      text: query,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    // Xử lý phản hồi AI sau 900ms (giả lập suy nghĩ)
    setTimeout(() => {
      let aiResponseText =
        "Cảm ơn câu hỏi rất hay của bạn! Di tích này là di sản quốc gia đặc biệt, chứa đựng tinh hoa văn hóa truyền thống sâu sắc của người Việt.";

      const lowerQ = query.toLowerCase();
      if (lowerQ.includes("khuê văn") || lowerQ.includes("khe van")) {
        aiResponseText = knowledgeBase["khe van cac"];
      } else if (lowerQ.includes("rùa") || lowerQ.includes("rua")) {
        aiResponseText = knowledgeBase["rua vang"];
      } else if (lowerQ.includes("giờ") || lowerQ.includes("mở cửa")) {
        aiResponseText = knowledgeBase["gio mo cua"];
      } else if (lowerQ.includes("vé") || lowerQ.includes("giá")) {
        aiResponseText = knowledgeBase["gia ve"];
      }

      const aiMsg = {
        id: `ai_${Date.now()}`,
        sender: "ai",
        text: aiResponseText,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setIsTyping(false);
      setMessages((prev) => [...prev, aiMsg]);
    }, 900);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    sendMessage(inputText);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end justify-center transition-opacity animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-slate-50 rounded-t-3xl shadow-2xl border-t border-slate-200 flex flex-col h-[85vh] max-h-[750px] overflow-hidden animate-in slide-in-from-bottom duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Header Xanh Biển Mát Mắt với Mascot Chibi ── */}
        <div className="bg-sky-600 text-white p-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            {/* Avatar Mascot Chibi Nón Lá */}
            <div className="relative">
              <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center shadow-xs overflow-visible">
                <CuteAIMascot size="sm" withHat={true} isFloating={false} />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="text-sm font-bold">Bé AI Hướng Dẫn Viên</h2>
                <span className="bg-sky-500/90 text-white text-[0.6rem] px-1.5 py-0.2 rounded-sm font-semibold border border-sky-400/50">
                  VietCulture AI
                </span>
              </div>
              <p className="text-[0.68rem] text-sky-100 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                Trực tuyến sẵn sàng giải đáp 24/7
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Đóng khung chat"
          >
            <X size={18} />
          </button>
        </div>

        {/* ── Danh Sách Tin Nhắn Chat ── */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-end gap-2 ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.sender === "ai" && (
                <div className="w-8 h-8 rounded-xl bg-sky-100/90 text-sky-700 flex items-center justify-center text-sm flex-shrink-0 mb-1 border border-sky-200 shadow-2xs overflow-hidden">
                  <CuteAIMascot size="sm" withHat={false} isFloating={false} />
                </div>
              )}

              <div
                className={`max-w-[78%] p-3 text-xs leading-relaxed ${
                  msg.sender === "user"
                    ? "bg-sky-600 text-white rounded-2xl rounded-tr-xs shadow-xs"
                    : "bg-white text-slate-800 border border-slate-200 rounded-2xl rounded-tl-xs shadow-xs"
                }`}
              >
                <p className="whitespace-pre-line">{msg.text}</p>
                <span
                  className={`text-[0.6rem] block text-right mt-1 ${
                    msg.sender === "user" ? "text-sky-200" : "text-slate-400"
                  }`}
                >
                  {msg.time}
                </span>
              </div>

              {msg.sender === "user" && (
                <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-sm flex-shrink-0 mb-1">
                  <User size={15} />
                </div>
              )}
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-end gap-2 justify-start animate-in fade-in">
              <div className="w-7 h-7 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center text-sm flex-shrink-0 mb-1 border border-sky-200">
                <Bot size={15} />
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-xs p-3 shadow-xs">
                <div className="flex items-center gap-1.5 py-0.5">
                  <span className="w-2 h-2 rounded-full bg-sky-500 animate-bounce [animation-delay:0ms]" />
                  <span className="w-2 h-2 rounded-full bg-sky-500 animate-bounce [animation-delay:150ms]" />
                  <span className="w-2 h-2 rounded-full bg-sky-500 animate-bounce [animation-delay:300ms]" />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* ── Khối Gợi Ý Câu Hỏi Nhanh (Quick Chips) ── */}
        <div className="px-4 py-2 bg-white/80 border-t border-slate-200/80">
          <div className="flex items-center gap-1 text-[0.68rem] text-slate-500 mb-1.5 font-medium">
            <Sparkles size={12} className="text-amber-500" />
            <span>Gợi ý câu hỏi nhanh:</span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {quickChips.map((chip, index) => (
              <button
                key={index}
                type="button"
                onClick={() => sendMessage(chip)}
                className="bg-slate-100 hover:bg-sky-50 hover:border-sky-300 hover:text-sky-700 text-slate-700 text-[0.7rem] px-3 py-1.5 rounded-full border border-slate-200 whitespace-nowrap transition-all cursor-pointer active:scale-95 flex-shrink-0"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>

        {/* ── Ô Nhập Tin Nhắn ── */}
        <form
          onSubmit={handleFormSubmit}
          className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Hỏi AI về lịch sử di tích..."
            className="flex-1 bg-slate-100 border border-slate-200 focus:border-sky-500 focus:bg-white text-xs px-3.5 py-2.5 rounded-xl outline-none transition-all placeholder:text-slate-400 text-slate-800"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="w-10 h-10 rounded-xl bg-sky-600 hover:bg-sky-700 disabled:opacity-40 text-white flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95"
            aria-label="Gửi tin nhắn"
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
