import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"


export const dltComments = createAsyncThunk(
	"news/dltComments",
	async (comment, { dispatch }) => {
		const response = await axios
			.delete("/api/comment", {
				withCredentials: true,
				data: { commentId: comment.commentId }
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




export const addComments = createAsyncThunk(
	"news/addComments",
	async (comment, { dispatch }) => {
		const response = await axios
			.post("/api/comment", comment, {
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

// export const editComments = createAsyncThunk(
// 	"news/editComments",
// 	async (comment, { dispatch }) => {
// 		const response = await axios
// 			.patch("/api/comment",comment, {
// 				withCredentials: true,
// 				data: { commentId: comment.commentId, content: comment.content }
// 			})
// 			.then(res => {
// 				return res.data
// 			})
// 			.catch(err => {
// 				console.error(err)
// 			})

// 		if (!response) return { success: false }

// 		return { success: true }
// 	}
// )  






export const addSubComments = createAsyncThunk(
	"news/addSubComments",
	async (comment, { dispatch }) => {
		const response = await axios
			.post("/api/comment", comment, {
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



export const listCommentsByArticle = createAsyncThunk(
	"news/listCommentsByArticle",
	async (params, { dispatch }) => {
        const page = 0, items = 40;
		const response = await axios
			.get(`/api/comment?articleId=${params}&page=${page}&items=${items}`, {
				withCredentials: true,
			})
			.then(res => {
                console.log(res.data)
				return res.data
			})
			.catch(err => {
				console.error(err)
			})
		if (!response) return { success: false }
		return { success: true, data: response, page: page }
	}
)

