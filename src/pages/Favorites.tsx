import { NavLink } from "react-router-dom";
import { FavoriteProductCard, ProductsFilters, Button } from "../components";
import GenericPage from "./GenericPage";

export default function Favorites() {
  const favProducts = Array(12).fill(null);
  const emptyPageText =
    "Your favorites list is empty! ☹️ Start exploring and save your top scans now!";

  return (
    <GenericPage
      SidebarComponent={ProductsFilters}
      title="Favorites"
      items={favProducts}
      ComponentCard={FavoriteProductCard}
      emptyPageText={emptyPageText}
      navButton={
        <NavLink to="/products">
          <Button type="navButton">Begin Your VRS Journey</Button>
        </NavLink>
      }
    />
  );
}
