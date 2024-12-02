import { Outlet, useLocation } from "react-router-dom";
import { ProductsFilters, ProfileSidebar, CollectionsSidebar, Navbar } from "../components";

const HomeLayout: React.FC = () => {
  const location = useLocation();
  let sidebarContent;

  if (location.pathname.startsWith("/products") || location.pathname.startsWith("/favorites")) {
    sidebarContent = <ProductsFilters />;
  } else if (location.pathname.startsWith("/profile")) {
    sidebarContent = <ProfileSidebar />;
  } else if (location.pathname.startsWith("/collections")) {
    sidebarContent = <CollectionsSidebar />;
  } else {
    sidebarContent = null;
  }

  return (
    <div className="flex flex-col items-center pt-9">
      {/* Navbar */}
      <nav className="w-full">
        <div className="w-full max-w-xl md:max-w-2xl lg:max-w-4xl mx-auto">
          <Navbar />
        </div>
      </nav>

      {/* Sidebar and Main Content */}
      <div className="w-full max-w-xl md:max-w-2xl lg:max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 mt-4">
        {/* Left Sidebar */}
        <aside>{sidebarContent}</aside>

        {/* Main Content */}
        <main className="bg-white p-4 rounded-lg shadow-md">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default HomeLayout;
