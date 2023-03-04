import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { setAlert } from './misc'

export const savePost = createAsyncThunk(
    'user/savePost',
    async (id, { dispatch }) => {
        console.log('lol')
        const response = await axios
            .post(
                '/api/user/article',
                { id: id },
                {
                    withCredentials: true,
                }
            )
            .then(res => {
                dispatch(setAlert('Article saved.', 'success'))
                return res.data
            })
            .catch(err => {
                // console.error(err)
            })
        if (!response) return { success: false }

        return { success: true, data: response }
    }
)
