import type { ID, PaymentStatus } from './enums';

/**
 * Thông tin thanh toán của một booking
 */
export interface Payment {
    id: ID;
    bookingId: ID;
    paymentMethod: string; // VNPAY / VietQR / PayPal…
    paymentStatus: PaymentStatus;
    paymentTime?: string;
    amount: number;
    transactionId?: string; // mã giao dịch cổng thanh toán
    gatewayResponse?: unknown; // phản hồi từ cổng thanh toán
    createdAt?: string;
    updatedAt?: string;
}
