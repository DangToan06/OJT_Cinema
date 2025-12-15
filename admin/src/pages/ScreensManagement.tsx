import { useEffect, useState } from "react";
import {
    Plus,
    Edit,
    Trash2,
    AlertTriangle,
    Film,
    ToggleRight,
    ToggleLeft,
    Search,
    Filter,
    Theater,
} from 'lucide-react';
import type {
  InitialScreenState,
  IScreen,
} from "../interfaces/screen.interface";
import { useAppDispatch, useAppSelector } from "../hook/useRedux";
import {
    deleteScreen,
    getAllScreens,
    updateScreenStatus,
} from '../api/screen.api';
import ModalAddScreen from '../components/ModalAddScreen';
import { notify } from '../util/toast';

export function ScreensManagement() {
    const dataScreens: InitialScreenState = useAppSelector((s) => s.screen);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (dataScreens.screens.length === 0) {
            dispatch(getAllScreens());
        }
    }, [dispatch, dataScreens.screens.length]);

    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [screenToDelete, setScreenToDelete] = useState<IScreen | null>(null);
    const [filterTheater, setFilterTheater] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredScreens = dataScreens.screens.filter((screen) => {
        const matchesTheater = filterTheater === 'all' || screen.theater === filterTheater;
        const matchesSearch = screen.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            screen.theater.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesTheater && matchesSearch;
    });

  const theaters = [...new Set(dataScreens.screens.map((s) => s.theater))];

    const getTypeColor = (type: string | null) => {
        switch (type) {
            case 'Mini':
                return 'bg-blue-500/15 text-blue-300 border border-blue-500/30';
            case 'Standard':
                return 'bg-purple-500/15 text-purple-300 border border-purple-500/30';
            case 'IMAX':
                return 'bg-rose-500/15 text-rose-300 border border-rose-500/30';
            case 'Large':
                return 'bg-amber-500/15 text-amber-300 border border-amber-500/30';
            default:
                return 'bg-slate-500/15 text-slate-300 border border-slate-500/30';
        }
    };

    const getStatusColor = (status: string) => {
        return status === 'Đang hoạt động'
            ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
            : 'bg-orange-500/15 text-orange-300 border border-orange-500/30';
    };

    const toggleStatus = (id: string) => {
        dispatch(
            updateScreenStatus({
                id,
                status:
                    dataScreens.screens.find((screen) => screen.id === id)
                        ?.status === 'Đang hoạt động'
                        ? 'Ngừng hoạt động'
                        : 'Đang hoạt động',
            })
        );
        notify.success('Cập nhật trạng thái phòng chiếu thành công');
    };

  const handleDeleteClick = (screen: IScreen) => {
    setScreenToDelete(screen);
    setShowDeleteModal(true);
  };

    const handleConfirmDelete = () => {
        if (screenToDelete) {
            dispatch(deleteScreen(screenToDelete.id));
            setShowDeleteModal(false);
            setScreenToDelete(null);
        }
    };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setScreenToDelete(null);
  };

    return (
        <div className="min-h-screen">
            {/* Header Section */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-3xl font-bold bg-linear-to-r from-white to-slate-300 bg-clip-text text-transparent mb-2">
                            Quản lý phòng chiếu
                        </h1>
                        <p className="text-slate-400">
                            Thêm, chỉnh sửa và quản lý phòng chiếu cho từng rạp
                        </p>
                    </div>
                    <button
                        onClick={() => setShowModal(true)}
                        className="flex items-center gap-2 bg-linear-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl transition-all hover:scale-105 hover:shadow-lg hover:shadow-rose-500/30 font-medium"
                    >
                        <Plus className="w-5 h-5" />
                        Thêm phòng chiếu
                    </button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="relative bg-gray-800 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-5 hover:border-slate-600/50 transition-all group overflow-hidden">
                        <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative flex items-center justify-between">
                            <div>
                                <p className="text-gray-300 text-sm font-medium">Tổng phòng</p>
                                <p className="text-3xl font-bold text-white mt-2">
                                    {dataScreens.screens.length}
                                </p>
                            </div>
                            <div className="p-3 bg-blue-500/10 rounded-xl ring-1 ring-blue-500/20">
                                <Film className="w-7 h-7 text-blue-400" />
                            </div>
                        </div>
                    </div>

                    <div className="relative bg-gray-800 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-5 hover:border-slate-600/50 transition-all group overflow-hidden">
                        <div className="absolute inset-0 bg-linear-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative flex items-center justify-between">
                            <div>
                                <p className="text-slate-400 text-sm font-medium">Đang hoạt động</p>
                                <p className="text-3xl font-bold text-white mt-2">
                                    {dataScreens.screens.filter(s => s.status === 'Đang hoạt động').length}
                                </p>
                            </div>
                            <div className="p-3 bg-emerald-500/10 rounded-xl ring-1 ring-emerald-500/20">
                                <ToggleRight className="w-7 h-7 text-emerald-400" />
                            </div>
                        </div>
                    </div>

                    <div className="relative bg-gray-800 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-5 hover:border-slate-600/50 transition-all group overflow-hidden">
                        <div className="absolute inset-0 bg-linear-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative flex items-center justify-between">
                            <div>
                                <p className="text-slate-400 text-sm font-medium">Tổng ghế</p>
                                <p className="text-3xl font-bold text-white mt-2">
                                    {dataScreens.screens.reduce((sum, s) => sum + s.capacity, 0)}
                                </p>
                            </div>
                            <div className="p-3 bg-purple-500/10 rounded-xl ring-1 ring-purple-500/20">
                                <Film className="w-7 h-7 text-purple-400" />
                            </div>
                        </div>
                    </div>

                    <div className="relative bg-gray-800 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-5 hover:border-slate-600/50 transition-all group overflow-hidden">
                        <div className="absolute inset-0 bg-linear-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative flex items-center justify-between">
                            <div>
                                <p className="text-slate-400 text-sm font-medium">Rạp chiếu</p>
                                <p className="text-3xl font-bold text-white mt-2">
                                    {theaters.length}
                                </p>
                            </div>
                            <div className="p-3 bg-amber-500/10 rounded-xl ring-1 ring-amber-500/20">
                                <Theater className="w-7 h-7 text-amber-400" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filter Section */}
            <div className="bg-linear-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-5 mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm theo tên phòng hoặc rạp..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-transparent transition-all"
                        />
                    </div>
                    <div className="relative">
                        <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <select
                            value={filterTheater}
                            onChange={(e) => setFilterTheater(e.target.value)}
                            className="pl-12 pr-10 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-transparent appearance-none cursor-pointer min-w-[200px] transition-all"
                        >
                            <option value="all">Tất cả rạp</option>
                            {theaters.map((theater) => (
                                <option key={theater} value={theater}>
                                    {theater}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Table Section */}
            <div className="bg-linear-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-slate-700/50 bg-slate-800/30">
                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                                    #
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                                    Tên phòng
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                                    Rạp chiếu
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                                    Cấu hình
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                                    Sức chứa
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                                    Loại phòng
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                                    Trạng thái
                                </th>
                                <th className="px-6 py-4 text-right text-sm font-semibold text-slate-300">
                                    Thao tác
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700/30">
                            {filteredScreens.length > 0 ? (
                                filteredScreens.map((screen, idx) => (
                                    <tr
                                        key={screen.id}
                                        className="hover:bg-slate-700/20 transition-colors"
                                    >
                                        <td className="px-6 py-4 text-slate-400 font-medium">
                                            #{idx + 1}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-rose-500/10 rounded-lg ring-1 ring-rose-500/20">
                                                    <Film className="w-4 h-4 text-rose-400" />
                                                </div>
                                                <span className="text-slate-100 font-medium">
                                                    {screen.name}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-slate-300">
                                            {screen.theater}
                                        </td>
                                        <td className="px-6 py-4 text-slate-400 text-sm">
                                            {screen.row} × {screen.column}
                                        </td>
                                        <td className="px-6 py-4 text-slate-200 font-medium">
                                            {screen.capacity} ghế
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`px-3 py-1.5 rounded-lg text-xs font-medium ${getTypeColor(
                                                    screen.type
                                                )}`}
                                            >
                                                {screen.type ?? 'Chưa chọn'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`px-3 py-1.5 rounded-lg text-xs font-medium ${getStatusColor(
                                                    screen.status
                                                )}`}
                                            >
                                                {screen.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() =>
                                                        toggleStatus(screen.id)
                                                    }
                                                    className="p-2 text-purple-400 hover:bg-purple-500/15 rounded-lg transition-all hover:scale-110"
                                                    title="Đổi trạng thái"
                                                >
                                                    {screen.status ===
                                                    'Đang hoạt động' ? (
                                                        <ToggleRight className="w-5 h-5" />
                                                    ) : (
                                                        <ToggleLeft className="w-5 h-5" />
                                                    )}
                                                </button>
                                                <button className="p-2 text-blue-400 hover:bg-blue-500/15 rounded-lg transition-all hover:scale-110">
                                                    <Edit className="w-5 h-5" />
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleDeleteClick(screen)
                                                    }
                                                    className="p-2 text-rose-400 hover:bg-rose-500/15 rounded-lg transition-all hover:scale-110"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={8}
                                        className="px-6 py-16 text-center"
                                    >
                                        <div className="flex flex-col items-center justify-center">
                                            <div className="p-4 bg-slate-800/50 rounded-full mb-4">
                                                <Film className="w-12 h-12 text-slate-600" />
                                            </div>
                                            <p className="text-slate-400 font-medium">Không tìm thấy phòng chiếu nào</p>
                                            <p className="text-slate-500 text-sm mt-1">Thử thay đổi bộ lọc hoặc tìm kiếm</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modals */}
            <ModalAddScreen
                open={showModal}
                onClose={() => setShowModal(false)}
            />

            {/* Delete Modal */}
            {showDeleteModal && screenToDelete && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
                    <div className="bg-linear-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-2xl shadow-2xl w-full max-w-md">
                        {/* Header */}
                        <div className="bg-linear-to-r from-rose-600 to-pink-600 p-6 rounded-t-2xl">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white/10 backdrop-blur-sm rounded-lg ring-1 ring-white/20">
                                    <AlertTriangle className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-white">
                                        Xác Nhận Xóa
                                    </h2>
                                    <p className="text-rose-100 text-sm mt-1">
                                        Hành động này không thể hoàn tác
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Body */}
                        <div className="p-6">
                            <p className="text-slate-300 mb-4">
                                Bạn có chắc chắn muốn xóa phòng chiếu này không?
                            </p>

                            <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-4 mb-6">
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-rose-500/10 rounded-lg ring-1 ring-rose-500/20">
                                        <Film className="w-5 h-5 text-rose-400" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-slate-100 mb-1">
                                            {screenToDelete.theater}
                                        </p>
                                        <p className="text-sm text-slate-400">
                                            {screenToDelete.name}
                                        </p>
                                        <div className="flex gap-3 mt-2">
                                            <span className="text-sm text-slate-500">
                                                {screenToDelete.capacity} ghế
                                            </span>
                                            <span className="text-sm text-slate-500">
                                                •
                                            </span>
                                            <span className="text-sm text-slate-500">
                                                {screenToDelete.type}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-3">
                                <button
                                    onClick={handleCancelDelete}
                                    className="flex-1 px-6 py-3 border border-slate-600 text-slate-300 font-semibold rounded-xl hover:bg-slate-700/30 transition-all"
                                >
                                    Hủy
                                </button>
                                <button
                                    onClick={handleConfirmDelete}
                                    className="flex-1 px-6 py-3 bg-linear-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white font-semibold rounded-xl transition-all hover:scale-105 hover:shadow-lg hover:shadow-rose-500/30"
                                >
                                    Xóa Phòng
                                </button>
                            </div>
                        </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleCancelDelete}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="flex-1 px-6 py-3 bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-xl transition-all hover:scale-105 hover:shadow-xl cursor-pointer"
                >
                  Xóa Phòng
                </button>
              </div>
            </div>
          </div>
        </div>
    );
}
