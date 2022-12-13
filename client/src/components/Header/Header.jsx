import { useState } from "react"
import { FaRegUserCircle } from "react-icons/fa"

import { SiteLogo } from "../common"
import Forex from "./Forex"
import { Link, useNavigate } from "react-router-dom"
import GoldSilver from "./GoldSilver"
import { signOut, useSession } from "next-auth/react"

export default function Header() {
	const [show, setShow] = useState(false)
	const navigate = useNavigate()
	const session = useSession()

	const action = () => {
		if (session.status == "authenticated") signOut({ redirect: false })
		else navigate("/userauth")
	}

	return (
		<div className="header mb-5">
			<div className="flex justify-between items-center container p-3">
				<SiteLogo />
				<div className="relative flex justify-between items-center">
					<div className="flex justify-between invisible md:visible text-xs lg:text-sm gap-4">
						<Forex />
						<GoldSilver />
					</div>
					<FaRegUserCircle
						className="text-3xl cursor-pointer"
						onClick={e => setShow(!show)}
					/>
					{show && (
						<div className="absolute z-99 right-0 mt-32 px-1 w-24 text-center rounded-lg bg-blue text-white">
							<button className="bg-blue-500" onClick={action}>
								{session.status == "authenticated"
									? "Log Out"
									: "Log In"}
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
