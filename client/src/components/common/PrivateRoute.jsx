import { Navigate } from "react-router-dom"
import { useSession } from "next-auth/react"

const PrivateRoute = ({ children }) => {
	const session = useSession()

	if (
		session.status == "unauthenticated" ||
		!session?.data?.user?.roles.isRoot
	) {
		return <Navigate to="/admin" />
	}

	return children
}

export default PrivateRoute
