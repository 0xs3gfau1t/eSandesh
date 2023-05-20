import { createSlice } from '@reduxjs/toolkit'
import { listNews } from '../actions/dashNews'
import {
    getPrefCats,
    getRecentNews,
    getSingleNews,
    listNewsCat,
    listByAuthor,
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
        subscribeAuthor: (state, { payload }) => {
            if (state.singleNews)
                state.singleNews.author.subscribed =
                    !state.singleNews.author.subscribed
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
                state[payload?.cat?.toLowerCase()] = payload.data
            }
        })
        builder.addCase(getRecentNews.fulfilled, (state, { payload }) => {
            if (payload.success && payload.data) {
                state.recent = payload.data
            }
        })
        builder.addCase(getPrefCats.fulfilled, (state, { payload }) => {
            if (payload.success && payload.data) {
                state.prefCats = payload.data
            }
        })
        builder.addCase(listByAuthor.fulfilled, (state, { payload }) => {
            if (payload.success && payload.data) {
                state.author = payload.data
            }
        })
    },
})

export default newsSlice.reducer
export const { delSingleNews, subscribeAuthor } = newsSlice.actions
