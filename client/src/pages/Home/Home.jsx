import React from "react"
import { Outlet } from "react-router-dom"
import Politics from "../Categories/Politics"
import { Footer, Header } from "../../components"

export default function Home(match) {
	return (
		<div>
			<Header />
			<Outlet />
			<Footer/>
		</div>
	)
}
