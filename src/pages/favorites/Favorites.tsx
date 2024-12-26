import { NavLink } from "react-router-dom";
import { FavoriteProductCard, ProductsFilters, Button } from "../../components";
import GenericPage from "../genericPage/GenericPage";
import { useDataContext } from "../../context/DataContext";

export default function Favorites() {
  const { isLoading } = useDataContext();
  const favProducts = Array(12).fill(null);
  const emptyPageText =
    "Your favorites list is empty! ☹️ Start exploring and save your top scans now!";

  return (
    <GenericPage
      SidebarComponent={ProductsFilters}
      title="Favorites"
      emptyPageText={emptyPageText}
      isLoading={isLoading}
      navButton={
        <NavLink to="/products">
          <Button type="navButton">Begin Your VRS Journey</Button>
        </NavLink>
      }
    >
      {favProducts.map((product) => (
        <FavoriteProductCard />
      ))}
    </GenericPage>
  );
}
