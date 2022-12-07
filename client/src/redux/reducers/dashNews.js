import { createSlice } from "@reduxjs/toolkit"
import { listNews } from "../actions/dashNews"

const initialState = {
	newsList: {},
}

const dashNewsSlice = createSlice({
	name: "dashNews",
	initialState,
	reducers: {},

	extraReducers: builder => {
		builder.addCase(listNews.fulfilled, (state, { payload }) => {
			if (payload.success && payload.data) {
				state.newsList[payload.page] = payload.data
			}
		})
	},
})

export default dashNewsSlice.reducer
