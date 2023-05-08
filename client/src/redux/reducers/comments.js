import { createSlice } from '@reduxjs/toolkit'
import {
    likeComment,
    listCommentsByArticle,
    dltComments,
    addComments,
    editComments,
} from '../actions/comments'

const initialState = {
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
        builder.addCase(addComments.fulfilled, (state, { payload }) => {
            if (payload.success && payload.data) {
                let newCom = payload.data.newComment
                let toBeAdded = {
                    _id: newCom._id,
                    article: newCom.article,
                    content: newCom.content,
                    updatedAt: newCom.updatedAt,
                    liked: false,
                    likes: 0,
                    revisions: [],
                    subComments: [],
                    user: {
                        _id: payload.data.currentUser?.id,
                        name: payload.data.currentUser?.name,
                        image: payload.data.currentUser?.image,
                    },
                }

                let com = state.comments,
                    j = 0,
                    i = 0
                for (; i < payload.data.path.length; i++) {
                    j = payload.data.path[i]
                    if (i == 0) com = com[j]
                    else com = com.subComments[j]
                }
                if (i == 0) com.push(toBeAdded)
                else com.subComments.push(toBeAdded)
            }
        })
        builder.addCase(likeComment.fulfilled, (state, { payload }) => {
            if (payload.success && payload.data) {
                let com = state.comments,
                    j = 0,
                    i = 0
                for (; i < payload.data.path.length; i++) {
                    j = payload.data.path[i]
                    if (i == 0) com = com[j]
                    else com = com.subComments[j]
                }
                com.liked = payload.data.liked
                com.likes = payload.data.liked ? com.likes + 1 : com.likes - 1
            }
        })
        builder.addCase(dltComments.fulfilled, (state, { payload }) => {
            if (payload.success && payload.data) {
                let par = state.comments,
                    j = 0,
                    i = 0
                for (; i < payload.data.path.length - 1; i++) {
                    j = payload.data.path[i]
                    if (i == 0) par = par[j]
                    else par = par.subComments[j]
                }
                console.log({ par, i, j })
                if (i == 0) par.splice(payload.data.path[i], 1)
                else par.subComments.splice(payload.data.path[i], 1)
            }
        })
        builder.addCase(editComments.fulfilled, (state, { payload }) => {
            console.log(payload.data.newComment)
            if (payload.success && payload.data) {
                let com = state.comments,
                    j = 0,
                    i = 0
                for (; i < payload.data.path.length; i++) {
                    j = payload.data.path[i]
                    if (i == 0) com = com[j]
                    else com = com.subComments[j]
                }
                com.revisions.push({
                    content: com.content,
                    timestamp: com.updatedAt,
                })
                com.content = payload.data.content
                com.updatedAt = new Date().toString()
            }
        })
    },
})

export const { loadComments } = commentSlice.actions

export default commentSlice.reducer
