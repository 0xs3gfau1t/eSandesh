import { createSlice } from "@reduxjs/toolkit"
import { getSingleNews } from "../actions/publicNews"

const initialState = {
	singleNews: {},
}

const publicNewsSlice = createSlice({
	name: "publicNews",
	initialState,
	reducers: {},

	extraReducers: builder => {
		builder.addCase(getSingleNews.fulfilled, (state, { payload }) => {
			if (payload.success && payload.data) {
				state.singleNews = payload.data
			}
		})
	},
})

export default publicNewsSlice.reducer
