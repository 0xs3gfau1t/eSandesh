import { displayAlert, clearAlert } from "../reducers/misc"

export const setAlert =
	(message, alertType, persist = false) =>
	dispatch => {
		dispatch(
			displayAlert({
				"alertMsg": message,
				"alertType": alertType,
			})
		)
		if (!persist) {
			setTimeout(() => {
				dispatch(clearAlert())
			}, 3000)
		}
	}
