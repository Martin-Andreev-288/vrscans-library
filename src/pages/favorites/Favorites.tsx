import { NavLink } from "react-router-dom";
import { Button } from "../../components";
import { ProductsFilters, ProductList } from "../../features";
import GenericPage from "../../components/genericPage/GenericPage";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import useLoading from "../../hooks/useLoading";
import { useFetchFiltersData } from "../../hooks/useFetchFiltersData";

export default function Favorites() {
  const isLoading = useLoading();
  const favProducts = useSelector((state: RootState) => state.favItems);

  const { colors, industries, manufacturers, materials, tags } = useFetchFiltersData();

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
      {favProducts.length && (
        <ProductList
          products={favProducts}
          colors={colors}
          industries={industries}
          manufacturers={manufacturers}
          materials={materials}
          tags={tags}
        />
      )}
    </GenericPage>
  );
}
