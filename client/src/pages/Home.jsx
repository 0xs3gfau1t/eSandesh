import React from "react"
import { Outlet } from "react-router-dom"
import Politics from "./Politics"
import { Header } from "../components"

export default function Home(match) {
	return (
		<div>
			<Header />
			<Outlet />
		</div>
	)
}
