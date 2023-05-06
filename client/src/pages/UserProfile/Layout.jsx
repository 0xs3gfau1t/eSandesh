import { Outlet } from 'react-router-dom'

import { Header, UserSideNav } from '../../components'

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

    return (
        <div className="h-screen flex flex-col ">
            <Header session={session} />
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
