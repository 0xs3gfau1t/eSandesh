import React from "react"
import NavBar from "./NavBar"
import TopCritics from "./Critics/TopCritics"
import { Link } from "react-router-dom"
import { SqAds } from "../common"
import { FaSearch } from "react-icons/fa"

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
			<div className="my-1 flex gap-2">
				<input
					type="text"
					className="shadow-md border-darkblue focus:shadow-lg rounded-md placeholder:indent-2"
					placeholder="किवर्ड द्वारा खोज्नुहोस्"
				/>
				<Link
					className="h-10 text-lg bg-darkblue text-white px-4 py-2 rounded-md flex items-center justify-center"
					to={"/polls"}
				>
					<FaSearch />
				</Link>
			</div>
			<NavBar />
			<div className="w-full">
				<TopCritics />
			</div>
			<div className="w-full">
				<SqAds />
			</div>
		</div>
	)
}

export default LeftSideBar
