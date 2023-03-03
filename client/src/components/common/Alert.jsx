import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { clearAlert } from "../../redux/reducers/misc"

const Alert = () => {
	const { alertMsg, alertType } = useSelector(state => state.misc)
	const dispatch = useDispatch()
	return (
		<div className={`alert alert-${alertType}`} role="alert">
			<span
				className="cursor-pointer mr-2 my-auto font-extrabold"
				onClick={e => {
					dispatch(clearAlert())
				}}
			>
				X
			</span>
			<span className="w-full mx-auto">{alertMsg}</span>
		</div>
	)
}

export default Alert
