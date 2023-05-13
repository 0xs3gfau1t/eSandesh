import { configureStore } from '@reduxjs/toolkit'

import misc from './reducers/misc'
import news from './reducers/news'
import auth from './reducers/auth'
import ads from './reducers/ads'
import comments from './reducers/comments'
import polls from './reducers/polls'
import archive from './reducers/archive'

export const store = configureStore({
    reducer: {
        misc,
        news,
        auth,
        ads,
        comments,
        polls,
        archive,
    },
})
