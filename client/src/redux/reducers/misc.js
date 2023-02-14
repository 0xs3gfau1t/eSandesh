import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	focus: false,
	data: []
}

const miscSlice = createSlice({
	name: "misc",
	initialState,
	reducers: {
		setFocus: (state, { payload }) => {
			state.focus = payload
		},
		updateForexData: (state, action)=>{
			state.data = action.payload
		}
	},
})

export const { setFocus, updateForexData } = miscSlice.actions
export default miscSlice.reducer
