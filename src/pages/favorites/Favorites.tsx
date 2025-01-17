import { ProductsFilters, FavProductList } from "../../features";

export default function Favorites() {
  return (
    <div className="main">
      <aside className="pt-14">
        <ProductsFilters />
      </aside>
      <div className="p-2 pt-0">
        <h1 className="text-xl font-bold mb-6 text-center">Favorites</h1>
        <FavProductList />
      </div>
    </div>
  );
}
