import { createSlice } from '@reduxjs/toolkit'
import {
    generateStats,
    deleteStats,
    loadMoreStats,
    reloadStats,
} from '../actions/stats'

// filter type
// {dateFrom, dateTo, skip, sortKey, sortOrder, type, id, metaId}
//

const today = new Date()
const monthAgo = new Date()
monthAgo.setMonth(today.getMonth() - 3)

const initialState = {
    meta: {
        data: [],
        filter: {
            dateTo: today.toISOString().substring(0, 10),
            dateFrom: monthAgo.toISOString().substring(0, 10),
            skip: 0,
            type: 'meta',
        },
        chart: true,
    },
    ads: {
        data: [],
        filter: {
            dateTo: today.toISOString().substring(0, 10),
            dateFrom: monthAgo.toISOString().substring(0, 10),
            skip: 0,
            type: 'ads',
        },
        chart: true,
    },
    articles: {
        data: [],
        filter: {
            dateTo: today.toISOString().substring(0, 10),
            dateFrom: monthAgo.toISOString().substring(0, 10),
            skip: 0,
            type: 'articles',
        },
        chart: true,
    },
    comments: {
        data: [],
        filter: {
            dateTo: today.toISOString().substring(0, 10),
            dateFrom: monthAgo.toISOString().substring(0, 10),
            skip: 0,
            type: 'comments',
        },
        chart: true,
    },
    polls: {
        data: [],
        filter: {
            dateTo: today.toISOString().substring(0, 10),
            dateFrom: monthAgo.toISOString().substring(0, 10),
            skip: 0,
            type: 'polls',
        },
        chart: true,
    },
    users: {
        data: [],
        filter: {
            dateTo: today.toISOString().substring(0, 10),
            dateFrom: monthAgo.toISOString().substring(0, 10),
            skip: 0,
            type: 'users',
        },
        chart: true,
    },
    activeMetaIdx: 0,
    generate: 'hidden',
    deletion: 'hidden',
}

const statsSlice = createSlice({
    name: 'stats',
    initialState: { initialized: false },
    reducers: {
        setFromDate: (state, action) => {
            state[action.payload.type].filter.dateFrom = action.payload.value
        },
        setToDate: (state, action) => {
            state[action.payload.type].filter.dateTo = action.payload.value
        },
        setActiveMeta: (state, action) => {
            state.activeMetaIdx = action.payload
        },
        toggleChart: (state, action) => {
            state[action.payload].chart = !state[action.payload].chart
        },
        setGenerate: (state, action) => {
            state.generate = action.payload
        },
        setDeletion: (state, action) => {
            state.deletion = action.payload
        },
        initData: state => {
            for (let key of Object.keys(initialState))
                state[key] = initialState[key]
            state.initialized = true
        },
    },

    extraReducers: builder => {
        builder.addCase(loadMoreStats.fulfilled, (state, { payload }) => {
            if (payload.success && payload.data) {
                state[payload.type].data.unshift(...payload.data.data.reverse())
                state[payload.type].filter.skip = payload.data.nextCursor
                if (payload.type == 'meta')
                    state.activeMetaIdx = state.meta.data.length - 1
            }
        })
        builder.addCase(reloadStats.fulfilled, (state, { payload }) => {
            if (payload.success && payload.data) {
                state[payload.type].data = payload.data.data.reverse()
                state[payload.type].filter.skip = payload.data.nextCursor
            }
        })
        builder.addCase(generateStats.pending, state => {
            state.generate = 'pending'
        })
        builder.addCase(generateStats.rejected, state => {
            state.generate = 'failed'
        })
        builder.addCase(generateStats.fulfilled, (state, { payload }) => {
            state.generate = 'hidden'
            state.meta.data.push(payload)
        })
        builder.addCase(deleteStats.fulfilled, (state, { payload }) => {
            state.deletion = 'hidden'
            state.meta.data = state.meta.data.filter(d => d._id != payload)
            state.activeMetaIdx = state.meta.data.length - 1
        })
    },
})

export const statReducer = statsSlice.reducer
export const statActions = statsSlice.actions
