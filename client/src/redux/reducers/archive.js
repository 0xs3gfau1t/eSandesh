import { createSlice } from '@reduxjs/toolkit'
import { listArchive } from '../actions/archive'

const initialState = { archiveList: [] }

const archiveSlice = createSlice({
    name: 'archive',
    initialState,
    reducers: {},

    extraReducers: builder => {
        builder.addCase(listArchive.fulfilled, (state, { payload }) => {
            if (payload.success && payload.data) {
                state.archiveList = payload.data
            }
        })
    },
})

export default archiveSlice.reducer
