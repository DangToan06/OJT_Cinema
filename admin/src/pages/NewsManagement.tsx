import { useEffect, useState } from "react";
import { Plus, Edit, Trash2, Eye, Calendar, AlertTriangle } from "lucide-react";
import { X, FileText, Tag } from "lucide-react";
import type { InitialNewsState, News } from "../util/news.interface";
import { v4 as uuidv4 } from "uuid";
import { PictureOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../hook/useRedux";
import { createNews, deleteNews, getAllNews } from "../api/news.api";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { notify } from "../util/toast";
dayjs.extend(utc);

export function NewsManagement() {
  const newsData: InitialNewsState = useAppSelector((s) => s.news);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (newsData.newsList.length === 0) {
      dispatch(getAllNews());
    }
  }); // Lưu ý: useEffect này đang thiếu dependency array [], nên thêm vào nếu chỉ muốn chạy 1 lần.

  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<News | null>(null);

  const [formData, setFormData] = useState<News>({
    title: "",
    content: "",
    created_at: "",
    id: "",
    bannerUrl: "",
    category: "news",
    dayBegin: "",
    dayEnd: "",
  });

  const handleSubmit = () => {
    const newData = {
      ...formData,
      id: uuidv4(),
      created_at: new Date().toISOString(),
    };

    setFormData(newData);
    dispatch(createNews(newData));
    if (formData.category === "news") {
      notify.success("Tạo tin tức thành công");
    } else if (formData.category === "promotion") {
      notify.success("Tạo khuyến mãi thành công");
    }
    setShowModal(false);
  };

  const handleDeleteClick = (item: News) => {
    setSelectedItem(item);
    setShowDeleteModal(true);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setSelectedItem(null);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteNews(selectedItem!.id));
    notify.success("Xóa tin tức thành công");
    setShowDeleteModal(false);
    setSelectedItem(null);
  };

  const updateField = (field: keyof News, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  // Cập nhật màu status cho Dark Mode (nền trong suốt, chữ sáng)
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Đang hoạt động":
        return "bg-green-500/20 text-green-400 border border-green-500/30";
      case "Sắp diễn ra":
        return "bg-blue-500/20 text-blue-400 border border-blue-500/30";
      case "Đã kết thúc":
        return "bg-gray-700/50 text-gray-400 border border-gray-600";
      default:
        return "bg-gray-700/50 text-gray-400";
    }
  };

  const getStatus = (dayBegin: string, dayEnd: string): string => {
    const now = new Date();
    const begin = new Date(dayBegin);
    const end = new Date(dayEnd);

    if (now < begin) return "Sắp diễn ra";
    if (now >= begin && now <= end) return "Đang hoạt động";
    return "Đã kết thúc";
  };

  const inputClass =
    "w-full px-3 py-2.5 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all placeholder-gray-500";
  const labelClass = "block text-sm font-medium text-gray-300 mb-1.5";

  return (
    <div className="p-8 min-h-screen bg-gray-900">
      {" "}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-white mb-2 font-bold text-3xl tracking-tight">
            Quản lý tin tức & khuyến mãi
          </h1>
          <p className="text-gray-400 text-[18px]">
            Tạo và quản lý các chương trình khuyến mãi, tin tức
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors shadow-lg shadow-red-900/20"
        >
          <Plus className="w-5 h-5" />
          Thêm bài viết
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-6">
        {newsData.newsList.map((item) => {
          const status = getStatus(item.dayBegin, item.dayEnd);
          return (
            <div
              key={item.id}
              className="group bg-gray-900 rounded-xl shadow-lg hover:shadow-2xl hover:shadow-black/50 transition-all duration-300 overflow-hidden border border-gray-800 hover:border-gray-700 cursor-default"
            >
              <div className="relative">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={item.bannerUrl}
                    alt={item.title}
                    className="w-full h-full object-cover will-change-transform group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
                  />
                </div>

                <div className="absolute inset-y-0 right-0 flex items-start p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md shadow-sm ${getStatusColor(
                      status
                    )}`}
                  >
                    {status}
                  </span>
                </div>
              </div>

              <div className="p-4 flex flex-col gap-3">
                <h3 className="text-[18px] font-semibold text-gray-100 group-hover:text-yellow-500 transition-colors line-clamp-2">
                  {item.title}
                </h3>

                <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
                  {item.content}
                </p>

                <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
                  <div className="flex items-center gap-1.5 bg-gray-800 px-2 py-1 rounded border border-gray-700">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>
                      {dayjs(item.dayBegin).utc().format("DD/MM/YYYY")}
                    </span>
                  </div>
                  <span className="text-gray-600">→</span>
                  <div className="flex items-center gap-1.5 bg-gray-800 px-2 py-1 rounded border border-gray-700">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{dayjs(item.dayEnd).utc().format("DD/MM/YYYY")}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-800 mt-1">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Eye className="w-4 h-4" />
                    <span className="font-medium text-gray-400">1000</span>
                    <span>lượt xem</span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      className="p-2 bg-gray-800 text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all duration-200 hover:scale-110 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <Edit className="w-4 h-4" />
                    </button>

                    <button
                      className="p-2 bg-gray-800 text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-200 hover:scale-110 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteClick(item);
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-red-700 to-red-800 px-6 py-4 flex items-center justify-between border-b border-red-900">
              <div>
                <h2 className="text-xl font-bold text-white">
                  Tạo bài viết mới
                </h2>
                <p className="text-red-200 text-sm">
                  Chia sẻ tin tức hoặc khuyến mãi
                </p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors cursor-pointer text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto custom-scrollbar">
              <div>
                <label className={labelClass}>Loại bài viết</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => updateField("category", "news")}
                    className={`p-3 rounded-lg border transition-all ${
                      formData.category === "news"
                        ? "border-red-500 bg-red-500/10 text-red-400"
                        : "border-gray-700 bg-gray-800 hover:bg-gray-700 text-gray-400"
                    }`}
                  >
                    <FileText className="w-5 h-5 mx-auto mb-1" />
                    <span className="font-medium text-sm">Tin tức</span>
                  </button>
                  <button
                    onClick={() => updateField("category", "promotion")}
                    className={`p-3 rounded-lg border transition-all ${
                      formData.category === "promotion"
                        ? "border-red-500 bg-red-500/10 text-red-400"
                        : "border-gray-700 bg-gray-800 hover:bg-gray-700 text-gray-400"
                    }`}
                  >
                    <Tag className="w-5 h-5 mx-auto mb-1" />
                    <span className="font-medium text-sm">Khuyến mãi</span>
                  </button>
                </div>
              </div>

              <div>
                <label className={labelClass}>
                  Tiêu đề <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => updateField("title", e.target.value)}
                  className={inputClass}
                  placeholder="VD: Giảm giá 50% vé xem phim mỗi thứ 3"
                />
              </div>

              <div>
                <label className={labelClass}>
                  Nội dung <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={4}
                  value={formData.content}
                  onChange={(e) => updateField("content", e.target.value)}
                  className={`${inputClass} resize-none`}
                  placeholder="Mô tả chi tiết về chương trình..."
                />
                <div className="text-xs text-gray-500 text-right mt-1">
                  {formData.content.length} ký tự
                </div>
              </div>

              <div>
                <label className={labelClass}>Hình ảnh (URL)</label>
                <input
                  type="url"
                  value={formData.bannerUrl}
                  onChange={(e) => updateField("bannerUrl", e.target.value)}
                  className={inputClass}
                  placeholder="https://example.com/image.jpg"
                />

                <div className="mt-3 rounded-lg overflow-hidden border border-gray-700 aspect-video w-full flex justify-center bg-gray-800 items-center">
                  {formData.bannerUrl ? (
                    <img
                      src={formData.bannerUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => (e.currentTarget.style.display = "none")}
                    />
                  ) : (
                    <PictureOutlined
                      style={{
                        fontSize: 40,
                        color: "#4b5563",
                      }}
                    />
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass}>
                    Ngày bắt đầu <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.dayBegin}
                    onChange={(e) => updateField("dayBegin", e.target.value)}
                    className={`${inputClass} [color-scheme:dark]`}
                  />
                </div>
                <div>
                  <label className={labelClass}>
                    Ngày kết thúc <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.dayEnd}
                    onChange={(e) => updateField("dayEnd", e.target.value)}
                    className={`${inputClass} [color-scheme:dark]`}
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 px-6 pb-6 pt-4 border-t border-gray-800 bg-gray-900">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2.5 border border-gray-600 text-gray-300 font-medium rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 px-4 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white font-medium rounded-lg hover:from-red-700 hover:to-red-800 transition-colors cursor-pointer shadow-lg shadow-red-900/30"
              >
                Xuất bản
              </button>
            </div>
          </div>
        </div>
      )}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
          <div className="bg-gray-900 rounded-3xl shadow-2xl max-w-md w-full animate-in zoom-in duration-300 border border-gray-800 overflow-hidden">
            <div className="bg-gradient-to-r from-red-800 to-pink-900 p-6 border-b border-red-900/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center shadow-lg border border-white/10">
                    <AlertTriangle className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    Xác nhận xóa
                  </h3>
                </div>

                <button
                  onClick={handleCancelDelete}
                  className="p-2 hover:bg-white/10 rounded-xl transition-all duration-200 text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-7">
              <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                Bạn có chắc chắn muốn xóa tin tức này không?
                <br />
                <span className="font-semibold text-red-400 text-sm mt-1 block">
                  Hành động này không thể hoàn tác.
                </span>
              </p>

              {selectedItem && (
                <div className="bg-gray-800 rounded-2xl p-4 border border-gray-700 mb-6 shadow-inner">
                  <p className="font-bold text-gray-200 mb-2 text-lg line-clamp-1">
                    {selectedItem.title}
                  </p>
                  <p className="text-xs text-gray-500">
                    ID: {selectedItem.id.slice(0, 8)}...
                  </p>
                </div>
              )}

              <div className="flex gap-4">
                <button
                  onClick={handleCancelDelete}
                  className="flex-1 px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-600 text-gray-200 font-bold rounded-xl transition-all duration-300 hover:shadow-lg"
                >
                  Hủy bỏ
                </button>

                <button
                  onClick={handleConfirmDelete}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-red-900/40 hover:scale-105"
                >
                  Xóa ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
