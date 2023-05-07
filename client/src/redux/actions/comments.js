import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const dltComments = createAsyncThunk(
    'news/dltComments',
    async ({ id }, { dispatch }) => {
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

        return { success: true, data: { id } }
    }
)

export const addComments = createAsyncThunk(
    'news/addComments',
    async (comment, { dispatch }) => {
        const response = await axios
            .post('/api/comment', comment, {
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

export const likeComment = createAsyncThunk(
    'news/addLikes',
    async ({ id }, { dispatch }) => {
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
            data: { id, liked: response.newStatus == 'Liked' },
        }
    }
)

export const editComments = createAsyncThunk(
    'news/editComments',
    async (comment, { dispatch }) => {
        const response = await axios
            .patch('/api/comment', comment, {
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

export const addSubComments = createAsyncThunk(
    'news/addSubComments',
    async (comment, { dispatch }) => {
        const response = await axios
            .post('/api/comment', comment, {
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
