import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { SiteLogo, FormText } from '../components/common'
import { setAlert } from '../redux/actions/misc'

const ForgotPassword = () => {
    const [params, setParams] = useSearchParams()
    const [token, setToken] = useState(null)
    const [value, setValue] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        const _token = params.get('token')
        if (_token) {
            setToken(_token)
            setParams({})
        }
    }, [])

    const handleSubmit = async e => {
        e.preventDefault()
        let promise
        if (token) {
            promise = axios.post('/api/user/forgotpassword', {
                token,
                password: value,
            })
        } else {
            const params = new URLSearchParams()
            params.set('email', value)
            promise = axios.get('/api/user/forgotpassword?' + params.toString())
        }

        await promise
            .then(res => {
                if (res.data.success) {
                    dispatch(setAlert(res.data.message, 'success'))
                    setTimeout(() => {
                        navigate(token ? '/userauth' : '/')
                    }, 3000)
                } else {
                    dispatch(setAlert('Something went wrong.', 'danger'))
                }
            })
            .catch(err =>
                dispatch(setAlert(err.response?.data?.error, 'danger'))
            )
    }

    return (
        <div className="h-screen w-screen flex items-center">
            <form className="form w-1/4" onSubmit={handleSubmit}>
                <SiteLogo />
                <h1 className="text-center mt-2 text-2xl font-bold">
                    {token ? 'Set new password' : 'Request password reset'}
                </h1>

                <FormText
                    type={token ? 'password' : 'email'}
                    name={token ? 'New Password' : 'Email'}
                    value={value}
                    handleChange={e => setValue(e.target.value)}
                    required={true}
                />

                <button type="submit" className="bg-darkblue text-white py-2">
                    Submit
                </button>
            </form>
        </div>
    )
}

export default ForgotPassword
