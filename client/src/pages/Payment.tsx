import { useState } from 'react';
import vietqr from '../assets/imgs/079bbb2cb9bed5ffebb0429a5a70b039362828c2.png';
import vnpay from '../assets/imgs/vnpay 1.svg';
import viettel from '../assets/imgs/viettel1 1.png';
import payoo from '../assets/imgs/payoo 1.svg';
import QRCode from 'react-qr-code';
import success from '../assets/imgs/Group.png';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hook/useRedux';
import { seatPrices, type Booking } from '../types/booking.interface';
import { notify } from '../util/toast';
import { createPayment } from '../api/payment.api';

type PaymentStep = 'select' | 'qr' | 'success';

function generateRandomValue(amount: number, billId: string) {
    return `0002010102115303764...54${amount.toFixed(
        0
    )}...59NCC60Hanoi62${billId}6304XXXX`;
}

export default function Payment() {
    const navigate = useNavigate();
    const booking: Booking = useAppSelector((s) => s.booking);
    const dispatch = useAppDispatch();

    const listSeats = booking.seats
        .map((seat) => seat.row + seat.number)
        .join(',');

    const totalMoney = booking.seats.reduce(
        (acc, seat) => acc + seatPrices[seat.type],
        0
    );

    const [step, setStep] = useState<PaymentStep>('select');
    const [qr] = useState(() =>
        generateRandomValue(totalMoney, new Date().getTime().toString())
    );
    const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

    const paymentMethods = [
        { id: 'vietqr', name: 'VietQR', img: vietqr },
        { id: 'vnpay', name: 'VNPAY', img: vnpay },
        { id: 'viettel', name: 'ViettelMoney', img: viettel },
        { id: 'payoo', name: 'Payoo', img: payoo },
    ];

    const handlePayment = () => {
        if (!selectedMethod) {
            notify.error('Vui lòng chọn phương thức thanh toán');
            return;
        }
        setStep('qr');
        dispatch(
            createPayment({
                showTimeId: booking.showTimeId,
                seatBooked: booking.seats,
                totalAmount: totalMoney,
                paymentMethod: selectedMethod,
                bookingDate: new Date().toISOString(),
                userId: booking.userId,
                nameFilm: booking.nameFilm
            })
        );
    };

    return (
        <div className="bg-gray-900 min-h-screen text-white">
            {/* ===== SUCCESS ===== */}
            {step === 'success' && (
                <div className="flex flex-col items-center justify-center h-screen gap-4">
                    <img src={success} width={100} />
                    <h2 className="text-2xl font-bold">Đặt vé thành công!</h2>
                    <p className="text-orange-400 text-center">
                        Hãy đến đúng giờ và tận hưởng bộ phim 🎬
                    </p>
                    <button
                        className="px-20 py-2 bg-red-600 rounded-full"
                        onClick={() => navigate('/')}
                    >
                        Về trang chủ
                    </button>
                </div>
            )}

            {/* ===== BODY ===== */}
            {step !== 'success' && (
                <div className="py-10 flex justify-center gap-10">
                    {/* LEFT */}
                    <div className="flex flex-col gap-5 w-[600px]">
                        {/* Thông tin phim */}
                        <div className="bg-[#1A1D23] p-6 rounded-lg">
                            <h3 className="mb-3">Thông tin phim</h3>
                            <div className="text-gray-400">Phim</div>
                            <div>{booking.nameFilm}</div>

                            <div className="flex justify-between mt-4">
                                <div>
                                    <div className="text-gray-400">
                                        Ngày giờ chiếu
                                    </div>
                                    <div>{booking.showtime}</div>
                                    <div className="text-gray-400 mt-2">
                                        Định dạng
                                    </div>
                                    <div>{booking.type}</div>
                                </div>
                                <div>
                                    <div className="text-gray-400">Ghế</div>
                                    <div>{listSeats}</div>
                                    <div className="text-gray-400 mt-2">
                                        Phòng chiếu
                                    </div>
                                    <div>{booking.nameScreen}</div>
                                </div>
                            </div>
                        </div>

                        {/* Thông tin thanh toán */}
                        <div className="bg-[#1A1D23] p-6 rounded-lg">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-700">
                                        <th className="text-left py-2">
                                            Danh mục
                                        </th>
                                        <th className="text-center">
                                            Số lượng
                                        </th>
                                        <th className="text-right">
                                            Tổng tiền
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Ghế ({listSeats})</td>
                                        <td className="text-center">
                                            {booking.seats.length}
                                        </td>
                                        <td className="text-right font-semibold">
                                            {totalMoney.toLocaleString('vi-VN')}{' '}
                                            đ
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="w-80 bg-black rounded-lg">
                        <div className="p-5 space-y-3">
                            <h3>Phương thức thanh toán</h3>

                            {paymentMethods.map((m) => (
                                <label
                                    key={m.id}
                                    className={`flex items-center gap-3 p-3 border-2 rounded-xl cursor-pointer ${
                                        selectedMethod === m.id
                                            ? 'border-red-500'
                                            : 'border-transparent'
                                    }`}
                                >
                                    <input
                                        type="radio"
                                        name="method"
                                        checked={selectedMethod === m.id}
                                        onChange={() => setSelectedMethod(m.id)}
                                        className="accent-red-500"
                                    />
                                    <img src={m.img} width={60} />
                                    {m.name}
                                </label>
                            ))}

                            {/* PRICE / QR */}
                            {step === 'select' && (
                                <div className="border-t border-gray-700 pt-4">
                                    <div className="flex justify-between">
                                        <span>Tổng cộng</span>
                                        <span className="text-red-500 font-bold">
                                            {totalMoney.toLocaleString('vi-VN')}{' '}
                                            đ
                                        </span>
                                    </div>
                                </div>
                            )}

                            {step === 'qr' && (
                                <div className="flex justify-center py-4">
                                    <QRCode value={qr} size={240} />
                                </div>
                            )}

                            {/* BUTTON */}
                            <button
                                className="w-full bg-red-600 py-2 rounded-xl font-bold"
                                onClick={() => {
                                    if (step === 'select') handlePayment();
                                    else setStep('success');
                                }}
                            >
                                {step === 'select' ? 'Thanh toán' : 'Xác nhận'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
