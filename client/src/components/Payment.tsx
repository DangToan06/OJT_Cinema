import { useState } from 'react';
import vietqr from '../assets/079bbb2cb9bed5ffebb0429a5a70b039362828c2.png';
import vnpay from '../assets/vnpay 1.svg';
import viettel from '../assets/viettel1 1.png';
import payoo from '../assets/payoo 1.svg';
import QRCode from 'react-qr-code';
import success from '../assets/Group.png';
function generateRandomValue(amount: number, billId: string) {
    const qrData = `0002010102115303764...54${amount.toFixed(
        0
    )}...59NCC60Hanoi62${billId}6304XXXX`;
    return qrData;
}
export default function Payment() {
    const paymentMethods = [
        { id: 'vietqr', name: 'VietQR', logo: 'VietQR', img: vietqr },
        { id: 'vnpay', name: 'VNPAY', logo: 'VNPAY', img: vnpay },
        {
            id: 'viettel',
            name: 'Viettel Money',
            logo: 'Viettel Money',
            img: viettel,
        },
        { id: 'payoo', name: 'Payoo', logo: 'Payoo', img: payoo },
    ];
    const [qr, setQr] = useState(
        generateRandomValue(50000, Date.now.toString())
    );
    const handleGenerate = () => {
        setQr(generateRandomValue(50000, Date.now.toString()));
    };
    return (
        <div className="container-fluid relative bg-gray-900 w-full h-min-screen py-10">
            {/* Body */}
            <div className="paymentSuccess flex flex-col justify-center items-center mt-">
                <img src={success} width="100px" height="100px" />
                <span className="font-bold p-4 text-white text-2xl">
                    Đặt vé thành công
                </span>
                <span className="text-[#F97316]">
                    Lưu ý: Hãy đến đúng giờ của suất chiếu và tận hưởng bộ phim
                </span>
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
                                    <span className="text-gray-400">
                                        Ngày giờ chiếu
                                    </span>
                                    <span>Giờ chiếu</span>
                                </div>
                                <div className="flex flex-col gap-1 w-full pr-30">
                                    <span className="text-gray-400">
                                        Định dạng
                                    </span>
                                    <span>2D</span>
                                </div>
                            </div>
                            <div className="flex flex-col pr-30">
                                <div className="flex flex-col gap-1 w-full pr-30">
                                    <span className="text-gray-400">Ghế</span>
                                    <span>Ghế</span>
                                </div>
                                <div className="flex flex-col gap-1 w-full pr-30">
                                    <span className="text-gray-400">
                                        Phòng chiếu
                                    </span>
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
                            <h1 className="text-lg font-medium">
                                Phương thức thanh toán
                            </h1>
                        </div>

                        {/* Danh sách phương thức */}
                        <div className="px-5 space-y-2">
                            {paymentMethods.map((method) => (
                                <label
                                    key={method.id}
                                    className={`flex items-center h-16 px-4 rounded-xl border-2 cursor-pointer transition-all`}
                                >
                                    <div className="w-3" />{' '}
                                    {/* chỗ trống thay cho radio */}
                                    <div className="flex items-center flex-1 gap-3">
                                        <input
                                            className="text-base w-5 h-5 rounded-full appearance-auto accent-red-500"
                                            type="checkbox"
                                        />
                                        <img
                                            src={method.img}
                                            width="64px"
                                            height="21px"
                                        />
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
                                    <span className="text-gray-400">
                                        Thanh toán
                                    </span>
                                    <span>160.000đ</span>
                                </div>
                                <div className="flex justify-between text-sm mt-1">
                                    <span className="text-gray-400">Phí</span>
                                    <span>0đ</span>
                                </div>
                            </div>
                            <QRCode
                                value={qr}
                                size={280}
                                fgColor="#000000"
                                bgColor="#fff"
                                className="qr hidden"
                            ></QRCode>
                            <div className="flex justify-between items-baseline mt-3 pt-3 border-t border-gray-800">
                                <span className="text-base">Tổng cộng</span>
                                <span className="text-xl font-bold text-red-500">
                                    160.000đ
                                </span>
                            </div>
                        </div>

                        {/* Nút */}
                        <div className="px-5 pb-6">
                            <button
                                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold text-base py-2 rounded-2xl active:scale-98 transition"
                                onClick={() => {
                                    handleGenerate();
                                    document
                                        .querySelector('.price')
                                        ?.classList.add('hidden');
                                    document
                                        .querySelector('.qr')
                                        ?.classList.remove('hidden');
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
                                Lưu ý: Không mua vé cho trẻ em dưới 14 tuổi với
                                suất chiếu kết thúc sau 22h00 và dưới 16 tuổi
                                với suất chiếu kết thúc sau 23h00.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            
            
        </div>
    );
}
