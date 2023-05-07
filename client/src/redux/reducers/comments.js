import { createSlice } from '@reduxjs/toolkit'
import {
    likeComment,
    listCommentsByArticle,
    dltComments,
} from '../actions/comments'

const initialState = {
    page: 0,
    items: 10,
    comments: [],
}

const commentSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {},

    extraReducers: builder => {
        builder.addCase(
            listCommentsByArticle.fulfilled,
            (state, { payload }) => {
                if (payload.success && payload.data) {
                    state.comments = payload.data.comments
                }
            }
        )
        builder.addCase(likeComment.fulfilled, (state, { payload }) => {
            if (payload.success && payload.data) {
                const com = state.comments.find(c => c.id == payload.data.id)
                com.liked = payload.data.liked
                com.likes = payload.data.liked ? com.likes + 1 : com.likes - 1
            }
        })
        builder.addCase(dltComments.fulfilled, (state, { payload }) => {
            if (payload.success && payload.data) {
                state.comments = state.comments.filter(
                    c => c.id != payload.data.id
                )
            }
        })
    },
})

export const { loadComments } = commentSlice.actions

export default commentSlice.reducer
