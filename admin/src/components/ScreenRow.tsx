import { Film, ToggleRight, ToggleLeft, Edit, Trash2 } from 'lucide-react';
import type { IScreen } from '../interfaces/screen.interface';

interface ScreenRowProps {
    screen: IScreen;
    index: number;
    toggleStatus: (id: string) => void;
    handleDeleteClick: (screen: IScreen) => void;
    handleEditClick: (screen: IScreen) => void;
    openEditModal: () => void;
}

export default function ScreenRow({
    screen,
    index,
    toggleStatus,
    handleDeleteClick,
    handleEditClick,
    openEditModal,
}: ScreenRowProps) {
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
    return (
        <tr className="hover:bg-slate-700/20 transition-colors">
            <td className="px-6 py-4 text-slate-400 font-medium">
                #{index + 1}
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

            <td className="px-6 py-4 text-slate-300">{screen.theater}</td>

            <td className="px-6 py-4 text-slate-400 text-sm">
                {screen.row} x {screen.column}
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
                        onClick={() => toggleStatus(screen.id)}
                        className="p-2 text-purple-400 hover:bg-purple-500/15 rounded-lg transition-all hover:scale-110"
                        title="Đổi trạng thái"
                    >
                        {screen.status === 'Đang hoạt động' ? (
                            <ToggleRight className="w-5 h-5" />
                        ) : (
                            <ToggleLeft className="w-5 h-5" />
                        )}
                    </button>

                    <button
                        onClick={() => {
                            handleEditClick(screen);
                            openEditModal();
                        }}
                        className="p-2 text-blue-400 hover:bg-blue-500/15 rounded-lg transition-all hover:scale-110"
                    >
                        <Edit className="w-5 h-5" />
                    </button>

                    <button
                        onClick={() => handleDeleteClick(screen)}
                        className="p-2 text-rose-400 hover:bg-rose-500/15 rounded-lg transition-all hover:scale-110"
                    >
                        <Trash2 className="w-5 h-5" />
                    </button>
                </div>
            </td>
        </tr>
    );
}
