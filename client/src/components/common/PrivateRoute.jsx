import { Navigate } from "react-router-dom"
import { useSession } from "next-auth/react"

const PrivateRoute = ({ children }) => {
	const { data: session, status } = useSession()

	if (status == "unauthenticated") {
		return <Navigate to="/admin" />
	}

	return children
}

export default PrivateRoute
