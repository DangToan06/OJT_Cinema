import React from "react";

export default function TicketPrice() {
  return (
    <div className="min-h-screen bg-gray-900 text-white py-12">
      <main className="max-w-6xl mx-auto px-4">
        <header className="text-center mb-8">
          <h1 className="text-2xl font-bold">Giá vé</h1>
          <p className="text-sm text-gray-400">(Áp dụng từ ngày 01/06/2023)</p>
        </header>

        {/* 2D Table */}
        <section className="mb-8">
          <table className="w-full md:w-11/12 mx-auto border border-gray-700 text-sm md:text-base table-auto">
            <caption className="text-left font-semibold text-lg md:text-xl p-4">1. GIÁ VÉ XEM PHIM 2D</caption>
            <thead className="bg-gray-800">
              <tr>
                <th className="p-4 border-r border-gray-700">&nbsp;</th>
                <th colSpan={3} className="p-4 border-l border-gray-700 text-gray-400">
                  Từ thứ 2 đến thứ 5
                  <br />
                  <span className="text-xs text-gray-500">From Monday to Thursday</span>
                </th>
                <th colSpan={3} className="p-4 border-l border-gray-700 text-gray-400">
                  Thứ 6, 7, CN và ngày Lễ
                  <br />
                  <span className="text-xs text-gray-500">Friday, Saturday, Sunday &amp; public holiday</span>
                </th>
              </tr>
              <tr className="bg-gray-900">
                <th className="p-4 text-left text-gray-400">Thời gian</th>
                <th className="p-4 text-gray-400">Ghế thường<br/><span className="text-xs text-gray-500">Standard</span></th>
                <th className="p-4 text-amber-400">Ghế VIP<br/><span className="text-xs text-gray-500">VIP</span></th>
                <th className="p-4 text-red-400">Ghế đôi<br/><span className="text-xs text-gray-500">Sweetbox</span></th>
                <th className="p-4 text-gray-400">Ghế thường<br/><span className="text-xs text-gray-500">Standard</span></th>
                <th className="p-4 text-amber-400">Ghế VIP<br/><span className="text-xs text-gray-500">VIP</span></th>
                <th className="p-4 text-red-400">Ghế đôi<br/><span className="text-xs text-gray-500">Sweetbox</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              <tr>
                <td className="p-4 text-left">Trước 12h<br/><span className="text-xs text-gray-400">Before 12PM</span></td>
                <td className="p-4 font-semibold text-center">55.000đ</td>
                <td className="p-4 font-semibold text-amber-400 text-center">65.000đ</td>
                <td className="p-4 font-semibold text-red-400 text-center">140.000đ</td>
                <td className="p-4 font-semibold text-center">70.000đ</td>
                <td className="p-4 font-semibold text-amber-400 text-center">80.000đ</td>
                <td className="p-4 font-semibold text-red-400 text-center">170.000đ</td>
              </tr>

              <tr>
                <td className="p-4 text-left">Từ 12:00 đến trước 17:00<br/><span className="text-xs text-gray-400">From 12:00 to before 17:00</span></td>
                <td className="p-4 font-semibold text-center">70.000đ</td>
                <td className="p-4 font-semibold text-amber-400 text-center">75.000đ</td>
                <td className="p-4 font-semibold text-red-400 text-center">160.000đ</td>
                <td className="p-4 font-semibold text-center">80.000đ</td>
                <td className="p-4 font-semibold text-amber-400 text-center">85.000đ</td>
                <td className="p-4 font-semibold text-red-400 text-center">180.000đ</td>
              </tr>

              <tr>
                <td className="p-4 text-left">Từ 17:00 đến trước 23:00<br/><span className="text-xs text-gray-400">From 17:00 to before 23:00</span></td>
                <td className="p-4 font-semibold text-center">80.000đ</td>
                <td className="p-4 font-semibold text-amber-400 text-center">85.000đ</td>
                <td className="p-4 font-semibold text-red-400 text-center">180.000đ</td>
                <td className="p-4 font-semibold text-center">90.000đ</td>
                <td className="p-4 font-semibold text-amber-400 text-center">95.000đ</td>
                <td className="p-4 font-semibold text-red-400 text-center">200.000đ</td>
              </tr>

              <tr>
                <td className="p-4 text-left">Từ 23:00<br/><span className="text-xs text-gray-400">From 23:00</span></td>
                <td className="p-4 font-semibold text-center">65.000đ</td>
                <td className="p-4 font-semibold text-amber-400 text-center">70.000đ</td>
                <td className="p-4 font-semibold text-red-400 text-center">150.000đ</td>
                <td className="p-4 font-semibold text-center">75.000đ</td>
                <td className="p-4 font-semibold text-amber-400 text-center">80.000đ</td>
                <td className="p-4 font-semibold text-red-400 text-center">170.000đ</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={7} className="p-4 text-sm text-gray-400 text-left">* Đối với phim có thời lượng từ 150 phút trở lên: phụ thu 10.000 VNĐ / vé</td>
              </tr>
            </tfoot>
          </table>
        </section>

        {/* 3D Table */}
        <section className="mb-8">
          <table className="w-full md:w-11/12 mx-auto border border-gray-700 text-sm md:text-base table-auto">
            <caption className="text-left font-semibold text-lg md:text-xl p-4">2. GIÁ VÉ XEM PHIM 3D</caption>
            <thead className="bg-gray-800">
              <tr>
                <th className="p-4 border-r border-gray-700">&nbsp;</th>
                <th colSpan={3} className="p-4 text-gray-400">Từ thứ 2 đến thứ 5<br/><span className="text-xs text-gray-500">From Monday to Thursday</span></th>
                <th colSpan={3} className="p-4 text-gray-400">Thứ 6, 7, CN và ngày Lễ<br/><span className="text-xs text-gray-500">Friday, Saturday, Sunday &amp; public holiday</span></th>
              </tr>
              <tr className="bg-gray-900">
                <th className="p-4 text-left text-gray-400">Thời gian</th>
                <th className="p-4 text-gray-400">Ghế thường<br/><span className="text-xs text-gray-500">Standard</span></th>
                <th className="p-4 text-amber-400">Ghế VIP<br/><span className="text-xs text-gray-500">VIP</span></th>
                <th className="p-4 text-red-400">Ghế đôi<br/><span className="text-xs text-gray-500">Sweetbox</span></th>
                <th className="p-4 text-gray-400">Ghế thường<br/><span className="text-xs text-gray-500">Standard</span></th>
                <th className="p-4 text-amber-400">Ghế VIP<br/><span className="text-xs text-gray-500">VIP</span></th>
                <th className="p-4 text-red-400">Ghế đôi<br/><span className="text-xs text-gray-500">Sweetbox</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              <tr>
                <td className="p-4 text-left">Trước 12h<br/><span className="text-xs text-gray-400">Before 12PM</span></td>
                <td className="p-4 font-semibold text-center">60.000đ</td>
                <td className="p-4 font-semibold text-center text-amber-400">80.000đ</td>
                <td className="p-4 font-semibold text-center text-red-400">160.000đ</td>
                <td className="p-4 font-semibold text-center">80.000đ</td>
                <td className="p-4 font-semibold text-center text-amber-400">100.000đ</td>
                <td className="p-4 font-semibold text-center text-red-400">200.000đ</td>
              </tr>

              <tr>
                <td className="p-4 text-left">Từ 12:00 đến trước 17:00<br/><span className="text-xs text-gray-400">From 12:00 to before 17:00</span></td>
                <td className="p-4 font-semibold text-center">80.000đ</td>
                <td className="p-4 font-semibold text-center text-amber-400">90.000đ</td>
                <td className="p-4 font-semibold text-center text-red-400">180.000đ</td>
                <td className="p-4 font-semibold text-center">100.000đ</td>
                <td className="p-4 font-semibold text-center text-amber-400">110.000đ</td>
                <td className="p-4 font-semibold text-center text-red-400">220.000đ</td>
              </tr>

              <tr>
                <td className="p-4 text-left">Từ 17:00 đến trước 23:00<br/><span className="text-xs text-gray-400">From 17:00 to before 23:00</span></td>
                <td className="p-4 font-semibold text-center">100.000đ</td>
                <td className="p-4 font-semibold text-center text-amber-400">110.000đ</td>
                <td className="p-4 font-semibold text-center text-red-400">220.000đ</td>
                <td className="p-4 font-semibold text-center">130.000đ</td>
                <td className="p-4 font-semibold text-center text-amber-400">140.000đ</td>
                <td className="p-4 font-semibold text-center text-red-400">280.000đ</td>
              </tr>

              <tr>
                <td className="p-4 text-left">Từ 23:00<br/><span className="text-xs text-gray-400">From 23:00</span></td>
                <td className="p-4 font-semibold text-center">100.000đ</td>
                <td className="p-4 font-semibold text-center text-amber-400">110.000đ</td>
                <td className="p-4 font-semibold text-center text-red-400">220.000đ</td>
                <td className="p-4 font-semibold text-center">120.000đ</td>
                <td className="p-4 font-semibold text-center text-amber-400">130.000đ</td>
                <td className="p-4 font-semibold text-center text-red-400">260.000đ</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={7} className="p-4 text-sm text-gray-400 text-left">* Đối với phim có thời lượng từ 150 phút trở lên: phụ thu 10.000 VNĐ / vé</td>
              </tr>
            </tfoot>
          </table>
        </section>

        {/* After tables: text sections - converted to tailwind spacing */}
        <section className="space-y-4 text-sm md:text-base text-gray-100">
          <div className="bg-gray-800 p-6 rounded-md">
            <h3 className="font-semibold mb-2">* Giá vé đối với các đối tượng khán giả ưu tiên (khi trực tiếp sử dụng dịch vụ xem phim tại rạp chiếu phim):</h3>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Giảm 20% giá vé theo qui định đối với: Trẻ em (người dưới 16 tuổi), người cao tuổi (từ 60 tuổi trở lên), người có công, người có hoàn cảnh khó khăn.</li>
              <li>Giảm 50% đối với: Người khuyết tật nặng.</li>
              <li>Giảm 100% đối với: Người khuyết tật đặc biệt nặng, trẻ em dưới 0.7m đi kèm người lớn.</li>
            </ul>
          </div>

          <div className="p-6 rounded-md">
            <h3 className="italic font-semibold">Điều kiện:</h3>
            <ul className="list-inside list-disc text-gray-300 ml-4 space-y-1">
              <li>Chỉ áp dụng khi mua vé tại quầy (không áp dụng mua online).</li>
              <li>Các đối tượng phải xuất trình giấy tờ khi mua vé và trước khi vào phòng chiếu.</li>
            </ul>
            <ul className="list-none ml-4 mt-2 space-y-1 text-gray-300">
              <li>- Trẻ em (14-16): xuất trình Căn cước công dân.</li>
              <li>- Người có công: xuất trình giấy xác nhận theo quy định.</li>
              <li>- Người hoàn cảnh khó khăn: Giấy chứng nhận hộ nghèo.</li>
              <li>- Người khuyết tật: Giấy xác nhận khuyết tật.</li>
            </ul>
          </div>

          <div className="p-6 rounded-md bg-gray-800">
            <h3 className="font-semibold">* Ưu đãi cho học sinh, sinh viên từ 22 tuổi trở xuống:</h3>
            <p className="text-gray-300">Đồng giá 55.000đ / vé 2D cho tất cả các suất chiếu từ Thứ 2 đến Thứ 6 (áp dụng mua trực tiếp tại quầy, không áp dụng ghế đôi).</p>
          </div>

          <p className="text-gray-300">* Khán giả nghiêm túc thực hiện xem phim đúng độ tuổi theo phân loại phim: P, K, T13, T16, T18, C.</p>

          <div className="p-6 rounded-md bg-gray-800">
            <h3 className="font-semibold">* Áp dụng giá vé ngày Lễ, Tết cho các ngày:</h3>
            <ul className="list-disc list-inside text-gray-300">
              <li>Ngày nghỉ Lễ theo quy định: Tết Nguyên Đán, Tết Dương Lịch, Giỗ Tổ Hùng Vương, 30/4, 1/5, 2/9.</li>
              <li>Ngày: 14/2, 8/3, 24/12.</li>
              <li>Ngày nghỉ bù do Lễ trùng cuối tuần.</li>
            </ul>
          </div>

          <p className="text-gray-300">* Không áp dụng các chế độ ưu đãi, khuyến mại khác vào các ngày 20/10, 20/11, Halloween 31/10, Lễ, Tết, suất chiếu sớm và suất chiếu đặc biệt.</p>

          <p className="text-gray-300">ĐỀ NGHỊ QUÝ KHÁN GIẢ LƯU Ý KHI MUA VÉ XEM PHIM (ĐẶC BIỆT KHI MUA VÉ ONLINE). TTCPQG KHÔNG CHẤP NHẬN HOÀN TIỀN HOẶC ĐỔI VÉ ĐÃ THANH TOÁN THÀNH CÔNG.</p>

          <div className="flex flex-col md:flex-row md:justify-between gap-4">
            <div>
              <p className="text-gray-300">- Mua vé xem phim tập thể, hợp đồng khoán gọn:</p>
              <p className="italic text-gray-200">Phòng Chiếu phim - (024) 35148647</p>
            </div>

            <div>
              <p className="text-gray-300">- Thuê phòng tổ chức Hội nghị, quảng cáo và dịch vụ khác:</p>
              <p className="italic text-gray-200">Phòng Dịch vụ - (024) 35142856</p>
            </div>
          </div>

        </section>

      </main>
    </div>
  );
}
