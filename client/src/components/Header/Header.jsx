import { useState } from "react"
import { FaRegUserCircle } from "react-icons/fa"
import { signIn } from "next-auth/react"

import { SiteLogo } from "../common"
import Forex from "./Forex"
import { Link } from "react-router-dom"
import GoldSilver from "./GoldSilver"

export default function Header() {
	const [show, setShow] = useState(false)

	return (
		<div className="header mb-5">
			<div className="flex justify-between items-center container p-3">
				<SiteLogo />
				<div className="flex justify-between items-center">
					<div className="flex justify-between invisible md:visible text-xs lg:text-sm gap-4">
						<Forex />
						<GoldSilver />
					</div>
					<FaRegUserCircle
						className=" text-3xl cursor-pointer"
						onClick={e => setShow(!show)}
					/>
					{show && (
						<div className="absolute right-10 mt-24 z-10 border-2 p-1 rounded-md bg-gray-100">
							<button
								className="bg-blue-500"
								onClick={e => signIn("facebook")}
							>
								Sign In
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
