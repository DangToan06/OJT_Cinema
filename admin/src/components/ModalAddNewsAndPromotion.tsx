import { X, FileText, Tag } from 'lucide-react';
import { PictureOutlined } from '@ant-design/icons';
import type { News } from '../util/news.interface';

interface NewsModalProps {
    showModal: boolean;
    setShowModal: (value: boolean) => void;
    formData: News;
    updateField: (field: keyof News, value: string) => void;
    handleSubmit: () => void;
    handleCancel: () => void;
}

const inputClass =
    'w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg ' +
    'focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all';

export default function ModalAddNewsAndPromotion({
    showModal,
    setShowModal,
    formData,
    updateField,
    handleSubmit,
    handleCancel,
}: NewsModalProps) {
    if (!showModal) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden">
                {/* ===== HEADER ===== */}
                <div className="bg-linear-to-r from-red-600 to-red-700 px-6 py-3 flex items-center justify-between">
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
                        className="p-2 rounded-full hover:bg-white/20 transition-colors"
                    >
                        <X className="w-5 h-5 text-white" />
                    </button>
                </div>

                {/* ===== CONTENT ===== */}
                <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
                    {/* Category */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Loại bài viết
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                type="button"
                                onClick={() => updateField('category', 'news')}
                                className={`p-3 rounded-lg border-2 transition-all ${
                                    formData.category === 'news'
                                        ? 'border-red-600 bg-red-50 text-red-700'
                                        : 'border-gray-200 hover:border-gray-300 text-gray-600'
                                }`}
                            >
                                <FileText className="w-5 h-5 mx-auto mb-1" />
                                <span className="text-sm font-medium">
                                    Tin tức
                                </span>
                            </button>

                            <button
                                type="button"
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
                                <span className="text-sm font-medium">
                                    Khuyến mãi
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Tiêu đề <span className="text-red-600">*</span>
                        </label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) =>
                                updateField('title', e.target.value)
                            }
                            placeholder="VD: Giảm giá 50% vé xem phim"
                            className={inputClass}
                        />
                    </div>

                    {/* Content */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Nội dung <span className="text-red-600">*</span>
                        </label>
                        <textarea
                            rows={4}
                            value={formData.content}
                            onChange={(e) =>
                                updateField('content', e.target.value)
                            }
                            placeholder="Mô tả chi tiết chương trình..."
                            className={`${inputClass} resize-none`}
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
                            placeholder="https://example.com/banner.jpg"
                            className={inputClass}
                        />

                        <div className="mt-3 aspect-video rounded-lg overflow-hidden border-2 border-gray-200 bg-gray-100 flex items-center justify-center">
                            {formData.bannerUrl ? (
                                <img
                                    src={formData.bannerUrl}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                    onError={(e) =>
                                        (e.currentTarget.style.display = 'none')
                                    }
                                />
                            ) : (
                                <PictureOutlined
                                    style={{
                                        fontSize: 48,
                                        color: '#9ca3af',
                                    }}
                                />
                            )}
                        </div>
                    </div>

                    {/* Date */}
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Ngày bắt đầu
                            </label>
                            <input
                                type="date"
                                value={formData.dayBegin}
                                onChange={(e) =>
                                    updateField('dayBegin', e.target.value)
                                }
                                className={inputClass}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Ngày kết thúc
                            </label>
                            <input
                                type="date"
                                value={formData.dayEnd}
                                onChange={(e) =>
                                    updateField('dayEnd', e.target.value)
                                }
                                className={inputClass}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex gap-3 px-6 py-4 bg-gray-50 border-t">
                    <button
                        type="button"
                        onClick={() => {
                            setShowModal(false);
                            handleCancel();
                        }}
                        className="flex-1 px-4 py-2.5 border-2 border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-white transition-colors cursor-pointer"
                    >
                        Hủy bỏ
                    </button>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="flex-1 px-4 py-2.5 bg-linear-to-r from-red-600 to-red-700 text-white font-medium rounded-lg hover:from-red-700 hover:to-red-800 transition-colors cursor-pointer"
                    >
                        Xuất bản
                    </button>
                </div>
            </div>
        </div>
    );
}
