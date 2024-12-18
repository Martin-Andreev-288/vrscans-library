import { useEffect, useState } from "react";
import { ProductCard, ProductsFilters } from "../components";
import GenericPage from "./GenericPage";
import { type VRScan, type Material, type Manufacturer } from "../utils/types";
import { apiClient } from "../utils/apiClient";

export default function Products() {
  const [products, setProducts] = useState<VRScan[]>([]);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const emptyPageText = "No VRScans match your filter ❌ Please modify your search and try again";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [vrscansResponse, materialsResponse, manufacturersResponse] = await Promise.all([
          apiClient.get<VRScan[]>("/vrscans"),
          apiClient.get<Material[]>("/materials"),
          apiClient.get<Manufacturer[]>("/manufacturers")
        ]);

        setProducts(vrscansResponse.data);
        setMaterials(materialsResponse.data);
        setManufacturers(manufacturersResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

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
