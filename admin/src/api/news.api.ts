import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from './axiosInstance';
import type { News } from '../util/news.interface';

export const getAllNews = createAsyncThunk('news/getAllNews', async () => {
    const res = await axiosInstance.get('news');

    const sorted = [...res.data].sort(
        (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    return sorted;
});

export const createNews = createAsyncThunk(
    'news/createNews',
    async (news: News) => {
        const res = await axiosInstance.post('news', news);
        return res.data;
    }
);

export const updateNews = createAsyncThunk(
    'news/updateNews',
    async (news: News) => {
        const res = await axiosInstance.put(`news/${news.id}`, news);
        return res.data;
    }
);

export const deleteNews = createAsyncThunk(
    'news/deleteNews',
    async (id: string) => {
        await axiosInstance.delete(`news/${id}`);
        return id;
    }
);
