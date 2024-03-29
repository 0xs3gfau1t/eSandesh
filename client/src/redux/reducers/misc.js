import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    focus: false,
    isLoading: false,
    isEditing: false,
    showAlert: false,
    alertMsg: '',
    alertType: '',
    forexData: [],
}

const miscSlice = createSlice({
    name: 'misc',
    initialState,
    reducers: {
        setFocus: (state, { payload }) => {
            state.focus = payload
        },
        updateForexData: (state, action) => {
            state.forexData = action.payload
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
        setEditing: (state, { payload }) => {
            state.isEditing = payload
        },
    },
})

export const {
    setFocus,
    displayAlert,
    clearAlert,
    setLoading,
    setEditing,
    updateForexData,
} = miscSlice.actions
export default miscSlice.reducer
