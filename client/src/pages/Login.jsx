import { useEffect, useState } from "react"
import { SiteLogo, FormText } from "../components/common"
import { signIn, useSession } from "next-auth/react"

const initialState = {
	username: "",
	password: "",
}

const Login = () => {
	const [values, setValues] = useState(initialState)

	const session = useSession()
	useEffect(()=>{
		console.log(session)
		if (session.status == "authenticated"){
			// TODO: Redirect to /admin/dashboard
			console.log("Authenticated")
		}
	}, [session])

	const handleChange = e => {
		setValues({ ...values, [e.target.name]: e.target.value })
	}

	const onSubmit = e => {
		e.preventDefault()
		signIn('admin', values)
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
