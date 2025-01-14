import { useEffect } from "react";
import { useDataContext } from "../../context/DataContext";
import { ProductsFilters, ProductList } from "../../features";
import GenericPage from "../../components/genericPage/GenericPage";
import { useFetchFiltersData } from "../../hooks/useFetchFiltersData";

export default function Products() {
  const { vrscans, updateVrscans, isLoading } = useDataContext();

  useEffect(() => {
    updateVrscans();
  }, []);

  const { colors, industries, manufacturers, materials, tags } = useFetchFiltersData();

  const emptyPageText = "No VRScans match your filter ❌ Please modify your search and try again";

  return (
    <GenericPage
      SidebarComponent={ProductsFilters}
      title="Product Library"
      emptyPageText={emptyPageText}
      isLoading={isLoading}
    >
      {vrscans.length && (
        <ProductList
          products={vrscans}
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
