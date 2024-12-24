import { useEffect, useState } from "react";
import { useDataContext } from "../context/DataContext";
import { ProductCard, ProductsFilters } from "../components";
import GenericPage from "./GenericPage";
import { type VRScan } from "../utils/types";

export default function Products() {
  const { vrscans, materials, manufacturers, industries, colors, tags, isLoading } =
    useDataContext();
  const [products, setProducts] = useState<VRScan[]>([]);

  const emptyPageText = "No VRScans match your filter ❌ Please modify your search and try again";

  useEffect(() => {
    setProducts(vrscans);
  }, [vrscans]);

  function createDictionary<T extends { id: number; name: string }>(
    array: T[]
  ): Record<number, string> {
    return array.reduce((acc: Record<number, string>, item) => {
      acc[item.id] = item.name;
      return acc;
    }, {});
  }

  const industryMap = createDictionary(industries);
  const colorMap = createDictionary(colors);
  const tagMap = createDictionary(tags);

  function updateProperty(
    array: number[],
    map: Record<number, string>,
    propertyName: string
  ): string {
    return array.length ? array.map((id) => map[id]).join(", ") : `Unknown ${propertyName}`;
  }

  return (
    <GenericPage
      SidebarComponent={ProductsFilters}
      title="Product Library"
      emptyPageText={emptyPageText}
      isLoading={isLoading}
    >
      {products.map((product) => (
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
          industries={updateProperty(product.industries, industryMap, "Industries")}
          colors={updateProperty(product.colors, colorMap, "Colors")}
          tags={updateProperty(product.tags, tagMap, "Tags")}
        />
      ))}
    </GenericPage>
  );
}
