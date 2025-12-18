import {
    Edit,
    Trash2,
    MapPin,
    Phone,
    Globe,
    Theater,
    ToggleRight,
    ToggleLeft,
} from 'lucide-react';
import type {
    ITheater,
    StatusButtonProps,
} from '../interfaces/theater.interface';

interface TheaterCardProps {
    theater: ITheater;
    toggleStatus: (id: string) => void;
    handleDeleteClick: (theater: ITheater) => void;
    handleEditClick: (theater: ITheater) => void;
}

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

export default function TheaterCard({
    theater,
    toggleStatus,
    handleDeleteClick,
    handleEditClick,
}: TheaterCardProps) {
    return (
        <div className="group bg-gray-800 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-400">
            {/* Header */}
            <div className="p-5 bg-linear-to-r from-purple-700 to-indigo-700 flex justify-between">
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

                    <button
                        onClick={() => handleEditClick(theater)}
                        className="p-2 bg-white/90 backdrop-blur-sm hover:bg-white text-blue-600 rounded-lg transition-all hover:scale-110 shadow-lg cursor-pointer"
                    >
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
                    <div className="flex items-start gap-3 group/item py-2 rounded-lg transition-colors">
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
    );
}
