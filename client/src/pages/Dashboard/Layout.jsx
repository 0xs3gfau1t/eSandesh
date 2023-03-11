import { Outlet } from 'react-router-dom'
import { TopNav, SideNav } from '../../components'
const AdminDash = ({ session }) => {
    return (
        <div>
            <TopNav title={'Admin Dashboard'} />
            <div className="flex h-full">
                <SideNav role={session.data.user.roles} />
                <div className="w-3/4">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default AdminDash
