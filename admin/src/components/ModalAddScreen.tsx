import { useState } from 'react';
import { X } from 'lucide-react';
import type { IScreen } from '../interfaces/screen.interface';
import { SCREEN_TYPE_LIMITS } from '../interfaces/screen.interface';
import { useAppDispatch, useAppSelector } from '../hook/useRedux';
import { createScreen } from '../api/screen.api';
import { notify } from '../util/toast';

interface ModalAddScreenProps {
    open: boolean;
    onClose: () => void;
}

export default function ModalAddScreen({ open, onClose }: ModalAddScreenProps) {
    const dispatch = useAppDispatch();
    const theatersData = useAppSelector((s) => s.theater.theaters);
    const [formData, setFormData] = useState<Omit<IScreen, 'id'>>({
        name: '',
        theaterId: '',
        theater: '',
        type: null,
        row: 0,
        column: 0,
        status: 'Đang hoạt động',
        capacity: 0,
    });

    const [hasChosenType, setHasChosenType] = useState(false);

    const theaters = theatersData.map((t) => ({ id: t.id, name: t.name }));

    // Tính sức chứa (row * column) và giới hạn theo loại phòng
    const capacity = formData.row * formData.column;
    const limits = formData.type
        ? SCREEN_TYPE_LIMITS[formData.type]
        : { minRow: 0, maxRow: 0, minCol: 0, maxCol: 0 };

    const handleInputChange = (name: string, value: string | number) => {
        if (name === 'theaterId') {
            const selectedTheater = theaters.find((t) => t.id === value);
            setFormData({
                ...formData,
                theaterId: value as string,
                theater: selectedTheater ? selectedTheater.name : '',
            });
            return;
        }

        if (name === 'type') {
            const allowed = ['Mini', 'Standard', 'IMAX', 'Large'] as const;
            const isAllowed = (v: unknown): v is (typeof allowed)[number] =>
                typeof v === 'string' &&
                allowed.includes(v as (typeof allowed)[number]);

            const newType = isAllowed(value) ? value : null;
            const newLimits = newType
                ? SCREEN_TYPE_LIMITS[newType]
                : { minRow: 0, maxRow: 0, minCol: 0, maxCol: 0 };
            if (newType !== null) {
                setHasChosenType(true);
            }
            setFormData({
                ...formData,
                type: newType,
                row:
                    newType === null
                        ? 0
                        : Math.floor((newLimits.minRow + newLimits.maxRow) / 2),
                column:
                    newType === null
                        ? 0
                        : Math.floor((newLimits.minCol + newLimits.maxCol) / 2),
            });
            return;
        }

        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        if (!formData.name || !formData.theaterId) {
            notify.warning('Vui lòng điền đầy đủ thông tin');
            return;
        }

        if (formData.type === null) {
            notify.warning('Vui lòng chọn loại phòng hợp lệ');
            return;
        }

        if (formData.row < limits.minRow || formData.row > limits.maxRow) {
            notify.warning(
                `Số hàng phải từ ${limits.minRow} đến ${limits.maxRow} với loại ${formData.type}`
            );
            return;
        }

        if (
            formData.column < limits.minCol ||
            formData.column > limits.maxCol
        ) {
            notify.warning(
                `Số cột phải từ ${limits.minCol} đến ${limits.maxCol} với loại ${formData.type}`
            );
            return;
        }

        const newScreen: IScreen = {
            id: crypto.randomUUID(),
            name: formData.name,
            theaterId: formData.theaterId,
            theater: formData.theater,
            type: formData.type,
            row: formData.row,
            column: formData.column,
            capacity: capacity,
            status: formData.status,
        };

        dispatch(createScreen(newScreen));
        notify.success('Thêm phòng chiếu thành công');
        onClose();
        setFormData({
            name: '',
            theaterId: '',
            theater: '',
            type: null,
            row: 0,
            column: 0,
            status: 'Đang hoạt động',
            capacity: 0,
        });
    };

    return (
        <div>
            {open && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl">
                        {/* Header */}
                        <div className="bg-linear-to-r from-red-600 to-red-700 text-white px-6 py-4 rounded-t-xl flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-bold">
                                    Thêm Phòng Chiếu
                                </h2>
                                <p className="text-red-100 text-sm mt-0.5">
                                    Cấu hình thông tin phòng chiếu
                                </p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-6 space-y-5">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Tên phòng{' '}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) =>
                                            handleInputChange(
                                                'name',
                                                e.target.value
                                            )
                                        }
                                        placeholder="Phòng 1"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none text-sm"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Rạp chiếu{' '}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={formData.theaterId}
                                        onChange={(e) =>
                                            handleInputChange(
                                                'theaterId',
                                                e.target.value
                                            )
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none text-sm"
                                    >
                                        <option value="">Chọn rạp</option>
                                        {theaters.map((theater) => (
                                            <option
                                                key={theater.id}
                                                value={theater.id}
                                            >
                                                {theater.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Row 2: Loại phòng */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Loại phòng{' '}
                                    <span className="text-red-500">*</span>
                                </label>
                                <div className="grid grid-cols-4 gap-2">
                                    {(
                                        [
                                            'Mini',
                                            'Standard',
                                            'IMAX',
                                            'Large',
                                        ] as const
                                    ).map((type) => (
                                        <button
                                            key={type}
                                            onClick={() =>
                                                handleInputChange('type', type)
                                            }
                                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                                                formData.type === type
                                                    ? 'bg-red-600 text-white shadow-md'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                    <button
                                        onClick={() =>
                                            handleInputChange(
                                                'type',
                                                '' as unknown as number
                                            )
                                        }
                                        disabled={hasChosenType}
                                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                                            formData.type === null
                                                ? 'bg-gray-300 text-gray-800'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        } ${
                                            hasChosenType
                                                ? 'opacity-60 cursor-not-allowed'
                                                : ''
                                        }`}
                                    >
                                        Không chọn
                                    </button>
                                </div>
                            </div>

                            {/* Row 3: Cấu hình ghế */}
                            <div className="bg-gray-50 rounded-lg p-4">
                                <p className="text-sm font-medium text-gray-700 mb-3">
                                    Cấu hình sơ đồ ghế
                                    <span className="text-xs text-gray-500 ml-2">
                                        (Hàng: {limits.minRow}-{limits.maxRow} |
                                        Cột: {limits.minCol}-{limits.maxCol})
                                    </span>
                                </p>
                                <div className="grid grid-cols-3 gap-3">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-600 mb-1">
                                            Số hàng
                                        </label>
                                        <input
                                            type="number"
                                            min={limits.minRow}
                                            max={limits.maxRow}
                                            value={formData.row}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    'row',
                                                    e.target.value
                                                )
                                            }
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none text-sm"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium text-gray-600 mb-1">
                                            Số cột
                                        </label>
                                        <input
                                            type="number"
                                            min={limits.minCol}
                                            max={limits.maxCol}
                                            value={formData.column}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    'column',
                                                    e.target.value
                                                )
                                            }
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none text-sm"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium text-gray-600 mb-1">
                                            Sức chứa
                                        </label>
                                        <div className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm font-semibold text-gray-900 flex items-center justify-center">
                                            {capacity} ghế
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Preview mini */}
                            <div className="bg-gray-50 rounded-lg p-3">
                                <p className="text-xs font-medium text-gray-600 mb-2 text-center">
                                    Xem trước: {formData.row} hàng x{' '}
                                    {formData.column} ghế
                                </p>
                                <div className="flex flex-col items-center gap-1.5">
                                    <div className="w-30 h-1 bg-linear-to-b from-gray-400 to-gray-300 rounded-t-full" />
                                    <div
                                        className="grid gap-0.5"
                                        style={{
                                            gridTemplateColumns: `repeat(${Math.min(
                                                formData.column,
                                                20
                                            )}, minmax(0, 1fr))`,
                                        }}
                                    >
                                        {Array.from({
                                            length: Math.min(
                                                formData.row * formData.column,
                                                200
                                            ),
                                        }).map((_, idx) => (
                                            <div
                                                key={idx}
                                                className="w-2 h-2 bg-gray-300 rounded-sm"
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="px-6 pb-6 flex gap-3">
                            <button
                                onClick={onClose}
                                className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all text-sm"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="flex-1 px-4 py-2.5 bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-medium rounded-lg transition-all text-sm shadow-md hover:shadow-lg"
                            >
                                Thêm Phòng
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
