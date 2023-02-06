import React from "react"
import { NavLink } from "react-router-dom"

import LocationNews from "./LocationNews"

export default function NavBar(activeCategory) {
	const categories = [
		["राजनीति", "politics"],
		["विश्व", "global"],
		["विजनेस", "business"],
		["अर्थ / वाणिज्य", "finance"],
		["खेलकुद", "sports"],
		["मनोरञ्जन", "entertainment"],
		["स्वास्थ्य", "health"],
		["प्रविधि", "technology"],
	]
	const menuItems = categories.map((eachCat) => {
		return (
			<li key={eachCat[1]} className="my-1">
				<NavLink
					to={`/category/${eachCat[1]}`}
					className={({ isActive }) => {
						return isActive
							? "activeSideNav"
							: "hover:font-bold text-xl font-normal hover:text-darkblue hover:pl-4 hover:border-l-4 border-l-transparent hover:border-l-rose-700 transition-all duration-300"
					}}
				>
					{eachCat[0]}
				</NavLink>
			</li>
		)
	})
	return (
		<nav>
			<h2 className="font-bold text-3xl leading-relaxed">वर्ग चयन गर्नुहोस्</h2>
			<ul className="font-medium flex flex-col justify-between gap-1 mt-4 border-r-4 border-r-darkblue ">
				{menuItems}
				<li>
					<LocationNews />
				</li>
			</ul>
		</nav>
	)
}
