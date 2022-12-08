import { useEffect, useState } from "react"
import { signIn, useSession } from "next-auth/react"
import { useNavigate } from "react-router-dom"

import { SiteLogo, FormText } from "../components/common"

const initialState = {
	username: "",
	password: "",
}

const Login = () => {
	const [values, setValues] = useState(initialState)

	const session = useSession()
	const navigate = useNavigate()

	useEffect(() => {
		// console.log(session)
		if (session.status == "authenticated") {
			navigate("/admin/dashboard")
		}
	}, [session])

	const handleChange = e => {
		setValues({ ...values, [e.target.name]: e.target.value })
	}

	const onSubmit = e => {
		e.preventDefault()
		signIn("admin", { ...values, redirect: false })
	}

	return (
		<div>
			<form className="form my-[15vh] w-1/4" onSubmit={onSubmit}>
				<SiteLogo />
				<h1>Admin Login</h1>
				<FormText
					type="text"
					name="username"
					value={values.username}
					labelText="Username"
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
