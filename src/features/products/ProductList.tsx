import ProductCard from "./ProductCard";
import { type VRScan } from "../../utils/types";

type ProductListProps = {
  products: VRScan[];
  colors: any[];
  industries: any[];
  manufacturers: any[];
  materials: any[];
  tags: any[];
};

export default function ProductList({
  products,
  colors,
  industries,
  manufacturers,
  materials,
  tags
}: ProductListProps) {
  return (
    <>
      {products.map((product) => (
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
    </>
  );
}
