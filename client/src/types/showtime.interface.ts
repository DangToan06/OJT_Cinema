import type { ID } from './enums';

/**
 * Suất chiếu của phim: gồm phim + rạp + phòng + thời gian
 */
export interface Showtime {
    id: ID;
    movieId: ID;
    theaterId: ID;
    screenId: ID;
    startTime: string; // ISO datetime
    endTime: string;
    language?: string; // phụ đề / lồng tiếng…
    format?: string; // 2D / 3D
    createdAt?: string;
    updatedAt?: string;
}
