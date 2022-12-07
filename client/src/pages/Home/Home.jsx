import React from "react"
import { Outlet } from "react-router-dom"
import { Footer, Header, SideNavBar } from "../../components"

export default function Home(match) {
	return (
		<div className="flex flex-col h-screen">
			<Header />
			<div className="flex">
				<SideNavBar />
				<Outlet />
			</div>
			<Footer />
		</div>
	)
}
