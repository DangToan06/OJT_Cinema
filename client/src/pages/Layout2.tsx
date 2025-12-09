import fb from "../assets/imgs/Facebook.png";
import zalo from "../assets/imgs/Zalo.png";
import ytb from "../assets/imgs/Youtube.png";
import gp from "../assets/imgs/GG Play.png";
import as from "../assets/imgs/App store.png";
import tem from "../assets/imgs/Copyright.png";

export default function Layout2() {
  return (
    <div>
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
