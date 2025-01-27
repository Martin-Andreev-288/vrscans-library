import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import fontModalImage from "/src/assets/addCollectionImg.png";
import { ModalWrapper } from "../../components";
import useClickOutside from "../../hooks/useClickOutside";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useDispatch } from "react-redux";
import { addItemToCollection } from "../../store/slices/collectionsSlice";
import { VRScan } from "../../utils/types";
import { addCollection } from "../../store/slices/collectionsSlice";
import { toast } from "react-toastify";

type AddToCollectionModalProps = {
  onClose: () => void;
  item: VRScan;
};

export default function AddToCollectionModal({ onClose, item }: AddToCollectionModalProps) {
  const collections = useSelector((state: RootState) => state.collections);
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [collectionTitleField, setCollectionTitleField] = useState(false);

  const modalRef = useClickOutside(onClose);

  const isInTheCollection = (collectionTitle: string): boolean | undefined => {
    const collection = collections.find((col) => col.title === collectionTitle);
    return collection?.items.some((existingItem) => existingItem.id === item.id);
  };

  const handleCreateCollection = () => {
    if (title.trim()) {
      dispatch(addCollection(title));
      setCollectionTitleField(false);
      setTitle("");
    } else {
      toast.error("Collection title cannot be empty!", { autoClose: 2000 });
    }
  };

  return (
    <ModalWrapper>
      {/* Modal Window */}
      <div
        ref={modalRef}
        className="relative bg-white max-h-192 2xl:h-1/2 w-[90%] max-w-md p-6 rounded-lg shadow-lg flex flex-col"
      >
        {/* Font Image */}
        <img
          src={fontModalImage}
          alt="Image not found"
          className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none"
        />

        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          <FaTimes size={20} />
        </button>

        {/* Modal Title */}
        <h2 className="text-xl font-semibold text-center mb-6">Add to Collection</h2>

        {/* Collections Selection Header */}
        <div className="mb-6">
          <h3 className="text-gray-700 font-medium text-center">Select from your collections:</h3>
        </div>

        {/* List of Collections */}
        <ul className="space-y-4 max-h-44 overflow-scroll">
          {collections.map((collection) => (
            <li className="flex justify-between items-center">
              <span className="text-gray-800">{collection.title}</span>
              {!isInTheCollection(collection.title) ? (
                <button
                  className="px-4 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  onClick={() => {
                    dispatch(addItemToCollection({ collectionTitle: collection.title, item }));
                  }}
                >
                  Save
                </button>
              ) : (
                <button className="px-4 py-1 bg-gray-300 text-gray-500 rounded-md cursor-not-allowed">
                  Saved
                </button>
              )}
            </li>
          ))}
        </ul>

        {/* Create Collection Button */}
        <div className="flex flex-col items-center">
          <button
            className="mt-12 w-full px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-600 hover:text-white"
            onClick={() => setCollectionTitleField((open) => !open)}
          >
            Create a Collection
          </button>

          {collectionTitleField && (
            <>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter Collection Title Here and Press 'Done'"
                className="w-full mt-4 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />

              {/* Done Button */}
              <button
                onClick={handleCreateCollection}
                className="mt-32 w-1/3 px-4 py-2 bg-green-600 text-black border border-black font-bold rounded-md hover:bg-green-700"
              >
                Done
              </button>
            </>
          )}
        </div>
      </div>
      ;
    </ModalWrapper>
  );
}
