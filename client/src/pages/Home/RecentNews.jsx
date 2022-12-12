import React from "react"
import { Link } from "react-router-dom"

export default function RecentNews({ data }) {
	return (
		<ul className="flex flex-col justify-between gap-1 ">
			{data.map((hot, index) => {
				return (
					<li
						key={index}
						className="text-sm leading-loose hover:pl-4 font-semibold hover:text-rose-700 transition-all duration-300 hover:border-l-4 hover:border-rose-600 border-l-2 border-transparent"
					>
						<Link to={`/news/${hot.year}/${hot.month}/${hot.slug}`}>
							{hot.title}
						</Link>
					</li>
				)
			})}
		</ul>
	)
}
