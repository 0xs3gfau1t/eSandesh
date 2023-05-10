import React from 'react'
import { RxCross1 } from 'react-icons/rx'
import { useSelector, useDispatch } from 'react-redux'
import { clearAlert } from '../../redux/reducers/misc'

const Alert = () => {
    const { alertMsg, alertType } = useSelector(state => state.misc)
    const dispatch = useDispatch()
    return (
        <div className={`alert alert-${alertType}`} role="alert">
            <RxCross1
                className="cursor-pointer"
                onClick={() => {
                    dispatch(clearAlert())
                }}
            />
            <span className="w-full mx-auto">{alertMsg}</span>
        </div>
    )
}

export default Alert
