import { useState } from 'react';

import red from '../assets/red.png';
import image1 from '../assets/image1.png';
import image2 from '../assets/image2.png';
import image3 from '../assets/image3.png';
import image4 from '../assets/image4.png';

export default function MovieCalendar() {
    const dates = ['12-11-2024', '13-11-2024', '14-11-2024', '15-11-2024'];

    const [activeDate, setActiveDate] = useState('12-11-2024');

    const movies = [
        {
            title: 'AI OÁN TRONG VƯỜN XUÂN - T18',
            origin: 'Hàn Quốc',
            release: '08/11/2024',
            duration: '91 phút',
            genre: 'Kinh dị',
            age: 'T18 - Phim được phổ biến đến người xem từ đủ 18 tuổi trở lên (18+)',
            poster: image1,
            time: ['18:15', '19:55', '23:25'],
        },
        {
            title: 'MẬT MÃ ĐỎ - K (Phụ đề)',
            origin: 'Mỹ',
            release: '08/11/2024',
            duration: '120 phút',
            genre: 'Hành động',
            age: 'K - Dành cho người xem dưới 13 tuổi có người bảo hộ',
            poster: image2,
            time: ['18:25', '20:00', '20:35', '21:30', '22:10', '23:15'],
        },
        {
            title: 'ĐÔI BẠN HỌC YÊU - T18',
            origin: 'Hàn Quốc',
            release: '08/11/2024',
            duration: '115 phút',
            genre: 'Tâm lý, tình cảm',
            age: 'T18 - Phim được phổ biến đến người xem từ đủ 18 tuổi trở lên (18+)',
            poster: image3,
            time: ['18:15', '19:45', '20:30', '21:50', '22:20', '23:20'],
        },
        {
            title: 'HỌC VIỆN ANH HÙNG: YOU’RE NEXT - K',
            origin: 'Nhật Bản',
            release: '08/11/2024',
            duration: '108 phút',
            genre: 'Anime',
            age: 'K - Dành cho người xem dưới 13 tuổi có người bảo hộ',
            poster: image4,
            time: ['20:20'],
        },
    ];

    return (
        <div className="w-full min-h-screen bg-[#0f1217] text-white px-6 py-10">
            {/* Title */}
            <h2 className="text-center text-xl font-semibold mb-6 flex items-center justify-center gap-2">
                <img src={red} alt="" className="w-6 h-6 object-contain" />
                Phim đang chiếu
            </h2>

            {/* Date Selector */}
            <div className="flex justify-center gap-4 mb-4">
                {dates.map((d) => (
                    <button
                        key={d}
                        onClick={() => setActiveDate(d)}
                        className={`px-4 py-2 rounded-lg border transition ${
                            activeDate === d
                                ? 'bg-red-500 border-red-500 text-white'
                                : 'border-gray-500 text-gray-300 hover:border-gray-300'
                        }`}
                    >
                        {d}
                    </button>
                ))}
            </div>

            {/* Warning */}
            <p className="text-center text-sm text-yellow-400 mb-8">
                Lưu ý: Khán giả dưới 13 tuổi chỉ chọn suất chiếu kết thúc trước
                22h và khán giả dưới 16 tuổi chỉ chọn suất chiếu kết thúc trước
                23h.
            </p>

            {/* Movie List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {movies.map((m, index) => (
                    <div
                        key={index}
                        className="bg-[#161b22] rounded-xl flex gap-4 p-4 border border-gray-700 relative"
                    >
                        {/* Poster */}
                        <img
                            src={m.poster}
                            alt={m.title}
                            className="w-40 h-56 rounded-lg object-cover"
                        />

                        {/* 2D Badge */}
                        <span className="px-3 py-1 border border-gray-400 rounded-md text-sm absolute top-3 right-3">
                            2D
                        </span>

                        {/* Info */}
                        <div className="flex-1 flex flex-col justify-between">
                            <div>
                                <p className="text-sm text-gray-400 mb-1">
                                    {m.genre} • {m.duration}
                                </p>

                                <h3 className="font-semibold text-lg">
                                    {m.title}
                                </h3>

                                <p className="text-sm text-gray-300 mt-2">
                                    Xuất xứ: {m.origin}
                                </p>
                                <p className="text-sm text-gray-300">
                                    Khởi chiếu: {m.release}
                                </p>

                                <p className="text-sm text-red-400 mt-2">
                                    {m.age}
                                </p>

                                {/* Time buttons */}
                                <div className="flex flex-wrap gap-2 mt-3">
                                    {m.time.map((t, idx) => (
                                        <button
                                            key={idx}
                                            className="px-3 py-1 rounded-lg border border-gray-500 hover:border-white transition"
                                        >
                                            {t}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
