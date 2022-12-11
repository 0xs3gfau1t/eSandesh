import { createSlice } from "@reduxjs/toolkit"
// import { listCommentsByArticle } from "../actions/comments";
import {
    listCommentsByArticle
} from "../actions/comments"

const initialState = {
	page: 0,
    items: 10
}

const commentSlice = createSlice({
	name: "comments",
	initialState,
	reducers: {},

	extraReducers: builder => {
        builder.addCase(listCommentsByArticle.fulfilled, (state, {payload})=>{
            if(payload.success && payload.data){
                state.comments = payload.data
            }
        })
		// builder.addCase(listNews.fulfilled, (state, { payload }) => {
		// 	if (payload.success && payload.data) {
		// 		state.newsList[payload.page] = payload.data
		// 	}
		// })
		// builder.addCase(getSingleNews.fulfilled, (state, { payload }) => {
		// 	if (payload.success && payload.data) {
		// 		state.singleNews = payload.data
		// 		if (state.audio) delete state.audio
		// 	}
		// })
		// builder.addCase(getNewsAudio.fulfilled, (state, { payload }) => {
		// 	if (payload.success && payload.audio) {
		// 		state.audio = payload.audio
		// 	}
		// })
		// builder.addCase(listNewsCat.fulfilled, (state, { payload }) => {
		// 	if (payload.success && payload.data) {
		// 		state.newsListCat = payload.data
		// 	}
		// })
		// builder.addCase(getHotNews.fulfilled, (state, { payload }) => {
		// 	if (payload.success && payload.data) {
		// 		state.hotNews = payload.data
		// 	}
		// })
	},
})

export const { loadComments } = commentSlice.actions

export default commentSlice.reducer
