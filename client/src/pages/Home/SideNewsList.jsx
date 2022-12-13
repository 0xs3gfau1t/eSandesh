import React from "react"
import { Link } from "react-router-dom"

import { FaAngleDoubleRight } from "react-icons/fa"
import { SeeAllBtn } from "../../components/common"

export default function SideNewsList({ category, data }) {
	if (data.length > 0)
		return (
			<>
				<ul className="py-2">
					{data.map((news, index) => {
						return (
							<li key={index} className="flex items-start">
								<FaAngleDoubleRight className="mr-2 mt-1" />
								<span className="hover:text-rose-700 font-semibold transition-colors">
									<Link to={`news/${news.year}/${news.month}/${news.slug}`}>
										{news.title}
									</Link>
								</span>
							</li>
						)
					})}
				</ul>
				<div className="w-full flex justify-end">
					<SeeAllBtn />
				</div>
			</>
		)
	else return <h1>No more news on {category}</h1>
}
