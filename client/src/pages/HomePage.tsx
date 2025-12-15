import { Link } from "react-router-dom";
import Banner from "../components/HomePage/Banner";
import ShowingList from "../components/HomePage/ShowingList";
import PromoList from "../components/HomePage/PromotionList";
import EventList from "../components/HomePage/EventList";

export default function HomePage() {
  return (
    <div className="bg-[#0b0f12] text-white h-min-screen font-[Montserrat]">
      <Banner />
      <div className="container-fluid mx-auto px-6 py-8 flex flex-row gap-4">
        <div className="flex gap-8 flex-col w-[80%]">
          <div className="flex items-center justify-between">
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
          <ShowingList statusMovie="DANGCHIEU" />

          <div className="flex items-center justify-between">
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
          <ShowingList statusMovie="SAPCHIEU" />
        </div>

        <aside className="w-[20%] flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h3 className="text-white text-lg font-semibold text-start m-0">
              Khuyến mãi
            </h3>
            <Link to={""} className="text-sm text-gray-300 hover:underline">
              Xem tất cả
            </Link>
          </div>
          <PromoList />

          <div className="flex justify-between items-center">
            <h3 className="text-white text-lg font-semibold m-0">Sự kiện</h3>
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
