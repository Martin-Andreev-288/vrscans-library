import { useEffect } from "react";
import { useDataContext } from "../../context/DataContext";
import { ProductCard, ProductsFilters } from "../../features";
import GenericPage from "../../components/genericPage/GenericPage";
import { useFetchColorsQuery } from "../../store/apis/colorsApi";
import { useFetchIndustriesQuery } from "../../store/apis/industriesApi";
import { useFetchManufacturersQuery } from "../../store/apis/manufacturersApi";
import { useFetchMaterialsQuery } from "../../store/apis/materialsApi";
import { useFetchTagsQuery } from "../../store/apis/tagsApi";

export default function Products() {
  const { vrscans, updateVrscans, isLoading } = useDataContext();

  useEffect(() => {
    updateVrscans();
  }, []);

  const { data: colors = [] } = useFetchColorsQuery();
  const { data: industries = [] } = useFetchIndustriesQuery();
  const { data: manufacturers = [] } = useFetchManufacturersQuery();
  const { data: materials = [] } = useFetchMaterialsQuery();
  const { data: tags = [] } = useFetchTagsQuery();

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
