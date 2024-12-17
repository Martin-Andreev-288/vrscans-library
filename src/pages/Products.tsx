import { useEffect, useState } from "react";
import { ProductCard, ProductsFilters } from "../components";
import GenericPage from "./GenericPage";
import { apiClient } from "../utils/apiClient";

export type VRScan = {
  id: number;
  name: string;
  thumb: string;
  fileName: string;
  materialTypeId: number;
  manufacturerId: number;
  industries: number[];
  colors: number[];
  tags: number[];
  materialFileSize: number;
  createdAt: string;
};

export type Material = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
};

export type Manufacturer = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  logo_file_name: string;
  logo_content_type: string;
  logo_file_size: number;
  logo_updated_at: string;
  website: string;
};

export default function Products() {
  const [products, setProducts] = useState<VRScan[]>([]);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);

  const emptyPageText = "No VRScans match your filter ❌ Please modify your search and try again";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [vrscansResponse, materialsResponse, manufacturersResponse] = await Promise.all([
          apiClient.get<VRScan[]>("/vrscans"),
          apiClient.get<Material[]>("/materials"),
          apiClient.get<Manufacturer[]>("/manufacturers")
        ]);

        setProducts(vrscansResponse.data);
        setMaterials(materialsResponse.data);
        setManufacturers(manufacturersResponse.data);
      } catch (error) {
        console.log("Houston, we have a problem");
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
    />
  );
}
