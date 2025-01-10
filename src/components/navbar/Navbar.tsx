import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import Button from "../button/Button";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export default function Navbar() {
  const user = useSelector((state: RootState) => state.userState.user);

  return (
    <nav className="flex items-center justify-between border-b-4 border-b-black pb-4">
      <div>
        <Logo />
      </div>
      {user ? (
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
              <Button type="navButton">{user.username}</Button>
            </NavLink>
          </li>
        </ul>
      ) : (
        <ul className="flex items-center gap-16">
          <li>
            <NavLink to="/login">
              <Button type="navButton">Login</Button>
            </NavLink>
          </li>
        </ul>
      )}
    </nav>
  );
}
