import { createSlice } from "@reduxjs/toolkit"
import { listNews } from "../actions/dashNews"
import { getNewsAudio, getSingleNews, listNewsCat } from "../actions/publicNews"

const initialState = {
	newsList: {},
}

const newsSlice = createSlice({
	name: "news",
	initialState,
	reducers: {},

	extraReducers: builder => {
		builder.addCase(listNews.fulfilled, (state, { payload }) => {
			if (payload.success && payload.data) {
				state.newsList[payload.page] = payload.data
			}
		})
		builder.addCase(getSingleNews.fulfilled, (state, { payload }) => {
			if (payload.success && payload.data) {
				state.singleNews = payload.data
				if (state.audio) delete state.audio
			}
		})
		builder.addCase(getNewsAudio.fulfilled, (state, { payload }) => {
			if (payload.success && payload.audio) {
				state.audio = payload.audio
			}
		})
		builder.addCase(listNewsCat.fulfilled, (state, { payload }) => {
			if (payload.success && payload.data) {
				state.newsListCat = payload.data
			}
		})
	},
})

export const { loadAudio } = newsSlice.actions

export default newsSlice.reducer
