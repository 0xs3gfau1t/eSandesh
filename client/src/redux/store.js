import { configureStore } from "@reduxjs/toolkit"

import misc from "./reducers/misc"
import dashNews from "./reducers/dashNews"
import auth from "./reducers/auth"
import publicNews from "./reducers/publicNews"

export const store = configureStore({
	reducer: {
		misc: misc,
		dashNews: dashNews,
		auth: auth,
		publicNews: publicNews,
	},
})
