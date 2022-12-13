import { configureStore } from "@reduxjs/toolkit"

import misc from "./reducers/misc"
import news from "./reducers/news"
import auth from "./reducers/auth"
import ads from "./reducers/ads"
import comments from "./reducers/comments"
import polls from "./reducers/polls"

export const store = configureStore({
	reducer: {
		misc: misc,
		news: news,
		auth: auth,
		ads: ads,
		comments: comments,
		polls: polls
	},
})
