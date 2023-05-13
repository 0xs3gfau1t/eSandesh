import { createSlice } from '@reduxjs/toolkit'
import { convertToArchive, listArchive } from '../actions/archive'

const initialState = { archiveList: [] }

const archiveSlice = createSlice({
    name: 'archive',
    initialState,
    reducers: {},

    extraReducers: builder => {
        builder
            .addCase(listArchive.fulfilled, (state, { payload }) => {
                if (payload.success && payload.data) {
                    state.archiveList = payload.data
                }
            })
            .addCase(convertToArchive.fulfilled, (state, { payload }) => {
                console.log(state.archiveList)
                state.archiveList = state.archiveList.filter(
                    archive => archive._id !== payload.id
                )
            })
    },
})

export default archiveSlice.reducer
