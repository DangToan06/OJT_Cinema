import logo from "../assets/imgs/image.png";
export default function Layout1() {
  return (
    <div>
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
      </div>
  );
}
