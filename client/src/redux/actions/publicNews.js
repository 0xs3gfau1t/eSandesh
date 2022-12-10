import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

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
				console.error("k vayo k")
			})
		if (!audio) return { success: false }
		return { success: true, audio: audio.audio }
	}
)

export const getSingleNews = createAsyncThunk(
	"public/getSingleNews",
	async (params, { dispatch }) => {
		const { year, month, slug } = params
		const response = await axios
			.get(`/api/article/${year}/${month}/${slug}`)
			.then(res => {
				return res.data
			})
			.catch(err => {
				console.error(err)
			})
		dispatch(getNewsAudio(params))
		if (!response) return { success: false }

		return { success: true, data: response }
	}
)
