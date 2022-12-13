import React from "react"
import { Link } from "react-router-dom"

export default function RectAds({ type }) {
	return (
		<div className="flex items-center justify-center bg-amber-500 gap-4 my-6">
			<a
				href={"https://media.tenor.com/IRcIGzwz7IQAAAAC/money-wallet.gif"}
				target="_blank"
			>
				<img
					className="w-24"
					src={"http://kunjanaghimire.com/storage/images/kunjana-hero-2.png"}
				/>
			</a>
			<div className="w-2/3 flex flex-col justify-between h-full">
				<h3 className="lg:text-xl text-sm font-secondary">
					<a
						href={"https://media.tenor.com/IRcIGzwz7IQAAAAC/money-wallet.gif"}
						target="_blank"
					>
						{type}
					</a>
				</h3>
				{/* <p>mostly ads are images/gifs so this is not needed</p> */}
			</div>
		</div>
	)
}
