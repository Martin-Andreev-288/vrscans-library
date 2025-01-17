import ProductCard from "../products/ProductCard";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useFetchFiltersData } from "../../hooks/useFetchFiltersData";
import { NavLink } from "react-router-dom";
import { Button } from "../../components";

export default function ProductList() {
  const favProducts = useSelector((state: RootState) => state.favItems);

  const { colors, industries, manufacturers, materials, tags } = useFetchFiltersData();

  const emptyPageText =
    "Your favorites list is empty! ☹️ Start exploring and save your top scans now!";

  return (
    <>
      {favProducts.length ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {favProducts.map((product) => (
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
        </ul>
      ) : (
        <>
          <h1 className="text-xl font-bold mb-6 text-center">{emptyPageText}</h1>
          <div className="mt-4 flex justify-center">
            <NavLink to="/products">
              <Button type="navButton">Begin Your VRS Journey</Button>
            </NavLink>
          </div>
        </>
      )}
    </>
  );
}
