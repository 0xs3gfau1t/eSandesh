import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"


export const listSavedArticles = createAsyncThunk(
	"user/savedArticles",
	async (page, { dispatch }) => {
		const response = await axios
			.get(`/api/user/article`, {
				withCredentials: true,
			})
			.then(res => {
				return res.data
			})
			.catch(err => {
				console.error(err)
			})
		if (!response) return { success: false }

		return { success: true, data: response.ad }
	}
)

export const deleteSavedArticles = createAsyncThunk(
	"user/deleteArticle",
	async (article, { dispatch }) => {
		const response = await axios
			.delete("/api/removeSavedArticle", {
				withCredentials: true,
				data: { id: article._id }
			})
			.then(res => {
				console.log(res.data)
				return res.data
			})
			.catch(err => {
				console.error(err)
			})
		if (!response) return { success: false }

		return { success: true }
	}
)


export const addSavedArticle = createAsyncThunk(
	"news/addSavedArticle",
	async (article, { dispatch }) => {
		const response = await axios
			.post("/api/user/article", article, {
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


// export const listUserArticles = createAsyncThunk(
// 	"user/listUserArticles",
// 	async (page, { dispatch }) => {
// 		const response = await axios
// 			.get(`/api/article`, {
// 				withCredentials: true,
// 			})
// 			.then(res => {
// 				return res.data
// 			})
// 			.catch(err => {
// 				console.error(err)
// 			})
// 		if (!response) return { success: false }

// 		return { success: true, data: response.ad }
// 	}
// )