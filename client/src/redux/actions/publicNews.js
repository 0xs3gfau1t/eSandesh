import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const listNewsCat = createAsyncThunk(
	"news/listNewsCat",
	async ({ page, cat, items = 6 }, { getState, dispatch }) => {
		const state = getState()
		if (state.news.cat) return
		const response = await axios
			.get(
				`/api/article/list?category=${cat}&page=${page}&items=${items}`,
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
		return { success: true, data: response, page: page, cat: cat }
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
				console.error("Err")
			})
		if (!audio) return { success: false }
		return { success: true, audio: audio.audio }
	}
)

export const getSingleNews = createAsyncThunk(
	"public/getSingleNews",
	async ({ params, noAudio }, { dispatch }) => {
		const { year, month, slug } = params
		const response = await axios
			.get(`/api/article/${year}/${month}/${slug}`)
			.then(res => {
				return res.data
			})
			.catch(err => {
				console.error(err)
			})
		if (!noAudio) dispatch(getNewsAudio(params))
		if (!response) return { success: false }

		return { success: true, data: response }
	}
)

export const getRecentNews = createAsyncThunk(
	"news/getRecentNews",
	async ({}, { dispatch }) => {
		const response = await axios
			.get(`/api/article/list?items=7`, {
				withCredentials: true,
			})
			.then(res => {
				return res.data
			})
			.catch(err => {
				console.error(err)
			})
		dispatch(listNewsCat({ page: 0, cat: "hot", items: 7 }))
		if (!response) return { success: false }
		return { success: true, data: response }
	}
)

export const saveNews = createAsyncThunk(
	"news/saveNews",
	async (data, { dispatch }) => {
		const response = await axios
			.post(`/api/user/article`, data, {
				withCredentials: true,
			})
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
