import { createSlice } from '@reduxjs/toolkit'
import { listNews } from '../actions/dashNews'
import {
    getRecentNews,
    getSingleNews,
    listNewsCat,
} from '../actions/publicNews'

const initialState = {
    newsList: {},
}

const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        delSingleNews: (state, { payload }) => {
            if (state.singleNews) delete state.singleNews
        },
    },

    extraReducers: builder => {
        builder.addCase(listNews.fulfilled, (state, { payload }) => {
            if (payload.success && payload.data) {
                state.newsList[payload.page] = payload.data
            }
        })
        builder.addCase(getSingleNews.fulfilled, (state, { payload }) => {
            if (payload.success && payload.data) {
                state.singleNews = payload.data
            }
        })
        builder.addCase(listNewsCat.fulfilled, (state, { payload }) => {
            if (payload.success && payload.data) {
                // if (payload.cat == "preference") state.prefNews = payload.data
                state[payload.cat.toLowerCase()] = payload.data
            }
        })
        builder.addCase(getRecentNews.fulfilled, (state, { payload }) => {
            if (payload.success && payload.data) {
                state.recentNews = payload.data
            }
        })
    },
})

export default newsSlice.reducer
export const { delSingleNews } = newsSlice.actions
