import { Provider } from "react-redux"
import { store } from "./redux/store"
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"

import { Home, Login, Politics, AdminDash, ManageNews, EditNews } from "./pages"
import { PrivateRoute } from "./components/common"
import "./App.css"

function App() {
	return (
		<Provider store={store}>
			<Router>
				<Routes>
					<Route path="/admin" element={<Login />} />
					<Route
						path="/admin/dashboard"
						element={
							<PrivateRoute>
								<AdminDash />
							</PrivateRoute>
						}
					>
						<Route path="managenews" element={<ManageNews />} />
						<Route path="newsedit" element={<EditNews />} />
					</Route>
					<Route path="/" element={<Home />}>
						<Route path="/politics" element={<Politics />} />
					</Route>
				</Routes>
			</Router>
		</Provider>
	)
}

export default App
