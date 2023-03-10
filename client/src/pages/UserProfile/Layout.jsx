import { Outlet } from 'react-router-dom'
import { useSession } from 'next-auth/react'

import { Header, UserSideNav } from '../../components'

const UserProfile = () => {
    const { data: session, status } = useSession()

    if (status == 'unauthenticated') {
        return (
            <>
                <Header />
                <h1 className="text-3xl font-bold text-center my-[25vh]">
                    You must login to view this page
                </h1>
            </>
        )
    }

    return (
        <div className="h-screen flex flex-col ">
            <Header />
            <div className="flex h-full gap-16">
                <UserSideNav />
                <div className="w-3/4 mt-4">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default UserProfile
