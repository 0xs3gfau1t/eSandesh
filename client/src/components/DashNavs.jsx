import { NavLink } from 'react-router-dom'
import { signOut } from 'next-auth/react'
import { BiArchiveOut, BiStats } from 'react-icons/bi'
import {
    AiFillFileAdd,
    AiOutlinePullRequest,
    AiFillSetting,
    AiFillSave,
    AiOutlineUsergroupAdd,
} from 'react-icons/ai'
import { IoIosPeople } from 'react-icons/io'
import {
    RiAdvertisementFill,
    RiChatPollFill,
    RiMailFill,
    RiArticleFill,
} from 'react-icons/ri'
import { SiteLogo } from './common'

const TopNav = () => {
    return (
        <div className="text-white h-16 bg-darkblue flex border-b-2 border-b-orange-700">
            <h1 className="ml-8 my-3 text-2xl">
                <SiteLogo theme={'light'} />
            </h1>
            <h1 className="mx-auto my-auto text-2xl align-center">
                Admin Dashboard
            </h1>
            <h2
                onClick={() => signOut({ redirect: false })}
                className="flex mr-12 text-lg my-auto py-1 px-2 rounded-md bg-zinc-700 cursor-pointer"
            >
                Logout
            </h2>
        </div>
    )
}

const adminNavs = [
    { url: 'readers', name: 'Readers articles', icon: AiOutlinePullRequest },
    { url: 'critics', name: 'Manage Critics', icon: IoIosPeople },
    { url: 'polls', name: 'Manage Polls', icon: RiChatPollFill },
    { url: 'ads', name: 'Manage Ads', icon: RiAdvertisementFill },
    { url: 'archive', name: 'Manage Archive', icon: BiArchiveOut },
    { url: 'stats', name: 'Stats', icon: BiStats },
]

const SideNav = ({ role }) => {
    return (
        <ul className="min-h-screen dash-list flex flex-col gap-8 px-1 py-16 bg-darkblue w-1/7 text-white">
            <NavLink
                to={'/admin/dashboard/'}
                className={({ isActive }) =>
                    isActive ? 'bg-sky-600 font-bold' : ''
                }
            >
                <li>
                    <AiFillFileAdd className=" text-2xl" />
                    Manage Articles
                </li>
            </NavLink>
            {role &&
                (role?.isRoot || role.canPublish) &&
                adminNavs.map(item => {
                    return (
                        <NavLink
                            key={item.url}
                            to={item.url}
                            className={({ isActive }) =>
                                isActive ? 'bg-sky-600 font-bold' : ''
                            }
                        >
                            <li>
                                <item.icon className=" text-2xl" />
                                {item.name}
                            </li>
                        </NavLink>
                    )
                })}
            {role?.isRoot && (
                <NavLink
                    to={'mods'}
                    className={({ isActive }) =>
                        isActive ? 'bg-sky-600 font-bold' : ''
                    }
                >
                    <li>
                        <AiOutlineUsergroupAdd className=" text-2xl" />
                        Manage Mods
                    </li>
                </NavLink>
            )}
        </ul>
    )
}

const userNavs = [
    { url: '/profile/', name: 'Account', icon: AiFillSetting },
    { url: 'saved', name: 'Saved Articles', icon: AiFillSave },
    { url: 'subscription', name: 'Subsriptions', icon: RiMailFill },
    { url: 'myposts', name: 'My Posts', icon: RiArticleFill },
]

const UserSideNav = () => {
    return (
        <ul className="dash-list flex flex-col gap-6 px-1 py-24 border-r-2 border-r-black">
            {userNavs.map(item => {
                return (
                    <NavLink
                        key={item.url}
                        to={item.url}
                        className={({ isActive }) =>
                            isActive
                                ? 'bg-orange-700 rounded-md text-white'
                                : ''
                        }
                    >
                        <li>
                            <item.icon className=" text-2xl" />
                            {item.name}
                        </li>
                    </NavLink>
                )
            })}
        </ul>
    )
}

export { TopNav, SideNav, UserSideNav }
