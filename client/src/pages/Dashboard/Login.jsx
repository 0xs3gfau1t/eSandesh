import { useEffect, useState } from 'react'
import { signIn } from 'next-auth/react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { SiteLogo, FormText } from '../../components/common'
import { setAlert } from '../../redux/actions/misc'

const initialState = {
    email: '',
    password: '',
}

const Login = ({ session }) => {
    const [values, setValues] = useState(initialState)

    const role = session?.data?.user?.roles
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if (
            session.status == 'authenticated' &&
            (role?.isRoot || role?.canPublish)
        ) {
            navigate('/admin/dashboard/')
        }
    }, [session])

    const handleChange = e => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const onSubmit = e => {
        e.preventDefault()
        if (!values.email || !values.password)
            dispatch(setAlert('One or More Field Missing!', 'danger'))
        else {
            signIn('admin', { ...values, redirect: false }).then(res => {
                if (res.status == 200)
                    dispatch(setAlert('Login Sucess', 'success'))
                else dispatch(setAlert('Invalid credentials', 'danger'))
            })
        }
    }

    return (
        <div>
            <form className="form my-[15vh] w-1/4" onSubmit={onSubmit}>
                <SiteLogo />
                <h1>Admin Login</h1>
                <FormText
                    type="email"
                    name="email"
                    value={values.email}
                    labelText="Email"
                    handleChange={handleChange}
                />

                <FormText
                    name="password"
                    type="password"
                    labelText="Password"
                    value={values.password}
                    handleChange={handleChange}
                />
                <button type="submit" className="bg-darkblue text-white py-2">
                    Login
                </button>
            </form>
        </div>
    )
}

export default Login
