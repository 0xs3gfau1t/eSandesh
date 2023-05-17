import { createSlice } from '@reduxjs/toolkit'
import { loadMoreStats, reloadStats } from '../actions/stats'

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
    },
    ads: { data: [], filter: {} },
    articles: { data: [], filter: {} },
    comment: { data: [], filter: {} },
    poll: { data: [], filter: {} },
    user: { data: [], filter: {} },
    active: 'meta',
    activeMetaIdx: 0,
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
    },

    extraReducers: builder => {
        builder.addCase(loadMoreStats.fulfilled, (state, { payload }) => {
            if (payload.success && payload.data) {
                const act = state.active
                state[act].data.unshift(...payload.data.data.reverse())
                state[act].filter.skip = payload.data.nextCursor
                if (act == 'meta')
                    state.activeMetaIdx = state.meta.data.length - 1
            }
        })
        builder.addCase(reloadStats.fulfilled, (state, { payload }) => {
            if (payload.success && payload.data) {
                const act = state.active
                state[act].data = payload.data.data.reverse()
                state[act].filter.skip = payload.data.nextCursor
            }
        })
    },
})

export const statReducer = statsSlice.reducer
export const statActions = statsSlice.actions
