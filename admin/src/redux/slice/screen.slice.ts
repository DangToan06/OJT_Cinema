import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type {
    InitialScreenState,
    IScreen,
} from '../../interfaces/screen.interface';
import {
    createScreen,
    deleteScreen,
    getAllScreens,
    updateScreen,
    updateScreenStatus,
} from '../../api/screen.api';
import type { UpdateStatusData } from '../../interfaces/theater.interface';

const InitialScreenState: InitialScreenState = {
    screens: [],
    status: 'idle',
    error: null,
    screenCurrent: null,
};

const screenSlice = createSlice({
    name: 'screen',
    initialState: InitialScreenState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(
                getAllScreens.fulfilled,
                (state, action: PayloadAction<IScreen[]>) => {
                    state.screens = action.payload;
                    state.status = 'success';
                }
            )
            .addCase(
                updateScreenStatus.fulfilled,
                (state, action: PayloadAction<UpdateStatusData>) => {
                    const index = state.screens.findIndex(
                        (screen) => screen.id === action.payload.id
                    );
                    if (index !== -1) {
                        state.screens[index].status = action.payload.status;
                    }
                }
            )
            .addCase(
                deleteScreen.fulfilled,
                (state, action: PayloadAction<string>) => {
                    state.screens = state.screens.filter(
                        (screen) => screen.id !== action.payload
                    );
                }
            )
            .addCase(
                createScreen.fulfilled,
                (state, action: PayloadAction<IScreen>) => {
                    state.screens.push(action.payload);
                }
            )
            .addCase(
                updateScreen.fulfilled,
                (state, action: PayloadAction<IScreen>) => {
                    const index = state.screens.findIndex(
                        (screen) => screen.id === action.payload.id
                    );
                    if (index !== -1) {
                        state.screens[index] = action.payload;
                    }
                }
            );
    },
});
export default screenSlice.reducer;
