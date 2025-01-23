import ProductCard from "../products/ProductCard";
import { useFetchFiltersData } from "../../hooks/useFetchFiltersData";
import { NavLink } from "react-router-dom";
import { Button } from "../../components";
import { useEffect, useState } from "react";
import { type VRScan, type FilterSelection } from "../../utils/types";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

type FavProductsListProps = {
  favsFilterSelection: FilterSelection;
};

export default function FavProductList({ favsFilterSelection }: FavProductsListProps) {
  const [favs, setFavs] = useState<VRScan[]>([]);
  const [allFavs, setAllFavs] = useState<VRScan[]>([]);

  const favProducts = useSelector((state: RootState) => state.favItems);

  const filterFavs = (favs: VRScan[]) =>
    favs.filter((fav) => {
      const acceptsMaterials =
        !favsFilterSelection.materials.size ||
        favsFilterSelection.materials.has(fav.materialTypeId);
      const acceptsColors =
        !favsFilterSelection.colors.size ||
        fav.colors.some((color) => favsFilterSelection.colors.has(color));
      const acceptsTags =
        !favsFilterSelection.tags.size || fav.tags.some((tag) => favsFilterSelection.tags.has(tag));

      return acceptsMaterials && acceptsColors && acceptsTags;
    });

  useEffect(() => {
    setFavs(filterFavs(allFavs));
  }, [favsFilterSelection]);

  function updateFavs() {
    setAllFavs(favProducts);
    setFavs(filterFavs(favProducts));
  }

  useEffect(() => {
    updateFavs();
  }, []);

  const { colors, industries, manufacturers, materials, tags } = useFetchFiltersData();

  const emptyPageText =
    "Your favorites list is empty! ☹️ Start exploring and save your top scans now!";

  return (
    <>
      {favs.length ? (
        <ul className="card-container">
          {favs.map((product) => (
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
