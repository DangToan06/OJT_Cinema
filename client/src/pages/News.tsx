import { ChevronLeft, ChevronRight } from 'lucide-react';
import { newsData } from '../data/newsData';
import { NewsCard } from '../components/NewsCard';
import { useState } from 'react';

export default function News() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const totalPages = Math.ceil(newsData.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = newsData.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className="min-h-screen bg-[#1a1d29] py-12 px-6">
            <div className="max-w-7xl mx-auto">
                <h1
                    className="text-center mb-12 text-white 
               text-2xl sm:text-[24px] md:text-[30px] lg:text-[32px] 
               font-medium tracking-wide"
                >
                    Tin tức
                </h1>

                {/* Grid các thẻ tin */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {currentItems.map((news) => (
                        <NewsCard
                            key={news.id}
                            image={news.image}
                            date={news.date}
                            title={news.title}
                        />
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-end">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="w-8 h-8 flex items-center justify-center rounded border border-transparent text-white hover:text-red-500 hover:border-red-500 disabled:text-gray-600 disabled:hover:border-transparent disabled:hover:text-gray-600 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>

                        {Array.from(
                            { length: totalPages },
                            (_, i) => i + 1
                        ).map((page) => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`w-8 h-8 flex items-center justify-center rounded border transition-colors ${
                                    page === currentPage
                                        ? 'bg-red-500 border-red-500 text-white'
                                        : 'bg-[#242837] border-transparent text-white hover:border-red-500 hover:text-red-500'
                                }`}
                            >
                                {page}
                            </button>
                        ))}

                        <button
                            onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="w-8 h-8 flex items-center justify-center rounded border border-transparent text-white hover:text-red-500 hover:border-red-500 disabled:text-gray-600 disabled:hover:border-transparent disabled:hover:text-gray-600 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
