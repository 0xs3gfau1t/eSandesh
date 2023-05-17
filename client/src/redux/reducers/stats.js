import { createSlice } from '@reduxjs/toolkit'
import { generateStats, loadMoreStats, reloadStats } from '../actions/stats'

// filter type
// {dateFrom, dateTo, skip, sortKey, sortOrder, type, id, metaId}
//

const today = new Date()
const monthAgo = new Date()
monthAgo.setMonth(today.getMonth() - 1)

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
}

const statsSlice = createSlice({
    name: 'stats',
    initialState,
    reducers: {
        setFromDate: (state, action) => {
            state[state.active].filter.dateFrom = action.payload
        },
        setToDate: (state, action) => {
            state[state.active].filter.dateTo = action.payload
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
    },
})

export const statReducer = statsSlice.reducer
export const statActions = statsSlice.actions
