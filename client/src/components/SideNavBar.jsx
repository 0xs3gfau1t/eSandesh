import React from "react"
import { Link } from "react-router-dom"

export default function SideNavBar(activeCategory) {
	const categories = [
		// ["Admin", , "admin"], //remove admin from this list and add other category
		["राजनीति", "politics"],
		["विश्व", "global"],
		["विजनेस", "business"],
		["अर्थ/वाणिज्य", "finance"],
		["खेलकुद", "sports"],
		["मनोरञ्जन", "entertainment"],
	]
	const menuItems = categories.map(eachCat => {
		// if (eachCat[1] === activeCategory) {
		// return (
		//   <li
		//     className="hover:font-bold duration-200 text-darkblue hover:text-darkblue my-2"
		//     key={eachCat[0]}
		//   >
		//     <Link to={`/category/${eachCat[1]}`}>{eachCat[0]}</Link>
		//   </li>
		// );
		// } else {
		return (
			<li
				className="hover:font-semibold hover:text-darkblue hover:indent-4 hover:border-l-4 border-l-transparent hover:border-l-rose-700 transition-all duration-300 leading-loose"
				key={eachCat[1]}
			>
				{/* <Link to={`/category/${eachCat[1]}`}>{eachCat[0]}</Link> */}
				<Link to={`/category/${eachCat[1]}`}>{eachCat[0]}</Link>
			</li>
		)
		// }
	})
	return (
		<nav className="px-4 border-r-4 border-r-darkblue">
			<h2 className="font-primary font-bold text-2xl">Category</h2>
			<ul className="list-none flex flex-col justify-between gap-2 mt-4 indent-2">
				{menuItems}
			</ul>
		</nav>
	)
}
