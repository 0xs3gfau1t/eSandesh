import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { setAlert } from './misc'
import { setEditing } from '../reducers/misc'

export const addNews = createAsyncThunk(
    'dash/addNews',
    async ({ data, isEdit, id }, { dispatch }) => {
        dispatch(
            setAlert(`${isEdit ? 'Updating' : 'Adding'} news.`, 'wait', true)
        )

        let payload = JSON.parse(JSON.stringify(data))
        if (isEdit) {
            payload.id = id
            delete payload.socials
        }

        const response = await axios
            .request({
                url: '/api/article',
                method: isEdit ? 'patch' : 'post',
                data: payload,
                options: {
                    withCredentials: true,
                },
            })
            .then(res => {
                dispatch(setEditing('done'))
                dispatch(
                    setAlert(`News ${isEdit ? 'edited.' : 'added.'}`, 'success')
                )
                dispatch(setAlert('Article saved.', 'success'))
                setTimeout(() => {
                    dispatch(setEditing(false))
                }, 5000)
                return res.data
            })
            .catch(err => {
                dispatch(setAlert(`Something went wrong!`, 'danger'))
                console.error(err)
            })

        if (!response) return { success: false }

        return { success: true }
    }
)

export const listNews = createAsyncThunk(
    'common/listNews',
    async (filters, { dispatch }) => {
        const response = await axios
            .get('/api/article/list', { params: filters })
            .then(res => {
                return res.data
            })
            .catch(err => {
                console.error(err)
            })
        if (!response) return { success: false }
        return { success: true, data: response, page: filters.page }
    }
)

export const deleteNews = createAsyncThunk(
    'common/deleteNews',
    async (id, { dispatch }) => {
        const response = await axios
            .delete(`/api/article/?id=${id}`, {
                withCredentials: true,
            })
            .then(res => {
                return res.data
            })
            .catch(err => {
                console.error(err)
            })
        if (!response) return { success: false }
        return { success: true, data: response }
    }
)
