interface Festival {
  id: number;
  title: string;
  date: string;
  description: string;
  image: string;
}

export default function FestivalPage() {
  const festivals: Festival[] = [
    {
      id: 1,
      title: "Liên hoan phim Việt Nam lần thứ 23",
      date: "15/11/2024 - 20/11/2024",
      description:
        "Liên hoan phim Việt Nam là sự kiện điện ảnh lớn nhất trong năm, quy tụ những tác phẩm xuất sắc nhất của điện ảnh Việt Nam. Sự kiện diễn ra trong 6 ngày với nhiều hoạt động phong phú.",
      image:
        "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=560&fit=crop",
    },
    {
      id: 2,
      title: "Liên hoan phim Quốc tế Hà Nội",
      date: "01/12/2024 - 05/12/2024",
      description:
        "Liên hoan phim Quốc tế Hà Nội mang đến những bộ phim đặc sắc từ khắp nơi trên thế giới, tạo cơ hội giao lưu văn hóa điện ảnh giữa Việt Nam và các quốc gia.",
      image:
        "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=560&fit=crop",
    },
    {
      id: 3,
      title: "Tuần phim Pháp tại Việt Nam",
      date: "10/12/2024 - 15/12/2024",
      description:
        "Tuần phim Pháp giới thiệu những tác phẩm điện ảnh đương đại và kinh điển của nền điện ảnh Pháp, một trong những nền điện ảnh có ảnh hưởng lớn nhất thế giới.",
      image:
        "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=560&fit=crop",
    },
  ];
  return (
    <div className="flex flex-col min-h-screen bg-[#10141b] text-white">
      {/* Main Content */}
      <main className="flex-1">
        <div className="bg-[#10141b]">
          {/* Banner */}
          <div className="relative mb-10 w-full">
            <img
              src="https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=1920&h=400&fit=crop"
              alt="Festival Banner"
              className="w-full h-auto block"
            />
          </div>

          {/* Festival List */}
          <div className="flex flex-col gap-6 px-4 lg:px-20 pb-10">
            {festivals.map((festival) => (
              <div
                key={festival.id}
                className="flex flex-col lg:flex-row gap-6 bg-[#1a222f] p-4 rounded-2xl hover:bg-[#1f2937] transition cursor-pointer"
              >
                <img
                  src={festival.image}
                  alt={festival.title}
                  className="w-full lg:w-[200px] h-[200px] lg:h-[280px] object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">
                    {festival.title}
                  </h3>
                  <p className="text-sm text-red-500 mb-2">{festival.date}</p>
                  <p className="text-sm text-gray-300">
                    {festival.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
