export default function ChooseTicket() {
  return (
    <div className="bg-black text-white font-sans">

      {/* BACKGROUND WRAPPER */}
      <div
        className="relative bg-cover bg-center"
        style={{ backgroundImage: "url(/assets/images/image.png)" }}
      >
        <div className="bg-black bg-opacity-50">

          {/* MOVIE DETAILS */}
          <main id="movie-details" className="px-8 py-10"></main>
        </div>
      </div>

      {/* CONTENT */}
      <main className="px-8 py-10 bg-black">

        {/* DATE + SHOWTIME */}
        <div className="bg-[#101012] p-6 rounded mb-10 text-center">
          <div id="date-buttons" className="flex justify-center gap-4 mb-4"></div>

          <p className="text-sm text-orange-400 mb-4">
            <span className="font-semibold">
              Lưu ý: Khán giả dưới 13 tuổi chỉ chọn suất chiếu kết thúc trước
              22h và dưới 16 tuổi chọn suất chiếu trước 23h.
            </span>
          </p>

          <div
            id="showtime-buttons"
            className="flex justify-center flex-wrap gap-4"
          ></div>
        </div>

        {/* SEAT SECTION */}
        <div id="seat-section" className="hidden">
          <div className="flex justify-center mb-4">
            <img
              src="/assets/images/screen 1.png"
              className="max-h-32 rounded shadow-lg"
            />
          </div>

          <div className="p-6 rounded bg-[#0c0c0c] mb-10">
            <h2 className="text-xl font-bold text-center mb-4">
              Phòng chiếu số 2
            </h2>

            <div
              id="seat-container"
              className="flex flex-col items-center gap-1 mb-4"
            ></div>

            <div className="flex justify-center gap-4 text-xs mb-4">
              <div className="seat booked"></div> Ghế đã đặt
              <div className="seat selected"></div> Ghế bạn chọn
              <div className="seat available"></div> Ghế thường
              <div className="seat vip"></div> Ghế VIP
              <div className="seat double"></div> Ghế đôi
            </div>

            <div className="text-sm mb-4">
              <p>
                Ghế đã chọn:
                <span id="selected-seats" className="text-green-400 ml-1">
                  Chưa có ghế nào
                </span>
              </p>
              <p>
                Tổng tiền:
                <span id="total-price" className="text-yellow-400 ml-1">
                  0
                </span>{" "}
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
    </div>
  );
}
