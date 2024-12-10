import { Outlet } from "react-router-dom";
import { Navbar } from "../components";

export default function HomeLayout() {
  return (
    <div className="flex flex-col items-center pt-9">
      {/* Navbar */}
      <nav className="w-full">
        <div className="w-full max-w-xl md:max-w-2xl lg:max-w-4xl mx-auto">
          <Navbar />
        </div>
      </nav>
      {/* Main Content */}
      <main className="bg-white p-4 rounded-lg">
        <Outlet />
      </main>
    </div>
  );
}
