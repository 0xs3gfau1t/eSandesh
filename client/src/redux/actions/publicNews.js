import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const getSingleNews = createAsyncThunk(
	"public/getSingleNews",
	async ({ year, month, slug }, { dispatch }) => {
		const response = await axios
			.get(`/api/article/${year}/${month}/${slug}`)
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

export const listNewsCat = createAsyncThunk(
	"news/listNewsCat",
	async ({ page, cat }, { dispatch }) => {
		const response = await axios
			.get(`/api/article/list?category=${cat}&page=${page}&items=3`, {
				withCredentials: true,
			})
			.then(res => {
				return res.data
			})
			.catch(err => {
				console.error(err)
			})
		if (!response) return { success: false }
		return { success: true, data: response, page: page }
	}
)

export const getNewsAudio = createAsyncThunk(
	"public/getNewsAudio",
	async ({ year, month, slug }, { dispatch }) => {
		const audio = await axios
			.get(`/api/article/recite?year=${year}&month=${month}&slug=${slug}`)
			.then(res => {
				return res.data
			})
			.catch(err => {
				console.error(err)
			})
		if (!response) return { success: false }
		return { success: true, audio: audio }
	}
)
