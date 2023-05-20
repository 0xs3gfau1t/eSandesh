import { useEffect, useState } from 'react'
import { signIn } from 'next-auth/react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'

import { SiteLogo, FormText } from '../components/common'
import { setAlert } from '../redux/actions/misc'
import { useAxiosError } from '../utils/useAxiosError'

function Register() {
    const [params, setParams] = useSearchParams()
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
    })
    const navigate = useNavigate()

    const { dispatch, onError } = useAxiosError()

    useEffect(() => {
        const token = params.get('token')
        if (!token) return navigate('/userauth')

        setParams({})

        axios
            .post('api/user/register', { token })
            .then(res => {
                if (res.status == 200) {
                    setValues({
                        name: res.data.name,
                        email: res.data.email,
                        password: '',
                        password2: '',
                    })
                }
            })
            .catch(err => {
                onError(err)
                navigate('/userauth')
            })
    }, [])

    const handleChange = e => {
        setValues({ ...values, [e.target.name]: e.target.value })
        if (e.target.name == 'password2')
            e.target.setCustomValidity(
                values.password !== e.target.value
                    ? 'Passwords donot match'
                    : ''
            )
    }

    const onSubmit = e => {
        e.preventDefault()
        signIn('register-user', {
            ...values,
            callbackUrl: window.location.origin,
        }).then(res => {
            if (res.status == 200)
                dispatch(setAlert('Account Register Sucess', 'success'))
            else dispatch(setAlert('Email already used.', 'danger'))
        })
    }

    return (
        <div className="h-screen w-screen flex items-center">
            <form className="form w-1/4" onSubmit={onSubmit}>
                <SiteLogo />
                <h1 className="text-center mt-2 text-2xl font-bold">
                    User Register
                </h1>
                <FormText
                    name="name"
                    type="text"
                    labelText="Name"
                    value={values.name}
                    required
                    disabled
                />
                <FormText
                    type="email"
                    name="email"
                    value={values.email}
                    labelText="Email"
                    required
                    disabled
                />
                <FormText
                    name="password"
                    type="password"
                    labelText="Password"
                    value={values.password}
                    handleChange={handleChange}
                    required
                />
                <FormText
                    name="password2"
                    type="password"
                    labelText="Confirm Password"
                    value={values.password2}
                    handleChange={handleChange}
                    required
                />
                <button type="submit" className="bg-darkblue text-white py-2">
                    Register
                </button>
            </form>
        </div>
    )
}

export default Register
