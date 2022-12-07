import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const getSingleNews = createAsyncThunk(
	"public/getSingleNews",
	async (id, { dispatch }) => {
		console.log(id)
		const response = await axios
			.get(`/api/article?id=${id}`, {})
			.then(res => {
				return res.data
			})
			.catch(err => {
				console.error(err)
			})

		if (!response) return { success: false }
		return { success: true, data: response }
	}
)