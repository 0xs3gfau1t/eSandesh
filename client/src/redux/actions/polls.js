import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const createPoll = createAsyncThunk(
    'polls/createPoll',
    async (data, { dispatch }) => {
        const response = await axios
            .post('/api/poll/add', data, {
                withCredentials: true,
            })
            .then(res => {
                return res.data
            })
            .catch(err => {
                console.error(err)
            })
        console.log('CreatePoll', response, data)

        if (!response) return { success: false }

        return { success: true, data: response }
    }
)

export const listPolls = createAsyncThunk(
    'polls/listPolls',
    async (page, { dispatch }) => {
        const response = await axios
            .get(`/api/poll/list`, {
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

export const votePoll = createAsyncThunk(
    'polls/votePoll',
    async (data, { dispatch }) => {
        const response = await axios
            .post(`/api/poll/answer`, data, {
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
