import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from './axiosInstance';
import type { Payment } from '../types/payment.interface';

export const getPaymentByShowTimeId = createAsyncThunk(
    'payment/getPaymentByShowTimeId',
    async (showTimeId: string) => {
        const res = await axiosInstance.get(
            `payment_history?showTimeId=${showTimeId}`
        );
        return res.data;
    }
);


export const createPayment = createAsyncThunk(
    'payment/createPayment',
    async (data: Payment) => {
        await axiosInstance.post('payment_history', data);}
);
