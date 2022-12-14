import React from "react"
import NavBar from "./NavBar"
import TopCritics from "./Critics/TopCritics"
import { Link } from "react-router-dom"
import { SqAds } from "../common"

function LeftSideBar() {
	return (
		<div className="flex flex-col gap-4">
			<div className="my-4">
				<Link
					className="poll-button w-28 text-lg text-white px-4 py-2 rounded-md flex items-center justify-center"
					to={"/polls"}
				>
					हजुरको मत
				</Link>
			</div>
			<NavBar />
			<TopCritics />
			<SqAds />
		</div>
	)
}

export default LeftSideBar
