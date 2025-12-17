import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type {
    InitializeSeatsMaps,
    SeatsMapEntity,
} from '../../interfaces/seat.interface';
import {
    createSeatsMap,
    getAllSeatsMap,
    updateSeatsMap,
} from '../../api/seat.api';

const initialState: InitializeSeatsMaps = {
    listMapSeatsEntity: [],
    status: 'idle',
    error: null,
};

const seatSlice = createSlice({
    name: 'seat',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(
                getAllSeatsMap.fulfilled,
                (state, action: PayloadAction<SeatsMapEntity[]>) => {
                    state.listMapSeatsEntity = action.payload;
                    state.status = 'success';
                }
            )
            .addCase(getAllSeatsMap.pending, (state) => {
                state.status = 'pending';
                state.error = null;
            })
            .addCase(getAllSeatsMap.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(
                createSeatsMap.fulfilled,
                (state, action: PayloadAction<SeatsMapEntity>) => {
                    state.listMapSeatsEntity.push(action.payload);
                    state.status = 'success';
                }
            )
            .addCase(
                updateSeatsMap.fulfilled,
                (state, action: PayloadAction<SeatsMapEntity>) => {
                    const index = state.listMapSeatsEntity.findIndex(
                        (item) => item.screenId === action.payload.screenId
                    );
                    if (index !== -1) {
                        state.listMapSeatsEntity[index] = action.payload;
                    } else {
                        state.listMapSeatsEntity.push(action.payload);
                    }
                    state.status = 'success';
                }
            );
    },
});

export default seatSlice.reducer;
