export type SeatType = 'standard' | 'vip' | 'sweetbox' | 'disabled';
export interface Seat {
    row: string;
    number: number;
    type: SeatType;
}
export type SeatsMap = Record<string, Seat[]>;
