import { useDispatch } from 'react-redux'
import { setAlert } from '../redux/actions/misc'

export const useAxiosError = () => {
    const dispatch = useDispatch()

    return {
        dispatch,
        onError(err) {
            console.error(err)
            const errMsg =
                err.response?.data?.error ||
                err.message ||
                'Something went wrong.'
            dispatch(setAlert(errMsg, 'danger'))
        },
        setAlert,
    }
}
