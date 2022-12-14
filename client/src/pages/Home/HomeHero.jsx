import React from "react"

import { Link } from "react-router-dom"
import { LikeSaveShare } from "../../components/common"

export default function HomeHero({ data }) {
	return (
		<div className="p-6 pt-0 rounded-xl bg-white shadow-sm">
			<h1 className="text-5xl font-primary font-bold leading-loose">
				{/* heading */}
				आजको समाचार
				{/* Today's News */}
			</h1>
			<p className="w-full">
				{/* cover Img */}
				<Link
					to={`/news/${data.year}/${data.month}/${data.slug}`}
					className="hover:text-rose-600 duration-300"
				>
					<img
						className="w-full rounded-lg"
						src={
							data.img
								? data.img
								: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
						}
					/>
				</Link>
			</p>
			{/* below cover img */}
			<div>
				<h1 className="text-3xl my-6 leading-snug">
					<Link
						to={`/news/${data.year}/${data.month}/${data.slug}`}
						className="hover:text-rose-600 duration-300"
					>
						{/* article title */}
						{data.title}
					</Link>
				</h1>
				<div className="flex justify-between">
					<div>
						{/* short summary of article */}
						संक्षिप्त सारांश
					</div>
					<LikeSaveShare
						// articleId = {someArticleId}
						likes={"१०१"}
					/>
				</div>
			</div>
		</div>
	)
}
