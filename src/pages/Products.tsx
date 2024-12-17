import { useEffect, useState } from "react";
import { ProductCard, ProductsFilters } from "../components";
import GenericPage from "./GenericPage";
import { apiClient } from "../utils/apiClient";

export default function Products() {
  const [products, setProducts] = useState([]);
  const emptyPageText = "No VRScans match your filter ❌ Please modify your search and try again";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get("/vrscans");
        setProducts(response.data);
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
      items={products}
      ComponentCard={ProductCard}
      emptyPageText={emptyPageText}
    />
  );
}
