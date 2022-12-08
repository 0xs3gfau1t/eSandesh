import { createSlice } from "@reduxjs/toolkit"
import { listNews } from "../actions/dashNews"
import { getSingleNews, listNewsCat } from "../actions/publicNews"

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
			}
		})
		builder.addCase(listNewsCat.fulfilled, (state, { payload }) => {
			if (payload.success && payload.data) {
				state.newsListCat = payload.data
			}
		})
	},
})

export default newsSlice.reducer
