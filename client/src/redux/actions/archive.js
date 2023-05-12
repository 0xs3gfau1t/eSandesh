import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const listArchive = createAsyncThunk(
    'archive/listArchive',
    async filters => {
        const data = await axios
            .get(
                `/api/article/archive`,
                { params: filters },
                {
                    withCredentials: true,
                }
            )
            .then(res => res.data.archives)
            .catch(err => {
                console.error(err)
            })

        if (!data) return { success: false }

        return { success: true, data }
    }
)
