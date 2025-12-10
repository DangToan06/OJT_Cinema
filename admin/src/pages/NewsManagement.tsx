import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Eye, Calendar, AlertTriangle } from 'lucide-react';
import { X, FileText, Tag } from 'lucide-react';
import type { InitialNewsState, News } from '../util/news.interface';
import { v4 as uuidv4 } from 'uuid';
import { PictureOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../hook/useRedux';
import { createNews, deleteNews, getAllNews } from '../api/news.api';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
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

    const [formData, setFormData] = useState<News>({
        title: '',
        content: '',
        created_at: '',
        id: '',
        bannerUrl: '',
        category: 'news',
        dayBegin: '',
        dayEnd: '',
    });

    const handleSubmit = () => {
        const newData = {
            ...formData,
            id: uuidv4(),
            created_at: new Date().toISOString(),
        };

        setFormData(newData);
        dispatch(createNews(newData));
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

        setShowDeleteModal(false);
        setSelectedItem(null);
    };

    const updateField = (field: keyof News, value: string) => {
        setFormData({ ...formData, [field]: value });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Đang hoạt động':
                return 'bg-green-100 text-green-700';
            case 'Sắp diễn ra':
                return 'bg-blue-100 text-blue-700';
            case 'Đã kết thúc':
                return 'bg-gray-100 text-gray-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    const getStatus = (dayBegin: string, dayEnd: string): string => {
        const now = new Date();
        const begin = new Date(dayBegin);
        const end = new Date(dayEnd);

        if (now < begin) return 'Sắp diễn ra';
        if (now >= begin && now <= end) return 'Đang hoạt động';
        return 'Đã kết thúc';
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-gray-900 mb-2 font-bold text-2xl">
                        Quản lý tin tức & khuyến mãi
                    </h1>
                    <p className="text-gray-600">
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
                {newsData.newsList.map((item) => {
                    const status = getStatus(item.dayBegin, item.dayEnd);
                    return (
                        <div
                            key={item.id}
                            className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                        >
                            <div className="relative">
                                <div className="aspect-video overflow-hidden">
                                    <img
                                        src={item.bannerUrl}
                                        alt={item.title}
                                        className="w-full h-full object-cover will-change-transform group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>

                                <div className="absolute inset-y-0 right-0 flex items-start p-4">
                                    <span
                                        className={`px-4 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm ${getStatusColor(
                                            status
                                        )}`}
                                    >
                                        {status}
                                    </span>
                                </div>
                            </div>

                            <div className="p-2 flex flex-col gap-[5px]">
                                <h3 className="text-[18px] font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                    {item.title.length > 60
                                        ? item.title.slice(0, 60) + '...'
                                        : item.title}
                                </h3>

                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {item.content.length > 81
                                        ? item.content.slice(0, 80) + '...'
                                        : item.content}
                                </p>

                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                    <div className="flex items-center gap-1.5">
                                        <Calendar className="w-4 h-4" />
                                        <span>
                                            {dayjs(item.dayBegin)
                                                .utc()
                                                .format('DD/MM/YYYY')}
                                        </span>
                                    </div>
                                    <span className="text-gray-300">→</span>
                                    <div className="flex items-center gap-1.5">
                                        <Calendar className="w-4 h-4" />
                                        <span>
                                            {dayjs(item.dayEnd)
                                                .utc()
                                                .format('DD/MM/YYYY')}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                        <Eye className="w-4 h-4" />
                                        <span className="font-medium">
                                            1000
                                        </span>
                                        <span>lượt xem</span>
                                    </div>

                                    <div className="flex gap-2">
                                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 hover:scale-110">
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 hover:scale-110"
                                            onClick={() =>
                                                handleDeleteClick(item)
                                            }
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
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden">
                        {/* Header */}
                        <div className="bg-linear-to-r from-red-600 to-red-700 px-6 py-2 flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-bold text-white">
                                    Tạo bài viết mới
                                </h2>
                                <p className="text-red-100 text-sm">
                                    Chia sẻ tin tức hoặc khuyến mãi
                                </p>
                            </div>
                            <button
                                onClick={() => setShowModal(false)}
                                className="p-2 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
                            >
                                <X className="w-5 h-5 text-white" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                            {/* Category */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Loại bài viết
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        onClick={() =>
                                            updateField('category', 'news')
                                        }
                                        className={`p-3 rounded-lg border-2 transition-all ${
                                            formData.category === 'news'
                                                ? 'border-red-600 bg-red-50 text-red-700'
                                                : 'border-gray-200 hover:border-gray-300 text-gray-600'
                                        }`}
                                    >
                                        <FileText className="w-5 h-5 mx-auto mb-1" />
                                        <span className="font-medium text-sm">
                                            Tin tức
                                        </span>
                                    </button>
                                    <button
                                        onClick={() =>
                                            updateField('category', 'promotion')
                                        }
                                        className={`p-3 rounded-lg border-2 transition-all ${
                                            formData.category === 'promotion'
                                                ? 'border-red-600 bg-red-50 text-red-700'
                                                : 'border-gray-200 hover:border-gray-300 text-gray-600'
                                        }`}
                                    >
                                        <Tag className="w-5 h-5 mx-auto mb-1" />
                                        <span className="font-medium text-sm">
                                            Khuyến mãi
                                        </span>
                                    </button>
                                </div>
                            </div>

                            {/* Title */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Tiêu đề{' '}
                                    <span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) =>
                                        updateField('title', e.target.value)
                                    }
                                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                                    placeholder="VD: Giảm giá 50% vé xem phim mỗi thứ 3"
                                />
                            </div>

                            {/* Content */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Nội dung{' '}
                                    <span className="text-red-600">*</span>
                                </label>
                                <textarea
                                    rows={4}
                                    value={formData.content}
                                    onChange={(e) =>
                                        updateField('content', e.target.value)
                                    }
                                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
                                    placeholder="Mô tả chi tiết về chương trình..."
                                />
                                <div className="text-xs text-gray-500 text-right mt-1">
                                    {formData.content.length} ký tự
                                </div>
                            </div>

                            {/* Image URL */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Hình ảnh (URL)
                                </label>
                                <input
                                    type="url"
                                    value={formData.bannerUrl}
                                    onChange={(e) =>
                                        updateField('bannerUrl', e.target.value)
                                    }
                                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                                    placeholder="https://example.com/image.jpg"
                                />

                                <div className="mt-3 rounded-lg overflow-hidden border-2 border-gray-200 aspect-video w-full flex justify-center bg-gray-200">
                                    {formData.bannerUrl ? (
                                        <img
                                            src={formData.bannerUrl}
                                            alt="Preview"
                                            className="w-full h-full object-cover"
                                            onError={(e) =>
                                                (e.currentTarget.style.display =
                                                    'none')
                                            }
                                        />
                                    ) : (
                                        <PictureOutlined
                                            style={{
                                                fontSize: 50,
                                                color: 'gray',
                                            }}
                                        />
                                    )}
                                </div>
                            </div>

                            {/* Date Range */}
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Ngày bắt đầu{' '}
                                        <span className="text-red-600">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        value={formData.dayBegin}
                                        onChange={(e) =>
                                            updateField(
                                                'dayBegin',
                                                e.target.value
                                            )
                                        }
                                        className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Ngày kết thúc{' '}
                                        <span className="text-red-600">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        value={formData.dayEnd}
                                        onChange={(e) =>
                                            updateField(
                                                'dayEnd',
                                                e.target.value
                                            )
                                        }
                                        className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="flex gap-3 px-6 pb-4 border-gray-200 bg-gray-50">
                            <button
                                onClick={() => setShowModal(false)}
                                className="flex-1 px-4 py-2.5 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-white transition-colors cursor-pointer"
                            >
                                Hủy bỏ
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="flex-1 px-4 py-2.5 bg-linear-to-r from-red-600 to-red-700 text-white font-medium rounded-lg hover:from-red-700 hover:to-red-800 transition-colors cursor-pointer"
                            >
                                Xuất bản
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* modal xóa bài viết */}
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
                                    className="p-2 hover:bg-white/20 rounded-xl transition-all duration-200"
                                >
                                    <X className="w-6 h-6 text-white" />
                                </button>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-7">
                            <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                                Bạn có chắc chắn muốn xóa tin tức này không?
                                <span className="font-semibold text-red-600">
                                    {' '}
                                    Hành động này không thể hoàn tác.
                                </span>
                            </p>

                            {selectedItem && (
                                <div className="bg-linear-to-br from-gray-50 to-gray-100 rounded-2xl p-5 border-2 border-gray-200 mb-6 shadow-inner">
                                    <p className="font-bold text-gray-900 mb-2 text-lg">
                                        {selectedItem.title}
                                    </p>
                                </div>
                            )}

                            {/* Buttons */}
                            <div className="flex gap-4">
                                <button
                                    onClick={handleCancelDelete}
                                    className="flex-1 px-6 py-4 bg-linear-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 font-bold rounded-2xl transition-all duration-300 hover:shadow-lg"
                                >
                                    Hủy bỏ
                                </button>

                                <button
                                    onClick={handleConfirmDelete}
                                    className="flex-1 px-6 py-4 bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold rounded-2xl transition-all duration-300 hover:shadow-xl hover:shadow-red-500/40 hover:scale-105"
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
