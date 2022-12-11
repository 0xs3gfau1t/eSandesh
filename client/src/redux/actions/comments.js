import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const addComments = createAsyncThunk(
	"news/addComments",
	async (comment, { dispatch }) => {
		// console.log("data: ", data)
		const response = await axios
			.post("/api/comment", comment, {
				withCredentials: true,
			})
			.then(res => {
                console.log("add vayo hola")
				return res.data
			})
			.catch(err => {
				console.error(err)
			})

		if (!response) return { success: false }

		return { success: true }
	}
)

export const listCommentsByArticle = createAsyncThunk(
	"news/listCommentsByArticle",
	async (params, { dispatch }) => {
        console.log(params)
        const page = 0, items = 10;
		// const {articleId, page, items} = params;
		const response = await axios
			.get(`/api/comment?articleId=${params}&page=${page}&items=${items}`, {
				withCredentials: true,
			})
			.then(res => {
                // console.log(res.data)
                console.log('milyo')
				return res.data
			})
			.catch(err => {
				console.error(err)
                console.log("bigryo")
			})
		if (!response) return { success: false }
		return { success: true, data: response, page: page }
	}
)

