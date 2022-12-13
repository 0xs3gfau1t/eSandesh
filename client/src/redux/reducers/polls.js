import { createSlice } from "@reduxjs/toolkit"
import { createPoll, listPolls, votePoll } from "../actions/polls"

const initialState = { pollsList: [] }

const pollsSlice = createSlice({
	name: "polls",
	initialState,
	reducers: {},

	extraReducers: builder => {
		builder.addCase(listPolls.fulfilled, (state, { payload }) => {
			if (payload.success && payload.data) {
				payload.data.map(function (entry) {
					entry.casted = false
				})
				state.pollsList = payload.data
			}
		})
		builder.addCase(createPoll.fulfilled, (state, { payload }) => {
			if (payload.success && payload.data) {
				state.pollsList.unshift(payload.data.poll)
			}
		})
		builder.addCase(votePoll.fulfilled, (state, { payload }) => {
			if (payload.success && payload.data) {
				state.pollsList[payload.data.index].casted = true
			}
		})
	},
})

export default pollsSlice.reducer
