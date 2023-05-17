import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { setAlert } from './misc'

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
    async ({ page = 0, active }, { dispatch }) => {
        const response = await axios
            .get(`/api/poll?active=${active}`, {
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
            .post(`/api/poll/`, data, {
                withCredentials: true,
            })
            .then(res => {
                dispatch(listPolls({ active: true }))
                dispatch(setAlert('मतदानको लागि धन्यवाद !', 'success'))
                return res.data
            })
            .catch(err => {
                console.error(err)
            })
        if (!response) return { success: false }

        return { success: true, data: response }
    }
)
