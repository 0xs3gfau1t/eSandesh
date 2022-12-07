import React from "react"

import { SideNavBar } from "../../components"
import Content from "./Content"

export default function Category() {
	return (
		<div className="flex justify-between container gap-4">
			<div className="hidden sm:block"></div>
			<div className=" w-11/12 md:1/2 mx-auto">
				<Content />
			</div>
			<div className="hidden sm:block pr-4">
				{/* ads go here */}
				<div className="my-4 hidden lg:block">
					<a
						href={
							"https://media.tenor.com/IRcIGzwz7IQAAAAC/money-wallet.gif"
						}
						target="_blank"
					>
						<div className=" h-64 bg-darkblue w-52 text-white flex justify-center items-center ">
							Click here for $100
						</div>
					</a>
				</div>
				<div className="my-4 hidden lg:block">
					<a
						href={
							"https://media.tenor.com/IRcIGzwz7IQAAAAC/money-wallet.gif"
						}
						target="_blank"
					>
						<div className=" h-64 bg-darkblue w-52 text-white flex justify-center items-center ">
							Click here for $100
						</div>
					</a>
				</div>
			</div>
		</div>
	)
}
