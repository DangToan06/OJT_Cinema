import "../index.css";
export default function MovieDetail() {
  return (
    <div>
      <>
        <div
          id="bgr"
          className="relative bg-cover bg-center"
          style={{
            backgroundImage: 'url("/assets/images/image.png")',
            backgroundSize: "cover",
          }}
        >
          <div className="bg-black bg-opacity-50">
            <main id="movie-details" className="px-8 py-10" />
          </div>
        </div>
        <main className="px-8 py-10 bg-black text-white">
          <div className="bg-[#101012] p-6 rounded mb-10 text-center">
            <div
              className="flex justify-center gap-4 mb-4"
              id="date-buttons"
            ></div>
            <p className="text-sm text-orange-400 mb-4">
              <span className="font-semibold">
                Lưu ý: Khán giả dưới 13 tuổi chỉ chọn suất chiếu kết thúc trước
                22h và Khán giả dưới 16 tuổi chỉ chọn suất chiếu kết thúc trước
                23h.
              </span>
            </p>
            <div
              className="flex justify-center flex-wrap gap-4"
              id="showtime-buttons"
            ></div>
          </div>
          <div id="seat-section" style={{ display: "none" }}>
            <div className="flex justify-center mb-4">
              <img
                src="/assets/images/screen 1.png"
                alt=""
                className="rounded shadow-lg max-h-32"
              />
            </div>
            <div className="bg-black-800 p-6 rounded mb-10">
              <h2 className="text-xl font-bold mb-4 text-center">
                Phòng chiếu số 2
              </h2>
              <div
                className="flex flex-col items-center gap-1 mb-4"
                id="seat-container"
              />
              <div className="flex justify-center gap-4 text-xs mb-4">
                <div className="seat booked" />
                Ghế đã đặt
                <div className="seat select" />
                Ghế bạn chọn
                <div className="seat available" />
                Ghế thường
                <div className="seat vip" />
                Ghế VIP
                <div className="seat double" />
                Ghế đôi
              </div>
              <div className="text-sm text-white mb-4">
                <p>
                  Ghế đã chọn:
                  <span
                    id="selected-seats"
                    className="font-semibold text-green-400"
                  >
                    Chưa có ghế nào
                  </span>
                </p>
                <p>
                  Tổng tiền:
                  <span
                    id="total-price"
                    className="font-semibold text-yellow-400"
                  >
                    0
                  </span>
                  đ
                </p>
              </div>
              <div className="text-right">
                <button className="bg-gray-600 px-4 py-2 rounded mr-2">
                  Quay lại
                </button>
                <button className="bg-red-600 px-4 py-2 rounded">
                  Thanh toán
                </button>
                <div
                  id="login-warning"
                  className="text-red-600 text-sm mt-2 hidden"
                >
                  Bạn cần đăng nhập tài khoản để thanh toán.
                </div>
              </div>
            </div>
          </div>
        </main>
      </>
    </div>
  );
}
