import { Outlet } from "react-router";
import { Navbar } from "../../components";

export default function HomeLayout() {
  return (
    <div className="flex flex-col items-center pt-5">
      {/* Navbar */}
      <Navbar />
      {/* Main Content */}
      <main className="w-full max-w-xl md:max-w-2xl lg:max-w-6xl mx-auto">
        <Outlet />
      </main>
    </div>
  );
}
