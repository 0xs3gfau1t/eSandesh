import { Outlet } from 'react-router-dom'
import { TopNav, SideNav } from '../../components'
const AdminDash = () => {
    return (
        <div>
            <TopNav title={'Admin Dashboard'} />
            <div className="flex h-[93vh]">
                <SideNav />
                <div className="w-3/4">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default AdminDash
