import { SessionProvider } from "next-auth/react"
import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"

import { store } from "./redux/store"
import App from "./App"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<SessionProvider>
			<Provider store={store}>
				<App />
			</Provider>
		</SessionProvider>
	</React.StrictMode>
)
