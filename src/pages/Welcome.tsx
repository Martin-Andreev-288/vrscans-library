import welcomeImg from "../assets/welcome-page-img-2.png";
import logo from "../assets/logo.png";
import Button from "../components/button/Button";
import { NavLink } from "react-router-dom";

export default function Welcome() {
  return (
    <div
      className="flex flex-col items-center justify-between min-h-screen bg-cover bg-top"
      style={{ backgroundImage: `url(${welcomeImg})`, backgroundSize: "auto 100vh" }}
    >
      <div className="flex flex-col items-center justify-center h-[90vh]">
        <div className="flex flex-col items-center justify-center h-[70vh] bg-gray-600 bg-opacity-70 p-20 rounded-3xl">
          <h1 className="text-5xl font-bold text-white pb-6">VRScans Materials Library</h1>
          <p className="text-lg text-white pb-40">
            An intuitive, React-powered application that dynamically fetches and displays VRScans
            materials via a pre-configured REST API.
          </p>
          <div className="items-center flex">
            <NavLink to="/login">
              <Button type="welcomeButton">Login / Signup</Button>
            </NavLink>
            <NavLink to="/products">
              <Button type="welcomeButton">Explore VRScans</Button>
            </NavLink>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center border-t-4 border-t-black h-[10vh] w-[90vw]">
        <img className="w-[25rem]" src={logo} alt="CHAOSGROUP" />
      </div>
    </div>
  );
}
