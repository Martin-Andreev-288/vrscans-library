import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { VRScan, FilterSelection } from "../../utils/types";
import CollectionItems from "./CollectionItems";

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
        const acceptsMaterials =
          !collItemsFilterSelection.materials.size ||
          collItemsFilterSelection.materials.has(fav.materialTypeId);
        const acceptsColors =
          !collItemsFilterSelection.colors.size ||
          fav.colors.some((color) => collItemsFilterSelection.colors.has(color));
        const acceptsTags =
          !collItemsFilterSelection.tags.size ||
          fav.tags.some((tag) => collItemsFilterSelection.tags.has(tag));

        return acceptsMaterials && acceptsColors && acceptsTags;
      });
    },
    [collItemsFilterSelection]
  );

  useEffect(() => {
    setAllCollItems(currentCollectionItems);
    setCollItems(filterCollItems(currentCollectionItems));
  }, [viewingItems, currentCollection]);

  useEffect(() => {
    setCollItems(filterCollItems(allCollItems));
  }, [collItemsFilterSelection, allCollItems]);

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
      currentCollection={currentCollection}
      setViewingItems={setViewingItems}
    />
  );
}
