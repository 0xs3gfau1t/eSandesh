import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	flag: false,
}

const miscSlice = createSlice({
	name: "misc",
	initialState,
	reducers: {},
})

export default miscSlice.reducer
