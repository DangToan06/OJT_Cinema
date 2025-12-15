import { useEffect, useState } from "react";
import type { News } from "../types/news.interface";
import axios from "axios";
export default function NewsDetail() {
  const [news, setNews] = useState<News | null>(null);
  useEffect(() => {
    axios.get(`http://localhost:8080/news/news-${window.location.href.split("?")[1]}`)
    .then((res) => setNews(res.data))
    .catch(() => {alert("get data error")})
  }, [])
  
  // Giả lập dữ liệu bài viết (bạn có thể thay bằng fetch thực tế)
  const article = {
    title: news?.title,
    date: news?.created_at.split("T")[0],
    image: news?.bannerUrl, // thay bằng ảnh thật
    content: news?.content,
  };

  return (
    <>
      <div className={`min-h-screen flex flex-col bg-[#10141b] text-white`}>
        {/* Main Content */}
        <main className="flex-1 pt-24 pb-12 px-5 md:px-20 max-w-5xl mx-auto w-full">
          <article className="prose prose-invert max-w-none">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {article.title}
            </h1>
            <time className="text-gray-400 text-sm mb-8 block">{article.date}</time>

              <div className="relative w-full h-96 md:h-[500px] my-8 rounded-lg overflow-hidden">
                <img src={article.image}/>
              </div>

            <div
              className="text-gray-300 leading-relaxed space-y-4"
              
            >{article.content}</div>
          </article>
        </main>
      </div>
    </>
  );
}