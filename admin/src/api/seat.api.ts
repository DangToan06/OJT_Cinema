import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from './axiosInstance';
import type { SeatsMapEntity } from '../interfaces/seat.interface';

export const getAllSeatsMap = createAsyncThunk(
    'seat/getAllSeatsMap',
    async () => {
        const res = await axiosInstance.get('seat_map');
        return res.data;
    }
);
export const createSeatsMap = createAsyncThunk(
    'seat/createSeatsMap',
    async (seats: SeatsMapEntity) => {
        const res = await axiosInstance.post('seat_map', seats);
        return res.data;
    }
);

export const updateSeatsMap = createAsyncThunk(
    'seat/updateSeatsMap',
    async (seats: SeatsMapEntity) => {
         await axiosInstance.put(
            `seat_map/${seats.id}`,
            {
                screenId: seats.screenId,
                seats: seats.seats,
            }
        );
        return seats;
    }
);
