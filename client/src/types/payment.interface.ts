import type { Seat } from './theater.interface';

export interface Payment {
    showTimeId: string;
    seatBooked: Seat[];
    totalAmount: number;
    paymentMethod: string;
    bookingDate: string;
    userId: string;
    nameFilm: string;
}

export interface InitialPaymentState {
    payments: Payment[];
    status: 'idle' | 'pending' | 'success' | 'failed';
    error: string | null | undefined;
}
