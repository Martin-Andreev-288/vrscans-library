import collectionImage from "/src/assets/imgCollection.png";
import { Button } from "../../components";
import { CollectionState } from "../../utils/types";
import { FiTrash } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { removeCollection } from "../../store/slices/collectionsSlice";

type CollectionCardProps = {
  collection: CollectionState;
};

export default function CollectionCard({ collection }: CollectionCardProps) {
  const dispatch = useDispatch();

  const deleteCollection = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    dispatch(removeCollection(collection.title));
  };

  return (
    <>
      <li className="relative flex flex-col h-[300px] w-full p-4 bg-white border rounded-lg shadow-md cursor-pointer hover:bg-gray-100 hover:shadow-lg hover:scale-105 transition-transform duration-200">
        {/* Buttons */}
        <button
          className="absolute top-2 left-2 bg-gray-200 text-gray-600 rounded-full p-2 hover:bg-gray-300"
          onClick={deleteCollection}
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
    </>
  );
}
