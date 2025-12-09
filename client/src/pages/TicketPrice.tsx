import Header from "../pages/Layout1";
import Footer from "../pages/Layout2";
import "../index.css"
export default function TicketPrice() {
  return (
    <div>
      <div className="container-fluid relative mt-20 bg-gray-900 w-full h-min-screen">
        <Header></Header>
        <main className="main">
          <div className="main_title">
            <div className="big">Giá vé</div>
            <div className="small">(Áp dụng từ ngày 01/06/2023)</div>
          </div>
          <table>
            <caption className="price_title">1. GIÁ VÉ XEM PHIM 2D</caption>
            <tbody>
              <tr>
                <th>&nbsp;</th>
                <th colSpan={3} className="gray">
                  Từ thứ 2 đến thứ 5
                  <br />
                  From Monday to Thursday
                </th>
                <th colSpan={3} className="gray">
                  Thứ 6, 7, CN và ngày Lễ <br />
                  Friday, Saturday, Sunday &amp; public holiday
                </th>
              </tr>
              <tr>
                <td className="align_left gray">Thời gian</td>
                <td className="gray">
                  Ghế thường <br />
                  Standard
                </td>
                <td className="vip">
                  Ghế VIP <br />
                  VIP
                </td>
                <td className="sweetbox">
                  Ghế đôi <br />
                  Sweetbox
                </td>
                <td className="gray">
                  Ghế thường <br />
                  Standard
                </td>
                <td className="vip">
                  Ghế VIP <br />
                  VIP
                </td>
                <td className="sweetbox">
                  Ghế đôi <br />
                  Sweetbox
                </td>
              </tr>
              <tr>
                <td className="align_left">
                  Trước 12h <br />
                  Before 12PM
                </td>
                <td>55.000đ</td>
                <td className="vip">65.000đ</td>
                <td className="sweetbox">140.000đ</td>
                <td>70.000đ</td>
                <td className="vip">80.000đ</td>
                <td className="sweetbox">170.000đ</td>
              </tr>
              <tr>
                <td className="align_left">
                  Từ 12:00 đến trước 17:00 <br />
                  From 5PM to before 11:00PM
                </td>
                <td>70.000đ</td>
                <td className="vip">75.000đ</td>
                <td className="sweetbox">160.000đ</td>
                <td>80.000đ</td>
                <td className="vip">85.000đ</td>
                <td className="sweetbox">180.000đ</td>
              </tr>
              <tr>
                <td className="align_left">
                  Từ 17:00 đến trước 23:00 <br />
                  From 5PM to before 11:00PM
                </td>
                <td>80.000đ</td>
                <td className="vip">85.000đ</td>
                <td className="sweetbox">180.000đ</td>
                <td>90.000đ</td>
                <td className="vip">95.000đ</td>
                <td className="sweetbox">200.000đ</td>
              </tr>
              <tr>
                <td className="align_left">
                  Từ 23:00 <br />
                  From 11:00PM
                </td>
                <td>65.000đ</td>
                <td className="vip">70.000đ</td>
                <td className="sweetbox">150.000đ</td>
                <td>75.000đ</td>
                <td className="vip">80.000đ</td>
                <td className="sweetbox">170.000đ</td>
              </tr>
            </tbody>
            <caption className="ps" style={{ captionSide: "bottom" }}>
              * Đối với phim có thời lượng từ 150 phút trở lên: phụ thu 10.000
              VNĐ / vé
            </caption>
          </table>
          <br />
          <table>
            <caption className="price_title">2. GIÁ VÉ XEM PHIM 3D</caption>
            <tbody>
              <tr>
                <th>&nbsp;</th>
                <th colSpan={3}>
                  Từ thứ 2 đến thứ 5 <br />
                  From Monday to Thursday
                </th>
                <th colSpan={3}>
                  Thứ 6, 7, CN và ngày Lễ <br />
                  Friday, Saturday, Sunday &amp; public holiday
                </th>
              </tr>
              <tr>
                <td className="align_left gray">Thời gian</td>
                <td className="gray">
                  Ghế thường <br />
                  Standard
                </td>
                <td className="vip">
                  Ghế VIP <br />
                  VIP
                </td>
                <td className="sweetbox">
                  Ghế đôi <br />
                  Sweetbox
                </td>
                <td className="gray">
                  Ghế thường <br />
                  Standard
                </td>
                <td className="vip">
                  Ghế VIP <br />
                  VIP
                </td>
                <td className="sweetbox">
                  Ghế đôi <br />
                  Sweetbox
                </td>
              </tr>
              <tr>
                <td className="align_left">
                  Trước 12h <br />
                  Before 12PM
                </td>
                <td>60.000đ</td>
                <td className="vip">80.000đ</td>
                <td className="sweetbox">160.000đ</td>
                <td>80.000đ</td>
                <td className="vip">100.000đ</td>
                <td className="sweetbox">200.000đ</td>
              </tr>
              <tr>
                <td className="align_left">
                  Từ 12:00 đến trước 17:00 <br />
                  From 5PM to before 11:00PM
                </td>
                <td>80.000đ</td>
                <td className="vip">90.000đ</td>
                <td className="sweetbox">180.000đ</td>
                <td>100.000đ</td>
                <td className="vip">110.000đ</td>
                <td className="sweetbox">220.000đ</td>
              </tr>
              <tr>
                <td className="align_left">
                  Từ 17:00 đến trước 23:00 <br />
                  From 5PM to before 11:00PM
                </td>
                <td>100.000đ</td>
                <td className="vip">110.000đ</td>
                <td className="sweetbox">220.000đ</td>
                <td>130.000đ</td>
                <td className="vip">140.000đ</td>
                <td className="sweetbox">280.000đ</td>
              </tr>
              <tr>
                <td className="align_left">
                  Từ 23:00 <br />
                  From 11:00PM
                </td>
                <td>100.000đ</td>
                <td className="vip">110.000đ</td>
                <td className="sweetbox">220.000đ</td>
                <td>120.000đ</td>
                <td className="vip">130.000đ</td>
                <td className="sweetbox">260.000đ</td>
              </tr>
            </tbody>
            <caption className="ps" style={{ captionSide: "bottom" }}>
              * Đối với phim có thời lượng từ 150 phút trở lên: phụ thu 10.000
              VNĐ / vé
            </caption>
          </table>
          <div className="underTable">
            <div className="specialUsers">
              <h3>
                * Giá vé đối với các đối tượng khán giả ưu tiên (khi trực tiếp
                sử dụng dịch vụ xem phim tại rạp chiếu phim):
              </h3>
              <ul>
                <li>
                  Giảm 20% giá vé theo qui định đối với: Trẻ em (người dưới 16
                  tuổi), người cao tuổi (công dân Việt Nam từ đủ 60 tuổi trở
                  lên), người có công với cách mạng, người có hoàn cảnh đặc biệt
                  khó khăn.
                </li>
                <li>
                  Giảm 50% giá vé theo qui định đối với: Người khuyết tật nặng.
                </li>
                <li>
                  Giảm giá vé 100% đối với: Người khuyết tật đặc biệt nặng, trẻ
                  em dưới 0.7m đi kèm với người lớn.
                </li>
              </ul>
              <div className="condition">
                <h3 className="italic">Điều kiện:</h3>
                <ul>
                  <li>
                    Chỉ áp dụng khi mua vé tại quầy (không áp dụng khi mua
                    online).
                  </li>
                  <li>
                    Các đối tượng khán giả trên phải xuất trình giấy tờ chứng
                    minh khi mua vé xem phim và trước khi vào phòng chiếu. Cụ
                    thể:
                  </li>
                  <ul className="smaller_ul">
                    <li className="smaller_li">
                      - Trẻ em (trường hợp trẻ em từ 14-16 tuổi), người cao
                      tuổi: xuất trình "Căn cước công dân".
                    </li>
                    <li className="smaller_li">
                      - Người có công với cách mạng: xuất trình giấy xác nhận
                      theo quy định.
                    </li>
                    <li className="smaller_li">
                      - Người có hoàn cảnh đặc biệt khó khăn: xuất trình "Giấy
                      chứng nhận hộ nghèo".
                    </li>
                    <li className="smaller_li">
                      - Người khuyết tật: xuất trình "Giấy xác nhận khuyết tật".
                    </li>
                  </ul>
                </ul>
              </div>
            </div>
            <h3>
              * Ưu đãi cho học sinh, sinh viên từ&nbsp;22&nbsp;tuổi trở xuống:
              Đồng giá&nbsp;55.000đ&nbsp;/vé&nbsp;2D cho tất cả các suất chiếu
              phim từ&nbsp;Thứ 2 đến Thứ 6 (chỉ áp dụng cho hình thức mua vé
              trực tiếp tại quầy, không áp dụng với ghế đôi; Mỗi thẻ được mua 1
              vé/ngày và vui lòng xuất trình thẻ U22 kèm thẻ HSSV khi mua vé)
            </h3>
            <h3>
              * Khán giả nghiêm túc thực hiện xem phim đúng độ tuổi theo phân
              loại phim: P, K, T13, T16, T18, C.&nbsp;(Trường hợp vi phạm sẽ xử
              phạt theo Quy định tại Nghị định 128/2022/NĐ-CP ngày 30/12/2022).
            </h3>
            <h3>
              * Không bán vé cho trẻ em dưới 13 tuổi đối với các suất chiếu phim
              kết thúc sau 22h00 và không bán vé cho trẻ em dưới 16 tuổi đối với
              các suất chiếu phim kết thúc sau 23h00.
            </h3>
            <div className="ticketPriceCondition">
              <h3>* Áp dụng giá vé ngày Lễ, Tết cho các ngày:</h3>
              <ul>
                <li>
                  Các ngày nghỉ Lễ, Tết theo quy định của nhà nước: Tết Nguyên
                  Đán, Tết Dương Lịch, ngày Giỗ Tổ Hùng Vương 10/3 AL, ngày
                  30/4, 1/5, 2/9.
                </li>
                <li>Các ngày: 14/2, 8/3, 24/12.</li>
                <li>
                  Các ngày nghỉ Lễ, Tết theo quy định của nhà nước: Tết Nguyên
                  Đán, Tết Dương Lịch, ngày Giỗ Tổ Hùng Vương 10/3 AL, ngày
                  30/4, 1/5, 2/9. Các ngày: 14/2, 8/3, 24/12. Các ngày: Nghỉ bù
                  do nghỉ Lễ, Tết trùng vào thứ 7, Chủ Nhật.
                </li>
              </ul>
            </div>
            <h3>
              * Không áp dụng các chế độ ưu đãi, các chương trình khuyến mại
              khác vào các ngày 20/10, 20/11, Halloween 31/10, các ngày Lễ, Tết,
              suất chiếu sớm và suất chiếu đặc biệt.
            </h3>
            <h3>
              * Mua vé xem phim tập thẻ, hợp đồng khoán gọn: Phòng chiếu phim -
              (024) 35148647.
            </h3>
            <h3>
              * Thuê phòng tổ chức Hội nghị, làm văn phòng, quảng cáo và các
              dịch vụ khác: Phòng Dịch vụ - (024) 35142856
            </h3>
            <p>
              ĐỀ NGHỊ QUÝ KHÁN GIẢ LƯU Ý KHI MUA VÉ XEM PHIM (ĐẶC BIỆT KHI MUA
              VÉ ONLINE). TTCPQG KHÔNG CHẤP NHẬN HOÀN TIỀN HOẶC ĐỔI VÉ ĐÃ THANH
              TOÁN THÀNH CÔNG KHI MUA VÉ ONLINE VÀ VÉ MUA SAI QUY ĐỊNH TẠI QUẦY
              VÉ.
            </p>
            <p>
              Rất mong Quý khán giả phối hợp thực hiện. Xin trân trọng cảm ơn!
            </p>
            <div className="specialUsers">
              <h3>
                * Ticket pricing policy for priority audiences watching movies
                at the cinema:
              </h3>
              <ul>
                <li>
                  Discount 20% on ticket price for: Children and teenagers
                  (under 16 years old), elderly people (Vietnamese citizens aged
                  from 60 years old), revolutionary contributors, people with
                  difficult living conditions.
                </li>
                <li>
                  Discount 50% on ticket price as regulations for: People with
                  severe disabilities.
                </li>
                <li>
                  Discount 100% on ticket price for: People with particularly
                  severe disabilities; Children under 0.7m accompanied by
                  adults.
                </li>
              </ul>
            </div>
            <div className="condition">
              <h3 className="italic">Condition:</h3>
              <ul>
                <li>
                  Only applicable when buying tickets at the counter (not
                  applicable for online tickets).
                </li>
                <li>
                  The above-mentioned audiences must present Identification
                  Documents when buying movie tickets and before entering the
                  screening room. Particularly:
                </li>
                <ul className="smaller_ul">
                  <li className="smaller_li">
                    - Teenagers (14-16 years old), elderly people: must present
                    "ID card".
                  </li>
                  <li className="smaller_li">
                    - Revolutionary contributors: must present a certificate as
                    prescribed.
                  </li>
                  <li className="smaller_li">
                    - People with difficult living conditions: must present
                    "Certificate of Poor Household".
                  </li>
                  <li className="smaller_li">
                    - People with disabilities: must present "Certificate of
                    Disability".
                  </li>
                </ul>
              </ul>
            </div>
            <h3>
              * Special promotion for student who is&nbsp;22&nbsp;years old and
              under:&nbsp;From Monday to Friday 55.000đ/2D&nbsp;ticket for all
              slot times (only apply for direct purchase at the ticket stall,
              one student card can buy one ticket/day, student should show their
              U22 and student cards to get this priority).
            </h3>
            <h3>
              * Strict implementation of audience classification according to
              their ages: P, K, T13, T16, T18, C. (Violation will be sanctioned
              according to the provisions of Decree 128/2022/ND-CP dated on
              December 30, 2022).
            </h3>
            <h3>
              * Tickets for movies ending after 22:00 are not sold to teenagers
              under 13 years old and tickets for movies ending after 23:00 are
              not sold to teenagers under 16 years old.
            </h3>
            <h3>* Holiday price is applied on:</h3>
            <ul>
              <li>
                The public holidays as prescribed by state: New year, Lunar new
                year, Hung's King festival (March 10th - lunar calender), April
                30th, May 1st, September 2nd.
              </li>
              <li>Days: Valentine, Women's Day, Noel.</li>
              <li>
                Compensatory days off due to holidays coinciding with Saturday
                and Sunday.
              </li>
            </ul>
            <h3>
              * Do not apply preferential programs and different promotional
              ones in the day 20/10, 20/11, Halloween 31/10, holidays, sneak
              show and special show.
            </h3>
            <p>
              VALUED AUDIENCES PLEASE TAKE INTO CONSIDERATION WHEN BUYING MOVIE
              TICKETS (ESPECIALLY FOR ONLINE TICKETS). THE NATIONAL CINEMA
              CENTER DOES NOT ACCEPT REFUNDS OR EXCHANGES OF SUCCESSFULLY PAID
              TICKETS (ONLINE TICKETS AND INCORRECTLY PURCHASED TICKETS AT THE
              COUNTER)
            </p>
            <p>Thank you for your valued cooperation. Best Regards!</p>
            <p>----------------------------------------------------------</p>
            <div className="nearFooter">
              <p>
                -&nbsp;&nbsp;Mua vé xem phim tập thể, hợp đồng khoán gọn:&nbsp;
              </p>
              <h3 className="italic">Phòng Chiếu phim - (024) 35148647</h3>
              <p>
                -&nbsp;&nbsp;Thuê phòng tổ chức Hội nghị, làm văn phòng, quảng
                cáo và các dịch vụ khác:&nbsp;&nbsp;
              </p>
              <h3>Phòng Dịch vụ - (024) 35142856&nbsp;</h3>
              <h3>.TTCPQG</h3>
            </div>
          </div>
        </main>
        <Footer></Footer>
      </div>
    </div>
  );
}
