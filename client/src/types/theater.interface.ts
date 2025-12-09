import type { ID, SeatType } from './enums';

/**
 * Một rạp chiếu phim trong hệ thống
 */
export interface Theater {
    id: ID;
    name: string;
    location?: string;
    phone?: string;
    createdAt?: string;
    updatedAt?: string;
    screens?: Screen[];
}

/**
 * Một phòng chiếu thuộc rạp
 */
export interface Screen {
    id: ID;
    theaterId: ID;
    name: string;
    seatCapacity?: number;
    type?: string; // dạng phòng: 2D / 3D / IMAX
    createdAt?: string;
    updatedAt?: string;
    seats?: Seat[]; // danh sách ghế trong phòng
}

/**
 * Một ghế trong phòng chiếu
 */
export interface Seat {
    id: ID;
    screenId: ID;
    row?: string; // hàng A, B, C…
    column?: number; // số ghế
    seatNumber: string; // ví dụ: "A12"
    isVariable?: boolean; // giá ghế có thay đổi theo thời điểm?
    type?: SeatType; // Standard / VIP / Sweetbox
    isHidden?: boolean; // ẩn ghế khỏi sơ đồ
    createdAt?: string;
    updatedAt?: string;
}
