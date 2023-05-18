import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { signOut } from 'next-auth/react'
import { BiArchiveOut, BiStats } from 'react-icons/bi'
import {
    AiFillFileAdd,
    AiOutlinePullRequest,
    AiOutlineUsergroupAdd,
} from 'react-icons/ai'

import { IoIosPeople, IoMdPerson, IoMdArrowDropdown } from 'react-icons/io'
import { RiAdvertisementFill, RiChatPollFill } from 'react-icons/ri'
import { SiteLogo } from './common'

const TopNav = ({ session }) => {
    const [show, setShow] = useState(false)

    return (
        <div className="place-items-center text-white h-16 bg-darkblue flex border-b-2 border-b-orange-700">
            <h1 className="ml-8 my-3 text-2xl">
                <SiteLogo theme={'light'} />
            </h1>
            <h1 className="mx-auto my-auto text-2xl align-center">
                Admin Dashboard
            </h1>
            <div className="flex gap-1 place-items-center relative -left-16">
                <IoMdPerson className="text-2xl cursor-pointer" />
                {session?.status == 'authenticated' && (
                    <h2 className="text-base pt-2">
                        {session?.data?.user?.name}
                    </h2>
                )}
                <IoMdArrowDropdown
                    className={`${
                        show ? 'rotate-180' : ''
                    } text-3xl cursor-pointer transition-all duration-200 `}
                    onClick={e => setShow(!show)}
                />
            </div>
            {show && (
                <>
                    <div
                        className="fixed inset-0 w-full h-full bg-black opacity-10"
                        onClick={() => setShow(false)}
                    ></div>
                    <ul className="header-drop text-black absolute z-99 right-0 mt-32 p-2 w-36 text-center border-blue border-2 rounded-md font-bold text-xl">
                        <hr className="w-11/12 border-neutral-300" />
                        <NavLink to="/profile/">
                            <li onClick={e => setShow(false)}>Profile</li>
                        </NavLink>
                        <hr className="w-11/12 border-neutral-300" />
                        <li onClick={() => signOut({ redirect: false })}>
                            Logout
                        </li>
                    </ul>
                </>
            )}
        </div>
    )
}

const adminNavs = [
    { url: 'readers', name: 'Readers articles', icon: AiOutlinePullRequest },
    { url: 'critics', name: 'Manage Critics', icon: IoIosPeople },
    { url: 'polls', name: 'Manage Polls', icon: RiChatPollFill },
    { url: 'archive', name: 'Manage Archive', icon: BiArchiveOut },
]
const adminOnly = [
    { url: 'ads', name: 'Manage Ads', icon: RiAdvertisementFill },
    { url: 'stats', name: 'Stats', icon: BiStats },
    { url: 'mods', name: 'Manage Mods', icon: AiOutlineUsergroupAdd },
]
const SideNav = ({ role }) => {
    return (
        <ul className="h-full dash-list flex flex-col gap-8 px-1 py-16 bg-darkblue basis-[14%] flex-grow-0 text-white overflow-y-scroll justify-center">
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
            {role?.isRoot &&
                adminOnly.map(item => {
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
        </ul>
    )
}

export { TopNav, SideNav }
