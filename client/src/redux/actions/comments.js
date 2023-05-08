import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const dltComments = createAsyncThunk(
    'news/dltComments',
    async ({ id, path }, { dispatch }) => {
        const response = await axios
            .delete('/api/comment', {
                withCredentials: true,
                data: { id },
            })
            .then(res => {
                console.log(res.data)
                return res.data
            })
            .catch(err => {
                console.error(err)
            })

        if (!response) return { success: false }

        return { success: true, data: { id, path } }
    }
)

export const addComments = createAsyncThunk(
    'news/addComments',
    async (
        { articleId, content, parentComment, path, currentUser },
        { dispatch }
    ) => {
        const response = await axios
            .post(
                '/api/comment',
                { articleId, content, parentComment },
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

        console.log(response)

        if (!response) return { success: false }

        return {
            success: true,
            data: { newComment: response.comment, path, currentUser },
        }
    }
)

export const likeComment = createAsyncThunk(
    'news/addLikes',
    async ({ id, path }, { dispatch }) => {
        const response = await axios
            .post(
                '/api/comment/like',
                { id },
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

        return {
            success: true,
            data: { path, liked: response.newStatus == 'Liked' },
        }
    }
)

export const editComments = createAsyncThunk(
    'news/editComments',
    async ({ id, content, path }, { dispatch }) => {
        const response = await axios
            .patch(
                '/api/comment',
                { id, content },
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

        console.log(response)
        if (!response) return { success: false }

        return {
            success: true,
            data: { path, content },
        }
    }
)

export const listCommentsByArticle = createAsyncThunk(
    'news/listCommentsByArticle',
    async ({ articleId, page, items }, { dispatch }) => {
        const response = await axios
            .get(
                `/api/comment/?articleId=${articleId}&page=${page}&items=${items}`,
                {
                    withCredentials: true,
                }
            )
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

export const listCommentsByUser = createAsyncThunk(
    'news/listCommentsByUser',
    async ({ page, items, userId }, { dispatch }) => {
        console.log(
            `/api/comment?page=${articleId}&items=${page}&userId=${items}`
        )
        const response = await axios
            .get(
                `/api/comment?page=${articleId}&items=${page}&userId=${items}`,
                {
                    withCredentials: true,
                }
            )
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
