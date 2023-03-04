import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const addNews = createAsyncThunk(
    'dash/addNews',
    async ({ data, isEdit, id }, { dispatch }) => {
        // console.log("data: ", data)
        let payload = JSON.parse(JSON.stringify(data))
        if (isEdit) {
            payload.id = id
            delete payload.socials
        }

        const response = await axios
            .request({
                url: '/api/article',
                method: isEdit ? 'patch' : 'post',
                data: payload,
                options: {
                    withCredentials: true,
                },
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

export const listNews = createAsyncThunk(
    'common/listNews',
    async (page, { dispatch }) => {
        const response = await axios
            .get(`/api/article/list?page=${page}`, {
                withCredentials: true,
            })
            .then(res => {
                return res.data
            })
            .catch(err => {
                console.error(err)
            })
        if (!response) return { success: false }
        return { success: true, data: response, page: page }
    }
)

export const deleteNews = createAsyncThunk(
    'common/deleteNews',
    async (id, { dispatch }) => {
        const response = await axios
            .delete(`/api/article/?id=${id}`, {
                withCredentials: true,
            })
            .then(res => {
                return res.data
            })
            .catch(err => {
                console.error(err)
            })
        if (!response) return { success: false }
        return { success: true, data: response }
    }
)
