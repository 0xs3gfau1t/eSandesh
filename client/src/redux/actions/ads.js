import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const createAd = async data => {
    axios
        .post('/api/ads', data, {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then(res => {
            return res.data
        })
        .catch(err => {
            console.error(err)
        })
}

export const editAd = async data => {
    axios
        .patch('/api/ads', data, {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then(res => {
            return res.data
        })
        .catch(err => {
            console.error(err)
        })
}

export const listAds = createAsyncThunk('ads/listAd', async () => {
    const response = await axios
        .get(`/api/ads/list`, {
            withCredentials: true,
        })
        .then(res => {
            return res.data
        })
        .catch(err => {
            console.error(err)
        })
    if (!response) return { success: false }

    return { success: true, data: response.ad }
})

export const getAd = async id => {
    const res = await axios
        .get(
            '/api/ads',
            { params: { id } },
            {
                withCredentials: true,
            }
        )
        .then(res => {
            return res?.data?.ad
        })
        .catch(err => {
            console.error(err)
            return false
        })
    return res
}

export const deleteAd = createAsyncThunk('ads/deleteAd', async data => {
    return await axios
        .delete('/api/ads', data, {
            withCredentials: true,
        })
        .finally(res => res.data)
})
