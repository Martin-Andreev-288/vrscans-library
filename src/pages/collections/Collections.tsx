import { useState } from "react";
import { CollectionCards, CollectionsSidebar, ProductsFilters } from "../../features";

export default function Collections() {
  const [viewingItems, setViewingItems] = useState<string | null>(null);

  const title = viewingItems ? `Items in '${viewingItems}'` : "Collections";

  return (
    <div className="main">
      <aside className="pt-14">{viewingItems ? <ProductsFilters /> : <CollectionsSidebar />}</aside>
      <div className="p-2 pt-0">
        <h1 className="text-xl font-bold mb-6 text-center">{title}</h1>
        <CollectionCards viewingItems={viewingItems} setViewingItems={setViewingItems} />
      </div>
    </div>
  );
}
