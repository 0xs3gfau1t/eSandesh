import React from "react"
import { Link } from "react-router-dom"

export default function HeroSection({ cat, data }) {
	if (data) {
		const div = document.createElement("div")
		div.innerHTML = data ? data.content : ""
		const img = div.querySelector("img")

		return (
			<div className="w-full mb-10">
				<h1 className="text-4xl font-primary font-bold my-2">
					What's hot in {cat}?
				</h1>
				<p className="w-full">
					<img className="w-full" src={img ? img.src : ""} />
				</p>
				<div className="">
					<h1 className="text-3xl font-semibold my-2">
						<Link
							to={`/news/${data.year}/${data.month}/${data.slug}`}
							className="hover:text-rose-600 duration-300"
						>
							{data.title}
						</Link>
					</h1>
					<div>First few words goes here</div>
				</div>
			</div>
		)
	} else {
		return <h1>No news for {cat} category.</h1>
	}
}
