import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { InitialNewsState, News } from '../../util/news.interface';
import {
    createNews,
    deleteNews,
    getAllNews,
    updateNews,
} from '../../api/news.api';

const initialState: InitialNewsState = {
    newsList: [],
    status: 'idle',
    error: null,
    newsCurrent: null,
};

const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getAllNews.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(
                getAllNews.fulfilled,
                (state, action: PayloadAction<News[]>) => {
                    state.status = 'success';
                    state.newsList = action.payload;
                }
            )
            .addCase(getAllNews.rejected, (state, action) => {
                state.error = action.error.message;
                state.status = 'failed';
            })
            .addCase(
                createNews.fulfilled,
                (state, action: PayloadAction<News>) => {
                    state.newsList.push(action.payload);
                }
            )
            .addCase(
                updateNews.fulfilled,
                (state, action: PayloadAction<News>) => {
                    const index = state.newsList.findIndex(
                        (news) => news.id === action.payload.id
                    );
                    if (index !== -1) {
                        state.newsList[index] = action.payload;
                    }
                }
            )// not deployed yet
            .addCase(
                deleteNews.fulfilled,
                (state, action: PayloadAction<string>) => {
                    state.newsList = state.newsList.filter(
                        (news) => news.id !== action.payload
                    );
                }
            );
    },
});

export const newsStore = newsSlice.reducer;
