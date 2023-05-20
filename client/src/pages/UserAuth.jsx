import { useEffect, useState } from 'react'
import { signIn } from 'next-auth/react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import { SiteLogo, FormText } from '../components/common'
import { setAlert } from '../redux/actions/misc'
import { useAxiosError } from '../utils/useAxiosError'

const initialState = {
    email: '',
    password: '',
    name: '',
}

function UserAuth({ session }) {
    const [values, setValues] = useState(initialState)
    const [isLogin, setIsLogin] = useState(true)

    const navigate = useNavigate()
    const { dispatch, onError } = useAxiosError()

    useEffect(() => {
        if (session.status == 'authenticated') {
            navigate('/')
        }
    }, [session])

    const handleChange = e => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const onSubmit = e => {
        e.preventDefault()
        if (isLogin) {
            if (!values.email || !values.password)
                dispatch(setAlert('One or More Field Missing!', 'danger'))
            else {
                signIn('user', {
                    email: values.email,
                    password: values.password,
                    redirect: false,
                }).then(res => {
                    if (res.status == 200)
                        dispatch(setAlert('Login Sucess', 'success'))
                    else dispatch(setAlert('Invalid credentials', 'danger'))
                })
            }
        } else {
            axios
                .get('/api/user/register', {
                    params: { name: values.name, email: values.email },
                })
                .then(res => {
                    if (res.status == 200)
                        dispatch(
                            setAlert(
                                'Check your email for verification process.',
                                'success'
                            )
                        )
                })
                .catch(onError)
        }
    }

    const toggle = e => {
        e.preventDefault()
        setIsLogin(old => !old)
        setValues(initialState)
    }

    return (
        <div className="h-screen w-screen flex items-center">
            <form className="form w-1/4" onSubmit={onSubmit}>
                <SiteLogo />
                <h1 className="text-center mt-2 text-2xl font-bold">
                    User {isLogin ? 'Login' : 'Register'}
                </h1>
                {!isLogin && (
                    <FormText
                        name="name"
                        type="text"
                        labelText="Name"
                        value={values.name}
                        handleChange={handleChange}
                        required
                    />
                )}

                <FormText
                    type="email"
                    name="email"
                    value={values.email}
                    labelText="Email"
                    handleChange={handleChange}
                    required
                />

                {isLogin && (
                    <FormText
                        name="password"
                        type="password"
                        labelText="Password"
                        value={values.password}
                        handleChange={handleChange}
                        required
                    >
                        <a
                            className="text-sm cursor-pointer"
                            title="Seriously?"
                            href="/forgotPassword"
                        >
                            Forgot Password?
                        </a>
                    </FormText>
                )}
                <button type="submit" className="bg-darkblue text-white py-2">
                    {isLogin ? 'Login' : 'Continue'}
                </button>
                {isLogin ? (
                    <span>
                        Need an account?
                        <button onClick={toggle}>Register</button>
                    </span>
                ) : (
                    <span>
                        Already a user?
                        <button onClick={toggle}>SignIn</button>
                    </span>
                )}

                <button
                    onClick={() =>
                        signIn('google', {
                            callbackUrl: window.location.origin,
                        })
                    }
                >
                    {isLogin ? 'Login' : 'Register'} with Google.
                </button>
            </form>
        </div>
    )
}

export default UserAuth
