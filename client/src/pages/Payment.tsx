import { useState } from "react";
import logo from "../assets/imgs/image.png";
import fb from "../assets/imgs/Facebook.png";
import zalo from "../assets/imgs/Zalo.png";
import ytb from "../assets/imgs/Youtube.png";
import gp from "../assets/imgs/GG Play.png";
import as from "../assets/imgs/App store.png";
import tem from "../assets/imgs/Copyright.png";
import vietqr from "../assets/imgs/079bbb2cb9bed5ffebb0429a5a70b039362828c2.png";
import vnpay from "../assets/imgs/vnpay 1.svg";
import viettel from "../assets/imgs/viettel1 1.png";
import payoo from "../assets/imgs/payoo 1.svg";
import QRCode from "react-qr-code";
import success from "../assets/imgs/Group.png";
function generateRandomValue(amount: number, billId: string) {
  const qrData = `0002010102115303764...54${amount.toFixed(
    0
  )}...59NCC60Hanoi62${billId}6304XXXX`;
  return qrData;
}
export default function Payment() {
  const paymentMethods = [
    { id: "vietqr", name: "VietQR", logo: "VietQR", img: vietqr },
    { id: "vnpay", name: "VNPAY", logo: "VNPAY", img: vnpay },
    {
      id: "viettel",
      name: "Viettel Money",
      logo: "Viettel Money",
      img: viettel,
    },
    { id: "payoo", name: "Payoo", logo: "Payoo", img: payoo },
  ];
  const [qr, setQr] = useState(generateRandomValue(50000, Date.now.toString()));
  const handleGenerate = () => {
    setQr(generateRandomValue(50000, Date.now.toString()));
  };
  return (
    <div className="container-fluid relative mt-20 bg-gray-900 w-full h-min-screen">
      {/* Header */}
      <div className="w-full h-20 bg-black fixed top-0">
        <div className="size- left-[1073px] top-5 absolute inline-flex justify-center items-center gap-4">
          <div
            data-hover="false"
            data-variant="1"
            className="h-10 px-[33px] py-2.5 rounded-full outline-1 outline-offset- outline-white flex justify-center items-center"
          >
            <div className="text-center justify-center text-white text-sm font-medium font-['Montserrat'] leading-5">
              Đăng ký
            </div>
          </div>
          <div
            data-hover="false"
            data-variant="2"
            className="h-10 px-8 py-2.5 bg-red-500 rounded-full flex justify-center items-center"
          >
            <div className="text-center justify-center text-white text-sm font-medium font-['Montserrat'] leading-5">
              Đăng nhập
            </div>
          </div>
        </div>
        <img
          className="w-[70px] h-[50px] left-[79.50px] top-[15.24px] absolute"
          src={logo}
        />
        <div className="size- left-[205.50px] top-[28.24px] absolute inline-flex justify-start items-center gap-10">
          <div
            data-hover="false"
            data-variant="4"
            className="size- inline-flex flex-col justify-start items-start"
          >
            <div className="justify-center text-white text-base font-normal font-['Montserrat'] leading-6">
              Trang chủ
            </div>
          </div>
          <div
            data-hover="false"
            data-variant="1"
            className="size- inline-flex flex-col justify-start items-start"
          >
            <div className="justify-center text-white text-base font-normal font-['Montserrat'] leading-6">
              Lịch chiếu
            </div>
          </div>
          <div
            data-hover="false"
            data-variant="1"
            className="size- inline-flex flex-col justify-start items-start"
          >
            <div className="justify-center text-white text-base font-normal font-['Montserrat'] leading-6">
              Tin tức
            </div>
          </div>
          <div
            data-hover="false"
            data-variant="1"
            className="size- inline-flex flex-col justify-start items-start"
          >
            <div className="justify-center text-white text-base font-normal font-['Montserrat'] leading-6">
              Khuyến mãi
            </div>
          </div>
          <div
            data-hover="false"
            data-variant="1"
            className="size- inline-flex flex-col justify-start items-start"
          >
            <div className="justify-center text-white text-base font-normal font-['Montserrat'] leading-6">
              Giá vé
            </div>
          </div>
          <div
            data-hover="false"
            data-variant="1"
            className="size- inline-flex flex-col justify-start items-start"
          >
            <div className="justify-center text-white text-base font-normal font-['Montserrat'] leading-6">
              Liên hoan phim
            </div>
          </div>
        </div>
      </div>
      {/* Body */}
      <div className="paymentSuccess flex flex-col justify-center items-center">
          <img src={success} width="100px" height="100px"/>
          <span className="font-bold w-50 h-8 text-white">Đặt vé thành công</span>
          <span className="text-[#F97316]">Lưu ý: Hãy đến đúng giờ của suất chiếu và tận hưởng bộ phim</span>
      </div>
      <div className="py-10 flex justify-center gap-10 w-full body">
        <div className="flex flex-col gap-5">
          <div className="text-white gap-3 rounded-lg bg-[#1A1D23] p-7">
            <div>Thông tin phim</div>
            <div className="flex flex-col gap-1">
              <span className="text-gray-400">Phim</span>
              <span>Tên Phim</span>
            </div>
            <div className="flex flex-row justify-between gap-40">
              <div className="flex flex-col">
                <div className="flex flex-col gap-1 w-full pr-30">
                  <span className="text-gray-400">Ngày giờ chiếu</span>
                  <span>Giờ chiếu</span>
                </div>
                <div className="flex flex-col gap-1 w-full pr-30">
                  <span className="text-gray-400">Định dạng</span>
                  <span>2D</span>
                </div>
              </div>
              <div className="flex flex-col pr-30">
                <div className="flex flex-col gap-1 w-full pr-30">
                  <span className="text-gray-400">Ghế</span>
                  <span>Ghế</span>
                </div>
                <div className="flex flex-col gap-1 w-full pr-30">
                  <span className="text-gray-400">Phòng chiếu</span>
                  <span>12</span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-white gap-3 rounded-lg bg-[#1A1D23] p-7">
            Thông tin thanh toán
            <div className="border border-white rounded-lg">
              <table className="w-full h-20 text-left">
                {/* Header */}
                <thead>
                  <tr className="border-b border-white">
                    <th className="px-5 py-3 text-xs font-medium text-gray-400">
                      Danh mục
                    </th>
                    <th className="px-5 py-3 text-xs font-medium text-gray-400 text-center">
                      Số lượng
                    </th>
                    <th className="px-5 py-3 text-xs font-medium text-gray-400 text-right">
                      Tổng tiền
                    </th>
                  </tr>
                </thead>

                {/* Body */}
                <tbody>
                  <tr className="border-b border-gray-800/50">
                    <td className="px-5 py-4 text-sm text-white font-medium">
                      Ghế (B1,B2)
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-300 text-center">
                      2
                    </td>
                    <td className="px-5 py-4 text-sm text-white font-semibold text-right">
                      160.000đ
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* Right */}
        <div className="w-80">
          <div className="h-fit bg-black text-white flex flex-col rounded-lg">
            {/* Header */}
            <div className="px-5 pt-6 pb-3">
              <h1 className="text-lg font-medium">Phương thức thanh toán</h1>
            </div>

            {/* Danh sách phương thức */}
            <div className="px-5 space-y-2">
              {paymentMethods.map((method) => (
                <label
                  key={method.id}
                  className={`flex items-center h-16 px-4 rounded-xl border-2 cursor-pointer transition-all`}
                >
                  <div className="w-3" /> {/* chỗ trống thay cho radio */}
                  <div className="flex items-center flex-1 gap-3">
                    <input
                      className="text-base w-5 h-5 rounded-full appearance-auto accent-red-500"
                      type="checkbox"
                    />
                    <img src={method.img} width="64px" height="21px" />
                    {method.name}
                  </div>
                </label>
              ))}
            </div>

            {/* Tổng tiền */}
            <div className="px-5 py-4 border-gray-800">
              <div className="price">
                <div className="price">Chi phí</div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Thanh toán</span>
                  <span>160.000đ</span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span className="text-gray-400">Phí</span>
                  <span>0đ</span>
                </div>
              </div>
              <QRCode
                value={qr} size={280} fgColor="#000000" bgColor="#fff"
                className="qr hidden"
              ></QRCode>
              <div className="flex justify-between items-baseline mt-3 pt-3 border-t border-gray-800">
                <span className="text-base">Tổng cộng</span>
                <span className="text-xl font-bold text-red-500">160.000đ</span>
              </div>
            </div>

            {/* Nút */}
            <div className="px-5 pb-6">
              <button
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold text-base py-2 rounded-2xl active:scale-98 transition"
                onClick={() => {
                  handleGenerate();
                  document.querySelector(".price")?.classList.add("hidden");
                  document.querySelector(".qr")?.classList.remove("hidden");
                }}
              >
                Thanh toán
              </button>
              <button className="w-full mt-3 text-gray-400 text-center py-2 text-sm">
                Quay lại
              </button>
            </div>

            {/* Lưu ý */}
            <div className="px-6 pb-8 text-center">
              <p className="text-xs leading-4 text-[#F97316]">
                Lưu ý: Không mua vé cho trẻ em dưới 14 tuổi với suất chiếu kết
                thúc sau 22h00 và dưới 16 tuổi với suất chiếu kết thúc sau
                23h00.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="w-full h-[350px] bg-black flex flex-col gap-[30px] pt-10">
        <div className="flex justify-center items-center gap-10">
          <div className="justify-center text-white text-base font-normal font-['Montserrat'] leading-6">
            Chính sách
          </div>
          <div className="justify-center text-white text-base font-normal font-['Montserrat'] leading-6">
            Lịch chiếu
          </div>
          <div className="justify-center text-white text-base font-normal font-['Montserrat'] leading-6">
            Tin tức
          </div>
          <div className="justify-center text-white text-base font-normal font-['Montserrat'] leading-6">
            Giá vé
          </div>
          <div className="justify-center text-white text-base font-normal font-['Montserrat'] leading-6">
            Hỏi đáp
          </div>
          <div className="justify-center text-white text-base font-normal font-['Montserrat'] leading-6">
            Liên hệ
          </div>
        </div>
        <div className="flex justify-center items-center gap-4">
          <img className="size-[30px] relative rounded-sm" src={fb} />
          <img className="size-[30px] relative" src={zalo} />
          <img className="size-[30px] relative rounded-sm" src={ytb} />
          <img className="w-[140px] h-[42.66px]" src={gp} />
          <img className="w-[130px] h-[44.17px]" src={as} />
          <img className="w-[130px] h-[49.25px]" src={tem} />
        </div>
        <div className="w-full flex flex-col justify-center items-center gap-2 align-middle">
          <div className="self-stretch text-center justify-center text-white text-base font-normal font-['Montserrat'] leading-6">
            Cơ quan chủ quản: BỘ VĂN HÓA, THỂ THAO VÀ DU LỊCH
          </div>
          <div className="self-stretch text-center justify-center text-white text-base font-normal font-['Montserrat'] leading-6">
            Bản quyền thuộc Trung tâm Chiếu phim Quốc gia.
          </div>
          <div className="self-stretch text-center justify-center text-white text-base font-normal font-['Montserrat'] leading-6">
            Giấy phép số: 224/GP- TTĐT ngày 31/8/2010 - Chịu trách nhiệm: Vũ Đức
            Tùng – Giám đốc.
          </div>
          <div className="self-stretch text-center justify-center text-white text-base font-normal font-['Montserrat'] leading-6">
            Địa chỉ: 87 Láng Hạ, Quận Ba Đình, Tp. Hà Nội - Điện thoại:
            024.35141791
          </div>
          <div className="size- inline-flex justify-start items-center gap-1">
            <div className="text-center justify-center text-white text-base font-normal font-['Montserrat'] leading-6">
              © 2023 By NCC - All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
