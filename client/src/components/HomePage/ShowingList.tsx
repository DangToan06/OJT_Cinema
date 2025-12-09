import MovieCard from "./MovieCard";

const movies = [
  {
    id: 1,
    title: "CƯỜI XUYÊN BIÊN GIỚI",
    image:
      "https://www.cgv.vn/media/catalog/product/cache/1/image/c5f0a1eff4c394a251036189ccddaacd/a/m/amazon-main-poster-printing.jpg",
    type: "Hài",
    release_date: "15/11/2024",
  },
  {
    id: 2,
    title: "MẶT MÃ ĐỎ-K",
    image:
      "https://www.cgv.vn/media/catalog/product/cache/1/image/1800x/71252117777b696995f01934522c402d/3/5/350x495-red-one.jpg",
    type: "Hành động",
    release_date: "09/11/2024",
  },
  {
    id: 3,
    title: "ĐÔI BẠN HỌC YÊU",
    image:
      "https://www.cgv.vn/media/catalog/product/cache/1/image/c5f0a1eff4c394a251036189ccddaacd/l/i/litbc-main-poster-printing.jpg",
    type: "Tâm lý",
    release_date: "08/11/2024",
  },
  {
    id: 4,
    title: "HỌC VIỆN ANH HÙNG",
    image:
      "https://upload.wikimedia.org/wikipedia/vi/5/5a/Boku_no_Hero_Academia_Volume_1.png",
    type: "Anime",
    release_date: "08/11/2024",
  },
  {
    id: 5,
    title: "ĐỪNG BUÔNG TAY",
    image:
      "https://www.cgv.vn/media/catalog/product/cache/1/image/c5f0a1eff4c394a251036189ccddaacd/3/5/350x495-never-let-go.jpg",
    type: "Kinh dị",
    release_date: "08/11/2024",
  },
  {
    id: 6,
    title: "AI OÁN TRONG VƯỜN XUÂN",
    image:
      "https://www.cgv.vn/media/catalog/product/cache/1/image/c5f0a1eff4c394a251036189ccddaacd/p/o/poster_ai_oan_trong_vuon_xuan_4_1_.jpg",
    type: "Kinh dị",
    release_date: "08/11/2024",
  },
  {
    id: 7,
    title: "TIẾNG GỌI CỦA OÁN HỒN",
    image:
      "https://www.cgv.vn/media/catalog/product/cache/1/image/c5f0a1eff4c394a251036189ccddaacd/s/a/sana_let_me_hear_main_poster_1_.jpg",
    type: "Kinh dị",
    release_date: "01/11/2024",
  },
  {
    id: 8,
    title: "VÙNG ĐẤT BỊ NGUYỀN RỦA",
    image:
      "https://www.cgv.vn/media/catalog/product/cache/1/image/c5f0a1eff4c394a251036189ccddaacd/2/x/2x3_1_.jpg",
    type: "Kinh dị",
    release_date: "01/11/2024",
  },
];

export default function ShowingList() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {movies.map((m) => (
        <MovieCard
          key={m.id}
          id={m.id}
          title={m.title}
          image={m.image}
          type={m.type}
          release_date={m.release_date}
        />
      ))}
    </div>
  );
}
