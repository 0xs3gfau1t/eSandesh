import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	focus: false,
}

const miscSlice = createSlice({
	name: "misc",
	initialState,
	reducers: {
		setFocus: (state, { payload }) => {
			console.log(payload)
			state.focus = payload
		},
	},
})

export const { setFocus } = miscSlice.actions
export default miscSlice.reducer
