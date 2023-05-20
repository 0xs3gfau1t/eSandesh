import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const listNewsCat = createAsyncThunk(
    'news/listNewsCat',
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

export const getSingleNews = createAsyncThunk(
    'public/getSingleNews',
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
        dispatch(listNewsCat({ page: 0, cat: response?.category[0] }))
        if (!response) return { success: false }

        return { success: true, data: response }
    }
)

export const getRecentNews = createAsyncThunk(
    'news/getRecentNews',
    async ({ page = 0, items = 6 }, { dispatch }) => {
        const response = await axios
            .get(`/api/article/list?items=${items}&page=${page}`, {
                withCredentials: true,
            })
            .then(res => {
                return res.data
            })
            .catch(err => {
                console.error(err)
            })
        dispatch(listNewsCat({ page: 0, cat: 'hot', items: 7 }))

        if (!response) return { success: false }
        return { success: true, data: response }
    }
)

export const getPrefCats = createAsyncThunk(
    'news/getPrefCats',
    async ({}, { dispatch }) => {
        const response = await axios
            .get(`/api/user/relevantcategories`, {
                withCredentials: true,
            })
            .then(res => {
                return res.data
            })
            .catch(err => {
                console.error(err)
            })

        if (!response) return { success: false }
        return { success: true, data: response.categories }
    }
)

export const listByAuthor = createAsyncThunk(
    'news/listByAuthor',
    async ({ id, page = 0, items = 6 }, { dispatch }) => {
        const response = await axios
            .get(
                `/api/article/byuser?userId=${id}&items=${items}&page=${page}`,
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
        return { success: true, data: response.articles }
    }
)
