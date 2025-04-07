import FavProductCard from "./FavProductCard";
import { useFetchFiltersData } from "../../hooks/useFetchFiltersData";
import { NavLink } from "react-router";
import { Button } from "../../components";
import { useCallback, useEffect, useState } from "react";
import { type VRScan, type FilterSelection } from "../../utils/types";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useDebounce } from "../../hooks/useDebounce";

type FavProductsListProps = {
  favsFilterSelection: FilterSelection;
};

export default function FavProductList({ favsFilterSelection }: FavProductsListProps) {
  const [favs, setFavs] = useState<VRScan[]>([]);
  const [allFavs, setAllFavs] = useState<VRScan[]>([]);

  const favProducts = useSelector((state: RootState) => state.favItems);

  const filterFavs = useCallback(
    (favs: VRScan[]) => {
      return favs.filter((fav) => {
        const searchTerm = favsFilterSelection.searchTerm?.toLowerCase().trim() || "";
        const acceptsSearch = !searchTerm || fav.name.toLowerCase().includes(searchTerm);
        const acceptsMaterials =
          !favsFilterSelection.materials.size ||
          favsFilterSelection.materials.has(fav.materialTypeId);
        const acceptsColors =
          !favsFilterSelection.colors.size ||
          fav.colors.some((color) => favsFilterSelection.colors.has(color));
        const acceptsTags =
          !favsFilterSelection.tags.size ||
          fav.tags.some((tag) => favsFilterSelection.tags.has(tag));

        return acceptsSearch && acceptsMaterials && acceptsColors && acceptsTags;
      });
    },
    [favsFilterSelection]
  );

  const debouncedFavsFilterSelection = useDebounce(favsFilterSelection, 500);

  useEffect(() => {
    setFavs(filterFavs(allFavs));
  }, [debouncedFavsFilterSelection]);

  function updateFavs() {
    setAllFavs(favProducts);
    setFavs(filterFavs(favProducts));
  }

  useEffect(() => {
    updateFavs();
  }, []);

  const { colors, industries, manufacturers, materials, tags } = useFetchFiltersData();

  const emptyPageText =
    favProducts.length === 0
      ? "Your favorites list is empty! ☹️ Start exploring and save your top scans now!"
      : "No favorites match your search/filters 🧐 Try adjusting your criteria or clear filters";

  return (
    <>
      {favs.length ? (
        <ul className="card-container">
          {favs.map((product) => (
            <FavProductCard
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
          {/* Only show the CTA button when truly empty */}
          {favProducts.length === 0 && (
            <div className="mt-4 flex justify-center">
              <NavLink to="/products">
                <Button type="navButton">Begin Your VRS Journey</Button>
              </NavLink>
            </div>
          )}
        </>
      )}
    </>
  );
}
