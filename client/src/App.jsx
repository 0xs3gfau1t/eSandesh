import { Provider } from "react-redux"

import { store } from "./redux/store"
import { Home, Login, Politics, AdminDash, ManageNews, EditNews } from "./pages"
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"

import "./App.css"

function App() {
	return (
		<Provider store={store}>
			<Router>
				<Routes>
					<Route path="/admin" element={<Login />} />
					<Route path="/admin/dashboard" element={<AdminDash />}>
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
