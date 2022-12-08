import React from "react"
import { Link } from "react-router-dom"

export default function sideNavBar() {
	const categories = [
		["Admin", , "admin"], //remove admin from this list and add other category
		["राजनीति", "politics"],
		["विश्व", , "global"],
		["विजनेस", "business"],
		["अर्थ/वाणिज्य", "finance"],
		["खेलकुद", "sports"],
		["मनोरञ्जन", "entertainment"],
	]
	const menuItems = categories.map(eachCat => {
		return (
			<li
				className="hover:font-bold duration-200 hover:text-darkblue my-2"
				key={eachCat[0]}
			>
				<Link to={`/category/${eachCat[1]}`}>{eachCat[0]}</Link>
			</li>
		)
	})
	return (
		<div>
			<nav className="p-4 border-r-4 border-r-darkblue">
				<h2 className="font-primary font-bold text-2xl">Category</h2>
				<ul className="list-none flex flex-col p-4 justify-between">
					{menuItems}
				</ul>
			</nav>
		</div>
	)
}
