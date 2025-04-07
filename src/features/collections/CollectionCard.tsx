import { useState } from "react";
import collectionImage from "/src/assets/imgCollection.png";
import { Button } from "../../components";
import { FiTrash } from "react-icons/fi";
import DeleteCollModal from "./DeleteCollModal";

type CollectionCardProps = {
  title: string;
  setViewingItems: React.Dispatch<React.SetStateAction<string | null>>;
};

function CollectionCard({ title, setViewingItems }: CollectionCardProps) {
  const [isDeleteCollModalOpen, setIsDeleteCollModalOpen] = useState(false);

  const handleDeleteCollModalClose = () => {
    setIsDeleteCollModalOpen(false);
  };
  return (
    <>
      <li
        key={title}
        className="relative flex flex-col h-[320px] w-full bg-white border rounded-lg shadow-md hover:bg-gray-100 hover:shadow-lg hover:scale-105 transition-transform duration-200"
      >
        <div className="relative bg-gray-50 p-2 rounded-lg border border-gray-100 mb-4 group z-0">
          <button
            className="absolute top-2 left-2 bg-gray-200 text-gray-600 rounded-full p-2 hover:bg-gray-300 z-20"
            onClick={(event) => {
              event.stopPropagation();
              setIsDeleteCollModalOpen(true);
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
        <h3 className="text-lg text-center font-semibold mb-2">{title}</h3>
        <div className="mt-auto mb-[10px] cursor-pointer text-center">
          <Button type="viewItemsButton" onClick={() => setViewingItems(title)}>
            View Items
          </Button>
        </div>
      </li>
      {isDeleteCollModalOpen && (
        <DeleteCollModal onClose={handleDeleteCollModalClose} title={title} />
      )}
    </>
  );
}

export default CollectionCard;
