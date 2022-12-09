import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const createAd = createAsyncThunk(
	"ads/createAd",
	async (data, { dispatch }) => {
		let cat = data.category
			.split(",")
			.map(tag => tag.trim())
			.map(tag => tag.toUpperCase())
		let expiry = new Date()
		expiry.setDate(expiry.getDate() + 2)
		let payload = JSON.parse(JSON.stringify(data))
		payload.expiry = expiry

		const response = await axios
			.post("/api/ads", payload, {
				withCredentials: true,
			})
			.then(res => {
				return res.data
			})
			.catch(err => {
				console.error(err)
			})
	}
)
