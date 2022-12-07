import { configureStore } from "@reduxjs/toolkit"

import misc from "./reducers/misc"

export const store = configureStore({
	reducer: {
		misc: misc,
	},
})
