import { ProductsFilters, ProductList } from "../../features";
import { BackToTopBtn } from "../../components";

export default function Products() {
  return (
    <div className="main">
      <BackToTopBtn />
      <aside className="pt-14">
        <ProductsFilters />
      </aside>
      <div className="p-2 pt-0">
        <h1 className="text-xl font-bold mb-6 text-center">Product Library</h1>
        <ProductList />
      </div>
    </div>
  );
}
