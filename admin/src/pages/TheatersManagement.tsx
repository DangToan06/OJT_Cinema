import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import {
    Plus,
    Edit,
    Trash2,
    MapPin,
    Phone,
    Globe,
    Theater,
    ToggleRight,
    ToggleLeft,
    X,
    AlertTriangle,
} from 'lucide-react';
import type {
    StatusButtonProps,
    ITheater,
    InitialTheaterState,
} from '../interfaces/theater.interface';
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch, useAppSelector } from '../hook/useRedux';
import {
    createTheater,
    deleteTheater,
    getAllTheaters,
    updateStatusTheater,
} from '../api/theater.api';
import { notify } from '../util/toast';

export function TheatersManagement() {
    const dataTheaters: InitialTheaterState = useAppSelector((s) => s.theater);
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (dataTheaters.theaters.length === 0) {
            dispatch(getAllTheaters());
        }
    });

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [formData, setFormData] = useState<Omit<ITheater, 'id'>>({
        name: '',
        address: '',
        phone: '',
        website: '',
        screens: 0,
        status: 'Đang hoạt động',
    });

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [theaterToDelete, setTheaterToDelete] = useState<ITheater | null>(
        null
    );

    const handleDeleteClick = (theater: ITheater) => {
        setTheaterToDelete(theater);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (theaterToDelete) {
            dispatch(deleteTheater(theaterToDelete.id));
            notify.success('Xóa rạp chiếu phim thành công');
            setIsDeleteModalOpen(false);
            setTheaterToDelete(null);
        }
    };

    const handleCancelDelete = () => {
        setIsDeleteModalOpen(false);
        setTheaterToDelete(null);
    };

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newTheater = {
            id: uuidv4(),
            ...formData,
            screens: Number(formData.screens),
        };
        dispatch(createTheater(newTheater));
        notify.success('Thêm rạp chiếu phim thành công');
        setIsModalOpen(false);

        setFormData({
            name: '',
            address: '',
            phone: '',
            website: '',
            screens: 0,
            status: 'Đang hoạt động',
        });
    };

    const StatusButton = ({ status, onToggle }: StatusButtonProps) => {
        return (
            <button
                onClick={onToggle}
                className="px-2 bg-white w-fit backdrop-blur-sm hover:bg-white text-purple-600 rounded-lg transition-all hover:scale-110 shadow-lg cursor-pointer"
                title="Đổi trạng thái"
            >
                {status === 'Đang hoạt động' ? (
                    <ToggleRight size={25} className="text-purple-600" />
                ) : (
                    <ToggleLeft size={25} className="text-purple-600" />
                )}
            </button>
        );
    };

    const toggleStatus = (id: string) => {
        dispatch(
            updateStatusTheater({
                id,
                status:
                    dataTheaters.theaters.find((theater) => theater.id === id)
                        ?.status === 'Đang hoạt động'
                        ? 'Ngừng hoạt động'
                        : 'Đang hoạt động',
            })
        );
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-gray-200 mb-2 font-bold text-2xl">
                        Quản lý rạp chiếu
                    </h1>
                    <p className="text-gray-300">
                        Thêm, chỉnh sửa và quản lý thông tin rạp chiếu
                    </p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center cursor-pointer gap-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    Thêm rạp mới
                </button>
            </div>
            {/* Theaters Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {dataTheaters.theaters.map((theater) => (
                    <div
                        key={theater.id}
                        className="group bg-gray-800 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-400"
                    >
                        {/* Header */}
                        <div className=" p-5 bg-linear-to-r from-purple-700 to-indigo-700 flex justify-between">
                            <div>
                                <h3 className="text-white text-2xl font-bold mb-3 pr-20">
                                    {theater.name}
                                </h3>

                                <span
                                    className={`inline-block px-3 py-1.5 rounded-full text-xs font-semibold ${
                                        theater.status === 'Đang hoạt động'
                                            ? 'bg-green-500 text-white'
                                            : 'bg-amber-500 text-white'
                                    }`}
                                >
                                    {theater.status}
                                </span>
                            </div>

                            <div className="h-fit flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <StatusButton
                                    status={theater.status}
                                    onToggle={() => toggleStatus(theater.id)}
                                />

                                <button className="p-2 bg-white/90 backdrop-blur-sm hover:bg-white text-blue-600 rounded-lg transition-all hover:scale-110 shadow-lg cursor-pointer">
                                    <Edit className="w-5 h-5" />
                                </button>

                                <button
                                    className="p-2 bg-white/90 backdrop-blur-sm hover:bg-white text-red-600 rounded-lg transition-all hover:scale-110 shadow-lg cursor-pointer"
                                    onClick={() => handleDeleteClick(theater)}
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-4 px-6 pb-2">
                            <div>
                                {/* Address */}
                                <div className="flex items-start gap-3 group/item py-2 rounded-lg transition-colors">
                                    <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600 group-hover/item:bg-indigo-100 transition-colors">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs text-gray-200 mb-0.5">
                                            Địa chỉ
                                        </p>
                                        <p className="text-sm text-gray-300 font-medium">
                                            {theater.address}
                                        </p>
                                    </div>
                                </div>

                                {/* Phone */}
                                <div className="flex items-start gap-3 group/item  py-2 rounded-lg transition-colors">
                                    <div className="p-2 bg-green-50 rounded-lg text-green-600 group-hover/item:bg-green-100 transition-colors">
                                        <Phone className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs text-gray-200 mb-0.5">
                                            Số điện thoại
                                        </p>
                                        <p className="text-sm text-gray-300 font-medium">
                                            {theater.phone}
                                        </p>
                                    </div>
                                </div>

                                {/* Website */}
                                <div className="flex items-start gap-3 group/item py-2 rounded-lg transition-colors">
                                    <div className="p-2 bg-blue-50 rounded-lg text-blue-600 group-hover/item:bg-blue-100 transition-colors">
                                        <Globe className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs text-gray-200 mb-0.2">
                                            Website
                                        </p>
                                        <a
                                            href={`https://${theater.website}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm text-[#c79d20] hover:text-[#dfa906] font-medium hover:underline"
                                        >
                                            {theater.website}
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="p-2 m-2 pt-4 ml-0 pl-0 border-t border-gray-400">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-gray-200">
                                        <div className="p-2 bg-purple-50 rounded-lg">
                                            <Theater className="w-5 h-5 text-purple-600" />
                                        </div>
                                        <span className="text-[15px] font-medium">
                                            Phòng chiếu
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl font-bold text-orange-700">
                                            {theater.screens}
                                        </span>
                                        <span className="text-[15px] text-gray-200">
                                            phòng
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* Add Theater Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        {/* Header */}
                        <div
                            className="sticky top-0 bg-linear-to-r from-purple-700 to-indigo-700 
                      text-white p-4 rounded-t-2xl flex items-center justify-between"
                        >
                            <div>
                                <h2 className="text-[22px] font-bold mb-1">
                                    Thêm Rạp Chiếu Phim Mới
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
                                    Tên Rạp{' '}
                                    <span className="text-red-500">*</span>
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
                                    Địa Chỉ{' '}
                                    <span className="text-red-500">*</span>
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
                                        Website{' '}
                                        <span className="text-red-500">*</span>
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

                            {/* Screens + Status */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Số Phòng Chiếu{' '}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        name="screens"
                                        min="1"
                                        required
                                        value={formData.screens}
                                        onChange={handleInputChange}
                                        placeholder="VD: 8"
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl 
                         focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
                                    />
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
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
                                    Thêm Rạp
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {/* Delete Confirmation Modal */}
            {isDeleteModalOpen && theaterToDelete && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
                        {/* Header */}
                        <div className="bg-linear-to-r from-red-600 to-red-700 text-white p-6 rounded-t-2xl">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white/20 rounded-lg">
                                    <AlertTriangle className="w-6 h-6" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold">
                                        Xác Nhận Xóa
                                    </h2>
                                    <p className="text-red-100 text-sm mt-1">
                                        Hành động này không thể hoàn tác
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Body */}
                        <div className="p-6">
                            <p className="text-gray-700 mb-4">
                                Bạn có chắc chắn muốn xóa rạp chiếu phim này
                                không?
                            </p>

                            <div className="bg-gray-50 rounded-xl p-4 mb-6">
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-red-100 rounded-lg">
                                        <Theater className="w-5 h-5 text-red-600" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900 mb-1">
                                            {theaterToDelete.name}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            {theaterToDelete.address}
                                        </p>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {theaterToDelete.screens} phòng
                                            chiếu
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-3">
                                <button
                                    onClick={handleCancelDelete}
                                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold 
                        rounded-xl hover:bg-gray-50 transition-all cursor-pointer"
                                >
                                    Hủy
                                </button>

                                <button
                                    onClick={handleConfirmDelete}
                                    className="flex-1 px-6 py-3 bg-linear-to-r from-red-600 to-red-700
                        hover:from-red-700 hover:to-red-800 text-white font-semibold 
                        rounded-xl transition-all hover:scale-105 hover:shadow-xl cursor-pointer"
                                >
                                    Xóa Rạp
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
