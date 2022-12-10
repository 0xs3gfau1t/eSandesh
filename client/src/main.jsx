import { SessionProvider } from "next-auth/react";
import React from "react"
import ReactDOM from "react-dom/client"
// import { BrowserRouter as Router } from "react-router-dom"
import App from "./App"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<SessionProvider>
			<App />
		</SessionProvider>
	</React.StrictMode>
)
