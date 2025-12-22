
import type { Booking } from '../../types/booking.interface';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit/react';

const initialState: Booking = {
    nameFilm: '',
    showtime: '',
    nameScreen: '',
    type: '',
    seats: [],
    showTimeId: '',
    userId: '',
};

const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {
        setBooking(state, action: PayloadAction<Booking>) {
            return { ...state, ...action.payload };
        },
        clearBooking() {
            return initialState;
        },
    },
});

export const { setBooking, clearBooking } = bookingSlice.actions;
export const bookingStore = bookingSlice.reducer;
