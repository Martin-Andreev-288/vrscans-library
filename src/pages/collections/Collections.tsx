import { useState } from "react";
import {
  CollectionsContainer,
  CollectionProductsFilters,
  CollectionsSidebar
} from "../../features";
import { type FilterSelection } from "../../utils/types";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { AccessDenied, BackToTopBtn } from "../../components";

export default function Collections() {
  const [viewingItems, setViewingItems] = useState<string | null>(null);
  const [collItemsFilterSelection, setCollItemsFilterSelection] = useState<FilterSelection>({
    materials: new Set(),
    colors: new Set(),
    tags: new Set()
  });

  const user = useSelector((state: RootState) => state.userState.user);
  const title = viewingItems ? `Items in '${viewingItems}'` : "Collections";

  if (!user) return <AccessDenied />;

  return (
    <div className="main">
      <BackToTopBtn />
      <aside className="pt-14">
        {viewingItems ? (
          <CollectionProductsFilters
            collItemsFilterSelection={collItemsFilterSelection}
            setCollItemsFilterSelection={setCollItemsFilterSelection}
          />
        ) : (
          <CollectionsSidebar />
        )}
      </aside>
      <div className="p-2 pt-0">
        <h1 className="text-xl font-bold mb-6 text-center">{title}</h1>
        <CollectionsContainer
          viewingItems={viewingItems}
          setViewingItems={setViewingItems}
          collItemsFilterSelection={collItemsFilterSelection}
        />
      </div>
    </div>
  );
}
