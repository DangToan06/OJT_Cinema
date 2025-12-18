import { useEffect, useState } from 'react';
import PromotionCard from '../components/Card/PromotionCard';
import axios from 'axios';
import type { News } from '../types/news.interface';

export default function Promotions() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
    const [newsData, setNewsData] = useState<News[]>([]);
    useEffect(() => {
        axios
            .get('http://localhost:8080/news')
            .then((res) => setNewsData(res.data));
    }, []);
    const totalPages = Math.ceil(newsData.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = newsData
        .filter((n) => n.category == 'promotion')
        .slice(indexOfFirstItem, indexOfLastItem);
    return (
        <div className="h-[calc(100vh-80px)] bg-[#1a1d29] text-white box-border py-5 pr-10 flex flex-col justify-between">
            <div className='pl-20'>
                <p className="text-center text-3xl font-bold mb-[2%]">
                    Khuyến mãi
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {currentItems.map((item, id) => (
                        <PromotionCard
                            key={id}
                            id={item.id}
                            image={item.bannerUrl}
                            title={item.title}
                            date={item.created_at.split('T')[0]}
                        />
                    ))}
                </div>
            </div>
            <div className="flex justify-end gap-4 font-semibold">
                <button
                    className="border px-3 py-2 rounded-md border-[#1E293B] hover:bg-[#1E293B]"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                >
                    Quay lại
                </button>
                <button
                    className="border px-3 py-2 rounded-md border-[#1E293B] hover:bg-[#1E293B]"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Tiếp theo
                </button>
            </div>
        </div>
    );
}