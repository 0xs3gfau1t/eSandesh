import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const loadMoreStats = createAsyncThunk(
    'stats/loadMore',
    async (data, { dispatch, getState }) => {
        const statState = getState().stats
        const active = statState.active

        if (statState[active].filter.skip < 0) return { success: false }

        const response = await axios
            .get('/api/stats/list', {
                params: statState[active].filter,
            })
            .then(res => res.data)
            .catch(console.error)

        if (!response) return { success: false }
        return { success: true, data: response }
    }
)

export const reloadStats = createAsyncThunk(
    'stats/reload',
    async (data, { dispatch, getState }) => {
        const statState = getState().stats
        const active = statState.active

        const response = await axios
            .get('/api/stats/list', {
                params: {
                    ...statState[active].filter,
                    skip: 0,
                    limit: statState[active].data.length,
                },
            })
            .then(res => res.data)
            .catch(console.error)

        if (!response) return { success: false }
        return { success: true, data: response }
    }
)
