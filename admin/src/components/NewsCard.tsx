import { Calendar, Eye, Edit, Trash2 } from 'lucide-react';
import dayjs from 'dayjs';
import type { News } from '../util/news.interface';

interface NewsCardProps {
    item: News;
    onEdit: (item: News) => void;
    onDelete: (item: News) => void;
    getStatus: (start: string, end: string) => string;
    getStatusColor: (status: string) => string;
}

export default function NewsCard({
    item,
    onEdit,
    onDelete,
    getStatus,
    getStatusColor,
}: NewsCardProps) {
    const status = getStatus(item.dayBegin, item.dayEnd);

    return (
        <div className="group bg-gray-800 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-400 cursor-default">
            {/* Image + Status */}
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

            {/* Content */}
            <div className="p-2 flex flex-col gap-[5px]">
                <h3 className="text-[18px] font-semibold text-gray-300 group-hover:text-[#d4a003] transition-colors">
                    {item.title.length > 55
                        ? item.title.slice(0, 55) + '...'
                        : item.title}
                </h3>

                <p className="text-gray-400 text-sm leading-relaxed">
                    {item.content.length > 81
                        ? item.content.slice(0, 80) + '...'
                        : item.content}
                </p>

                {/* Date */}
                <div className="flex items-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        <span>
                            {dayjs(item.dayBegin).utc().format('DD/MM/YYYY')}
                        </span>
                    </div>

                    <span>→</span>

                    <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        <span>
                            {dayjs(item.dayEnd).utc().format('DD/MM/YYYY')}
                        </span>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Eye className="w-4 h-4" />
                        <span className="font-medium">1000</span>
                        <span>lượt xem</span>
                    </div>

                    <div className="flex gap-2 p-2">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onEdit(item);
                            }}
                            className="text-blue-600 hover:scale-110 transition-all duration-200 cursor-pointer"
                        >
                            <Edit className="w-4 h-4" />
                        </button>

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete(item);
                            }}
                            className="text-red-600 hover:scale-110 transition-all duration-200 cursor-pointer"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
