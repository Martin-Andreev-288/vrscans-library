import { Link } from "react-router-dom";
import logoImage from "/src/assets/logo.png";

export default function Logo() {
  return (
    <Link to="/">
      <img src={logoImage} alt="WorldWise logo" className="h-9 max-w-56" />
    </Link>
  );
}
