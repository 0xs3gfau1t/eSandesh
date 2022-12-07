import React from "react"
import { Link } from "react-router-dom"

export default function sideNavBar() {
	const categories = [
		"Admin", //remove admin from this list and add other category
		"राजनीति",
		"विश्व",
		"विजनेस",
		"राजनीति",
		"अर्थ/वाणिज्य",
		"खेलकुद",
		"मनोरञ्जन",
	]
	const menuItems = categories.map(eachCat => (
		<li
			className="hover:font-bold duration-200 hover:text-darkblue my-2"
			key={eachCat.toLowerCase()}
		>
			<Link to={`/category/${eachCat.toLowerCase()}`}>{eachCat}</Link>
		</li>
	))
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
