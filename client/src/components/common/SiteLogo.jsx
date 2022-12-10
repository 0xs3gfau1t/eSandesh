import { Link } from "react-router-dom"
import siteLogoDark from "../../assets/icons/eSandesh-logo--dark.png"
import siteLogoLight from "../../assets/icons/eSandesh-logo--white.png"

const SiteLogo = ({ theme }) => {
	return (
		<Link to="/">
			<img
				src={theme === "light" ? siteLogoLight : siteLogoDark}
				className="w-40"
				alt="eSandesh | Khabar Naya Yug ko"
				title="eSandesh | Khabar Naya Yug ko"
			/>
		</Link>
	)
}

export default SiteLogo
