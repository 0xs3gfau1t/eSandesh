import { Outlet } from 'react-router-dom'
import { TopNav, SideNav } from '../../components'
const AdminDash = ({ session }) => {
    return (
        <div className="w-screen">
            <TopNav title={'Admin Dashboard'} session={session} />
            <div className="relative flex h-screen py-2 gap-2">
                <SideNav role={session?.data?.user?.roles} />
                <div className="flex-grow w-4/5 overflow-y-scroll bg-stone-200 rounded-lg">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default AdminDash
