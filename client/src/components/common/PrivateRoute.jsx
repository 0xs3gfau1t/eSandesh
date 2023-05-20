import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ session, children }) => {
    const role = session?.data?.user?.roles
    if (
        session.status == 'unauthenticated' ||
        !(role?.isRoot || role?.canPublish)
    ) {
        return <Navigate to="/admin" />
    }

    return children
}

export default PrivateRoute
