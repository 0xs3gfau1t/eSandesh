import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useSession } from "next-auth/react"

import { setFocus } from "../../redux/reducers/misc"

const DashBoard = () => {
	const { data: session, status } = useSession()

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(setFocus(true))
	}, [])

	if (status == "unauthenticated") {
		return <h1>You must login to view this page</h1>
	}

	return (
		<div>
			<h1>I am user ko Dashboard.</h1>
		</div>
	)
}

export default DashBoard
