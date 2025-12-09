import type { ID, SeatType, MovieType, DayType } from './enums';

/**
 * Cấu trúc bảng giá theo loại phim, loại ghế, ngày thường hay lễ, khung giờ
 */
export interface TicketPrice {
    id: ID;
    typeSeat: SeatType;
    typeMovie: MovieType;
    price: number; // VND
    dayType: DayType; // 0 = ngày thường, 1 = lễ/cuối tuần
    startTime?: string;
    endTime?: string;
    createdAt?: string;
    updatedAt?: string;
}
