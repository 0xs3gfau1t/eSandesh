import { Outlet } from 'react-router-dom'
import { TopNav, SideNav } from '../../components'
const AdminDash = ({ session }) => {
    return (
        <div className="h-screen w-screen flex flex-col">
            <TopNav title={'Admin Dashboard'} />
            <div className="flex h-[calc(100%-4rem)]">
                <SideNav role={session?.data?.user?.roles} />
                <div className="flex-grow overflow-y-scroll">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default AdminDash
