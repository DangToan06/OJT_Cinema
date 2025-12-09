import type { ID, BookingStatus } from './enums';

/**
 * Một ghế thuộc đơn booking (chi tiết ghế đặt)
 */
export interface BookingSeat {
  id: ID;
  bookingId: ID;
  seatId: ID;
  seatNumber?: string;
  seatType?: string;
  price?: number;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Đơn đặt vé của người dùng
 */
export interface Booking {
  id: ID;
  userId?: ID; // nếu guest đặt thì null, thường là userId
  showtimeId: ID;
  theaterId: ID;
  screenId: ID;
  totalSeat: number;
  totalPriceMovie: number;
  status: BookingStatus;
  heldUntil?: string; // thời gian giữ ghế hết hạn
  seats?: BookingSeat[];
  qrCode?: string; // vé QR code
  createdAt?: string;
  updatedAt?: string;
}
