import collectionImage from "/src/assets/imgCollection.png";
import { Button } from "../../components";
import { FiTrash } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { removeCollection } from "../../store/slices/collectionsSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export default function CollectionCards() {
  const collections = useSelector((state: RootState) => state.collections);

  const dispatch = useDispatch();

  const emptyPageText = "No collections found. Add your first collection to get started.";

  return (
    <>
      {collections.length ? (
        collections.map((collection) => (
          <li className="relative flex flex-col h-[300px] w-full p-4 bg-white border rounded-lg shadow-md cursor-pointer hover:bg-gray-100 hover:shadow-lg hover:scale-105 transition-transform duration-200">
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
            <Button type="viewItemsButton">View Items</Button>
          </li>
        ))
      ) : (
        <>
          <h1 className="text-xl font-bold mb-6 text-center">{emptyPageText}</h1>
        </>
      )}
    </>
  );
}
