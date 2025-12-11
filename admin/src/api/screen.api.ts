import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from './axiosInstance';
import type { UpdateStatusData } from '../interfaces/theater.interface';
import type { IScreen } from '../interfaces/screen.interface';

export const getAllScreens = createAsyncThunk(
    'screen/getAllScreens',
    async () => {
        const res = await axiosInstance.get('screens');
        return res.data;
    }
);

export const updateScreenStatus = createAsyncThunk(
    'screen/updateScreenStatus',
    async (data: UpdateStatusData) => {
        await axiosInstance.patch(`screens/${data.id}`);
        return data;
    }
);

export const deleteScreen = createAsyncThunk(
    'screen/deleteScreen',
    async (id: string) => {
        await axiosInstance.delete(`screens/${id}`);
        return id;
    }
);

export const createScreen = createAsyncThunk(
    'screen/createScreen',
    async (screen: IScreen) => {
        const res = await axiosInstance.post('screens', screen);
        return res.data;
    }
);
