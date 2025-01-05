import { Link } from "react-router-dom";
import logoImage from "/src/assets/logo.png";

export default function Logo() {
  return (
    <Link to="/products">
      <img src={logoImage} alt="WorldWise logo" className="h-7" />
    </Link>
  );
}
