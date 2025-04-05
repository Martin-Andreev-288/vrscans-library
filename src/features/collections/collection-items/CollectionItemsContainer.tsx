import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { VRScan, FilterSelection } from "../../../utils/types";
import CollectionItems from "./CollectionItems";
import { useDebounce } from "../../../hooks/useDebounce";

type CollectionItemsContainerProps = {
  viewingItems: string;
  setViewingItems: React.Dispatch<React.SetStateAction<string | null>>;
  collItemsFilterSelection: FilterSelection;
};

export default function CollectionItemsContainer({
  viewingItems,
  setViewingItems,
  collItemsFilterSelection
}: CollectionItemsContainerProps) {
  const [collItems, setCollItems] = useState<VRScan[]>([]);
  const [allCollItems, setAllCollItems] = useState<VRScan[]>([]);

  const collections = useSelector((state: RootState) => state.collections);
  const currentCollection = collections.find((col) => col.title === viewingItems);
  const currentCollectionItems = currentCollection?.items || [];

  const filterCollItems = useCallback(
    (items: VRScan[]) => {
      return items.filter((fav) => {
        const searchTerm = collItemsFilterSelection.searchTerm?.toLowerCase().trim() || "";
        const acceptsSearch = !searchTerm || fav.name.toLowerCase().includes(searchTerm);
        const acceptsMaterials =
          !collItemsFilterSelection.materials.size ||
          collItemsFilterSelection.materials.has(fav.materialTypeId);
        const acceptsColors =
          !collItemsFilterSelection.colors.size ||
          fav.colors.some((color) => collItemsFilterSelection.colors.has(color));
        const acceptsTags =
          !collItemsFilterSelection.tags.size ||
          fav.tags.some((tag) => collItemsFilterSelection.tags.has(tag));

        return acceptsSearch && acceptsMaterials && acceptsColors && acceptsTags;
      });
    },
    [collItemsFilterSelection]
  );

  const debouncedcollItemsFilterSelection = useDebounce(collItemsFilterSelection, 500);

  useEffect(() => {
    setAllCollItems(currentCollectionItems);
    setCollItems(filterCollItems(currentCollectionItems));
  }, [viewingItems, currentCollection]);

  useEffect(() => {
    setCollItems(filterCollItems(allCollItems));
  }, [debouncedcollItemsFilterSelection, allCollItems]);

  if (!currentCollection) {
    return (
      <div className="text-center text-gray-500">
        <p>Collection not found.</p>
      </div>
    );
  }

  if (!currentCollection) {
    return (
      <div className="text-center text-gray-500">
        <p>Collection not found.</p>
      </div>
    );
  }

  return (
    <CollectionItems
      collItems={collItems}
      allCollItems={allCollItems}
      currentCollection={currentCollection}
      setViewingItems={setViewingItems}
    />
  );
}
