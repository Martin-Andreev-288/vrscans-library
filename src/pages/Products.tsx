import { ProductCard, ProductsFilters } from "../components";
import GenericPage from "./GenericPage";

export default function Products() {
  const products = Array(12).fill(null);
  const emptyPageText = "No VRScans match your filter ❌ Please modify your search and try again";

  return (
    <GenericPage
      SidebarComponent={ProductsFilters}
      title="Product Library"
      items={products}
      ComponentCard={ProductCard}
      emptyPageText={emptyPageText}
    />
  );
}
