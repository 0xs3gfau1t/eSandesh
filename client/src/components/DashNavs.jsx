import { NavLink } from "react-router-dom"
import { signOut } from "next-auth/react"
import { BiArchiveOut, BiStats } from "react-icons/bi"
import { AiFillFileAdd, AiOutlinePullRequest } from "react-icons/ai"
import { IoIosPeople } from "react-icons/io"
import { RiAdvertisementFill } from "react-icons/ri"
import { SiteLogo } from "./common"

const TopNav = () => {
	return (
		<div className="text-white h-12 bg-darkblue flex">
			<h1 className="ml-8 my-3 text-3xl">
				<SiteLogo theme={"light"} />
			</h1>
			<h1 className="mx-auto my-2 text-2xl align-center">
				Admin Dashboard
			</h1>
			<h2
				onClick={() => signOut({ redirect: false })}
				className="flex mr-12 text-lg my-auto py-1 px-2 rounded-md bg-zinc-500 cursor-pointer"
			>
				Logout
			</h2>
		</div>
	)
}

const SideNav = () => {
	return (
		<ul className="dash-list flex flex-col gap-8 px-1 py-24 bg-darkblue w-1/7 text-white">
			<NavLink
				to="/admin/dashboard/"
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
				to="critics"
				className={({ isActive }) =>
					isActive ? "bg-sky-600 font-bold" : ""
				}
			>
				<li>
					<IoIosPeople />
					Manage Critics
				</li>
			</NavLink>
			<NavLink
				to="archive"
				className={({ isActive }) =>
					isActive ? "bg-sky-600 font-bold" : ""
				}
			>
				<li>
					<BiArchiveOut />
					Manage Archive
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
