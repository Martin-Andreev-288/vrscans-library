import { Outlet, useLocation } from "react-router-dom";
import { ProductsSidebar, ProfileSidebar, CollectionsSidebar } from "../components";

const HomeLayout: React.FC = () => {
  const location = useLocation();
  let sidebarContent;

  if (location.pathname.startsWith("/products") || location.pathname.startsWith("/favorites")) {
    sidebarContent = <ProductsSidebar />;
  } else if (location.pathname.startsWith("/profile")) {
    sidebarContent = <ProfileSidebar />;
  } else if (location.pathname.startsWith("/collections")) {
    sidebarContent = <CollectionsSidebar />;
  } else {
    sidebarContent = null;
  }

  return (
    <>
      <header>Header</header>
      <aside>{sidebarContent}</aside>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default HomeLayout;
