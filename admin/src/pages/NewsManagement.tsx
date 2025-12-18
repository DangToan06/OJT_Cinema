import { useEffect, useState } from "react";
import { Plus, AlertTriangle } from "lucide-react";
import { X } from "lucide-react";
import {
  initialNews,
  type InitialNewsState,
  type News,
} from "../util/news.interface";
import { v4 as uuidv4 } from "uuid";
import { useAppDispatch, useAppSelector } from "../hook/useRedux";
import {
  createNews,
  deleteNews,
  getAllNews,
  updateNews,
} from "../api/news.api";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { notify } from "../util/toast";
import ModalAddNewsAndPromotion from "../components/ModalAddNewsAndPromotion";
import NewsCard from "../components/NewsCard";
dayjs.extend(utc);

export function NewsManagement() {
  const newsData: InitialNewsState = useAppSelector((s) => s.news);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (newsData.newsList.length === 0) {
      dispatch(getAllNews());
    }
  });
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<News | null>(null);
  const [updateItem, setUpdateItem] = useState<News | null>(null);

  const [formData, setFormData] = useState<News>(initialNews);

  const handleSubmit = () => {
    const newData = {
      ...formData,
      id: uuidv4(),
      created_at: new Date().toISOString().split(".")[0] + "Z",
    };
    if (updateItem) {
      newData.id = updateItem.id;

      setUpdateItem(null);
      console.log(newData);

      dispatch(updateNews(newData));
      if (formData.category === "news") {
        notify.success("Cập nhật tin tức thành công");
      } else if (formData.category === "promotion") {
        notify.success("Cập nhật khuyến mãi thành công");
      }
    } else {
      dispatch(createNews(newData));
      if (formData.category === "news") {
        notify.success("Tạo tin tức thành công");
      } else if (formData.category === "promotion") {
        notify.success("Tạo khuyến mãi thành công");
      }
    }

    setShowModal(false);
    setFormData(initialNews);
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

  // const inputClass =
  //   "w-full px-3 py-2.5 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all placeholder-gray-500";
  // const labelClass = "block text-sm font-medium text-gray-300 mb-1.5";

  return (
    <div className="p-8 min-h-screen bg-gray-900">
      {" "}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-white mb-2 font-bold text-3xl tracking-tight">
                Quản lý tin tức & khuyến mãi
              </h1>
              <p className="text-gray-300 text-[18px]">
                Tạo và quản lý các chương trình khuyến mãi, tin tức
              </p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Thêm bài viết
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-6">
            {newsData.newsList.map((item) => (
              <NewsCard
                key={item.id}
                item={item}
                getStatus={getStatus}
                getStatusColor={getStatusColor}
                onEdit={(item) => {
                  setUpdateItem(item);
                  setShowModal(true);
                  setFormData(item);
                }}
                onDelete={handleDeleteClick}
              />
            ))}
          </div>

          <ModalAddNewsAndPromotion
            showModal={showModal}
            setShowModal={setShowModal}
            formData={formData}
            updateField={updateField}
            handleSubmit={handleSubmit}
            handleCancel={() => {
              setUpdateItem(null);
              setFormData(initialNews);
            }}
          />

          {showDeleteModal && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
              <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full animate-in zoom-in duration-300 border border-white/20 overflow-hidden">
                {/* Header */}
                <div className="bg-linear-to-r from-red-500 to-pink-600 p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center shadow-lg">
                        <AlertTriangle className="w-7 h-7 text-white" />
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
      </div>
    </div>
  );
}
