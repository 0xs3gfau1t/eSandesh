import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const getSingleNews = createAsyncThunk(
	"public/getSingleNews",
	async ({ year, month, slug }, { dispatch }) => {
		const response = await axios
			.get(`/api/article/${year}/${month}/${slug}`, {})
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
