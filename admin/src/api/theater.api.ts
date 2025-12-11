import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from './axiosInstance';
import type {
    ITheater,
    UpdateStatusData,
} from '../interfaces/theater.interface';

export const getAllTheaters = createAsyncThunk(
    'theater/getAllTheaters',
    async () => {
        const res = await axiosInstance.get('theaters');
        return res.data;
    }
);

export const createTheater = createAsyncThunk(
    'theater/createTheater',
    async (theater: ITheater) => {
        const res = await axiosInstance.post('theaters', theater);
        return res.data;
    }
);

export const deleteTheater = createAsyncThunk(
    'theater/deleteTheater',
    async (id: string) => {
        await axiosInstance.delete(`theaters/${id}`);
        return id;
    }
);

export const updateStatusTheater = createAsyncThunk(
    'theater/updateStatusTheater',
    async (data: UpdateStatusData) => {
        await axiosInstance.patch(`theaters/${data.id}`, {
            status: data.status,
        });
        return data;
    }
);
