import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const loadMoreStats = createAsyncThunk(
    'stats/loadMore',
    async (type, { dispatch, getState }) => {
        const statState = getState().stats

        if (statState[type].filter.skip < 0) return { success: false }

        const response = await axios
            .get('/api/stats/list', {
                params: {
                    ...statState[type].filter,
                    metaId:
                        type != 'meta'
                            ? statState.meta.data[statState.activeMetaIdx]._id
                            : undefined,
                },
            })
            .then(res => res.data)
            .catch(console.error)

        if (!response) return { success: false }
        return { success: true, data: response, type }
    }
)

export const reloadStats = createAsyncThunk(
    'stats/reload',
    async (type, { dispatch, getState }) => {
        const statState = getState().stats

        const response = await axios
            .get('/api/stats/list', {
                params: {
                    ...statState[type].filter,
                    skip: 0,
                    limit: statState[active].data.length,
                },
            })
            .then(res => res.data)
            .catch(console.error)

        if (!response) return { success: false }
        return { success: true, data: response, type }
    }
)
