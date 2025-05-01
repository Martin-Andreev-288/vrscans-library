import { useEffect } from "react";
import { useDataContext } from "../../context/DataContext";
import ProductCard from "./ProductCard";
import { useFetchFiltersData } from "../../hooks/useFetchFiltersData";

export default function ProductList() {
  const { vrscans, loadMoreVrscans, hasMore, isLoading } = useDataContext();

  // Add scroll listener for infinite scroll
  useEffect(() => {
    console.log("endless loop testing");
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

      const isNearBottom = scrollTop + clientHeight >= scrollHeight * 0.7;

      if (isNearBottom && hasMore && !isLoading) {
        loadMoreVrscans();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, isLoading, loadMoreVrscans]);

  const { colors, industries, manufacturers, materials, tags } = useFetchFiltersData();

  const emptyPageText = "No VRScans match your filter ❌ Please modify your search and try again";

  return (
    <>
      {vrscans.length ? (
        <div>
          <ul className="card-container">
            {vrscans.map((product) => (
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
                  product.colors
                    .map((id) => colors.find((col) => col.id === id)?.name)
                    .join(", ") || "Unknown Colors"
                }
                tags={
                  product.tags.map((id) => tags.find((tag) => tag.id === id)?.name).join(", ") ||
                  "Unknown Tags"
                }
              />
            ))}
          </ul>
        </div>
      ) : (
        <>
          <h1 className="text-xl font-bold mb-6 text-center">{emptyPageText}</h1>
        </>
      )}
    </>
  );
}
