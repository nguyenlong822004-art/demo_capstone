"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  MapPin,
  Plus,
  Search,
  Filter,
  Edit3,
  Trash2,
  QrCode,
  Download,
  UploadCloud,
  CheckCircle2,
  Clock,
  Navigation,
  ExternalLink,
  X,
  AlertCircle,
  Copy,
  Check,
  Compass,
  FileText,
  Eye,
  Sparkles,
  Info,
  Layers,
  Ticket,
  DollarSign,
  ShieldCheck,
  Percent,
} from "lucide-react";

/**
 * Trang Quản Lý Điểm Đến Di Tích (Destination Management)
 * Dành cho Content Provider / Ban Quản Lý Điểm Đến
 */
export default function ProviderDestinationsPage() {
  const router = useRouter();

  // Dữ liệu mẫu (Mock data thuần Việt)
  const initialDestinations = [
    {
      id: "dest-01",
      code: "VM-KVC-01",
      name: "Khuê Văn Các",
      category: "Di tích lịch sử",
      region: "Hà Nội",
      address: "Văn Miếu - Quốc Tử Giám, Đống Đa, Hà Nội",
      lat: "21.028511",
      lng: "105.835520",
      geofenceRadius: 60, // mét
      status: "published", // 'published' | 'draft' | 'pending'
      image: "/image/vanmieu.png",
      checkins: 1840,
      description:
        "Khuê Văn Các là công trình biểu tượng của Thủ đô Hà Nội ngàn năm văn hiến. Được xây dựng năm 1805 dưới triều vua Gia Long, gác Khuê Văn mang hình dáng vuông vức tượng trưng cho đất, tầng trên có các cửa sổ tròn như ngôi sao Khuê tỏa sáng tượng trưng cho trời.",
      historyPeriod: "Triều Nguyễn (1805)",
      qrValue: "https://vietculture.vn/checkin?dest=VM-KVC-01",
      isPaid: true,
      price: 80000,
      includedServices: ["entry", "guide", "quiz"],
    },
    {
      id: "dest-02",
      code: "BT-LBC-02",
      name: "Lò Bầu Cổ Bát Tràng",
      category: "Làng nghề truyền thống",
      region: "Hà Nội",
      address: "Thôn Giang Cao, Bát Tràng, Gia Lâm, Hà Nội",
      lat: "20.978250",
      lng: "105.912640",
      geofenceRadius: 75,
      status: "published",
      image: "/image/battrang .png",
      checkins: 1210,
      description:
        "Lò Bầu cổ là lò gốm thủ công cổ xưa nhất còn sót lại tại làng gốm Bát Tràng. Lò gồm 5 bầu nung liên hoàn sử dụng củi, tái hiện quy trình nung gốm truyền thống có lịch sử hơn 700 năm của cha ông.",
      historyPeriod: "Thế kỷ XIX - Làng gốm 700 năm",
      qrValue: "https://vietculture.vn/checkin?dest=BT-LBC-02",
      isPaid: true,
      price: 30000,
      includedServices: ["entry"],
    },
    {
      id: "dest-03",
      code: "VM-BTS-03",
      name: "Giếng Thiên Quang & 82 Bia Tiến Sĩ",
      category: "Di tích lịch sử",
      region: "Hà Nội",
      address: "Khu vườn bia thứ 3, Văn Miếu, Hà Nội",
      lat: "21.028820",
      lng: "105.835840",
      geofenceRadius: 50,
      status: "published",
      image: "/image/thanglong.png",
      checkins: 1950,
      description:
        "Di sản tư liệu thế giới được UNESCO ghi danh. 82 tấm bia tiến sĩ đặt trên lưng rùa đá ghi danh 1.307 nhà trí thức đỗ đạt các khoa thi từ năm 1442 đến 1779.",
      historyPeriod: "Triều Lê - Mạc (1442 - 1779)",
      qrValue: "https://vietculture.vn/checkin?dest=VM-BTS-03",
      isPaid: true,
      price: 50000,
      includedServices: ["entry", "guide"],
    },
    {
      id: "dest-04",
      code: "BT-GSU-04",
      name: "Bảo Tàng Gốm Sứ Bát Tràng",
      category: "Bảo tàng",
      region: "Hà Nội",
      address: "Số 28, thôn 5, Bát Tràng, Gia Lâm, Hà Nội",
      lat: "20.976520",
      lng: "105.914210",
      geofenceRadius: 80,
      status: "draft",
      image: "/image/gomsu.png",
      checkins: 540,
      description:
        "Công trình kiến trúc 7 cánh xoắn ốc khổng lồ mô phỏng bàn xoay vuốt gốm truyền thống, nơi trưng bày hơn 1.000 cổ vật gốm sứ tinh xảo qua các triều đại Lý, Trần, Lê.",
      historyPeriod: "Hiện đại & Tinh hoa cổ vật",
      qrValue: "https://vietculture.vn/checkin?dest=BT-GSU-04",
      isPaid: true,
      price: 120000,
      includedServices: ["entry", "guide", "quiz"],
    },
    {
      id: "dest-05",
      code: "NB-DTH-05",
      name: "Đền Vua Đinh Tiên Hoàng",
      category: "Danh thắng",
      region: "Ninh Bình",
      address: "Khu di tích Cố đô Hoa Lư, Trường Yên, Hoa Lư, Ninh Bình",
      lat: "20.285430",
      lng: "105.906750",
      geofenceRadius: 100,
      status: "published",
      image: "/image/trangan.png",
      checkins: 2180,
      description:
        "Đền thờ Đinh Bộ Lĩnh - vị hoàng đế dẹp loạn 12 sứ quân dựng nên nước Đại Cồ Việt độc lập, tọa lạc giữa thung lũng đá vôi kỳ vĩ của Cố đô Hoa Lư.",
      historyPeriod: "Thế kỷ X - Nhà Đinh",
      qrValue: "https://vietculture.vn/checkin?dest=NB-DTH-05",
      isPaid: true,
      price: 50000,
      includedServices: ["entry"],
    },
  ];

  // State danh sách điểm đến
  const [destinations, setDestinations] = useState(initialDestinations);

  // Đọc dữ liệu đã tạo từ localStorage nếu có
  useEffect(() => {
    try {
      const saved = localStorage.getItem("vietculture_destinations");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const existingIds = new Set(parsed.map((p) => p.id));
          const unaddedDefaults = initialDestinations.filter((d) => !existingIds.has(d.id));
          setDestinations([...parsed, ...unaddedDefaults]);
        }
      }
    } catch (e) {
      console.error("Lỗi đọc dữ liệu điểm đến:", e);
    }
  }, []);

  // State bộ lọc và tìm kiếm
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  // State Modals
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [activeQRDestination, setActiveQRDestination] = useState(null);
  const [isCopied, setIsCopied] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Dữ liệu Form Thêm / Sửa Điểm đến
  const emptyForm = {
    id: "",
    code: "",
    name: "",
    category: "Di tích lịch sử",
    region: "Hà Nội",
    address: "",
    lat: "21.028511",
    lng: "105.835520",
    geofenceRadius: 60,
    status: "published",
    image: "/image/vanmieu.png",
    description: "",
    historyPeriod: "",
    isPaid: true,
    price: 80000,
    includedServices: ["entry", "guide", "quiz"],
  };

  const [formData, setFormData] = useState(emptyForm);
  const [isEditing, setIsEditing] = useState(false);

  // Hiển thị toast thông báo
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
  };

  // Mở modal Thêm mới
  const handleOpenAddModal = () => {
    const randomCode = `DI-SAN-${Math.floor(1000 + Math.random() * 9000)}`;
    setFormData({
      ...emptyForm,
      id: `dest-${Date.now()}`,
      code: randomCode,
    });
    setIsEditing(false);
    setIsFormModalOpen(true);
  };

  // Mở modal Sửa
  const handleOpenEditModal = (item) => {
    setFormData({ ...item });
    setIsEditing(true);
    setIsFormModalOpen(true);
  };

  // Mở modal xem mã QR
  const handleOpenQRModal = (item) => {
    setActiveQRDestination(item);
    setIsQRModalOpen(true);
  };

  // Xóa điểm đến
  const handleDeleteDestination = (id, name) => {
    if (confirm(`Bạn có chắc chắn muốn xóa điểm đến "${name}" khỏi hệ thống?`)) {
      setDestinations((prev) => prev.filter((item) => item.id !== id));
      showToast(`Đã xóa điểm đến "${name}".`);
    }
  };

  // Cập nhật input Form
  const handleFormChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  // Cập nhật giá vé có định dạng
  const handlePriceChange = (e) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    const numericValue = rawValue ? parseInt(rawValue, 10) : 0;
    setFormData((prev) => ({
      ...prev,
      price: numericValue,
    }));
  };

  // Toggle dịch vụ bao gồm trong vé
  const handleToggleService = (serviceKey) => {
    setFormData((prev) => {
      const current = prev.includedServices || [];
      const updated = current.includes(serviceKey)
        ? current.filter((s) => s !== serviceKey)
        : [...current, serviceKey];
      return { ...prev, includedServices: updated };
    });
  };

  // Toggle loại hình vé: miễn phí vs có thu phí
  const handleSetPaidMode = (isPaid) => {
    setFormData((prev) => ({
      ...prev,
      isPaid,
      price: isPaid ? (prev.price && prev.price > 0 ? prev.price : 80000) : 0,
    }));
  };

  // Tự động lấy tọa độ GPS giả lập
  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setFormData((prev) => ({
            ...prev,
            lat: pos.coords.latitude.toFixed(6),
            lng: pos.coords.longitude.toFixed(6),
          }));
          showToast("Đã cập nhật tọa độ GPS hiện tại thành công!");
        },
        () => {
          // Fallback tọa độ Văn Miếu
          setFormData((prev) => ({
            ...prev,
            lat: "21.028511",
            lng: "105.835520",
          }));
          showToast("Sử dụng tọa độ mặc định của Văn Miếu - Hà Nội.");
        }
      );
    }
  };

  // Submit Form Lưu / Thêm
  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Vui lòng nhập tên điểm đến.");
      return;
    }

    if (isEditing) {
      setDestinations((prev) =>
        prev.map((item) => (item.id === formData.id ? { ...formData } : item))
      );
      showToast(`Cập nhật điểm đến "${formData.name}" thành công!`);
    } else {
      const newItem = {
        ...formData,
        id: `dest-${Date.now()}`,
        checkins: 0,
        qrValue: `https://vietculture.vn/checkin?dest=${formData.code}`,
      };
      setDestinations((prev) => [newItem, ...prev]);
      showToast(`Đã thêm mới điểm đến "${formData.name}"!`);
    }

    setIsFormModalOpen(false);
  };

  // Copy link QR
  const handleCopyQRLink = (text) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  // Lọc danh sách điểm đến
  const filteredDestinations = destinations.filter((dest) => {
    const matchesSearch =
      dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dest.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dest.region.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || dest.category === selectedCategory;

    const matchesStatus =
      selectedStatus === "all" || dest.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* ── Thông báo Toast ── */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-700 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs sm:text-sm font-semibold animate-in fade-in slide-in-from-top-4 border border-emerald-500/50">
          <Sparkles size={16} className="text-amber-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════
          TOP BAR: TIÊU ĐỀ & NÚT THÊM MỚI
      ══════════════════════════════════════════════════════════ */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-5 bg-emerald-600 rounded-full" />
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Quản lý Điểm đến Di tích & Văn hóa
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Thiết lập tọa độ GPS thực địa, mã QR check-in vật lý và tư liệu số hóa di sản.
          </p>
        </div>

        <button
          type="button"
          onClick={() => router.push("/provider/destinations/create")}
          className="bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-sm shadow-emerald-600/25 text-xs sm:text-sm transition-all cursor-pointer self-start sm:self-auto"
        >
          <Plus size={18} strokeWidth={2.4} />
          <span>Thêm Điểm đến mới</span>
        </button>
      </div>

      {/* ══════════════════════════════════════════════════════════
          BỘ LỌC & TÌM KIẾM
      ══════════════════════════════════════════════════════════ */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center gap-3">
        {/* Tìm kiếm */}
        <div className="relative w-full md:flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm theo tên di tích, mã điểm đến (VM-KVC-01), khu vực..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
          />
        </div>

        {/* Lọc thể loại */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full md:w-auto px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          >
            <option value="all">Tất cả Thể loại</option>
            <option value="Di tích lịch sử">Di tích lịch sử</option>
            <option value="Làng nghề truyền thống">Làng nghề truyền thống</option>
            <option value="Bảo tàng">Bảo tàng</option>
            <option value="Danh thắng">Danh thắng</option>
          </select>

          {/* Lọc trạng thái */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full md:w-auto px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          >
            <option value="all">Tất cả Trạng thái</option>
            <option value="published">Đã duyệt (Công khai)</option>
            <option value="draft">Bản nháp</option>
          </select>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          BẢNG DỮ LIỆU ĐIỂM ĐẾN (DESTINATION TABLE)
      ══════════════════════════════════════════════════════════ */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/75 border-b border-slate-200 text-[11px] font-bold uppercase text-slate-500 tracking-wider">
                <th className="py-3.5 px-4">Ảnh & Điểm đến</th>
                <th className="py-3.5 px-4">Khu vực</th>
                <th className="py-3.5 px-4">Thể loại</th>
                <th className="py-3.5 px-4">Loại hình & Giá vé</th>
                <th className="py-3.5 px-4">Tọa độ GPS & Bán kính</th>
                <th className="py-3.5 px-4">Trạng thái</th>
                <th className="py-3.5 px-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredDestinations.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    <p className="text-sm font-semibold">Không tìm thấy điểm đến phù hợp.</p>
                    <p className="text-xs mt-1">Hãy thử tìm kiếm với từ khóa khác.</p>
                  </td>
                </tr>
              ) : (
                filteredDestinations.map((dest) => (
                  <tr key={dest.id} className="hover:bg-slate-50/70 transition-colors group">
                    {/* Cột 1: Ảnh & Tên Điểm Đến */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={dest.image}
                          alt={dest.name}
                          className="w-12 h-12 rounded-xl object-cover border border-slate-200 shadow-2xs flex-shrink-0"
                          onError={(e) => {
                            e.currentTarget.src = "/image/vanmieu.png";
                          }}
                        />
                        <div>
                          <p className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-emerald-700 transition-colors">
                            {dest.name}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="font-mono text-[10.5px] font-bold text-slate-400">
                              {dest.code}
                            </span>
                            <span className="text-slate-300">•</span>
                            <span className="text-[11px] text-emerald-700 font-semibold">
                              {dest.checkins.toLocaleString()} check-in
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Cột 2: Khu vực */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5 font-semibold text-slate-700">
                        <MapPin size={13} className="text-emerald-600 flex-shrink-0" />
                        <span>{dest.region}</span>
                      </div>
                    </td>

                    {/* Cột 3: Thể loại */}
                    <td className="py-3.5 px-4">
                      <span className="inline-block px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                        {dest.category}
                      </span>
                    </td>

                    {/* Cột: Loại hình & Giá vé */}
                    <td className="py-3.5 px-4">
                      <div>
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                          <Ticket size={11} className="text-rose-500" />
                          <span>{(dest.price || 50000).toLocaleString("vi-VN")} đ</span>
                        </span>
                        <p className="text-[10px] text-slate-400 mt-0.5 font-medium">
                          {dest.includedServices?.length || 1} dịch vụ đi kèm
                        </p>
                      </div>
                    </td>

                    {/* Cột 4: Tọa độ GPS & Bán kính kích hoạt */}
                    <td className="py-3.5 px-4">
                      <div className="font-mono text-[11px] font-semibold text-slate-700">
                        {dest.lat}° N, {dest.lng}° E
                      </div>
                      <div className="inline-flex items-center gap-1 text-[10px] text-sky-700 font-bold bg-sky-50 border border-sky-200 px-2 py-0.5 rounded-md mt-0.5">
                        <Navigation size={10} className="text-sky-600" />
                        <span>Bán kính check-in: {dest.geofenceRadius}m</span>
                      </div>
                    </td>

                    {/* Cột 5: Trạng thái */}
                    <td className="py-3.5 px-4">
                      {dest.status === "published" ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle2 size={12} />
                          <span>Đã duyệt</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-600 border border-slate-200">
                          <Clock size={12} />
                          <span>Bản nháp</span>
                        </span>
                      )}
                    </td>

                    {/* Cột 6: Nút Thao Tác (Xem QR, Sửa, Xóa) */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Nút Xem mã QR */}
                        <button
                          type="button"
                          onClick={() => handleOpenQRModal(dest)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 transition-colors cursor-pointer"
                          title="Xem & Tải mã QR in dán tại hiện vật"
                        >
                          <QrCode size={16} />
                        </button>

                        {/* Nút Chỉnh sửa */}
                        <button
                          type="button"
                          onClick={() => handleOpenEditModal(dest)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-sky-700 hover:bg-sky-50 transition-colors cursor-pointer"
                          title="Chỉnh sửa thông tin"
                        >
                          <Edit3 size={16} />
                        </button>

                        {/* Nút Xóa */}
                        <button
                          type="button"
                          onClick={() => handleDeleteDestination(dest.id, dest.name)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                          title="Xóa điểm đến"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          FORM MODAL: THÊM / CHỈNH SỬA ĐIỂM ĐẾN VĂN HÓA
      ══════════════════════════════════════════════════════════ */}
      {isFormModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
          onClick={() => setIsFormModalOpen(false)}
        >
          <div
            className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden relative my-8 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Modal */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2">
                <span className="w-2 h-4 bg-emerald-600 rounded-full" />
                <h3 className="text-base font-extrabold text-slate-900">
                  {isEditing ? "Chỉnh sửa Điểm đến Di tích" : "Thêm mới Điểm đến Văn hóa"}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsFormModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Form Fields */}
            <form onSubmit={handleFormSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              {/* Tên & Mã Điểm Đến */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Tên địa danh / Di tích lịch sử <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    placeholder="Ví dụ: Khuê Văn Các, Lò Bầu Cổ Bát Tràng..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Mã định danh (ID)
                  </label>
                  <input
                    type="text"
                    name="code"
                    value={formData.code}
                    onChange={handleFormChange}
                    className="w-full px-3.5 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-700"
                    readOnly
                  />
                </div>
              </div>

              {/* Thể loại & Khu vực */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Thể loại di sản
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  >
                    <option value="Di tích lịch sử">Di tích lịch sử</option>
                    <option value="Làng nghề truyền thống">Làng nghề truyền thống</option>
                    <option value="Bảo tàng">Bảo tàng</option>
                    <option value="Danh thắng">Danh thắng</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Khu vực / Tỉnh thành
                  </label>
                  <input
                    type="text"
                    name="region"
                    value={formData.region}
                    onChange={handleFormChange}
                    placeholder="Hà Nội, Ninh Bình, Huế..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>
              </div>

              {/* Địa chỉ chi tiết */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Địa chỉ thực địa chi tiết
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleFormChange}
                  placeholder="Ví dụ: Phố Quốc Tử Giám, P. Văn Miếu, Đống Đa, Hà Nội"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              {/* ── CẤU HÌNH VỊ TRÍ THỰC ĐỊA (GEOSPATIAL COORDINATES - RẤT QUAN TRỌNG) ── */}
              <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200/80 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Navigation size={16} className="text-emerald-700" />
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-950">
                      Cấu hình Tọa độ Thực địa GPS & Bán kính Geofence
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleGetCurrentLocation}
                    className="text-[11px] font-bold text-emerald-700 bg-white border border-emerald-300 hover:bg-emerald-100/70 px-2.5 py-1 rounded-lg flex items-center gap-1 transition-colors cursor-pointer shadow-2xs"
                  >
                    <Navigation size={11} />
                    <span>Lấy GPS hiện tại</span>
                  </button>
                </div>

                <p className="text-[11px] text-emerald-800 leading-relaxed">
                  Thiết lập tọa độ chính xác để định vị trạm dừng chân trên bản đồ số và bán kính kích hoạt check-in tự động cho du khách.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Vĩ độ (Latitude)
                    </label>
                    <input
                      type="text"
                      name="lat"
                      value={formData.lat}
                      onChange={handleFormChange}
                      placeholder="21.028511"
                      className="w-full px-3 py-2 bg-white border border-emerald-300 rounded-xl text-xs font-mono font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Kinh độ (Longitude)
                    </label>
                    <input
                      type="text"
                      name="lng"
                      value={formData.lng}
                      onChange={handleFormChange}
                      placeholder="105.835520"
                      className="w-full px-3 py-2 bg-white border border-emerald-300 rounded-xl text-xs font-mono font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Bán kính Geofence (Mét)
                    </label>
                    <input
                      type="number"
                      name="geofenceRadius"
                      value={formData.geofenceRadius}
                      onChange={handleFormChange}
                      min={20}
                      max={300}
                      className="w-full px-3 py-2 bg-white border border-emerald-300 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              </div>

              {/* Soạn thảo câu chuyện di sản & tư liệu lịch sử */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Câu chuyện di sản & Tư liệu lịch sử
                </label>
                <textarea
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleFormChange}
                  placeholder="Mô tả giá trị lịch sử, kiến trúc, văn hóa nghệ thuật, nhân vật phụng thờ hoặc truyền tích dân gian..."
                  className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 leading-relaxed"
                />
              </div>

              {/* Khung tải lên hình ảnh / video tư liệu (Drag & Drop placeholder) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Hình ảnh / Video tư liệu di tích
                </label>
                <div className="border-2 border-dashed border-slate-200 hover:border-emerald-500 bg-slate-50/70 hover:bg-emerald-50/20 rounded-2xl p-5 text-center transition-colors cursor-pointer group">
                  <UploadCloud size={32} className="mx-auto text-slate-400 group-hover:text-emerald-600 transition-colors" />
                  <p className="mt-2 text-xs font-bold text-slate-700">
                    Kéo thả ảnh di tích hoặc bấm để chọn tệp tải lên
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Hỗ trợ định dạng JPG, PNG, WEBP hoặc video MP4 (tối đa 25MB)
                  </p>
                </div>
              </div>

              {/* Trạng thái xuất bản */}
              <div className="flex items-center gap-4 pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
                  <input
                    type="radio"
                    name="status"
                    value="published"
                    checked={formData.status === "published"}
                    onChange={handleFormChange}
                    className="text-emerald-600 focus:ring-emerald-500"
                  />
                  <span>Xuất bản ngay (Công khai cho du khách)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
                  <input
                    type="radio"
                    name="status"
                    value="draft"
                    checked={formData.status === "draft"}
                    onChange={handleFormChange}
                    className="text-slate-600 focus:ring-slate-500"
                  />
                  <span>Lưu bản nháp (Chưa công khai)</span>
                </label>
              </div>

              {/* ══════════════════════════════════════════════════════════
                  KHỐI THIẾT LẬP GIÁ & VÉ TRẢI NGHIỆM (PRICING & TICKET SETTING)
              ══════════════════════════════════════════════════════════ */}
              <div className="pt-3 border-t border-slate-200/80 space-y-3.5">
                {/* Tiêu đề khối */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-500">
                      <Ticket size={16} />
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-slate-900 tracking-wide uppercase">
                        CẤU HÌNH CHI PHÍ & VÉ THAM QUAN
                      </h4>
                      <p className="text-[10.5px] text-slate-500">
                        Thiết lập trải nghiệm miễn phí hoặc vé có thu phí đồng bộ Mobile VNPay/MoMo
                      </p>
                    </div>
                  </div>

                  {/* Badge trạng thái */}
                  <span className="text-[10.5px] font-bold px-2 py-0.5 rounded-full border bg-emerald-50 text-emerald-700 border-emerald-200">
                    Bán vé số hóa (Có thu phí)
                  </span>
                </div>

                {/* Các trường nhập liệu chi tiết vé */}
                <div className="p-4 bg-slate-50/70 border border-slate-200 rounded-2xl space-y-4 animate-in fade-in-50 duration-200">
                    {/* Giá niêm yết cho khách */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-xs font-bold text-slate-700">
                          Giá niêm yết cho khách (VNĐ) <span className="text-rose-500">*</span>
                        </label>
                        <span className="text-[10.5px] text-slate-500">Đã bao gồm thuế GTGT</span>
                      </div>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-rose-500 font-bold text-xs">
                          <DollarSign size={14} />
                        </div>
                        <input
                          type="text"
                          inputMode="numeric"
                          value={formData.price ? formData.price.toLocaleString("vi-VN") : ""}
                          onChange={handlePriceChange}
                          placeholder="80.000"
                          className="w-full pl-8 pr-12 py-2.5 bg-white border border-rose-200 focus:border-rose-400 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-xs font-bold text-slate-400">
                          VNĐ
                        </div>
                      </div>
                    </div>

                    {/* Bảng tính minh bạch doanh thu tự động (Revenue Breakdown Card) */}
                    {formData.price > 0 && (
                      <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs space-y-1.5 shadow-2xs">
                        <div className="flex items-center justify-between text-slate-600">
                          <span>Giá khách du lịch trả:</span>
                          <span className="font-semibold text-slate-800">
                            {(formData.price || 0).toLocaleString("vi-VN")} đ
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-rose-600">
                          <span className="flex items-center gap-1">
                            <span>Phí vận hành sàn vietculture (10%):</span>
                          </span>
                          <span className="font-semibold">
                            -{Math.round((formData.price || 0) * 0.1).toLocaleString("vi-VN")} đ
                          </span>
                        </div>
                        <div className="pt-1.5 border-t border-slate-200 flex items-center justify-between">
                          <span className="font-bold text-slate-800">Số tiền Provider thực nhận:</span>
                          <span className="text-emerald-600 font-black text-sm">
                            ={Math.round((formData.price || 0) * 0.9).toLocaleString("vi-VN")} đ
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Chính sách vé đính kèm (Checkboxes quyền lợi du khách) */}
                    <div>
                      <label className="block text-[11px] font-bold uppercase text-slate-600 tracking-wider mb-2">
                        Chính sách vé đính kèm (Quyền lợi du khách)
                      </label>
                      <div className="space-y-2">
                        <label className="flex items-start gap-2.5 p-2.5 bg-white rounded-xl border border-slate-200 hover:border-slate-300 cursor-pointer transition-colors">
                          <input
                            type="checkbox"
                            checked={formData.includedServices?.includes("entry")}
                            onChange={() => handleToggleService("entry")}
                            className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                          />
                          <div className="text-xs">
                            <p className="font-bold text-slate-800">Bao gồm vé vào cổng di tích</p>
                            <p className="text-[11px] text-slate-500">Khách xuất trình QR tại quầy vé điện tử để quét qua cổng barrier.</p>
                          </div>
                        </label>

                        <label className="flex items-start gap-2.5 p-2.5 bg-white rounded-xl border border-slate-200 hover:border-slate-300 cursor-pointer transition-colors">
                          <input
                            type="checkbox"
                            checked={formData.includedServices?.includes("guide")}
                            onChange={() => handleToggleService("guide")}
                            className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                          />
                          <div className="text-xs">
                            <p className="font-bold text-slate-800">Bao gồm hướng dẫn viên số / AI Virtual Guide</p>
                            <p className="text-[11px] text-slate-500">Tự động thuyết minh audio đa ngôn ngữ qua vị trí GPS.</p>
                          </div>
                        </label>

                        <label className="flex items-start gap-2.5 p-2.5 bg-white rounded-xl border border-slate-200 hover:border-slate-300 cursor-pointer transition-colors">
                          <input
                            type="checkbox"
                            checked={formData.includedServices?.includes("quiz")}
                            onChange={() => handleToggleService("quiz")}
                            className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                          />
                          <div className="text-xs">
                            <p className="font-bold text-slate-800">Cho phép tham gia giải đố nhận huy hiệu Gamification</p>
                            <p className="text-[11px] text-slate-500">Mở khóa thử thách chụp ảnh AI và câu hỏi đố lịch sử tại trạm.</p>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
              </div>

              {/* Footer Buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsFormModalOpen(false)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors shadow-sm shadow-emerald-600/25 cursor-pointer"
                >
                  {isEditing ? "Lưu thay đổi" : "Lưu / Gửi duyệt hồ sơ"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════
          MODAL XEM & TẢI MÃ QR VẬT LÝ DÁN TẠI HIỆN VẬT
      ══════════════════════════════════════════════════════════ */}
      {isQRModalOpen && activeQRDestination && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setIsQRModalOpen(false)}
        >
          <div
            className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 text-center relative animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsQRModalOpen(false)}
              className="absolute top-4 right-4 w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X size={15} />
            </button>

            {/* Badge nhận diện */}
            <span className="inline-block px-3 py-1 rounded-full text-[10.5px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 mb-2">
              Mã QR Vật Lý Check-in
            </span>

            <h3 className="text-base font-black text-slate-900 leading-tight">
              {activeQRDestination.name}
            </h3>
            <p className="text-xs font-mono font-bold text-slate-400 mt-0.5">
              Mã: {activeQRDestination.code}
            </p>

            {/* Khung Mã QR Vật lý */}
            <div className="my-5 p-4 bg-white rounded-2xl border-2 border-slate-200 shadow-md inline-block relative group">
              {/* SVG QR Code mô phỏng sắc nét */}
              <svg viewBox="0 0 100 100" className="w-48 h-48 mx-auto">
                <rect width="100" height="100" fill="#ffffff" />
                {/* 3 mắt góc định vị */}
                <rect x="5" y="5" width="26" height="26" fill="#064e3b" rx="4" />
                <rect x="9" y="9" width="18" height="18" fill="#ffffff" rx="2" />
                <rect x="13" y="13" width="10" height="10" fill="#064e3b" rx="2" />

                <rect x="69" y="5" width="26" height="26" fill="#064e3b" rx="4" />
                <rect x="73" y="9" width="18" height="18" fill="#ffffff" rx="2" />
                <rect x="77" y="13" width="10" height="10" fill="#064e3b" rx="2" />

                <rect x="5" y="69" width="26" height="26" fill="#064e3b" rx="4" />
                <rect x="9" y="73" width="18" height="18" fill="#ffffff" rx="2" />
                <rect x="13" y="77" width="10" height="10" fill="#064e3b" rx="2" />

                {/* Các chấm ma trận */}
                <rect x="36" y="8" width="8" height="8" fill="#065f46" rx="1" />
                <rect x="48" y="12" width="6" height="6" fill="#065f46" rx="1" />
                <rect x="58" y="8" width="6" height="6" fill="#065f46" rx="1" />
                <rect x="38" y="24" width="16" height="6" fill="#065f46" rx="1" />
                <rect x="58" y="20" width="6" height="10" fill="#065f46" rx="1" />

                <rect x="10" y="38" width="12" height="6" fill="#065f46" rx="1" />
                <rect x="26" y="42" width="8" height="8" fill="#065f46" rx="1" />
                <rect x="38" y="36" width="24" height="24" fill="#0288D1" rx="4" />
                <rect x="42" y="40" width="16" height="16" fill="#ffffff" rx="2" />
                {/* Logo búp sen ở tâm */}
                <circle cx="50" cy="50" r="5" fill="#00A86B" />

                <rect x="68" y="38" width="10" height="6" fill="#065f46" rx="1" />
                <rect x="82" y="42" width="8" height="8" fill="#065f46" rx="1" />

                <rect x="36" y="68" width="12" height="6" fill="#065f46" rx="1" />
                <rect x="52" y="72" width="8" height="10" fill="#065f46" rx="1" />
                <rect x="68" y="68" width="24" height="6" fill="#065f46" rx="1" />
                <rect x="74" y="80" width="16" height="10" fill="#065f46" rx="1" />
              </svg>
            </div>

            <p className="text-[11px] text-slate-500 leading-snug">
              In mã QR này trên chất liệu mica hoặc kim loại chống nước để gắn tại bia di tích cho du khách quét check-in.
            </p>

            {/* Link check-in & Nút Copy */}
            <div className="mt-3 p-2 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-2 text-[11px]">
              <span className="truncate font-mono text-slate-600">
                {activeQRDestination.qrValue}
              </span>
              <button
                type="button"
                onClick={() => handleCopyQRLink(activeQRDestination.qrValue)}
                className="p-1 rounded-md hover:bg-slate-200 text-slate-600 transition-colors flex-shrink-0"
                title="Sao chép liên kết"
              >
                {isCopied ? (
                  <Check size={14} className="text-emerald-600" />
                ) : (
                  <Copy size={14} />
                )}
              </button>
            </div>

            {/* Nút Tải về */}
            <div className="mt-4 grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() =>
                  showToast("Đã tải xuống file ảnh mã QR (PNG 1000x1000 sắc nét)!")
                }
                className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-colors cursor-pointer"
              >
                <Download size={14} />
                <span>Tải ảnh PNG</span>
              </button>
              <button
                type="button"
                onClick={() =>
                  showToast("Đã tải xuống bản vẽ thiết kế in ấn chuẩn Khổ A5 (PDF)!")
                }
                className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <FileText size={14} />
                <span>Bản in PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
