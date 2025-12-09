import { Link } from "react-router-dom";
import Banner from "../components/HomePage/Banner";
import ShowingList from "../components/HomePage/ShowingList";
import PromoList from "../components/HomePage/PromotionList";
import EventList from "../components/HomePage/EventList";


export default function HomePage() {
  return (
    <div className="bg-[#0b0f12] text-white min-h-screen font-[Montserrat]">
      <Banner />
      <div className="container mx-auto px-6 py-8 flex gap-4 ">
        <div className="flex gap-8 flex-col w-[80%]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center text-lg font-semibold">
              <span className=" bg-red-500 rounded-full w-3 h-3 mr-3" />
              <span>Phim đang chiếu</span>
            </div>

            <div className="flex items-center gap-6 text-sm text-gray-300">
              <Link to={""} className="hover:underline">
                Xem tất cả
              </Link>
            </div>
          </div>
          <ShowingList />

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center text-lg font-semibold">
              <span className=" bg-red-500 rounded-full w-3 h-3 mr-3" />
              <span>Phim sắp chiếu</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-300">
              <Link to={""} className="hover:underline">
                Xem tất cả
              </Link>
            </div>
          </div>
          <ShowingList />
        </div>

        <aside className="w-[20%] flex flex-col gap-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white text-lg font-semibold">Khuyến mãi</h3>
            <Link to={""} className="text-sm text-gray-300 hover:underline">
              Xem tất cả
            </Link>
          </div>
          <PromoList />

          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white text-lg font-semibold">Sự kiện</h3>
            <Link to={""} className="text-sm text-gray-300 hover:underline">
              Xem tất cả
            </Link>
          </div>
          <EventList />
        </aside>
      </div>
    </div>
  );
}
