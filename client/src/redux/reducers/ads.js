import { createSlice } from '@reduxjs/toolkit'
import { listAds, getRelAds } from '../actions/ads'

const initialState = {}

const adsSlice = createSlice({
    name: 'ads',
    initialState,
    reducers: { relAds: {} },

    extraReducers: builder => {
        builder.addCase(listAds.fulfilled, (state, { payload }) => {
            if (payload.success && payload.data) {
                state.adsList = payload.data
            }
        })
        builder.addCase(getRelAds.fulfilled, (state, { payload }) => {
            if (payload.data) {
                state[payload.size] = payload.data.ads
            }
        })
    },
})

export default adsSlice.reducer
