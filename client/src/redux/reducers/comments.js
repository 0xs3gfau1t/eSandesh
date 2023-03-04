import { createSlice } from '@reduxjs/toolkit'
import { listCommentsByArticle } from '../actions/comments'

const initialState = {
    page: 0,
    items: 10,
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
                    state.comments = payload.data
                }
            }
        )
    },
})

export const { loadComments } = commentSlice.actions

export default commentSlice.reducer
