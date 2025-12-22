import type { ID } from './enums';
import type { Seat } from './theater.interface';

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
    nameFilm: string;
    showtime: string;
    nameScreen: string;
    type: string;
    seats: Seat[];
    showTimeId: string;
    userId:string;
}

export const seatPrices: Record<string, number> = {
    standard: 75000,
    vip: 90000,
    sweetbox: 120000,
};
