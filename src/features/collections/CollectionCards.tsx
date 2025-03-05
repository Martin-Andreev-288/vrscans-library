import collectionImage from "/src/assets/imgCollection.png";
import { Button } from "../../components";
import { FiTrash } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { removeCollection } from "../../store/slices/collectionsSlice";
import { RootState } from "../../store/store";
import { useEffect, useState, useCallback } from "react";
import { type VRScan, type FilterSelection } from "../../utils/types";
import CollectionItems from "./CollectionItems";

type CollectionCardsProps = {
  viewingItems: string | null;
  setViewingItems: React.Dispatch<React.SetStateAction<string | null>>;
  collItemsFilterSelection: FilterSelection;
};

export default function CollectionCards({
  viewingItems,
  setViewingItems,
  collItemsFilterSelection
}: CollectionCardsProps) {
  const [collItems, setCollItems] = useState<VRScan[]>([]);
  const [allCollItems, setAllCollItems] = useState<VRScan[]>([]);

  const collections = useSelector((state: RootState) => state.collections);

  // collection items logic
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

  // Handle initial load and collection changes
  useEffect(() => {
    if (viewingItems && currentCollection) {
      setAllCollItems(currentCollectionItems);
      setCollItems(filterCollItems(currentCollectionItems));
    }
  }, [viewingItems, currentCollection]);

  // Handle filter changes
  useEffect(() => {
    if (viewingItems) {
      setCollItems(filterCollItems(allCollItems));
    }
  }, [collItemsFilterSelection, allCollItems]);

  const dispatch = useDispatch();

  const emptyPageText = "No collections found. Add your first collection to get started.";

  const renderCollections = () => (
    <>
      {collections.length ? (
        <ul className="card-container">
          {collections.map((collection) => (
            <li
              key={collection.title}
              className="relative flex flex-col h-[320px] w-full bg-white border rounded-lg shadow-md cursor-pointer hover:bg-gray-100 hover:shadow-lg hover:scale-105 transition-transform duration-200"
            >
              <div className="relative bg-gray-50 p-2 rounded-lg border border-gray-100 mb-4 group z-0">
                {/* Trash Button */}
                <button
                  className="absolute top-2 left-2 bg-gray-200 text-gray-600 rounded-full p-2 hover:bg-gray-300 z-20"
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(removeCollection(collection.title));
                  }}
                >
                  <FiTrash />
                </button>

                {/* Image */}
                <img
                  src={collectionImage}
                  alt="image not found"
                  className="w-full h-40 object-contain rounded-md transition-transform duration-300 group-hover:scale-95"
                />
              </div>

              {/* Title */}
              <h3 className="text-lg text-center font-semibold mb-2">{collection.title}</h3>

              {/* View Items Button */}
              <div className="mt-auto mb-[10px] text-center">
                <Button type="viewItemsButton" onClick={() => setViewingItems(collection.title)}>
                  View Items
                </Button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <h1 className="text-xl font-bold mb-6 text-center">{emptyPageText}</h1>
      )}
    </>
  );

  const renderCollectionItems = () => {
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
  };

  return <>{viewingItems ? renderCollectionItems() : renderCollections()}</>;
}
