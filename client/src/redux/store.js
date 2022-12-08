import { configureStore } from "@reduxjs/toolkit"

import misc from "./reducers/misc"
import news from "./reducers/news"
import auth from "./reducers/auth"

export const store = configureStore({
	reducer: {
		misc: misc,
		news: news,
		auth: auth,
	},
})
