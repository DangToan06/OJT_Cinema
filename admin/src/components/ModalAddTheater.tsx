import { X } from 'lucide-react';
import type { ChangeEvent, FormEvent } from 'react';

interface TheaterFormData {
    name: string;
    address: string;
    phone: string;
    website: string;
    screens: number;
}

interface ModalAddTheaterProps {
    isModalOpen: boolean;
    setIsModalOpen: (value: boolean) => void;
    formData: TheaterFormData;
    handleInputChange: (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
    cancelHandle: () => void;
}

export default function ModalAddTheater({
    isModalOpen,
    setIsModalOpen,
    formData,
    handleInputChange,
    handleSubmit,
    cancelHandle,
}: ModalAddTheaterProps) {
    if (!isModalOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div
                    className="sticky top-0 bg-linear-to-r from-purple-700 to-indigo-700 
                    text-white p-4 rounded-t-2xl flex items-center justify-between"
                >
                    <div>
                        <h2 className="text-[22px] font-bold mb-1">
                            {formData.name
                                ? 'Chỉnh Sửa Rạp'
                                : 'Thêm Rạp Chiếu Phim Mới'}
                        </h2>
                        <p className="text-indigo-100 text-[15px]">
                            Điền thông tin rạp chiếu phim
                        </p>
                    </div>

                    <button
                        onClick={() => setIsModalOpen(false)}
                        className="p-2 hover:bg-white/20 rounded-lg transition-colors cursor-pointer"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Body */}
                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    {/* Tên rạp */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Tên Rạp <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="VD: CGV Vincom Center"
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl 
                            focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
                        />
                    </div>

                    {/* Địa chỉ */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Địa Chỉ <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            name="address"
                            rows={3}
                            required
                            value={formData.address}
                            onChange={handleInputChange}
                            placeholder="VD: 191 Bà Triệu, Hai Bà Trưng, Hà Nội"
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl 
                            focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none resize-none"
                        />
                    </div>

                    {/* Phone + Website */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Số Điện Thoại{' '}
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                required
                                value={formData.phone}
                                onChange={handleInputChange}
                                placeholder="VD: 1900 6017"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl 
                                focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Website <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="website"
                                required
                                value={formData.website}
                                onChange={handleInputChange}
                                placeholder="VD: cgv.vn"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl 
                                focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
                            />
                        </div>
                    </div>

                    {/* Screens */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Số Phòng Chiếu{' '}
                            <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            name="screens"
                            min={1}
                            required
                            value={formData.screens}
                            onChange={handleInputChange}
                            placeholder="VD: 8"
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl 
                            focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={() => {
                                cancelHandle();
                                setIsModalOpen(false);
                            }}
                            className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold 
                            rounded-xl hover:bg-gray-50 transition-all cursor-pointer"
                        >
                            Hủy
                        </button>

                        <button
                            type="submit"
                            className="flex-1 px-6 py-3 bg-linear-to-r from-purple-700 to-indigo-700
                            hover:from-indigo-700 hover:to-purple-700 text-white font-semibold 
                            rounded-xl transition-all hover:scale-105 hover:shadow-xl cursor-pointer"
                        >
                            {formData.name ? 'Lưu Thay Đổi' : 'Thêm Rạp '}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
