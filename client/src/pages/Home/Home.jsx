import React from "react"
import { HiArrowNarrowRight } from "react-icons/hi"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"

import { Footer, Header, LeftSideBar } from "../../components"
import QuickUpdates from "./QuickUpdates"

export default function Home(match) {
	const focus = useSelector(state => state.misc.focus)

	return (
		<div className="flex flex-col h-screen">
			<Header />

			<div className="flex justify-between container">
				{/* left side */}
				{!focus && (
					<div className="sm:block hidden w-1/5">
						<LeftSideBar />
					</div>
				)}

				{/* if some category is active, it is rendered on outlet */}
				<div className={focus ? "" : "w-3/5"}>
					<Outlet />
				</div>
				{/* right side */}
				{!focus && (
					<div className="sm:w-1/5 sm:block hidden">
						<div className="flex justify-between items-end my-2">
							<h2 className="text-2xl font-primary font-semibold">
								ताजा परिणाम
							</h2>
							<Link to="***link this to sports section or particular match news***">
								<p className="font-semibold text-xs flex items-center group">
									सबै हेर्नुहोस्
									<HiArrowNarrowRight className="ml-1 opacity-0 group-hover:opacity-100 transition-all duration-200 ease-in-out" />
								</p>
							</Link>
						</div>
						<QuickUpdates />
					</div>
				)}
			</div>
			<Footer />
		</div>
	)
}
