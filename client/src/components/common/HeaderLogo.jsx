import { Link } from "react-router-dom"
import siteLogo from "../../assets/icons/eSandesh-logo--dark.png"

const HeaderLogo = () => {
	return (
		<Link to="/">
			<img
				src={siteLogo}
				className="w-40"
				alt="eSandesh- Khabar Naya Yug ko"
			></img>
		</Link>
	)
}

export default HeaderLogo
