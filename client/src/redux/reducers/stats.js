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
            dateTo: today.toString(),
            dateFrom: monthAgo.toString(),
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
}

const statsSlice = createSlice({
    name: 'stats',
    initialState,
    reducers: {},

    extraReducers: builder => {
        builder.addCase(loadMoreStats.fulfilled, (state, { payload }) => {
            if (payload.success && payload.data) {
                const act = state.active
                state[act].data.unshift(...payload.data.data.reverse())
                state[act].filter.skip = payload.data.nextCursor
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

export default statsSlice.reducer
