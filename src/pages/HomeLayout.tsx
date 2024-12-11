import { Outlet } from "react-router-dom";
import { Navbar } from "../components";

export default function HomeLayout() {
  return (
    <div className="flex flex-col items-center pt-9">
      {/* Navbar */}
      <nav className="w-full max-w-xl md:max-w-2xl lg:max-w-5xl mx-auto">
        <Navbar />
      </nav>
      {/* Main Content */}
      <main className="w-full max-w-xl md:max-w-2xl lg:max-w-5xl mx-auto">
        <Outlet />
      </main>
    </div>
  );
}
