import { NavLink } from "react-router-dom";
import { Button } from "../../components";
import { ProductCard, ProductsFilters } from "../../features";
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
      {favProducts.length &&
        favProducts.map((product) => (
          <ProductCard
            key={product.id}
            item={product}
            name={product.name}
            thumb={product.thumb}
            fileName={product.fileName}
            material={
              materials.find((m) => m.id === product.materialTypeId)?.name || "Unknown Material"
            }
            manufacturer={
              manufacturers.find((m) => m.id === product.manufacturerId)?.name ||
              "Unknown Manufacturer"
            }
            industries={
              product.industries
                .map((id) => industries.find((ind) => ind.id === id)?.name)
                .join(", ") || "Unknown Industries"
            }
            colors={
              product.colors.map((id) => colors.find((col) => col.id === id)?.name).join(", ") ||
              "Unknown Colors"
            }
            tags={
              product.tags.map((id) => tags.find((tag) => tag.id === id)?.name).join(", ") ||
              "Unknown Tags"
            }
          />
        ))}
    </GenericPage>
  );
}
