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
                <ul className="flex flex-col gap-1">
                    {sections.map((s, idx) => (
                        <div
                            className="flex-grow grid grid-rows-[2rem,auto] grid-cols-[2rem,auto] gap-x-2"
                            key={idx}
                        >
                            <div className="border-solid border-black border rounded-full w-8 h-8 p-1">
                                <div
                                    className={`w-full h-full rounded-full ${
                                        currentSection == idx ? 'bg-black' : ''
                                    }`}
                                />
                            </div>
                            <li
                                className="h-full flex items-center"
                                onClick={() => {
                                    s.ref.current.scrollIntoView({
                                        behavior: 'smooth',
                                    })
                                }}
                            >
                                {s.name}
                            </li>
                            <div className="w-1/2 block border-solid border-r-2 border-black" />
                            <div />
                        </div>
                    ))}
                </ul>
                <main className="flex-grow overflow-scroll" ref={mainRef}>
                    {sections.map((s, idx) => (
                        <div
                            key={idx}
                            ref={s.ref}
                            onMouseEnter={() => setCurrentSection(idx)}
                            className="border-b border-solid border-black inline"
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
