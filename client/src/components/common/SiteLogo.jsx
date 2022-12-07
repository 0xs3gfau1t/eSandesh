import { Link } from "react-router-dom";
import siteLogo from "../../assets/icons/eSandesh-logo--dark.png";

const SiteLogo = () => {
  return (
    <Link to="/">
      <img src={siteLogo} className="w-40" alt="eSandesh- Khabar Naya Yug ko" />
    </Link>
  );
};

export default SiteLogo;
