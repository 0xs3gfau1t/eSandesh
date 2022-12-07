import { NavLink } from "react-router-dom"

import { FaBusAlt, FaMoneyCheckAlt } from "react-icons/fa"
import { BiArchiveOut, BiStats } from "react-icons/bi"
import { AiFillFileAdd, AiOutlinePullRequest } from "react-icons/ai"
import { RiAdvertisementFill } from "react-icons/ri"

const TopNav = () => {
	return (
		<div className="text-white h-12 bg-darkblue">
			<h1>eSandesh</h1>
		</div>
	)
}

const SideNav = () => {
	return (
		<ul className="dash-list flex flex-col gap-8 px-1 py-24 bg-darkblue w-1/7 text-white">
			<NavLink
				to="/admin/dashboard/managenews"
				className={({ isActive }) =>
					isActive ? "bg-sky-600 font-bold" : ""
				}
			>
				<li>
					<AiFillFileAdd />
					News
				</li>
			</NavLink>
			<NavLink
				to="readers"
				className={({ isActive }) =>
					isActive ? "bg-sky-600 font-bold" : ""
				}
			>
				<li>
					<AiOutlinePullRequest />
					Readers articles
				</li>
			</NavLink>
			<NavLink
				to="archieve"
				className={({ isActive }) =>
					isActive ? "bg-sky-600 font-bold" : ""
				}
			>
				<li>
					<BiArchiveOut />
					Manage Archieve
				</li>
			</NavLink>
			<NavLink
				to="ads"
				className={({ isActive }) =>
					isActive ? "bg-sky-600 font-bold" : ""
				}
			>
				<li>
					<RiAdvertisementFill />
					Manage Ads
				</li>
			</NavLink>
			<NavLink
				to="stats"
				className={({ isActive }) =>
					isActive ? "bg-sky-600 font-bold" : ""
				}
			>
				<li>
					<BiStats />
					Stats
				</li>
			</NavLink>
		</ul>
	)
}

export { TopNav, SideNav }
