import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { setAlert } from './misc'

export const approveCritic = createAsyncThunk(
    'critics/approveCritic',
    async ({ criticId }, { dispatch }) =>
        axios
            .post(
                '/api/critics/approve',
                { criticId },
                {
                    withCredentials: true,
                }
            )
            .then(() => {
                dispatch(setAlert('Approved', 'success'))
                return { success: true, criticId }
            })
            .catch(e => {
                console.error(e)
                dispatch(setAlert('Critic could not be approved', 'danger'))
                return { success: false }
            })
)
export const rejectCritic = createAsyncThunk(
    'critics/rejectCritic',
    async ({ criticId }, { dispatch }) =>
        axios
            .delete('/api/critics', {
                withCredentials: true,
                data: { criticId },
            })
            .then(() => {
                dispatch(setAlert('Disapproved'))
                return { success: true, criticId }
            })
            .catch(() => {
                dispatch(setAlert('Critic could not be deleted', 'danger'))
                return { success: false }
            })
)

export const listCritics = createAsyncThunk(
    'critics/listCritics',
    ({ limit, page }, { dispatch }) =>
        axios
            .get('/api/critics/list', {
                withCredentials: true,
                params: { limit, page },
            })
            .then(r => {
                return { success: true, data: r.data }
            })
            .catch(() => {
                return { success: false }
            })
)

export const listToApproveCritics = createAsyncThunk(
    'critics/listToApproveCritics',
    ({ limit, page }) =>
        axios
            .get('/api/critics/list', {
                withCredentials: true,
                params: { limit, page, toApprove: true },
            })
            .then(r => {
                return { success: true, data: r.data }
            })
            .catch(() => {
                console.log('Caught')
                return { success: false }
            })
)
