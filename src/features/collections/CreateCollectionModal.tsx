import { useState } from "react";
import { useDispatch } from "react-redux";
import { FaTimes } from "react-icons/fa";
import fontModalImage from "/src/assets/addCollectionImg.png";
import { ModalWrapper } from "../../components";
import useClickOutside from "../../hooks/useClickOutside";
import { addCollection } from "../../store/slices/collectionsSlice";
import { toast } from "react-toastify";

type AddToCollectionModalProps = {
  onClose: () => void;
};

export default function CreateCollectionModal({ onClose }: AddToCollectionModalProps) {
  const modalRef = useClickOutside(onClose);
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");

  const handleCreateCollection = () => {
    if (title.trim()) {
      dispatch(addCollection(title));
      onClose();
    } else {
      toast.error("Collection title cannot be empty!", { autoClose: 2000 });
    }
  };

  return (
    <ModalWrapper>
      <div
        ref={modalRef}
        className="relative bg-white rounded-lg shadow-lg w-[90%] max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl p-4 flex flex-col"
      >
        <img
          src={fontModalImage}
          alt="Image not found"
          className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none"
        />
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          <FaTimes size={20} />
        </button>
        <h2 className="text-xl font-semibold text-center mb-6">Create Collection</h2>
        <div className="relative mb-6">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Collection Title"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col items-center">
          <button
            onClick={handleCreateCollection}
            className="mt-12 w-full px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-600 hover:text-white"
          >
            Create a Collection
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
}
