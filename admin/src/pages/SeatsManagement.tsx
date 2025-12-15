import { useEffect, useState } from 'react';
import { Armchair, MapPin, Film, Save, RotateCcw } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../hook/useRedux';
import type { Seat, SeatsMap, SeatType } from '../interfaces/seat.interface';
import { getAllTheaters } from '../api/theater.api';
import { getAllScreens } from '../api/screen.api';

export function SeatsManagement() {
    const theaterList = useAppSelector((s) => s.theater.theaters);
    const screenList = useAppSelector((s) => s.screen.screens);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (theaterList.length === 0) {
            dispatch(getAllTheaters());
        }
    }, [dispatch, theaterList.length]);

    useEffect(() => {
        if (screenList.length === 0) {
            dispatch(getAllScreens());
        }
    }, [dispatch, screenList.length]);

    const [selectedTheaterId, setSelectedTheaterId] = useState<string | null>(
        null
    );
    const [selectedScreenId, setSelectedScreenId] = useState<string | null>(
        null
    );

    const seatTypes = [
        {
            id: 'standard',
            label: 'Standard',
            color: 'bg-slate-500',
            price: '75,000',
        },
        { id: 'vip', label: 'VIP', color: 'bg-amber-500', price: '120,000' },
        {
            id: 'sweetbox',
            label: 'Sweetbox',
            color: 'bg-pink-500',
            price: '200,000',
        },
        { id: 'disabled', label: 'Ẩn/Hỏng', color: 'bg-slate-300', price: '-' },
    ];

    const [seats, setSeats] = useState<SeatsMap>(() => {
        const initialSeats: SeatsMap = {};
        screenList.forEach((screen) => {
            initialSeats[screen.id] = [];
            for (let row = 0; row < screen.row; row++) {
                for (let seat = 0; seat < screen.column; seat++) {
                    const isVIP = row >= 4 && row <= 6;
                    const isSweetbox =
                        row === screen.row - 1 && seat >= 5 && seat <= 6;
                    const isDisabled =
                        (row === 2 && seat === 5) || (row === 7 && seat === 9);

                    let type: SeatType = 'standard';
                    if (isDisabled) type = 'disabled';
                    else if (isSweetbox) type = 'sweetbox';
                    else if (isVIP) type = 'vip';

                    initialSeats[screen.id].push({
                        row: String.fromCharCode(65 + row),
                        number: seat + 1,
                        type,
                    });
                }
            }
        });
        return initialSeats;
    });

    const currentScreen = screenList.find((s) => s.id === selectedScreenId);
    const currentSeats = selectedScreenId ? seats[selectedScreenId] || [] : [];

    const toggleSeatType = (row: string, number: number) => {
        if (!selectedScreenId) return;
        setSeats((prev: SeatsMap) => ({
            ...prev,
            [selectedScreenId]: prev[selectedScreenId].map((seat: Seat) => {
                if (seat.row === row && seat.number === number) {
                    const types: SeatType[] = [
                        'standard',
                        'vip',
                        'sweetbox',
                        'disabled',
                    ];
                    const currentIndex = types.indexOf(seat.type);
                    const nextIndex = (currentIndex + 1) % types.length;
                    return { ...seat, type: types[nextIndex] };
                }
                return seat;
            }),
        }));
    };

    const getSeatColor = (type: string) => {
        const typeConfig = seatTypes.find((t) => t.id === type);
        return typeConfig?.color || 'bg-slate-500';
    };

    // Tính kích thước ghế động dựa trên số cột
    const getSeatSize = (columns: number) => {
        if (columns >= 18) return 'w-6 h-6';
        if (columns >= 14) return 'w-7 h-7';
        if (columns >= 10) return 'w-8 h-8';
        return 'w-10 h-10';
    };

    const getIconSize = (columns: number) => {
        if (columns >= 18) return 'w-3 h-3';
        if (columns >= 14) return 'w-3.5 h-3.5';
        if (columns >= 10) return 'w-4 h-4';
        return 'w-5 h-5';
    };

    const getGapSize = (columns: number) => {
        if (columns >= 18) return 'gap-1';
        if (columns >= 14) return 'gap-1.5';
        return 'gap-2';
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
            <div className="mb-8">
                <h1 className="mb-2 font-bold text-3xl bg-linear-to-r from-white to-slate-300 bg-clip-text text-transparent">
                    Quản lý ghế ngồi
                </h1>
                <p className="text-slate-400">
                    Thiết lập và quản lý sơ đồ ghế cho từng phòng chiếu
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                    {/* Theater Selector */}
                    <div className="bg-linear-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-5">
                        <div className="flex items-center gap-2 mb-4">
                            <MapPin className="w-5 h-5 text-rose-400" />
                            <h3 className="text-slate-100 font-semibold">
                                Chọn rạp chiếu
                            </h3>
                        </div>
                        <div className="space-y-2 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                            {theaterList.map((theater) => (
                                <button
                                    key={theater.id}
                                    onClick={() => {
                                        setSelectedTheaterId(theater.id);
                                        setSelectedScreenId(null);
                                    }}
                                    className={`w-full px-4 py-3 rounded-xl text-left transition-all ${
                                        selectedTheaterId === theater.id
                                            ? 'bg-linear-to-r from-rose-600 to-pink-600 text-white shadow-lg scale-105'
                                            : 'bg-slate-900/50 text-slate-300 hover:bg-slate-800/50 border border-slate-700/30'
                                    }`}
                                >
                                    <p
                                        className={`font-medium ${
                                            selectedTheaterId === theater.id
                                                ? 'text-white'
                                                : 'text-slate-200'
                                        }`}
                                    >
                                        {theater.name}
                                    </p>
                                    <p
                                        className={`text-xs mt-1 ${
                                            selectedTheaterId === theater.id
                                                ? 'text-rose-100'
                                                : 'text-slate-500'
                                        }`}
                                    >
                                        {theater.address}
                                    </p>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Screen Selector */}
                    {selectedTheaterId && (
                        <div className="bg-linear-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-5">
                            <div className="flex items-center gap-2 mb-4">
                                <Film className="w-5 h-5 text-blue-400" />
                                <h3 className="text-slate-100 font-semibold">
                                    Chọn phòng chiếu
                                </h3>
                            </div>
                            <div className="space-y-2 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                                {screenList
                                    .filter(
                                        (screen) =>
                                            screen.theaterId ===
                                            selectedTheaterId
                                    )
                                    .map((screen) => (
                                        <button
                                            key={screen.id}
                                            onClick={() =>
                                                setSelectedScreenId(screen.id)
                                            }
                                            className={`w-full px-4 py-3 rounded-xl text-left transition-all ${
                                                selectedScreenId === screen.id
                                                    ? 'bg-linear-to-r from-blue-600 to-cyan-600 text-white shadow-lg scale-105'
                                                    : 'bg-slate-900/50 text-slate-300 hover:bg-slate-800/50 border border-slate-700/30'
                                            }`}
                                        >
                                            <p
                                                className={`font-medium ${
                                                    selectedScreenId ===
                                                    screen.id
                                                        ? 'text-white'
                                                        : 'text-slate-200'
                                                }`}
                                            >
                                                {screen.name}
                                            </p>
                                            <p
                                                className={`text-xs mt-1 ${
                                                    selectedScreenId ===
                                                    screen.id
                                                        ? 'text-blue-100'
                                                        : 'text-slate-500'
                                                }`}
                                            >
                                                {screen.row} hàng ×{' '}
                                                {screen.column} ghế
                                            </p>
                                        </button>
                                    ))}
                            </div>
                        </div>
                    )}

                    {/* Seat Types Legend */}
                    <div className="bg-linear-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-5">
                        <h3 className="text-slate-100 font-semibold mb-4">
                            Loại ghế
                        </h3>
                        <div className="space-y-3">
                            {seatTypes.map((type) => (
                                <div
                                    key={type.id}
                                    className="flex items-center gap-3"
                                >
                                    <div
                                        className={`w-8 h-8 rounded-lg ${type.color} flex items-center justify-center shadow-md`}
                                    >
                                        <Armchair className="w-4 h-4 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-slate-200 text-sm font-medium">
                                            {type.label}
                                        </p>
                                        <p className="text-slate-500 text-xs">
                                            {type.price} ₫
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <p className="text-sm text-slate-500 mt-4 pt-4 border-t border-slate-700/50">
                            💡 Click vào ghế để thay đổi loại
                        </p>
                    </div>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-3">
                    <div className="bg-linear-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                        {currentScreen ? (
                            <>
                                {/* Screen Display */}
                                <div className="mb-8">
                                    <div className="relative">
                                        <div className="bg-linear-to-b from-slate-700 via-slate-600 to-slate-500 text-white text-center py-4 rounded-2xl shadow-2xl mb-3">
                                            <p className="text-sm font-bold tracking-widest">
                                                MÀN HÌNH CHIẾU
                                            </p>
                                        </div>
                                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-linear-to-r from-transparent via-slate-500/50 to-transparent blur-sm" />
                                    </div>
                                    <p className="text-center text-slate-500 text-sm mt-4">
                                        Nhìn từ phía khán giả
                                    </p>
                                </div>

                                {/* Seats Grid */}
                                <div className="overflow-x-auto pb-4">
                                    <div className="inline-flex flex-col items-center gap-3 min-w-full justify-center">
                                        {[...Array(currentScreen.row)].map(
                                            (_, rowIndex) => {
                                                const rowLetter =
                                                    String.fromCharCode(
                                                        65 + rowIndex
                                                    );
                                                const seatSize = getSeatSize(
                                                    currentScreen.column
                                                );
                                                const iconSize = getIconSize(
                                                    currentScreen.column
                                                );
                                                const gapSize = getGapSize(
                                                    currentScreen.column
                                                );

                                                return (
                                                    <div
                                                        key={rowLetter}
                                                        className="flex items-center gap-3"
                                                    >
                                                        <span className="w-8 text-center text-slate-400 font-semibold text-sm">
                                                            {rowLetter}
                                                        </span>
                                                        <div
                                                            className={`flex ${gapSize}`}
                                                        >
                                                            {[
                                                                ...Array(
                                                                    currentScreen.column
                                                                ),
                                                            ].map(
                                                                (
                                                                    _,
                                                                    seatIndex
                                                                ) => {
                                                                    const seatNumber =
                                                                        seatIndex +
                                                                        1;
                                                                    const seat =
                                                                        currentSeats.find(
                                                                            (
                                                                                s: Seat
                                                                            ) =>
                                                                                s.row ===
                                                                                    rowLetter &&
                                                                                s.number ===
                                                                                    seatNumber
                                                                        );

                                                                    return (
                                                                        <button
                                                                            key={
                                                                                seatNumber
                                                                            }
                                                                            onClick={() =>
                                                                                toggleSeatType(
                                                                                    rowLetter,
                                                                                    seatNumber
                                                                                )
                                                                            }
                                                                            className={`${seatSize} rounded-t-xl flex items-center justify-center transition-all hover:scale-110 hover:shadow-lg active:scale-95 ${
                                                                                seat
                                                                                    ? getSeatColor(
                                                                                          seat.type
                                                                                      )
                                                                                    : 'bg-slate-500'
                                                                            }`}
                                                                            title={`${rowLetter}${seatNumber} - ${
                                                                                seatTypes.find(
                                                                                    (
                                                                                        t
                                                                                    ) =>
                                                                                        t.id ===
                                                                                        seat?.type
                                                                                )
                                                                                    ?.label ||
                                                                                'Standard'
                                                                            }`}
                                                                        >
                                                                            <Armchair
                                                                                className={`${iconSize} text-white`}
                                                                            />
                                                                        </button>
                                                                    );
                                                                }
                                                            )}
                                                        </div>
                                                        <span className="w-8 text-center text-slate-400 font-semibold text-sm">
                                                            {rowLetter}
                                                        </span>
                                                    </div>
                                                );
                                            }
                                        )}
                                    </div>
                                </div>

                                {/* Statistics */}
                                <div className="mt-8 pt-6 border-t border-slate-700/50">
                                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                                        <div className="bg-slate-900/50 rounded-xl p-3 border border-slate-700/30">
                                            <p className="text-slate-500 text-xs mb-1">
                                                Tổng số ghế
                                            </p>
                                            <p className="text-slate-100 font-bold text-lg">
                                                {currentScreen.row *
                                                    currentScreen.column}
                                            </p>
                                        </div>
                                        <div className="bg-slate-900/50 rounded-xl p-3 border border-slate-700/30">
                                            <p className="text-slate-500 text-xs mb-1">
                                                Standard
                                            </p>
                                            <p className="text-slate-100 font-bold text-lg">
                                                {
                                                    currentSeats.filter(
                                                        (s: Seat) =>
                                                            s.type ===
                                                            'standard'
                                                    ).length
                                                }
                                            </p>
                                        </div>
                                        <div className="bg-slate-900/50 rounded-xl p-3 border border-slate-700/30">
                                            <p className="text-slate-500 text-xs mb-1">
                                                VIP
                                            </p>
                                            <p className="text-amber-400 font-bold text-lg">
                                                {
                                                    currentSeats.filter(
                                                        (s: Seat) =>
                                                            s.type === 'vip'
                                                    ).length
                                                }
                                            </p>
                                        </div>
                                        <div className="bg-slate-900/50 rounded-xl p-3 border border-slate-700/30">
                                            <p className="text-slate-500 text-xs mb-1">
                                                Sweetbox
                                            </p>
                                            <p className="text-pink-400 font-bold text-lg">
                                                {
                                                    currentSeats.filter(
                                                        (s: Seat) =>
                                                            s.type ===
                                                            'sweetbox'
                                                    ).length
                                                }
                                            </p>
                                        </div>
                                        <div className="bg-slate-900/50 rounded-xl p-3 border border-slate-700/30">
                                            <p className="text-slate-500 text-xs mb-1">
                                                Ẩn/Hỏng
                                            </p>
                                            <p className="text-slate-400 font-bold text-lg">
                                                {
                                                    currentSeats.filter(
                                                        (s: Seat) =>
                                                            s.type ===
                                                            'disabled'
                                                    ).length
                                                }
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="mt-6 flex gap-3">
                                    <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 border border-slate-600 text-slate-300 rounded-xl hover:bg-slate-700/30 transition-all font-medium">
                                        <RotateCcw className="w-5 h-5" />
                                        Đặt lại
                                    </button>
                                    <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-linear-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white rounded-xl transition-all hover:scale-105 hover:shadow-lg hover:shadow-rose-500/30 font-medium">
                                        <Save className="w-5 h-5" />
                                        Lưu cấu hình
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-20">
                                <div className="p-6 bg-slate-800/50 rounded-full mb-6">
                                    <Armchair className="w-16 h-16 text-slate-600" />
                                </div>
                                <p className="text-slate-400 font-medium text-lg mb-2">
                                    Chưa chọn phòng chiếu
                                </p>
                                <p className="text-slate-500 text-sm">
                                    Vui lòng chọn rạp và phòng chiếu để bắt đầu
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Custom Scrollbar Styles */}
            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(51, 65, 85, 0.3);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(148, 163, 184, 0.5);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(148, 163, 184, 0.7);
                }
            `}</style>
        </div>
    );
}
