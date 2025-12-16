export type SeatType = 'standard' | 'vip' | 'sweetbox' | 'disabled';
export interface Seat {
    row: string;
    number: number;
    type: SeatType;
    booked: boolean;
}
export interface SeatsMap {
    [screenId: string]: Seat[];
}

export interface SeatsMapEntity {
    screenId: string;
    seats: Seat[];
    id: string;
}

export interface InitializeSeatsMaps {
    listMapSeatsEntity: SeatsMapEntity[];
    status: 'idle' | 'pending' | 'success' | 'failed';
    error: string | null | undefined;
}

export const seatTypes = [
    {
        id: 'standard',
        label: 'Standard',
        color: 'bg-slate-500',
        price: '75,000',
    },
    { id: 'vip', label: 'VIP', color: 'bg-amber-500', price: '120,000' },
    {
        id: 'sweetbox',
        label: 'Sweetbox',
        color: 'bg-pink-500',
        price: '200,000',
    },
    { id: 'disabled', label: 'Ẩn/Hỏng', color: 'bg-slate-300', price: '-' },
];
