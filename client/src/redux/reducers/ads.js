import { createSlice } from '@reduxjs/toolkit'
import { listAds } from '../actions/ads'

const initialState = {}

const adsSlice = createSlice({
    name: 'ads',
    initialState,
    reducers: {},

    extraReducers: builder => {
        builder.addCase(listAds.fulfilled, (state, { payload }) => {
            if (payload.success && payload.data) {
                state.adsList = payload.data
            }
        })
    },
})

export default adsSlice.reducer
