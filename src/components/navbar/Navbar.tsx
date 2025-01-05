import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import Button from "../button/Button";

export default function Navbar() {
  let isLoggedIn = true;

  return (
    <nav className="flex items-center justify-between border-b-4 border-b-black pb-4">
      <div>
        <Logo />
      </div>
      {isLoggedIn ? (
        <ul className="flex items-center gap-7">
          <li>
            <NavLink to="/favorites">
              <Button type="navButton">Favorites</Button>
            </NavLink>
          </li>
          <li>
            <NavLink to="/collections">
              <Button type="navButton">Collections</Button>
            </NavLink>
          </li>
          <li>
            <NavLink to="/profile">
              <Button type="navButton">Username</Button>
            </NavLink>
          </li>
        </ul>
      ) : (
        <ul className="flex items-center gap-16">
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
        </ul>
      )}
    </nav>
  );
}
