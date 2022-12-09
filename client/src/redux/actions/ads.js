import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const createAd = createAsyncThunk(
	"ads/createAd",
	async (data, { dispatch }) => {
		const response = await axios
			.post(
				`/api/ads`,
				{},
				{
					withCredentials: true,
				}
			)
			.then(res => {
				return res.data
			})
			.catch(err => {
				console.error(err)
			})
		if (!response) return { success: false }
		console.log(response)
	}
)
