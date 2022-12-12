import { Provider } from "react-redux"
import { store } from "./redux/store"
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"

import "./App.css"
import {
	Home,
	Login,
	UserAuth,
	Category,
	AdminDash,
	ManageNews,
	EditNews,
	ReaderArticles,
	Archive,
	AdsMan,
	ViewSiteStats,
	SingleNews,
	Landing,
	ManageCritics,
} from "./pages"
import { PrivateRoute } from "./components/common"

function App() {
	return (
		<Provider store={store}>
			<Router>
				<Routes>
					<Route path="/userauth" element={<UserAuth />} />
					<Route path="/admin" element={<Login />} />
					<Route
						path="/admin/dashboard"
						element={
							<PrivateRoute>
								<AdminDash />
							</PrivateRoute>
						}
					>
						<Route
							path="/admin/dashboard"
							element={<ManageNews />}
						/>
						<Route path="readers" element={<ReaderArticles />} />
						<Route path="addnews" element={<EditNews />} />
						<Route path="critics" element={<ManageCritics />} />
						<Route
							path="editnews/:year/:month/:slug"
							element={<EditNews isEdit={true} />}
						/>
						<Route path="archive" element={<Archive />} />
						<Route path="ads" element={<AdsMan />} />
						<Route path="stats" element={<ViewSiteStats />} />
					</Route>
					<Route path="/" element={<Home />}>
						<Route path="" element={<Landing />} />
						<Route
							path="/news/:year/:month/:slug"
							element={<SingleNews />}
						/>
						<Route path="/category/:cat" element={<Category />} />
					</Route>
				</Routes>
			</Router>
		</Provider>
	)
}

export default App
