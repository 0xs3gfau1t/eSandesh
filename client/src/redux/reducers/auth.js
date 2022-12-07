import { createSlice } from "@reduxjs/toolkit"

const initialState = { verifying: true, isAuthenticated: false, user: "" }

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {},
})

export default authSlice.reducer
