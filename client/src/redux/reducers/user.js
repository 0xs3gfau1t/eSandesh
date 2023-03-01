import { createSlice } from "@reduxjs/toolkit"
import { listSavedArticles, deleteSavedArticles, addSavedArticle } from "../actions/user"

const initialState = {
	savedArticles: [],
}

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {},
  
	extraReducers: builder => {
	  builder.addCase(listSavedArticles.fulfilled, (state, { payload }) => {
		if (payload.success && payload.data) {
		  const savedArticles = {}
		  payload.data.forEach(article => {
			savedArticles[article.id] = article
		  })
		  state.savedArticles = savedArticles
		}
	  })
	  
	  builder.addCase(deleteSavedArticles.fulfilled, (state, { payload }) => {
		if (payload.success && payload.data) {
		  const savedArticles = { ...state.savedArticles }
		  delete savedArticles[payload.data.id]
		  state.savedArticles = savedArticles
		}
	  })
	  
	  builder.addCase(addSavedArticle.fulfilled, (state, { payload }) => {
		if (payload.success && payload.data) {
		  const savedArticles = { ...state.savedArticles }
		  savedArticles[payload.data.id] = payload.data
		  state.savedArticles = savedArticles
		}
	  })
	},
  })
  
  export default userSlice.reducer
