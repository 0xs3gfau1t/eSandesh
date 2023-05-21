import { createSlice, isFulfilled } from '@reduxjs/toolkit'
import {
    listCritics,
    listToApproveCritics,
    approveCritic,
    rejectCritic,
} from '../actions/critics'

const initialState = { approved: [], toApprove: [] }

const criticSlice = createSlice({
    name: 'critics',
    initialState,
    reducers: {},

    extraReducers: builder => {
        builder
            .addCase(listCritics.fulfilled, (state, { payload }) => {
                if (payload?.success && payload?.data)
                    state.approved = payload.data.critics
            })
            .addCase(listToApproveCritics.fulfilled, (state, { payload }) => {
                if (payload?.success && payload?.data)
                    state.toApprove = payload.data.critics
            })
            .addMatcher(
                isFulfilled(approveCritic, rejectCritic),
                (state, { payload }) => {
                    if (payload?.success && payload?.criticId)
                        state.toApprove = state.toApprove.filter(
                            c => c.commentInfo._id !== payload.criticId
                        )
                }
            )
    },
})

export default criticSlice.reducer
