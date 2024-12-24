import { useEffect, useState } from "react";
import { useDataContext } from "../context/DataContext";
import { ProductCard, ProductsFilters } from "../components";
import GenericPage from "./GenericPage";
import { type VRScan } from "../utils/types";

export default function Products() {
  const { vrscans, materials, manufacturers, isLoading } = useDataContext();
  const [products, setProducts] = useState<VRScan[]>([]);

  const emptyPageText = "No VRScans match your filter ❌ Please modify your search and try again";

  useEffect(() => {
    setProducts(vrscans);
  }, [vrscans]);

  return (
    <GenericPage
      SidebarComponent={ProductsFilters}
      title="Product Library"
      items={products.map((product) => ({
        ...product,
        material:
          materials.find((m) => m.id === product.materialTypeId)?.name || "Unknown Material",
        manufacturer:
          manufacturers.find((m) => m.id === product.manufacturerId)?.name || "Unknown Manufacturer"
      }))}
      ComponentCard={ProductCard}
      emptyPageText={emptyPageText}
      isLoading={isLoading}
    />
  );
}
