import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const createAd = createAsyncThunk('ads/createAd', async data => {
    data.expiry = data.expiry = new Date(
        Date.now() + Number(data.expiry) * 24 * 60 * 60 * 1000
    )
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
})

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

export const getAd = createAsyncThunk('ads/getAd', async id => {
    const response = await axios
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
        })
    if (!response) return { success: false }

    return { success: true, data: response }
})

export const deleteAd = createAsyncThunk('ads/deleteAd', async data => {
    return await axios
        .delete('/api/ads', data, {
            withCredentials: true,
        })
        .finally(res => res.data)
})
