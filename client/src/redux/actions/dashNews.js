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

export const listNews = createAsyncThunk(
	"dash/listNews",
	async (cat, { dispatch }) => {
		console.log("Idhar ")
		const response = await axios
			.get("/api/article/list?page=0", {
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