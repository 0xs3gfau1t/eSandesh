import { Link } from 'react-router-dom'
import siteLogoDark from '../../assets/icons/eSandesh-logo--dark.png'
import siteLogoLight from '../../assets/icons/eSandesh-logo--white.png'

const SiteLogo = ({ theme }) => {
    return (
        <Link to="/" className="text-center">
            <img
                src={theme === 'light' ? siteLogoLight : siteLogoDark}
                className="w-44"
                alt="eSandesh | Khabar Naya Yug ko"
                title="eSandesh | Khabar Naya Yug ko"
            />
            <p>खबर नया युग को</p>
        </Link>
    )
}

export default SiteLogo
