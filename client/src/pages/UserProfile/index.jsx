import { useRef, useState } from 'react'
import { Header } from '../../components'
import SavedPosts from './SavedPosts'
import Subscription from './Subscription'
import UserInfo from './UserInfo'
import UserPosts from './UserPosts'

const UserProfile = ({ session }) => {
    if (session?.status == 'unauthenticated') {
        return (
            <>
                <Header session={session} />
                <h1 className="text-3xl font-bold text-center my-[25vh]">
                    You must login to view this page
                </h1>
            </>
        )
    }

    const [currentSection, setCurrentSection] = useState(0)
    const mainRef = useRef()

    const sections = [
        { name: 'Info', ref: useRef(), element: UserInfo },
        { name: 'Saved posts', ref: useRef(), element: SavedPosts },
        { name: 'Subscriptions', ref: useRef(), element: Subscription },
        { name: 'My posts', ref: useRef(), element: UserPosts },
    ]

    return (
        <div className="h-screen flex flex-col ">
            <Header session={session} />
            <div className="flex flex-grow gap-16 overflow-scroll">
                <ul className="flex flex-col gap-1 ml-20 pt-4">
                    {sections.map((s, idx) => {
                        const active = idx == currentSection
                        return (
                            <div
                                className={`flex-grow grid grid-rows-[1.5rem,auto] grid-cols-[1.5rem,auto] gap-x-2 hover:border-slate-700 hover:text-slate-700 ${
                                    active
                                        ? 'text-slate-800 border-slate-800'
                                        : 'text-gray-400 border-gray-400'
                                }`}
                                key={idx}
                                onClick={() => {
                                    s.ref.current.scrollIntoView({
                                        behavior: 'smooth',
                                    })
                                    setCurrentSection(idx)
                                }}
                            >
                                <div className="border-solid border-inherit border rounded-full w-6 h-6 p-1 cursor-pointer">
                                    <div
                                        className={`w-full h-full rounded-full ${
                                            active ? 'bg-slate-800' : ''
                                        }`}
                                    />
                                </div>
                                <li className="h-full flex items-center cursor-pointer text-inherit">
                                    {s.name}
                                </li>
                                <div className="w-1/2 block border-solid border-r-2 border-inherit" />
                                <div />
                            </div>
                        )
                    })}
                </ul>
                <main
                    className="flex-grow overflow-scroll flex flex-col"
                    ref={mainRef}
                >
                    {sections.map((s, idx) => (
                        <div
                            key={idx}
                            ref={s.ref}
                            onMouseEnter={() => setCurrentSection(idx)}
                            className="border-b border-solid border-black"
                        >
                            <s.element />
                        </div>
                    ))}
                </main>
            </div>
        </div>
    )
}

export default UserProfile
