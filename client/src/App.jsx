import { Provider } from "react-redux"

import { store } from "./redux/store"
import { Home, Login } from "./pages"
import Politics from "./pages/Politics"
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"

import "./App.css"

function App() {
	return (
		<Provider store={store}>
			<Router>
				<Routes>
					<Route path="/admin" element={<Login />} />
					<Route path="/" element={<Home />}>
						<Route path="/politics" element={<Politics />} />
					</Route>
				</Routes>
			</Router>
		</Provider>
	)
}

export default App
