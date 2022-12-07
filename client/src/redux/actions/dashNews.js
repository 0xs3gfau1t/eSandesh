import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const addNews = createAsyncThunk(
	"dash/addNews",
	async (data, { dispatch }) => {
		console.log("data: ", data)
		const response = await axios
			.post("/api/article", data, {
				withCredentials: true,
			})
			.then(res => {
				return res.data
			})
			.catch(err => {
				console.error(err)
			})

		if (!response) return { success: false }

		return { success: true }
	}
)
