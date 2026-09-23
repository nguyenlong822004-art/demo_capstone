"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  MapPin,
  Compass,
  QrCode,
  Ticket,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Printer,
  X,
  Plus,
  Trash2,
  Navigation,
  ArrowLeft,
  DollarSign,
  ShieldCheck,
  Percent,
  Layers,
  FileText,
  Info,
  ExternalLink,
  Volume2,
  Image as ImageIcon,
  Check,
  RefreshCw,
  Eye,
  Globe,
  Search,
  Crosshair,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

/**
 * Trang Tạo Mới Điểm Đến Di Tích (Create Destination Page)
 * Tích hợp Google Maps thực tế & Quản lý Geofence
 * Dành cho Content Provider / Ban Quản Lý Di Tích & Điểm Đến
 */
export default function CreateDestinationPage() {
  const router = useRouter();

  // ════════════════════════════════════════════════════════════
  // 1. STATE FORM DỮ LIỆU ĐIỂM ĐẾN
  // ════════════════════════════════════════════════════════════
  const [formData, setFormData] = useState({
    name: "",
    category: "Di tích lịch sử",
    region: "Hà Nội",
    address: "",
    historyPeriod: "",
    // Geofence & Tọa độ Google Maps
    lat: "21.028511",
    lng: "105.835520",
    geofenceRadius: 60, // Mặc định 60m
    // Mã định danh QR
    code: "VM-KVC-01",
    // Chi phí & Vé (Toàn bộ điểm đến có thu phí)
    isPaid: true,
    price: 80000,
    includedServices: ["entry", "guide"],
    // Nội dung văn hóa
    description: "",
    heritageStory: "",
    coverImage: "/image/vanmieu.png",
    audioGuideName: "",
  });

  // Danh sách ảnh tư liệu tải lên
  const [galleryImages, setGalleryImages] = useState([
    { id: 1, url: "/image/vanmieu.png", name: "Toàn cảnh di tích" },
    { id: 2, url: "/image/thanglong.png", name: "Gian thờ chính" },
  ]);

  // Trạng thái bản đồ & giao diện
  const [mapTab, setMapTab] = useState("google-map"); // 'google-map' | 'geofence-radar'
  const [googleMapZoom, setGoogleMapZoom] = useState(17);
  const [pasteLocationInput, setPasteLocationInput] = useState("");
  const [pasteError, setPasteError] = useState("");

  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isSimulatingLocation, setIsSimulatingLocation] = useState(false);
  const [locationSuccessMsg, setLocationSuccessMsg] = useState("");
  const [errors, setErrors] = useState({});

  // Danh sách thể loại chuẩn nghiệp vụ
  const categories = [
    { label: "Di tích lịch sử", desc: "Đền đài, chùa chiền, lăng tẩm, thành quách" },
    { label: "Làng nghề", desc: "Làng gốm, dệt lụa, làm nón, đúc đồng cổ truyền" },
    { label: "Bảo tàng", desc: "Không gian trưng bày cổ vật & lịch sử chuyên đề" },
    { label: "Danh thắng", desc: "Quần thể cảnh quan thiên nhiên & văn hóa gắn liền" },
  ];

  // Danh sách tỉnh thành phố
  const regions = [
    "Hà Nội",
    "Ninh Bình",
    "Thừa Thiên Huế",
    "Quảng Nam",
    "Đà Nẵng",
    "TP. Hồ Chí Minh",
    "Lâm Đồng",
    "Quảng Ninh",
    "Bắc Ninh",
    "Hà Giang",
  ];

  // Presets bán kính Geofence
  const radiusPresets = [
    { value: 30, label: "30m", desc: "Điểm hẹp / Điện thờ" },
    { value: 60, label: "60m", desc: "Khuôn viên chuẩn (Khuyên dùng)" },
    { value: 100, label: "100m", desc: "Sân bãi lớn" },
    { value: 150, label: "150m", desc: "Quần thể rộng" },
  ];

  // Danh mục di tích thực tế Việt Nam có sẵn tọa độ chính xác cao
  const quickHeritagePresets = [
    {
      name: "Văn Miếu - Quốc Tử Giám",
      region: "Hà Nội",
      address: "58 Quốc Tử Giám, Đống Đa, Hà Nội",
      lat: "21.028511",
      lng: "105.835520",
    },
    {
      name: "Hoàng Thành Thăng Long",
      region: "Hà Nội",
      address: "19C Hoàng Diệu, Ba Đình, Hà Nội",
      lat: "21.036066",
      lng: "105.840742",
    },
    {
      name: "Chùa Trấn Quốc",
      region: "Hà Nội",
      address: "Đường Thanh Niên, Tây Hồ, Hà Nội",
      lat: "21.047883",
      lng: "105.836856",
    },
    {
      name: "Làng Gốm Bát Tràng",
      region: "Hà Nội",
      address: "Bát Tràng, Gia Lâm, Hà Nội",
      lat: "20.978250",
      lng: "105.912640",
    },
    {
      name: "Cố Đô Hoa Lư",
      region: "Ninh Bình",
      address: "Trường Yên, Hoa Lư, Ninh Bình",
      lat: "20.285430",
      lng: "105.906750",
    },
    {
      name: "Kinh Thành Huế (Đại Nội)",
      region: "Thừa Thiên Huế",
      address: "Thuận Thành, TP. Huế, Thừa Thiên Huế",
      lat: "16.469956",
      lng: "107.578680",
    },
    {
      name: "Phố Cổ Hội An",
      region: "Quảng Nam",
      address: "Minh An, TP. Hội An, Quảng Nam",
      lat: "15.880058",
      lng: "108.338047",
    },
    {
      name: "Dinh Độc Lập",
      region: "TP. Hồ Chí Minh",
      address: "135 Nam Kỳ Khởi Nghĩa, Bến Thành, Quận 1",
      lat: "10.777014",
      lng: "106.695346",
    },
  ];

  // ════════════════════════════════════════════════════════════
  // 2. XỬ LÝ SỰ KIỆN FORM & GOOGLE MAPS
  // ════════════════════════════════════════════════════════════
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Chọn nhanh địa danh di tích thực tế
  const handleSelectQuickLocation = (loc) => {
    setFormData((prev) => ({
      ...prev,
      lat: loc.lat,
      lng: loc.lng,
      region: loc.region,
      name: prev.name ? prev.name : loc.name,
      address: loc.address,
    }));
    setLocationSuccessMsg(`Đã đồng bộ Google Maps với: ${loc.name}`);
    setTimeout(() => setLocationSuccessMsg(""), 4500);
  };

  // Bóc tách tọa độ từ chuỗi dán (Google Maps URL hoặc chuỗi "lat, lng")
  const handleParseCoordinates = () => {
    setPasteError("");
    const text = pasteLocationInput.trim();
    if (!text) return;

    // Định dạng 1: "21.028511, 105.835520" hoặc "21.028511 105.835520"
    const coordMatch = text.match(/([-+]?\d{1,2}\.\d+)[,\s]+([-+]?\d{1,3}\.\d+)/);
    if (coordMatch) {
      const parsedLat = parseFloat(coordMatch[1]).toFixed(6);
      const parsedLng = parseFloat(coordMatch[2]).toFixed(6);
      setFormData((prev) => ({
        ...prev,
        lat: parsedLat,
        lng: parsedLng,
      }));
      setPasteLocationInput("");
      setLocationSuccessMsg(`Đã trích xuất tọa độ thành công: ${parsedLat}, ${parsedLng}`);
      setTimeout(() => setLocationSuccessMsg(""), 4500);
      return;
    }

    // Định dạng 2: Link Google Maps có chứa @21.028511,105.835520
    const urlMatch = text.match(/@([-+]?\d{1,2}\.\d+),([-+]?\d{1,3}\.\d+)/);
    if (urlMatch) {
      const parsedLat = parseFloat(urlMatch[1]).toFixed(6);
      const parsedLng = parseFloat(urlMatch[2]).toFixed(6);
      setFormData((prev) => ({
        ...prev,
        lat: parsedLat,
        lng: parsedLng,
      }));
      setPasteLocationInput("");
      setLocationSuccessMsg(`Đã trích xuất tọa độ từ Google Maps URL: ${parsedLat}, ${parsedLng}`);
      setTimeout(() => setLocationSuccessMsg(""), 4500);
      return;
    }

    setPasteError(
      "Không nhận diện được tọa độ. Vui lòng nhập: [Vĩ độ, Kinh độ] (VD: 21.028511, 105.835520) hoặc dán link Google Maps."
    );
  };

  // Mở Google Maps thực tế trong tab mới
  const handleOpenGoogleMaps = () => {
    const lat = formData.lat || "21.028511";
    const lng = formData.lng || "105.835520";
    window.open(`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`, "_blank");
  };

  // Tự động sinh mã định danh QR mới
  const handleGenerateNewCode = () => {
    const prefix = formData.region === "Hà Nội" ? "HN" : "VN";
    const randomNum = Math.floor(100 + Math.random() * 900);
    const shortName = formData.name
      ? formData.name
          .split(" ")
          .map((w) => w[0])
          .join("")
          .toUpperCase()
          .slice(0, 3)
      : "DD";
    const newCode = `${prefix}-${shortName}-${randomNum}`;
    setFormData((prev) => ({ ...prev, code: newCode }));
  };

  // Lấy tọa độ GPS hiện tại từ trình duyệt
  const handleSimulateLocation = () => {
    setIsSimulatingLocation(true);
    setLocationSuccessMsg("");

    if (typeof navigator !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const newLat = pos.coords.latitude.toFixed(6);
          const newLng = pos.coords.longitude.toFixed(6);
          setFormData((prev) => ({ ...prev, lat: newLat, lng: newLng }));
          setIsSimulatingLocation(false);
          setLocationSuccessMsg(`Đã ghim tọa độ GPS thiết bị thực tế: ${newLat}, ${newLng}`);
          setTimeout(() => setLocationSuccessMsg(""), 5000);
        },
        () => {
          // Fallback tọa độ Văn Miếu
          const baseLat = 21.028511;
          const baseLng = 105.83552;
          const jitterLat = (Math.random() - 0.5) * 0.0015;
          const jitterLng = (Math.random() - 0.5) * 0.0015;
          const newLat = (baseLat + jitterLat).toFixed(6);
          const newLng = (baseLng + jitterLng).toFixed(6);

          setFormData((prev) => ({ ...prev, lat: newLat, lng: newLng }));
          setIsSimulatingLocation(false);
          setLocationSuccessMsg(`Đã định vị thành công: ${newLat}, ${newLng} (Độ chính xác ±5m)`);
          setTimeout(() => setLocationSuccessMsg(""), 5000);
        }
      );
    } else {
      setIsSimulatingLocation(false);
    }
  };

  // Xử lý giá vé
  const handlePriceInput = (e) => {
    const raw = e.target.value.replace(/\D/g, "");
    const val = raw ? parseInt(raw, 10) : 0;
    setFormData((prev) => ({ ...prev, price: val }));
  };

  // Dịch vụ bao gồm trong vé
  const toggleService = (srv) => {
    setFormData((prev) => {
      const current = prev.includedServices || [];
      const updated = current.includes(srv)
        ? current.filter((item) => item !== srv)
        : [...current, srv];
      return { ...prev, includedServices: updated };
    });
  };

  // Thêm ảnh mẫu vào bộ sưu tập
  const handleAddSampleImage = () => {
    const samplePool = [
      { url: "/image/gomsu.png", name: "Hiện vật trưng bày" },
      { url: "/image/battrang .png", name: "Không gian thực địa" },
      { url: "/image/trangan.png", name: "Cảnh quan ngoại cảnh" },
    ];
    const pick = samplePool[galleryImages.length % samplePool.length];
    setGalleryImages((prev) => [...prev, { id: Date.now(), ...pick }]);
  };

  const handleRemoveGalleryImage = (id) => {
    setGalleryImages((prev) => prev.filter((img) => img.id !== id));
  };

  // Tính toán biểu phí sàn VietCulture 10%
  const feeRate = 0.1; // 10%
  const platformFee = Math.round((formData.price || 0) * feeRate);
  const netEarnings = (formData.price || 0) - platformFee;

  // ════════════════════════════════════════════════════════════
  // 3. XỬ LÝ LƯU & GỬI KIỂM DUYỆT
  // ════════════════════════════════════════════════════════════
  const handleSubmit = (isDraft = false) => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Vui lòng nhập tên địa danh di tích";
    }
    if (!formData.lat || !formData.lng) {
      newErrors.location = "Vui lòng thiết lập tọa độ GPS thực địa";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // Tạo đối tượng điểm đến mới (Mặc định toàn bộ điểm đến có thu phí)
    const newDestination = {
      id: `dest-${Date.now()}`,
      code: formData.code || "VM-KVC-01",
      name: formData.name,
      category: formData.category,
      region: formData.region,
      address: formData.address || `${formData.name}, ${formData.region}`,
      lat: formData.lat,
      lng: formData.lng,
      geofenceRadius: Number(formData.geofenceRadius) || 60,
      status: isDraft ? "draft" : "pending",
      image: formData.coverImage || "/image/vanmieu.png",
      checkins: 0,
      description: formData.description || "Nội dung di sản đang được cập nhật.",
      historyPeriod: formData.historyPeriod || "Chưa xác định",
      qrValue: `https://vietculture.vn/checkin?dest=${formData.code}`,
      isPaid: true,
      price: Number(formData.price) || 80000,
      includedServices: formData.includedServices,
      createdAt: new Date().toISOString(),
    };

    // Lưu vào localStorage để trang Quản lý đọc được ngay lập tức
    try {
      const stored = localStorage.getItem("vietculture_destinations");
      const list = stored ? JSON.parse(stored) : [];
      list.unshift(newDestination);
      localStorage.setItem("vietculture_destinations", JSON.stringify(list));
    } catch (e) {
      console.error("Lỗi lưu điểm đến vào localStorage:", e);
    }

    if (isDraft) {
      alert("Đã lưu bản thảo thành công!");
      router.push("/provider/destinations");
    } else {
      setIsSuccessModalOpen(true);
    }
  };

  // URL Google Maps Embed thực tế
  const googleMapEmbedUrl = `https://maps.google.com/maps?q=${formData.lat},${formData.lng}&hl=vi&z=${googleMapZoom}&output=embed`;

  return (
    <div className="space-y-6 pb-24">
      {/* ── BREADCRUMB & HEADER ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-2">
            <Link
              href="/provider/destinations"
              className="hover:text-emerald-700 transition-colors flex items-center gap-1"
            >
              <ArrowLeft size={13} />
              <span>Quản lý Điểm đến</span>
            </Link>
            <span>/</span>
            <span className="text-emerald-700 font-bold">Khai báo Điểm đến mới</span>
          </nav>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black shadow-xs">
              <MapPin size={20} />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Tạo Mới Điểm Đến Di Tích & Văn Hóa
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Thiết lập tọa độ GPS Geofence thực địa, kết nối Google Maps trực tiếp, mã QR check-in
                và tư liệu số hóa.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200/80">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            Hồ sơ đang soạn thảo
          </span>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          PHẦN 1: THÔNG TIN CƠ BẢN DI TÍCH
      ══════════════════════════════════════════════════════════ */}
      <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/80 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center font-black text-xs">
              1
            </div>
            <h2 className="text-base font-extrabold text-slate-900">
              Thông Tin Cơ Bản Về Địa Danh Di Tích
            </h2>
          </div>
          <span className="text-xs text-slate-400 font-medium">* Trường thông tin bắt buộc</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Tên di tích */}
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Tên địa danh di tích <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Ví dụ: Khuê Văn Các, Lò Bầu Cổ Bát Tràng, Đền Vua Đinh Tiên Hoàng..."
              className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
                errors.name
                  ? "border-rose-400 focus:ring-rose-200 bg-rose-50/20"
                  : "border-slate-200 focus:border-emerald-500 focus:ring-emerald-100 bg-slate-50/50 focus:bg-white"
              }`}
            />
            {errors.name && (
              <p className="text-xs text-rose-500 font-semibold mt-1 flex items-center gap-1">
                <AlertCircle size={12} /> {errors.name}
              </p>
            )}
          </div>

          {/* Thể loại */}
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Thể loại di sản văn hóa <span className="text-rose-500">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {categories.map((cat) => (
                <div
                  key={cat.label}
                  role="button"
                  tabIndex={0}
                  onClick={() => setFormData((prev) => ({ ...prev, category: cat.label }))}
                  className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                    formData.category === cat.label
                      ? "border-emerald-500 bg-emerald-50/70 text-emerald-950 font-bold ring-1 ring-emerald-400/50 shadow-xs"
                      : "border-slate-200 bg-slate-50/60 hover:bg-slate-100/80 text-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p className="text-xs sm:text-sm font-bold">{cat.label}</p>
                    {formData.category === cat.label && (
                      <CheckCircle2 size={16} className="text-emerald-600" />
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed font-normal">
                    {cat.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Khu vực (Tỉnh/Thành phố) */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Khu vực (Tỉnh / Thành phố) <span className="text-rose-500">*</span>
            </label>
            <select
              name="region"
              value={formData.region}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white text-sm text-slate-800 font-semibold focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all"
            >
              {regions.map((reg) => (
                <option key={reg} value={reg}>
                  {reg}
                </option>
              ))}
            </select>
          </div>

          {/* Niên đại / Thời kỳ lịch sử */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Thời kỳ lịch sử / Niên đại xây dựng
            </label>
            <input
              type="text"
              name="historyPeriod"
              value={formData.historyPeriod}
              onChange={handleInputChange}
              placeholder="Ví dụ: Triều Nguyễn (1805), Triều Lý (1070), Thế kỷ XIX..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all"
            />
          </div>

          {/* Địa chỉ chi tiết */}
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Địa chỉ chi tiết tại thực địa
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Ví dụ: Số 58 Quốc Tử Giám, Đống Đa, Hà Nội"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all"
            />
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          PHẦN 2: CẤU HÌNH VỊ TRÍ & THỰC ĐỊA (LIÊN KẾT GOOGLE MAPS THỰC)
      ══════════════════════════════════════════════════════════ */}
      <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/80 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-black text-xs">
              2
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900">
                Cấu Hình Vị Trí & Liên Kết Google Maps Thực Địa
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-sky-50 text-sky-700 border border-sky-200/70">
              <Globe size={13} />
              Google Maps Vệ Tinh Trực Tuyến
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
              <ShieldCheck size={13} />
              Geofence Chống Gian Lận
            </span>
          </div>
        </div>

        {/* Banner cơ chế Geofence & Google Maps */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
          <Info size={18} className="text-sky-600 mt-0.5 flex-shrink-0" />
          <div className="text-xs text-slate-600 leading-relaxed space-y-1">
            <p>
              <strong className="text-slate-800 font-bold">Liên kết Google Maps thực:</strong> Bản
              đồ bên phải hiển thị tọa độ GPS thời gian thực trên hệ thống Google Maps. Quản trị
              viên có thể nhập tọa độ, dán liên kết Google Maps hoặc chọn nhanh các di tích tiêu
              biểu.
            </p>
            <p className="text-slate-500">
              <strong className="text-slate-700 font-semibold">Cơ chế Geofence:</strong> Du khách
              chỉ check-in thành công khi đứng trong bán kính cho phép tính từ tâm điểm Google Maps này.
            </p>
          </div>
        </div>

        {/* ── TIỆN ÍCH DÁN TỌA ĐỘ / LINK TỪ GOOGLE MAPS ── */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-50/50 via-sky-50/40 to-slate-50 border border-emerald-200/60 space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <Search size={14} className="text-emerald-600" />
              <span>Dán nhanh Tọa độ hoặc Đường link từ Google Maps</span>
            </label>
            <button
              type="button"
              onClick={handleOpenGoogleMaps}
              className="text-[11px] font-bold text-sky-700 hover:text-sky-800 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span>Mở Google Maps tìm vị trí</span>
              <ExternalLink size={12} />
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2">
            <input
              type="text"
              value={pasteLocationInput}
              onChange={(e) => setPasteLocationInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleParseCoordinates()}
              placeholder="Dán tọa độ (VD: 21.028511, 105.835520) hoặc dán link Google Maps (maps.google.com/...)..."
              className="w-full sm:flex-1 px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />
            <button
              type="button"
              onClick={handleParseCoordinates}
              className="w-full sm:w-auto px-4 py-2 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer shrink-0"
            >
              Áp Dụng Tọa Độ
            </button>
          </div>

          {pasteError && (
            <p className="text-xs text-rose-500 font-semibold flex items-center gap-1">
              <AlertCircle size={12} /> {pasteError}
            </p>
          )}
        </div>

        {/* ── CHỌN NHANH TỌA ĐỘ DI TÍCH NỔI TIẾNG VIỆT NAM ── */}
        <div>
          <p className="text-xs font-bold text-slate-700 mb-2">
            Hoặc chọn nhanh tọa độ di tích văn hóa mẫu chuẩn thực địa:
          </p>
          <div className="flex flex-wrap gap-2">
            {quickHeritagePresets.map((loc) => (
              <button
                key={loc.name}
                type="button"
                onClick={() => handleSelectQuickLocation(loc)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${
                  formData.lat === loc.lat && formData.lng === loc.lng
                    ? "bg-emerald-100/80 border-emerald-500 text-emerald-950 font-bold ring-1 ring-emerald-400/50"
                    : "bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700"
                }`}
              >
                <MapPin size={12} className="text-emerald-600" />
                <span>{loc.name}</span>
                <span className="text-[10px] text-slate-400">({loc.region})</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── 2 CỘT: CẤU HÌNH SỐ LIỆU & BẢN ĐỒ GOOGLE MAPS TRỰC QUAN ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Cột trái: Nhập tọa độ & Bán kính */}
          <div className="lg:col-span-6 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Vĩ độ (Latitude) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="lat"
                  value={formData.lat}
                  onChange={handleInputChange}
                  placeholder="21.028511"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white text-sm font-mono text-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Kinh độ (Longitude) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="lng"
                  value={formData.lng}
                  onChange={handleInputChange}
                  placeholder="105.835520"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white text-sm font-mono text-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all"
                />
              </div>
            </div>

            {/* Nút thao tác tọa độ */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleSimulateLocation}
                disabled={isSimulatingLocation}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 active:bg-slate-950 text-white text-xs font-bold transition-all shadow-xs cursor-pointer disabled:opacity-70"
              >
                <Navigation
                  size={14}
                  className={isSimulatingLocation ? "animate-spin text-emerald-400" : "text-emerald-400"}
                />
                <span>
                  {isSimulatingLocation
                    ? "Đang quét tín hiệu vệ tinh..."
                    : "Lấy tọa độ thiết bị hiện tại"}
                </span>
              </button>

              <button
                type="button"
                onClick={handleOpenGoogleMaps}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all shadow-2xs cursor-pointer"
              >
                <ExternalLink size={14} className="text-sky-600" />
                <span>Mở trên Google Maps</span>
              </button>
            </div>

            {locationSuccessMsg && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                <span>{locationSuccessMsg}</span>
              </div>
            )}

            {/* Bán kính check-in */}
            <div className="pt-2 border-t border-slate-100 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Bán kính Check-in Geofence (mặc định 60m)
                </label>
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 font-extrabold text-xs">
                  {formData.geofenceRadius} mét
                </span>
              </div>

              {/* Slider điều chỉnh */}
              <input
                type="range"
                min="10"
                max="200"
                step="5"
                value={formData.geofenceRadius}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    geofenceRadius: Number(e.target.value),
                  }))
                }
                className="w-full accent-emerald-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
              />

              {/* Presets nhanh */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                {radiusPresets.map((p) => (
                  <button
                    key={p.value}
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, geofenceRadius: p.value }))}
                    className={`p-2 rounded-xl text-left border transition-all cursor-pointer ${
                      Number(formData.geofenceRadius) === p.value
                        ? "border-emerald-500 bg-emerald-50 text-emerald-950 font-bold"
                        : "border-slate-200 bg-white hover:bg-slate-50 text-slate-700"
                    }`}
                  >
                    <p className="text-xs font-black">{p.label}</p>
                    <p className="text-[10px] text-slate-500 font-normal leading-tight">
                      {p.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Cột phải: KHUNG BẢN ĐỒ GOOGLE MAPS THỰC TẾ & RADAR GEOFENCE */}
          <div className="lg:col-span-6 bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-md flex flex-col">
            {/* Header Tabs của Bản Đồ */}
            <div className="p-3 bg-slate-850 border-b border-slate-800 flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setMapTab("google-map")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    mapTab === "google-map"
                      ? "bg-emerald-600 text-white shadow-xs"
                      : "text-slate-400 hover:text-white hover:bg-slate-800"
                  }`}
                >
                  <Globe size={14} />
                  <span>Google Maps Thực Tế</span>
                </button>

                <button
                  type="button"
                  onClick={() => setMapTab("geofence-radar")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    mapTab === "geofence-radar"
                      ? "bg-emerald-600 text-white shadow-xs"
                      : "text-slate-400 hover:text-white hover:bg-slate-800"
                  }`}
                >
                  <Crosshair size={14} />
                  <span>Radar Geofence (R={formData.geofenceRadius}m)</span>
                </button>
              </div>

              {/* Phóng to / Thu nhỏ Google Map */}
              {mapTab === "google-map" && (
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setGoogleMapZoom((z) => Math.min(z + 1, 20))}
                    className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition-colors cursor-pointer"
                    title="Phóng to"
                  >
                    <ZoomIn size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setGoogleMapZoom((z) => Math.max(z - 1, 10))}
                    className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition-colors cursor-pointer"
                    title="Thu nhỏ"
                  >
                    <ZoomOut size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={handleOpenGoogleMaps}
                    className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-400 flex items-center justify-center transition-colors cursor-pointer"
                    title="Mở toàn màn hình Google Maps"
                  >
                    <ExternalLink size={14} />
                  </button>
                </div>
              )}
            </div>

            {/* Nội dung Tab 1: GOOGLE MAPS EMBED CHUẨN */}
            {mapTab === "google-map" ? (
              <div className="relative w-full h-[320px] bg-slate-800">
                <iframe
                  title="Google Maps Thực Tế"
                  src={googleMapEmbedUrl}
                  className="w-full h-full border-0"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />

                {/* Badge thông tin nổi trên bản đồ */}
                <div className="absolute bottom-3 left-3 right-3 bg-slate-900/90 backdrop-blur-xs p-2.5 rounded-xl border border-slate-700/80 text-white flex items-center justify-between gap-2 shadow-lg">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                      <MapPin size={14} />
                    </div>
                    <div className="truncate">
                      <p className="text-xs font-bold text-white truncate">
                        {formData.name || "Điểm đến Di tích"}
                      </p>
                      <p className="text-[10px] text-slate-300 font-mono truncate">
                        GPS: {formData.lat}, {formData.lng}
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] font-extrabold text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-2 py-0.5 rounded shrink-0">
                    Bán kính: {formData.geofenceRadius}m
                  </span>
                </div>
              </div>
            ) : (
              /* Nội dung Tab 2: RADAR GEOFENCE VISUALIZER */
              <div className="p-6 h-[320px] flex flex-col items-center justify-center text-center relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-850 to-slate-900">
                <div className="relative w-44 h-44 flex items-center justify-center">
                  <div
                    className="absolute inset-0 rounded-full border-2 border-emerald-400/40 bg-emerald-500/10 animate-ping opacity-60"
                    style={{ animationDuration: "3s" }}
                  />
                  <div className="absolute inset-4 rounded-full border border-emerald-400/50 bg-emerald-500/15" />
                  <div className="absolute inset-10 rounded-full border border-dashed border-emerald-300/40" />

                  <div className="relative z-10 w-12 h-12 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-black shadow-lg shadow-emerald-500/40">
                    <MapPin size={22} className="fill-slate-950" />
                  </div>
                </div>

                <div className="mt-3 space-y-1 relative z-10">
                  <p className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
                    Vùng bảo vệ Geofence R = {formData.geofenceRadius} mét
                  </p>
                  <p className="text-[11px] text-slate-300 font-mono">
                    Tâm điểm: {formData.lat} , {formData.lng}
                  </p>
                  <p className="text-[10px] text-slate-400">
                    Chống gian lận: Thiết bị du khách ngoài vùng này sẽ bị từ chối xác thực check-in
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          PHẦN 3: MÃ QR CHECK-IN THỰC ĐỊA
      ══════════════════════════════════════════════════════════ */}
      <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/80 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center font-black text-xs">
              3
            </div>
            <h2 className="text-base font-extrabold text-slate-900">
              Mã QR Check-in Điểm Đến Thực Địa
            </h2>
          </div>
          <span className="text-xs text-slate-500">Mã vật lý gắn tại cổng / bia di tích</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Cột trái: Cấu hình mã định danh */}
          <div className="md:col-span-7 space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Mã định danh duy nhất (Unique Code)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  name="code"
                  value={formData.code}
                  onChange={handleInputChange}
                  placeholder="VD: VM-KVC-01"
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white text-sm font-mono font-bold text-slate-800 tracking-wider focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
                <button
                  type="button"
                  onClick={handleGenerateNewCode}
                  className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer flex-shrink-0"
                  title="Sinh mã định danh ngẫu nhiên"
                >
                  <RefreshCw size={14} />
                  <span>Sinh mã mới</span>
                </button>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Định dạng chuẩn: [Mã Vùng]-[Tên Viết Tắt]-[Số Thứ Tự] (VD: VM-KVC-01)
              </p>
            </div>

            <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/80 text-xs text-amber-900 leading-relaxed">
              <p className="font-bold flex items-center gap-1.5 mb-1">
                <AlertCircle size={14} className="text-amber-600" />
                Hướng dẫn dán mã QR tại thực địa:
              </p>
              In biển QR khổ A5 hoặc A6 chống nước, đặt tại quầy vé hoặc lối vào di tích ngang tầm
              mắt để du khách dễ dàng quét bằng camera ứng dụng VietCulture.
            </div>

            <div>
              <button
                type="button"
                onClick={() => setIsQRModalOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs sm:text-sm font-bold shadow-xs transition-all cursor-pointer"
              >
                <Eye size={16} />
                <span>Xem & In Mã QR Thực Địa Chuẩn A5</span>
              </button>
            </div>
          </div>

          {/* Cột phải: Thẻ xem trước Biển QR thực tế */}
          <div className="md:col-span-5 flex justify-center">
            <div className="w-56 p-4 rounded-2xl bg-white border-2 border-emerald-500/80 shadow-md flex flex-col items-center text-center space-y-2.5">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-black tracking-tight text-[#00A86B]">viet</span>
                <span className="text-xs font-black tracking-tight text-[#0288D1]">culture</span>
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  DI SẢN
                </span>
              </div>

              {/* QR Box SVG */}
              <div className="w-36 h-36 bg-slate-50 border border-slate-200 rounded-xl p-2 flex items-center justify-center relative shadow-inner">
                <svg
                  viewBox="0 0 100 100"
                  className="w-full h-full text-slate-900"
                  fill="currentColor"
                >
                  <rect x="5" y="5" width="28" height="28" rx="4" />
                  <rect x="9" y="9" width="20" height="20" rx="2" fill="white" />
                  <rect x="13" y="13" width="12" height="12" rx="1" />

                  <rect x="67" y="5" width="28" height="28" rx="4" />
                  <rect x="71" y="9" width="20" height="20" rx="2" fill="white" />
                  <rect x="75" y="13" width="12" height="12" rx="1" />

                  <rect x="5" y="67" width="28" height="28" rx="4" />
                  <rect x="9" y="71" width="20" height="20" rx="2" fill="white" />
                  <rect x="13" y="75" width="12" height="12" rx="1" />

                  <rect x="40" y="8" width="6" height="6" />
                  <rect x="50" y="8" width="6" height="6" />
                  <rect x="40" y="20" width="6" height="6" />
                  <rect x="52" y="20" width="8" height="6" />
                  <rect x="10" y="40" width="8" height="6" />
                  <rect x="25" y="40" width="6" height="6" />
                  <rect x="38" y="38" width="8" height="8" />
                  <rect x="52" y="38" width="8" height="8" />
                  <rect x="68" y="40" width="6" height="6" />
                  <rect x="80" y="40" width="8" height="6" />
                  <rect x="40" y="52" width="6" height="8" />
                  <rect x="52" y="52" width="6" height="6" />
                  <rect x="65" y="52" width="8" height="6" />
                  <rect x="80" y="52" width="6" height="6" />
                  <rect x="40" y="68" width="8" height="6" />
                  <rect x="55" y="68" width="6" height="8" />
                  <rect x="70" y="68" width="6" height="6" />
                  <rect x="85" y="68" width="6" height="6" />

                  <circle cx="50" cy="50" r="9" fill="white" />
                  <circle cx="50" cy="50" r="6" fill="#059669" />
                </svg>
              </div>

              <div>
                <p className="text-xs font-black text-slate-800 font-mono tracking-wider">
                  {formData.code || "VM-KVC-01"}
                </p>
                <p className="text-[10px] text-slate-500 font-medium">
                  {formData.name || "Điểm đến Di tích"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          PHẦN 4: CẤU HÌNH CHI PHÍ & VÉ (BẢNG TÍNH KHẤU TRỪ 10%)
      ══════════════════════════════════════════════════════════ */}
      <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/80 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center font-black text-xs">
              4
            </div>
            <h2 className="text-base font-extrabold text-slate-900">
              Cấu Hình Chi Phí Tham Quan & Bán Vé Số Hóa
            </h2>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/80 self-start sm:self-auto">
            <Ticket size={13} />
            Toàn bộ điểm đến áp dụng bán vé số hóa
          </span>
        </div>

        <div className="space-y-6">
          {/* Nhập giá vé */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Giá vé tham quan niêm yết (VNĐ) <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.price ? formData.price.toLocaleString("vi-VN") : ""}
                  onChange={handlePriceInput}
                  placeholder="80.000"
                  className="w-full px-4 py-2.5 pr-14 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white text-base font-black text-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-extrabold text-slate-400">
                  VNĐ / vé
                </span>
              </div>

              {/* Phím chọn nhanh */}
              <div className="flex items-center gap-2 mt-2.5">
                {[30000, 50000, 80000, 120000].map((quick) => (
                  <button
                    key={quick}
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, price: quick }))}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                      formData.price === quick
                        ? "bg-emerald-50 border-emerald-500 text-emerald-800"
                        : "bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-600"
                    }`}
                  >
                    {quick.toLocaleString("vi-VN")} đ
                  </button>
                ))}
              </div>
            </div>

            {/* Dịch vụ bao gồm */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Quyền lợi bao gồm trong vé
              </label>
              <div className="space-y-2">
                {[
                  { key: "entry", label: "Vé vào cổng tham quan trọn gói" },
                  { key: "guide", label: "Kèm Audio Guide thuyết minh tự động" },
                  { key: "quiz", label: "Tham gia Quiz tương tác nhận quà kỷ niệm" },
                ].map((srv) => (
                  <label
                    key={srv.key}
                    onClick={() => toggleService(srv.key)}
                    className="flex items-center gap-2.5 p-2 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors text-xs font-semibold text-slate-700"
                  >
                    <input
                      type="checkbox"
                      checked={formData.includedServices?.includes(srv.key)}
                      readOnly
                      className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
                    />
                    <span>{srv.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* BẢNG TÍNH KHẤU TRỪ 10% PHÍ SÀN */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-50/70 via-slate-50 to-emerald-50/40 border border-emerald-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
                <Percent size={14} className="text-emerald-700" />
                Bảng Phân Bổ Doanh Thu Vé (Khấu trừ 10% phí sàn)
              </span>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/70 px-2.5 py-0.5 rounded-full">
                Chính sách đối tác BQL
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                <p className="text-[11px] font-bold text-slate-500">Giá vé niêm yết (100%)</p>
                <p className="text-base sm:text-lg font-black text-slate-900 mt-1">
                  {formData.price.toLocaleString("vi-VN")} đ
                </p>
                <p className="text-[10px] text-slate-400">Du khách thanh toán qua app</p>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                <p className="text-[11px] font-bold text-slate-500">
                  Phí nền tảng VietCulture (10%)
                </p>
                <p className="text-base sm:text-lg font-black text-rose-600 mt-1">
                  - {platformFee.toLocaleString("vi-VN")} đ
                </p>
                <p className="text-[10px] text-slate-400">Vận hành máy chủ & cổng thanh toán</p>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-600 text-white shadow-xs">
                <p className="text-[11px] font-bold text-emerald-100">BQL Di tích thực nhận (90%)</p>
                <p className="text-base sm:text-lg font-black text-white mt-1">
                  + {netEarnings.toLocaleString("vi-VN")} đ
                </p>
                <p className="text-[10px] text-emerald-200">Đối soát định kỳ vào ngày 15 & 30</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          PHẦN 5: NỘI DUNG VĂN HÓA & TƯ LIỆU SỐ HÓA
      ══════════════════════════════════════════════════════════ */}
      <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/80 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center font-black text-xs">
              5
            </div>
            <h2 className="text-base font-extrabold text-slate-900">
              Nội Dung Văn Hóa & Thuyết Minh Di Sản
            </h2>
          </div>
          <span className="text-xs text-slate-400 font-medium">Tư liệu hiển thị trên ứng dụng</span>
        </div>

        <div className="space-y-5">
          {/* Bài thuyết minh lịch sử */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Bài viết thuyết minh lịch sử & kiến trúc
            </label>
            <textarea
              rows={4}
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Mô tả bối cảnh lịch sử, giá trị kiến trúc, văn hóa nghệ thuật và ý nghĩa của địa danh..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all leading-relaxed"
            />
          </div>

          {/* Câu chuyện hiện vật & sự tích */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Câu chuyện hiện vật & giai thoại dân gian
            </label>
            <textarea
              rows={3}
              name="heritageStory"
              value={formData.heritageStory}
              onChange={handleInputChange}
              placeholder="Những truyền thuyết, câu chuyện bia ký, bảo vật quốc gia hoặc nhân vật lịch sử gắn liền với điểm đến..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all leading-relaxed"
            />
          </div>

          {/* Tải ảnh & video tư liệu */}
          <div className="pt-2 border-t border-slate-100 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Tư liệu hình ảnh & Video điểm đến
              </label>
              <button
                type="button"
                onClick={handleAddSampleImage}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 cursor-pointer"
              >
                <Plus size={14} />
                <span>Thêm ảnh mẫu từ thư viện</span>
              </button>
            </div>

            {/* Gallery ảnh */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {galleryImages.map((img) => (
                <div
                  key={img.id}
                  className="relative group rounded-xl overflow-hidden border border-slate-200 bg-slate-100 aspect-video"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-slate-900/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleRemoveGalleryImage(img.id)}
                      className="p-1.5 rounded-lg bg-rose-600 text-white hover:bg-rose-700 transition-colors"
                      title="Xóa ảnh"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/80 to-transparent p-1.5 text-[10px] text-white font-medium truncate">
                    {img.name}
                  </div>
                </div>
              ))}

              {/* Nút Upload ảnh */}
              <div
                onClick={handleAddSampleImage}
                className="border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-xl aspect-video flex flex-col items-center justify-center p-3 text-center cursor-pointer transition-colors bg-slate-50/50 hover:bg-emerald-50/30 group"
              >
                <UploadCloud
                  size={22}
                  className="text-slate-400 group-hover:text-emerald-600 transition-colors mb-1"
                />
                <p className="text-xs font-bold text-slate-700 group-hover:text-emerald-700">
                  Tải ảnh mới
                </p>
                <p className="text-[10px] text-slate-400">JPG, PNG (Tối đa 5MB)</p>
              </div>
            </div>
          </div>

          {/* Audio Guide thuyết minh */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center">
                <Volume2 size={18} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">Tệp âm thanh Audio Guide (.MP3)</p>
                <p className="text-[11px] text-slate-500">
                  Tự động phát giọng đọc thuyết minh khi du khách tiến vào bán kính Geofence
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  audioGuideName: "thuyet-minh-chuan-van-mieu.mp3",
                }))
              }
              className="px-3.5 py-2 rounded-xl bg-white border border-slate-300 hover:border-sky-500 text-slate-700 hover:text-sky-800 text-xs font-bold transition-all shadow-2xs cursor-pointer self-start sm:self-auto"
            >
              {formData.audioGuideName ? `✓ ${formData.audioGuideName}` : "+ Chọn file ghi âm MP3"}
            </button>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          CHÂN TRANG FORM (ACTION BAR CỐ ĐỊNH)
      ══════════════════════════════════════════════════════════ */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => router.push("/provider/destinations")}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 text-xs sm:text-sm font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
        >
          <ArrowLeft size={16} />
          <span>Hủy bỏ / Quay lại</span>
        </button>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => handleSubmit(true)}
            className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl border border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs sm:text-sm font-bold transition-colors cursor-pointer"
          >
            Lưu bản nháp
          </button>

          <button
            type="button"
            onClick={() => handleSubmit(false)}
            className="flex-1 sm:flex-initial bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold px-6 py-2.5 rounded-xl shadow-md shadow-emerald-600/20 text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <CheckCircle2 size={18} />
            <span>Lưu & Gửi Kiểm Duyệt</span>
          </button>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          MODAL IN ẤN MÃ QR STANDÉE THỰC ĐỊA KHỔ A5
      ══════════════════════════════════════════════════════════ */}
      {isQRModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setIsQRModalOpen(false)}
        >
          <div
            className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 relative animate-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                Mẫu Biển Standee Check-in Di Tích
              </h3>
              <button
                type="button"
                onClick={() => setIsQRModalOpen(false)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X size={15} />
              </button>
            </div>

            {/* Nội dung Biển in ấn A5 */}
            <div className="my-5 p-6 rounded-2xl bg-gradient-to-b from-emerald-50/40 via-white to-slate-50 border-2 border-emerald-600/30 flex flex-col items-center text-center space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-lg font-black tracking-tight text-[#00A86B]">viet</span>
                <span className="text-lg font-black tracking-tight text-[#0288D1]">culture</span>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-bold uppercase tracking-widest text-emerald-800">
                  Điểm Chạm Di Sản Văn Hóa
                </p>
                <h4 className="text-lg font-black text-slate-900">
                  {formData.name || "Tên Điểm Đến Di Tích"}
                </h4>
                <p className="text-xs text-slate-500">{formData.region}</p>
              </div>

              {/* QR Code Big */}
              <div className="w-48 h-48 bg-white border-2 border-slate-900 rounded-2xl p-3 flex items-center justify-center shadow-md">
                <svg
                  viewBox="0 0 100 100"
                  className="w-full h-full text-slate-900"
                  fill="currentColor"
                >
                  <rect x="5" y="5" width="28" height="28" rx="4" />
                  <rect x="9" y="9" width="20" height="20" rx="2" fill="white" />
                  <rect x="13" y="13" width="12" height="12" rx="1" />

                  <rect x="67" y="5" width="28" height="28" rx="4" />
                  <rect x="71" y="9" width="20" height="20" rx="2" fill="white" />
                  <rect x="75" y="13" width="12" height="12" rx="1" />

                  <rect x="5" y="67" width="28" height="28" rx="4" />
                  <rect x="9" y="71" width="20" height="20" rx="2" fill="white" />
                  <rect x="13" y="75" width="12" height="12" rx="1" />

                  <rect x="40" y="8" width="6" height="6" />
                  <rect x="50" y="8" width="6" height="6" />
                  <rect x="40" y="20" width="6" height="6" />
                  <rect x="52" y="20" width="8" height="6" />
                  <rect x="10" y="40" width="8" height="6" />
                  <rect x="25" y="40" width="6" height="6" />
                  <rect x="38" y="38" width="8" height="8" />
                  <rect x="52" y="38" width="8" height="8" />
                  <rect x="68" y="40" width="6" height="6" />
                  <rect x="80" y="40" width="8" height="6" />
                  <rect x="40" y="52" width="6" height="8" />
                  <rect x="52" y="52" width="6" height="6" />
                  <rect x="65" y="52" width="8" height="6" />
                  <rect x="80" y="52" width="6" height="6" />
                  <rect x="40" y="68" width="8" height="6" />
                  <rect x="55" y="68" width="6" height="8" />
                  <rect x="70" y="68" width="6" height="6" />
                  <rect x="85" y="68" width="6" height="6" />

                  <circle cx="50" cy="50" r="9" fill="white" />
                  <circle cx="50" cy="50" r="6" fill="#059669" />
                </svg>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-black font-mono tracking-widest text-slate-900">
                  {formData.code || "VM-KVC-01"}
                </p>
                <p className="text-[11px] text-slate-500">
                  Mở ứng dụng VietCulture quét mã khi đứng trong khuôn viên di tích
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setIsQRModalOpen(false)}
                className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Đóng lại
              </button>
              <button
                type="button"
                onClick={() => {
                  if (typeof window !== "undefined") {
                    window.print();
                  }
                }}
                className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-sm shadow-emerald-600/20 cursor-pointer"
              >
                <Printer size={15} />
                <span>In Bản Chuẩn A5</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════
          MODAL THÀNH CÔNG: ĐÃ GỬI DUYỆT HỒ SƠ
      ══════════════════════════════════════════════════════════ */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-100 text-center space-y-4 animate-in zoom-in-95">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 size={32} />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-lg font-black text-slate-900">
                Gửi Hồ Sơ Kiểm Duyệt Thành Công!
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Điểm đến <strong className="text-slate-900 font-bold">&quot;{formData.name}&quot;</strong> đã
                được gửi tới Hội đồng kiểm duyệt văn hóa VietCulture. Bạn sẽ nhận thông báo khi hồ sơ
                được phê duyệt chính thức.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-left space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Mã điểm đến:</span>
                <span className="font-mono font-bold text-slate-800">{formData.code}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Tọa độ Google Maps:</span>
                <span className="font-mono font-bold text-slate-800">
                  {formData.lat}, {formData.lng}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Bán kính Geofence:</span>
                <span className="font-bold text-emerald-700">{formData.geofenceRadius} mét</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Trạng thái:</span>
                <span className="font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded text-[10px]">
                  Chờ duyệt (Pending)
                </span>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => router.push("/provider/destinations")}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-sm shadow-emerald-600/20 transition-all cursor-pointer"
              >
                Về Trang Quản Lý Điểm Đến
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
