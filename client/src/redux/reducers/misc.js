import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    focus: false,
    isLoading: false,
    showAlert: false,
    alertMsg: '',
    alertType: '',
}

const miscSlice = createSlice({
    name: 'misc',
    initialState,
    reducers: {
        setFocus: (state, { payload }) => {
            state.focus = payload
        },
        displayAlert: (state, { payload }) => {
            state.alertMsg = payload.alertMsg
            state.alertType = payload.alertType
            state.showAlert = true
        },
        clearAlert: state => {
            state.alertMsg = ''
            state.alertType = ''
            state.showAlert = false
        },
        setLoading: (state, { payload }) => {
            state.isLoading = payload
        },
    },
})

export const { setFocus, displayAlert, clearAlert, setLoading } =
    miscSlice.actions
export default miscSlice.reducer
