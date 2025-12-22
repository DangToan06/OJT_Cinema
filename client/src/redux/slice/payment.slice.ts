import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { createPayment, getPaymentByShowTimeId } from '../../api/payment.api';
import type {
    InitialPaymentState,
    Payment,
} from '../../types/payment.interface';

const initialState: InitialPaymentState = {
    payments: [],
    status: 'idle',
    error: null,
};

const paymentSlice = createSlice({
    name: 'payment',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(
                getPaymentByShowTimeId.fulfilled,
                (state, action: PayloadAction<Payment[]>) => {
                    state.status = 'success';
                    state.payments = action.payload;
                }
            )
            .addCase(
                createPayment.fulfilled,
                (state, action: PayloadAction<Payment>) => {
                    state.status = 'success';
                    state.payments.push(action.payload);
                }
            );
    },
});

export const paymentStore = paymentSlice.reducer;
