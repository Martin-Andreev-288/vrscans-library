import { useEffect } from "react";
import { useDataContext } from "../../context/DataContext";
import { ProductCard, ProductsFilters } from "../../features";
import GenericPage from "../genericPage/GenericPage";

export default function Products() {
  const { vrscans, updateVrscans, materials, manufacturers, industries, colors, tags, isLoading } =
    useDataContext();

  useEffect(() => {
    updateVrscans();
  }, []);

  const emptyPageText = "No VRScans match your filter ❌ Please modify your search and try again";

  return (
    <GenericPage
      SidebarComponent={ProductsFilters}
      title="Product Library"
      emptyPageText={emptyPageText}
      isLoading={isLoading}
    >
      {vrscans.map((product) => (
        <ProductCard
          key={product.id}
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
