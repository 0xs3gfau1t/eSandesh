import { Navigate } from 'react-router-dom'
import { useSession } from 'next-auth/react'

const PrivateRoute = ({ session, children }) => {
    const role = session?.data?.user?.roles
    if (
        session.status == 'unauthenticated' ||
        !(role?.isRoot || role?.canPublish || role?.isReporter)
    ) {
        return <Navigate to="/admin" />
    }

    return children
}

export default PrivateRoute
