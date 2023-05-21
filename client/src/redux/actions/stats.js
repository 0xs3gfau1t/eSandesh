import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { setAlert } from './misc'

export const loadMoreStats = createAsyncThunk(
    'stats/loadMore',
    async (type, { dispatch, getState }) => {
        const statState = getState().stats

        if (statState[type].filter.skip < 0) return { success: false }

        const response = await axios
            .get('/api/stats', {
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
            .get('/api/stats', {
                params: {
                    ...statState[type].filter,
                    skip: 0,
                },
            })
            .then(res => res.data)
            .catch(console.error)

        if (!response) return { success: false }
        return { success: true, data: response, type }
    }
)

export const generateStats = createAsyncThunk(
    'stats/generate',
    async (_data, { dispatch }) => {
        const response = await axios
            .post('/api/stats')
            .then(res => {
                if (res.status == 200)
                    dispatch(setAlert('Report generation complete.', 'success'))
                return res.data
            })
            .catch(err => {
                console.error(err)
                dispatch(setAlert('Report generation failed', 'danger'))
                return false
            })
        if (!response) throw Error('Report generation failed')
        return response
    }
)

export const deleteStats = createAsyncThunk(
    'stats/delete',
    async (_data, { dispatch, getState }) => {
        const metaId = getState().stats.deletion
        const response = await axios
            .delete('/api/stats', { data: { metaId: metaId } })
            .then(res => {
                if (res.status == 200)
                    dispatch(setAlert('Report deletion complete.', 'success'))
                return true
            })
            .catch(err => {
                console.error(err)
                dispatch(setAlert('Report deletion failed', 'danger'))
                return false
            })
        if (!response) throw Error('Report deletion failed')
        return metaId
    }
)
