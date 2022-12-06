import { Home } from "./pages"
import Politics from "./pages/Politics"
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"

import "./App.css"

function App() {
	return (
		<div className="App">
			<Router>
				<Routes>
					<Route path="/" element={<Home />}>
						<Route path="/politics" element={<Politics />} />
					</Route>
				</Routes>
			</Router>
		</div>
	)
}

export default App
