import { NavLink } from "react-router";
import Logo from "./Logo";
import Button from "../button/Button";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export default function Navbar() {
  const user = useSelector((state: RootState) => state.userState.user);

  return (
    <nav
      className="w-full border-b-4 pt-2 border-b-gray-200 pb-4 sticky top-0 z-50
    bg-white/80 backdrop-blur-lg"
    >
      <div className="flex items-center justify-between max-w-xl md:max-w-2xl lg:max-w-6xl mx-auto">
        <Logo />
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
      </div>
    </nav>
  );
}
