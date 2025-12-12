// app/news/[id]/page.jsx  (Next.js 13+ App Router)


// Font Montserrat giống hệt trang cũ


export default function NewsDetail() {
  // Giả lập dữ liệu bài viết (bạn có thể thay bằng fetch thực tế)
  const article = {
    title: "Lễ trao giải Liên hoan phim Việt Nam lần thứ XXIII diễn ra long trọng",
    date: "10/12/2025",
    image: "/images/news-sample.jpg", // thay bằng ảnh thật
    content: `
      <p>Ngày 10/12/2025, tại Trung tâm Chiếu phim Quốc gia đã diễn ra lễ bế mạc và trao giải Liên hoan phim Việt Nam lần thứ XXIII...</p>
      <p>Giải Bông sen Vàng phim truyện điện ảnh thuộc về tác phẩm <strong>“Đất rừng phương Nam”</strong> của đạo diễn Nguyễn Quang Dũng...</p>
      <p>Nhiều nghệ sĩ gạo cội và thế hệ trẻ đã cùng hội tụ trong đêm trao giải đầy cảm xúc...</p>
    `,
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

            {article.image && (
              <div className="relative w-full h-96 md:h-[500px] my-8 rounded-lg overflow-hidden">
                
              </div>
            )}

            <div
              className="text-gray-300 leading-relaxed space-y-4"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </article>
        </main>
      </div>
    </>
  );
}