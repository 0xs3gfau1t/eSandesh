import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	newsList: [],
}

const miscSlice = createSlice({
	name: "dashNews",
	initialState,
	reducers: {},
})

export default miscSlice.reducer
