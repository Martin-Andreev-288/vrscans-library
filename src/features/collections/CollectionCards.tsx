import collectionImage from "/src/assets/imgCollection.png";
import { Button } from "../../components";
import { FiTrash } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { removeCollection } from "../../store/slices/collectionsSlice";
import CollectionItemsContainer from "./CollectionItemsContainer";
import { type FilterSelection } from "../../utils/types";

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
  const collections = useSelector((state: RootState) => state.collections);
  const dispatch = useDispatch();

  const emptyPageText = "No collections found. Add your first collection to get started.";

  if (viewingItems) {
    return (
      <CollectionItemsContainer
        viewingItems={viewingItems}
        setViewingItems={setViewingItems}
        collItemsFilterSelection={collItemsFilterSelection}
      />
    );
  }

  return (
    <>
      {collections.length ? (
        <ul className="card-container">
          {collections.map((collection) => (
            <li
              key={collection.title}
              className="relative flex flex-col h-[320px] w-full bg-white border rounded-lg shadow-md cursor-pointer hover:bg-gray-100 hover:shadow-lg hover:scale-105 transition-transform duration-200"
            >
              <div className="relative bg-gray-50 p-2 rounded-lg border border-gray-100 mb-4 group z-0">
                <button
                  className="absolute top-2 left-2 bg-gray-200 text-gray-600 rounded-full p-2 hover:bg-gray-300 z-20"
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(removeCollection(collection.title));
                  }}
                >
                  <FiTrash />
                </button>
                <img
                  src={collectionImage}
                  alt="Collection"
                  className="w-full h-40 object-contain rounded-md transition-transform duration-300 group-hover:scale-95"
                />
              </div>
              <h3 className="text-lg text-center font-semibold mb-2">{collection.title}</h3>
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
}
