import collectionImage from "/src/assets/imgCollection.png";
import { Button } from "../../components";
import { FiTrash } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { removeCollection, removeItemFromCollection } from "../../store/slices/collectionsSlice";
import { addToFavs, removeFromFavs } from "../../store/slices/favoritesSlice";
import { type VRScan } from "../../utils/types";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

type CollectionCardsProps = {
  viewingItems: string | null;
  setViewingItems: React.Dispatch<React.SetStateAction<string | null>>;
};

export default function CollectionCards({ viewingItems, setViewingItems }: CollectionCardsProps) {
  const collections = useSelector((state: RootState) => state.collections);
  const dispatch = useDispatch();

  const favoritesList = useSelector((state: RootState) => state.favItems);

  const isFavorite = (itemId: number): boolean => {
    return favoritesList.some((favItem: VRScan) => favItem.id === itemId);
  };

  const emptyPageText = "No collections found. Add your first collection to get started.";

  const renderCollections = () => (
    <>
      {collections.length ? (
        <ul className="card-container">
          {collections.map((collection) => (
            <li
              key={collection.title}
              className="relative flex flex-col h-[300px] w-full p-4 bg-white border rounded-lg shadow-md cursor-pointer hover:bg-gray-100 hover:shadow-lg hover:scale-105 transition-transform duration-200"
            >
              {/* Buttons */}
              <button
                className="absolute top-2 left-2 bg-gray-200 text-gray-600 rounded-full p-2 hover:bg-gray-300"
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
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
                className="w-full h-40 object-fill rounded-md mb-4"
              />

              {/* Title */}
              <h3 className="text-lg text-center font-semibold mb-2">{collection.title}</h3>

              {/* View Items Button */}
              <Button type="viewItemsButton" onClick={() => setViewingItems(collection.title)}>
                View Items
              </Button>
            </li>
          ))}
        </ul>
      ) : (
        <h1 className="text-xl font-bold mb-6 text-center">{emptyPageText}</h1>
      )}
    </>
  );

  const renderCollectionItems = () => {
    const currentCollection = collections.find((col) => col.title === viewingItems);

    if (!currentCollection) {
      return (
        <div className="text-center text-gray-500">
          <p>Collection not found.</p>
        </div>
      );
    }

    return (
      <>
        {currentCollection?.items.length ? (
          <ul className="card-container">
            {currentCollection.items.map((item) => (
              <li
                key={item.name}
                className="relative flex flex-col h-[300px] w-full p-4 bg-white border rounded-lg shadow-md cursor-pointer hover:bg-gray-100 hover:shadow-lg hover:scale-105 transition-transform duration-200"
              >
                {/* Buttons */}
                <button
                  className="absolute top-2 left-2 bg-gray-200 text-gray-600 rounded-full p-2 hover:bg-gray-300"
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    e.stopPropagation();
                    dispatch(
                      removeItemFromCollection({
                        collectionTitle: currentCollection.title,
                        itemId: item.id
                      })
                    );
                  }}
                >
                  <FiTrash />
                </button>
                <button
                  className="absolute top-2 right-2 bg-gray-200 text-gray-600 rounded-full p-2 hover:bg-gray-300"
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                    event.stopPropagation();
                    if (isFavorite(item.id)) {
                      dispatch(removeFromFavs(item.id));
                    } else {
                      dispatch(addToFavs(item));
                    }
                  }}
                >
                  {isFavorite(item.id) ? "♥" : "♡"}
                </button>

                {/* Image */}
                <img
                  src={item.thumb}
                  alt="image not found"
                  className="w-full h-40 object-fill rounded-md mb-4"
                />

                {/* Title */}
                <div className="text-center">
                  <h3 className="text-lg text-center font-semibold mb-2">{item.name}</h3>
                  <ul className="text-left text-sm">
                    <li className="pl-2">Material</li>
                    <li className="pl-2">Manufacturer</li>
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">No items in this collection.</p>
        )}
        <div className="mt-6 flex justify-center">
          <Button type="viewItemsButton" onClick={() => setViewingItems(null)}>
            Back to Collections
          </Button>
        </div>
      </>
    );
  };

  return <>{viewingItems ? renderCollectionItems() : renderCollections()}</>;
}
