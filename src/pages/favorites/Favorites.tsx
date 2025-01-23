import { useState } from "react";
import { FavProductsFilters, FavProductList } from "../../features";
import { type FilterSelection } from "../../utils/types";

export default function Favorites() {
  const [favsFilterSelection, setFavsFilterSelection] = useState<FilterSelection>({
    materials: new Set(),
    colors: new Set(),
    tags: new Set()
  });

  return (
    <div className="main">
      <aside className="pt-14">
        <FavProductsFilters
          favsFilterSelection={favsFilterSelection}
          setFavsFilterSelection={setFavsFilterSelection}
        />
      </aside>
      <div className="p-2 pt-0">
        <h1 className="text-xl font-bold mb-6 text-center">Favorites</h1>
        <FavProductList favsFilterSelection={favsFilterSelection} />
      </div>
    </div>
  );
}
